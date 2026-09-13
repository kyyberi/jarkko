import {
  Arrow,
  Footer,
  Header,
  publicAssetPath,
  sitePath,
  workItems,
} from "./site";
import { getArticles } from "./articles";

const calendlyBookingUrl = "https://calendly.com/work-jarkkomoilanen/30min";

const engagementOptions = [
  {
    title: "AI Portfolio Review",
    engagement: "2-week review",
    pricingLabel: "Typical investment",
    price: "AED 35K–50K",
    question: "Too many AI ideas, pilots and competing priorities?",
    text:
      "I review your AI portfolio, ownership, value, KPIs, dependencies and delivery status.",
    outcomes: [
      "A prioritised portfolio",
      "Scale, stop, merge and fix recommendations",
      "Ownership and KPI gaps",
      "Executive decision brief",
      "90-day action plan",
    ],
    bestFor:
      "Organisations that need to decide where to invest next.",
    scopeNote:
      "Typical scope assumes one organisation or major business unit, up to around 15 initiatives and a defined group of stakeholders.",
  },
  {
    title: "Agentic AI Architecture Sprint",
    engagement: "3 to 4-week sprint",
    pricingLabel: "Typical investment",
    price: "AED 65K–95K",
    question:
      "You know where AI agents might help, but the architecture and implementation path remain unclear.",
    text:
      "I work with your business and technical teams to define the agent architecture across models, agent harnesses, MCP, APIs, enterprise data and knowledge graphs.",
    outcomes: [
      "Target architecture",
      "Agent and tool boundaries",
      "Data and knowledge design",
      "Governance approach",
      "Implementation backlog",
      "Prototype direction",
    ],
    bestFor:
      "Teams moving beyond chatbot experiments into operational AI agents.",
    scopeNote:
      "Typical scope covers a defined business domain and two to three target workflows. Production implementation is scoped separately.",
  },
  {
    title: "AI Center of Excellence & Operating Model",
    engagement: "4 to 6-week engagement",
    pricingLabel: "Typical investment",
    price: "AED 90K–130K",
    question:
      "AI initiatives are growing, but ownership, prioritisation, governance and delivery do not scale.",
    text:
      <>
        I design or strengthen your{" "}
        <a
          className="text-link"
          href={sitePath(
            "/insights/articles/ai-center-of-excellence-government-scale/",
          )}
        >
          AI Center of Excellence
        </a>{" "}
        and the operating model around it. We connect business priorities, AI
        product ownership, engineering, governance, portfolio decisions and
        value measurement.
      </>,
    outcomes: [
      "AI CoE mandate and scope",
      "Roles and decision rights",
      "AI opportunity intake and prioritisation",
      "Product lifecycle",
      "Portfolio governance",
      "Delivery model",
      "KPI and value model",
      "Operating cadence",
      "90-day implementation plan",
    ],
    bestFor:
      "Organisations moving from scattered AI initiatives and pilots toward a managed enterprise AI capability.",
    scopeNote:
      "Typical scope covers a medium-to-large organisation or a defined set of business functions. Group-wide or multi-entity transformation is scoped separately.",
  },
  {
    title: "Fractional AI Product Leadership",
    engagement: "1 to 3 days per week",
    pricingLabel: "From",
    price: "AED 25K/month",
    question:
      "You need senior AI product leadership now, without starting a long executive hiring process.",
    text:
      "I work directly with executives, product owners, architects and engineering teams.",
    outcomes: [
      "Set portfolio direction",
      "Prioritise investment",
      "Shape AI products",
      "Review architecture",
      "Fix ownership and delivery gaps",
      "Move priority products toward adoption",
    ],
    outcomeLabel: "Typical scope",
    bestFor:
      "Transformation programmes that need senior leadership connected directly to delivery.",
    scopeNote: "Monthly fee depends on the agreed commitment level.",
  },
];

