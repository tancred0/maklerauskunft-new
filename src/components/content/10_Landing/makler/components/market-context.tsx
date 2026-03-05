import { MainContainer } from "@/components/layout/main-container";
import { TrendingUp, Clock, BadgeCheck, type LucideIcon } from "lucide-react";
import type { MarketStat } from "../config";

const iconMap: LucideIcon[] = [TrendingUp, BadgeCheck, Clock];

interface MarketContextProps {
  stats: MarketStat[];
  locationName: string;
}

export function MarketContext({ stats, locationName }: MarketContextProps) {
  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <MainContainer>
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-4 text-center text-2xl font-bold text-primary md:text-3xl">
            Warum ein Makler in {locationName} den Unterschied macht
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
            Aktuelle Marktdaten zeigen: Mit dem richtigen Makler erzielen
            Verkäufer in {locationName} bessere Ergebnisse.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            {stats.map((stat, i) => {
              const Icon = iconMap[i % iconMap.length]!;
              return (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
                >
                  <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="size-6 text-primary" />
                  </div>
                  <div className="mb-1 text-3xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="mb-2 font-semibold text-primary">
                    {stat.label}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {stat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </MainContainer>
    </section>
  );
}
