import type { Metadata } from "next";
import { Arrow, PageShell, publicAssetPath, sitePath } from "../../site";
import { canonicalPath, DEFAULT_OG_IMAGE, DEFAULT_OG_IMAGE_ALT } from "../../seo";
import { EngagementStagePattern } from "../../engagement-stage-pattern";
import {
  bookingContextFor,
  bookingPath,
  genericBookingService,
} from "../../booking/services";

const odpsWhitepaperUrl = "/resources/ODPS_whitepaper_2026_09.pdf";
const engagementDetailsUrl = "/resources/jarkko-moilanen-services-and-engagements.pdf";

const odpsProofMetrics = [
  {
    kicker: "ODPS business ecosystem",
    value: "$177B+",
    label: "Annual business footprint",
    description:
      "Commercial organizations with documented ODPS adoption or implementation",
  },
  {
    value: "15",
    label: "Named organizations",
    description:
      "Publicly identified adoption, implementation or integration records",
  },
  {
    value: "7",
    label: "Strong adoption signals",
    description:
      "High-confidence public cases including BASF, Alation, NATO, FIWARE and NIIS",
  },
  {
    value: "$184B",
    label: "Total quantified footprint",
    description: "Including institutional economic activity",
  },
];

const odpsTestimonials = [
  {
    label: "BASF",
    quote:
      "“We at BASF built our group-wide Data Product concept largely on ODPS and extended it to our specific needs.”",
    name: "Manfred Sorg",
    role: "Group Data Office, BASF",
  },
  {
    label: "Ron Tolido",
    quote: "“ODPS makes product thinking concrete for data and AI.”",
    name: "Ron Tolido",
    role: "CTO and Executive VP, Techstraordinary",
  },
  {
    label: "NIIS",
    quote:
      "“Extending X-Road OAS service descriptions with ODPS makes data product-related metadata available in the service catalogue more unified.”",
    name: "Petteri Kivimäki",
    role: "CTO, Nordic Institute for Interoperability Solutions",
  },
];

const pocPackages = [
  {
    serviceId: "data-product-portfolio-accelerator",
    label: "Start a new PoC",
    title: "Data Product Portfolio Accelerator",
    duration: "2 weeks",
    price: "USD 15,000",
    headline:
      "Turn business documents into standardized data product portfolios and connected graphs.",
    description: [
      "Your organization already holds valuable business knowledge in Word documents, Excel spreadsheets, PDFs, meeting transcripts, and technical documentation.",
      "The Open Data Products Python SDK transforms these materials into standardized, machine-readable data product portfolios using a single CLI workflow. It combines deterministic processing with LLM-assisted interpretation, automated specification generation, and validation.",
      "This engagement applies the technology to your own business materials and demonstrates its practical value through a structured, measurable Proof of Concept.",
    ],
    deliverables: [
      "A working PoC using selected customer business documents",
      "An initial portfolio of data product candidates",
      "Machine-readable ODPS family specifications",
      "Connected graph relationships between relevant products and business context",
      "A lightweight visual portfolio review",
      "A configured, repeatable SDK CLI workflow",
      "Structural validation and business review",
      "Measured processing time and productivity evidence",
      "Technical handover and knowledge transfer",
      "Recommendations for broader enterprise adoption",
    ],
    scope: [
      "One business domain or monetization scenario",
      "Up to 20 input documents, subject to agreed size and complexity limits",
      "Up to 10 reviewed candidate data products, where supported by source evidence",
      "One configured SDK workflow",
      "Two knowledge-transfer sessions",
    ],
    note:
      "This engagement produces validated PoC artifacts and an implementation foundation. Production platform deployment and custom enterprise integrations are not included by default.",
    cta: "Discuss a Portfolio Accelerator",
  },
  {
    serviceId: "odps-poc-review-acceleration",
    label: "Advance an existing PoC",
    title: "ODPS PoC Review & Acceleration",
    duration: "Approximately 1 week",
    price: "USD 7,500",
    headline: "Already experimenting with ODPS? Get expert guidance to move forward.",
    description: [
      "Organizations are already applying ODPS, the Open Data Products SDK, data contracts, and knowledge graphs in their own environments.",
      "Some need technical validation. Others need help resolving architecture issues, improving automation, or moving from a successful experiment toward enterprise adoption.",
      "This engagement provides direct access to the maintainer of the ODPS standards family and SDK to review your existing implementation, identify improvement opportunities, and establish a practical path forward.",
    ],
    deliverables: [
      "Review of the existing PoC and its business objectives",
      "ODPS standards compliance assessment",
      "SDK automation and workflow review",
      "Data product architecture assessment",
      "Contract and governance recommendations",
      "Review of graph relationships and semantic structures, where applicable",
      "Prioritized technical corrections",
      "Targeted hands-on implementation guidance",
      "A practical roadmap toward broader adoption",
    ],
    note:
      "This is a fixed-scope technical assessment and acceleration engagement. Extensive remediation, enterprise platform integrations, and production deployment require separate scoping.",
    cta: "Review My ODPS PoC",
  },
];

