import "@/styles/globals.css";

import type { Metadata } from "next";
import { Inter, Montserrat, Syne, DM_Sans } from "next/font/google";
import { SiteHeader } from "@/components/navigation/site-header";
import UTMTracker from "@/components/tracking/UTMTracker";
import { FirstPageTracker } from "@/components/tracking/FirstPageTracker";
import { GoogleTagManager } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "Immobilienpreise Deutschland 2026",
  description: "Immobilienpreise und Quadratmeterpreise in Deutschland 2026",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800"]
});
const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "600", "700", "800"]
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500"],
  style: ["normal", "italic"]
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body className={`${inter.variable} ${montserrat.variable} ${syne.variable} ${dmSans.variable} font-sans`}>
        <GoogleTagManager gtmId="GTM-WMTC6K4G" />
        {/* <Script
          src="/rs.js"
          strategy="afterInteractive"
          type="text/javascript"
        /> */}
        <FirstPageTracker />
        <UTMTracker />
        <SiteHeader />
        <main>{children}</main>

      </body>
    </html>
  );
}
