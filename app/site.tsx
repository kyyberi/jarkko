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

export const articles = [
  {
    slug: "operating-system-data-ai-products",
    date: "18 Jul 2026",
    title: "The operating system for data and AI products",
    category: "Strategy",
    summary:
      "Why data and AI initiatives need an operating system that joins strategy, standards, software, governance, and delivery.",
    body: [
      "Most organizations do not fail at AI because they lack ideas. They fail because the path from intent to trusted product is fragmented.",
      "An operating system for data and AI products connects the work: business questions, data readiness, product definitions, standards, governance, and delivery routines.",
      "The practical result is not another dashboard or catalog. It is a way of working where leaders can see what is being built, teams understand what good looks like, and products can move from concept to measurable value.",
    ],
  },
  {
    slug: "sdk-is-not-the-lock-in",
    date: "11 Jul 2026",
    title: "The SDK is not the lock-in",
    category: "Standards",
    summary:
      "A good SDK should make a standard easier to adopt without trapping teams in one vendor, tool, or workflow.",
    body: [
      "The purpose of an SDK is to reduce adoption friction, not to become the center of gravity.",
      "For data product standards, the lock-in risk comes from opaque formats, private semantics, and workflows that cannot move. A useful SDK should do the opposite: make definitions easier to inspect, validate, exchange, and automate.",
      "That is why the standard matters more than the tool. The tool is there to help teams practice the standard consistently.",
    ],
  },
  {
    slug: "why-portfolios-matter-before-ai-delivery-starts",
    date: "04 Jul 2026",
    title: "Why portfolios matter before AI delivery starts",
    category: "AI products",
    summary:
      "AI delivery works better when demand is shaped as a portfolio before teams start building individual solutions.",
    body: [
      "AI initiatives often begin as a queue of use cases. That looks useful, but a queue alone does not reveal readiness, dependencies, ownership, or value.",
      "A portfolio view makes the work comparable. It shows which ideas are ready, which need data foundation work, which require governance decisions, and which should not be built yet.",
      "When the portfolio is clear, delivery teams can focus on products with the best combination of value, feasibility, trust, and operational support.",
    ],
  },
  {
    slug: "agent-ready-data-products-need-more-than-metadata",
    date: "27 Jun 2026",
    title: "Agent-ready data products need more than metadata",
    category: "Data products",
    summary:
      "Agents need product definitions, trust signals, constraints, ownership, and context, not only technical metadata.",
    body: [
      "Metadata tells a system what exists. It does not always explain whether a product can be trusted, how it should be used, who owns it, or what decisions it supports.",
      "Agent-ready data products need richer product context: purpose, audience, semantics, quality expectations, governance constraints, access patterns, and operational ownership.",
      "That information must be structured enough for machines and clear enough for people. Otherwise agents simply make faster guesses on weak foundations.",
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
