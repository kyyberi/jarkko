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
      <section className="detail-hero editorial insights-hero">
        <div className="insights-hero-copy">
          <div className="section-kicker">Insights</div>
          <h1>Research for the work ahead.</h1>
          <p>
            Whitepapers, market research, trend analysis, and practical studies
            on AI, data products, open standards, and enterprise transformation.
          </p>
        </div>
        <figure className="insights-hero-image">
          <img
            src={publicAssetPath("/images/insights-hero-portrait.webp")}
            alt="Jarkko Moilanen"
          />
        </figure>
      </section>

      <section className="detail-section">
        <div className="article-archive-head">
          <div>
            <div className="section-kicker">Research library</div>
            <h2>Browse insights.</h2>
            <p>
              Research, analysis, and practical reports based on current work in
              AI, data products, standards, and enterprise delivery.
              <br />
              {reports.length} published reports.
            </p>
          </div>
        </div>

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
