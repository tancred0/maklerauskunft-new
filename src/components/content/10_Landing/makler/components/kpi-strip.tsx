import { MainContainer } from "@/components/layout/main-container";
import { Clock, Users, Building2 } from "lucide-react";
import type { CityConfig } from "../config";

interface KpiStripProps {
  config: CityConfig;
  locationName: string;
}

export function KpiStrip({ config, locationName }: KpiStripProps) {
  const kpis = [
    {
      icon: Building2,
      value: "20.000+",
      label: "Makler",
    },
    {
      icon: Users,
      value: config.verkaeuferVermittelt,
      label: `Verkäufer in ${locationName} vermittelt`,
    },
    {
      icon: Clock,
      value: "2 Min.",
      label: "bis zur Empfehlung",
    },
  ];

  return (
    <section className="bg-gradient-to-r from-primary to-primary/80 py-8">
      <MainContainer>
        <div className="grid grid-cols-3 gap-4 md:gap-8">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="flex flex-col items-center gap-1.5 text-center"
            >
              <kpi.icon className="size-6 text-white/90" />
              <span className="text-2xl font-bold text-white">{kpi.value}</span>
              <span className="text-sm text-white/80">{kpi.label}</span>
            </div>
          ))}
        </div>
      </MainContainer>
    </section>
  );
}
