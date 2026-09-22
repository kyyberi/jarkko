"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { trackBookingEvent } from "./analytics";
import { BookingFlow } from "./booking-flow";
import {
  bookingContextFor,
  getBookingService,
  type BookingContext,
  type ServiceBookingConfig,
} from "./services";

type BookingStep = "intake" | "qualification" | "scheduling" | "confirmation";

const assetPath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const bookingAvatarPath = `${assetPath}/images/jarkko-booking-avatar.jpg`;

function contextFromLink(link: HTMLAnchorElement): {
  context: BookingContext;
  service: ServiceBookingConfig;
} | null {
  const serviceId = link.dataset.bookingService;
  const service = serviceId ? getBookingService(serviceId) : null;
  if (!service) return null;

  const context = bookingContextFor(service, link.dataset.bookingSourceCta);

  return {
    context: {
      ...context,
      sourcePage: link.dataset.bookingSourcePage ?? context.sourcePage,
    },
    service,
  };
}

function focusableElements(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      [
        "a[href]",
        "button:not([disabled])",
        "select:not([disabled])",
        "textarea:not([disabled])",
        "input:not([disabled])",
        "[tabindex]:not([tabindex='-1'])",
      ].join(","),
    ),
  ).filter((element) => !element.hasAttribute("hidden"));
}

function stepLabel(step: BookingStep) {
  if (step === "confirmation") return "Step 3 of 3";
  if (step === "scheduling") return "Step 2 of 3";
  return "Step 1 of 3";
}

function progressValue(step: BookingStep) {
  if (step === "confirmation") return "100%";
  if (step === "scheduling") return "66%";
  return "33%";
}

function stepTitle(step: BookingStep) {
  if (step === "confirmation") return "You're all set.";
  if (step === "scheduling") return "Select a date and time";
  return "What would you like to discuss?";
}

function stepDescription(step: BookingStep) {
  if (step === "confirmation") return "Your booking is confirmed by Cal.com.";
  if (step === "scheduling") return "Choose a time that works for you. Times are shown by Cal.com.";
  return "Choose the main topic for your session.";
}

function serviceDescription(service: ServiceBookingConfig) {
  if (service.bookingType === "direct") {
    return "A focused expert session to review your questions, implementation direction, or project decision.";
  }

  if (service.category === "odps") {
    return "A short qualification call to understand fit, timing, and the ODPS support path.";
  }

  return "A short qualification call to understand the decision, context, and next useful step.";
}

export function BookingModalRoot() {
  const [activeService, setActiveService] = useState<ServiceBookingConfig | null>(null);
  const [activeContext, setActiveContext] = useState<BookingContext | null>(null);
  const [activeStep, setActiveStep] = useState<BookingStep>("intake");
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const hasTrackedModalOpenRef = useRef(false);

  const titleId = "booking-modal-title";
  const descriptionId = "booking-modal-description";
  const isOpen = Boolean(activeService && activeContext);

  const closeModal = useCallback(() => {
    if (activeContext) {
      trackBookingEvent("booking_modal_closed", activeContext, {
        booking_step: activeStep,
      });
    }
    setActiveService(null);
    setActiveContext(null);
    setActiveStep("intake");
    window.setTimeout(() => openerRef.current?.focus(), 0);
  }, [activeContext, activeStep]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>("a[data-booking-cta]");
      if (!link || link.target === "_blank") return;

      const result = contextFromLink(link);
      if (!result) return;

      event.preventDefault();
      openerRef.current = link;
      hasTrackedModalOpenRef.current = false;
      setActiveService(result.service);
      setActiveContext(result.context);
      setActiveStep("intake");
      trackBookingEvent("booking_cta_clicked", result.context);
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    if (!isOpen || !activeContext || !modalRef.current || hasTrackedModalOpenRef.current) {
      return;
    }

    hasTrackedModalOpenRef.current = true;
    trackBookingEvent("booking_started", activeContext);
    trackBookingEvent("booking_modal_opened", activeContext);
  }, [activeContext, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
        return;
      }

      if (event.key !== "Tab" || !modalRef.current) return;

      const elements = focusableElements(modalRef.current);
      if (elements.length === 0) return;

      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal, isOpen]);

  if (!activeService || !activeContext) return null;

  return (
    <div
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      aria-modal="true"
      className="booking-modal-overlay"
      role="dialog"
    >
      <div className={`booking-modal booking-modal-${activeStep}`} ref={modalRef}>
        <aside className="booking-modal-summary">
          <div>
            <div className="booking-modal-kicker">
              {activeService.bookingType === "direct"
                ? "Book a session"
                : "Book a consultation"}
            </div>
            <div className="booking-modal-avatar" aria-hidden="true">
              <img src={bookingAvatarPath} alt="" />
            </div>
            <h2 id={titleId}>{activeService.displayName}</h2>
            <p id={descriptionId}>
              {serviceDescription(activeService)}
            </p>
          </div>

          <dl className="booking-modal-facts">
            <div>
              <dt>Duration</dt>
              <dd>{activeService.duration} minutes</dd>
            </div>
            <div>
              <dt>Format</dt>
              <dd>Cal Video</dd>
            </div>
            {activeService.indicativeValue ? (
              <div>
                <dt>{activeService.paymentRequired ? "Price" : "Typical value"}</dt>
                <dd>{activeService.indicativeValue}</dd>
              </div>
            ) : null}
            <div>
              <dt>Timezone</dt>
              <dd>Asia/Dubai</dd>
            </div>
          </dl>

          <p className="booking-modal-note">
            Practical guidance. Clear next step.
          </p>
        </aside>

        <main className="booking-modal-main">
          <button
            aria-label="Close booking"
            className="booking-modal-close"
            onClick={closeModal}
            ref={closeButtonRef}
            type="button"
          >
            ×
          </button>

          <div className="booking-modal-progress">
            <span>{stepLabel(activeStep)}</span>
            <div aria-hidden="true">
              <span style={{ width: progressValue(activeStep) }} />
            </div>
          </div>

          <div className="booking-step-heading">
            <h3>{stepTitle(activeStep)}</h3>
            <p>{stepDescription(activeStep)}</p>
          </div>

          {activeStep === "scheduling" || activeStep === "confirmation" ? (
            <section
              aria-label="Session being booked"
              className="booking-session-strip"
            >
              <div>
                <span>
                  {activeService.bookingType === "direct"
                    ? "Direct expert session"
                    : "Consultation"}
                </span>
                <strong>{activeService.displayName}</strong>
              </div>
              <dl>
                <div>
                  <dt>Duration</dt>
                  <dd>{activeService.duration} min</dd>
                </div>
                <div>
                  <dt>Format</dt>
                  <dd>Cal Video</dd>
                </div>
                {activeService.indicativeValue ? (
                  <div>
                    <dt>{activeService.paymentRequired ? "Price" : "Value"}</dt>
                    <dd>{activeService.indicativeValue}</dd>
                  </div>
                ) : null}
                <div>
                  <dt>Timezone</dt>
                  <dd>Asia/Dubai</dd>
                </div>
              </dl>
            </section>
          ) : null}

          <BookingFlow
            hideIntakeAfterComplete
            onStepChange={setActiveStep}
            service={activeService}
            showIntro={false}
            sourceCTA={activeContext.sourceCTA}
            useOptionCards
          />
        </main>
      </div>
    </div>
  );
}
