import type { Metadata } from "next";
import { Suspense } from "react";

import { Arrow, PageShell } from "../site";
import { canonicalPath } from "../seo";
import { BookingFlow } from "./booking-flow";
import {
  bookingPath,
  bookingServices,
  genericBookingService,
  type ServiceBookingConfig,
} from "./services";

export const metadata: Metadata = {
  title: "Book a Meeting",
  description:
    "Book a consultation or focused ODPS expert session with Jarkko Moilanen.",
  alternates: {
    canonical: canonicalPath("/booking"),
  },
};

function BookingOption({ service }: { service: ServiceBookingConfig }) {
  if (service.id === genericBookingService.id) return null;

  return (
    <a
      className="booking-option"
      href={bookingPath(service.id, "booking-index")}
    >
      <span>{service.bookingType === "direct" ? "Direct" : "Consultation"}</span>
      <strong>{service.displayName}</strong>
      <small>{service.indicativeValue ?? `${service.duration} minutes`}</small>
    </a>
  );
}

export default function BookingPage() {
  return (
    <PageShell>
      <div className="booking-page">
        <section className="booking-hero">
          <div>
            <div className="section-kicker">Booking</div>
            <h1>Book the right conversation.</h1>
            <p>
              Start with the route that matches the work: discovery for larger
              engagements, direct scheduling for focused expert sessions.
            </p>
          </div>
          <a className="button" href="#booking-options">
            Choose service <Arrow />
          </a>
        </section>

        <section className="booking-layout" id="booking-options">
          <div className="booking-options" aria-label="Booking options">
            {bookingServices.map((service) => (
              <BookingOption key={service.id} service={service} />
            ))}
          </div>
          <Suspense fallback={null}>
            <BookingFlow service={genericBookingService} />
          </Suspense>
        </section>
      </div>
    </PageShell>
  );
}
