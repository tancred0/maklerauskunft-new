import { Check } from "lucide-react";

export function MicroTrust() {
  const items = ["100% kostenlos", "Keine Anmeldung", "Unverbindlich"];

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
      {items.map((item) => (
        <div key={item} className="flex items-center gap-1.5 text-sm text-white/55">
          <Check className="size-4 text-[var(--lp-green)]" />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}
