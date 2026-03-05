"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export function StickyMobileCta() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 400px (past the hero section)
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToFunnel = () => {
    const funnelElement = document.getElementById("funnel");
    if (funnelElement) {
      funnelElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white p-4 shadow-lg md:hidden">
      <Button
        variant="default"
        size="lg"
        onClick={scrollToFunnel}
        className="w-full gap-2"
      >
        Jetzt Makler finden
        <ArrowRight className="size-5" />
      </Button>
    </div>
  );
}