const testimonials = [
  {
    name: "Toni Luhti",
    role: "VP-level Executive",
    relationship: "Managed Jarkko directly",
    quotes: [
      "Jarkko is one of the only very technical people who really understand business, who has a genuine passion to achieve all the given goals and to lead the entire organization's data strategy in a better direction by his own example.",
    ],
  },
  {
    name: "Matti Saastamoinen",
    role: "COO, Aplika",
    relationship: "Managed Jarkko directly",
    quotes: [
      "In the first year of the Open Data Tampere Region project he was one of the key persons bringing bright ideas and very agilely making them happen.",
      "Jarkko can hack, talk, listen, analyze, perform, and is a reliable and hard working character.",
    ],
  },
  {
    name: "Baraa Zaid",
    role: "Lead AI Engineer, Abu Dhabi Department of Government Enablement",
    relationship: "Reported to Jarkko directly",
    quotes: [
      "Dr. Jarkko is an excellent example of what a leader should be. He promotes a culture of transparency, collaboration and clear communication.",
      "His ability to translate business expectations into simple technical requirements and vice versa makes him ideal for both business people and developers.",
    ],
  },
  {
    name: "Rebecca Elias Poozhipuram",
    role: "Former User Acquisition Manager, Wolt",
    relationship: "Worked with Jarkko across teams",
    quotes: [
      "Jarkko has a clear vision and is extremely passionate about whatever he takes up. He is analytical and very articulate.",
      "What makes him stand apart is his ability to break down complex problems and his seamless communication skills.",
    ],
  },
  {
    name: "Preeti Singh",
    role: "Project Manager / Senior Business Analyst",
    relationship: "Worked with Jarkko as a client",
    quotes: [
      "He pushes himself as well as the team to think out of the box while keeping the focus on the target. He is the best client I had worked with.",
    ],
  },
];

const visibleTestimonials = testimonials.slice(0, 3);
const additionalTestimonials = testimonials.slice(3);

const credibilityOrganizations = [
  "Alation",
  "BASF",
  "Kruger",
  "Nasdaq",
  "VesoAI",
  "Abu Dhabi Government",
];

