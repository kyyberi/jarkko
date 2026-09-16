"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

import { trackBookingEvent } from "./analytics";
import { calcomBookingUrlFor, calcomConfig, calcomLinkFor, eventSlugFor } from "./calcom";
import {
  bookingContextFor,
  genericVisitorIntentOptions,
  maintainerTopicOptions,
  odpsObjectiveOptions,
  type BookingContext,
  type ServiceBookingConfig,
} from "./services";

type CalEvent = CustomEvent<{
  data?: {
    eventId?: number | null;
    eventSlug?: string | null;
    eventTypeId?: number | null;
    paymentRequired?: boolean;
    startTime?: string;
    endTime?: string;
    status?: string;
    uid?: string;
  };
  namespace?: string;
  type?: string;
}>;

declare global {
  interface Window {
    Cal?: CalFunction & {
      loaded?: boolean;
      ns?: Record<string, CalNamespaceFunction>;
    };
  }
}

type CalFunction = {
  (method: string, ...args: unknown[]): void;
  q?: unknown[];
  ns?: Record<string, CalNamespaceFunction>;
};

type CalNamespaceFunction = (method: string, ...args: unknown[]) => void;

function loadCalEmbed() {
  if (typeof window === "undefined") return;

  if (window.Cal?.loaded) return;

  if (!window.Cal) {
    const queuedCal = ((method: string, ...args: unknown[]) => {
      queuedCal.q = queuedCal.q ?? [];
      queuedCal.q.push([method, ...args]);
    }) as CalFunction;
    queuedCal.q = [];
    queuedCal.ns = {};
    window.Cal = queuedCal;
  }

  if (document.querySelector('script[src="https://app.cal.com/embed/embed.js"]')) {
    return;
  }

  const script = document.createElement("script");
  script.src = "https://app.cal.com/embed/embed.js";
  script.async = true;
  script.onload = () => {
    if (window.Cal) window.Cal.loaded = true;
  };
  document.head.appendChild(script);
}

function safeNamespace(service: ServiceBookingConfig) {
  return `${service.id}-${eventSlugFor(service)}`.replace(/[^a-zA-Z0-9_-]/g, "-");
}

function getAttribution() {
  if (typeof window === "undefined") return {};

  const search = new URLSearchParams(window.location.search);
  const attribution: Record<string, string> = {};
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content"]) {
    const value = search.get(key);
    if (value) attribution[key] = value;
  }
  return attribution;
}

function intakeOptionsFor(service: ServiceBookingConfig) {
  if (service.intakeType === "generic") return genericVisitorIntentOptions;
  if (service.intakeType === "odps-consulting") return odpsObjectiveOptions;
  if (service.intakeType === "odps-maintainer") return maintainerTopicOptions;
  return [
    "Exploring options",
    "Need a decision soon",
    "Have an active initiative",
    "Need senior review",
  ];
}

function intakeLabelFor(service: ServiceBookingConfig) {
  if (service.intakeType === "generic") return "What would you like to discuss?";
  if (service.intakeType === "odps-consulting") return "Primary ODPS objective";
  if (service.intakeType === "odps-maintainer") return "Main topic";
  return "Current situation";
}

