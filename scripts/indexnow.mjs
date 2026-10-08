import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import {
  mkdir,
  readFile,
  rename,
  writeFile,
} from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
export const PRODUCTION_ORIGIN = "https://jarkkomoilanen.com";
export const MANIFEST_VERSION = 1;
export const MAX_BATCH_SIZE = 10_000;

const KEY_PATTERN = /^[A-Za-z0-9-]{8,128}$/;
const ACCEPTED_STATUSES = new Set([200, 202]);
const RETRYABLE_STATUSES = new Set([429, 500, 502, 503, 504]);

export class IndexNowSubmissionError extends Error {
  constructor(message, submissions) {
    super(message);
    this.name = "IndexNowSubmissionError";
    this.submissions = submissions;
  }
}

function decodeXml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'");
}

function getAttribute(tag, name) {
  const match = tag.match(
    new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`, "i"),
  );
  return match?.[2] ?? null;
}

function compactHtml(value) {
  return value
    .replace(/<!--.*?-->/gs, "")
    .replace(/>\s+</g, "><")
    .replace(/\s+/g, " ")
    .trim();
}

function relevantHeadMarkup(html) {
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? "";
  const parts = [];

  const title = head.match(/<title\b[^>]*>[\s\S]*?<\/title>/i)?.[0];
  if (title) parts.push(title);

  for (const tag of head.match(/<meta\b[^>]*>/gi) ?? []) {
    const name = getAttribute(tag, "name")?.toLowerCase();
    const property = getAttribute(tag, "property")?.toLowerCase();
    if (
      name === "description" ||
      name === "robots" ||
      property?.startsWith("og:") ||
      property === "article:published_time" ||
      property === "article:modified_time"
    ) {
      parts.push(tag);
    }
  }

  for (const tag of head.match(/<link\b[^>]*>/gi) ?? []) {
    if (getAttribute(tag, "rel")?.toLowerCase() === "canonical") {
      parts.push(tag);
    }
  }

  for (const script of
    head.match(
      /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi,
    ) ?? []) {
    parts.push(script);
  }

  return compactHtml(parts.join(""));
}

export function canonicalContent(html) {
  const main = html.match(/<main\b[^>]*>[\s\S]*?<\/main>/i)?.[0];
  const body = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? "";
  const visible = (main ?? body)
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, "");
  return compactHtml(`${relevantHeadMarkup(html)}${visible}`);
}

export function contentHash(html) {
  return createHash("sha256").update(canonicalContent(html)).digest("hex");
}

export function normalizeUrl(rawUrl, origin = PRODUCTION_ORIGIN) {
  let url;
  try {
    url = new URL(rawUrl);
  } catch {
    return null;
  }

  const expected = new URL(origin);
  if (
    url.protocol !== "https:" ||
    url.origin !== expected.origin ||
    url.username ||
    url.password ||
    url.search ||
    url.hash
  ) {
    return null;
  }

  const pathname = url.pathname.replace(/\/{2,}/g, "/");
  const lastSegment = pathname.split("/").at(-1) ?? "";
  const hasExtension = lastSegment.includes(".");
  url.pathname =
    pathname === "/" || pathname.endsWith("/") || hasExtension
      ? pathname
      : `${pathname}/`;
  return url.toString();
}

export function urlsFromSitemap(xml) {
  return [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)].map((match) =>
    decodeXml(match[1].trim()),
  );
}

function htmlFileForUrl(siteDir, url) {
  const pathname = new URL(url).pathname;
  if (pathname === "/") return join(siteDir, "index.html");
  if (pathname.endsWith("/")) {
    return join(siteDir, decodeURIComponent(pathname.slice(1)), "index.html");
  }
  return join(siteDir, decodeURIComponent(pathname.slice(1)));
}

function canonicalUrlFromHtml(html) {
  for (const tag of html.match(/<link\b[^>]*>/gi) ?? []) {
    if (getAttribute(tag, "rel")?.toLowerCase() === "canonical") {
      return getAttribute(tag, "href");
    }
  }
  return null;
}

function isNoIndex(html) {
  return (html.match(/<meta\b[^>]*>/gi) ?? []).some((tag) => {
    return (
      getAttribute(tag, "name")?.toLowerCase() === "robots" &&
      (getAttribute(tag, "content") ?? "")
        .toLowerCase()
        .split(/[\s,]+/)
        .includes("noindex")
    );
  });
}

export async function buildManifest({
  siteDir,
  sitemapPath = join(siteDir, "sitemap.xml"),
  origin = PRODUCTION_ORIGIN,
}) {
  const sitemap = await readFile(sitemapPath, "utf8");
  const urls = {};
  const excluded = [];

  for (const rawUrl of urlsFromSitemap(sitemap)) {
    const url = normalizeUrl(rawUrl, origin);
    if (!url) {
      excluded.push({ url: rawUrl, reason: "invalid-or-nonproduction-url" });
      continue;
    }

    let html;
    try {
      html = await readFile(htmlFileForUrl(siteDir, url), "utf8");
    } catch {
      excluded.push({ url, reason: "missing-exported-html" });
      continue;
    }

    if (isNoIndex(html)) {
      excluded.push({ url, reason: "noindex" });
      continue;
    }

    const canonical = normalizeUrl(canonicalUrlFromHtml(html), origin);
    if (canonical !== url) {
      excluded.push({ url, reason: "noncanonical-or-missing-canonical" });
      continue;
    }

    urls[url] = { hash: contentHash(html) };
  }

  return {
    version: MANIFEST_VERSION,
    host: new URL(origin).hostname,
    source: "sitemap.xml and exported canonical HTML",
    urls: Object.fromEntries(Object.entries(urls).sort(([a], [b]) => a.localeCompare(b))),
    excluded,
  };
}

export function diffManifests(current, previous, { mode = "changed" } = {}) {
  assert.equal(current.version, MANIFEST_VERSION, "Unsupported current manifest");
  if (previous) {
    assert.equal(previous.version, MANIFEST_VERSION, "Unsupported previous manifest");
    assert.equal(previous.host, current.host, "Manifest hosts do not match");
  }

  const currentUrls = current.urls ?? {};
  const previousUrls = previous?.urls ?? {};
  if (mode === "all") {
    return {
      initial: !previous,
      new: Object.keys(currentUrls).sort(),
      updated: [],
      removed: [],
    };
  }
  if (mode !== "changed") throw new Error(`Unsupported IndexNow mode: ${mode}`);

  const added = [];
  const updated = [];
  const removed = [];
  for (const [url, value] of Object.entries(currentUrls)) {
    if (!previousUrls[url]) added.push(url);
    else if (previousUrls[url].hash !== value.hash) updated.push(url);
  }
  for (const url of Object.keys(previousUrls)) {
    if (!currentUrls[url]) removed.push(url);
  }

  return {
    initial: !previous,
    new: added.sort(),
    updated: updated.sort(),
    removed: removed.sort(),
  };
}

function retryDelay(response, attempt, baseDelayMs) {
  const retryAfter = Number(response?.headers?.get?.("retry-after"));
  if (Number.isFinite(retryAfter) && retryAfter >= 0) {
    return Math.min(retryAfter * 1000, 30_000);
  }
  return Math.min(baseDelayMs * 2 ** (attempt - 1), 30_000);
}

const defaultSleep = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

async function fetchWithRetry(
  url,
  options,
  {
    fetchImpl = fetch,
    sleep = defaultSleep,
    maxAttempts = 3,
    baseDelayMs = 1_000,
  } = {},
) {
  let lastError;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const response = await fetchImpl(url, options);
      if (!RETRYABLE_STATUSES.has(response.status) || attempt === maxAttempts) {
        return { response, attempts: attempt };
      }
      await sleep(retryDelay(response, attempt, baseDelayMs));
    } catch (error) {
      lastError = error;
      if (attempt === maxAttempts) throw error;
      await sleep(Math.min(baseDelayMs * 2 ** (attempt - 1), 30_000));
    }
  }
  throw lastError ?? new Error("Request failed without a response");
}

export async function classifyRemovedUrls(
  urls,
  { fetchImpl = fetch, sleep = defaultSleep, maxAttempts = 3 } = {},
) {
  const result = { submit: [], redirected: [], pending: [] };
  for (const url of urls) {
    const { response } = await fetchWithRetry(
      url,
      {
        method: "GET",
        redirect: "manual",
        headers: {
          accept: "text/html",
          "cache-control": "no-cache",
          "user-agent": "jarkkomoilanen.com IndexNow deployment verifier",
        },
        signal: AbortSignal.timeout(15_000),
      },
      { fetchImpl, sleep, maxAttempts },
    );

    if (response.status === 404 || response.status === 410) result.submit.push(url);
    else if (response.status >= 300 && response.status < 400) {
      result.redirected.push({ url, location: response.headers.get("location") });
    } else {
      result.pending.push({ url, status: response.status });
    }
  }
  return result;
}

export async function waitForDeployment({
  origin = PRODUCTION_ORIGIN,
  sha,
  key,
  fetchImpl = fetch,
  sleep = defaultSleep,
  attempts = 20,
  delayMs = 15_000,
}) {
  if (!KEY_PATTERN.test(key)) throw new Error("INDEXNOW_KEY has an invalid format");
  if (!sha) throw new Error("Deployment SHA is required");

  const markerUrl = `${origin}/indexnow-deployment.json?run=${encodeURIComponent(sha)}`;
  const keyUrl = `${origin}/${key}.txt`;
  let lastReason = "deployment marker not checked";

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const markerResponse = await fetchImpl(markerUrl, {
        headers: { "cache-control": "no-cache" },
        signal: AbortSignal.timeout(15_000),
      });
      if (markerResponse.status !== 200) {
        lastReason = `marker returned ${markerResponse.status}`;
      } else {
        const marker = await markerResponse.json();
        if (marker.sha !== sha) {
          lastReason = `marker served SHA ${marker.sha ?? "missing"}`;
        } else {
          const keyResponse = await fetchImpl(`${keyUrl}?run=${encodeURIComponent(sha)}`, {
            headers: { "cache-control": "no-cache" },
            signal: AbortSignal.timeout(15_000),
          });
          const servedKey = (await keyResponse.text()).trim();
          if (keyResponse.status === 200 && servedKey === key) {
            return { markerUrl, keyUrl, attempts: attempt };
          }
          lastReason = `key verification returned ${keyResponse.status} with mismatched content`;
        }
      }
    } catch (error) {
      lastReason = error instanceof Error ? error.message : String(error);
    }

    if (attempt < attempts) await sleep(delayMs);
  }
  throw new Error(`Production deployment was not ready: ${lastReason}`);
}

export async function submitIndexNow({
  urls,
  key,
  host = new URL(PRODUCTION_ORIGIN).hostname,
  endpoint = INDEXNOW_ENDPOINT,
  fetchImpl = fetch,
  sleep = defaultSleep,
  maxAttempts = 3,
}) {
  if (!KEY_PATTERN.test(key)) throw new Error("INDEXNOW_KEY has an invalid format");
  const uniqueUrls = [...new Set(urls)].sort();
  const submissions = [];

  for (let start = 0; start < uniqueUrls.length; start += MAX_BATCH_SIZE) {
    const urlList = uniqueUrls.slice(start, start + MAX_BATCH_SIZE);
    const payload = {
      host,
      key,
      keyLocation: `https://${host}/${key}.txt`,
      urlList,
    };
    const { response, attempts } = await fetchWithRetry(
      endpoint,
      {
        method: "POST",
        headers: { "content-type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(15_000),
      },
      { fetchImpl, sleep, maxAttempts },
    );
    const responseBody = await response.text();
    submissions.push({
      status: response.status,
      attempts,
      count: urlList.length,
      responseBody: responseBody.slice(0, 500),
    });
    if (!ACCEPTED_STATUSES.has(response.status)) {
      const meanings = {
        400: "invalid IndexNow request",
        403: "key verification failed",
        422: "URL, host, or key mismatch",
        429: "rate limit remained after bounded retries",
      };
      throw new IndexNowSubmissionError(
        `IndexNow returned ${response.status}: ${meanings[response.status] ?? "submission failed"}`,
        submissions,
      );
    }
  }
  return submissions;
}

