import type { Metadata } from "next";

import { Arrow, PageShell, publicAssetPath, sitePath } from "../site";
import { bookingContextFor, bookingPath, genericBookingService } from "../booking/services";
import { canonicalPath } from "../seo";
import { EngagementStagePattern } from "../engagement-stage-pattern";

const principles = [
  {
    title: "Standalone value",
    text:
      "Each engagement delivers a concrete outcome with clear scope and commercial value.",
  },
  {
    title: "Start where you are",
    text:
      "Enter at the stage that matches your current need, whether that is a question, assessment, design need, delivery need or ongoing leadership.",
  },
  {
    title: "Progress when needed",
    text:
      "Move to the next step only when it adds value. A small engagement is a valid starting point.",
  },
];

const commonStarts = [
  "What should we build first?",
  "Is this AI use case worth pursuing?",
  "Why are our pilots not moving to production?",
  "Do we need an AI product operating model?",
  "Are we ready for ODPS adoption?",
  "How should data products support AI agents?",
];

const clarificationRows = [
  "Your current situation",
  "The problem behind the question",
  "What kind of value is realistic",
  "The smallest useful next step",
  "Whether a deeper engagement is needed",
];

export const metadata: Metadata = {
  title: "Engagement Model | AI Products, Data Products & ODPS",
  description:
    "Start with a focused question, assessment or design need. Each engagement delivers standalone value, with the option to progress only when the next step makes sense.",
  alternates: {
    canonical: canonicalPath("/engage"),
  },
  openGraph: {
    title: "Engagement Model | AI Products, Data Products & ODPS | Jarkko Moilanen",
    description:
      "Start with a focused question, assessment or design need. Each engagement delivers standalone value, with the option to progress only when the next step makes sense.",
    url: canonicalPath("/engage"),
    type: "website",
  },
};

function bookingDataAttributes(sourceCTA: string) {
  const context = bookingContextFor(genericBookingService, sourceCTA);

  return {
    "data-booking-cta": "true",
    "data-booking-service": context.service,
    "data-booking-category": context.serviceCategory,
    "data-booking-type": context.bookingType,
    "data-booking-source-page": "/engage/",
    "data-booking-source-cta": context.sourceCTA,
    "data-booking-engagement-type": context.engagementType,
    "data-booking-duration": String(context.duration),
    "data-booking-indicative-value": context.indicativeValue,
  };
}

function BookingCta({
  children,
  sourceCTA,
}: {
  children: React.ReactNode;
  sourceCTA: string;
}) {
  return (
    <a
      className="button primary"
      href={bookingPath(genericBookingService.id, sourceCTA)}
      {...bookingDataAttributes(sourceCTA)}
    >
      {children} <Arrow />
    </a>
  );
}

export default function EngagePage() {
  return (
    <PageShell>
      <section className="hero engage-hero">
        <div className="hero-copy engage-hero-copy">
          <div>
            <div className="eyebrow">The engagement model</div>
            <h1 className="hero-title engage-hero-title">
              Start small.
              <br />
              <span className="accent">Progress as needed.</span>
            </h1>
            <p className="hero-lede">
              Begin with the smallest engagement that creates value. Progress
              to the next step only when it makes sense.
            </p>
            <div className="hero-actions">
              <BookingCta sourceCTA="engage-hero-primary">
                Start with a small engagement
              </BookingCta>
              <a className="button" href="#engagement-options">
                Explore engagement options <Arrow />
              </a>
            </div>
          </div>
          <div className="availability">
            <span className="dot" />
            <span>
              Each step is useful on its own. Continue only when the next step is
              worth taking.
            </span>
          </div>
        </div>

        <div className="hero-portrait engage-hero-portrait">
          <img
            src={publicAssetPath("/images/jarkko-engage-hero-portrait.webp")}
            alt="Portrait of Jarkko Moilanen"
          />
        </div>
      </section>

      <EngagementStagePattern id="engagement-options" />

      <section className="engage-section engage-explain-section">
        <div className="engage-section-head">
          <div className="eyebrow">How it works</div>
          <h2>
            Each step is a defined
            <br />
            <span className="accent">value package.</span>
          </h2>
          <p>
            You do not need to commit to a large programme. Each engagement is
            scoped to create a useful outcome on its own. If there is a clear
            reason to continue, we move to the next step together.
          </p>
        </div>
        <div className="engage-principles">
          {principles.map((principle) => (
            <article key={principle.title}>
              <h3>{principle.title}</h3>
              <p>{principle.text}</p>
            </article>
          ))}
        </div>
        <p className="engage-rule-statement">
          Small steps are valid. Clear outcomes matter. Progress is earned.
        </p>
      </section>

      <section className="engage-section engage-discovery-section">
        <div className="engage-section-head">
          <div className="eyebrow">Discovery questions</div>
          <h2>
            A good starting point can be a
            <br />
            <span className="accent">simple question.</span>
          </h2>
          <p>
            Many clients do not start with a full programme. They start with a
            question, a concern or an idea they want to test. A short discovery
            meeting helps clarify whether a small engagement would create value.
          </p>
        </div>
        <div className="engage-question-columns">
          <div>
            <h3>Common ways to start</h3>
            <ul>
              {commonStarts.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>What we clarify together</h3>
            <ul>
              {clarificationRows.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className="engage-question-callout">
          A valid question is enough to begin.
        </p>
      </section>

      <section className="engage-section engage-next-section" id="booking">
        <div className="engage-section-head">
          <div className="eyebrow">Next step</div>
          <h2>Book a free 30-minute exploration meeting.</h2>
          <p>
            Use the conversation to test your question, understand your options
            and decide whether a small engagement makes sense.
          </p>
        </div>
        <div className="hero-actions">
          <BookingCta sourceCTA="engage-next-primary">
            Book 30-minute meeting
          </BookingCta>
          <a className="button" href="#engagement-options">
            Explore engagement options <Arrow />
          </a>
        </div>
        <div className="engage-service-links" aria-label="Related service paths">
          <a className="text-link" href={sitePath("/services/ai-products")}>
            AI product engagements <Arrow />
          </a>
          <a className="text-link" href={sitePath("/services/odps")}>
            ODPS and data product services <Arrow />
          </a>
        </div>
      </section>
    </PageShell>
  );
}