function Embed({
  context,
  service,
}: {
  context: BookingContext;
  service: ServiceBookingConfig;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const namespace = useMemo(() => safeNamespace(service), [service]);
  const calLink = calcomLinkFor(service);
  const directUrl = calcomBookingUrlFor(service, context);

  useEffect(() => {
    if (!calLink || !containerRef.current) return;

    loadCalEmbed();

    const attribution = getAttribution();
    const metadata = {
      service: context.service,
      serviceCategory: context.serviceCategory,
      bookingType: context.bookingType,
      sourcePage: context.sourcePage,
      sourceCTA: context.sourceCTA,
      engagementType: context.engagementType,
      duration: String(context.duration),
      visitorIntent: context.visitorIntent ?? "",
      ...attribution,
    };

    const interval = window.setInterval(() => {
      if (!window.Cal) return;
      window.clearInterval(interval);

      window.Cal("init", namespace, { origin: calcomConfig.origin });
      const scopedCal = window.Cal.ns?.[namespace];
      const cal = scopedCal ?? window.Cal;

      cal("inline", {
        elementOrSelector: `#calcom-${namespace}`,
        calLink,
        config: {
          layout: "month_view",
          theme: "light",
          metadata,
          service: context.service,
          serviceCategory: context.serviceCategory,
          bookingType: context.bookingType,
          sourcePage: context.sourcePage,
          sourceCTA: context.sourceCTA,
          engagementType: context.engagementType,
          duration: String(context.duration),
          ...attribution,
        },
      });

      cal("ui", {
        theme: "light",
        hideEventTypeDetails: false,
        cssVarsPerTheme: {
          light: {
            "cal-brand": "#171717",
            "cal-brand-emphasis": "#8b3f32",
            "cal-brand-text": "#fffdf8",
            "cal-text": "#2c2925",
            "cal-text-emphasis": "#171717",
            "cal-text-subtle": "#6e655f",
            "cal-bg": "#fffdf8",
            "cal-bg-subtle": "#f4efe7",
            "cal-border": "#d9d0c3",
            "cal-border-booker": "#d9d0c3",
            "cal-border-booker-width": "1px",
            radius: "6px",
            spacing: "1px",
          },
        },
      });
    }, 50);

    const handleReady = (event: Event) => {
      const detail = (event as CalEvent).detail;
      if (detail.namespace === namespace) {
        trackBookingEvent("calcom_opened", context, {
          event_slug: detail.data?.eventSlug ?? undefined,
          event_id: detail.data?.eventId ?? undefined,
        });
      }
    };

    const handleSuccess = (event: Event) => {
      const detail = (event as CalEvent).detail;
      if (detail.namespace === namespace) {
        trackBookingEvent("booking_completed", context, {
          event_type_id: detail.data?.eventTypeId ?? undefined,
          payment_required: detail.data?.paymentRequired,
          booking_status: detail.data?.status,
        });
      }
    };

    const handleFailure = (event: Event) => {
      const detail = (event as CalEvent).detail;
      if (detail.namespace === namespace) {
        trackBookingEvent("calcom_opened", context, {
          embed_failed: true,
        });
      }
    };

    window.addEventListener("bookerReady", handleReady);
    window.addEventListener("linkFailed", handleFailure);
    window.addEventListener("bookingSuccessfulV2", handleSuccess);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("bookerReady", handleReady);
      window.removeEventListener("linkFailed", handleFailure);
      window.removeEventListener("bookingSuccessfulV2", handleSuccess);
    };
  }, [calLink, context, namespace, service]);

  if (!calLink) {
    return (
      <div className="booking-fallback" role="status">
        <h2>Booking configuration needed</h2>
        <p>
          This booking route is ready. Add the Cal.com username and event slugs
          in the environment to activate scheduling.
        </p>
        <div className="hero-actions">
          <a className="button primary" href="mailto:work@jarkkomoilanen.com">
            Email work@jarkkomoilanen.com <span aria-hidden="true">-&gt;</span>
          </a>
          <a className="button" href="https://www.linkedin.com/in/jarkkomoilanen/">
            Contact in LinkedIn <span aria-hidden="true">-&gt;</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-embed-shell">
      <div
        className="calcom-embed"
        id={`calcom-${namespace}`}
        ref={containerRef}
      />
      <noscript>
        <a className="button primary" href={directUrl}>
          Open booking calendar <span aria-hidden="true">-&gt;</span>
        </a>
      </noscript>
      <a className="text-link booking-external-link" href={directUrl}>
        Open booking calendar in a new page <span aria-hidden="true">-&gt;</span>
      </a>
    </div>
  );
}

export function BookingFlow({ service }: { service: ServiceBookingConfig }) {
  const searchParams = useSearchParams();
  const [visitorIntent, setVisitorIntent] = useState("");
  const [hasCompletedIntake, setHasCompletedIntake] = useState(false);
  const hasTrackedStarted = useRef(false);
  const sourceCTA = searchParams.get("sourceCTA") ?? service.sourceCTA;
  const context = useMemo(
    () => ({
      ...bookingContextFor(service, sourceCTA),
      visitorIntent: visitorIntent || undefined,
    }),
    [service, sourceCTA, visitorIntent],
  );
  const options = intakeOptionsFor(service);
  const intakeLabel = intakeLabelFor(service);

  useEffect(() => {
    if (hasTrackedStarted.current) return;
    hasTrackedStarted.current = true;
    trackBookingEvent("booking_intake_started", context);
  }, [context]);

  function completeIntake() {
    setHasCompletedIntake(true);
    trackBookingEvent("booking_intake_completed", context);
  }

  return (
    <div className="booking-flow">
      <section className="booking-intake" aria-labelledby="booking-intake-title">
        <div>
          <div className="section-kicker">
            {service.bookingType === "direct" ? "Direct booking" : "Consultation"}
          </div>
          <h2 id="booking-intake-title">{service.displayName}</h2>
          <p>
            {service.bookingType === "direct"
              ? "Choose the topic that should anchor the focused session."
              : "Share the context that helps route the first conversation."}
          </p>
        </div>

        <div className="booking-intake-fields">
          <label htmlFor="visitor-intent">{intakeLabel}</label>
          <select
            id="visitor-intent"
            onChange={(event) => setVisitorIntent(event.target.value)}
            value={visitorIntent}
          >
            <option value="">Select one</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button
            className="button primary"
            disabled={!visitorIntent}
            onClick={completeIntake}
            type="button"
          >
            Continue to scheduling <span aria-hidden="true">-&gt;</span>
          </button>
        </div>
      </section>

      {hasCompletedIntake ? (
        <Embed context={context} service={service} />
      ) : null}
    </div>
  );
}
