"use client";

import { useEffect, useLayoutEffect } from "react";
import { MaklerFunnelProvider } from "@/components/funnel/makler/makler-funnel";
import FooterLight from "@/components/layout/footer-light";
import { getCityConfig } from "./config";
import {
  FinalCta,
  HeroSection,
  HowItWorks,
  KpiStrip,
  LpFaqSection,
  MarketContext,
  StickyMobileCta,
  TestimonialsSection,
} from "./components";
import Link from "next/link";

interface MaklerLandingPageProps {
  locationName: string;
  cityName: string;
  einwohner?: number;
  variant: "makler" | "immobilienmakler";
}

function LpNav({ rating, reviewCount }: { rating: string; reviewCount: string }) {
  return (
    <nav
      className="sticky top-0 z-50"
      style={{ background: "var(--lp-navy)" }}
    >
      <div className="mx-auto flex h-[60px] max-w-[1400px] items-center justify-between px-4 md:px-10">
        <Link href="/" className="font-display text-[17px] font-extrabold tracking-tight text-white no-underline">
          Makler<span className="text-[var(--lp-gold)]">Auskunft</span>
        </Link>
        <div className="hidden items-center gap-1.5 text-[13px] text-white/65 sm:flex">
          <span className="tracking-tight text-[var(--lp-gold)]">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
          <strong className="text-[var(--lp-gold)]">{rating}/5</strong> aus {reviewCount} Bewertungen
        </div>
      </div>
    </nav>
  );
}

export default function MaklerLandingPage({
  locationName,
  cityName,
  variant,
}: MaklerLandingPageProps) {
  const config = getCityConfig(cityName);
  const maklerLabel =
    variant === "immobilienmakler" ? "Immobilienmakler" : "Makler";

  // Hide the main SiteHeader on the landing page (useLayoutEffect to avoid flash)
  useLayoutEffect(() => {
    const headers = document.querySelectorAll("body > header, main > header");
    const siteHeader = Array.from(headers).find(
      (h) => !h.closest(".lp-theme")
    );
    if (siteHeader instanceof HTMLElement) {
      siteHeader.style.display = "none";
      return () => { siteHeader.style.display = ""; };
    }
  }, []);

  return (
    <MaklerFunnelProvider>
      <div className="lp-theme font-body">
        <LpNav rating={config.rating} reviewCount={config.reviewCount} />

        <HeroSection
          locationName={locationName}
          cityName={cityName}
          maklerLabel={maklerLabel}
          config={config}
        />

        <KpiStrip config={config} locationName={locationName} />
        <TestimonialsSection
          reviews={config.testimonials}
          featuredTestimonial={config.featuredTestimonial}
          locationName={locationName}
        />
        <HowItWorks />
        <MarketContext stats={config.marketStats} locationName={locationName} />
        <LpFaqSection />
        <FinalCta locationName={locationName} maklerLabel={maklerLabel} />
        <FooterLight />
        <StickyMobileCta />
      </div>
    </MaklerFunnelProvider>
  );
}