const pocEvidence = [
  {
    value: "3–6 hours → 5–15 minutes",
    label: "Requirements-to-specification processing time",
    description:
      "Demonstrated in a stock market data monetization Proof of Concept using the Open Data Products Python SDK. Results are evidence from that PoC, not a guarantee for every use case.",
  },
  {
    value: "24,000+ downloads",
    label: "Open Data Products Python SDK on PyPI",
    description:
      "Distribution count for the SDK through PyPI. It is not a count of unique users, customers, or organizations.",
  },
];

const services = [
  {
    serviceId: "odps-maintainer-session",
    title: "ODPS Maintainer Session",
    engagement: "60-minute expert session",
    question:
      "You are already evaluating, implementing or scaling ODPS and need a direct second opinion before a decision becomes expensive.",
    text:
      "A focused session with the person who created the original specification and maintains the ODPS standards family. Use it to test an architecture choice, implementation approach, data product design or governance question.",
    outcomeLabel: "Typical topics",
    outcomes: [
      "Architecture review",
      "ODPS implementation review",
      "Data product design",
      "Agent readiness",
      "Integration with existing platforms",
      "Governance and portfolio structure",
      "Second opinion on an implementation approach",
    ],
    bestFor:
      "Organizations that need fast expert access before committing to a direction.",
    price: "$200 / 60 minutes",
    priceLabel: "",
  },
  {
    serviceId: "data-product-portfolio-accelerator",
    title: "Data Product Portfolio Accelerator",
    engagement: "2-week PoC engagement",
    question:
      "You want to start a new ODPS Proof of Concept from your own business documents and demonstrate practical value quickly.",
    text:
      "I apply the Open Data Products Python SDK to selected customer materials, creating a reviewed portfolio of data product candidates, connected graph context and machine-readable ODPS artifacts through a repeatable CLI workflow.",
    outcomes: [
      "Working document-to-portfolio PoC",
      "Reviewed data product candidates and ODPS family specifications",
      "Connected graph relationships and visual portfolio review",
      "Configured SDK workflow, validation and technical handover",
      "Measured productivity evidence and adoption recommendations",
    ],
    bestFor:
      "Organizations starting a focused PoC in one business domain or monetization scenario.",
    price: "USD 15,000",
    priceLabel: "Starting price",
    scopeNote:
      "Production deployment and custom enterprise integrations are not included by default.",
  },
  {
    serviceId: "odps-poc-review-acceleration",
    title: "ODPS PoC Review & Acceleration",
    engagement: "Approximately 1-week engagement",
    question:
      "You already have an ODPS implementation or experiment underway and need expert guidance to move it forward.",
    text:
      "I review the PoC against its business objectives, ODPS standards, SDK workflow, architecture, contracts, governance and graph semantics, then identify the most valuable technical corrections and next adoption steps.",
    outcomes: [
      "Existing PoC and business-objective review",
      "ODPS compliance, SDK automation and architecture assessment",
      "Contract, governance and semantic-graph recommendations",
      "Prioritized technical corrections and hands-on guidance",
      "Practical roadmap toward broader adoption",
    ],
    bestFor:
      "Organizations advancing an existing ODPS experiment without yet scoping a broader implementation program.",
    price: "USD 7,500",
    priceLabel: "Starting price",
    scopeNote:
      "Extensive remediation, enterprise platform integrations, and production deployment require separate scoping.",
  },
  {
    serviceId: "odps-enterprise-readiness-assessment",
    title: "ODPS Enterprise Readiness Assessment",
    engagement: "2 to 4-week engagement",
    question:
      "You are evaluating ODPS, but need to understand how it fits your existing data architecture, catalog, governance and operating model.",
    text:
      "I assess your current environment against the ODPS standards family and identify the key adoption decisions: whether ODPS fits, where it should start, which existing practices should remain, and what integration work is required.",
    outcomes: [
      "Current-state assessment",
      "ODPS fit and gap analysis",
      "Target adoption model",
      "Architecture and integration recommendations",
      "Governance implications",
      "Prioritized adoption roadmap",
      "Executive decision brief",
    ],
    bestFor:
      "Organizations evaluating ODPS before committing to implementation.",
    price: "$20K–$40K",
  },
  {
    serviceId: "odps-adoption-implementation",
    title: "ODPS Adoption & Implementation",
    engagement: "6 to 12-week engagement",
    question:
      "You have decided to adopt ODPS and need to turn the standard into a working enterprise capability.",
    text:
      "I work with business, data, architecture and platform teams to define the target model and establish the first implementation. The work can cover ODPS product specifications, catalogs, product graphs, controlled vocabularies, workflows, enterprise profiles, SDK automation and integration with existing platforms.",
    outcomes: [
      "Enterprise ODPS adoption model",
      "Enterprise profiles and conventions",
      "Initial product specifications",
      "Catalog and graph structure",
      "Integration architecture",
      "SDK and automation approach",
      "Governance and ownership model",
      "Implementation backlog",
      "Working reference implementation where included in scope",
    ],
    bestFor:
      "Organizations moving from ODPS evaluation into implementation.",
    price: "From $50K",
  },
  {
    serviceId: "agent-ready-data-product-architecture",
    title: "Agent-Ready Data Product Architecture",
    engagement: "4 to 8-week engagement",
    question:
      "Your AI agents need more than access to databases, APIs and documents. They need structured product context, ownership, semantics, relationships, quality expectations and governance.",
    text:
      "I help decide how data products should expose themselves to AI agents so people, platforms and agents work from the same governed product context. The engagement connects the ODPS standards family with AI agent architecture, MCP, knowledge graphs, enterprise APIs and your existing data platforms.",
    outcomes: [
      "Agent-readiness assessment",
      "Product context architecture",
      "Machine-readable data product contracts",
      "Product and dependency graph design",
      "Agent access and tool boundaries",
      "MCP integration approach",
      "Governance and control model",
      "Reference agent workflows",
      "Implementation roadmap",
    ],
    bestFor:
      "Organizations building enterprise AI agents that need governed access to trusted data products.",
    price: "$35K–$70K",
  },
  {
    serviceId: "odps-expert-advisory",
    title: "ODPS Expert Advisory",
    engagement: "Ongoing or focused advisory",
    question:
      "Get direct access to the creator and maintainer of ODPS while your organization evaluates, implements or integrates the standards.",
    text:
      "I work with enterprise architects, product leaders, data offices, platform teams and vendors during implementation and major decisions where direct knowledge of the standards and their design direction reduces uncertainty and implementation risk.",
    outcomeLabel: "Typical work includes",
    outcomes: [
      "Architecture reviews",
      "ODPS implementation reviews",
      "Enterprise profile design",
      "Platform integration decisions",
      "Data product modeling",
      "Catalog and graph design",
      "AI and agent readiness",
      "SDK adoption",
      "Governance decisions",
      "Vendor and technology reviews",
    ],
    bestFor:
      "Organizations already working with ODPS that need senior specialist guidance without a full implementation engagement.",
    price: "From $2.5K/day",
  },
];

