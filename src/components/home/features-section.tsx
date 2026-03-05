import { FeatureCard } from "./feature-card";
import { MainContainer } from "@/components/layout/main-container";
import { Award, BadgeCheck, Clock } from "lucide-react";

const features = [
  {
    icon: <Award className="w-10 h-10 text-primary" strokeWidth={1.5} />,
    title: "Nur die besten Makler",
    description:
      "Wir analysieren mehr als 1 Millionen Bewertungen und Tausende Firmenprofile. So können wir ermitteln, welcher Makler für Ihre Bedürfnisse vor Ort am besten geeignet ist.",
  },
  {
    icon: <BadgeCheck className="w-10 h-10 text-primary" strokeWidth={1.5} />,
    title: "Kostenlos und unabhängig",
    description:
      "Unser Service ist 100% kostenlos, transparent und ohne Haken. Makler bezahlen nicht dafür, dass sie bei uns gelistet werden. So bekommen Sie den besten, objektiven Vergleich.",
  },
  {
    icon: <Clock className="w-10 h-10 text-primary" strokeWidth={1.5} />,
    title: "Sparen Sie Zeit und Ärger",
    description:
      "Statt selbst stundenlang zu recherchieren, erhalten Sie in wenigen Minuten eine Auswahl der besten Makler für Ihre Immobilie – passend zu Ihren Anforderungen.",
  },
];

export function FeaturesSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <MainContainer>
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary leading-tight">
            Arbeiten Sie nur mit Top-Maklern, die Immobilien schnell verkaufen
          </h2>
        </div>

        {/* Feature cards grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </MainContainer>
    </section>
  );
}
