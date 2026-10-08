# AI search visibility and professional entity discovery audit

**Audit date:** 8 October 2026

**Scope:** `jarkkomoilanen.com`, its published HTML and discovery files, and public third-party evidence that can support professional claims

**Objective:** improve accurate discovery, citation, and recommendation of Dr. Jarkko Moilanen without weakening the existing Person entity graph or confusing search access with model-training permission

## Executive finding

The site is already technically accessible to the tested search crawlers. The larger constraint is evidence architecture: important claims are distributed across the About page, work pages, articles, PDFs, and external profiles, while most articles do not link to the sources needed to verify research or measurable claims.

The implementation accompanying this audit makes only low-risk technical changes:

- explicitly allows named search and user-triggered crawlers while blocking the named OpenAI and Anthropic training crawlers;
- retains the existing general crawl access, `Content-Signal`, Agentmap, sitemap, and Person graph;
- adds a verified Alation author profile to `sameAs`;
- makes article authorship visible and linked to the About page;
- gives the About page an entry in the agent discovery catalog;
- adds an independent/institutional evidence section to `llms.txt`;
- adds rendered-output assertions, a deployed-site HTTP checker, and a version-controlled 20-prompt measurement framework.

No professional achievement, testimonial, publication date, or independent endorsement has been invented. Editorial changes that require claim-owner review are listed separately.

## 1. AI discovery audit

### Live HTTP verification

The following requests were made against the public domain on 8 October 2026. They tested the actual GitHub Pages response using the named crawler user agent; they did not merely inspect repository configuration.

| Request | Live result | Evidence visible in the response |
| --- | --- | --- |
| `OAI-SearchBot` → `/robots.txt` | `200`, `text/plain` | General `Allow: /`, Content-Signal, Agentmap, host, and sitemap |
| `OAI-SearchBot` → `/` | `200`, `text/html` | Server-rendered title, H1, body copy, canonical URL, and Person JSON-LD |
| `Claude-SearchBot` → `/about/` | `200`, `text/html` | Complete profile content and ProfilePage structured data |
| `Claude-User` → `/articles/golden-data-product-portfolio/` | `200`, `text/html` | Full article content and BlogPosting structured data |
| `Googlebot` → the same article | `200`, `text/html` | Article title, content, author, canonical URL, and publication date |
| `Bingbot` → `/llms.txt` | `200`, `text/plain` | Site guide, canonical resources, and positioning |
| `Claude-User` → `/.well-known/ai-catalog.json` | `200`, `application/json` | Machine-readable site resources and representative queries |
| `OAI-SearchBot` → `/sitemap.xml` | `200`, `application/xml` | Canonical site URLs |
| `OAI-SearchBot` → `/resources/ODPS_whitepaper_2026_09.pdf` | `200`, `application/pdf` | Directly accessible publication asset |

The live host also returned HTML when sent `Accept: text/markdown`. This is not a crawl failure: the published HTML contains meaningful initial content and structured data. Content negotiation for Markdown would require hosting-layer support and is not justified as a migration on the evidence available.

The user-agent checks prove that the server and CDN did not reject these requests. They do **not** prove that any crawler has visited, indexed, cited, or ranked the pages. Search Console, Bing Webmaster Tools, referral logs where available, and the manual AI visibility runs are the appropriate evidence for that next layer.

### Crawler-policy assessment

The previous live `robots.txt` relied on a general allow plus `Content-Signal: ai-train=no`. That signal expresses the intended policy but does not replace each provider's documented crawler control.

The updated repository policy makes the separable decisions explicit:

| Agent | Purpose | Repository policy |
| --- | --- | --- |
| `OAI-SearchBot` | OpenAI search discovery | Allow |
| `ChatGPT-User` | User-initiated ChatGPT retrieval | Allow |
| `GPTBot` | OpenAI model-training crawl | Disallow |
| `Claude-SearchBot` | Anthropic search discovery | Allow |
| `Claude-User` | User-initiated Claude retrieval | Allow |
| `ClaudeBot` | Anthropic model-training crawl | Disallow |
| `Googlebot` | Google Search | Allow |
| `Bingbot` | Bing Search | Allow |
| Other crawlers | Existing public-web policy | General allow remains |

