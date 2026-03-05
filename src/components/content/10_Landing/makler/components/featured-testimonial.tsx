import { MainContainer } from "@/components/layout/main-container";
import { Quote, Clock, TrendingUp } from "lucide-react";
import type { FeaturedTestimonial as FeaturedTestimonialType } from "../config";

interface FeaturedTestimonialProps {
  testimonial: FeaturedTestimonialType;
}

export function FeaturedTestimonial({ testimonial }: FeaturedTestimonialProps) {
  return (
    <section className="bg-white py-16 md:py-24">
      <MainContainer>
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/90 p-8 text-white md:p-12">
            {/* Decorative quote mark */}
            <Quote className="absolute -right-4 -top-4 size-32 rotate-180 text-white/10" />

            <div className="relative">
              {/* Quote */}
              <blockquote className="mb-8 text-lg leading-relaxed md:text-xl">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Author info */}
              <div className="mb-6 flex items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-full bg-white/20 text-lg font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-white/80">
                    {testimonial.location} · {testimonial.propertyType}
                  </div>
                </div>
              </div>

              {/* Result stats */}
              {(testimonial.resultAmount || testimonial.resultDays) && (
                <div className="flex flex-wrap gap-4">
                  {testimonial.resultAmount && (
                    <div className="flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-primary">
                      <TrendingUp className="size-4" />
                      <span className="font-semibold">
                        {testimonial.resultAmount}
                      </span>
                    </div>
                  )}
                  {testimonial.resultDays && (
                    <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
                      <Clock className="size-4" />
                      <span className="font-semibold">
                        {testimonial.resultDays}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </MainContainer>
    </section>
  );
}
