import { MainContainer } from "@/components/layout/main-container";
import { FileText, Star, Target, UserCheck, Heart } from "lucide-react";
import Image from "next/image";
import laptopHandImage from "@/images/main/stock/laptop-hand.png";
import type { ReactNode } from "react";

interface BenefitItemProps {
  icon: ReactNode;
  title: string;
  description: string;
}

function BenefitItem({ icon, title, description }: BenefitItemProps) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-primary mb-1">{title}</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

const benefits = [
  {
    icon: <FileText className="w-5 h-5 text-primary" />,
    title: "Provisions-Transparenz",
    description: "ermöglicht Ihnen eine fundierte Entscheidung",
  },
  {
    icon: <Star className="w-5 h-5 text-primary" />,
    title: "Echte Bewertungen und Rezensionen",
    description: "heben frühere Kundenerfahrungen hervor",
  },
  {
    icon: <Target className="w-5 h-5 text-primary" />,
    title: "Klare Angebote und Spezialisierungen",
    description: "ermöglichen es Ihnen, Ihre Wahl auf Ihre Vision abzustimmen",
  },
  {
    icon: <UserCheck className="w-5 h-5 text-primary" />,
    title: "Makler-Erfahrung",
    description: "befähigt Sie, den Experten zu finden, den Sie brauchen",
  },
  {
    icon: <Heart className="w-5 h-5 text-primary" />,
    title: "Persönliche Vorstellungen",
    description: "helfen Ihnen, sich mit dem richtigen Makler zu verbinden",
  },
];

export function CompareSection() {
  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <MainContainer>
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary leading-tight mb-4">
            Prüfen Sie Angebote und wählen Sie den richtigen Makler, selbstbewusst
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Deutsche Maklerauskunft bietet kostenlose Angebote mit allen Informationen, die Sie benötigen, um den Makler auszuwählen, der Ihnen hilft, zum Höchstpreis zu verkaufen.
          </p>
        </div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Image */}
          <div className="relative">
            <div className="relative aspect-[3/2] rounded-2xl overflow-hidden">
              <Image
                src={laptopHandImage}
                alt="Person arbeitet am Laptop"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right: Benefits list */}
          <div className="space-y-6 md:space-y-8">
            {benefits.map((benefit) => (
              <BenefitItem
                key={benefit.title}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
              />
            ))}
          </div>
        </div>
      </MainContainer>
    </section>
  );
}
