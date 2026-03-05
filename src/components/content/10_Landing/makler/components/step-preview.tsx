export function StepPreview() {
  const steps = [
    { number: 1, label: "Immobilie beschreiben" },
    { number: 2, label: "Makler vergleichen" },
    { number: 3, label: "Sie entscheiden" },
  ];

  return (
    <div className="flex items-center justify-center gap-2 md:gap-4">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center gap-2 md:gap-4">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
              {step.number}
            </div>
            <span className="hidden text-sm font-medium text-primary md:inline">
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className="h-px w-4 bg-gray-300 md:w-8" />
          )}
        </div>
      ))}
    </div>
  );
}
