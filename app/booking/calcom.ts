import type { BookingContext, ServiceBookingConfig } from "./services";

export const calcomConfig = {
  username: process.env.NEXT_PUBLIC_CALCOM_USERNAME ?? "",
  origin: process.env.NEXT_PUBLIC_CALCOM_ORIGIN ?? "https://cal.com",
};

const publicEventSlugs = {
  NEXT_PUBLIC_CALCOM_CONSULTATION_EVENT_SLUG:
    process.env.NEXT_PUBLIC_CALCOM_CONSULTATION_EVENT_SLUG ?? "",
  NEXT_PUBLIC_CALCOM_ODPS_CONSULTATION_EVENT_SLUG:
    process.env.NEXT_PUBLIC_CALCOM_ODPS_CONSULTATION_EVENT_SLUG ?? "",
  NEXT_PUBLIC_CALCOM_ODPS_MAINTAINER_EVENT_SLUG:
    process.env.NEXT_PUBLIC_CALCOM_ODPS_MAINTAINER_EVENT_SLUG ?? "",
};

export function eventSlugFor(service: ServiceBookingConfig) {
  return publicEventSlugs[service.eventSlugEnv] || service.fallbackEventSlug;
}

export function calcomLinkFor(service: ServiceBookingConfig) {
  if (!calcomConfig.username) return "";
  return `${calcomConfig.username}/${eventSlugFor(service)}`;
}

export function calcomBookingUrlFor(
  service: ServiceBookingConfig,
  context: BookingContext,
) {
  const link = calcomLinkFor(service);
  if (!link) return "";

  const url = new URL(`${calcomConfig.origin}/${link}`);
  url.searchParams.set("service", context.service);
  url.searchParams.set("serviceCategory", context.serviceCategory);
  url.searchParams.set("bookingType", context.bookingType);
  url.searchParams.set("sourcePage", context.sourcePage);
  url.searchParams.set("sourceCTA", context.sourceCTA);
  url.searchParams.set("engagementType", context.engagementType);
  url.searchParams.set("duration", String(context.duration));
  if (context.visitorIntent) {
    url.searchParams.set("visitorIntent", context.visitorIntent);
  }

  return url.toString();
}
