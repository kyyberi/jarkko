import type { Metadata } from "next";
import { Suspense } from "react";

import { PageShell } from "../site";
import { canonicalPath } from "../seo";
import { BookingFlow } from "./booking-flow";
import { genericBookingService } from "./services";

export const metadata: Metadata = {
  title: "Book a Meeting",
  description:
    "Book a 30-minute starting meeting with Jarkko Moilanen.",
  alternates: {
    canonical: canonicalPath("/booking"),
  },
};

export default function BookingPage() {
  return (
    <PageShell>
      <div className="booking-page">
        <section className="booking-hero">
          <div>
            <div className="section-kicker">Booking</div>
            <h1>Book a 30-minute starting meeting.</h1>
            <p>
              One starting point for every topic. Share what you want to
              discuss, then choose a time that works for you.
            </p>
          </div>
        </section>

        <section className="booking-layout">
          <Suspense fallback={null}>
            <BookingFlow service={genericBookingService} />
          </Suspense>
        </section>
      </div>
    </PageShell>
  );
}
