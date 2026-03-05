import type { CityConfig } from "./types";

export const hamburgConfig: CityConfig = {
  verkaeuferVermittelt: "450+",
  marketStats: [
    {
      value: "+11%",
      label: "höherer Verkaufspreis",
      description: "erzielen Hamburger Verkäufer mit professionellem Makler im Schnitt",
    },
    {
      value: "5.420 €/m²",
      label: "Ø Quadratmeterpreis",
      description: "aktueller Durchschnitt für Eigentumswohnungen in Hamburg",
    },
    {
      value: "2 Min.",
      label: "bis zur Empfehlung",
      description: "für Ihre persönliche Maklerempfehlung in Hamburg",
    },
  ],
  featuredTestimonial: {
    quote:
      "Nach nur 12 Tagen war meine Wohnung in Eimsbüttel verkauft – und das 25.000 € über dem erwarteten Preis. Der Makler kannte jeden Interessenten im Viertel.",
    highlight: "25.000 € über dem erwarteten Preis",
    name: "Thomas M.",
    location: "Hamburg-Eimsbüttel",
    propertyType: "Wohnung",
    resultAmount: "+25.000 €",
    resultDays: "12 Tage",
  },
  testimonials: [
    {
      name: "Katrin S.",
      location: "Hamburg-Altona",
      rating: 5,
      propertyType: "Wohnung",
      review:
        "Der Service hat mir viel Zeit gespart. Innerhalb von 24 Stunden hatte ich drei Maklervorschläge und konnte direkt vergleichen.",
    },
    {
      name: "Michael B.",
      location: "Hamburg-Winterhude",
      rating: 5,
      propertyType: "Einfamilienhaus",
      review:
        "Unser Haus in Winterhude wurde professionell vermarktet. Der Makler hat genau die richtigen Käufer angesprochen.",
    },
    {
      name: "Nina W.",
      location: "Hamburg-Eppendorf",
      rating: 5,
      propertyType: "Wohnung",
      review:
        "Kompetente Beratung und ein reibungsloser Verkauf. Kann den Service jedem Hamburger Immobilienbesitzer empfehlen.",
    },
  ],
};
