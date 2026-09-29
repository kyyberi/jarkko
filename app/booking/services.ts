import { sitePath } from "../site";

export type BookingType = "consultation" | "direct";
export type ServiceCategory = "ai-strategy" | "agentic-ai" | "operating-model" | "leadership" | "odps" | "partnership";
export type EngagementType =
  | "portfolio-review"
  | "architecture-sprint"
  | "operating-model"
  | "fractional-leadership"
  | "expert-session"
  | "readiness-assessment"
  | "implementation"
  | "advisory"
  | "generic";

export type IntakeType = "generic" | "consulting" | "odps-consulting" | "odps-maintainer";

export type ServiceBookingConfig = {
  id: string;
  displayName: string;
  category: ServiceCategory;
  bookingType: BookingType;
  engagementType: EngagementType;
  duration: number;
  eventSlugEnv: "NEXT_PUBLIC_CALCOM_CONSULTATION_EVENT_SLUG";
  fallbackEventSlug: string;
  intakeType: IntakeType;
  indicativeValue?: string;
  paymentRequired: boolean;
  sourcePage: string;
  sourceCTA: string;
  ctaLabel: string;
  routingPrompt: string;
};

export type BookingContext = {
  service: string;
  serviceCategory: ServiceCategory;
  bookingType: BookingType;
  sourcePage: string;
  sourceCTA: string;
  engagementType: EngagementType;
  indicativeValue?: string;
  duration: number;
  visitorIntent?: string;
};

export const genericBookingService: ServiceBookingConfig = {
  id: "general-consultation",
  displayName: "30-minute starting meeting",
  category: "ai-strategy",
  bookingType: "consultation",
  engagementType: "generic",
  duration: 30,
  eventSlugEnv: "NEXT_PUBLIC_CALCOM_CONSULTATION_EVENT_SLUG",
  fallbackEventSlug: "30min",
  intakeType: "generic",
  paymentRequired: false,
  sourcePage: "/",
  sourceCTA: "generic-booking",
  ctaLabel: "Book a 30-minute starting meeting",
  routingPrompt: "Something else",
};

export const bookingServices = [genericBookingService];

export function getBookingService(serviceId: string) {
  return bookingServices.find((service) => service.id === serviceId);
}

export function bookingPath(sourceCTA?: string) {
  const query = sourceCTA ? `?sourceCTA=${encodeURIComponent(sourceCTA)}` : "";
  return sitePath(`/booking${query}`);
}

export function bookingContextFor(service: ServiceBookingConfig, sourceCTA?: string): BookingContext {
  return {
    service: service.id,
    serviceCategory: service.category,
    bookingType: service.bookingType,
    sourcePage: service.sourcePage,
    sourceCTA: sourceCTA ?? service.sourceCTA,
    engagementType: service.engagementType,
    indicativeValue: service.indicativeValue,
    duration: service.duration,
  };
}

export const genericVisitorIntentOptions = [
  "Exploring options",
  "AI portfolio and product strategy",
  "ODPS / data products",
  "Open Data Value platform",
  "Agentic AI architecture",
  "AI product operating model",
  "Fractional AI product leadership",
  "Partnership or collaboration",
  "Something else",
];

export const odpsObjectiveOptions = [
  "Evaluate ODPS",
  "Adopt ODPS",
  "Integrate ODPS with an existing platform",
  "Design agent-ready data products",
  "Enterprise architecture",
  "Expert advisory",
  "Other",
];
