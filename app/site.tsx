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
    label: "Government delivery",
    title: "AI products for public value",
    summary:
      "A portfolio approach that connects business questions, data readiness, product governance, and implementation across government entities.",
    image: "/images/work-abudhabi.png",
    imageAlt: "AI product delivery path from use cases to public value",
    cta: "Read the case overview",
    focus:
      "Government AI delivery needs operating models that connect executive intent, use cases, data readiness, governance, and measurable public outcomes.",
    proof: [
      "Business-led AI product portfolios across government contexts.",
      "Operating models for entity collaboration, readiness, governance, and delivery.",
      "Practical review patterns for moving from use case demand to products people can trust.",
    ],
    outcomes: [
      "Measurable public value",
      "Trusted data foundations",
      "Delivery-ready portfolios",
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
        <a href={sitePath("/#about")}>About</a>
        <a href={sitePath("/#contact")}>Contact</a>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer>
      <span>© 2026 Jarkko Moilanen, PhD</span>
      <div className="footer-links">
        <a href="https://www.linkedin.com/">LinkedIn</a>
        <a href="https://github.com/kyyberi/jarkko">GitHub</a>
        <a href="https://medium.com/">Medium</a>
        <a href={sitePath("/rss.xml")}>RSS</a>
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
