import { MainContainer } from "@/components/layout/main-container";
import { StarRating } from "./star-rating";
import { ReviewCard } from "./review-card";

const reviews = [
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
    location: "Berlin",
    rating: 5,
    propertyType: "Einfamilienhaus",
    review:
      "Als Käufer endlich einen Makler gefunden, der verstanden hat, was ich suche. Keine Massenbesichtigungen mehr, sondern gezielte Vorschläge. Nach 3 Monaten hatte ich mein Traumhaus.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <MainContainer>
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16 max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary leading-tight mb-8">
            Lesen Sie Bewertungen von Tausenden zufriedener Hausbesitzer, die unseren Service genutzt haben
          </h2>

          {/* Overall rating */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-3">
              <StarRating rating={4.8} size="lg" />
              <span className="text-3xl md:text-4xl font-bold text-primary">4.8/5</span>
            </div>
            <p className="text-muted-foreground">
              Durchschnitt von 2k+ Kundenbewertungen
            </p>
          </div>
        </div>

        {/* Review cards grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {reviews.map((review) => (
            <ReviewCard
              key={review.name}
              name={review.name}
              location={review.location}
              rating={review.rating}
              review={review.review}
              propertyType={review.propertyType}
            />
          ))}
        </div>
      </MainContainer>
    </section>
  );
}
