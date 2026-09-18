"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  onBookingComplete,
  service,
}: {
  context: BookingContext;
  onBookingComplete?: () => void;
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
        hideEventTypeDetails: true,
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
            "cal-radius": "0px",
            "cal-spacing": "0.25rem",
            radius: "0px",
            spacing: "0.25rem",
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
        onBookingComplete?.();
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
  }, [calLink, context, namespace, onBookingComplete, service]);

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

function qualificationOptionsFor(service: ServiceBookingConfig, visitorIntent: string) {
  if (service.intakeType === "generic") {
    if (visitorIntent === "ODPS / data products") return odpsObjectiveOptions;
    return [
      "Exploring options",
      "Need a decision soon",
      "Have an active initiative",
      "Need senior review",
    ];
  }

  return [];
}

function qualificationLabelFor(service: ServiceBookingConfig) {
  if (service.intakeType === "generic") return "Current situation";
  return "";
}

function optionDescriptionFor(option: string) {
  const descriptions: Record<string, string> = {
    "AI portfolio and product strategy": "Clarify priorities, value, and what to build next.",
    "Agentic AI architecture": "Agents, system design, integration or architecture choices.",
    "AI product operating model": "Ownership, governance, portfolio rules or delivery model.",
    "Fractional AI product leadership": "Senior product leadership support for active initiatives.",
    "ODPS / data products": "Discuss standards, architecture, adoption or implementation.",
    "Partnership or collaboration": "Explore collaboration, adoption, ecosystem, or community opportunities.",
    "Something else": "Use this when the topic does not fit the listed categories.",
    "Evaluate ODPS": "Assess fit, readiness, and where the standard helps.",
    "Adopt ODPS": "Plan practical adoption in an existing organization or product landscape.",
    "Integrate ODPS with an existing platform": "Discuss catalog, marketplace, governance, or platform integration.",
    "Design agent-ready data products": "Shape products that agents and humans can interpret consistently.",
    "Enterprise architecture": "Review data product architecture and operating model implications.",
    "Expert advisory": "Use the session for senior review or focused direction.",
    Other: "Bring the closest related topic and context.",
    "Architecture review": "Review structure, tradeoffs, and implementation direction.",
    "ODPS implementation review": "Get focused feedback on current ODPS implementation choices.",
    "Data product design": "Review data product shape, metadata, and product boundaries.",
    Governance: "Discuss ownership, controls, lifecycle, and decision rules.",
    "Agent-ready data products": "Review agent-readable context, metadata, and interpretation needs.",
    "Specification interpretation": "Clarify how to apply the standard in a concrete case.",
    "Exploring options": "Use this when the next decision is still forming.",
    "Need a decision soon": "Use this when timing, scope, or direction needs quick resolution.",
    "Have an active initiative": "Use this when work is already underway and needs review.",
    "Need senior review": "Use this for a second opinion or executive-level assessment.",
  };

  return descriptions[option] ?? "Share context so the session can focus quickly.";
}

function groupedOptionsFor(service: ServiceBookingConfig, options: string[]) {
  if (service.intakeType !== "generic") {
    return [{ label: "", options }];
  }

  const priorityTopics = [
    "Exploring options",
    "AI portfolio and product strategy",
    "ODPS / data products",
  ];
  const prioritySet = new Set(priorityTopics);

  return [
    {
      label: "Priority topics",
      options: priorityTopics.filter((option) => options.includes(option)),
    },
    {
      label: "Other topics",
      options: options.filter((option) => !prioritySet.has(option)),
    },
  ].filter((group) => group.options.length > 0);
}

function optionCodeFor(option: string) {
  return option
    .split(/\s+/)
    .map((word) => word.replace(/[^a-zA-Z0-9]/g, ""))
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}

