import type { Metadata } from "next";
import type { ReactNode } from "react";
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

function hasObjectValue(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getExternalLinks(item: (typeof workItems)[number]) {
  return "externalLinks" in item && Array.isArray(item.externalLinks)
    ? item.externalLinks.filter(
        (link): link is { label: string; href: string } =>
          hasObjectValue(link) &&
          typeof link.label === "string" &&
          typeof link.href === "string",
      )
    : [];
}

function renderLinkedText(
  text: string,
  links: Array<{ label: string; href: string }>,
) {
  const matches = links
    .flatMap((link) => {
      const found: Array<{ index: number; link: { label: string; href: string } }> = [];
      let cursor = 0;

      while (cursor < text.length) {
        const index = text.indexOf(link.label, cursor);

        if (index === -1) break;

        found.push({ index, link });
        cursor = index + link.label.length;
      }

      return found;
    })
    .sort((a, b) => a.index - b.index || b.link.label.length - a.link.label.length);

  const parts: ReactNode[] = [];
  let cursor = 0;

  matches.forEach(({ index, link }) => {
    if (index < cursor) return;

    if (index > cursor) {
      parts.push(text.slice(cursor, index));
    }

    parts.push(
      <a href={link.href} key={`${link.href}-${index}`} rel="noreferrer" target="_blank">
        {text.slice(index, index + link.label.length)}
      </a>,
    );
    cursor = index + link.label.length;
  });

  if (cursor < text.length) {
    parts.push(text.slice(cursor));
  }

  return parts.length ? parts : text;
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
  const externalLinks = getExternalLinks(item);
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
  const adoption =
    "adoption" in item && hasObjectValue(item.adoption)
      ? item.adoption
      : undefined;
  const adoptionRows =
    adoption && "rows" in adoption && Array.isArray(adoption.rows)
      ? adoption.rows
      : [];
  const relatedHeading =
    "relatedHeading" in item && typeof item.relatedHeading === "string"
      ? item.relatedHeading
      : "Connected parts of the operating system.";
  const relatedDescriptions =
    "relatedDescriptions" in item && hasObjectValue(item.relatedDescriptions)
      ? (item.relatedDescriptions as Record<string, string>)
      : {};

  return (
    <PageShell>
      <section className={`detail-hero work-${item.slug}`}>
        <div>
          <div className="section-kicker">{item.label}</div>
          <h1>{item.title}</h1>
          <p>{renderLinkedText(item.focus, externalLinks)}</p>
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

      <section className={`detail-section work-section work-${item.slug}`}>
        <div className="detail-grid">
          <div>
            <div className="section-kicker">What this covers</div>
            <h2>{item.summary}</h2>
            {detailIntro ? (
              <p className="detail-intro">
                {renderLinkedText(detailIntro, externalLinks)}
              </p>
            ) : null}
          </div>
          <div className="evidence-list">
            {item.proof.map((proof) => (
              <article className="evidence-row" key={getTitle(proof)}>
                {getText(proof) ? (
                  <>
                    <h3>{getTitle(proof)}</h3>
                    <p>{renderLinkedText(getText(proof) ?? "", externalLinks)}</p>
                  </>
                ) : (
                  <p>{getTitle(proof)}</p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`detail-section work-section work-${item.slug}`}>
        <div className="outcome-grid">
          {item.outcomes.map((outcome, index) => (
            <div className="outcome-card" key={getTitle(outcome)}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{getTitle(outcome)}</strong>
              {getText(outcome) ? (
                <p>{renderLinkedText(getText(outcome) ?? "", externalLinks)}</p>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      {adoption ? (
        <section className={`detail-section work-section work-${item.slug}`}>
          <div className="detail-grid">
            <div>
              <div className="section-kicker">
                {"label" in adoption && typeof adoption.label === "string"
                  ? adoption.label
                  : "Adoption and implementation"}
              </div>
              <h2>
                {"title" in adoption && typeof adoption.title === "string"
                  ? adoption.title
                  : "From open standard to operational use."}
              </h2>
              {"intro" in adoption && typeof adoption.intro === "string" ? (
                <p className="detail-intro">
                  {renderLinkedText(adoption.intro, externalLinks)}
                </p>
              ) : null}
            </div>
            <div className="evidence-list adoption-list">
              {adoptionRows.map((row, index) => (
                <article className="evidence-row adoption-row" key={getTitle(row)}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{getTitle(row)}</h3>
                    {getText(row) ? (
                      <p>{renderLinkedText(getText(row) ?? "", externalLinks)}</p>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className={`detail-section work-section work-${item.slug}`}>
        <div className="section-head compact">
          <div className="section-kicker">Related work</div>
          <h2 className="section-title">{relatedHeading}</h2>
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
              {typeof relatedDescriptions[relatedItem.slug] === "string" ? (
                <p>{relatedDescriptions[relatedItem.slug]}</p>
              ) : null}
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
