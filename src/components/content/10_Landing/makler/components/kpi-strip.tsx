import type { CityConfig } from "../config";

interface KpiStripProps {
  config: CityConfig;
  locationName: string;
}

export function KpiStrip({ config, locationName }: KpiStripProps) {
  const kpis = [
    { value: "20.000+", label: "geprüfte Makler\nin Deutschland" },
    { value: config.verkaeuferVermittelt, label: `Verkäufer in ${locationName}\nerfolgreich vermittelt` },
    { value: "2 Min.", label: "Ø Zeit bis zur\nersten Empfehlung" },
    { value: `${config.rating}★`, label: `Ø Bewertung\naus ${config.reviewCount} Reviews` },
  ];

  return (
    <section
      className="border-b py-7"
      style={{ background: "var(--lp-off-white)", borderColor: "var(--lp-gray-light)" }}
    >
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-around gap-4 px-4 md:px-10">
        {kpis.map((kpi, i) => (
          <div key={kpi.label} className="flex items-center gap-4">
            <div className="text-center">
              <div className="font-display text-[26px] font-extrabold leading-none text-[var(--lp-navy)]">
                {kpi.value}
              </div>
              <div className="mt-1 whitespace-pre-line text-xs text-[var(--lp-gray)]">
                {kpi.label}
              </div>
            </div>
            {i < kpis.length - 1 && (
              <div
                className="hidden h-10 w-px md:block"
                style={{ background: "var(--lp-gray-light)" }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
