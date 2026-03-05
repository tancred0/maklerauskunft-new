"use client";

import { MainContainer } from "@/components/layout/main-container";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Image from "next/image";
import houseImage from "@/images/main/stock/house.png";
import evernestLogo from "@/images/main/brokers/evernest.png";
import gbLogo from "@/images/main/brokers/gb.png";
import koenigskinderLogo from "@/images/main/brokers/koenigskinder.svg";

const benefits = [
  "100% kostenlos",
  "Dauert nur 2 Minuten",
  "Keine Verpflichtung",
];

export function HeroSection() {
  return (
    <>
      {/* Hero Section - Full width blue background */}
      <section className="relative bg-primary overflow-visible">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[#001a4d] opacity-90" />

        <MainContainer className="relative z-10">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 pt-6 md:pt-10 lg:pt-16 pb-0 md:pb-10">
            {/* Left: Title, subtitle, benefits, search form */}
            <div className="text-white space-y-3 md:space-y-5">
              <h1 className="text-2xl md:text-4xl lg:text-[2.75rem] font-bold leading-[1.15] tracking-tight">
                Die besten
                <br />
                Immobilienmakler
                <br />
                <span className="text-accent">für Ihren Hausverkauf</span>
              </h1>

              <p className="text-sm md:text-lg text-white/90 max-w-xl leading-relaxed">
                Wir vergleichen <span className="font-semibold text-white">20.000+ Makler</span> und finden
                den Besten für Ihren Verkauf – <span className="text-accent font-semibold">kostenlos & unverbindlich.</span>
              </p>

              {/* Benefits */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-6 md:gap-10">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-2 md:gap-3">
                    <div className="flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-full bg-white/15 border border-white/30">
                      <Check className="w-3 h-3 md:w-4 md:h-4 text-white" strokeWidth={3} />
                    </div>
                    <span className="text-sm md:text-base text-white/90">{benefit}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* Right: House image - positioned to overflow below */}
            <div className="relative hidden lg:block">
              <div className="absolute top-0 right-0 w-full h-[calc(100%+200px)]">
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <Image
                    src={houseImage}
                    alt="Haus zum Verkauf"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </MainContainer>

        {/* Search form - positioned at bottom of blue, overlapping into white */}
        <div className="relative z-20">
          <MainContainer>
            <div className="max-w-xl transform translate-y-1/2">
              <div className="flex flex-col sm:flex-row gap-0 rounded-xl overflow-hidden border-[3px] border-accent shadow-xl bg-white">
                <div className="flex-1 min-w-0">
                  <input
                    type="text"
                    placeholder="PLZ oder Ort"
                    className="w-full h-14 md:h-16 px-5 md:px-6 text-base md:text-lg bg-transparent text-primary placeholder:text-gray-400 outline-none"
                  />
                </div>
                <Button
                  variant="cta"
                  size="lg"
                  className="h-14 md:h-16 px-6 md:px-8 text-base md:text-lg font-semibold whitespace-nowrap rounded-none sm:rounded-r-lg"
                >
                  Makler finden
                </Button>
              </div>
            </div>
          </MainContainer>
        </div>
      </section>

      {/* White section below - house image overlaps into this area, partners here */}
      <section className="bg-white relative">
        <MainContainer>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 pt-20 md:pt-16 pb-8 md:pb-12">
            {/* Left: Partners */}
            <div>
              <p className="text-sm text-muted-foreground mb-3">Unsere Partner</p>
              <div className="flex flex-wrap items-center gap-6 md:gap-8">
                <Image
                  src={gbLogo}
                  alt="Grossmann & Berger"
                  height={32}
                  className="h-8 w-auto grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
                />
                <div className="bg-gray-900 rounded px-2.5 py-1.5">
                  <Image
                    src={evernestLogo}
                    alt="Evernest"
                    height={24}
                    className="h-6 w-auto"
                  />
                </div>
                <Image
                  src={koenigskinderLogo}
                  alt="Königskinder"
                  height={32}
                  className="h-8 w-auto grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
                />
              </div>
            </div>
            {/* Right: empty space for house image overflow */}
            <div className="hidden lg:block h-32"></div>
          </div>
        </MainContainer>
      </section>
    </>
  );
}
