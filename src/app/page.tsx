import { sohne, editorial } from "@/fonts/elite";
import { ElitePreloader } from "@/components/twin/ElitePreloader";
import { EliteMotion } from "@/components/twin/EliteMotion";
import { EliteTransition } from "@/components/twin/EliteTransition";
import { EliteNav } from "@/components/twin/EliteNav";
import { EliteHero } from "@/components/twin/EliteHero";
import { EliteCube } from "@/components/twin/EliteCube";
import { EliteListings } from "@/components/twin/EliteListings";
import { EliteSold } from "@/components/twin/EliteSold";
import { EliteAbout } from "@/components/twin/EliteAbout";
import { EliteTestimonials } from "@/components/twin/EliteTestimonials";
import { EliteFooter } from "@/components/twin/EliteFooter";
import { lines } from "@/lib/data";
import { cn } from "@/lib/utils";
import "./elite.css";

export const metadata = {
  title: "Elite Listings · Bilal Naqsh, Greater Vancouver Realtor",
  description:
    "Elite Listings is Bilal Naqsh, a Greater Vancouver realtor working residential, commercial and development. Buy smart, sell strong, in English, Farsi and Hindi.",
};

/**
 * The Elite Listings home: a scroll-scrubbed film of Bilal walking up the terrace to a thumbs-up, with a split
 * "Buy smart." / "Sell strong." headline, then the "which one are you?" router into the three lines, his
 * featured work, and the proof and about blocks.
 */
export default function Home() {
  // Homepage composition: preloader + motion backbone, then the scroll narrative.
  return (
    <main className={cn(sohne.variable, editorial.variable, "elite")}>
      <ElitePreloader />
      <EliteMotion />
      <EliteTransition />
      <EliteNav />
      <EliteHero />
      <EliteCube lines={lines} />
      <EliteListings />
      <EliteSold />
      <EliteAbout />
      <EliteTestimonials />
      <EliteFooter />
    </main>
  );
}
