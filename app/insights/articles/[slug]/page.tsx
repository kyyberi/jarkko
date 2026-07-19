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

function headingId(text: string, index: number) {
  const slug = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return `section-${index}-${slug || "article-section"}`;
}

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
  const glanceItems = article.glance.length
    ? article.glance
    : [article.summary];
  const articleSections = article.body
    .map((block, index) =>
      block.type === "heading"
        ? {
            href: `#${headingId(block.text, index)}`,
            level: block.level,
            text: block.text,
          }
        : undefined,
    )
    .filter((section): section is { href: string; level: 2 | 3; text: string } =>
      Boolean(section),
    );
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
        <div className="article-layout">
          <div className="article-body">
            {article.body.map((block, index) => (
              block.type === "image" ? (
                <figure className="article-figure" key={block.src}>
                  <img src={block.src} alt={block.alt} />
                  {block.caption ? <figcaption>{block.caption}</figcaption> : null}
                </figure>
              ) : block.type === "heading" ? (
                block.level === 2 ? (
                  <h2 id={headingId(block.text, index)} key={block.text}>
                    {block.text}
                  </h2>
                ) : (
                  <h3 id={headingId(block.text, index)} key={block.text}>
                    {block.text}
                  </h3>
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
                  <div className="article-ending-share" aria-label="Share this article">
                    <span>Share this article</span>
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
          <aside className="article-sidebar" aria-label="Article support">
            {articleSections.length ? (
              <nav className="article-toc" aria-label="In this article">
                <h2>In this article</h2>
                {articleSections.map((section) => (
                  <a
                    className={section.level === 3 ? "subsection" : undefined}
                    href={section.href}
                    key={section.href}
                  >
                    {section.text}
                  </a>
                ))}
              </nav>
            ) : null}
            <section className="article-side-card">
              <div className="side-card-label">At a glance</div>
              <ul>
                {glanceItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <blockquote className="article-side-quote">
              <p>
                Practical data and AI products need strategy, standards,
                software, and delivery to move together.
              </p>
              <cite>Jarkko Moilanen</cite>
            </blockquote>
            <section className="article-side-related">
              <h2>Related insights</h2>
              {related.slice(0, 2).map((relatedArticle) => (
                <a
                  href={sitePath(`/insights/articles/${relatedArticle.slug}`)}
                  key={relatedArticle.slug}
                >
                  <span>{relatedArticle.title}</span>
                  <Arrow />
                </a>
              ))}
            </section>
          </aside>
        </div>
      </article>
    </PageShell>
  );
}
