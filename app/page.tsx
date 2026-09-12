import {
  Arrow,
  Footer,
  Header,
  assetPath,
  sitePath,
  workItems,
} from "./site";
import { getArticles } from "./articles";

const engagementOptions = [
  {
    title: "AI Product and Portfolio Review",
    text:
      "A focused review of your AI initiatives, product portfolio, priorities, ownership, KPIs and delivery model.",
    useful:
      "Useful when you have many AI ideas or pilots, but need a clear view of what to build, scale, stop or restructure.",
  },
  {
    title: "Agentic AI Architecture",
    text:
      "Turn an AI agent idea into a practical architecture and product direction.",
    useful:
      "I work hands-on with AI agents, agent harnesses, MCP, APIs, structured data and knowledge graphs. The engagement connects business goals with architecture, governance and an implementation path.",
  },
  {
    title: "AI Operating Model",
    text:
      "Define how AI products move from ideas into owned, governed and measurable products.",
    useful:
      "This covers product ownership, portfolio management, decision rights, delivery, KPIs, lifecycle management and adoption.",
  },
  {
    title: "Fractional AI Product Leadership",
    text:
      "Senior product leadership for a defined period without adding a permanent executive role.",
    useful:
      "I work across executives, business teams, product teams and engineers to move AI initiatives from discussion into delivery.",
  },
];

