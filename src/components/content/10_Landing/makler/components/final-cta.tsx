import { MainContainer } from "@/components/layout/main-container";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface FinalCtaProps {
  locationName: string;
  maklerLabel: string;
}

export function FinalCta({ locationName, maklerLabel }: FinalCtaProps) {
  const scrollToFunnel = () => {
    const funnelElement = document.getElementById("funnel");
    if (funnelElement) {
      funnelElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-primary py-16 md:py-24">
      <MainContainer>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl lg:text-4xl">
            Jetzt den besten {maklerLabel} in {locationName} finden
          </h2>
          <p className="mb-8 text-lg text-white/80">
            Kostenlos, unverbindlich und in nur 2 Minuten.
          </p>
          <Button
            size="lg"
            onClick={scrollToFunnel}
            className="gap-2 bg-white text-primary hover:bg-white/90 font-semibold shadow-lg"
          >
            Jetzt starten
            <ArrowRight className="size-5" />
          </Button>
        </div>
      </MainContainer>
    </section>
  );
}
