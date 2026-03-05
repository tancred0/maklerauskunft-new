import { MainContainer } from "@/components/layout/main-container";
import { MapPin, Search, UserCheck } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: MapPin,
      step: 1,
      title: "PLZ eingeben & Immobilie beschreiben",
      description:
        "Geben Sie Ihre Postleitzahl ein und beantworten Sie einige kurze Fragen zu Ihrer Immobilie.",
    },
    {
      icon: Search,
      step: 2,
      title: "Wir analysieren 20.000+ Makler",
      description:
        "Unser System findet die besten Makler für Ihre Region und Immobilienart.",
    },
    {
      icon: UserCheck,
      step: 3,
      title: "Profile vergleichen – Sie entscheiden",
      description:
        "Vergleichen Sie die Empfehlungen und wählen Sie den Makler, der am besten zu Ihnen passt.",
    },
  ];

  return (
    <section className="bg-white py-16 md:py-24">
      <MainContainer>
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-2xl font-bold text-primary md:mb-16 md:text-3xl">
            So funktioniert&apos;s
          </h2>

          <div className="mx-auto w-fit rounded-3xl bg-slate-50 p-8 md:p-12">
            <div className="flex flex-col gap-8 md:gap-12">
              {steps.map((step) => (
                <div
                  key={step.step}
                  className="relative flex flex-col items-center gap-4 md:flex-row md:items-start md:gap-6"
                >
                  {/* Icon */}
                  <div className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-lg">
                    <step.icon className="size-5" />
                  </div>

                  {/* Content */}
                  <div className="text-center md:text-left">
                    <h3 className="text-lg font-semibold text-primary">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MainContainer>
    </section>
  );
}
