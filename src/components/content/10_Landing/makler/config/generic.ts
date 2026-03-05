import type { CityConfig } from "./types";

export const genericConfig: CityConfig = {
  verkaeuferVermittelt: "5.000+",
  rating: "4.8",
  reviewCount: "2.347",
  marketStats: [
    {
      value: "+12%",
      label: "höherer Verkaufspreis",
      description: "im Durchschnitt mit professionellem Makler",
    },
    {
      value: "100%",
      label: "kostenlos",
      description: "für Immobilienverkäufer und -käufer",
    },
    {
      value: "2 Min.",
      label: "bis zur Empfehlung",
      description: "für Ihre persönliche Maklerempfehlung",
    },
  ],
  featuredTestimonial: {
    quote:
      "Der vermittelte Makler hat meine Immobilie 15% über der ursprünglichen Bewertung verkauft. Professionell, schnell und absolut empfehlenswert.",
    highlight: "15% über der ursprünglichen Bewertung",
    name: "Stefan L.",
    location: "Deutschland",
    propertyType: "Einfamilienhaus",
    resultAmount: "+15%",
    resultDays: "28 Tage",
  },
  testimonials: [
    {
      name: "Markus Hoffmann",
      location: "Stuttgart",
      rating: 5,
      propertyType: "Mehrfamilienhaus",
      review:
        "Innerhalb von 48 Stunden hatte ich 3 qualifizierte Maklerempfehlungen. Die Auswahl war übersichtlich und ich konnte schnell den passenden Makler für mein Mehrfamilienhaus finden.",
    },
    {
      name: "Petra Bergmann",
      location: "Düsseldorf",
      rating: 5,
      propertyType: "Wohnung",
      review:
        "Meine Eigentumswohnung wurde 12% über der ursprünglichen Bewertung verkauft. Der vermittelte Makler kannte den lokalen Markt perfekt und hat den richtigen Käufer gefunden.",
    },
    {
      name: "Jan Richter",
      location: "München",
      rating: 5,
      propertyType: "Einfamilienhaus",
      review:
        "Als Käufer endlich einen Makler gefunden, der verstanden hat, was ich suche. Keine Massenbesichtigungen mehr, sondern gezielte Vorschläge. Nach 3 Monaten hatte ich mein Traumhaus.",
    },
  ],
};
