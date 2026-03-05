import { MainContainer } from "@/components/layout/main-container";
import { UserCheck, Award, Handshake, Star, Users, MapPin } from "lucide-react";
import type { ReactNode } from "react";

interface QualityCardProps {
  icon: ReactNode;
  text: string;
}

function QualityCard({ icon, text }: QualityCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
      <div className="mb-4">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <p className="text-primary font-medium leading-relaxed">{text}</p>
    </div>
  );
}

const qualities = [
  {
    icon: <UserCheck className="w-6 h-6 text-primary" />,
    text: "Qualifizierte Makler, die zu den besten 5% in ihren Märkten gehören",
  },
  {
    icon: <Award className="w-6 h-6 text-primary" />,
    text: "Lizenzierte Makler mit langjähriger Erfahrung",
  },
  {
    icon: <Handshake className="w-6 h-6 text-primary" />,
    text: "Experten-Verhandler, die Ihnen das bestmögliche Angebot sichern",
  },
  {
    icon: <Star className="w-6 h-6 text-primary" />,
    text: "Hoch bewertet auf Google und anderen Plattformen",
  },
  {
    icon: <Users className="w-6 h-6 text-primary" />,
    text: "In der Lage, erstklassigen Service zu wettbewerbsfähigen Preisen anzubieten",
  },
  {
    icon: <MapPin className="w-6 h-6 text-primary" />,
    text: "Lokale Marktexperten mit Erfahrung in Ihrer Nachbarschaft",
  },
];

export function PartnerQualitiesSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <MainContainer>
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary leading-tight">
            Alle unsere Partner-Makler sind
          </h2>
        </div>

        {/* Quality cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {qualities.map((quality) => (
            <QualityCard
              key={quality.text}
              icon={quality.icon}
              text={quality.text}
            />
          ))}
        </div>
      </MainContainer>
    </section>
  );
}
