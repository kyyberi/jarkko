import type { Metadata } from "next";
import { canonicalPath } from "../../seo";
import { PageShell, sitePath } from "../../site";

export const metadata: Metadata = {
  title: "Articles",
  alternates: {
    canonical: canonicalPath("/articles"),
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function OldArticlesIndex() {
  const target = sitePath("/articles");

  return (
    <PageShell>
      <meta httpEquiv="refresh" content={`0; url=${target}`} />
      <section className="detail-hero editorial">
        <div>
          <div className="section-kicker">Articles</div>
          <h1>This page has moved.</h1>
          <p>
            Continue to the <a href={target}>articles archive</a>.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
