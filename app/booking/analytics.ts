"use client";

import type { BookingContext } from "./services";

type BookingAnalyticsEvent =
  | "booking_modal_opened"
  | "booking_modal_closed"
  | "booking_cta_clicked"
  | "booking_intake_started"
  | "booking_intake_completed"
  | "calcom_opened"
  | "booking_completed";

declare global {
  interface Window {
    gtag?: (
      command: "event",
      eventName: string,
      params?: Record<string, string | number | boolean | undefined>,
    ) => void;
  }
}

export function trackBookingEvent(
  eventName: BookingAnalyticsEvent,
  context: BookingContext,
  extras: Record<string, string | number | boolean | undefined> = {},
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, {
    service: context.service,
    service_category: context.serviceCategory,
    booking_type: context.bookingType,
    source_page: context.sourcePage,
    source_cta: context.sourceCTA,
    engagement_type: context.engagementType,
    indicative_value: context.indicativeValue,
    duration: context.duration,
    visitor_intent: context.visitorIntent,
    ...extras,
  });
}
