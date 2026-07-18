import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the professional homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Jarkko Moilanen \| Data Product Pioneer<\/title>/i);
  assert.match(html, /Building the operating system for[\s\S]*data and AI products/);
  assert.match(html, /Jarkko Moilanen, PhD/);
  assert.match(html, /Three areas\. One professional body of work\./);
  assert.match(html, /Built in public, tested in practice\./);
  assert.match(html, /Writing, books, and courses from the work itself\./);
  assert.match(html, /Bring me the problem that needs senior attention\./);
  assert.match(html, /Government-wide AI products/);
  assert.match(html, /Maysano/);
  assert.match(html, /Data Product Standards/);
  assert.match(html, /\/images\/work-maysano\.png/);
  assert.match(html, /\/images\/work-odps\.png/);
  assert.match(html, /\/images\/work-abudhabi\.png/);
  assert.match(html, /Data product pioneer, standards maintainer/);
  assert.match(html, /Udemy courses/);
  assert.match(html, /https:\/\/www\.udemy\.com\/user\/jarkko-moilanen\//);
  assert.match(html, /Amazon author profile/);
  assert.match(html, /https:\/\/us\.amazon\.com\/stores\/Jarkko-Moilanen\/author\/B0B66HTHLM/);
  assert.match(html, /Discuss an engagement/);
  assert.match(html, /\/images\/jarkko-moilanen-portrait\.jpeg/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/);
});

test("server-renders work detail pages", async () => {
  const response = await render("/work/standards-and-sdk");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Data Product Standards/);
  assert.match(html, /Open Data Product Specification family maintained under Linux Foundation/);
  assert.match(html, /Connected parts of the operating system/);
});

test("server-renders article pages", async () => {
  const response = await render(
    "/insights/articles/operating-system-data-ai-products",
  );
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /The operating system for data and AI products/);
  assert.match(html, /Most organizations do not fail at AI because they lack ideas/);
  assert.match(html, /Related thinking/);
});

test("removes starter preview wiring", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(page, /_sites-preview|SkeletonPreview|codex-preview/);
  assert.doesNotMatch(layout, /Starter Project|codex-preview|_sites-preview/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  await assert.rejects(access(new URL("../app/_sites-preview/", import.meta.url)));
});
