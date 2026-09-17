import {
  Arrow,
  Footer,
  Header,
  publicAssetPath,
  sitePath,
  workItems,
} from "./site";
import { getArticles } from "./article-data";
import { bookingContextFor, bookingPath, consultingServices, genericBookingService } from "./booking/services";

const engagementDetailsUrl = "/resources/jarkko-moilanen-services-and-engagements.pdf";

const engagementOptions = [
  {
    serviceId: "ai-portfolio-review",
    title: "AI Portfolio Review",
    engagement: "2-week review",
    pricingLabel: "Typical investment",
    price: "$10K–$15K",
    question: "Too many AI ideas, pilots and competing priorities?",
    text:
      "I help executives decide which AI initiatives deserve investment, which need stronger ownership, and which should stop before they absorb more attention.",
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
    serviceId: "agentic-ai-architecture-sprint",
    title: "Agentic AI Architecture Sprint",
    engagement: "3 to 4-week sprint",
    pricingLabel: "Typical investment",
    price: "$18K–$25K",
    question:
      "You know where AI agents might help, but the architecture and implementation path remain unclear.",
    text:
      "I work with business and technical teams to decide how agents should use models, tools, MCP, APIs, enterprise data and knowledge graphs without creating another fragile pilot.",
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
    serviceId: "ai-product-operating-model",
    title: "AI Product Operating Model",
    engagement: "4 to 6-week engagement",
    pricingLabel: "Typical investment",
    price: "Priced by scope",
    question:
      "AI initiatives are growing, but ownership, prioritisation, governance and delivery do not scale.",
    text:
      <>
        I design or strengthen your{" "}
        <a
          className="text-link"
          href={sitePath(
            "/articles/ai-center-of-excellence-government-scale/",
          )}
        >
          AI Center of Excellence
        </a>{" "}
        and the operating model around it. The work turns AI ambition into
        decision rights, portfolio rules, delivery paths and value measures
        teams can actually run.
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
    serviceId: "fractional-ai-product-leadership",
    title: "Fractional AI Product Leadership",
    engagement: "1 to 3 days per week",
    pricingLabel: "From",
    price: "$8K/month",
    question:
      "You need senior AI product leadership now, without starting a long executive hiring process.",
    text:
      "I work directly with executives, product owners, architects and engineering teams on the decisions that connect strategy, architecture and delivery.",
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

function bookingDataAttributes(serviceId: string, sourceCTA: string) {
  const service =
    consultingServices.find((option) => option.id === serviceId) ??
    genericBookingService;
  const context = bookingContextFor(service, sourceCTA);

  return {
    "data-booking-cta": "true",
    "data-booking-service": context.service,
    "data-booking-category": context.serviceCategory,
    "data-booking-type": context.bookingType,
    "data-booking-source-page": context.sourcePage,
    "data-booking-source-cta": context.sourceCTA,
    "data-booking-engagement-type": context.engagementType,
    "data-booking-duration": String(context.duration),
    "data-booking-indicative-value": context.indicativeValue,
  };
}

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

const credibilityProofGroups = [
  {
    scope: "Government scale",
    signal:
      "AI delivery, data exchange, and public-sector transformation contexts.",
    organizations: [
      "Abu Dhabi Government",
      "Core42",
      "Finnish Government",
      "Estonian Government",
    ],
  },
  {
    scope: "Enterprise data products",
    signal:
      "Operational data product, catalog, platform, and analytics work.",
    organizations: ["BASF", "Alation", "Kruger", "Nasdaq"],
  },
  {
    scope: "Open standards ecosystem",
    signal:
      "Vendor-neutral data and AI standards work that travels across platforms.",
    organizations: ["Linux Foundation / LF AI & Data", "FIWARE", "VesoAI"],
  },
];

function ContactIcon({
  type,
}: {
  type: "calendar" | "document" | "email" | "linkedin" | "whatsapp";
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

  if (type === "document") {
    return (
      <svg
        aria-hidden="true"
        className="contact-icon"
        viewBox="0 0 24 24"
      >
        <path d="M6 3h8l4 4v14H6z" />
        <path d="M14 3v5h4" />
        <path d="M9 13h6" />
        <path d="M9 17h6" />
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
                AI product
                <br className="mobile-title-break" /> leadership
                <br />
                from strategy
                <br />
                to{" "}
                <span className="accent">
                  working<span className="desktop-title-space"> </span>
                  <br className="mobile-title-break" />
                  systems
                </span>
              </h1>
              <p className="hero-lede">
                I help government and enterprise teams decide what to build,
                how to govern it, and how to move from AI pilots to working
                products. The work combines executive judgment, first-hand
                implementation experience, and hands-on architecture across AI
                agents, MCP, APIs, knowledge graphs and data products.
              </p>
              <div className="hero-actions">
                <a className="button primary" href="#engagements">
                  Work with me <Arrow />
                </a>
                <a className="button" href="#work">
                  Explore my work <Arrow />
                </a>
                <a
                  className="button"
                  href={sitePath(engagementDetailsUrl)}
                >
                  Download engagement details <Arrow />
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
              src={publicAssetPath("/images/jarkko-hero-abudhabi-2026.webp")}
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
                I work with organisations that need more than generic AI
                advice: portfolio choices, architecture decisions, operating
                models, and direct challenge from someone who has built these
                systems in enterprise and government settings.
              </p>
            </div>
            <figure className="engagement-billing">
              <img
                src={publicAssetPath("/images/hero-skyline.webp")}
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
                Executive decision support, AI strategy, AI Center of
                Excellence setup, product portfolio management, investment
                prioritisation, and operating models.
              </p>
            </div>
            <div>
              <span>Build</span>
              <p>
                Agent architecture, agent harnesses, MCP, APIs and SDKs,
                knowledge graphs, governed data product context, and hands-on
                prototyping.
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
                    href={bookingPath(option.serviceId, `${option.serviceId}-card`)}
                    {...bookingDataAttributes(option.serviceId, `${option.serviceId}-card`)}
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
            <figure className="engagement-close-media">
              <img
                src={publicAssetPath("/images/jarkko-engagement-portrait.webp")}
                alt="Jarkko Moilanen"
              />
            </figure>
            <div>
              <h3>Not sure which engagement fits?</h3>
              <p>
                Send me the problem you are facing. I will tell you where I
                think I add value and where I do not.
              </p>
            </div>
            <div className="engagement-close-actions">
              <a
                className="button primary"
                href={bookingPath(genericBookingService.id, "engagement-close")}
                {...bookingDataAttributes(genericBookingService.id, "engagement-close")}
              >
                Book a meeting <Arrow />
              </a>
              <a className="button" href={sitePath(engagementDetailsUrl)}>
                Download details <Arrow />
              </a>
            </div>
          </div>
          <article className="specialist-service-entry">
            <div>
              <div className="section-kicker">Open Data Product Standards</div>
              <h3>ODPS Enterprise Services</h3>
              <p>
                Work directly with the creator and maintainer of ODPS on
                evaluation, architecture fit, implementation review,
                agent-readiness, governance and enterprise adoption.
              </p>
            </div>
            <div className="specialist-service-actions">
              <a className="button primary" href={sitePath("/services/odps")}>
                Explore ODPS services <Arrow />
              </a>
              <a className="button" href={sitePath(engagementDetailsUrl)}>
                Download engagement deck <Arrow />
              </a>
            </div>
          </article>
        </section>

        <section
          className="section organization-proof-section"
          aria-labelledby="organization-proof-title"
        >
          <div className="organization-proof-head">
            <h2 id="organization-proof-title">
              Credibility across the places where AI decisions get difficult
            </h2>
            <p>
              Representative organizations and ecosystems from government,
              enterprise data, AI, and open standards work, including delivery
              across dozens of Abu Dhabi Government entities.
            </p>
          </div>
          <div className="organization-proof-groups">
            {credibilityProofGroups.map((group) => (
              <article className="organization-proof-group" key={group.scope}>
                <div>
                  <span>{group.scope}</span>
                  <p>{group.signal}</p>
                </div>
                <ul>
                  {group.organizations.map((organization) => (
                    <li key={organization}>{organization}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
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

        <section className="section focus-section">
          <div className="section-head focus-head">
            <figure className="focus-portrait">
              <img
                src={publicAssetPath("/images/jarkko-current-focus.webp")}
                alt="Jarkko Moilanen"
              />
            </figure>
            <div className="focus-title-copy">
              <div className="section-kicker">Current focus</div>
              <h2 className="section-title">
                Four areas. One professional body of work.
              </h2>
            </div>
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
              <a
                className="text-link"
                href={sitePath("/services/odps")}
              >
                ODPS Enterprise Services <Arrow />
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
          <div className="section-head focus-head insights-head">
            <figure className="focus-portrait insights-portrait">
              <img
                src={publicAssetPath("/images/insights-hero-portrait.webp")}
                alt="Jarkko Moilanen"
              />
            </figure>
            <div className="focus-title-copy insights-title-copy">
              <h2 className="section-title">
                Writing, books, and courses from the work itself.
              </h2>
            </div>
          </div>
          <div className="insights-layout">
            <div className="article-list">
              {homepageArticles.map((article) => (
                <a
                  className="article-row"
                  href={sitePath(`/articles/${article.slug}`)}
                  key={article.slug}
                >
                  <span className="article-date">{article.date}</span>
                  <span className="article-title">{article.title}</span>
                </a>
              ))}
              <a
                className="article-row article-row-all"
                href={sitePath("/articles")}
              >
                <span className="article-date">Archive</span>
                <span className="article-title">Browse all articles</span>
              </a>
            </div>
            <aside className="media-stack" aria-label="Teaching and publishing">
              <article className="media-card">
                <div className="media-logo">
                  <img src={publicAssetPath("/images/logo-udemy.webp")} alt="Udemy" />
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
                    src={publicAssetPath("/images/logo-amazon.webp")}
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
                href={bookingPath(genericBookingService.id, "contact-channel")}
                {...bookingDataAttributes(genericBookingService.id, "contact-channel")}
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
              <a href={sitePath(engagementDetailsUrl)}>
                <ContactIcon type="document" />
                <span>Download engagement details</span>
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
