export function HowItWorks() {
  const steps = [
    {
      step: 1,
      title: "PLZ eingeben & Immobilie beschreiben",
      description:
        "2 kurze Fragen zu Ihrer Immobilie – dauert unter 2 Minuten. Keine Anmeldung, kein Passwort.",
    },
    {
      step: 2,
      title: "Wir analysieren 20.000+ Makler",
      description:
        "Unser System gleicht Ihre Immobilie mit Verkaufsergebnissen, Bewertungen und lokaler Expertise ab. Nur die Top 15% werden empfohlen.",
    },
    {
      step: 3,
      title: "Profile vergleichen – Sie entscheiden",
      description:
        "Sie sehen 3 passende Makler mit echten Bewertungen und Verkaufsergebnissen. Kein Vertrag, kein Druck.",
    },
  ];

  return (
    <section className="py-14">
      <div className="mx-auto max-w-3xl px-4 md:px-10">
        <div className="mb-2 text-xs font-semibold uppercase tracking-[1.5px] text-[var(--lp-blue)]">
          So funktioniert es
        </div>
        <h2 className="mb-8 font-display text-[clamp(22px,4vw,32px)] font-extrabold leading-[1.2] text-[var(--lp-navy)]">
          In 3 Schritten zum besten Makler
        </h2>

        <div className="relative flex flex-col">
          {/* Vertical line */}
          <div
            className="absolute bottom-6 left-[19px] top-6 w-0.5"
            style={{ background: "var(--lp-gray-light)" }}
          />

          {steps.map((step) => (
            <div key={step.step} className="relative z-10 flex gap-5 py-5">
              <div
                className="flex size-10 shrink-0 items-center justify-center rounded-full font-display text-base font-extrabold text-white"
                style={{
                  background: "var(--lp-blue)",
                  boxShadow: "0 0 0 6px white, 0 0 0 7px var(--lp-gray-light)",
                }}
              >
                {step.step}
              </div>
              <div>
                <h3 className="mb-1 font-display text-base font-bold text-[var(--lp-navy)]">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--lp-gray)]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
