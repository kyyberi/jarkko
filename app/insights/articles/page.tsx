import type { Metadata } from "next";
import { getArticles } from "../../articles";
import { canonicalPath, DEFAULT_OG_IMAGE, DEFAULT_OG_IMAGE_ALT } from "../../seo";
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
  const categories = Array.from(
    new Set(articles.map((article) => article.category)),
  ).sort((a, b) => a.localeCompare(b));

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
        <div className="article-archive-head">
          <div>
            <div className="section-kicker">Archive</div>
            <h2>Browse by subject.</h2>
            <p>{articles.length} published insights across {categories.length} subjects.</p>
          </div>
          <nav className="article-category-nav" aria-label="Article categories">
            {categories.map((category) => (
              <a href={`#${categorySlug(category)}`} key={category}>
                {category}
              </a>
            ))}
          </nav>
        </div>

        <div className="article-category-groups">
          {categories.map((category) => {
            const categoryArticles = articles.filter(
              (article) => article.category === category,
            );

            return (
              <section
                className="article-category-group"
                id={categorySlug(category)}
                key={category}
              >
                <div className="article-index-label">
                  <span>{category}</span>
                  <strong>{categoryArticles.length}</strong>
                </div>
                <div className="article-index compact">
                  {categoryArticles.map((article) => (
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
            );
          })}
        </div>
      </section>
    </PageShell>
  );
}

function categorySlug(category: string) {
  return `category-${category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}
