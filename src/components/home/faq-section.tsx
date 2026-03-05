"use client";

import { MainContainer } from "@/components/layout/main-container";
import { ChevronUp } from "lucide-react";
import { useState } from "react";

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FaqItem({ question, answer, isOpen, onToggle }: FaqItemProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium text-primary text-base md:text-lg pr-4">
          {question}
        </span>
        <ChevronUp
          className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-0" : "rotate-180"
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-5 md:px-6 pb-5 md:pb-6 text-muted-foreground leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
}

const faqs = [
  {
    question: "Ist unser Service kostenlos?",
    answer:
      "Ja, unser Service ist für Sie als Immobilienverkäufer zu 100% kostenlos. Wir finanzieren uns durch Partnerschaften mit Maklern, die bei erfolgreicher Vermittlung eine kleine Gebühr zahlen. Für Sie entstehen keine Kosten oder versteckten Gebühren.",
  },
  {
    question: "Wie funktioniert unser Service?",
    answer:
      "Geben Sie einfach Ihre Postleitzahl ein und beantworten Sie einige kurze Fragen zu Ihrer Immobilie. Wir analysieren dann über 20.000 Makler und empfehlen Ihnen die besten für Ihre Region und Immobilienart. Sie können die Profile vergleichen und den passenden Makler kontaktieren.",
  },
  {
    question: "Was ist ein Angebot und was beinhaltet es?",
    answer:
      "Ein Angebot von einem Makler beinhaltet in der Regel eine kostenlose Immobilienbewertung, eine Einschätzung der Verkaufsdauer, Informationen zur Provision und eine Marketingstrategie. Alle Angebote sind unverbindlich – Sie entscheiden selbst, ob Sie mit dem Makler zusammenarbeiten möchten.",
  },
  {
    question: "Bleiben meine Informationen privat?",
    answer:
      "Ja, Ihre Daten sind bei uns sicher. Wir geben Ihre Kontaktdaten nur an die Makler weiter, die Sie selbst auswählen. Wir verkaufen keine Daten an Dritte und halten uns streng an die DSGVO-Richtlinien.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <MainContainer>
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary leading-tight">
            Häufig gestellte Fragen
          </h2>
        </div>

        {/* FAQ items */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <FaqItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </MainContainer>
    </section>
  );
}
