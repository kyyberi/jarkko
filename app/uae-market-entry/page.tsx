import type { Metadata } from "next";

import { bookingContextFor, bookingPath, genericBookingService } from "../booking/services";
import { Arrow, PageShell, publicAssetPath, sitePath } from "../site";
import {
  LINKEDIN_PROFILE_URL,
  SITE_NAME,
  absoluteUrl,
  canonicalPath,
} from "../seo";

const pagePath = "/uae-market-entry/";
const pageTitle = "UAE Market Entry & Business Development";
const pageDescription =
  "UAE market entry and business development support for European technology companies. Local expertise, business connections and strategic advisory from Dr. Jarkko Moilanen.";
const socialImage = publicAssetPath("/images/jarkko-hero-abudhabi-2026.webp");

const services = [
  {
    number: "01",
    title: "Market Entry Assessment",
    text: "Evaluate market opportunities, potential customer segments, positioning and initial entry priorities.",
  },
  {
    number: "02",
    title: "Local Connections & Introductions",
    text: "Identify relevant organizations, business partners and potential customers, then facilitate appropriate introductions through established professional relationships.",
  },
  {
    number: "03",
    title: "Business Development Support",
    text: "Prepare for meetings, develop local value propositions, support customer and partner discussions, and identify opportunities for pilots or commercial engagement.",
  },
  {
    number: "04",
    title: "Technology & Public Sector Market Advisory",
    text: "Understand enterprise and government-sector opportunities in AI, data, software, digital platforms and related services.",
  },
];

const credibility = [
  "UAE-based since 2022.",
  "Four years of work within Abu Dhabi Government.",
  "Senior technology, data and AI leadership experience.",
  "Experience supporting European companies entering UAE markets.",
  "Work across government, enterprise and international technology ecosystems.",
  "Familiarity with both business decision-making and technology implementation.",
];

const audiences = [
  "European B2B technology companies expanding into the UAE.",
  "AI, data and software product companies.",
  "Digital transformation and enterprise technology providers.",
  "Companies selling products or solutions to large organizations or government-sector customers.",
  "Export promotion organizations, business development agencies and internationalization programs seeking UAE-based expertise.",
];

const stages = [
  {
    number: "01",
    title: "Initial Discussion",
    text: "Understand the company, offering, target customers and reasons for entering the UAE.",
  },
  {
    number: "02",
    title: "Market Opportunity Review",
    text: "Identify opportunities, important uncertainties, relevant stakeholders and practical next steps.",
  },
  {
    number: "03",
    title: "Targeted Local Support",
    text: "Agree on an appropriate engagement covering introductions, business development, partner discussions or advisory support.",
  },
];

