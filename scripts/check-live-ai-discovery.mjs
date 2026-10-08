import assert from "node:assert/strict";

const origin = (process.env.AI_DISCOVERY_ORIGIN ?? "https://jarkkomoilanen.com")
  .replace(/\/$/, "");

const checks = [
  {
    name: "OAI-SearchBot homepage",
    path: "/",
    userAgent:
      "Mozilla/5.0 AppleWebKit/537.36 compatible; OAI-SearchBot/1.4; +https://openai.com/searchbot",
    contentType: "text/html",
    markers: ["<h1", '"@type":"Person"'],
  },
  {
    name: "Claude-SearchBot profile",
    path: "/about/",
    userAgent: "Claude-SearchBot/1.0",
    contentType: "text/html",
    markers: ["Judgment for AI and data product decisions", '"@type":"ProfilePage"'],
  },
  {
    name: "Claude-User article",
    path: "/articles/golden-data-product-portfolio/",
    userAgent: "Claude-User/1.0",
    contentType: "text/html",
    markers: ["Golden Data Product Portfolio", '"@type":"BlogPosting"'],
  },
  {
    name: "Googlebot article",
    path: "/articles/golden-data-product-portfolio/",
    userAgent:
      "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    contentType: "text/html",
    markers: ["article:published_time", "Dr. Jarkko Moilanen"],
  },
  {
    name: "PerplexityBot homepage",
    path: "/",
    userAgent:
      "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)",
    contentType: "text/html",
    markers: ["<h1", '"@type":"Person"'],
  },
  {
    name: "Bingbot site guide",
    path: "/llms.txt",
    userAgent: "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)",
    contentType: "text/plain",
    localContentType: "application/octet-stream",
    markers: ["# Jarkko Moilanen", "## Independent and institutional evidence"],
  },
  {
    name: "Agent catalog",
    path: "/.well-known/ai-catalog.json",
    userAgent: "Claude-User/1.0",
    contentType: "application/json",
    markers: ["urn:air:jarkkomoilanen.com:web:about"],
  },
  {
    name: "Sitemap",
    path: "/sitemap.xml",
    userAgent: "OAI-SearchBot/1.4",
    contentType: "application/xml",
    markers: ["https://jarkkomoilanen.com/about/"],
  },
];

async function fetchText({
  name,
  path,
  userAgent,
  contentType,
  localContentType,
  markers,
}) {
  const response = await fetch(`${origin}${path}`, {
    headers: { "user-agent": userAgent },
    redirect: "follow",
  });
  const body = await response.text();

  assert.equal(response.status, 200, `${name} returned ${response.status}`);
  const expectedContentType =
    origin.startsWith("http://127.0.0.1") && localContentType
      ? localContentType
      : contentType;
  assert.match(
    response.headers.get("content-type") ?? "",
    new RegExp(expectedContentType.replace("/", "\\/"), "i"),
    `${name} returned an unexpected content type`,
  );
  for (const marker of markers) {
    assert.ok(body.includes(marker), `${name} is missing marker: ${marker}`);
  }

  return {
    name,
    status: response.status,
    contentType: response.headers.get("content-type"),
    bytes: Buffer.byteLength(body),
  };
}

const robotsResponse = await fetch(`${origin}/robots.txt`, {
  headers: { "user-agent": "OAI-SearchBot/1.4; robots.txt" },
});
const robots = await robotsResponse.text();

assert.equal(robotsResponse.status, 200);
for (const policy of [
  /User-agent: GPTBot\s+Disallow: \//,
  /User-agent: ClaudeBot\s+Disallow: \//,
  /User-agent: OAI-SearchBot\s+Allow: \//,
  /User-agent: ChatGPT-User\s+Allow: \//,
  /User-agent: Claude-SearchBot\s+Allow: \//,
  /User-agent: Claude-User\s+Allow: \//,
  /User-agent: Googlebot\s+Allow: \//,
  /User-agent: Bingbot\s+Allow: \//,
  /User-agent: PerplexityBot\s+Allow: \//,
  /User-agent: Perplexity-User\s+Allow: \//,
]) {
  assert.match(robots, policy);
}
assert.match(robots, /Content-Signal: ai-train=no, search=yes, ai-input=yes/);
assert.match(robots, /Sitemap: https:\/\/jarkkomoilanen\.com\/sitemap\.xml/);

const results = await Promise.all(checks.map(fetchText));
console.table([
  {
    name: "robots.txt policy",
    status: robotsResponse.status,
    contentType: robotsResponse.headers.get("content-type"),
    bytes: Buffer.byteLength(robots),
  },
  ...results,
]);
