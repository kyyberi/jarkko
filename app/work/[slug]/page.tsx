import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { canonicalPath, DEFAULT_OG_IMAGE, DEFAULT_OG_IMAGE_ALT } from "../../seo";
import { Arrow, PageShell, assetPath, sitePath, workItems } from "../../site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function getTitle(value: string | { title: string; text: string }) {
  return typeof value === "string" ? value : value.title;
}

function getText(value: string | { title: string; text: string }) {
  return typeof value === "string" ? undefined : value.text;
}

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
  const diagramSteps =
    "diagramSteps" in item && Array.isArray(item.diagramSteps)
      ? item.diagramSteps
      : undefined;
  const detailIntro =
    "detailIntro" in item && typeof item.detailIntro === "string"
      ? item.detailIntro
      : undefined;
  const diagramCaption =
    "diagramCaption" in item && typeof item.diagramCaption === "string"
      ? item.diagramCaption
      : undefined;
  const ctaLabel =
    "detailCta" in item && typeof item.detailCta === "string"
      ? item.detailCta
      : item.cta;
  const ctaHref =
    "ctaHref" in item && typeof item.ctaHref === "string"
      ? item.ctaHref
      : sitePath("/#contact");

  return (
    <PageShell>
      <section className="detail-hero">
        <div>
          <div className="section-kicker">{item.label}</div>
          <h1>{item.title}</h1>
          <p>{item.focus}</p>
          <a className="button primary" href={ctaHref}>
            {ctaLabel} <Arrow />
          </a>
        </div>
        <div className="detail-visual">
          {diagramSteps ? (
            <div className="work-diagram" aria-label={item.imageAlt}>
              <div className="work-diagram-steps">
                {diagramSteps.map((step, index) => (
                  <div className="work-diagram-step" key={step}>
                    <span>{index + 1}</span>
                    <strong>{step}</strong>
                  </div>
                ))}
              </div>
              {diagramCaption ? (
                <p className="work-diagram-caption">{diagramCaption}</p>
              ) : null}
            </div>
          ) : (
            <img src={`${assetPath}${item.image}`} alt={item.imageAlt} />
          )}
        </div>
      </section>

      <section className="detail-section">
        <div className="detail-grid">
          <div>
            <div className="section-kicker">What this covers</div>
            <h2>{item.summary}</h2>
            {detailIntro ? <p className="detail-intro">{detailIntro}</p> : null}
          </div>
          <div className="evidence-list">
            {item.proof.map((proof) => (
              <article className="evidence-row" key={getTitle(proof)}>
                {getText(proof) ? (
                  <>
                    <h3>{getTitle(proof)}</h3>
                    <p>{getText(proof)}</p>
                  </>
                ) : (
                  <p>{getTitle(proof)}</p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="detail-section">
        <div className="outcome-grid">
          {item.outcomes.map((outcome, index) => (
            <div className="outcome-card" key={getTitle(outcome)}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{getTitle(outcome)}</strong>
              {getText(outcome) ? <p>{getText(outcome)}</p> : null}
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
