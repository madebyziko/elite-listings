import type { Metadata } from "next";
import "./globals.css";
import { LenisProvider } from "@/components/motion/LenisProvider";

// Fonts load per direction (src/fonts/*), so a page only ships the families it uses.

export const metadata: Metadata = {
  title: "Elite Listings · Bilal Naqsh, Vancouver REALTOR®",
  description:
    "Residential, commercial and development real estate across Greater Vancouver with Bilal Naqsh, Real Estate Advisor on the Vancouver Elite Team at Coldwell Banker Prestige Realty. English, Farsi, Hindi.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
