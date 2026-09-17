"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (
      command: "event",
      eventName: string,
      params?: Record<string, string | number | boolean | undefined>,
    ) => void;
  }
}

export function trackInsightEvent(
  eventName: string,
  params: Record<string, string | number | boolean | undefined> = {},
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, {
    source_page: window.location.pathname,
    ...params,
  });
}

export function InsightsPageAnalytics() {
  useEffect(() => {
    trackInsightEvent("insights_page_viewed");
  }, []);

  return null;
}
