"use client";

import { MaklerFunnelContent, MaklerFunnelProvider } from "@/components/funnel/makler/makler-funnel";
import FooterLight from "@/components/layout/footer-light";
import { MainContainer } from "@/components/layout/main-container";
import { FaqSection } from "@/components/home";
import { getCityConfig } from "./config";
import {
  FeaturedTestimonial,
  FinalCta,
  HeroSection,
  HowItWorks,
  KpiStrip,
  MarketContext,
  StickyMobileCta,
  TestimonialsSection,
} from "./components";

interface MaklerLandingPageProps {
  locationName: string;
  cityName: string;
  einwohner?: number;
  variant: "makler" | "immobilienmakler";
}

export default function MaklerLandingPage({
  locationName,
  cityName,
  variant,
}: MaklerLandingPageProps) {
  const config = getCityConfig(cityName);
  const maklerLabel =
    variant === "immobilienmakler" ? "Immobilienmakler" : "Makler";

  return (
    <MaklerFunnelProvider>
      <HeroSection locationName={locationName} maklerLabel={maklerLabel} />

      <section id="funnel" className="bg-gray-50 pb-4 md:pb-8">
        <MainContainer>
          <MaklerFunnelContent
            locationName={locationName}
            cityName={cityName || locationName}
          />
        </MainContainer>
      </section>

      <KpiStrip config={config} locationName={locationName} />
      <HowItWorks />
      <MarketContext stats={config.marketStats} locationName={locationName} />
      <FeaturedTestimonial testimonial={config.featuredTestimonial} />
      <TestimonialsSection reviews={config.testimonials} />
      <FaqSection />
      <FinalCta locationName={locationName} maklerLabel={maklerLabel} />
      <FooterLight />
      <StickyMobileCta />
    </MaklerFunnelProvider>
  );
}
