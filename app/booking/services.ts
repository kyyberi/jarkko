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
  eventSlugEnv:
    | "NEXT_PUBLIC_CALCOM_CONSULTATION_EVENT_SLUG"
    | "NEXT_PUBLIC_CALCOM_ODPS_CONSULTATION_EVENT_SLUG"
    | "NEXT_PUBLIC_CALCOM_ODPS_MAINTAINER_EVENT_SLUG";
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

export const consultingServices: ServiceBookingConfig[] = [
  {
    id: "ai-portfolio-review",
    displayName: "AI Portfolio Review",
    category: "ai-strategy",
    bookingType: "consultation",
    engagementType: "portfolio-review",
    duration: 30,
    eventSlugEnv: "NEXT_PUBLIC_CALCOM_CONSULTATION_EVENT_SLUG",
    fallbackEventSlug: "30min",
    intakeType: "consulting",
    indicativeValue: "$10K-$15K",
    paymentRequired: false,
    sourcePage: "/",
    sourceCTA: "ai-portfolio-review-card",
    ctaLabel: "Book a 30-minute call",
    routingPrompt: "AI portfolio and product strategy",
  },
  {
    id: "agentic-ai-architecture-sprint",
    displayName: "Agentic AI Architecture Sprint",
    category: "agentic-ai",
    bookingType: "consultation",
    engagementType: "architecture-sprint",
    duration: 30,
    eventSlugEnv: "NEXT_PUBLIC_CALCOM_CONSULTATION_EVENT_SLUG",
    fallbackEventSlug: "30min",
    intakeType: "consulting",
    indicativeValue: "$18K-$25K",
    paymentRequired: false,
    sourcePage: "/",
    sourceCTA: "agentic-ai-architecture-sprint-card",
    ctaLabel: "Book a 30-minute call",
    routingPrompt: "Agentic AI architecture",
  },
  {
    id: "ai-product-operating-model",
    displayName: "AI Product Operating Model",
    category: "operating-model",
    bookingType: "consultation",
    engagementType: "operating-model",
    duration: 30,
    eventSlugEnv: "NEXT_PUBLIC_CALCOM_CONSULTATION_EVENT_SLUG",
    fallbackEventSlug: "30min",
    intakeType: "consulting",
    indicativeValue: "Priced by scope",
    paymentRequired: false,
    sourcePage: "/",
    sourceCTA: "ai-product-operating-model-card",
    ctaLabel: "Book a 30-minute call",
    routingPrompt: "AI product operating model",
  },
  {
    id: "fractional-ai-product-leadership",
    displayName: "Fractional AI Product Leadership",
    category: "leadership",
    bookingType: "consultation",
    engagementType: "fractional-leadership",
    duration: 30,
    eventSlugEnv: "NEXT_PUBLIC_CALCOM_CONSULTATION_EVENT_SLUG",
    fallbackEventSlug: "30min",
    intakeType: "consulting",
    indicativeValue: "From $8K/month",
    paymentRequired: false,
    sourcePage: "/",
    sourceCTA: "fractional-ai-product-leadership-card",
    ctaLabel: "Book a 30-minute call",
    routingPrompt: "Fractional AI product leadership",
  },
];

export const odpsServices: ServiceBookingConfig[] = [
  {
    id: "odps-maintainer-session",
    displayName: "ODPS Maintainer Session",
    category: "odps",
    bookingType: "direct",
    engagementType: "expert-session",
    duration: 60,
    eventSlugEnv: "NEXT_PUBLIC_CALCOM_ODPS_MAINTAINER_EVENT_SLUG",
    fallbackEventSlug: "odps-maintainer-session",
    intakeType: "odps-maintainer",
    indicativeValue: "$200 / 60 minutes",
    paymentRequired: true,
    sourcePage: "/services/odps/",
    sourceCTA: "odps-maintainer-session-card",
    ctaLabel: "Book 60-minute session",
    routingPrompt: "ODPS Maintainer Session",
  },
  {
    id: "odps-enterprise-readiness-assessment",
    displayName: "ODPS Enterprise Readiness Assessment",
    category: "odps",
    bookingType: "consultation",
    engagementType: "readiness-assessment",
    duration: 30,
    eventSlugEnv: "NEXT_PUBLIC_CALCOM_ODPS_CONSULTATION_EVENT_SLUG",
    fallbackEventSlug: "30min",
    intakeType: "odps-consulting",
    indicativeValue: "$20K-$40K",
    paymentRequired: false,
    sourcePage: "/services/odps/",
    sourceCTA: "odps-enterprise-readiness-assessment-card",
    ctaLabel: "Book a 30-minute call",
    routingPrompt: "Evaluate ODPS",
  },
  {
    id: "odps-adoption-implementation",
    displayName: "ODPS Adoption & Implementation",
    category: "odps",
    bookingType: "consultation",
    engagementType: "implementation",
    duration: 30,
    eventSlugEnv: "NEXT_PUBLIC_CALCOM_ODPS_CONSULTATION_EVENT_SLUG",
    fallbackEventSlug: "30min",
    intakeType: "odps-consulting",
    indicativeValue: "From $50K",
    paymentRequired: false,
    sourcePage: "/services/odps/",
    sourceCTA: "odps-adoption-implementation-card",
    ctaLabel: "Book a 30-minute call",
    routingPrompt: "Adopt ODPS",
  },
  {
    id: "agent-ready-data-product-architecture",
    displayName: "Agent-Ready Data Product Architecture",
    category: "odps",
    bookingType: "consultation",
    engagementType: "architecture-sprint",
    duration: 30,
    eventSlugEnv: "NEXT_PUBLIC_CALCOM_ODPS_CONSULTATION_EVENT_SLUG",
    fallbackEventSlug: "30min",
    intakeType: "odps-consulting",
    indicativeValue: "$35K-$70K",
    paymentRequired: false,
    sourcePage: "/services/odps/",
    sourceCTA: "agent-ready-data-product-architecture-card",
    ctaLabel: "Book a 30-minute call",
    routingPrompt: "Design agent-ready data products",
  },
  {
    id: "odps-expert-advisory",
    displayName: "ODPS Expert Advisory",
    category: "odps",
    bookingType: "consultation",
    engagementType: "advisory",
    duration: 30,
    eventSlugEnv: "NEXT_PUBLIC_CALCOM_ODPS_CONSULTATION_EVENT_SLUG",
    fallbackEventSlug: "30min",
    intakeType: "odps-consulting",
    indicativeValue: "From $2.5K/day",
    paymentRequired: false,
    sourcePage: "/services/odps/",
    sourceCTA: "odps-expert-advisory-card",
    ctaLabel: "Book a 30-minute call",
    routingPrompt: "Expert advisory",
  },
];

export const genericBookingService: ServiceBookingConfig = {
  id: "general-consultation",
  displayName: "Consultation",
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
  ctaLabel: "Book a meeting",
  routingPrompt: "Something else",
};

export const bookingServices = [
  genericBookingService,
  ...consultingServices,
  ...odpsServices,
];

export function getBookingService(serviceId: string) {
  return bookingServices.find((service) => service.id === serviceId);
}

export function bookingPath(serviceId: string, sourceCTA?: string) {
  const query = sourceCTA ? `?sourceCTA=${encodeURIComponent(sourceCTA)}` : "";
  return sitePath(`/booking/${serviceId}${query}`);
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

export const maintainerTopicOptions = [
  "Architecture review",
  "ODPS implementation review",
  "Data product design",
  "Governance",
  "Agent-ready data products",
  "Specification interpretation",
  "Other",
];
