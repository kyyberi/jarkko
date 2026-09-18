import type { Metadata } from "next";
import { Arrow, PageShell, publicAssetPath, sitePath } from "../../site";
import { canonicalPath, DEFAULT_OG_IMAGE, DEFAULT_OG_IMAGE_ALT } from "../../seo";
import {
  bookingContextFor,
  bookingPath,
  consultingServices,
  genericBookingService,
} from "../../booking/services";

const engagementDetailsUrl = "/resources/jarkko-moilanen-services-and-engagements.pdf";

const aiProductServices = [
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

const capabilityRows = [
  {
    label: "Lead",
    text:
      "Executive decision support, AI strategy, AI Center of Excellence setup, product portfolio management, investment prioritisation, and operating models.",
  },
  {
    label: "Build",
    text:
      "Agent architecture, agent harnesses, MCP, APIs and SDKs, knowledge graphs, governed data product context, and hands-on prototyping.",
  },
];

function bookingDataAttributes(serviceId: string, sourceCTA: string) {
  const service =
    consultingServices.find((option) => option.id === serviceId) ??
    genericBookingService;
  const context = bookingContextFor(service, sourceCTA);

  const attributes: Record<string, string> = {
    "data-booking-cta": "true",
    "data-booking-service": context.service,
    "data-booking-category": context.serviceCategory,
    "data-booking-type": context.bookingType,
    "data-booking-source-page": "/services/ai-products/",
    "data-booking-source-cta": context.sourceCTA,
    "data-booking-engagement-type": context.engagementType,
    "data-booking-duration": String(context.duration),
  };

  if (context.indicativeValue) {
    attributes["data-booking-indicative-value"] = context.indicativeValue;
  }

  return attributes;
}

export const metadata: Metadata = {
  title: "AI Product Services",
  description:
    "AI portfolio review, agentic AI architecture, AI product operating model, and fractional AI product leadership services from Jarkko Moilanen.",
  alternates: {
    canonical: canonicalPath("/services/ai-products"),
  },
  openGraph: {
    title: "AI Product Services | Jarkko Moilanen",
    description:
      "Senior AI product services for portfolio decisions, agent architecture, operating models, and fractional product leadership.",
    url: canonicalPath("/services/ai-products"),
    type: "website",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        alt: DEFAULT_OG_IMAGE_ALT,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Product Services | Jarkko Moilanen",
    description:
      "Portfolio reviews, architecture sprints, operating models, and fractional AI product leadership.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function AiProductServicesPage() {
  return (
    <PageShell>
      <section className="service-hero ai-product-service-hero">
        <div className="service-hero-copy">
          <div className="section-kicker">AI product services</div>
          <h1>Move from AI pilots to working product systems.</h1>
          <p>
            I work with government and enterprise teams that need more than
            generic AI advice: portfolio choices, architecture decisions,
            operating models and direct challenge from someone who has built
            these systems in enterprise and government settings.
          </p>
          <p>
            The work connects executive judgment with hands-on architecture
            across AI agents, MCP, APIs, knowledge graphs and data products.
          </p>
          <div className="service-hero-actions">
            <a
              className="button primary"
              href={bookingPath("ai-portfolio-review", "ai-products-hero-primary")}
              {...bookingDataAttributes("ai-portfolio-review", "ai-products-hero-primary")}
            >
              Discuss an AI product engagement <Arrow />
            </a>
            <a className="button" href={sitePath(engagementDetailsUrl)}>
              Engagement options <Arrow />
            </a>
          </div>
        </div>
        <figure className="service-hero-image">
          <img
            src={publicAssetPath("/images/jarkko-engagement-portrait.webp")}
            alt="Jarkko Moilanen"
          />
        </figure>
      </section>

      <section className="section service-family-section">
        <div className="service-family-head service-family-editorial-head">
          <figure className="service-family-image">
            <img
              src={publicAssetPath("/images/hero-skyline.webp")}
              alt="Abu Dhabi skyline, representing UAE-based engagement billing"
            />
          </figure>
          <div className="engage-section-head">
            <div className="eyebrow">AI engagement paths</div>
            <h2>Portfolio choices, architecture, operating model, leadership.</h2>
            <p>
              Each path is scoped around a concrete decision or operating
              outcome, with the option to continue only when the next step has
              real value.
            </p>
          </div>
        </div>

        <div className="engagement-signal" aria-label="Engagement focus">
          {capabilityRows.map((row) => (
            <div key={row.label}>
              <span>{row.label}</span>
              <p>{row.text}</p>
            </div>
          ))}
        </div>

        <div className="engagement-grid">
          {aiProductServices.map((service, index) => (
            <article className="engagement-card" key={service.title}>
              <div className="engagement-heading">
                <span className="engagement-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{service.title}</h3>
              </div>
              <span className="engagement-label">{service.engagement}</span>
              <p className="engagement-question">{service.question}</p>
              <p>{service.text}</p>
              <div className="engagement-outcomes">
                <span>{service.outcomeLabel ?? "You leave with"}</span>
                <ul>
                  {service.outcomes.map((outcome) => (
                    <li key={outcome}>{outcome}</li>
                  ))}
                </ul>
              </div>
              <div className="engagement-best">
                <span>Best for</span>
                <p>{service.bestFor}</p>
              </div>
              <div className="engagement-price">
                <span>{service.pricingLabel}</span>
                <strong>{service.price}</strong>
              </div>
              <p className="engagement-scope-note">{service.scopeNote}</p>
              <div className="engagement-action">
                <a
                  className="button primary"
                  href={bookingPath(service.serviceId, `${service.serviceId}-card`)}
                  {...bookingDataAttributes(service.serviceId, `${service.serviceId}-card`)}
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
          Production implementation, third-party costs and specialist services
          are quoted separately. Prices exclude 5% UAE VAT where applicable.
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
              href={bookingPath(genericBookingService.id, "ai-products-close")}
              {...bookingDataAttributes(genericBookingService.id, "ai-products-close")}
            >
              Book a meeting <Arrow />
            </a>
            <a className="button" href={sitePath(engagementDetailsUrl)}>
              Download details <Arrow />
            </a>
          </div>
        </div>
      </section>

      <section className="section service-proof-section">
        <div className="detail-grid service-proof-editorial">
          <div>
            <div className="eyebrow">Fit</div>
            <h2>AI product engagement or data product standards?</h2>
          </div>
          <div className="service-copy">
            <p>
              AI Product Services focus on deciding what to build, how to
              govern AI portfolios, how agents should work inside the business,
              and what operating model is needed to move beyond scattered
              pilots.
            </p>
            <p>
              ODPS Enterprise Services focus on data product standards,
              interoperability, implementation and agent-ready product
              architecture.
            </p>
            <p>
              Some programs involve both. An AI portfolio or agent architecture
              engagement can expose the need for stronger data product
              foundations. An ODPS engagement can expand into a wider AI
              product operating model.
            </p>
            <a className="text-link" href={sitePath("/services/odps")}>
              Explore Data Product Services <Arrow />
            </a>
          </div>
        </div>
      </section>

      <section className="cta odps-service-cta">
        <div className="cta-main">
          <small>Need a senior AI product view?</small>
          <h2>Bring me the problem that needs senior attention.</h2>
          <div className="cta-lead">Discuss an AI product engagement</div>
          <div className="hero-actions">
            <a
              className="button primary"
              href={bookingPath(genericBookingService.id, "ai-products-final-primary")}
              {...bookingDataAttributes(genericBookingService.id, "ai-products-final-primary")}
            >
              Book a meeting <Arrow />
            </a>
            <a className="button" href={sitePath(engagementDetailsUrl)}>
              Download engagement details <Arrow />
            </a>
          </div>
        </div>
        <div className="cta-side">
          <p>
            I now have the time needed for executive advisory, workshops,
            portfolio reviews, architecture reviews and strategic assignments
            that deserve proper senior attention.
          </p>
          <p className="cta-company">
            International advisory, workshop and review engagements can be
            billed through Data Maestro Academy FZE LLC in the UAE.
          </p>
          <div className="location">Abu Dhabi, UAE</div>
        </div>
      </section>
    </PageShell>
  );
}
