"use client";

interface FinalCtaProps {
  locationName: string;
  maklerLabel: string;
}

export function FinalCta({ locationName, maklerLabel }: FinalCtaProps) {
  const scrollToFunnel = () => {
    document.getElementById("funnel")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative overflow-hidden py-16 text-center"
      style={{
        background: "linear-gradient(155deg, var(--lp-navy) 0%, #1a3a60 100%)",
      }}
    >
      {/* Decorative glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-[-100px] h-[300px] w-[500px] -translate-x-1/2"
        style={{
          background: "radial-gradient(ellipse, rgba(26,92,255,0.20) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-4 md:px-10">
        <h2 className="mb-3 font-display text-[clamp(22px,4.5vw,34px)] font-extrabold leading-[1.2] text-white">
          Finden Sie jetzt den besten {maklerLabel} in {locationName}, der{" "}
          <span className="text-[var(--lp-gold)]">das Maximum</span> herausholt
        </h2>
        <p className="mb-8 text-base text-white/65">
          Kostenlos &middot; Unverbindlich &middot; In 2 Minuten
        </p>

        <div className="flex flex-col items-center gap-3">
          <button
            onClick={scrollToFunnel}
            className="inline-flex items-center gap-2 rounded-xl px-9 py-4.5 font-display text-[17px] font-bold transition-all hover:-translate-y-0.5"
            style={{
              background: "var(--lp-gold)",
              color: "var(--lp-navy)",
              boxShadow: "0 4px 20px rgba(240,180,41,0.35)",
            }}
          >
            Jetzt kostenlos starten
            <span className="text-lg">&rarr;</span>
          </button>
          <span className="text-[13px] text-white/40">
            Keine Anmeldung erforderlich
          </span>
        </div>
      </div>
    </section>
  );
}