export async function writeJsonAtomic(path, value) {
  await mkdir(dirname(path), { recursive: true });
  const temporary = `${path}.tmp`;
  await writeFile(temporary, `${JSON.stringify(value, null, 2)}\n`, "utf8");
  await rename(temporary, path);
}

export async function readJsonIfPresent(path) {
  if (!path) return null;
  try {
    return JSON.parse(await readFile(path, "utf8"));
  } catch (error) {
    if (error?.code === "ENOENT") return null;
    throw error;
  }
}

export function nextManifestAfterRemovalCheck(current, previous, removalCheck) {
  const urls = { ...(current.urls ?? {}) };
  for (const { url } of removalCheck.pending) {
    if (previous?.urls?.[url]) urls[url] = previous.urls[url];
  }
  return { ...current, urls: Object.fromEntries(Object.entries(urls).sort()) };
}

export async function notifyIndexNow({
  current,
  previous,
  key,
  sha,
  mode = "changed",
  origin = PRODUCTION_ORIGIN,
  endpoint = INDEXNOW_ENDPOINT,
  fetchImpl = fetch,
  sleep = defaultSleep,
  deploymentAttempts = 20,
  deploymentDelayMs = 15_000,
  requestAttempts = 3,
}) {
  const deployment = await waitForDeployment({
    origin,
    sha,
    key,
    fetchImpl,
    sleep,
    attempts: deploymentAttempts,
    delayMs: deploymentDelayMs,
  });
  const changes = diffManifests(current, previous, { mode });
  const removals = await classifyRemovedUrls(changes.removed, {
    fetchImpl,
    sleep,
    maxAttempts: requestAttempts,
  });
  const urls = [
    ...changes.new,
    ...changes.updated,
    ...removals.submit,
  ];
  const submissions = await submitIndexNow({
    urls,
    key,
    host: current.host,
    endpoint,
    fetchImpl,
    sleep,
    maxAttempts: requestAttempts,
  });
  return {
    result: {
      accepted: submissions.every((item) => ACCEPTED_STATUSES.has(item.status)),
      noChanges: urls.length === 0,
      deployment,
      changes,
      removals,
      submittedUrls: [...new Set(urls)].sort(),
      submissions,
    },
    nextManifest: nextManifestAfterRemovalCheck(
      current,
      previous,
      removals,
    ),
  };
}

