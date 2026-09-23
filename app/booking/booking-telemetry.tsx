"use client";

import { useEffect } from "react";

import { trackBookingEvent } from "./analytics";
import type { BookingContext } from "./services";

function contextFromLink(link: HTMLAnchorElement): BookingContext | null {
  const { bookingService, bookingCategory, bookingType, bookingSourcePage, bookingSourceCta, bookingEngagementType, bookingDuration, bookingIndicativeValue } = link.dataset;
  if (
    !bookingService ||
    !bookingCategory ||
    !bookingType ||
    !bookingSourcePage ||
    !bookingSourceCta ||
    !bookingEngagementType ||
    !bookingDuration
  ) {
    return null;
  }

  return {
    service: bookingService,
    serviceCategory: bookingCategory as BookingContext["serviceCategory"],
    bookingType: bookingType as BookingContext["bookingType"],
    sourcePage: bookingSourcePage,
    sourceCTA: bookingSourceCta,
    engagementType: bookingEngagementType as BookingContext["engagementType"],
    indicativeValue: bookingIndicativeValue,
    duration: Number(bookingDuration),
  };
}

export function BookingTelemetry() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>("a[data-booking-cta]");
      if (!link) return;

      const context = contextFromLink(link);
      if (context) {
        trackBookingEvent("booking_cta_clicked", context);
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
