import type { Metadata } from "next";
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_ALT,
  canonicalPath,
} from "../seo";
import { Arrow, PageShell, assetPath, sitePath } from "../site";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Jarkko Moilanen, PhD, and the work connecting strategy, standards, governance, software, and delivery for data and AI products.",
  alternates: {
    canonical: canonicalPath("/about"),
  },
  openGraph: {
    title: "About | Jarkko Moilanen",
    description:
      "About Jarkko Moilanen, PhD, and the work connecting strategy, standards, governance, software, and delivery for data and AI products.",
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
      "About Jarkko Moilanen, PhD, and the work connecting strategy, standards, governance, software, and delivery for data and AI products.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function AboutPage() {
  return (
    <PageShell>
      <section className="about-hero">
        <div className="about-hero-copy">
          <div className="section-kicker">About</div>
          <h1>
            Building operating systems
            <span>for data and AI products</span>
          </h1>
          <p>
            I connect strategy, standards, governance, software, and delivery.
            My work turns fragmented data and AI initiatives into products
            people trust, leaders understand, and organizations reuse.
          </p>
        </div>
        <figure className="about-portrait" aria-label="Portrait of Jarkko Moilanen">
          <img
            src={`${assetPath}/images/jarkko-moilanen-portrait.jpeg`}
            alt="Jarkko Moilanen"
          />
        </figure>
      </section>

      <section className="about-section">
        <div className="about-section-head">
          <div className="section-kicker">Selected results</div>
          <h2>Proof from public systems, open standards, and delivery.</h2>
        </div>
        <div className="about-proof-list">
          <article>
            <span>01</span>
            <h3>Whole-of-government data and AI products</h3>
            <p>
              Leading portfolio work across Abu Dhabi Government&apos;s Data
              Factory, connecting business priorities, governed data, AI
              delivery, and measurable public value.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>Open data product standards</h3>
            <p>
              Founder and maintainer of the Open Data Product Specification
              family under the Linux Foundation, with adoption and
              implementation work involving organizations including BASF,
              Alation, and Kruger.
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>Delivery transformation</h3>
            <p>
              Increased delivery speed by 270 percent in one year at Platform
              of Trust, a data-product-focused industry platform in Finland,
              in 2019 when data product thinking was still taking early shape.
            </p>
          </article>
          <article>
            <span>04</span>
            <h3>National digital infrastructure</h3>
            <p>
              Led the MPASSid education identity service at Finland&apos;s
              Ministry of Education and Culture, a strategic national
              initiative under ministerial sponsorship that included legal
              changes, broad stakeholder management, and technology
              development. It serves more than 2.5 million users and remains
              in heavy use.
            </p>
          </article>
        </div>
      </section>

      <section className="about-section about-practical">
        <div className="about-section-head">
          <div className="section-kicker">Selected practical work</div>
          <h2>Focused support where standards meet adoption.</h2>
        </div>
        <div className="about-work-list">
          <article>
            <h3>Alation</h3>
            <p>
              Supported the use of ODPS as part of the foundation for an
              AI-assisted data product builder.
            </p>
          </article>
          <article>
            <h3>BASF</h3>
            <p>
              Supported business and technical teams in understanding how ODPS
              fits a complex enterprise data environment.
            </p>
          </article>
          <article>
            <h3>Kruger</h3>
            <p>
              Helped the organization move from early interest toward a
              practical, staged ODPS adoption approach.
            </p>
          </article>
        </div>
        <p className="about-method">
          The work usually starts with the business problem, followed by
          focused technical sessions and implementation review. Each stage gives
          the organization a clear point to continue, adjust, or stop.
        </p>
      </section>

      <section className="about-closing">
        <div>
          <div className="section-kicker">Closing</div>
          <h2>The work starts with a real problem</h2>
        </div>
        <div>
          <p>
            I work where data and AI initiatives often break down, between the
            business case, the data, the standard, the software, governance, and
            delivery.
          </p>
          <a className="button primary" href={sitePath("/#contact")}>
            Discuss a problem <Arrow />
          </a>
        </div>
      </section>
    </PageShell>
  );
}