OpenAI documents independent controls for `OAI-SearchBot`, `ChatGPT-User`, and `GPTBot`: <https://developers.openai.com/api/docs/bots>. Anthropic documents separate `Claude-SearchBot`, `Claude-User`, and `ClaudeBot` controls: <https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler>.

Google's current control is less separable. `Google-Extended` covers both future Gemini model use and grounding in Gemini experiences, while Google Search is controlled by `Googlebot`: <https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers>. The implementation therefore does not add a `Google-Extended` rule without an explicit owner decision.

### Server-rendered content and stable URLs

- Core pages and articles contain useful text in the initial HTTP response; they do not depend on client-side JavaScript for discovery.
- Canonical URLs, sitemap entries, Open Graph metadata, and JSON-LD are present.
- Articles use stable slug URLs and expose `datePublished`.
- The site has a strong Person graph with the About page as the primary entity page and consistent `sameAs` links.
- The About page was missing from the agent discovery catalog and has now been added.
- The updated catalog, `llms.txt`, and structured data complement normal HTML discovery. They are not treated as ranking shortcuts or replacements for cited evidence.

### Internal linking

The global navigation and footer connect About, Work, Services, Publications, Articles, and Engage. Article pages also provide related links. The weakness is contextual linking: experience and result statements on About and Work pages rarely link inline to the publication, project, institution, or independent source that substantiates them.

Recommended pattern for a claim-bearing section:

1. concise claim in the narrative;
2. related project or publication link on the site;
3. independent or institutional source where one exists;
4. one relevant engagement path.

This should be applied selectively to high-value claims, not converted into repetitive link blocks.

## 2. Prioritized technical fixes

| Priority | Change | Expected impact | Effort | Status |
| --- | --- | --- | --- | --- |
| P0 | Separate search/user retrieval from named training crawlers in `robots.txt` | High policy clarity; avoids accidental training permission | Low | Implemented and deployed |
| P0 | Preserve server-rendered body content, canonical URLs, sitemap, and Person JSON-LD | High crawl and entity value | Low | Preserved and tested |
| P1 | Add visible, linked authorship to every article | Medium entity and reader clarity | Low | Implemented and deployed |
| P1 | Add About to the agent resource catalog | Medium machine-discovery completeness | Low | Implemented and deployed |
| P1 | Add verified institutional and third-party sources to `llms.txt` | Medium source discovery value | Low | Implemented and deployed |
| P1 | Add the Alation author profile to Person `sameAs` | Medium identity corroboration | Low | Implemented and deployed |
| P1 | Add a repeatable live HTTP check and rendered-output tests | High regression protection | Low | Implemented |
| P2 | Submit and monitor the sitemap in Google Search Console and Bing Webmaster Tools | High indexation evidence | Low | Operational follow-up; credentials required |
| P2 | Add PDF Author metadata and clickable reference links where missing | Medium citation usability | Medium | Proposed for the next source-export cycle |
| Decision | Set `Google-Extended` policy | Potentially high, but combines training and grounding | Low | Owner decision required |

The deployed-site checker intentionally validates the new policy. Run it after future deployments with `npm run check:ai-discovery` to detect production regressions.

## 3. Expertise content architecture

Do not create five separate keyword landing pages. That would fragment evidence and produce thin overlap. Use three authoritative surfaces, with About remaining the entity/evidence hub.

### A. AI product portfolio leadership

**Primary page:** expand the existing `/services/ai-products/` page.

**Also covers:** AI agent governance and decision context as a substantive method section, not a separate landing page.

The page should connect:

- **Problem:** organizations have many AI initiatives but weak portfolio decisions, data readiness, ownership, and evidence.
- **Experience:** only currently supportable leadership and portfolio responsibilities.
- **Methods:** portfolio triage, product operating model, decision rights, evidence gates, governed context, human approval, and reusable foundations.
- **Results:** separately label verified metrics, organization-level outcomes, and first-party observations.
- **Publications/projects:** AI CoE whitepaper, AI portfolio articles, government AI work, and relevant product work.
- **Independent evidence:** official organizational strategy and third-party professional profiles only where they substantiate the exact claim.
- **Engagement:** a portfolio review or focused advisory conversation.

### B. Data product transformation and ODPS

**Primary page:** strengthen the existing `/services/odps/` page.

The page should connect:

