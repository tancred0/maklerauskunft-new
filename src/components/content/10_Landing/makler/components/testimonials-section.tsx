import { MainContainer } from "@/components/layout/main-container";
import { StarRating } from "@/components/home/star-rating";
import { ReviewCard } from "@/components/home/review-card";
import type { Testimonial } from "../config";

interface TestimonialsSectionProps {
  reviews: Testimonial[];
}

export function TestimonialsSection({ reviews }: TestimonialsSectionProps) {
  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <MainContainer>
        {/* Section header */}
        <div className="mx-auto mb-12 max-w-4xl text-center md:mb-16">
          <h2 className="mb-8 text-2xl font-bold leading-tight text-primary md:text-3xl lg:text-4xl">
            Was unsere Kunden sagen
          </h2>

          {/* Overall rating */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-3">
              <StarRating rating={4.8} size="lg" />
              <span className="text-3xl font-bold text-primary md:text-4xl">
                4.8/5
              </span>
            </div>
            <p className="text-muted-foreground">
              Durchschnitt von 2.000+ Kundenbewertungen
            </p>
          </div>
        </div>

        {/* Review cards grid */}
        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {reviews.map((review) => (
            <ReviewCard
              key={review.name}
              name={review.name}
              location={review.location}
              rating={review.rating}
              review={review.review}
              propertyType={review.propertyType}
            />
          ))}
        </div>
      </MainContainer>
    </section>
  );
}
