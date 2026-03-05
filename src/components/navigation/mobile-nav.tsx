"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { MobileNavTop } from "@/components/navigation/mobile-nav-top";
import { LpNavbar } from "@/components/navigation/lp-navbar";
import type { NavConfigInterface } from "@/config/nav";
import { usePathname } from "next/navigation";

export function MobileNav({
  navConfig,
  className,
  ...props
}: {
  navConfig: NavConfigInterface,
  className?: string;
}) {
  const pathname = usePathname();
  const path = pathname.split("/")[1] ?? "";
  const isLpRoute = path === "lp";

  // Show light LP navbar for /lp/ routes (no hamburger menu)
  if (isLpRoute) {
    return <LpNavbar variant="mobile" className={cn("flex sm:hidden", className)} />;
  }

  return (
    <nav className={cn("flex sm:hidden flex-col w-full bg-primary", className)} {...props}>
      <div className="w-full border-b">
        <MobileNavTop navConfig={navConfig} />
      </div>
    </nav>
  );
}