- **Problem:** catalogs and platform investments do not by themselves create usable, governed, machine-readable products.
- **Experience:** ODPS creator/maintainer role and implementation experience, with precise governance language.
- **Methods:** product definition, ownership, SLA, quality, licensing, pricing, strategy, portfolio governance, and agent-ready access.
- **Results:** separate formal specification progress, verified platform adoption, proofs of concept, and attributed customer statements.
- **Publications/projects:** current specification, whitepaper, implementation guide, articles, and repository.
- **Independent evidence:** Linux Foundation project governance, Alation marketplace/webinar, and NIIS/X-Road proof of concept.
- **Engagement:** ODPS assessment, adoption architecture, or portfolio operating model.

### C. Public-sector digital transformation

**Primary page:** add at most one consolidated `/expertise/public-sector-transformation/` page, subject to editorial approval.

**Covers:** government digital transformation and education transformation, linking to the existing detailed work pages instead of duplicating them.

The page should connect:

- **Problem:** public-sector transformation has to align services, data, policy, interoperability, capabilities, and measurable public value.
- **Experience:** Abu Dhabi government work, Finland's education infrastructure, X-Road/API work, and research—only at the level supportable by evidence.
- **Methods:** shared infrastructure, product thinking, portfolio governance, open standards, adoption, and capability building.
- **Results:** distinguish institutional outcomes from personal attribution.
- **Publications/projects:** government AI work, MPASSid, School 4 AI, X-Road materials, dissertation, and books.
- **Independent evidence:** DGE strategy, Finnish National Agency for Education, NIIS, Tampere University, and library records.
- **Engagement:** a public-sector transformation or capability-building conversation.

### Role of the About page

`/about/` should remain the canonical Person/ProfilePage and evidence index. Add compact contextual links from major claims to the three expertise surfaces, relevant publications, and independent evidence. Do not turn it into a duplicate service page.

## 4. AI citation readiness

### Existing strengths

- Every published article has a stable canonical URL, descriptive title, full server-rendered text, author structured data, and publication date.
- Article content is explanatory and preserves a recognizable first-person professional voice.
- The ODPS and AI CoE publications contain substantial source notes or reference sections.
- The site exposes downloadable PDFs directly rather than hiding them behind forms.

### Gaps to address before adding more content

- Of 14 published Markdown articles inspected, 12 contain no clickable external source link in the article body. Several of those articles make research, survey, standards, or measurable claims that readers cannot verify from the page.
- Articles expose publication dates but do not have trustworthy modification dates. Do not manufacture them; add a `modified` field only when a substantive reviewed change is made.
- Visible article authorship was limited to an end signature. A linked byline near the title is now implemented.
- Some PDFs show the author on the page but lack complete PDF metadata. `ai-products-and-data-products-whitepaper.pdf` lacks Author metadata; `data-quality-is-not-data-product-quality.pdf` lacks useful title/author metadata and its displayed reference URLs are not link annotations.
- Result claims on About and Work pages need a direct path to evidence, especially when a number is used.

### Editorial rule

Preserve the existing narrative style. Add concise source notes, inline links, and evidence callouts only where they help verify a claim. Do not rewrite articles into generic FAQ pages or add question headings solely for search engines.

## 5. External authority evidence inventory

Evidence strength describes the source's ability to support the specific professional claim, not the prestige of the organization.

### Independent or institutional evidence

