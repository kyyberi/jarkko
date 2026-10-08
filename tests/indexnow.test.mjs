import assert from "node:assert/strict";
import {
  mkdtemp,
  mkdir,
  readFile,
  readdir,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import {
  buildManifest,
  canonicalContent,
  classifyRemovedUrls,
  contentHash,
  diffManifests,
  normalizeUrl,
  notifyIndexNow,
  readJsonIfPresent,
  submitIndexNow,
  waitForDeployment,
  writeJsonAtomic,
} from "../scripts/indexnow.mjs";

const origin = "https://jarkkomoilanen.com";
const key = "84785ff01b2aca6ab6fb93be999261bc53ef769b868fa871700ea14cd079911a";

function html({ canonical, body = "Page", robots = "index, follow", title = "Title" }) {
  return `<!doctype html><html><head><title>${title}</title><meta name="description" content="Description"><meta name="robots" content="${robots}"><link rel="canonical" href="${canonical}"><script src="/_next/build.js"></script></head><body><main><h1>${body}</h1></main><script>self.__next_f.push([1,"build data"])</script></body></html>`;
}

function manifest(entries = {}) {
  return {
    version: 1,
    host: "jarkkomoilanen.com",
    source: "test",
    urls: Object.fromEntries(
      Object.entries(entries).map(([url, hash]) => [url, { hash }]),
    ),
    excluded: [],
  };
}

test("normalizes only canonical production URLs", () => {
  assert.equal(normalizeUrl(`${origin}/about`), `${origin}/about/`);
  assert.equal(normalizeUrl(`${origin}/`), `${origin}/`);
  assert.equal(normalizeUrl(`${origin}/asset.pdf`), `${origin}/asset.pdf`);
  assert.equal(normalizeUrl(`http://jarkkomoilanen.com/about/`), null);
  assert.equal(normalizeUrl(`https://example.com/about/`), null);
  assert.equal(normalizeUrl(`${origin}/about/?preview=1`), null);
  assert.equal(normalizeUrl(`${origin}/about/#team`), null);
});

test("builds a deterministic manifest and excludes invalid sitemap entries", async () => {
  const siteDir = await mkdtemp(join(tmpdir(), "indexnow-site-"));
  await mkdir(join(siteDir, "about"), { recursive: true });
  await mkdir(join(siteDir, "private"), { recursive: true });
  await mkdir(join(siteDir, "legacy"), { recursive: true });
  await writeFile(
    join(siteDir, "sitemap.xml"),
    `<urlset>
      <url><loc>${origin}/</loc></url>
      <url><loc>${origin}/about/</loc></url>
      <url><loc>${origin}/private/</loc></url>
      <url><loc>${origin}/legacy/</loc></url>
      <url><loc>https://example.com/foreign/</loc></url>
    </urlset>`,
  );
  await writeFile(join(siteDir, "index.html"), html({ canonical: `${origin}/`, body: "Home" }));
  await writeFile(
    join(siteDir, "about", "index.html"),
    html({ canonical: `${origin}/about/`, body: "About" }),
  );
  await writeFile(
    join(siteDir, "private", "index.html"),
    html({ canonical: `${origin}/private/`, robots: "noindex, follow" }),
  );
  await writeFile(
    join(siteDir, "legacy", "index.html"),
    html({ canonical: `${origin}/about/`, body: "Redirect" }),
  );

  const result = await buildManifest({ siteDir });
  assert.deepEqual(Object.keys(result.urls), [`${origin}/`, `${origin}/about/`]);
  assert.deepEqual(
    result.excluded.map(({ reason }) => reason).sort(),
    ["invalid-or-nonproduction-url", "noindex", "noncanonical-or-missing-canonical"],
  );
});

test("content fingerprints ignore framework scripts but detect visible and metadata changes", () => {
  const first = html({ canonical: `${origin}/`, body: "Visible", title: "One" });
  const scriptOnly = first.replace("build.js", "other-build.js").replace("build data", "other data");
  const visibleChange = html({ canonical: `${origin}/`, body: "Changed", title: "One" });
  const titleChange = html({ canonical: `${origin}/`, body: "Visible", title: "Two" });

  assert.equal(canonicalContent(first), canonicalContent(scriptOnly));
  assert.equal(contentHash(first), contentHash(scriptOnly));
  assert.notEqual(contentHash(first), contentHash(visibleChange));
  assert.notEqual(contentHash(first), contentHash(titleChange));
});

test("detects initial, new, updated, removed, and unchanged URLs", () => {
  const first = manifest({ [`${origin}/`]: "a", [`${origin}/old/`]: "old" });
  const next = manifest({
    [`${origin}/`]: "b",
    [`${origin}/new/`]: "new",
  });

  assert.deepEqual(diffManifests(first, null), {
    initial: true,
    new: [`${origin}/`, `${origin}/old/`],
    updated: [],
    removed: [],
  });
  assert.deepEqual(diffManifests(next, first), {
    initial: false,
    new: [`${origin}/new/`],
    updated: [`${origin}/`],
    removed: [`${origin}/old/`],
  });
  assert.deepEqual(diffManifests(next, next), {
    initial: false,
    new: [],
    updated: [],
    removed: [],
  });
});

test("submits removed URLs only for confirmed 404 or 410 responses", async () => {
  const statuses = new Map([
    [`${origin}/gone/`, [404, null]],
    [`${origin}/retired/`, [410, null]],
    [`${origin}/moved/`, [301, `${origin}/replacement/`]],
    [`${origin}/still-here/`, [200, null]],
  ]);
  const fetchImpl = async (url) => {
    const [status, location] = statuses.get(url);
    return new Response("", { status, headers: location ? { location } : {} });
  };
  const result = await classifyRemovedUrls([...statuses.keys()], { fetchImpl });

  assert.deepEqual(result.submit, [`${origin}/gone/`, `${origin}/retired/`]);
  assert.deepEqual(result.redirected, [
    { url: `${origin}/moved/`, location: `${origin}/replacement/` },
  ]);
  assert.deepEqual(result.pending, [{ url: `${origin}/still-here/`, status: 200 }]);
});

test("waits for the matching deployment marker before checking the key", async () => {
  const calls = [];
  const fetchImpl = async (url) => {
    calls.push(url);
    if (url.includes("indexnow-deployment.json")) {
      return Response.json({ sha: "commit-sha" });
    }
    return new Response(`${key}\n`, { status: 200 });
  };
  const result = await waitForDeployment({
    origin,
    sha: "commit-sha",
    key,
    fetchImpl,
    attempts: 1,
  });

  assert.match(calls[0], /indexnow-deployment\.json/);
  assert.match(calls[1], new RegExp(`${key}\\.txt`));
  assert.equal(result.attempts, 1);
});

test("retries HTTP 429 with bounded backoff and accepts HTTP 202", async () => {
  const statuses = [429, 202];
  const sleeps = [];
  const payloads = [];
  const fetchImpl = async (_url, options) => {
    payloads.push(JSON.parse(options.body));
    const status = statuses.shift();
    return new Response("", {
      status,
      headers: status === 429 ? { "retry-after": "0" } : {},
    });
  };
  const submissions = await submitIndexNow({
    urls: [`${origin}/about/`],
    key,
    fetchImpl,
    sleep: async (milliseconds) => sleeps.push(milliseconds),
  });

  assert.equal(submissions[0].status, 202);
  assert.equal(submissions[0].attempts, 2);
  assert.deepEqual(sleeps, [0]);
  assert.equal(payloads[0].host, "jarkkomoilanen.com");
  assert.equal(payloads[0].keyLocation, `${origin}/${key}.txt`);
});

test("rejects protocol errors instead of accepting an invalid submission", async () => {
  await assert.rejects(
    submitIndexNow({
      urls: [`${origin}/about/`],
      key,
      fetchImpl: async () => new Response("key not found", { status: 403 }),
    }),
    (error) => {
      assert.match(error.message, /403: key verification failed/);
      assert.equal(error.submissions[0].status, 403);
      assert.equal(error.submissions[0].responseBody, "key not found");
      return true;
    },
  );
});

test("an unchanged deployment performs no IndexNow API submission", async () => {
  const current = manifest({ [`${origin}/`]: "same" });
  const calls = [];
  const fetchImpl = async (url) => {
    calls.push(url);
    if (url.includes("indexnow-deployment.json")) return Response.json({ sha: "sha" });
    if (url.includes(`${key}.txt`)) return new Response(key, { status: 200 });
    throw new Error("IndexNow API must not be called for an unchanged deployment");
  };
  const notification = await notifyIndexNow({
    current,
    previous: current,
    key,
    sha: "sha",
    fetchImpl,
    deploymentAttempts: 1,
  });

  assert.equal(notification.result.noChanges, true);
  assert.deepEqual(notification.result.submittedUrls, []);
  assert.equal(calls.length, 2);
});

test("persists and reloads the successful manifest atomically", async () => {
  const directory = await mkdtemp(join(tmpdir(), "indexnow-state-"));
  const path = join(directory, "manifest.json");
  const expected = manifest({ [`${origin}/`]: "hash" });

  await writeJsonAtomic(path, expected);
  assert.deepEqual(await readJsonIfPresent(path), expected);
});

test("the public verification filename and content match the stable IndexNow key", async () => {
  const publicDir = new URL("../public/", import.meta.url);
  const files = await readdir(publicDir);
  const keyFiles = files.filter((file) => /^[A-Za-z0-9-]{8,128}\.txt$/.test(file));

  assert.deepEqual(keyFiles, [`${key}.txt`]);
  assert.equal((await readFile(new URL(`../public/${key}.txt`, import.meta.url), "utf8")).trim(), key);
});

test("the Pages workflow deploys before IndexNow and persists only successful results", async () => {
  const workflow = await readFile(
    new URL("../.github/workflows/github-pages.yml", import.meta.url),
    "utf8",
  );
  const build = workflow.indexOf("- name: Build static site");
  const tests = workflow.indexOf("- name: Run tests");
  const deploy = workflow.indexOf("id: deployment");
  const notifyJob = workflow.indexOf("  indexnow:");
  const notify = workflow.indexOf("- name: Verify deployment and notify IndexNow");
  const persist = workflow.indexOf("- name: Persist successful IndexNow baseline");

  assert.ok(build >= 0 && build < tests);
  assert.ok(tests < deploy && deploy < notifyJob && notifyJob < notify && notify < persist);
  assert.match(workflow, /indexnow:[\s\S]*?needs: deploy/);
  assert.match(workflow, /Persist successful IndexNow baseline[\s\S]*?if: steps\.notify\.outcome == 'success'/);
});
