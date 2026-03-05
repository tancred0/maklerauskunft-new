"use client";

import { useEffect, useState } from "react";

export function StickyMobileCta() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToFunnel = () => {
    document.getElementById("funnel")?.scrollIntoView({ behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-between gap-3 border-t border-white/10 p-3.5 px-5 md:hidden"
      style={{ background: "var(--lp-navy)" }}
    >
      <div className="text-[13px] leading-snug text-white/70">
        <strong className="block text-sm text-white">Besten Makler finden</strong>
        Kostenlos &middot; In 2 Minuten
      </div>
      <button
        onClick={scrollToFunnel}
        className="shrink-0 rounded-lg px-5 py-3 font-display text-sm font-bold whitespace-nowrap"
        style={{
          background: "var(--lp-gold)",
          color: "var(--lp-navy)",
        }}
      >
        Jetzt starten &rarr;
      </button>
    </div>
  );
}
