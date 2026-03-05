import { useMaklerFunnel } from "@/components/funnel/makler/makler-funnel-context";
import { MaklerFunnelContent } from "@/components/funnel/makler/makler-funnel";
import { Check } from "lucide-react";
import type { CityConfig } from "../config";

interface HeroSectionProps {
  locationName: string;
  cityName: string;
  maklerLabel: string;
  config: CityConfig;
}

export function HeroSection({ locationName, cityName, maklerLabel, config }: HeroSectionProps) {
  const { data } = useMaklerFunnel();
  const isFunnelStarted = data.step >= 1;

  return (
    <section
      className="relative overflow-hidden pb-6 pt-5 md:pb-14 md:pt-14"
      style={{
        background: "linear-gradient(155deg, var(--lp-navy) 0%, var(--lp-navy-mid) 60%, #1e3a5f 100%)",
      }}
    >
      {/* Decorative glows */}
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-[400px] w-[400px]"
        style={{
          background: "radial-gradient(circle, rgba(26,92,255,0.18) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-16 -left-10 h-[300px] w-[300px]"
        style={{
          background: "radial-gradient(circle, rgba(240,180,41,0.10) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 md:px-10">
        {/* Hero text - centered */}
        <div className="mx-auto max-w-3xl text-center">
          {/* Trust bar pill - hidden on mobile when funnel started */}
          <div className={`mb-3 md:mb-6 inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 py-1 md:px-4 md:py-1.5 text-xs md:text-[13.5px] text-white/90 ${isFunnelStarted ? "hidden md:inline-flex" : ""}`}>
            <span className="tracking-tight text-[var(--lp-gold)]">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            {config.rating}/5
            <span className="hidden sm:contents">
              <span className="text-white/30">|</span>
              {config.reviewCount} verifizierte Bewertungen
              <span className="text-white/30">|</span>
              {config.verkaeuferVermittelt} Verkäufer vermittelt
            </span>
          </div>

          {/* H1 - smaller on mobile */}
          <h1 className="mb-2 md:mb-4 font-display text-xl md:text-[clamp(26px,5.5vw,44px)] font-extrabold leading-[1.15] text-white">
            Welcher {maklerLabel} in {locationName} erzielt den{" "}
            <span className="text-[var(--lp-gold)]">höchsten Preis</span>{" "}
            für Ihre Immobilie?
          </h1>

          {/* Subtitle - hidden on mobile */}
          <p className="mx-auto mb-7 hidden max-w-[480px] font-body text-[17px] font-light text-white/72 md:block">
            Kostenlose Empfehlung in 2 Minuten – basierend auf echten
            Verkaufsergebnissen.
          </p>

          {/* Step preview - hidden on mobile */}
          <div className="mb-6 hidden flex-wrap items-center justify-center gap-1.5 md:flex md:gap-0">
            {[
              { num: 1, label: "PLZ eingeben" },
              { num: 2, label: "2 kurze Fragen" },
              { num: 3, label: "Top-Makler vergleichen" },
            ].map((step, i) => (
              <div key={step.num} className="flex items-center gap-1.5">
                <div className="flex items-center gap-1.5 text-[13px] text-white/80">
                  <div className="flex size-[22px] shrink-0 items-center justify-center rounded-full bg-[var(--lp-blue)] text-[11px] font-bold text-white">
                    {step.num}
                  </div>
                  <span>{step.label}</span>
                </div>
                {i < 2 && (
                  <span className="mx-2 text-xs text-white/30">&rarr;</span>
                )}
              </div>
            ))}
          </div>

          {/* Micro trust - hidden on mobile */}
          <div className="mb-10 hidden flex-wrap justify-center gap-5 text-[13px] text-white/55 md:flex">
            {["100% kostenlos", "Keine Anmeldung", "Unverbindlich"].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <Check className="size-3.5 text-[var(--lp-green)]" />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Funnel embedded in hero */}
        <div className="mx-auto mt-4 max-w-3xl md:mt-0">
          <MaklerFunnelContent
            locationName={locationName}
            cityName={cityName || locationName}
          />
        </div>
      </div>
    </section>
  );
}
