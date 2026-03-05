import { MainContainer } from "@/components/layout/main-container";
import { useMaklerFunnel } from "@/components/funnel/makler/makler-funnel-context";
import { Section } from "@/components/ui/typography";

interface HeroSectionProps {
  locationName: string;
  maklerLabel: string;
}

export function HeroSection({ locationName, maklerLabel }: HeroSectionProps) {
  const { data } = useMaklerFunnel();

  const hideSubtitleOnMobile = data.step >= 1;

  return (
    <Section className="bg-gray-50">
      <MainContainer>
        <div className="mx-auto max-w-4xl space-y-6 text-center">
          {/* H1 with colored parts */}
          <h1
            className={
              [
                "text-2xl font-bold leading-tight md:text-4xl",
                hideSubtitleOnMobile ? "mb-0" : "mb-2"
              ].join(" ")
            }
          >
            Welcher {maklerLabel} in{" "}
            <span className="text-primary">{locationName}</span>{" "}
            erzielt den{" "}
            <span className="text-accent">höchsten Preis</span>{" "}
            für Ihre Immobilie?
          </h1>

          {/* Subheading - hidden on mobile from step 1 */}
          <p className={`text-base text-muted-foreground md:text-lg ${hideSubtitleOnMobile ? "hidden md:block" : ""}`}>
            Kostenlose Empfehlung in 2 Minuten – basierend auf echten
            Verkaufsergebnissen.
          </p>
        </div>
      </MainContainer>
      </Section>
  );
}