| Area | Source | What it can support | Strength and limitation |
| --- | --- | --- | --- |
| ODPS leadership | [Open Data Product Initiative GitHub organization](https://github.com/Open-Data-Product-Initiative) | Formal project governance, Linux Foundation project relationship, maintainer identity | Strong institutional project evidence; project-controlled rather than independent journalism |
| ODPS market adoption | [Alation Data Products Marketplace](https://www.alation.com/product/data-products-marketplace/) | Alation says its machine-readable data products are based on ODPS | Strong vendor-owned adoption evidence |
| ODPS expertise | [Alation ODPS webinar](https://www.alation.com/resource-center/webinars/what-is-a-data-product-how-to-build-one/) | Identifies Jarkko's ODPS leadership and subject expertise | Strong third-party event evidence |
| ODPS/X-Road adoption | [NIIS proof of concept](https://www.niis.org/blog/2024/1/21/unveiling-the-open-data-product-specification) | Independent organization tested ODPS with X-Road data services | Strong independent implementation evidence |
| X-Road contribution | [NIIS X-Road code samples](https://github.com/nordic-institute/X-Road-code-samples) | Repository attribution for training/code sample material | Strong institutional attribution for the material; narrow claim only |
| Book authorship | [Tampere University research portal: API Economy 101](https://researchportal.tuni.fi/en/publications/api-economy-101-changes-your-business/) | Bibliographic record and authorship | Strong institutional bibliographic evidence |
| Research publication | [Tampere University research portal: dissertation](https://researchportal.tuni.fi/fi/publications/3d-printing-focused-peer-production-revolution-in-design-developm) | Dissertation title, year, publisher, and author | Strong institutional bibliographic evidence |
| Conference presentation | [Hyperight interview](https://hyperight.com/data-monetization-requires-both-data-products-and-services/) | Speaker participation and topic connected to Data Innovation Summit | Good independent conference evidence; supports the specific appearance, not broader impact claims |
| Education infrastructure | [Finnish National Agency for Education: MPASSid](https://www.oph.fi/en/finnish-national-agency-education-services/mpassid) | MPASSid's national purpose and institutional ownership | Strong official service evidence; does not by itself attribute Jarkko's individual role |
| Government transformation context | [Department of Government Enablement: Abu Dhabi Government Digital Strategy](https://www.dge.gov.ae/en/news/adg-digital-strategy) | Official whole-of-government digital and AI strategy, targets, and institutional context | Strong official strategy evidence; does not by itself prove personal responsibility |
| Current professional identity | [Alation author profile](https://www.alation.com/blog/author/jarkko-moilanen/) | Public-sector role, topic expertise, and ODPS affiliation | Useful third-party-hosted identity evidence; biographical wording may be author-supplied |

### First-party, project-controlled, or attributed evidence

| Area | Source type | Appropriate use | Limitation |
| --- | --- | --- | --- |
| Professional results | About, Work, Services, and article pages on `jarkkomoilanen.com` | First-person account and portfolio evidence | Self-published; numerical outcomes need underlying or independent support |
| ODPS specification and publications | `opendataproducts.org`, project repositories, and PDFs authored by Jarkko | Primary-source definitions, methods, governance, and publication record | Project-controlled; adoption claims should link to adopter-owned sources |
| BASF testimonial | Quotation on ODPS/project-controlled surfaces | Attributed statement when the wording and speaker are retained | No BASF-owned public source was found in this audit; do not label it independently verified |
| Conference decks | SpeakerDeck or author-uploaded slides | Primary evidence of the material presented | Self-uploaded; event-organizer pages are stronger for participation claims |
| School 4 AI and education narrative | Project and personal pages | Current initiative scope and first-person history | Needs institutional links for historical role and measured national outcomes |

### Missing backlinks and identity references

Prioritize these gaps:

1. Obtain or identify an official Finnish National Agency for Education or Ministry source that names the responsible individual/team for MPASSid. The official service page supports the service, not personal attribution.
2. Link an official DGE speaker, staff, project, or publication page that names Jarkko if one exists. The strategy page supplies context but not personal responsibility.
3. Ask independent adopters to link their ODPS implementation to the canonical specification and maintainer page when editorially appropriate.
4. Reconcile external profiles that carry stale roles. ResearchGate appeared outdated during the audit and should not be treated as current-role evidence until refreshed.
5. Add verified persistent researcher identifiers, such as ORCID, only if ownership is confirmed. No identifier was added on inference.
6. Prefer event-organizer speaker/archive pages over author-uploaded decks for future conference evidence.

## 6. AI visibility test framework

The version-controlled framework is in [`docs/ai-visibility/`](./ai-visibility/README.md):

- `prompts.csv` defines 20 realistic prompts across expert discovery, consultant recommendations, AI transformation leadership, data product standards, AI agent governance, government transformation, and education transformation;
- every prompt records target intent, relevant expertise, expected evidence sources, and whether a mention is reasonably expected or merely possible;
- `results-template.csv` provides 80 rows: one for each prompt across ChatGPT Search, Gemini, Claude, and Perplexity;
- each result records whether Jarkko is mentioned, whether this website is cited, claim accuracy, cited evidence, and competing experts or sources;
- `tests/ai-visibility-framework.test.mjs` protects prompt count, categories, identifiers, and platform coverage.

The framework deliberately does not expect a mention in every answer. The primary outcome is accurate, evidence-backed representation; raw mention rate is secondary.

## 7. Editorial changes proposed for approval

These changes were not made automatically:

1. **Reconcile the MPASSid audience figure.** The About page says more than 2.5 million users, while the [current Finnish National Agency page](https://www.oph.fi/fi/palvelut/tietopalvelut/mpassid) describes reach of approximately one million pupils and teachers. Confirm whether the figures measure different populations or periods, then correct or qualify the site claim and link the source.
2. **Source the research-heavy articles first.** Add links or a compact source-notes section to the 12 articles without external references, prioritizing pieces that cite surveys, standards, DORA, McKinsey, MIT CISR, Anthropic, or numerical findings.
3. **Review numerical outcome claims.** Keep the `270% delivery speed` claim only with a clearly described method, date, scope, and source; otherwise qualify it as a first-party observed result.
4. **Add modification dates only during real updates.** When an article receives substantive fact-checking or source additions, record the reviewed modification date and emit it in structured data and visible metadata.
5. **Add contextual evidence links.** Link key claims on About, Government AI, education, and ODPS pages to the most specific project/publication and strongest available independent source.
6. **Tighten individual attribution.** Official institutional strategy or service pages establish the program context, not automatically Jarkko's personal role. Narrow wording or add a source that explicitly names him.
7. **Improve PDF accessibility at source.** On the next publication export, add complete Title/Author metadata and working link annotations for reference URLs; do not patch only the rendered PDF if the source document can be corrected.
8. **Approve the single public-sector expertise page before creation.** It should synthesize and route to existing evidence, not duplicate the About and Work pages.

## 8. Ranked implementation plan

| Rank | Action | Impact | Effort | Dependency |
| --- | --- | --- | --- | --- |
| 1 | Deploy and verify the explicit crawler policy, visible article bylines, About catalog entry, evidence links, and tests | High | Low | Normal review/deployment |
| 2 | Correct or qualify the MPASSid and other high-value numerical claims | High | Low–medium | Claim-owner review and source confirmation |
| 3 | Add verifiable sources to the research-heavy existing articles | High | Medium | Editorial approval; preserve voice |
| 4 | Strengthen `/services/ai-products/` and `/services/odps/` as the two main expertise pages | High | Medium | Editorial approval and evidence mapping |
| 5 | Add contextual evidence links to About and Work pages | High | Medium | Editorial approval |
| 6 | Create one consolidated public-sector expertise page | Medium–high | Medium | Approval after existing pages are improved |
| 7 | Submit/inspect Search Console and Bing Webmaster data, then run the 20-prompt baseline | High measurement value | Medium | Account access and deployed changes |
| 8 | Refresh stale third-party profiles and request specific institutional/adopter backlinks | Medium | Medium–high | External coordination |
| 9 | Improve PDF metadata and link annotations during the next source-export cycle | Medium | Medium | Editable source files |
| 10 | Re-run the same prompt set quarterly and compare accuracy, citations, and competing sources by category | Medium cumulative value | Low recurring | Stable protocol |

This ordering improves the evidence already present before creating more pages. It also keeps crawl controls, professional claims, and AI visibility measurement independently reviewable.

## 9. Validation record

- `npm test` passed all 38 tests, including the rendered HTML, crawler policy, verification-file, visibility-framework, and IndexNow suites.
- `npm run test:ai-visibility` passed both framework tests: 20 unique prompts, seven categories, and 80 platform result rows.
- `npm run build:pages` completed and generated 51 static pages.
- `npm run check:ai-discovery` passed against the production domain after deployment. It received `200` responses for all nine tested surfaces: crawler-specific HTML, `robots.txt`, `llms.txt`, the agent catalog, and sitemap.
- GitHub Pages workflow run [#228](https://github.com/kyyberi/jarkko/actions/runs/37727800703) built, tested, deployed, and submitted the initial 32 eligible canonical URLs to IndexNow.
- Manual unchanged workflow run [#229](https://github.com/kyyberi/jarkko/actions/runs/37728087745) completed successfully and submitted zero URLs, confirming that the persisted baseline suppresses redundant notifications.
- The production site serves the IndexNow key file and Bing verification XML from the site root. The deployed `robots.txt` explicitly permits the named search and user-triggered crawlers while keeping GPTBot and ClaudeBot blocked.