function bookingDataAttributes(sourceCTA: string) {
  const context = bookingContextFor(genericBookingService, sourceCTA);

  return {
    "data-booking-cta": "true",
    "data-booking-service": context.service,
    "data-booking-category": context.serviceCategory,
    "data-booking-type": context.bookingType,
    "data-booking-source-page": pagePath,
    "data-booking-source-cta": context.sourceCTA,
    "data-booking-engagement-type": "advisory",
    "data-booking-duration": String(context.duration),
  };
}

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: canonicalPath("/uae-market-entry") },
  openGraph: {
    title: `${pageTitle} | ${SITE_NAME}`,
    description: pageDescription,
    url: canonicalPath("/uae-market-entry"),
    type: "website",
    images: [
      {
        url: socialImage,
        alt: "Jarkko Moilanen in Abu Dhabi",
        width: 1122,
        height: 1402,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${pageTitle} | ${SITE_NAME}`,
    description: pageDescription,
    images: [socialImage],
  },
};

export default function UaeMarketEntryPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(pagePath)}#webpage`,
    url: absoluteUrl(pagePath),
    name: `${pageTitle} | ${SITE_NAME}`,
    description: pageDescription,
    inLanguage: "en",
    about: {
      "@type": "Service",
      name: pageTitle,
      provider: {
        "@type": "Person",
        name: "Dr. Jarkko Moilanen",
        url: absoluteUrl("/about/"),
      },
      areaServed: {
        "@type": "Country",
        name: "United Arab Emirates",
      },
      audience: {
        "@type": "BusinessAudience",
        audienceType: "European technology companies",
      },
    },
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="uae-hero">
        <div className="uae-hero-copy">
          <div className="section-kicker">UAE market entry &amp; business development</div>
          <h1>Your Local Partner for Entering the UAE Market</h1>
          <p className="uae-hero-lede">
            I help European technology companies understand the UAE market,
            identify the right organizations and decision-makers, build local
            relationships and turn initial interest into concrete business
            opportunities.
          </p>
          <p className="uae-credentials">
            European business experience <span aria-hidden="true">|</span>{" "}
            UAE-based since 2022 <span aria-hidden="true">|</span> Abu Dhabi
            and Dubai experience
          </p>
          <div className="hero-actions">
            <a
              className="button primary"
              href={bookingPath("uae-market-entry-hero")}
              {...bookingDataAttributes("uae-market-entry-hero")}
            >
              Discuss Your UAE Market Entry <Arrow />
            </a>
            <a className="button" href={LINKEDIN_PROFILE_URL}>
              Connect on LinkedIn <Arrow />
            </a>
          </div>
        </div>
        <figure className="uae-hero-image">
          <img
            src={publicAssetPath("/images/jarkko-hero-abudhabi-2026.webp")}
            alt="Jarkko Moilanen in Abu Dhabi"
          />
          <figcaption>Abu Dhabi, United Arab Emirates</figcaption>
        </figure>
      </section>

      <section className="uae-context section">
        <div className="uae-section-intro">
          <div className="eyebrow">The practical challenge</div>
          <h2>Entering the UAE requires local understanding.</h2>
        </div>
        <div className="uae-context-copy">
          <p>
            Market entry is more than identifying potential customers. Companies
            need to understand how local organizations operate, who influences
            decisions, how partnerships develop and how to approach potential
            customers.
          </p>
          <p>
            I help translate a technology offering into focused local business
            conversations: the organizations to understand, the questions to
            test and the next steps worth taking.
          </p>
        </div>
      </section>

      <section className="uae-services section" aria-labelledby="uae-services-title">
        <div className="uae-section-head">
          <div>
            <div className="eyebrow">How I help</div>
            <h2 id="uae-services-title">Practical support from first assessment to local momentum.</h2>
          </div>
          <p>
            Engagements are tailored to the opportunity, the organization and
            the local context. They are designed to create clarity and useful
            progress, not to promise a particular commercial outcome.
          </p>
        </div>
        <div className="uae-service-grid">
          {services.map((service) => (
            <article className="uae-service-card" key={service.number}>
              <span>{service.number}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="uae-credibility section">
        <div className="uae-credibility-head">
          <div className="eyebrow">Why work with me?</div>
          <h2>A senior advisor who understands both the technology and the environment in which it needs to succeed.</h2>
        </div>
        <div className="uae-credibility-layout">
          <ul>
            {credibility.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <aside>
            <p>
              I work directly with leaders and teams that need a grounded view
              of their UAE opportunity. The value is practical local context
              combined with senior technology and business judgment.
            </p>
            <p>
              My government and ecosystem experience helps me understand the
              environment; it does not imply privileged access, guaranteed
              introductions or procurement outcomes.
            </p>
          </aside>
        </div>
      </section>

      <section className="uae-audience section">
        <div className="uae-section-intro">
          <div className="eyebrow">Who I work with</div>
          <h2>For technology businesses ready to test a serious UAE opportunity.</h2>
        </div>
        <div className="uae-audience-list">
          {audiences.map((audience, index) => (
            <p key={audience}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {audience}
            </p>
          ))}
          <p className="uae-audience-note">
            The work can also fit companies outside these sectors where my
            experience and local understanding are relevant.
          </p>
        </div>
      </section>

      <section className="uae-process section" aria-labelledby="uae-process-title">
        <div className="uae-section-head">
          <div>
            <div className="eyebrow">How engagements start</div>
            <h2 id="uae-process-title">A flexible path to a useful local next step.</h2>
          </div>
          <p>
            These are flexible engagement stages, not rigid packages. We agree
            the right level of support after understanding the opportunity.
          </p>
        </div>
        <ol className="uae-stage-list">
          {stages.map((stage) => (
            <li key={stage.number}>
              <span>{stage.number}</span>
              <div>
                <h3>{stage.title}</h3>
                <p>{stage.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="uae-about section">
        <div className="uae-about-photo">
          <img
            src={publicAssetPath("/images/jarkko-engagement-portrait.webp")}
            alt="Jarkko Moilanen"
          />
        </div>
        <div>
          <div className="eyebrow">About Jarkko</div>
          <h2>Technology leadership with a local commercial lens.</h2>
          <p>
            Dr. Jarkko Moilanen is a Finnish technology and business leader
            based in the United Arab Emirates. He has held senior leadership
            roles in digital business, data products and AI transformation,
            including four years with Abu Dhabi Government.
          </p>
          <p>
            Alongside his technology leadership work, he has supported European
            companies taking their first steps into the UAE market, helping
            them understand local opportunities, connect with relevant
            organizations and initiate business discussions.
          </p>
          <div className="uae-inline-links">
            <a className="text-link" href={sitePath("/about/")}>About Jarkko <Arrow /></a>
            <a className="text-link" href={sitePath("/#work")}>Selected work <Arrow /></a>
          </div>
        </div>
      </section>

      <section className="uae-contact section">
        <div>
          <div className="eyebrow">Contact</div>
          <h2>Exploring the UAE Market?</h2>
        </div>
        <div>
          <p>
            Whether you are evaluating your first steps into the UAE or looking
            for local support to develop existing opportunities, let&apos;s discuss
            your objectives.
          </p>
          <div className="hero-actions">
            <a
              className="button primary"
              href={bookingPath("uae-market-entry-contact")}
              {...bookingDataAttributes("uae-market-entry-contact")}
            >
              Schedule an Introductory Discussion <Arrow />
            </a>
            <a className="button" href="mailto:work@jarkkomoilanen.com">
              Email Jarkko <Arrow />
            </a>
          </div>
          <p className="uae-company-note">
            Advisory and consulting services are delivered commercially through
            Data Maestro Academy FZE LLC, Jarkko&apos;s UAE company.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
