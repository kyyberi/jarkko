export type InsightReport = {
  slug: string;
  title: string;
  type: string;
  excerpt: string;
  publishedAt: string;
  displayDate: string;
  coverImage: string;
  coverAlt: string;
  filePath: string;
  pageCount?: number;
  topics: string[];
  featured?: boolean;
};

const reports: InsightReport[] = [
  {
    slug: "ai-products-and-data-products-connected-portfolio",
    title:
      "AI Products and Data Products: Two Product Contracts, One Connected Portfolio",
    type: "Whitepaper",
    excerpt:
      "A practical whitepaper on how AI products and data products need separate contracts, shared ownership, and one connected portfolio for enterprise delivery.",
    publishedAt: "2026-09-18",
    displayDate: "SEPT 2026",
    coverImage: "/images/insight-ai-products-data-products.webp",
    coverAlt: "AI Products and Data Products whitepaper cover",
    filePath: "/resources/ai-products-and-data-products-whitepaper.pdf",
    pageCount: 48,
    topics: ["AI products", "Data products", "Portfolio strategy"],
    featured: true,
  },
  {
    slug: "odps-whitepaper-2026",
    title:
      "Open Data Product Specification: From Standard to Agent-Ready Data Products",
    type: "Whitepaper",
    excerpt:
      "A practical study of the ODPS standards family, its evolution, enterprise adoption, and its role in AI-agent-ready data ecosystems.",
    publishedAt: "2026-09-16",
    displayDate: "SEPT 2026",
    coverImage: "/images/insight-odps-whitepaper.webp",
    coverAlt: "Open Data Product Specification visual preview",
    filePath: "/resources/ODPS_whitepaper_2026_09.pdf",
    topics: ["ODPS", "Data products", "AI agents"],
  },
  {
    slug: "ai-centers-of-excellence-operating-model",
    title:
      "AI Centers of Excellence: Operating Model, Economics, and Implementation Blueprint",
    type: "Research report",
    excerpt:
      "A field-based report on AI CoE scope, economics, governance, and implementation choices for organizations moving from pilots to managed AI capability.",
    publishedAt: "2026-09-13",
    displayDate: "SEPT 2026",
    coverImage: "/images/insight-ai-centers-of-excellence.webp",
    coverAlt: "AI Center of Excellence report preview",
    filePath: "/resources/ai-centers-of-excellence-jarkko-moilanen.pdf",
    topics: ["AI CoE", "Operating model", "Governance"],
  },
];

export function getInsightReports() {
  return reports;
}

export function getInsightReport(slug: string) {
  return reports.find((report) => report.slug === slug);
}
