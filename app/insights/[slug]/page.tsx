import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  canonicalPath,
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_ALT,
} from "../../seo";
import { PageShell, publicAssetPath, sitePath } from "../../site";
import { ReportDownloadButton } from "../report-download-button";
import { getInsightReport, getInsightReports } from "../reports";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getInsightReports().map((report) => ({ slug: report.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const report = getInsightReport(slug);

  if (!report) {
    return {
      title: "Insight",
    };
  }

  const canonical = canonicalPath(`/insights/${report.slug}`);

  return {
    title: report.title,
    description: report.excerpt,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${report.title} | Jarkko Moilanen`,
      description: report.excerpt,
      url: canonical,
      type: "article",
      publishedTime: `${report.publishedAt}T00:00:00.000Z`,
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
      title: `${report.title} | Jarkko Moilanen`,
      description: report.excerpt,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export default async function InsightReportPage({ params }: PageProps) {
  const { slug } = await params;
  const report = getInsightReport(slug);

  if (!report) notFound();

  return (
    <PageShell>
      <article className="report-detail">
        <header className="article-header report-detail-header">
          <div>
            <div className="article-meta">
              <span>{report.displayDate}</span>
              <span>{report.type}</span>
            </div>
            <h1>{report.title}</h1>
            <p className="article-summary">{report.excerpt}</p>
            <div className="report-detail-actions">
              <ReportDownloadButton report={report} />
              <a className="report-secondary-link" href={sitePath("/insights")}>
                Browse all insights
              </a>
            </div>
          </div>
        </header>

        <section className="detail-section report-detail-body">
          <figure className="report-detail-cover">
            <img src={publicAssetPath(report.coverImage)} alt={report.coverAlt} />
          </figure>
          <div className="report-detail-meta">
            <div className="section-kicker">Report topics</div>
            <ul>
              {report.topics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
          </div>
        </section>
      </article>
    </PageShell>
  );
}
