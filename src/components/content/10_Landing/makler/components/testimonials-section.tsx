"use client";

import type { Testimonial, FeaturedTestimonial as FeaturedTestimonialType } from "../config";
import { FeaturedTestimonial } from "./featured-testimonial";

interface TestimonialsSectionProps {
  reviews: Testimonial[];
  featuredTestimonial: FeaturedTestimonialType;
  locationName: string;
}

export function TestimonialsSection({ reviews, featuredTestimonial, locationName }: TestimonialsSectionProps) {
  const scrollToFunnel = () => {
    document.getElementById("funnel")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-14">
      <div className="mx-auto max-w-3xl px-4 md:px-10">
        {/* Section header */}
        <div className="mb-2 text-xs font-semibold uppercase tracking-[1.5px] text-[var(--lp-blue)]">
          Echte Ergebnisse aus {locationName}
        </div>
        <h2 className="mb-8 font-display text-[clamp(22px,4vw,32px)] font-extrabold leading-[1.2] text-[var(--lp-navy)]">
          Was Verkäufer mit unserem Service erreicht haben
        </h2>

        {/* Featured testimonial */}
        <FeaturedTestimonial testimonial={featuredTestimonial} />

        {/* Grid testimonials */}
        <div className="mb-9 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.slice(0, 4).map((review) => (
            <div
              key={review.name}
              className="rounded-xl border border-[var(--lp-gray-light)] bg-white p-5 transition-shadow hover:shadow-[0_4px_24px_rgba(13,27,42,0.10)]"
            >
              <div className="mb-2 text-xs tracking-tight text-[var(--lp-gold)]">
                &#9733;&#9733;&#9733;&#9733;&#9733;
              </div>
              <p className="mb-3 text-sm leading-relaxed text-[#4a5568]">
                &bdquo;{review.review}&ldquo;
              </p>
              <div className="text-xs text-[var(--lp-gray)]">
                <strong className="block text-[var(--lp-text)]">{review.name}</strong>
                {review.location}
                {review.propertyType && ` · ${review.propertyType}`}
              </div>
            </div>
          ))}
        </div>

        {/* Mid CTA */}
        <div
          className="rounded-[20px] border border-[var(--lp-gray-light)] p-7 text-center"
          style={{ background: "var(--lp-off-white)" }}
        >
          <p className="mb-4 text-[15px] text-[var(--lp-gray)]">
            <strong className="text-[var(--lp-text)]">Jetzt ist ein guter Zeitpunkt in {locationName}.</strong>
            <br />
            Der Markt ist aktiv – finden Sie den Makler, der das Maximum herausholt.
          </p>
          <button
            onClick={scrollToFunnel}
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--lp-blue)] px-7 py-3.5 font-display text-[15px] font-bold text-white shadow-[0_4px_16px_rgba(26,92,255,0.3)] transition-all hover:-translate-y-0.5 hover:bg-[var(--lp-blue-light)] hover:shadow-[0_8px_24px_rgba(26,92,255,0.38)]"
          >
            Jetzt meinen Makler in {locationName} finden &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}
