import type { Metadata } from "next";
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_ALT,
  canonicalPath,
} from "../seo";
import { Arrow, PageShell, sitePath } from "../site";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Jarkko Moilanen, PhD, and the work connecting strategy, standards, software, data, and AI product delivery.",
  alternates: {
    canonical: canonicalPath("/about"),
  },
  openGraph: {
    title: "About | Jarkko Moilanen",
    description:
      "About Jarkko Moilanen, PhD, and the work connecting strategy, standards, software, data, and AI product delivery.",
    url: canonicalPath("/about"),
    type: "profile",
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
    title: "About | Jarkko Moilanen",
    description:
      "About Jarkko Moilanen, PhD, and the work connecting strategy, standards, software, data, and AI product delivery.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function AboutPage() {
  return (
    <PageShell>
      <section className="about-hero">
        <div>
          <div className="section-kicker">About</div>
          <h1>Jarkko Moilanen, PhD</h1>
          <p>
            I work at the point where strategy, standards, software, data, and
            AI product delivery have to become one practical operating system.
          </p>
          <a className="button primary" href={sitePath("/#contact")}>
            Discuss an engagement <Arrow />
          </a>
        </div>
      </section>

      <section className="about-section">
        <div className="about-section-head">
          <div className="section-kicker">Professional focus</div>
          <h2>Business value first. Technology in service of delivery.</h2>
        </div>
        <div className="about-copy-grid">
          <p>
            My work connects executive intent, operating models, data product
            standards, AI product portfolios, and the software environments
            needed to make delivery repeatable.
          </p>
          <p>
            The common thread is practical adoption: helping organizations move
            from ideas and fragmented material into clear products, trusted
            decisions, and measurable value.
          </p>
        </div>
      </section>

      <section className="about-section compact">
        <div className="about-card-grid">
          <article>
            <span>01</span>
            <h3>Strategy and portfolios</h3>
            <p>
              Turning business questions, use cases, readiness, and governance
              into portfolios leaders can compare and act on.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>Standards and product systems</h3>
            <p>
              Building shared language, specifications, and software patterns
              for practical data product work.
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>Advisory and delivery</h3>
            <p>
              Supporting senior teams when data and AI work needs structure,
              clarity, and delivery discipline.
            </p>
          </article>
        </div>
      </section>
    </PageShell>
  );
}
