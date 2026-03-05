import type { FeaturedTestimonial as FeaturedTestimonialType } from "../config";

interface FeaturedTestimonialProps {
  testimonial: FeaturedTestimonialType;
}

export function FeaturedTestimonial({ testimonial }: FeaturedTestimonialProps) {
  const quoteHtml = testimonial.quote.replace(
    testimonial.highlight,
    `<strong class="text-[var(--lp-gold)]">${testimonial.highlight}</strong>`
  );

  return (
    <div
      className="relative mb-4 overflow-hidden rounded-[20px] p-7"
      style={{
        background: "linear-gradient(135deg, var(--lp-navy) 0%, #1a3a60 100%)",
      }}
    >
      {/* Badge */}
      <div className="mb-3.5 inline-flex items-center gap-1.5 rounded-full border border-[var(--lp-gold)]/30 bg-[var(--lp-gold)]/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--lp-gold)]">
        &#127942; Stärkstes Ergebnis 2025
      </div>

      {/* Quote */}
      <p
        className="mb-4 text-lg font-medium leading-relaxed text-white"
        dangerouslySetInnerHTML={{ __html: `&bdquo;${quoteHtml}&ldquo;` }}
      />

      {/* Meta */}
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div className="text-[13px] text-white/65">
          <strong className="block text-sm text-white">{testimonial.name}</strong>
          {testimonial.location} &middot; {testimonial.propertyType}
        </div>
        {(testimonial.resultAmount || testimonial.resultDays) && (
          <div className="hidden gap-4 sm:flex">
            {testimonial.resultAmount && (
              <div className="text-right">
                <div className="font-display text-[15px] font-bold text-[var(--lp-gold)]">
                  {testimonial.resultAmount}
                </div>
                <div className="text-[11px] text-white/50">über Erstbewertung</div>
              </div>
            )}
            {testimonial.resultDays && (
              <div className="text-right">
                <div className="font-display text-[15px] font-bold text-[var(--lp-gold)]">
                  {testimonial.resultDays}
                </div>
                <div className="text-[11px] text-white/50">bis Verkauf</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
