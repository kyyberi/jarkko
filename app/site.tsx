import { MobileNav } from "./mobile-nav";
import { versionedPublicPath } from "./seo";

export function Arrow() {
  return <span aria-hidden="true">{"->"}</span>;
}

export const assetPath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function publicAssetPath(path: string) {
  return `${assetPath}${versionedPublicPath(path)}`;
}

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
      "Portfolio Studio for turning strategy, discovery, governance, and data product decisions into a working operating environment.",
    image: "/images/work-maysano.webp",
    imageAlt: "Maysano portfolio flow from business goals to data products",
    cta: "See how it works",
    detailCta: "Book a demo",
    ctaHref: "https://www.linkedin.com/in/jarkkomoilanen/",
    externalLinks: [
      {
        label: "Maysano Studio",
        href: "https://studio.maysano.com",
      },
    ],
    diagramSteps: ["Business goals", "Portfolio", "Data products"],
    diagramCaption: "From business intent to governed product systems.",
    focus:
      "Maysano Studio is an available platform for turning strategy, discovery, portfolio design, and governance into one operating environment for data product work. I was the igniter behind Maysano, shaping its direction around the practical need to move from business intent and source material into governed portfolios and operational product systems.",
    detailIntro:
      "Maysano is designed for teams that need strategy, governance, and delivery to move together. It helps structure the path from early business thinking to implementation-ready product definition.",
    proof: [
      {
        title: "Portfolio Studio",
        text: "A business-led environment for shaping portfolio candidates, framing product intent, and organizing the material behind data product decisions.",
      },
      {
        title: "Structured product definition",
        text: "Methods for connecting goals, use cases, evidence, source documents, and implementation-ready product definitions in one flow.",
      },
      {
        title: "Governance and readiness",
        text: "A practical way to bring governance, review, and readiness into the same working environment instead of treating them as separate activities.",
      },
      {
        title: "Operating environment",
        text: "Designed to support the transition from portfolio thinking into operational product systems that teams can manage, review, and evolve.",
      },
      {
        title: "Foundation, not replacement",
        text: "Maysano does not replace data platforms, catalogs, governance tools, or delivery systems. It sits above them, connecting business intent, portfolio decisions, and product definitions to the existing data management environment.",
      },
    ],
    outcomes: [
      {
        title: "Business framing",
        text: "Capturing goals, intent, and source material in a form that can be developed into structured product opportunities.",
      },
      {
        title: "Portfolio design",
        text: "Building governed portfolios that connect evidence, use cases, priorities, and product definitions.",
      },
      {
        title: "Operationalization",
        text: "Creating the basis for moving approved portfolio work into operational product systems and delivery.",
      },
    ],
  },
  {
    slug: "standards-and-sdk",
    index: "02",
    label: "Open standard and SDK",
    title: "Data Product Standards",
    summary:
      "The ODPS standards family and SDK for governed, interoperable, agent-ready data products across platforms, teams, and organizations.",
    image: "/images/work-odps.webp",
    imageAlt: "Open Data Product Specification family maintained under Linux Foundation",
    cta: "Explore the standard",
    externalLinks: [
      {
        label: "Open Data Product Specification",
        href: "https://opendataproducts.org",
      },
      {
        label: "SDK",
        href: "https://opendataproducts.org/sdk",
      },
    ],
    focus:
      "I founded and maintain the Open Data Product Specification family under LF AI & Data. It gives organizations a shared, machine-readable foundation for defining, governing, exchanging, and implementing data products across platforms and teams.",
    detailIntro:
      "The standard connects business meaning, governance requirements, technical metadata, and implementation guidance. It helps people, platforms, automation, and AI agents interpret data products consistently, and it gives organizations a concrete basis for deciding how data products should operate.",
    proof: [
      {
        title: "Open standard",
        text: "A vendor-neutral specification family founded and maintained under LF AI & Data, part of the Linux Foundation, for describing data products, catalogs, relationships, vocabularies, and reusable implementation recipes.",
      },
      {
        title: "Developer toolkit",
        text: "An SDK, command-line tools, validation methods, and agent interfaces for creating, checking, transforming, and exchanging data product definitions.",
      },
      {
        title: "Interoperability",
        text: "A shared structure that helps data products move between catalogs, governance environments, delivery platforms, and organizational boundaries without losing meaning.",
      },
      {
        title: "Business and technical alignment",
        text: "A common product definition that connects objectives, ownership, governance, quality, service expectations, and implementation metadata.",
      },
    ],
    outcomes: [
      {
        title: "Portable definitions",
        text: "Data product definitions that remain consistent across platforms, tools, organizational boundaries, and implementation environments.",
      },
      {
        title: "Agent-ready metadata",
        text: "Structured metadata that AI agents and automation tools can validate, interpret, compare, and use.",
      },
      {
        title: "Open implementation paths",
        text: "Vendor-neutral specifications, SDK support, recipes, and reference methods that reduce dependence on one platform.",
      },
      {
        title: "Governed products",
        text: "Built-in support for ownership, quality, service levels, policy, access, and lifecycle expectations.",
      },
    ],
    adoption: {
      label: "Adoption and implementation",
      title: "From open standard to operational use.",
      intro:
        "I founded and continue to lead the Open Data Product Specification family. The work grew from a practical need for data products to remain understandable and usable across business teams, technical systems, vendors, and national boundaries.",
      rows: [
        {
          title: "Enterprise adoption",
          text: "Applied in data product work involving organizations including BASF, Alation, and Kruger across enterprise, platform, and industrial contexts.",
        },
        {
          title: "Platform integration",
          text: "Used as a foundation for platform-level data product definitions, including AI-assisted product creation and machine-readable exchange.",
        },
        {
          title: "Government data exchange",
          text: "Adopted by X-Road, the government data exchange technology developed through Estonian and Finnish collaboration and used internationally.",
        },
        {
          title: "Open ecosystem",
          text: "Extended through specifications for catalogs, graphs, vocabularies, recipes, and an open SDK for developers and AI agents.",
        },
      ],
    },
    relatedHeading:
      "Connected parts of the data product operating system.",
    relatedDescriptions: {
      maysano:
        "Maysano turns business intent, source material, portfolio design, and governance into structured data product portfolios and operational product systems.",
      "government-ai":
        "Portfolio work connecting government priorities, governed data, readiness, and AI product delivery.",
    },
    serviceLink: {
      label: "ODPS Enterprise Services",
      href: "/services/odps",
    },
  },
  {
    slug: "government-ai",
    index: "03",
    label: "Abu Dhabi Government AI delivery",
    title: "Building AI products for public value",
    summary:
      "Senior portfolio work shaping AI products at scale across Abu Dhabi Government priorities, data readiness, governance, and delivery.",
    image: "/images/work-abudhabi.webp",
    imageAlt: "AI product delivery path from priority needs to public value",
    cta: "Discuss the approach",
    diagramSteps: [
      "Priority needs",
      "Data readiness",
      "AI products",
      "Public value",
    ],
    focus:
      "Abu Dhabi aims to become the world's first fully AI-native government by 2027. The goal is to embed AI across government services, operations, and decision-making, supported by sovereign cloud infrastructure, integrated data, strong cybersecurity, and a unified digital framework. I contribute to this direction as one of the leads shaping the government AI products portfolio, connecting priority business needs, data readiness, governance, and delivery into a coherent operating model.",
    detailIntro:
      "The ambition is to create a government that acts with greater speed, insight, and responsiveness while delivering better outcomes for people and communities. That needs more than individual use cases. It needs a portfolio model that helps leaders decide what to pursue, what evidence is required, and what must be ready before delivery begins.",
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
  {
    slug: "school-of-ai",
    index: "04",
    label: "Community AI education",
    title: "School 4 AI",
    summary:
      "A community learning initiative helping young people learn practical AI, English, teamwork, and product building through visible outcomes.",
    image: "/images/work-school4ai.webp",
    imageAlt:
      "Vietnamese young people learning AI and English through a community activity",
    cta: "Visit the initiative",
    detailCta: "Visit School 4 AI",
    ctaHref: "https://school4ai.net",
    externalLinks: [
      {
        label: "School 4 AI",
        href: "https://school4ai.net",
      },
    ],
    diagramSteps: ["Learn", "Try", "Build", "Present"],
    diagramCaption:
      "A practical weekend format for AI, English, teamwork, and visible outcomes.",
    focus:
      "School 4 AI is a community learning initiative I am building for young people, starting from Yen Bai, Vietnam. The goal is to help participants learn practical AI, use English in real situations, work in teams, and create something they can show to others.",
    detailIntro:
      "The initiative is being shaped as a weekend activity rather than a long course. It is designed around hands-on work, age-aware grouping, parent visibility, and community support from people who can help with venues, devices, food, mentoring, or project ideas.",
    proof: [
      {
        title: "Community-first model",
        text: "The first activities are planned from Yen Bai with a model that can adapt to other local communities over time.",
      },
      {
        title: "Practical learning",
        text: "Participants use AI and English through hands-on exercises, teamwork, small product building, and final presentation.",
      },
      {
        title: "Parent and safety focus",
        text: "The initiative sets expectations for parent consent, supervised shared spaces, emergency contact information, age-appropriate grouping, and clear communication about tools and activities.",
      },
      {
        title: "Independent initiative",
        text: "School 4 AI is an independent community learning initiative, not a formal school, official credential, or replacement for regular education.",
      },
    ],
    outcomes: [
      {
        title: "AI confidence",
        text: "Young people get early, responsible exposure to AI tools through practical activities.",
      },
      {
        title: "English in context",
        text: "English becomes part of the work itself instead of a separate classroom subject.",
      },
      {
        title: "Visible result",
        text: "Each participant should leave with a small product, a presentation experience, and proof of participation.",
      },
      {
        title: "Local support",
        text: "Parents, teachers, technologists, businesses, and volunteers can contribute through practical support.",
      },
    ],
    relatedHeading:
      "Connected parts of the same education and product-building thread.",
    relatedDescriptions: {
      maysano:
        "The same practical product mindset appears in Maysano, where ideas become structured portfolios and governed product systems.",
      "standards-and-sdk":
        "Open standards and SDK work support the machine-readable foundation behind modern data and AI product practice.",
      "government-ai":
        "Government AI delivery keeps the same focus on responsible use, practical value, and visible outcomes.",
    },
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
        <a href={sitePath("/engage")}>Engage</a>
        <a href={sitePath("/services/ai-products")}>AI Products</a>
        <a href={sitePath("/services/odps")}>Data Products</a>
        <a href={sitePath("/articles")}>Articles</a>
        <a href={sitePath("/insights")}>Insights</a>
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
      <figure className="footer-portrait">
        <img
          src={publicAssetPath("/images/jarkko-hero-abudhabi-2026.webp")}
          alt="Jarkko Moilanen"
        />
      </figure>
      <div className="footer-column footer-identity">
        <a className="footer-wordmark" href={sitePath("/")}>
          Jarkko Moilanen<span>.</span>
        </a>
        <p>
          Data product pioneer, standards maintainer, builder, author, and
          educator with Finnish roots, based in Abu Dhabi, UAE since 2022, and
          Vietnamese family ties pointing part of the future toward Vietnam.
        </p>
        <p className="footer-company">
          Owner of company in UAE, Data Maestro Academy FZE LLC
          <br />
          Business-ID: 262443655888
          <br />
          Amber Gem Tower, 26th Floor, Ajman
          <br />
          United Arab Emirates
        </p>
        <span className="footer-copyright">© 2026 Jarkko Moilanen, PhD</span>
      </div>
      <nav className="footer-column footer-nav" aria-label="Footer navigation">
        <h2>Explore</h2>
        <a href={sitePath("/#work")}>Selected work</a>
        <a href={sitePath("/engage")}>Engagement model</a>
        <a href={sitePath("/services/ai-products")}>AI Product Services</a>
        <a href={sitePath("/services/odps")}>ODPS Enterprise Services</a>
        <a href={sitePath("/articles")}>Articles</a>
        <a href={sitePath("/insights")}>Insights</a>
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
          <a href="mailto:work@jarkkomoilanen.com">Email</a>
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
