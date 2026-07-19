import type { Metadata } from "next";
import { getArticles } from "../../articles";
import { canonicalPath } from "../../seo";
import { Arrow, PageShell, sitePath } from "../../site";

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
  },
};

export default function ArticlesIndex() {
  const articles = getArticles();

  return (
    <PageShell>
      <section className="detail-hero editorial insights-hero">
        <div>
          <div className="section-kicker">Insights</div>
          <h1>Writing from the work itself.</h1>
          <p>
            Short essays on data product strategy, AI delivery, open standards,
            governance, and the operating models that make product work
            practical.
          </p>
        </div>
      </section>

      <section className="detail-section">
        <div className="article-index">
          {articles.map((article) => (
            <a
              className="article-card"
              href={sitePath(`/insights/articles/${article.slug}`)}
              key={article.slug}
            >
              <span>{article.date}</span>
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
