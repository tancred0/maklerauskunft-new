import type { MarketStat } from "../config";

interface MarketContextProps {
  stats: MarketStat[];
  locationName: string;
}

export function MarketContext({ stats, locationName }: MarketContextProps) {
  return (
    <section
      className="border-y py-11"
      style={{
        background: "linear-gradient(135deg, #f8faff 0%, #eef2ff 100%)",
        borderColor: "#dde4ff",
      }}
    >
      <div className="mx-auto max-w-3xl px-4 md:px-10">
        <div className="mb-2 text-xs font-semibold uppercase tracking-[1.5px] text-[var(--lp-blue)]">
          Immobilienmarkt {locationName} 2026
        </div>
        <h2 className="mb-2 font-display text-[clamp(22px,4vw,32px)] font-extrabold leading-[1.2] text-[var(--lp-navy)]">
          Der Markt ist aktiv –
          <br className="hidden sm:block" />
          der richtige Makler macht den Unterschied
        </h2>
        <p className="mb-6 text-sm text-[var(--lp-gray)]">
          Mit einem erfahrenen Makler erzielen Verkäufer in {locationName} im Schnitt deutlich bessere Ergebnisse als ohne Vermittlung.
        </p>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl bg-white p-4.5 text-center shadow-[0_4px_24px_rgba(13,27,42,0.10)]"
            >
              <div className="mb-1 font-display text-[22px] font-extrabold leading-none text-[var(--lp-blue)]">
                {stat.value}
              </div>
              <div className="text-xs leading-snug text-[var(--lp-gray)]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 text-center text-xs text-[var(--lp-gray)]">
          * Basierend auf internen Vermittlungsdaten 2024–2025
        </p>
      </div>
    </section>
  );
}
