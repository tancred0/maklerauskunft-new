import type { CityConfig } from "./types";

export const berlinConfig: CityConfig = {
  verkaeuferVermittelt: "800+",
  marketStats: [
    {
      value: "+14%",
      label: "höherer Verkaufspreis",
      description: "erzielen Berliner Verkäufer mit professionellem Makler im Schnitt",
    },
    {
      value: "4.850 €/m²",
      label: "Ø Quadratmeterpreis",
      description: "aktueller Durchschnitt für Eigentumswohnungen in Berlin",
    },
    {
      value: "2 Min.",
      label: "bis zur Empfehlung",
      description: "für Ihre persönliche Maklerempfehlung in Berlin",
    },
  ],
  featuredTestimonial: {
    quote:
      "Ich habe 38.000 € mehr bekommen als meine ursprüngliche Einschätzung. Der vermittelte Makler kannte den Berliner Markt perfekt und hat innerhalb von 3 Wochen den idealen Käufer gefunden.",
    highlight: "38.000 € mehr bekommen",
    name: "Petra B.",
    location: "Berlin-Charlottenburg",
    propertyType: "Eigentumswohnung",
    resultAmount: "+38.000 €",
    resultDays: "19 Tage",
  },
  testimonials: [
    {
      name: "Markus H.",
      location: "Berlin-Mitte",
      rating: 5,
      propertyType: "Wohnung",
      review:
        "Schnelle und professionelle Vermittlung. Der Makler hat meine Wohnung am Prenzlauer Berg innerhalb von 4 Wochen über dem Angebotspreis verkauft.",
    },
    {
      name: "Jan R.",
      location: "Berlin-Prenzlauer Berg",
      rating: 5,
      propertyType: "Mehrfamilienhaus",
      review:
        "Sehr zufrieden mit dem Service. Drei qualifizierte Maklervorschläge erhalten und den perfekten Partner für mein Mehrfamilienhaus gefunden.",
    },
    {
      name: "Sandra K.",
      location: "Berlin-Kreuzberg",
      rating: 5,
      propertyType: "Wohnung",
      review:
        "Als Erstkäuferin war ich unsicher. Der vermittelte Makler hat mich durch den gesamten Prozess begleitet und meine Traumwohnung gefunden.",
    },
  ],
};
