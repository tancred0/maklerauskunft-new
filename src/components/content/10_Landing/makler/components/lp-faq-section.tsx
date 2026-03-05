"use client";

import { useState } from "react";

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FaqItem({ question, answer, isOpen, onToggle }: FaqItemProps) {
  return (
    <div className="border-b border-[var(--lp-gray-light)] py-5 first:border-t">
      <button
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-3 text-left"
      >
        <span className="font-display text-[15px] font-bold text-[var(--lp-navy)]">
          {question}
        </span>
        <div
          className={`flex size-[22px] shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
            isOpen
              ? "rotate-45 bg-[var(--lp-blue)] text-white"
              : "bg-[var(--lp-off-white)] text-[var(--lp-blue)]"
          }`}
        >
          +
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? "mt-3 max-h-96" : "max-h-0"
        }`}
      >
        <p className="text-[14.5px] leading-[1.7] text-[#4a5568]">{answer}</p>
      </div>
    </div>
  );
}

const faqs = [
  {
    question: "Was kostet mich das?",
    answer:
      "Nichts. Wirklich nichts. Wir werden von Maklern bezahlt – aber nur dann, wenn Sie zufrieden sind und sich aktiv für einen entscheiden. Kein Erfolg = keine Gebühr für niemanden. Für Sie entstehen keinerlei Kosten oder versteckte Gebühren.",
  },
  {
    question: "Wie sicher sind meine Daten?",
    answer:
      "Ihre Daten sehen nur die Makler, die Sie aktiv auswählen – nicht vorher. Kein Spam, kein Datenverkauf an Dritte. DSGVO-konform seit Tag 1.",
  },
  {
    question: "Was, wenn mir keiner der Makler gefällt?",
    answer:
      "Dann sagen Sie einfach nein. Kein Vertrag, keine Verpflichtung. Wir zeigen Ihnen Alternativen oder Sie gehen ohne Begründung. Das ist Ihr gutes Recht – und wir respektieren das.",
  },
  {
    question: "Wie gut sind die empfohlenen Makler wirklich?",
    answer:
      "Wir analysieren Verkaufsergebnisse, Kundenbewertungen, Reaktionszeiten und lokale Marktkenntnisse. Nur die Top 15% unseres Netzwerks werden aktiv empfohlen – der Rest nicht.",
  },
  {
    question: "Wie funktioniert der Service genau?",
    answer:
      "Geben Sie Ihre Postleitzahl ein und beantworten Sie 2 kurze Fragen zu Ihrer Immobilie. Wir matchen Sie dann mit den besten Maklern für Ihre Region und Immobilienart. Sie vergleichen Profile und entscheiden – alles in unter 5 Minuten.",
  },
];

export function LpFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-14">
      <div className="mx-auto max-w-3xl px-4 md:px-10">
        <div className="mb-2 text-xs font-semibold uppercase tracking-[1.5px] text-[var(--lp-blue)]">
          Transparenz
        </div>
        <h2 className="mb-8 font-display text-[clamp(22px,4vw,32px)] font-extrabold leading-[1.2] text-[var(--lp-navy)]">
          Ihre Fragen – ehrliche Antworten
        </h2>

        <div>
          {faqs.map((faq, index) => (
            <FaqItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
