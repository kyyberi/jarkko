import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { PageShell } from "../../site";
import { canonicalPath } from "../../seo";
import { BookingFlow } from "../booking-flow";
import { bookingServices, getBookingService } from "../services";

type PageProps = {
  params: Promise<{
    service: string;
  }>;
};

export function generateStaticParams() {
  return bookingServices.map((service) => ({ service: service.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: serviceId } = await params;
  const service = getBookingService(serviceId);
  if (!service) return {};

  return {
    title: `Book ${service.displayName}`,
    description: `Book ${service.displayName} with Jarkko Moilanen.`,
    alternates: {
      canonical: canonicalPath(`/booking/${service.id}`),
    },
  };
}

export default async function ServiceBookingPage({ params }: PageProps) {
  const { service: serviceId } = await params;
  const service = getBookingService(serviceId);
  if (!service) notFound();

  return (
    <PageShell>
      <div className="booking-page">
        <section className="booking-hero booking-service-hero">
          <div>
            <div className="section-kicker">
              {service.bookingType === "direct" ? "Direct expert session" : "Consultation"}
            </div>
            <h1>{service.displayName}</h1>
            <p>
              {service.bookingType === "direct"
                ? "A focused 60-minute ODPS session with payment handled during booking where configured."
                : "A 30-minute conversation to qualify fit, timing and the next decision."}
            </p>
          </div>
          <dl className="booking-context-panel">
            <div>
              <dt>Duration</dt>
              <dd>{service.duration} minutes</dd>
            </div>
            <div>
              <dt>Path</dt>
              <dd>{service.bookingType === "direct" ? "Direct booking" : "Discovery call"}</dd>
            </div>
            {service.indicativeValue ? (
              <div>
                <dt>Published value</dt>
                <dd>{service.indicativeValue}</dd>
              </div>
            ) : null}
          </dl>
        </section>

        <section className="booking-layout">
          <Suspense fallback={null}>
            <BookingFlow service={service} />
          </Suspense>
        </section>
      </div>
    </PageShell>
  );
}