function ContactIcon({ type }: { type: "email" | "linkedin" | "whatsapp" }) {
  if (type === "email") {
    return (
      <svg
        aria-hidden="true"
        className="contact-icon"
        viewBox="0 0 24 24"
      >
        <path d="M4 6h16v12H4z" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    );
  }

  if (type === "linkedin") {
    return (
      <svg
        aria-hidden="true"
        className="contact-icon"
        viewBox="0 0 24 24"
      >
        <path d="M6 9v10" />
        <path d="M6 5.5v.1" />
        <path d="M11 19v-6.2c0-2.1 1.2-3.8 3.4-3.8 2.1 0 3.6 1.5 3.6 4.2V19" />
        <path d="M11 9v10" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className="contact-icon"
      viewBox="0 0 24 24"
    >
      <path d="M5 19.5 6.1 16A7.6 7.6 0 1 1 9 18.3z" />
      <path d="M9.5 8.5c.6 3 2.5 5 5 6l1.6-1.5" />
    </svg>
  );
}

export default function Home() {
  const articles = getArticles();
  const homepageArticles = articles.slice(0, 3);

  return (
    <div className="shell">
      <Header />

      <main>
        <section className="hero" id="about">
          <div className="hero-copy">
            <div>
              <div className="eyebrow">Jarkko Moilanen, PhD</div>
              <h1 className="hero-title">
                AI product leadership
                <br />
                from strategy
                <br />
                to <span className="accent">working systems</span>
              </h1>
              <p className="hero-lede">
                I help government and enterprise teams turn AI and data
                initiatives into products that work. I lead strategy, portfolios
                and operating models, and I also work hands-on with AI agents,
                agent harnesses, MCP, APIs and knowledge graphs.
              </p>
              <div className="hero-actions">
                <a className="button primary" href="#engagements">
                  Work with me <Arrow />
                </a>
                <a className="button" href="#work">
                  Explore my work <Arrow />
                </a>
              </div>
            </div>
            <div className="availability">
              <span className="dot" />
              <span>
                Available for consulting, fractional leadership and focused
                delivery through my UAE company.
              </span>
            </div>
          </div>

          <div className="hero-portrait">
            <img
              src={`${assetPath}/images/jarkko-hero-abudhabi-2026.jpeg`}
              alt="Portrait of Jarkko Moilanen"
            />
            <div className="hero-caption">
              <div className="hero-caption__text">
                Data product pioneer, standards maintainer, builder, author,
                and educator with Finnish roots, based in{" "}
                <strong>Abu Dhabi, UAE</strong> since 2022, and Vietnamese
                family ties pointing part of the future toward Vietnam.
              </div>
              <div className="hero-caption__flags" aria-label="International roots">
                <img
                  className="hero-caption__flag"
                  src={`${assetPath}/images/finland-flag.svg`}
                  alt="Finland flag"
                />
                <img
                  className="hero-caption__flag"
                  src={`${assetPath}/images/uae-flag.svg`}
                  alt="United Arab Emirates flag"
                />
                <img
                  className="hero-caption__flag"
                  src={`${assetPath}/images/vietnam-flag.svg`}
                  alt="Vietnam flag"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="credibility-band" aria-label="Executive credibility">
          <div className="credibility-item">
            <span>Result</span>
            <strong>270% delivery speed improvement</strong>
          </div>
          <div className="credibility-item">
            <span>Scale</span>
            <strong>
              2.5M+ users served through national digital infrastructure
            </strong>
          </div>
          <div className="credibility-item">
            <span>Leadership</span>
            <strong>Whole-of-government data and AI product work</strong>
          </div>
          <div className="credibility-item">
            <span>Reach</span>
            <strong>Data product thinking moving into practice across 56 countries</strong>
          </div>
        </section>

        <section className="section engagement-section" id="engagements">
          <div className="section-head engagement-head">
            <div className="section-kicker">Ways to work with me</div>
            <div>
              <h2 className="section-title">Lead + Build</h2>
              <p className="engagement-intro">
                I work with organisations that need senior AI and data product
                leadership, but also someone who understands how the technology
                is built.
              </p>
            </div>
            <figure className="engagement-billing">
              <img
                src={`${assetPath}/images/hero-skyline.jpg`}
                alt="Abu Dhabi skyline, representing UAE-based engagement billing"
              />
              <figcaption>
                <span>UAE company exists for billing</span>
                <strong>Data Maestro Academy FZE LLC</strong>
              </figcaption>
            </figure>
          </div>
          <div className="engagement-signal" aria-label="Engagement focus">
            <div>
              <span>Lead</span>
              <p>
                Executive leadership, AI product strategy, portfolio management,
                and operating models.
              </p>
            </div>
            <div>
              <span>Build</span>
              <p>
                AI agents, agent harnesses, MCP, APIs and SDKs, knowledge
                graphs, and hands-on prototyping.
              </p>
            </div>
          </div>
          <div className="engagement-grid">
            {engagementOptions.map((option, index) => (
              <article className="engagement-card" key={option.title}>
                <span className="engagement-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{option.title}</h3>
                <p>{option.text}</p>
                <p>{option.useful}</p>
              </article>
            ))}
          </div>
          <div className="engagement-close">
            <div>
              <h3>Need something different?</h3>
              <p>
                Bring me the problem. Short advisory sessions, architecture
                reviews, workshops and focused assignments are also available
                through my UAE company.
              </p>
            </div>
            <a className="button primary" href="#contact">
              Discuss an engagement <Arrow />
            </a>
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <div className="section-kicker">Current focus</div>
            <h2 className="section-title">
              Four areas. One professional body of work.
            </h2>
          </div>
          <div className="focus-grid">
            <article className="focus-item">
              <div>
                <div className="focus-number">01</div>
                <h3>Government-wide AI products</h3>
                <p>
                  Leading business-led AI product portfolios, entity
                  collaboration, data readiness, governance, and delivery in Abu
                  Dhabi.
                </p>
              </div>
              <a className="text-link" href={sitePath("/work/government-ai")}>
                Explore government AI <Arrow />
              </a>
            </article>
            <article className="focus-item">
              <div>
                <div className="focus-number">02</div>
                <h3>Maysano</h3>
                <p>
                  Building the operational platform and Portfolio Studio for
                  creating, governing, and scaling data product portfolios.
                </p>
              </div>
              <a className="text-link" href={sitePath("/work/maysano")}>
                Explore Maysano <Arrow />
              </a>
            </article>
            <article className="focus-item">
              <div>
                <div className="focus-number">03</div>
                <h3>Open standards and SDK</h3>
                <p>
                  Maintaining the Open Data Product ecosystem and developer
                  tooling under the Linux Foundation.
                </p>
              </div>
              <a
                className="text-link"
                href={sitePath("/work/standards-and-sdk")}
              >
                Explore standards and SDK <Arrow />
              </a>
            </article>
            <article className="focus-item">
              <div>
                <div className="focus-number">04</div>
                <h3>School 4 AI</h3>
                <p>
                  Building a community learning initiative in Vietnam where
                  young people learn practical AI and English by creating
                  visible outcomes together.
                </p>
              </div>
              <a className="text-link" href={sitePath("/work/school-of-ai")}>
                Explore School 4 AI <Arrow />
              </a>
            </article>
          </div>
        </section>

        <section className="section" id="work">
          <div className="section-head">
            <div className="section-kicker">Selected work</div>
            <h2 className="section-title">Built in public, tested in practice.</h2>
          </div>
          <div className="work-list">
            {workItems.map((item) => (
              <article className="work-row" key={item.slug}>
                <div className="work-index">{item.index}</div>
                <div className="work-copy">
                  <div className="work-label">{item.label}</div>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                  <a className="text-link" href={sitePath(`/work/${item.slug}`)}>
                    {item.cta} <Arrow />
                  </a>
                </div>
                <div className="work-visual">
                  <img src={`${assetPath}${item.image}`} alt={item.imageAlt} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="insights">
          <div className="section-head">
            <div className="section-kicker">Insights</div>
            <h2 className="section-title">
              Writing, books, and courses from the work itself.
            </h2>
          </div>
          <div className="insights-layout">
            <div className="article-list">
              {homepageArticles.map((article) => (
                <a
                  className="article-row"
                  href={sitePath(`/insights/articles/${article.slug}`)}
                  key={article.slug}
                >
                  <span className="article-date">{article.date}</span>
                  <span className="article-title">{article.title}</span>
                </a>
              ))}
              <a
                className="article-row article-row-all"
                href={sitePath("/insights/articles")}
              >
                <span className="article-date">Archive</span>
                <span className="article-title">Browse all insights</span>
              </a>
            </div>
            <aside className="media-stack" aria-label="Teaching and publishing">
              <article className="media-card">
                <div className="media-logo">
                  <img src={`${assetPath}/images/logo-udemy.png`} alt="Udemy" />
                </div>
                <div className="media-card-copy">
                  <div className="section-kicker">COURSES</div>
                  <h3>5 Masterclasses & Learners across 56 countries</h3>
                  <p>
                    Five Udemy courses covering data product foundations,
                    monetization, minimum lovable governance, the Open Data
                    Product Specification, and scalable value management with
                    the open-source SDK.
                  </p>
                </div>
                <p className="media-card-evidence">
                  5 courses · Ratings from 4.44 to 4.74
                </p>
                <a
                  className="text-link"
                  href="https://www.udemy.com/user/jarkko-moilanen/"
                >
                  Explore courses <Arrow />
                </a>
              </article>
              <article className="media-card">
                <div className="media-logo">
                  <img
                    src={`${assetPath}/images/logo-amazon.png`}
                    alt="Amazon"
                  />
                </div>
                <div className="media-card-copy">
                  <div className="section-kicker">BOOKS</div>
                  <h3>Books for data product leaders</h3>
                  <p>
                    Published work on data products, platform thinking, APIs,
                    governance, and the operating models needed to turn data
                    into managed value.
                  </p>
                </div>
                <a
                  className="text-link"
                  href="https://us.amazon.com/stores/Jarkko-Moilanen/author/B0B66HTHLM?ref=ap_rdr&shoppingPortalEnabled=true"
                >
                  View books and author profile <Arrow />
                </a>
              </article>
            </aside>
          </div>
        </section>

        <section className="cta" id="contact">
          <div className="cta-main">
            <small>Available for new challenges</small>
            <h2>Bring me the problem that needs senior attention.</h2>
            <div className="cta-lead">Discuss an engagement</div>
            <div className="cta-channels" aria-label="Contact channels">
              <a href="mailto:work@jarkkomoilanen.com">
                <ContactIcon type="email" />
                <span>Email work@jarkkomoilanen.com</span>
              </a>
              <a href="https://www.linkedin.com/in/jarkkomoilanen/">
                <ContactIcon type="linkedin" />
                <span>Contact in LinkedIn</span>
              </a>
              <a href="https://wa.me/971509718065">
                <ContactIcon type="whatsapp" />
                <span>Send a WhatsApp message</span>
              </a>
            </div>
          </div>
          <div className="cta-side">
            <p>
              I now have the time needed for executive advisory, workshops,
              portfolio reviews, architecture reviews, and strategic assignments
              that deserve proper senior attention.
            </p>
            <p className="cta-company">
              International advisory, workshop, and review engagements can be
              billed through Data Maestro Academy FZE LLC in the UAE.
            </p>
            <div className="location">Abu Dhabi, UAE</div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
