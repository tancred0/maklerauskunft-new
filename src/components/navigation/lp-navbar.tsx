"use client";

import { cn } from "@/lib/utils";
import { MainContainer } from "@/components/layout/main-container";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import brwLogo from "@/images/general/logo_short_white_font.svg";

interface LpNavbarProps {
  className?: string;
  variant?: "desktop" | "mobile";
}

export function LpNavbar({ className, variant = "desktop" }: LpNavbarProps) {
  if (variant === "mobile") {
    return (
      <nav
        className={cn(
          "flex w-full bg-primary border-b border-primary-foreground/10",
          className
        )}
      >
        <MainContainer className="flex w-full items-center justify-between py-2">
          <Link href="/">
            <Image
              src={brwLogo}
              alt="Logo Immobilienpreise Deutschland"
              height={44}
            />
          </Link>

          <div className="flex items-center gap-1.5">
            <Star className="size-4 fill-amber-400 text-amber-400" />
            <span className="text-xs text-primary-foreground font-semibold">
              4,8/5
            </span>
            <span className="text-xs text-primary-foreground">
            (2000+ Bewertungen)
            </span>
          </div>
        </MainContainer>
      </nav>
    );
  }

  return (
    <nav
      className={cn(
        "hidden sm:flex w-full bg-primary border-b border-primary-foreground/10",
        className
      )}
    >
      <MainContainer className="flex w-full items-center justify-between py-3">
        <Link href="/">
          <Image
            src={brwLogo}
            alt="Logo Immobilienpreise Deutschland"
            height={48}
          />
        </Link>

        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className="size-4 fill-amber-400 text-amber-400"
              />
            ))}
          </div>
          <span className="text-sm text-primary-foreground">
            <span className="font-semibold">4.8/5</span>
            <span className="text-primary-foreground/70"> aus 2.000+ Bewertungen</span>
          </span>
        </div>
      </MainContainer>
    </nav>
  );
}
