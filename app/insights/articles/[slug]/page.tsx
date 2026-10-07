import type { Metadata } from "next";
import { getArticles } from "../../../article-data";
import { canonicalPath } from "../../../seo";
import { PageShell, sitePath } from "../../../site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticles().find((candidate) => candidate.slug === slug);

  return {
    title: article?.title ?? "Article",
    alternates: {
      canonical: canonicalPath(`/articles/${slug}`),
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function OldArticleDetail({ params }: PageProps) {
  const { slug } = await params;
  const target = sitePath(`/articles/${slug}`);

  return (
    <PageShell>
      <meta httpEquiv="refresh" content={`0; url=${target}`} />
      <section className="detail-hero editorial">
        <div>
          <div className="section-kicker">Article</div>
          <h1>This article has moved.</h1>
          <p>
            Continue to the <a href={target}>canonical article page</a>.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
