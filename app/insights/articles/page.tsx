import type { Metadata } from "next";
import { getArticles } from "../../articles";
import { canonicalPath, DEFAULT_OG_IMAGE, DEFAULT_OG_IMAGE_ALT } from "../../seo";
import { Arrow, PageShell, publicAssetPath, sitePath } from "../../site";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Articles on data products, AI product portfolios, open standards, governance, and delivery.",
  alternates: {
    canonical: canonicalPath("/insights/articles"),
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
  openGraph: {
    title: "Insights | Jarkko Moilanen",
    description:
      "Articles on data products, AI product portfolios, open standards, governance, and delivery.",
    url: canonicalPath("/insights/articles"),
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
      "Articles on data products, AI product portfolios, open standards, governance, and delivery.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function ArticlesIndex() {
  const articles = getArticles();

  return (
    <PageShell>
      <section className="detail-hero editorial insights-hero">
        <div className="insights-hero-copy">
          <div className="section-kicker">Insights</div>
          <h1>Writing from the work itself.</h1>
          <p>
            Short essays on data product strategy, AI delivery, open standards,
            governance, and the operating models that make product work
            practical.
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
            <div className="section-kicker">Archive</div>
            <h2>Browse insights.</h2>
            <p>
              {articles.length} published essays on data products, AI products,
              standards, governance, and delivery.
            </p>
          </div>
        </div>

        <div className="article-index article-archive-list">
          {articles.map((article) => (
            <a
              className="article-card article-archive-card"
              href={sitePath(`/insights/articles/${article.slug}`)}
              key={article.slug}
            >
              <span className="article-card-meta">
                {`${article.category} / ${article.date}`}
              </span>
              <strong>{article.title}</strong>
              <p>{article.summary}</p>
              <em>
                Read article <Arrow />
              </em>
            </a>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
