import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { canonicalPath, DEFAULT_OG_IMAGE, DEFAULT_OG_IMAGE_ALT } from "../../seo";
import { Arrow, PageShell, assetPath, sitePath, workItems } from "../../site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return workItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = workItems.find((candidate) => candidate.slug === slug);

  if (!item) {
    return {
      title: "Work",
    };
  }

  const canonical = canonicalPath(`/work/${item.slug}`);

  return {
    title: item.title,
    description: item.summary,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${item.title} | Jarkko Moilanen`,
      description: item.summary,
      url: canonical,
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
      title: `${item.title} | Jarkko Moilanen`,
      description: item.summary,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export default async function WorkDetail({ params }: PageProps) {
  const { slug } = await params;
  const item = workItems.find((candidate) => candidate.slug === slug);

  if (!item) notFound();

  const related = workItems.filter((candidate) => candidate.slug !== item.slug);

  return (
    <PageShell>
      <section className="detail-hero">
        <div>
          <div className="section-kicker">{item.label}</div>
          <h1>{item.title}</h1>
          <p>{item.focus}</p>
          <a className="button primary" href={sitePath("/#contact")}>
            Discuss related work <Arrow />
          </a>
        </div>
        <div className="detail-visual">
          <img src={`${assetPath}${item.image}`} alt={item.imageAlt} />
        </div>
      </section>

      <section className="detail-section">
        <div className="detail-grid">
          <div>
            <div className="section-kicker">What this covers</div>
            <h2>{item.summary}</h2>
          </div>
          <div className="evidence-list">
            {item.proof.map((proof) => (
              <p key={proof}>{proof}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="detail-section">
        <div className="outcome-grid">
          {item.outcomes.map((outcome, index) => (
            <div className="outcome-card" key={outcome}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{outcome}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="detail-section">
        <div className="section-head compact">
          <div className="section-kicker">Related work</div>
          <h2 className="section-title">Connected parts of the operating system.</h2>
        </div>
        <div className="related-grid">
          {related.map((relatedItem) => (
            <a
              className="related-card"
              href={sitePath(`/work/${relatedItem.slug}`)}
              key={relatedItem.slug}
            >
              <span>{relatedItem.label}</span>
              <strong>{relatedItem.title}</strong>
              <em>
                View work <Arrow />
              </em>
            </a>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
