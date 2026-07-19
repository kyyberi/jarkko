import { MobileNav } from "./mobile-nav";

export function Arrow() {
  return <span aria-hidden="true">{"->"}</span>;
}

export const assetPath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function sitePath(path: string) {
  return `${assetPath}${path}`;
}

export const workItems = [
  {
    slug: "maysano",
    index: "01",
    label: "Platform and Portfolio Studio",
    title: "Maysano",
    summary:
      "A connected environment for turning business intent, evidence, and source material into governed data product portfolios and operational product systems.",
    image: "/images/work-maysano.png",
    imageAlt: "Maysano portfolio flow from business goals to data products",
    cta: "See how it works",
    focus:
      "Maysano turns strategy, discovery, portfolio design, and governance into one operating environment for data product work.",
    proof: [
      "Portfolio Studio for business-led data product planning.",
      "Methods for connecting goals, use cases, evidence, and implementation-ready product definitions.",
      "Designed for teams that need governance and delivery to move together.",
    ],
    outcomes: [
      "Clearer portfolio decisions",
      "Reusable product evidence",
      "Faster governance reviews",
    ],
  },
  {
    slug: "standards-and-sdk",
    index: "02",
    label: "Open standard and SDK",
    title: "Data Product Standards",
    summary:
      "A machine-readable specification family and developer toolkit for interoperable, governed, and agent-ready data products.",
    image: "/images/work-odps.png",
    imageAlt: "Open Data Product Specification family maintained under Linux Foundation",
    cta: "Explore the standard",
    focus:
      "The standards work gives teams a shared language for catalogs, graphs, vocabularies, recipes, and implementation-ready product metadata.",
    proof: [
      "Open Data Product Specification family maintained under the Linux Foundation.",
      "SDK and recipes that help teams create, validate, and exchange data product definitions.",
      "Vendor-neutral foundations for interoperable catalogs and AI-ready product operations.",
    ],
    outcomes: [
      "Portable definitions",
      "Agent-ready metadata",
      "Open implementation paths",
    ],
  },
  {
    slug: "government-ai",
    index: "03",
    label: "Abu Dhabi Government AI delivery",
    title: "Building AI products for public value",
    summary:
      "From AI ambition to a governed product portfolio",
    image: "/images/work-abudhabi.png",
    imageAlt: "AI product delivery path from priority needs to public value",
    cta: "Discuss the approach",
    diagramSteps: [
      "Priority needs",
      "Data readiness",
      "AI products",
      "Public value",
    ],
    focus:
      "Abu Dhabi is working toward an AI-native government. I contribute to this direction as one of the leads shaping the government AI products portfolio, connecting priority business needs, data readiness, governance, and delivery into a coherent operating model.",
    detailIntro:
      "An AI-native government needs more than individual use cases. It needs a portfolio model that helps leaders decide what to pursue, what evidence is required, and what must be ready before delivery begins.",
    proof: [
      {
        title: "Portfolio direction",
        text: "Turning strategic priorities and government needs into a managed portfolio of AI product opportunities.",
      },
      {
        title: "Readiness and governance",
        text: "Establishing the conditions required for responsible delivery, including ownership, data readiness, controls, and clear decision points.",
      },
      {
        title: "Cross-entity delivery",
        text: "Creating practical ways for government entities, data teams, and delivery partners to work through shared dependencies.",
      },
      {
        title: "Public value",
        text: "Keeping the portfolio focused on measurable outcomes, service improvement, operational efficiency, and better government decisions.",
      },
    ],
    outcomes: [
      {
        title: "Portfolio shaping",
        text: "Structuring AI opportunities around strategic relevance, readiness, ownership, and expected public value.",
      },
      {
        title: "Delivery conditions",
        text: "Clarifying the governance, data, technical, and organizational conditions required before delivery.",
      },
      {
        title: "Decision support",
        text: "Giving leaders a clearer basis for prioritization, sequencing, investment, and portfolio review.",
      },
    ],
  },
];

export function Header() {
  return (
    <header className="site-header">
      <a className="wordmark" href={sitePath("/")}>
        Jarkko Moilanen<span>.</span>
      </a>
      <nav className="nav" aria-label="Primary">
        <a href={sitePath("/#work")}>Work</a>
        <a href={sitePath("/insights/articles")}>Insights</a>
        <a href={sitePath("/about")}>About</a>
        <a href={sitePath("/#contact")}>Contact</a>
      </nav>
      <MobileNav />
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-column footer-identity">
        <a className="footer-wordmark" href={sitePath("/")}>
          Jarkko Moilanen<span>.</span>
        </a>
        <p>
          Data product pioneer, standards maintainer, builder, author, and
          educator from Finland, based in Abu Dhabi, UAE since 2022.
        </p>
        <span className="footer-copyright">© 2026 Jarkko Moilanen, PhD</span>
      </div>
      <nav className="footer-column footer-nav" aria-label="Footer navigation">
        <h2>Explore</h2>
        <a href={sitePath("/#work")}>Selected work</a>
        <a href={sitePath("/insights/articles")}>Insights</a>
        <a href={sitePath("/about")}>About</a>
        <a href={sitePath("/#contact")}>Availability</a>
      </nav>
      <div className="footer-column footer-proof">
        <h2>Proof and links</h2>
        <ul>
          <li>270% delivery speed improvement</li>
          <li>2.5M+ users served through national infrastructure</li>
          <li>Open Data Product standards under the Linux Foundation</li>
        </ul>
        <div className="footer-links">
          <a href="https://www.linkedin.com/in/jarkkomoilanen/">LinkedIn</a>
          <a href="https://www.udemy.com/user/jarkko-moilanen/">Udemy</a>
          <a href="https://us.amazon.com/stores/Jarkko-Moilanen/author/B0B66HTHLM?ref=ap_rdr&shoppingPortalEnabled=true">
            Amazon
          </a>
          <a href={sitePath("/rss.xml")}>RSS</a>
        </div>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="shell">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
