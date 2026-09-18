import type { Metadata } from "next";
import { canonicalPath, DEFAULT_OG_IMAGE, DEFAULT_OG_IMAGE_ALT } from "../seo";
import { PageShell, publicAssetPath, sitePath } from "../site";
import { InsightsPageAnalytics } from "./insights-analytics";
import { ReportDownloadButton } from "./report-download-button";
import { getInsightReports } from "./reports";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Whitepapers, market research, trend analysis, and practical studies on AI, data products, open standards, and enterprise transformation.",
  alternates: {
    canonical: canonicalPath("/insights"),
  },
  openGraph: {
    title: "Insights | Jarkko Moilanen",
    description:
      "Research assets and downloadable reports on AI, data products, open standards, and enterprise transformation.",
    url: canonicalPath("/insights"),
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
    title: "Insights | Jarkko Moilanen",
    description:
      "Research assets and downloadable reports on AI, data products, open standards, and enterprise transformation.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function InsightsPage() {
  const reports = getInsightReports();

  return (
    <PageShell>
      <InsightsPageAnalytics />
      <section className="detail-hero editorial insights-hero insights-report-hero">
        <div className="insights-hero-copy">
          <div className="section-kicker">Research library</div>
          <h1>Research &amp; insights.</h1>
          <p>
            Analysis, field notes, and practical reports on AI, data products,
            standards, and enterprise delivery.
          </p>
        </div>
        <div className="insights-hero-visual" aria-hidden="true">
          <span className="insights-orb insights-orb-left" />
          <span className="insights-orb insights-orb-right" />
          <span className="insights-orb insights-orb-dashed" />
          <span className="insights-axis insights-axis-horizontal" />
          <span className="insights-axis insights-axis-vertical" />
          <span className="insights-node insights-node-start" />
          <span className="insights-node insights-node-center" />
          <span className="insights-node insights-node-end" />
          <span className="insights-line-stack" />
          <span className="insights-chart">
            <i />
            <i />
            <i />
          </span>
          <span className="insights-dots" />
          <span className="insights-visual-label">
            Ideas
            <br />
            Standards
            <br />
            Real impact
          </span>
        </div>
      </section>

      <section className="detail-section insights-library-section">
        <div className="report-grid">
          {reports.map((report) => (
            <article className="report-card" key={report.slug}>
              <a className="report-card-media" href={sitePath(`/insights/${report.slug}`)}>
                <img src={publicAssetPath(report.coverImage)} alt={report.coverAlt} />
              </a>
              <div className="report-card-copy">
                <span className="article-card-meta">
                  {report.type} / {report.displayDate}
                </span>
                <h3>
                  <a href={sitePath(`/insights/${report.slug}`)}>{report.title}</a>
                </h3>
                <p>{report.excerpt}</p>
                <div className="report-supporting-meta">
                  {report.pageCount ? <span>{report.pageCount} pages</span> : null}
                  {report.topics.map((topic) => (
                    <span key={topic}>{topic}</span>
                  ))}
                </div>
                <ReportDownloadButton report={report} />
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
