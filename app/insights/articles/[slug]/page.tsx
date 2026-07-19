import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticle, getArticles } from "../../../articles";
import {
  absoluteUrl,
  canonicalPath,
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_ALT,
} from "../../../seo";
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
          alt: DEFAULT_OG_IMAGE_ALT,
          width: 1200,
          height: 630,
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
  const articleUrl = absoluteUrl(canonicalPath(`/insights/articles/${article.slug}`));
  const encodedArticleUrl = encodeURIComponent(articleUrl);
  const encodedShareText = encodeURIComponent(`${article.title} | Jarkko Moilanen`);
  const ctaBlockIndex = article.body.reduce(
    (lastParagraphIndex, block, index) =>
      block.type === "paragraph" ? index : lastParagraphIndex,
    -1,
  );
  const linkedInProfileUrl = "https://www.linkedin.com/in/jarkkomoilanen/";

  return (
    <PageShell>
      <article className="article-detail">
        <header className="article-header">
          <div>
            <div className="article-meta">
              <span>{article.date}</span>
              <span>{article.category}</span>
            </div>
            <h1>{article.title}</h1>
            <p className="article-summary">{article.summary}</p>
            <div className="article-share" aria-label="Share this article">
              <span>Share</span>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedArticleUrl}`}
                rel="noreferrer"
                target="_blank"
              >
                LinkedIn
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodedArticleUrl}&text=${encodedShareText}`}
                rel="noreferrer"
                target="_blank"
              >
                X
              </a>
            </div>
          </div>
        </header>
        <div className="article-body">
          {article.body.map((block, index) => (
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
            ) : index === ctaBlockIndex ? (
              <div className="article-ending" key={block.text}>
                <div className="article-signoff" aria-label="Article author">
                  <img
                    src={sitePath("/images/jarkko-signature.png")}
                    alt="Signature of Dr. Jarkko Moilanen"
                  />
                  <span>Dr. Jarkko Moilanen</span>
                </div>
                <aside className="article-cta" aria-label="Article call to action">
                  <p>{block.text}</p>
                  <a href={linkedInProfileUrl} rel="noreferrer" target="_blank">
                    Connect on LinkedIn <Arrow />
                  </a>
                </aside>
              </div>
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
