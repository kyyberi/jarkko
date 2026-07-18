import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Arrow, PageShell, articles, sitePath } from "../../../site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((candidate) => candidate.slug === slug);

  if (!article) {
    return {
      title: "Article | Jarkko Moilanen",
    };
  }

  return {
    title: `${article.title} | Jarkko Moilanen`,
    description: article.summary,
  };
}

export default async function ArticleDetail({ params }: PageProps) {
  const { slug } = await params;
  const article = articles.find((candidate) => candidate.slug === slug);

  if (!article) notFound();

  const related = articles.filter((candidate) => candidate.slug !== article.slug);

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
          {article.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
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
