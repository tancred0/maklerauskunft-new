import { MainContainer } from "@/components/layout/main-container";
import { ClipboardList, Star, Rocket } from "lucide-react";
import Image from "next/image";
import handshakeImage from "@/images/main/stock/handshake.png";
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
    icon: <ClipboardList className="w-5 h-5 text-primary" />,
    title: "Vereinfachen Sie den Verkaufsprozess",
    description:
      "Ein Makler kümmert sich um alles – von der Inszenierung und Vermarktung bis hin zu Verhandlungen und Papierkram – damit Sie es nicht tun müssen.",
  },
  {
    icon: <Star className="w-5 h-5 text-primary" />,
    title: "Maximieren Sie den Wert Ihres Hauses",
    description:
      "Arbeiten Sie mit einem Makler zusammen, um Ihr Haus richtig zu bewerten, Käufer anzuziehen und das bestmögliche Angebot zu erhalten.",
  },
  {
    icon: <Rocket className="w-5 h-5 text-primary" />,
    title: "Schneller verkaufen mit Expertenberatung",
    description:
      "Makler kennen den Markt und nutzen bewährte Strategien, um die Sichtbarkeit zu maximieren und die richtige Zielgruppe anzuziehen.",
  },
];

export function WhyBrokerSection() {
  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <MainContainer>
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary leading-tight">
            Warum mit einem Makler arbeiten?
          </h2>
        </div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Image */}
          <div className="relative">
            <div className="relative aspect-[3/2] rounded-2xl overflow-hidden">
              <Image
                src={handshakeImage}
                alt="Handschlag zwischen Makler und Kunde"
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