function bookingDataAttributes(sourceCTA: string) {
  const context = bookingContextFor(genericBookingService, sourceCTA);
  return {
    "data-booking-cta": "true",
    "data-booking-service": context.service,
    "data-booking-category": context.serviceCategory,
    "data-booking-type": context.bookingType,
    "data-booking-source-page": "/services/odps/",
    "data-booking-source-cta": context.sourceCTA,
    "data-booking-engagement-type": context.engagementType,
    "data-booking-duration": String(context.duration),
    "data-booking-indicative-value": context.indicativeValue,
  };
}

export const metadata: Metadata = {
  title: "ODPS Enterprise Services",
  description:
    "Specialist ODPS PoCs, assessment, maintainer sessions, adoption, implementation, agent-ready data product architecture, and advisory services from Jarkko Moilanen, creator and maintainer of ODPS.",
  alternates: {
    canonical: canonicalPath("/services/odps"),
  },
  openGraph: {
    title: "ODPS Enterprise Services | Jarkko Moilanen",
    description:
      "Evaluate, implement and scale ODPS with the person who created and maintains the Open Data Product Specification.",
    url: canonicalPath("/services/odps"),
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
    title: "ODPS Enterprise Services | Jarkko Moilanen",
    description:
      "Maintainer sessions, assessment, adoption, implementation, and advisory services for ODPS in enterprise environments.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function OdpsServicesPage() {
  return (
    <PageShell>
      <section className="service-hero odps-service-hero">
        <div className="service-hero-copy">
          <div className="section-kicker">Open Data Product Standards</div>
          <h1>Work directly with the person behind ODPS.</h1>
          <p>
            I created the Open Data Product Specification and continue to
            maintain the standards family under LF AI & Data, part of the
            Linux Foundation.
          </p>
          <p>
            Organizations use ODPS in enterprise products and data
            environments. Others are deciding whether the standards fit their
            architecture, governance, platforms and AI-agent direction.
          </p>
          <p>
            I work directly with organizations from first evaluation through
            architecture, implementation review, governance and scaling. The
            standard stays open. The engagement focuses on deciding how to make
            it work in your environment.
          </p>
          <div className="service-hero-actions">
            <a
              className="button primary"
              href={bookingPath("odps-hero-primary")}
              {...bookingDataAttributes("odps-hero-primary")}
            >
              Book a 30-minute starting meeting <Arrow />
            </a>
            <a className="button" href={sitePath(engagementDetailsUrl)}>
              Engagement options <Arrow />
            </a>
            <a className="button" href={sitePath(odpsWhitepaperUrl)}>
              Get White Paper <Arrow />
            </a>
          </div>
        </div>
        <figure className="service-hero-image">
          <img
            src={publicAssetPath("/images/odps-services-hero.webp")}
            alt="Jarkko Moilanen with data product interface elements"
          />
        </figure>
      </section>

      <EngagementStagePattern
        title="Data product engagement steps"
        stageServices={{
          QUESTION: ["ODPS Maintainer Session"],
          DIAGNOSE: [
            "ODPS PoC Review & Acceleration",
            "Enterprise Readiness Assessment",
          ],
          DESIGN: ["Agent-Ready Architecture"],
          DELIVER: [
            "Data Product Portfolio Accelerator",
            "Adoption & Implementation",
          ],
          DRIVE: ["Expert Advisory"],
        }}
      />

      <section
        className="odps-proof-matrix"
        aria-labelledby="odps-testimonials-title"
      >
        <div className="odps-proof-metrics">
          {odpsProofMetrics.map((metric) => (
            <article className="odps-proof-metric" key={metric.label}>
              {metric.kicker ? (
                <div className="section-kicker">{metric.kicker}</div>
              ) : null}
              <strong>{metric.value}</strong>
              <h2>{metric.label}</h2>
              <p>{metric.description}</p>
            </article>
          ))}
        </div>
        <div className="odps-testimonials-section">
          <div className="odps-testimonials-head">
            <div className="section-kicker">ODPS evidence</div>
            <h2 id="odps-testimonials-title">
              What industry leaders say
            </h2>
            <p>
              Documented adoption spans enterprise, public-sector architecture,
              open-source tooling and interoperability platforms.
            </p>
          </div>
          <div className="odps-testimonials-grid">
            {odpsTestimonials.map((testimonial) => (
              <article className="odps-testimonial" key={testimonial.name}>
                <h3>{testimonial.label}</h3>
                <blockquote>
                  <p>{testimonial.quote}</p>
                </blockquote>
                <footer>
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.role}</span>
                </footer>
              </article>
            ))}
          </div>
        </div>
        <p className="odps-proof-note">
          Figures based on publicly documented adoption cases and available
          financial data.
        </p>
      </section>

      <section className="section poc-engagement-section" aria-labelledby="poc-engagements-title">
        <div className="poc-engagement-head">
          <div className="eyebrow">Practical ODPS engagements</div>
          <h2 id="poc-engagements-title">From experimentation to measurable results.</h2>
          <p>
            Organizations are already experimenting with ODPS, data product
            automation, knowledge graphs, and AI-agent-ready architectures.
            Whether you are starting a new Proof of Concept or advancing one
            already underway, these focused engagements help you demonstrate
            value, reduce implementation uncertainty, and establish a
            repeatable approach.
          </p>
        </div>

        <div className="poc-package-grid">
          {pocPackages.map((service) => (
            <article className="poc-package" key={service.serviceId}>
              <div className="poc-package-heading">
                <span>{service.label}</span>
                <h3>{service.title}</h3>
              </div>
              <div className="poc-package-facts">
                <div>
                  <span>Duration</span>
                  <strong>{service.duration}</strong>
                </div>
                <div>
                  <span>Starting price</span>
                  <strong>{service.price}</strong>
                </div>
              </div>
              <p className="poc-package-headline">{service.headline}</p>
              <div className="poc-package-copy">
                {service.description.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="poc-package-list">
                <span>Included deliverables</span>
                <ul>
                  {service.deliverables.map((deliverable) => (
                    <li key={deliverable}>{deliverable}</li>
                  ))}
                </ul>
              </div>
              {service.scope ? (
                <div className="poc-package-list poc-package-scope">
                  <span>Proposed standard scope</span>
                  <ul>
                    {service.scope.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <p className="poc-package-note">{service.note}</p>
              <div className="poc-package-action">
                <a
                  className="button primary"
                  href={bookingPath(`${service.serviceId}-featured`)}
                  {...bookingDataAttributes(`${service.serviceId}-featured`)}
                >
                  {service.cta} <Arrow />
                </a>
              </div>
            </article>
          ))}
        </div>

        <section className="poc-evidence" aria-labelledby="poc-evidence-title">
          <div className="poc-evidence-head">
            <div className="eyebrow">SDK productivity evidence</div>
            <h3 id="poc-evidence-title">Proven automation. Open standards. Practical results.</h3>
          </div>
          <div className="poc-evidence-metrics">
            {pocEvidence.map((metric) => (
              <article key={metric.label}>
                <strong>{metric.value}</strong>
                <h4>{metric.label}</h4>
                <p>{metric.description}</p>
              </article>
            ))}
          </div>
          <div className="poc-workflow" aria-label="Business inputs flow through the Open Data Products SDK to standardized outputs">
            <div>
              <span>Business inputs</span>
              <p>Word · Excel · PDF · Meeting transcripts</p>
            </div>
            <span className="poc-workflow-arrow" aria-hidden="true">↓</span>
            <div>
              <span>Open Data Products SDK</span>
              <p>Deterministic processing + LLM-assisted interpretation</p>
              <small>Single CLI workflow</small>
            </div>
            <span className="poc-workflow-arrow" aria-hidden="true">↓</span>
            <div>
              <span>Standardized outputs</span>
              <p>Data Product Portfolio · Connected Graph · ODPS Family Artifacts</p>
            </div>
          </div>
        </section>
      </section>

      <section className="section service-family-section">
        <div className="service-family-head service-family-editorial-head">
          <figure className="service-family-image">
            <img
              src={publicAssetPath("/images/odps-success-story.jpg")}
              alt="Jarkko Moilanen with data product interface visuals"
            />
          </figure>
          <div className="engage-section-head">
            <div className="eyebrow">ODPS engagement paths</div>
            <h2>Evaluation, implementation, scaling, expert access.</h2>
          </div>
        </div>
        <div className="engagement-grid">
          {services.map((service, index) => (
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
              {service.scopeNote ? (
                <p className="engagement-scope-note">{service.scopeNote}</p>
              ) : null}
              <div className="engagement-best">
                <span>Best for</span>
                <p>{service.bestFor}</p>
              </div>
              <div className="engagement-price">
                {service.priceLabel !== "" ? (
                  <span>{service.priceLabel ?? "Typical investment"}</span>
                ) : null}
                <strong>{service.price}</strong>
              </div>
              <div className="engagement-action">
                <a
                  className="button primary"
                  href={bookingPath(`${service.serviceId}-card`)}
                  {...bookingDataAttributes(`${service.serviceId}-card`)}
                >
                  Book a 30-minute starting meeting{" "}
                  <Arrow />
                </a>
              </div>
            </article>
          ))}
        </div>
        <p className="engagement-disclaimer">
          Typical investment ranges are indicative. Commercial consulting,
          advisory and implementation services are provided independently by
          Jarkko Moilanen through Data Maestro Academy FZE LLC. ODPS remains an
          open standard maintained under LF AI & Data, and commercial services
          are not required to use it.
        </p>
      </section>

      <section className="section service-proof-section">
        <div className="detail-grid service-proof-editorial">
          <div>
            <div className="eyebrow">Implementation experience</div>
            <h2>The standard is open. Deep implementation experience is scarce.</h2>
          </div>
          <div className="service-copy">
            <p>
              ODPS started as an open specification for describing data
              products and has grown into a standards family covering products,
              catalogs, graphs and shared vocabulary, supported by developer
              tooling for automation and AI agents.
            </p>
            <p>
              I work across both sides of that system. I lead the standards
              work, understand why design decisions were made, and build the
              software and implementation patterns around it. I also work with
              enterprise and government environments where data products must
              operate inside existing architecture, governance and delivery
              constraints.
            </p>
            <p>
              An ODPS engagement therefore starts with your environment and the
              decisions required to make adoption work: fit, architecture,
              governance, agent readiness, platform integration and the route
              from first implementation to portfolio scale.
            </p>
          </div>
        </div>
      </section>

      <section className="section organization-proof-section">
        <div className="organization-proof-head organization-proof-editorial-head">
          <div>
            <div className="eyebrow">Public references</div>
            <h2>Tested against real enterprise needs.</h2>
          </div>
          <p>
            Public references on the current site include ODPS-related work
            involving Alation, BASF and Kruger. Additional named commercial
            references are not added unless public evidence or permission
            exists.
          </p>
        </div>
        <ul className="organization-proof-list">
          <li>Alation</li>
          <li>BASF</li>
          <li>Kruger</li>
        </ul>
      </section>

      <section className="section service-proof-section">
        <div className="detail-grid service-proof-editorial">
          <div>
            <div className="eyebrow">Fit</div>
            <h2>ODPS engagement or wider AI transformation?</h2>
          </div>
          <div className="service-copy">
            <p>
              ODPS Enterprise Services focus on data product standards,
              interoperability, implementation and agent-ready product
              architecture. The typical path is evaluation, then blueprint and
              implementation advisory, then governance and enterprise adoption.
            </p>
            <p>
              For wider AI portfolio, operating model and agent architecture
              needs, use the AI Product Services page.
            </p>
            <p>
              Some programs involve both. An AI portfolio or agent architecture
              engagement can expose the need for stronger data product
              foundations. An ODPS engagement can expand into a wider AI
              product operating model.
            </p>
            <a className="text-link" href={sitePath("/services/ai-products")}>
              Explore AI Product Services <Arrow />
            </a>
          </div>
        </div>
      </section>

      <section className="cta odps-service-cta">
        <div className="cta-main">
          <small>Evaluating ODPS?</small>
          <h2>Send me the situation you are working with.</h2>
          <div className="cta-lead">Discuss an ODPS engagement</div>
          <div className="hero-actions">
            <a
              className="button primary"
              href={bookingPath("odps-final-primary")}
              {...bookingDataAttributes("odps-final-primary")}
            >
              Book a 30-minute starting meeting <Arrow />
            </a>
            <a className="button" href="https://opendataproducts.org">
              Explore the ODPS standards <Arrow />
            </a>
          </div>
        </div>
        <div className="cta-side">
          <p>
            If your organization is considering ODPS, implementing it,
            integrating it into a platform or preparing data products for AI
            agents, send me the situation you are working with.
          </p>
          <p className="cta-company">
            I will tell you where direct involvement from the ODPS maintainer
            adds value and where it does not.
          </p>
          <div className="location">Data Maestro Academy FZE LLC</div>
        </div>
      </section>
    </PageShell>
  );
}
