import { berlinConfig } from "./berlin";
import { genericConfig } from "./generic";
import { hamburgConfig } from "./hamburg";
import type { CityConfig } from "./types";

export function getCityConfig(cityName: string): CityConfig {
  const normalized = cityName.toLowerCase();
  if (normalized === "berlin") return berlinConfig;
  if (normalized === "hamburg") return hamburgConfig;
  return genericConfig;
}

export type { CityConfig, FeaturedTestimonial, MarketStat, Testimonial } from "./types";
