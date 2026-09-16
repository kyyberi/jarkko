import type { Metadata } from "next";
import { Arrow, PageShell, publicAssetPath, sitePath } from "../../site";
import { canonicalPath, DEFAULT_OG_IMAGE, DEFAULT_OG_IMAGE_ALT } from "../../seo";

const calendlyBookingUrl = "https://calendly.com/work-jarkkomoilanen/30min";
const odpsWhitepaperUrl = "/resources/ODPS_whitepaper_2026_09.pdf";

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

const services = [
  {
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
    price: "USD 300 / 60 minutes",
  },
  {
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

export const metadata: Metadata = {
  title: "ODPS Enterprise Services",
  description:
    "Specialist ODPS assessment, maintainer sessions, adoption, implementation, agent-ready data product architecture, and advisory services from Jarkko Moilanen, creator and maintainer of ODPS.",
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
            <a className="button primary" href={calendlyBookingUrl}>
              Discuss an ODPS engagement <Arrow />
            </a>
            <a className="button" href="https://opendataproducts.org">
              Explore the ODPS standards <Arrow />
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

      <section className="section service-family-section">
        <div className="service-family-head">
          <figure className="service-family-image">
            <img
              src={publicAssetPath("/images/odps-success-story.jpg")}
              alt="Jarkko Moilanen with data product interface visuals"
            />
          </figure>
          <h2 className="section-title">
            Evaluation, implementation, scaling, expert access.
          </h2>
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
              <div className="engagement-best">
                <span>Best for</span>
                <p>{service.bestFor}</p>
              </div>
              <div className="engagement-price">
                <span>Typical investment</span>
                <strong>{service.price}</strong>
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
        <div className="detail-grid">
          <div>
            <div className="section-kicker">Implementation experience</div>
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
        <div className="organization-proof-head">
          <h2>Tested against real enterprise needs.</h2>
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
        <div className="detail-grid">
          <div>
            <div className="section-kicker">Fit</div>
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
              needs, use the existing AI consulting engagements.
            </p>
            <p>
              Some programs involve both. An AI portfolio or agent architecture
              engagement can expose the need for stronger data product
              foundations. An ODPS engagement can expand into a wider AI
              product operating model.
            </p>
            <a className="text-link" href={sitePath("/#engagements")}>
              Explore the general AI consulting engagements <Arrow />
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
            <a className="button primary" href={calendlyBookingUrl}>
              Discuss an ODPS engagement <Arrow />
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