export function BookingFlow({
  hideIntakeAfterComplete = false,
  onStepChange,
  service,
  showIntro = true,
  sourceCTA,
  useOptionCards = false,
}: {
  hideIntakeAfterComplete?: boolean;
  onStepChange?: (step: "intake" | "qualification" | "scheduling" | "confirmation") => void;
  service: ServiceBookingConfig;
  showIntro?: boolean;
  sourceCTA?: string;
  useOptionCards?: boolean;
}) {
  const [visitorIntent, setVisitorIntent] = useState("");
  const [qualification, setQualification] = useState("");
  const [hasCompletedIntake, setHasCompletedIntake] = useState(false);
  const [hasCompletedBooking, setHasCompletedBooking] = useState(false);
  const [urlSourceCTA] = useState(() => {
    if (typeof window === "undefined") return undefined;
    return new URLSearchParams(window.location.search).get("sourceCTA") ?? undefined;
  });
  const hasTrackedStarted = useRef(false);
  const resolvedSourceCTA = sourceCTA ?? urlSourceCTA ?? service.sourceCTA;
  const context = useMemo(
    () => ({
      ...bookingContextFor(service, resolvedSourceCTA),
      visitorIntent:
        [visitorIntent, qualification].filter(Boolean).join(" | ") || undefined,
    }),
    [qualification, resolvedSourceCTA, service, visitorIntent],
  );
  const options = intakeOptionsFor(service);
  const optionGroups = groupedOptionsFor(service, options);
  const intakeLabel = intakeLabelFor(service);
  const qualificationOptions = qualificationOptionsFor(service, visitorIntent);
  const needsQualification =
    !useOptionCards && qualificationOptions.length > 0;
  const canContinue =
    Boolean(visitorIntent) && (!needsQualification || Boolean(qualification));

  useEffect(() => {
    if (hasTrackedStarted.current) return;
    hasTrackedStarted.current = true;
    trackBookingEvent("booking_intake_started", context);
    onStepChange?.("intake");
  }, [context, onStepChange]);

  useEffect(() => {
    if (hasCompletedBooking) {
      onStepChange?.("confirmation");
    } else if (hasCompletedIntake) {
      onStepChange?.("scheduling");
    } else if (visitorIntent && needsQualification) {
      onStepChange?.("qualification");
    } else {
      onStepChange?.("intake");
    }
  }, [
    hasCompletedBooking,
    hasCompletedIntake,
    needsQualification,
    onStepChange,
    visitorIntent,
  ]);

  function completeIntake() {
    setHasCompletedIntake(true);
    trackBookingEvent("booking_intake_completed", context);
  }

  return (
    <div className="booking-flow">
      {hideIntakeAfterComplete && hasCompletedIntake ? null : (
        <section
          aria-label={showIntro ? undefined : "Booking intake"}
          aria-labelledby={showIntro ? "booking-intake-title" : undefined}
          className={`booking-intake${showIntro ? "" : " no-intro"}`}
        >
          {showIntro ? (
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
          ) : null}

          {useOptionCards ? (
            <div className="booking-intake-card-fields">
              <div
                aria-label={intakeLabel}
                className="booking-option-list"
                role="radiogroup"
              >
                {optionGroups.map((group) => (
                  <div
                    className={`booking-option-group${
                      group.label === "Other topics" ? " secondary" : ""
                    }`}
                    key={group.label || "options"}
                  >
                    {group.label ? (
                      <div className="booking-option-group-label">
                        <span>{group.label}</span>
                      </div>
                    ) : null}
                    {group.options.map((option) => (
                      <button
                        aria-checked={visitorIntent === option}
                        className={`booking-option-choice${
                          visitorIntent === option ? " selected" : ""
                        }`}
                        key={option}
                        onClick={() => {
                          setVisitorIntent(option);
                          setQualification("");
                          setHasCompletedIntake(false);
                          setHasCompletedBooking(false);
                        }}
                        role="radio"
                        type="button"
                      >
                        <span className="booking-choice-dot" aria-hidden="true" />
                        <span className="booking-choice-icon" aria-hidden="true">
                          {optionCodeFor(option)}
                        </span>
                        <span>
                          <strong>{option}</strong>
                          <small>{optionDescriptionFor(option)}</small>
                        </span>
                      </button>
                    ))}
                  </div>
                ))}
              </div>

              {needsQualification ? (
                <div
                  aria-label={qualificationLabelFor(service)}
                  className="booking-option-list secondary"
                  role="radiogroup"
                >
                  {qualificationOptions.map((option) => (
                    <button
                      aria-checked={qualification === option}
                      className={`booking-option-choice${
                        qualification === option ? " selected" : ""
                      }`}
                      key={option}
                      onClick={() => setQualification(option)}
                      role="radio"
                      type="button"
                    >
                      <span className="booking-choice-dot" aria-hidden="true" />
                      <span className="booking-choice-icon" aria-hidden="true">
                        {optionCodeFor(option)}
                      </span>
                      <span>
                        <strong>{option}</strong>
                        <small>{optionDescriptionFor(option)}</small>
                      </span>
                    </button>
                  ))}
                </div>
              ) : null}

              <div className="booking-intake-actions">
                <button
                  className="button primary"
                  disabled={!canContinue}
                  onClick={completeIntake}
                  type="button"
                >
                  Continue to calendar <span aria-hidden="true">-&gt;</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="booking-intake-fields">
              <label htmlFor="visitor-intent">{intakeLabel}</label>
              <select
                id="visitor-intent"
                onChange={(event) => {
                  setVisitorIntent(event.target.value);
                  setQualification("");
                  setHasCompletedIntake(false);
                  setHasCompletedBooking(false);
                }}
                value={visitorIntent}
              >
                <option value="">Select one</option>
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {needsQualification ? (
                <>
                  <label htmlFor="booking-qualification">
                    {qualificationLabelFor(service)}
                  </label>
                  <select
                    id="booking-qualification"
                    onChange={(event) => setQualification(event.target.value)}
                    value={qualification}
                  >
                    <option value="">Select one</option>
                    {qualificationOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </>
              ) : null}
              <button
                className="button primary"
                disabled={!canContinue}
                onClick={completeIntake}
                type="button"
              >
                Continue to scheduling <span aria-hidden="true">-&gt;</span>
              </button>
            </div>
          )}
        </section>
      )}

      {hasCompletedIntake ? (
        <Embed
          context={context}
          onBookingComplete={() => setHasCompletedBooking(true)}
          service={service}
        />
      ) : null}

      {hasCompletedBooking ? (
        <section className="booking-confirmation" aria-live="polite">
          <div className="section-kicker">Confirmed</div>
          <h2>
            {service.bookingType === "direct"
              ? `${service.displayName} booked`
              : "Meeting booked"}
          </h2>
          <p>
            Confirmation is handled by Cal.com. You can close this window and
            stay on the page you were reading.
          </p>
        </section>
      ) : null}
    </div>
  );
}
