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
  assert.match(
    html,
    /<link rel="canonical" href="https:\/\/jarkkomoilanen\.com\/"/,
  );
  assert.match(html, /<meta name="robots" content="index, follow"/);
  assert.match(
    html,
    /<meta property="og:url" content="https:\/\/jarkkomoilanen\.com\/"/,
  );
  assert.match(
    html,
    /<meta property="og:image" content="https:\/\/jarkkomoilanen\.com\/images\/social-share\.jpg"/,
  );
  assert.match(html, /<meta name="twitter:card" content="summary_large_image"/);
  assert.match(
    html,
    /<meta name="twitter:image" content="https:\/\/jarkkomoilanen\.com\/images\/social-share\.jpg"/,
  );
  assert.match(html, /<link rel="alternate" type="application\/rss\+xml" href="https:\/\/jarkkomoilanen\.com\/rss\.xml"/);
  assert.match(html, /googletagmanager\.com\/gtag\/js\?id=G-KZ5N2GTKF5/);
  assert.match(html, /gtag\('config', 'G-KZ5N2GTKF5'\)/);
  assert.match(html, /Building the operating system for[\s\S]*data and AI products/);
  assert.match(html, /Jarkko Moilanen, PhD/);
  assert.match(html, /aria-label="Open navigation menu"/);
  assert.match(html, /id="mobile-navigation"/);
  assert.match(html, /aria-label="Mobile primary"/);
  assert.match(html, /href="\/insights\/articles"/);
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
  assert.match(html, /\/images\/logo-udemy\.png/);
  assert.match(html, /Amazon author profile/);
  assert.match(html, /https:\/\/us\.amazon\.com\/stores\/Jarkko-Moilanen\/author\/B0B66HTHLM/);
  assert.match(html, /\/images\/logo-amazon\.png/);
  assert.match(html, /Discuss an engagement/);
  assert.match(html, /\/images\/jarkko-moilanen-portrait\.jpeg/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/);
});

test("server-renders work detail pages", async () => {
  const response = await render("/work/standards-and-sdk");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Data Product Standards/);
  assert.match(
    html,
    /<link rel="canonical" href="https:\/\/jarkkomoilanen\.com\/work\/standards-and-sdk\/"/,
  );
  assert.match(
    html,
    /<meta property="og:title" content="Data Product Standards \| Jarkko Moilanen"/,
  );
  assert.match(
    html,
    /<meta property="og:image" content="https:\/\/jarkkomoilanen\.com\/images\/social-share\.jpg"/,
  );
  assert.match(
    html,
    /<meta name="twitter:image" content="https:\/\/jarkkomoilanen\.com\/images\/social-share\.jpg"/,
  );
  assert.match(html, /Open Data Product Specification family maintained under Linux Foundation/);
  assert.match(html, /Connected parts of the operating system/);
});

test("server-renders article pages", async () => {
  const [response, css] = await Promise.all([
    render("/insights/articles/operating-system-data-ai-products"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /The operating system for data and AI products/);
  assert.match(
    html,
    /<link rel="canonical" href="https:\/\/jarkkomoilanen\.com\/insights\/articles\/operating-system-data-ai-products\/"/,
  );
  assert.match(html, /<meta property="og:type" content="article"/);
  assert.match(
    html,
    /<meta property="og:image" content="https:\/\/jarkkomoilanen\.com\/images\/social-share\.jpg"/,
  );
  assert.match(
    html,
    /<meta name="twitter:image" content="https:\/\/jarkkomoilanen\.com\/images\/social-share\.jpg"/,
  );
  assert.match(
    html,
    /<meta property="article:published_time" content="2026-07-18T00:00:00.000Z"/,
  );
  assert.match(html, /Most organizations do not fail at AI because they lack ideas/);
  assert.match(html, /class="article-header"/);
  assert.match(html, /Share/);
  assert.match(html, /https:\/\/www\.linkedin\.com\/sharing\/share-offsite\/\?url=/);
  assert.match(html, /https:\/\/twitter\.com\/intent\/tweet\?url=/);
  assert.match(css, /\/images\/article-header-bg\.webp/);
  assert.match(html, /Related insights/);
});

test("server-renders insights index with the editorial header background", async () => {
  const [response, css] = await Promise.all([
    render("/insights/articles"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /class="detail-hero editorial insights-hero"/);
  assert.match(
    html,
    /<meta property="og:image" content="https:\/\/jarkkomoilanen\.com\/images\/social-share\.jpg"/,
  );
  assert.match(
    html,
    /<meta name="twitter:image" content="https:\/\/jarkkomoilanen\.com\/images\/social-share\.jpg"/,
  );
  assert.match(html, /Writing from the work itself/);
  assert.match(css, /\/images\/insights-header-bg\.webp/);
});

test("highlights article closing CTAs", async () => {
  const response = await render(
    "/insights/articles/golden-data-product-portfolio",
  );
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /class="article-cta"/);
  assert.match(html, /class="article-signoff"/);
  assert.match(html, /\/images\/jarkko-signature\.png/);
  assert.match(html, /Signature of Dr\. Jarkko Moilanen/);
  assert.match(html, /Dr\. Jarkko Moilanen/);
  assert.match(html, /class="article-ending-share"/);
  assert.match(html, /Share this article/);
  assert.match(html, /Get in touch if you need help/);
  assert.match(html, /https:\/\/www\.linkedin\.com\/in\/jarkkomoilanen\//);
  assert.match(html, /Connect on LinkedIn/);
  assert.doesNotMatch(html, /Contact Jarkko/);
});

test("server-renders article sidebar from article metadata", async () => {
  const response = await render(
    "/insights/articles/golden-data-product-portfolio",
  );
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /class="article-layout"/);
  assert.match(html, /class="article-sidebar"/);
  assert.match(html, /In this article/);
  assert.match(html, /href="#section-4-the-business-problem"/);
  assert.match(html, /The Business Problem/);
  assert.match(html, /At a glance/);
  assert.match(html, /Unconnected ideas often duplicate data, governance, and delivery work/);
  assert.match(html, /A portfolio view shows which initiatives depend on the same foundations/);
  assert.match(html, /Related insights/);
});

test("server-renders robots and sitemap discovery routes", async () => {
  const [robots, sitemap] = await Promise.all([
    render("/robots.txt"),
    render("/sitemap.xml"),
  ]);

  assert.equal(robots.status, 200);
  assert.equal(sitemap.status, 200);

  const robotsText = await robots.text();
  const sitemapText = await sitemap.text();

  assert.match(robotsText, /User-Agent: \*/);
  assert.match(robotsText, /Sitemap: https:\/\/jarkkomoilanen\.com\/sitemap\.xml/);
  assert.match(sitemapText, /<loc>https:\/\/jarkkomoilanen\.com\/<\/loc>/);
  assert.match(
    sitemapText,
    /<loc>https:\/\/jarkkomoilanen\.com\/insights\/articles\/operating-system-data-ai-products\/<\/loc>/,
  );
  assert.match(
    sitemapText,
    /<loc>https:\/\/jarkkomoilanen\.com\/work\/standards-and-sdk\/<\/loc>/,
  );
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