function ContactIcon({
  type,
}: {
  type: "calendar" | "email" | "linkedin" | "whatsapp";
}) {
  if (type === "calendar") {
    return (
      <svg
        aria-hidden="true"
        className="contact-icon"
        viewBox="0 0 24 24"
      >
        <path d="M5 5h14v14H5z" />
        <path d="M8 3v4" />
        <path d="M16 3v4" />
        <path d="M5 10h14" />
      </svg>
    );
  }

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
                initiatives into products that work. I lead AI strategy,
                portfolios, Centers of Excellence and operating models, and I
                also work hands-on with AI agents, agent harnesses, MCP, APIs
                and knowledge graphs.
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
              src={publicAssetPath("/images/jarkko-hero-abudhabi-2026.jpeg")}
              alt="Portrait of Jarkko Moilanen"
            />
            <div className="hero-residency-badge">
              <img
                src={publicAssetPath("/images/uae-flag.svg")}
                alt="United Arab Emirates flag"
              />
              <span>4+ years in UAE</span>
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
            <strong>Scaled Data and AI product work</strong>
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
                src={publicAssetPath("/images/hero-skyline.jpg")}
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
                Executive leadership, AI strategy, AI Center of Excellence
                setup, product portfolio management, and operating models.
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
                <div className="engagement-heading">
                  <span className="engagement-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{option.title}</h3>
                </div>
                <span className="engagement-label">{option.engagement}</span>
                <p className="engagement-question">{option.question}</p>
                <p>{option.text}</p>
                <div className="engagement-outcomes">
                  <span>{option.outcomeLabel ?? "You leave with"}</span>
                  <ul>
                    {option.outcomes.map((outcome) => (
                      <li key={outcome}>{outcome}</li>
                    ))}
                  </ul>
                </div>
                <div className="engagement-best">
                  <span>Best for</span>
                  <p>{option.bestFor}</p>
                </div>
                <div className="engagement-price">
                  <span>{option.pricingLabel}</span>
                  <strong>{option.price}</strong>
                </div>
                <p className="engagement-scope-note">{option.scopeNote}</p>
                <div className="engagement-action">
                  <a
                    className="button primary"
                    href={calendlyBookingUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Book a 30-minute call <Arrow />
                  </a>
                </div>
              </article>
            ))}
          </div>
          <p className="engagement-disclaimer">
            Typical investment ranges are indicative. Final scope and fee are
            agreed before kickoff and depend on organisation size, stakeholder
            count, systems involved, regulatory requirements and onsite needs.
            Production implementation, third-party costs and specialist
            services are quoted separately. Prices exclude 5% UAE VAT where
            applicable.
          </p>
          <div className="engagement-close">
            <div>
              <h3>Not sure which engagement fits?</h3>
              <p>
                Send me the problem you are facing. I will tell you where I
                think I add value and where I do not.
              </p>
            </div>
            <a
              className="button primary"
              href={calendlyBookingUrl}
              target="_blank"
              rel="noreferrer"
            >
              Book a meeting <Arrow />
            </a>
          </div>
        </section>

        <section
          className="section organization-proof-section"
          aria-labelledby="organization-proof-title"
        >
          <div className="organization-proof-head">
            <h2 id="organization-proof-title">
              Selected organizations I have worked with
            </h2>
            <p>
              Across government, enterprise data, AI, and broader data
              initiatives, including work across dozens of Abu Dhabi Government
              entities.
            </p>
          </div>
          <ul className="organization-proof-list">
            {credibilityOrganizations.map((organization) => (
              <li key={organization}>{organization}</li>
            ))}
          </ul>
        </section>

        <section
          className="section testimonials-section"
          aria-labelledby="testimonials-title"
        >
          <div className="section-head testimonials-head">
            <div className="section-kicker">Third-party proof</div>
            <div>
              <h2 className="section-title" id="testimonials-title">
                What people say
              </h2>
              <p className="testimonials-intro">
                Feedback from executives, engineers, clients, and delivery
                professionals I have worked with.
              </p>
            </div>
          </div>
          <div className="testimonials-grid">
            {visibleTestimonials.map((testimonial) => (
              <article className="testimonial-card" key={testimonial.name}>
                <div className="testimonial-person">
                  <h3>{testimonial.name}</h3>
                  <p>{testimonial.role}</p>
                  <span>{testimonial.relationship}</span>
                </div>
                <div className="testimonial-quotes">
                  {testimonial.quotes.map((quote) => (
                    <blockquote key={quote}>
                      <p>{quote}</p>
                    </blockquote>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <details className="testimonials-more">
            <summary>Show more recommendations</summary>
            <div className="testimonials-grid testimonials-grid-secondary">
              {additionalTestimonials.map((testimonial) => (
                <article className="testimonial-card" key={testimonial.name}>
                  <div className="testimonial-person">
                    <h3>{testimonial.name}</h3>
                    <p>{testimonial.role}</p>
                    <span>{testimonial.relationship}</span>
                  </div>
                  <div className="testimonial-quotes">
                    {testimonial.quotes.map((quote) => (
                      <blockquote key={quote}>
                        <p>{quote}</p>
                      </blockquote>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </details>
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
                <h3>AI products at Scale</h3>
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
                  <img src={publicAssetPath(item.image)} alt={item.imageAlt} />
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
                  <img src={publicAssetPath("/images/logo-udemy.png")} alt="Udemy" />
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
                    src={publicAssetPath("/images/logo-amazon.png")}
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
              <a
                href={calendlyBookingUrl}
                target="_blank"
                rel="noreferrer"
              >
                <ContactIcon type="calendar" />
                <span>Book a meeting</span>
              </a>
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
