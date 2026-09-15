import type { Metadata } from "next";
import { Arrow, PageShell, publicAssetPath, sitePath } from "../../site";
import { canonicalPath, DEFAULT_OG_IMAGE, DEFAULT_OG_IMAGE_ALT } from "../../seo";

const calendlyBookingUrl = "https://calendly.com/work-jarkkomoilanen/30min";

const proofItems = [
  "Creator of ODPS",
  "Maintained under LF AI & Data",
  "Enterprise adoption and evaluation",
  "Open-source Python SDK and MCP tooling",
  "Data products designed for people, platforms and AI agents",
];

const services = [
  {
    title: "ODPS Enterprise Readiness Assessment",
    engagement: "2 to 4-week engagement",
    question:
      "You are evaluating ODPS, but need to understand how it fits your existing data architecture, catalog, governance and operating model.",
    text:
      "I assess your current environment against the ODPS standards family and identify where adoption creates value, where integration is required and where existing practices should remain.",
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
      "I work with your business, data, architecture and platform teams to define how ODPS fits your environment and establish the first implementation. The work can cover ODPS product specifications, catalogs, product graphs, controlled vocabularies, workflows, enterprise profiles, SDK automation and integration with existing platforms.",
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
      "I help structure your data products so people, platforms and AI agents work from the same governed product context. The engagement connects the ODPS standards family with AI agent architecture, MCP, knowledge graphs, enterprise APIs and your existing data platforms.",
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
      "I work with enterprise architects, product leaders, data offices, platform teams and vendors on decisions where direct knowledge of the standards and their design direction reduces uncertainty and implementation risk.",
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
    "Specialist ODPS assessment, adoption, implementation, agent-ready data product architecture, and advisory services from Jarkko Moilanen, creator of ODPS.",
  alternates: {
    canonical: canonicalPath("/services/odps"),
  },
  openGraph: {
    title: "ODPS Enterprise Services | Jarkko Moilanen",
    description:
      "Adopt data product standards with the person who created the Open Data Product Specification.",
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
      "Assessment, adoption, implementation, and advisory services for ODPS in enterprise environments.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function OdpsServicesPage() {
  return (
    <PageShell>
      <section className="service-hero odps-service-hero">
        <div className="service-hero-copy">
          <div className="section-kicker">Open Data Product Standards</div>
          <h1>Adopt data product standards with the person who created them.</h1>
          <p>
            I created the Open Data Product Specification and continue to
            maintain the standards family under LF AI & Data, part of the
            Linux Foundation.
          </p>
          <p>
            Organizations now use ODPS in enterprise products and data
            environments, while others are evaluating how the standards fit
            their architecture, governance and AI direction.
          </p>
          <p>
            I work directly with organizations that want to evaluate, adopt or
            operationalize ODPS. The standard stays open. The engagement
            focuses on making it work in your environment.
          </p>
          <div className="service-hero-actions">
            <a className="button primary" href={calendlyBookingUrl}>
              Discuss an ODPS engagement <Arrow />
            </a>
            <a className="button" href="https://opendataproducts.org">
              Explore the ODPS standards <Arrow />
            </a>
          </div>
        </div>
        <figure className="service-hero-image">
          <img
            src={publicAssetPath("/images/odps-services-hero.jpg")}
            alt="Jarkko Moilanen with data product interface elements"
          />
        </figure>
      </section>

      <section className="service-proof-strip" aria-label="ODPS proof">
        {proofItems.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </section>

      <section className="section service-family-section">
        <div className="section-head">
          <div className="section-kicker">ODPS Enterprise Services</div>
          <h2 className="section-title">A specialist service family.</h2>
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
              work and build the software and implementation patterns around
              it. I also work with enterprise and government environments where
              data products need to operate inside existing architecture,
              governance and delivery constraints.
            </p>
            <p>
              An ODPS engagement therefore starts with your environment and the
              decisions required to make adoption work.
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
              architecture.
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
