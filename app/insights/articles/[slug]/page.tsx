import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticle, getArticles } from "../../../articles";
import { canonicalPath, DEFAULT_OG_IMAGE } from "../../../seo";
import { Arrow, PageShell, sitePath } from "../../../site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    return {
      title: "Article",
    };
  }

  const canonical = canonicalPath(`/insights/articles/${article.slug}`);

  return {
    title: article.title,
    description: article.summary,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${article.title} | Jarkko Moilanen`,
      description: article.summary,
      url: canonical,
      type: "article",
      publishedTime: `${article.isoDate}T00:00:00.000Z`,
      authors: ["Jarkko Moilanen"],
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          alt: "Portrait of Jarkko Moilanen",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} | Jarkko Moilanen`,
      description: article.summary,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export default async function ArticleDetail({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) notFound();

  const related = getArticles().filter(
    (candidate) => candidate.slug !== article.slug,
  );

  return (
    <PageShell>
      <article className="article-detail">
        <div className="article-meta">
          <span>{article.date}</span>
          <span>{article.category}</span>
        </div>
        <h1>{article.title}</h1>
        <p className="article-summary">{article.summary}</p>
        <div className="article-body">
          {article.body.map((block) => (
            block.type === "image" ? (
              <figure className="article-figure" key={block.src}>
                <img src={block.src} alt={block.alt} />
                {block.caption ? <figcaption>{block.caption}</figcaption> : null}
              </figure>
            ) : block.type === "heading" ? (
              block.level === 2 ? (
                <h2 key={block.text}>{block.text}</h2>
              ) : (
                <h3 key={block.text}>{block.text}</h3>
              )
            ) : (
              <p key={block.text}>{block.text}</p>
            )
          ))}
        </div>
      </article>

      <section className="detail-section">
        <div className="section-head compact">
          <div className="section-kicker">More insights</div>
          <h2 className="section-title">Related thinking.</h2>
        </div>
        <div className="related-grid">
          {related.slice(0, 3).map((relatedArticle) => (
            <a
              className="related-card"
              href={sitePath(`/insights/articles/${relatedArticle.slug}`)}
              key={relatedArticle.slug}
            >
              <span>{relatedArticle.date}</span>
              <strong>{relatedArticle.title}</strong>
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
