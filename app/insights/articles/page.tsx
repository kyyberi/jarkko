import type { Metadata } from "next";
import { getArticles } from "../../articles";
import { canonicalPath, DEFAULT_OG_IMAGE, DEFAULT_OG_IMAGE_ALT } from "../../seo";
import { Arrow, PageShell, publicAssetPath, sitePath } from "../../site";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Articles on data products, AI product portfolios, open standards, governance, and delivery.",
  alternates: {
    canonical: canonicalPath("/insights/articles"),
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
  openGraph: {
    title: "Articles | Jarkko Moilanen",
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
    title: "Articles | Jarkko Moilanen",
    description:
      "Articles on data products, AI product portfolios, open standards, governance, and delivery.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function ArticlesIndex() {
  const articles = getArticles();
  const [latestArticle, ...archiveArticles] = articles;
  const latestImage = latestArticle?.body.find(
    (block) => block.type === "image",
  );

  return (
    <PageShell>
      <section className="detail-hero editorial insights-hero">
        <div className="insights-hero-copy">
          <div className="section-kicker">Articles</div>
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
            <h2>Browse articles.</h2>
            <p>
              Practical writing on AI products, data products, standards,
              governance, and delivery.
              <br />
              {articles.length} published articles.
            </p>
          </div>
        </div>

        {latestArticle ? (
          <a
            className="article-card article-archive-card article-archive-card-featured"
            href={sitePath(`/insights/articles/${latestArticle.slug}`)}
          >
            {latestImage?.type === "image" ? (
              <figure className="article-archive-card-media">
                <img
                  src={publicAssetPath(latestImage.src)}
                  alt={latestImage.alt}
                />
              </figure>
            ) : null}
            <div className="article-archive-card-copy">
              <span className="article-card-meta">
                {`${latestArticle.category} / ${latestArticle.date}`}
              </span>
              <strong>{latestArticle.title}</strong>
              <p>{latestArticle.summary}</p>
              <em>
                Read article <Arrow />
              </em>
            </div>
          </a>
        ) : null}

        <div className="article-index article-archive-list">
          {archiveArticles.map((article) => (
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