function parseArguments(argv) {
  const [command, ...values] = argv;
  const options = {};
  for (let index = 0; index < values.length; index += 2) {
    const flag = values[index];
    if (!flag?.startsWith("--") || values[index + 1] === undefined) {
      throw new Error(`Invalid argument near ${flag ?? "end of command"}`);
    }
    options[flag.slice(2)] = values[index + 1];
  }
  return { command, options };
}

async function runCli() {
  const { command, options } = parseArguments(process.argv.slice(2));
  if (command === "manifest") {
    const manifest = await buildManifest({
      siteDir: options["site-dir"],
      sitemapPath: options.sitemap,
      origin: options.origin ?? PRODUCTION_ORIGIN,
    });
    await writeJsonAtomic(options.output, manifest);
    console.log(
      `IndexNow manifest: ${Object.keys(manifest.urls).length} eligible, ${manifest.excluded.length} excluded`,
    );
    return;
  }
  if (command === "marker") {
    await writeJsonAtomic(options.output, {
      sha: options.sha,
      runId: options["run-id"],
    });
    return;
  }
  if (command === "notify") {
    const key = process.env.INDEXNOW_KEY ?? "";
    const current = await readJsonIfPresent(options.current);
    if (!current) throw new Error("Current IndexNow manifest is missing");
    const previous = await readJsonIfPresent(options.previous);
    let notification;
    try {
      notification = await notifyIndexNow({
        current,
        previous,
        key,
        sha: options.sha,
        mode: options.mode ?? "changed",
        origin: options.origin ?? PRODUCTION_ORIGIN,
        endpoint: options.endpoint ?? INDEXNOW_ENDPOINT,
      });
      await writeJsonAtomic(options.next, notification.nextManifest);
      await writeJsonAtomic(options.result, notification.result);
    } catch (error) {
      await writeJsonAtomic(options.result, {
        accepted: false,
        error: error instanceof Error ? error.message : String(error),
        submissions: error?.submissions ?? [],
      });
      throw error;
    }
    console.log(
      `IndexNow accepted ${notification.result.submittedUrls.length} URL(s); ` +
        `${notification.result.changes.new.length} new, ` +
        `${notification.result.changes.updated.length} updated, ` +
        `${notification.result.removals.submit.length} removed`,
    );
    return;
  }
  throw new Error("Usage: indexnow.mjs <manifest|marker|notify> [options]");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runCli().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
