import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const staticAssetVersion = "20260913-hero-panel";
const socialShareImagePattern = new RegExp(
  `https:\\/\\/jarkkomoilanen\\.com\\/images\\/social-share\\.jpg\\?v=${staticAssetVersion}`,
);

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
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(
    html,
    /<title>Jarkko Moilanen \| Senior AI &amp; Data Product Leader<\/title>/i,
  );
  assert.match(
    html,
    /<meta name="description" content="Senior AI and data product leader helping government and enterprise teams scale AI strategy, portfolios, Centers of Excellence, operating models, agents, MCP, APIs, and knowledge graphs\."/,
  );
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
    socialShareImagePattern,
  );
  assert.match(html, /<meta name="twitter:card" content="summary_large_image"/);
  assert.match(
    html,
    socialShareImagePattern,
  );
  assert.match(html, /<link rel="alternate" type="application\/rss\+xml" href="https:\/\/jarkkomoilanen\.com\/rss\.xml"/);
  assert.match(html, /<script type="application\/ld\+json">/);
  assert.match(html, /"@type":"Person"/);
  assert.match(html, /"jobTitle":"Senior AI and Data Product Leader"/);
  assert.match(html, /"AI Centers of Excellence"/);
  assert.match(html, /"Model Context Protocol"/);
  assert.match(html, /googletagmanager\.com\/gtag\/js\?id=G-KZ5N2GTKF5/);
  assert.match(html, /gtag\('config', 'G-KZ5N2GTKF5'\)/);
  assert.match(html, /AI product leadership[\s\S]*from strategy[\s\S]*working systems/);
  assert.match(html, /Jarkko Moilanen, PhD/);
  assert.match(html, /aria-label="Open navigation menu"/);
  assert.match(html, /id="mobile-navigation"/);
  assert.match(html, /aria-label="Mobile primary"/);
  assert.match(html, /href="\/#engagements"[\s\S]*AI Products/);
  assert.match(html, /href="\/services\/odps"[\s\S]*Data Products/);
  assert.match(html, /href="\/insights\/articles"/);
  assert.match(html, /href="\/about"/);
  assert.match(html, /href="\/services\/odps"/);
  assert.match(html, /aria-label="Executive credibility"/);
  assert.match(html, /270% delivery speed improvement/);
  assert.match(html, /2\.5M\+ users served through national digital infrastructure/);
  assert.match(html, /Scaled Data and AI product work/);
  assert.match(html, /Data product thinking moving into practice across 56 countries/);
  assert.ok(
    html.indexOf("270% delivery speed improvement") <
      html.indexOf("Four areas. One professional body of work."),
  );
  assert.match(html, /Four areas\. One professional body of work\./);
  assert.match(html, /Built in public, tested in practice\./);
  assert.doesNotMatch(css, /\.focus-grid\s*\{[^}]*border-block:/);
  assert.match(css, /\.focus-grid\s*\{[^}]*border-top:/);
  assert.doesNotMatch(css, /\.work-row\s*\{[^}]*border-bottom:/);
  assert.match(css, /\.work-row\s*\+\s*\.work-row\s*\{[^}]*border-top:/);
  assert.match(html, /Writing, books, and courses from the work itself\./);
  assert.equal((html.match(/class="article-row/g) ?? []).length, 4);
  assert.doesNotMatch(html, /class="article-arrow"/);
  assert.match(html, /class="article-row article-row-all"/);
  assert.ok(
    html.indexOf('class="article-list"') <
      html.indexOf('class="media-stack" aria-label="Teaching and publishing"'),
  );
  assert.match(html, /Browse all insights/);
  assert.match(
    html,
    /AI Center of Excellence: What I Learned Building AI at Government Scale/,
  );
  assert.doesNotMatch(
    html,
    /9 Actions We Took to Make Open Data Product Vocabulary AI-Agent-First/,
  );
  assert.match(html, /Bring me the problem that needs senior attention\./);
  assert.match(html, /AI products at Scale/);
  assert.match(html, /Maysano/);
  assert.match(html, /Data Product Standards/);
  assert.match(html, /\/images\/work-maysano\.png/);
  assert.match(html, /\/images\/work-odps\.png/);
  assert.match(html, /\/images\/work-abudhabi\.png/);
  assert.match(html, /class="hero-residency-badge"/);
  assert.match(html, /\/images\/uae-flag\.svg/);
  assert.match(html, /United Arab Emirates flag/);
  assert.match(html, /4\+ years in UAE/);
  assert.doesNotMatch(html, /hero-portrait-badge|hero-portrait-label|hero-caption/);
  assert.match(html, /Owner of company in UAE, Data Maestro Academy FZE LLC/);
  assert.match(html, /Business-ID: 262443655888/);
  assert.match(html, /Amber Gem Tower, 26th Floor, Ajman/);
  assert.match(html, /United Arab Emirates/);
  assert.match(html, /I lead AI strategy,[\s\S]*Centers of Excellence and operating models/);
  assert.match(html, /AI Center of Excellence setup/);
  assert.match(html, /AI Product Operating Model/);
  assert.match(html, /AI initiatives are growing, but ownership, prioritisation, governance and delivery do not scale/);
  assert.match(html, /I design or strengthen your[\s\S]*AI Center of Excellence/);
  assert.match(
    html,
    /href="\/insights\/articles\/ai-center-of-excellence-government-scale\/"[\s\S]*AI Center of Excellence/,
  );
  assert.match(html, /AI CoE mandate and scope/);
  assert.match(html, /AI opportunity intake and prioritisation/);
  assert.match(html, /KPI and value model/);
  assert.match(html, /90-day implementation plan/);
  assert.match(html, /managed enterprise AI capability/);
  assert.match(html, /\$10K–\$15K/);
  assert.match(html, /\$18K–\$25K/);
  assert.match(html, /Priced by scope/);
  assert.match(html, /From[\s\S]*\$8K\/month/);
  assert.doesNotMatch(html, /AED 35K|AED 65K|AED 90K|AED 25K/);
  assert.match(html, /ODPS Enterprise Services/);
  assert.match(html, /Explore ODPS services/);
  assert.match(html, /Open Data Product Specification family/);
  assert.match(html, /5 Masterclasses &amp; Learners across 56 countries/);
  assert.match(html, /Five Udemy courses covering data product foundations/);
  assert.match(html, /5 courses · Ratings from 4\.44 to 4\.74/);
  assert.match(html, /Explore courses/);
  assert.match(html, /https:\/\/www\.udemy\.com\/user\/jarkko-moilanen\//);
  assert.match(html, /\/images\/logo-udemy\.png/);
  assert.doesNotMatch(html, /class="course-evidence-grid"/);
  assert.doesNotMatch(html, /Published courses|Countries reached|Languages used by learners/);
  assert.doesNotMatch(
    html,
    /enrollment|students|monthly activity|course prices|revenue/i,
  );
  assert.match(html, /Books for data product leaders/);
  assert.match(html, /Published work on data products, platform thinking, APIs/);
  assert.match(html, /View books and author profile/);
  assert.match(html, /https:\/\/us\.amazon\.com\/stores\/Jarkko-Moilanen\/author\/B0B66HTHLM/);
  assert.match(html, /\/images\/logo-amazon\.png/);
  assert.equal(
    (html.match(/href="https:\/\/calendly\.com\/work-jarkkomoilanen\/30min"/g) ?? []).length,
    6,
  );
  assert.equal((html.match(/class="engagement-action"/g) ?? []).length, 4);
  assert.match(html, /Book a 30-minute call/);
  assert.match(html, /Discuss an engagement/);
  assert.equal((html.match(/Book a meeting/g) ?? []).length, 4);
  assert.doesNotMatch(html, /Discuss an engagement\s*<span aria-hidden="true">-&gt;<\/span>/);
  assert.ok(
    html.indexOf("Ways to work with me") < html.indexOf("What people say"),
  );
  assert.ok(
    html.indexOf("Ways to work with me") <
      html.indexOf("Selected organizations I have worked with"),
  );
  assert.ok(
    html.indexOf("Selected organizations I have worked with") <
      html.indexOf("What people say"),
  );
  assert.ok(html.indexOf("What people say") < html.indexOf("Current focus"));
  assert.match(html, /Across government, enterprise data, AI, and broader data initiatives/);
  assert.match(html, /dozens of Abu Dhabi Government entities/);
  assert.match(html, /Alation/);
  assert.match(html, /BASF/);
  assert.match(html, /Kruger/);
  assert.match(html, /Nasdaq/);
  assert.match(html, /VesoAI/);
  assert.match(html, /Abu Dhabi Government/);
  assert.equal((html.match(/class="testimonial-card"/g) ?? []).length, 5);
  assert.doesNotMatch(html, /Recommendation on LinkedIn/);
  assert.ok(html.indexOf("Toni Luhti") < html.indexOf("Matti Saastamoinen"));
  assert.ok(html.indexOf("Matti Saastamoinen") < html.indexOf("Baraa Zaid"));
  assert.ok(html.indexOf("Baraa Zaid") < html.indexOf("Rebecca Elias Poozhipuram"));
  assert.match(html, /Feedback from executives, engineers, clients, and delivery professionals/);
  assert.match(html, /Toni Luhti/);
  assert.match(html, /Matti Saastamoinen/);
  assert.match(html, /Baraa Zaid/);
  assert.match(html, /Rebecca Elias Poozhipuram/);
  assert.match(html, /Preeti Singh/);
  assert.match(html, /Show more recommendations/);
  assert.match(html, /one of the only very technical people who really understand business/);
  assert.match(html, /bringing bright ideas and very agilely making them happen/);
  assert.match(html, /excellent example of what a leader should be/);
  assert.match(html, /translate business expectations into simple technical requirements/);
  assert.match(html, /clear vision and is extremely passionate/);
  assert.match(html, /best client I had worked with/);
  assert.match(html, /aria-label="Contact channels"/);
  assert.match(html, /International advisory, workshop, and review engagements can be[\s\S]*billed through Data Maestro Academy FZE LLC in the UAE/);
  assert.match(html, /Contact in LinkedIn/);
  assert.match(html, /https:\/\/www\.linkedin\.com\/in\/jarkkomoilanen\//);
  assert.match(html, /Send a WhatsApp message/);
  assert.match(html, /https:\/\/wa\.me\/971509718065/);
  assert.doesNotMatch(html, /\+971509718065/);
  assert.match(html, /aria-label="Footer navigation"/);
  assert.match(html, /Proof and links/);
  assert.match(html, /2\.5M\+ users served through national infrastructure/);
  assert.match(html, /Open Data Product standards under the Linux Foundation/);
  assert.doesNotMatch(css, /font-family:\s*Georgia/);
  assert.doesNotMatch(css, /\.footer-proof li\s*\{[^}]*font-family:\s*var\(--serif\)/);
  assert.match(html, /\/images\/jarkko-hero-abudhabi-2026\.jpeg/);
  assert.doesNotMatch(html, /class="ticker"|ticker-inner|marquee/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/);
});

test("server-renders the about page", async () => {
  const response = await render("/about");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(
    html,
    /<title>About Jarkko Moilanen \| Senior AI &amp; Data Product Leader<\/title>/,
  );
  assert.match(
    html,
    /<meta name="description" content="Jarkko Moilanen is a senior AI and data product leader based in Abu Dhabi, helping government and enterprise teams turn AI and data initiatives into governed products at scale\."/,
  );
  assert.match(
    html,
    /<link rel="canonical" href="https:\/\/jarkkomoilanen\.com\/about\/"/,
  );
  assert.match(html, /class="about-hero"/);
  assert.match(html, /Building operating systems/);
  assert.match(html, /for data and AI products/);
  assert.match(html, /\/images\/jarkko-hero-abudhabi-2026\.jpeg/);
  assert.match(html, /Whole-of-government data and AI products/);
  assert.match(html, /Abu Dhabi Government&#x27;s Data Factory/);
  assert.match(html, /measurable public value/);
  assert.match(html, /Data product standards/);
  assert.match(html, /Open Data Product Specification[\s\S]*Linux Foundation[\s\S]*BASF[\s\S]*Alation[\s\S]*Kruger/);
  assert.match(html, /270 percent/);
  assert.match(html, /data-product-focused industry platform in Finland/);
  assert.match(html, /2019 when data product thinking was still taking early shape/);
  assert.match(html, /MPASSid/);
  assert.match(html, /Ministry of Education and Culture/);
  assert.match(html, /strategic national initiative under ministerial sponsorship/);
  assert.match(html, /legal changes, broad stakeholder management, and technology development/);
  assert.match(html, /2\.5 million users and remains in heavy use/);
  assert.match(html, /Alation/);
  assert.match(html, /BASF/);
  assert.match(html, /Kruger/);
  assert.match(html, /Government data exchange and API modernization/);
  assert.match(html, /REST API adoption for X-Road/);
  assert.match(html, /Finnish-Estonian collaboration/);
  assert.match(html, /X-Road later adopted/);
  assert.match(html, /THE WORK STARTS WITH A REAL PROBLEM/i);
  assert.match(html, /Discuss a problem/);
  assert.doesNotMatch(html, /Nasdaq/i);
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
    socialShareImagePattern,
  );
  assert.match(
    html,
    socialShareImagePattern,
  );
  assert.match(html, /OPEN STANDARD AND SDK/i);
  assert.match(html, /shared, machine-readable foundation for defining, governing, exchanging, and implementing data products/);
  assert.match(html, /href="https:\/\/opendataproducts\.org"/);
  assert.match(html, /href="https:\/\/opendataproducts\.org\/sdk"/);
  assert.match(html, /Open standards and SDKs for governed, interoperable, agent-ready data products/);
  assert.match(html, /people, platforms, automation, and AI agents interpret data products consistently/);
  assert.match(html, /Open standard/);
  assert.match(html, /maintained under the Linux Foundation/);
  assert.match(html, /Developer toolkit/);
  assert.match(html, /Interoperability/);
  assert.match(html, /Business and technical alignment/);
  assert.match(html, /Portable definitions/);
  assert.match(html, /Agent-ready metadata/);
  assert.match(html, /Open implementation paths/);
  assert.match(html, /Governed products/);
  assert.match(html, /Adoption and implementation/i);
  assert.match(html, /I founded and continue to lead the[\s\S]*Open Data Product Specification[\s\S]*family/);
  assert.match(html, /Enterprise adoption/);
  assert.match(html, /BASF, Alation, and Kruger/);
  assert.match(html, /Platform integration/);
  assert.match(html, /Government data exchange/);
  assert.match(html, /Adopted by X-Road/);
  assert.match(html, /Open ecosystem/);
  assert.match(html, /ODPS Enterprise Services/);
  assert.match(html, /href="\/services\/odps"/);
  assert.match(html, /Connected parts of the data product operating system/);
  assert.match(html, /Maysano turns business intent, source material, portfolio design, and governance/);
  assert.match(html, /Portfolio work connecting government priorities, governed data, readiness, and AI product delivery/);
});

test("server-renders the ODPS enterprise services page", async () => {
  const response = await render("/services/odps");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(
    html,
    /<title>ODPS Enterprise Services \| Jarkko Moilanen<\/title>/,
  );
  assert.match(
    html,
    /<link rel="canonical" href="https:\/\/jarkkomoilanen\.com\/services\/odps\/"/,
  );
  assert.match(html, /OPEN DATA PRODUCT STANDARDS/i);
  assert.match(html, /Adopt data product standards with the person who created them/);
  assert.match(html, /\/images\/odps-services-hero\.jpg/);
  assert.match(html, /Jarkko Moilanen with data product interface elements/);
  assert.match(html, /maintain the standards family under LF AI &amp; Data/);
  assert.match(html, /The standard stays open/);
  assert.match(html, /Creator of ODPS/);
  assert.match(html, /Open-source Python SDK and MCP tooling/);
  assert.match(html, /ODPS Enterprise Readiness Assessment/);
  assert.match(html, /ODPS Adoption &amp; Implementation/);
  assert.match(html, /Agent-Ready Data Product Architecture/);
  assert.match(html, /ODPS Expert Advisory/);
  assert.match(html, /\$20K–\$40K/);
  assert.match(html, /From \$50K/);
  assert.match(html, /\$35K–\$70K/);
  assert.match(html, /From \$2\.5K\/day/);
  assert.match(html, /The standard is open\. Deep implementation experience is scarce\./);
  assert.match(html, /Tested against real enterprise needs\./);
  assert.match(html, /Alation/);
  assert.match(html, /BASF/);
  assert.match(html, /Kruger/);
  assert.match(html, /ODPS engagement or wider AI transformation/);
  assert.match(html, /existing AI consulting engagements/);
  assert.match(html, /Commercial consulting,[\s\S]*Data Maestro Academy FZE LLC/);
  assert.match(html, /commercial services[\s\S]*are not required to use it/);
  assert.match(html, /Discuss an ODPS engagement/);
  assert.match(html, /Explore the ODPS standards/);
  assert.match(html, /href="https:\/\/opendataproducts\.org"/);
  assert.doesNotMatch(html, /AED 35K|AED 65K|AED 90K|AED 25K/);
});

test("server-renders the Maysano work page as a real platform", async () => {
  const response = await render("/work/maysano");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /PLATFORM AND PORTFOLIO STUDIO/i);
  assert.match(html, /Maysano Studio[\s\S]*is an available platform/);
  assert.match(html, /href="https:\/\/studio\.maysano\.com"/);
  assert.match(html, /I was the igniter behind[\s\S]*Maysano/);
  assert.match(html, /Book a demo/);
  assert.match(html, /https:\/\/www\.linkedin\.com\/in\/jarkkomoilanen\//);
  assert.match(html, /Business goals/);
  assert.match(html, /Portfolio/);
  assert.match(html, /Data products/);
  assert.match(html, /From business intent to governed product systems/);
  assert.match(html, /Portfolio Studio for turning strategy, discovery, governance, and data product decisions into a working operating environment/);
  assert.match(html, /Portfolio Studio/);
  assert.match(html, /Structured product definition/);
  assert.match(html, /Governance and readiness/);
  assert.match(html, /Operating environment/);
  assert.match(html, /Foundation, not replacement/);
  assert.match(html, /does not replace data platforms, catalogs, governance tools, or delivery systems/);
  assert.match(html, /Business framing/);
  assert.match(html, /Portfolio design/);
  assert.match(html, /Operationalization/);
  assert.doesNotMatch(html, /concept-only|coming soon|startup/i);
});

test("server-renders the government AI work page without operational detail", async () => {
  const response = await render("/work/government-ai");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /ABU DHABI GOVERNMENT AI DELIVERY/i);
  assert.match(html, /class="detail-hero work-government-ai"/);
  assert.match(html, /Building AI products for public value/i);
  assert.match(html, /Abu Dhabi aims to become the world&#x27;s first fully AI-native government by 2027/);
  assert.match(html, /sovereign cloud infrastructure, integrated data, strong cybersecurity/);
  assert.match(html, /better outcomes for people and communities/);
  assert.match(html, /one of the leads shaping the government AI products portfolio/);
  assert.match(html, /Discuss the approach/);
  assert.match(html, /Priority needs/);
  assert.match(html, /Data readiness/);
  assert.match(html, /AI products/);
  assert.match(html, /Public value/);
  assert.match(html, /Senior portfolio work shaping AI products at scale across Abu Dhabi Government priorities/i);
  assert.match(html, /Portfolio direction/);
  assert.match(html, /Readiness and governance/);
  assert.match(html, /Cross-entity delivery/);
  assert.match(html, /Decision support/);
  assert.doesNotMatch(html, /sole lead/i);
  assert.doesNotMatch(html, /dataset|specific partner|KPI|delivery stage/i);
});

test("server-renders article pages", async () => {
  const [response, css] = await Promise.all([
    render(
      "/insights/articles/agentic-data-product-operations-the-next-maturity-layer-for-ai-data-product-management",
    ),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(
    html,
    /Agentic Data Product Operations: The Next Maturity Layer for AI Data Product Management/,
  );
  assert.match(
    html,
    /<link rel="canonical" href="https:\/\/jarkkomoilanen\.com\/insights\/articles\/agentic-data-product-operations-the-next-maturity-layer-for-ai-data-product-management\/"/,
  );
  assert.match(html, /<meta property="og:type" content="article"/);
  assert.match(
    html,
    socialShareImagePattern,
  );
  assert.match(
    html,
    socialShareImagePattern,
  );
  assert.match(
    html,
    /<meta property="article:published_time" content="2026-06-25T00:00:00.000Z"/,
  );
  assert.match(html, /AI agents do not remove the need for governance/);
  assert.match(html, /fragmented-to-governed-operations\.png/);
  assert.match(html, /catalog-to-operating-workspace\.png/);
  assert.match(html, /class="article-image-button"/);
  assert.match(html, /class="article-header"/);
  assert.match(html, /Share/);
  assert.match(html, /https:\/\/www\.linkedin\.com\/sharing\/share-offsite\/\?url=/);
  assert.match(html, /https:\/\/twitter\.com\/intent\/tweet\?url=/);
  assert.match(css, /\/images\/article-header-bg\.webp/);
  assert.match(css, /\.article-image-button\s*\{[^}]*width:\s*min\(90%, 100%\)/);
  assert.match(css, /\.article-image-modal\s*\{[^}]*backdrop-filter:\s*blur\(8px\)/);
  assert.doesNotMatch(css, /\.article-figure img\s*\{[^}]*border:\s*2px solid var\(--ink\)/);
  assert.match(html, /Related insights/);
});

test("server-renders article resource links", async () => {
  await access(
    new URL(
      "../public/resources/ai-centers-of-excellence-jarkko-moilanen.pdf",
      import.meta.url,
    ),
  );

  const response = await render(
    "/insights/articles/ai-center-of-excellence-government-scale",
  );
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(
    html,
    /href="\/resources\/ai-centers-of-excellence-jarkko-moilanen\.pdf"[\s\S]*AI Centers of Excellence: Operating Model, Economics, and Implementation Blueprint\./,
  );
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
    socialShareImagePattern,
  );
  assert.match(
    html,
    socialShareImagePattern,
  );
  assert.match(html, /Writing from the work itself/);
  assert.match(html, /aria-label="Article categories"/);
  assert.match(html, /href="#category-ai-products"/);
  assert.match(html, /href="#category-data-products"/);
  assert.match(html, /href="#category-standards"/);
  assert.match(html, /id="category-ai-products"/);
  assert.match(html, /id="category-data-products"/);
  assert.match(html, /id="category-standards"/);
  assert.match(html, /From Data Product Portfolio to Shared Memory for AI Agents/);
  assert.match(html, /9 Actions We Took to Make Open Data Product Vocabulary AI-Agent-First/);
  assert.match(css, /\/images\/insights-header-bg\.webp/);
  assert.doesNotMatch(css, /\.article-index\s*\{[^}]*border-block:/);
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
  assert.match(
    robotsText,
    /Content-Signal: ai-train=no, search=yes, ai-input=yes/,
  );
  assert.match(
    robotsText,
    /Agentmap: https:\/\/jarkkomoilanen\.com\/\.well-known\/ai-catalog\.json/,
  );
  assert.match(robotsText, /Sitemap: https:\/\/jarkkomoilanen\.com\/sitemap\.xml/);
  assert.match(sitemapText, /<loc>https:\/\/jarkkomoilanen\.com\/<\/loc>/);
  assert.match(sitemapText, /<loc>https:\/\/jarkkomoilanen\.com\/about\/<\/loc>/);
  assert.match(
    sitemapText,
    /<loc>https:\/\/jarkkomoilanen\.com\/insights\/articles\/agentic-data-product-operations-the-next-maturity-layer-for-ai-data-product-management\/<\/loc>/,
  );
  assert.match(
    sitemapText,
    /<loc>https:\/\/jarkkomoilanen\.com\/work\/standards-and-sdk\/<\/loc>/,
  );
  assert.match(
    sitemapText,
    /<loc>https:\/\/jarkkomoilanen\.com\/services\/odps\/<\/loc>/,
  );
});

test("publishes an ARD manifest for agent discovery", async () => {
  const source = await readFile(
    new URL("../public/.well-known/ai-catalog.json", import.meta.url),
    "utf8",
  );
  const catalog = JSON.parse(source);

  assert.equal(catalog.specVersion, "1.0");
  assert.equal(catalog.host.displayName, "Jarkko Moilanen");
  assert.equal(catalog.host.identifier, "did:web:jarkkomoilanen.com");
  assert.ok(Array.isArray(catalog.entries));
  assert.ok(catalog.entries.length >= 1);

  for (const entry of catalog.entries) {
    assert.match(entry.identifier, /^urn:air:jarkkomoilanen\.com:[a-z0-9-]+:[a-z0-9-]+$/);
    assert.equal(typeof entry.displayName, "string");
    assert.match(entry.type, /^[a-z0-9!#$&^_.+-]+\/[a-z0-9!#$&^_.+-]+$/i);
    assert.equal("url" in entry, true);
    assert.equal("data" in entry, false);
    assert.ok(Array.isArray(entry.representativeQueries));
    assert.ok(entry.representativeQueries.length >= 2);
    assert.ok(entry.representativeQueries.length <= 5);
  }
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
