import type { Metadata } from "next";
import { sohne, editorial } from "@/fonts/elite";
import { cn } from "@/lib/utils";
import { EliteMotion } from "@/components/twin/EliteMotion";
import { EliteTransition } from "@/components/twin/EliteTransition";
import { EliteNav } from "@/components/twin/EliteNav";
import { EliteListingsBrowser } from "@/components/twin/EliteListingsBrowser";
import { EliteFooter } from "@/components/twin/EliteFooter";
import { brand } from "@/lib/data";
import { listings } from "@/lib/listings";
import "../elite.css";

export const metadata: Metadata = {
  title: "Listings · Elite Listings, Bilal Naqsh",
  description:
    "Bilal Naqsh's own listings across Greater Vancouver: residential homes on the market, with commercial and development shared on request. Browse and book a viewing.",
};

/**
 * /listings rebuilt in the elite system, adapted from TrueKind /products: an editorial hero over a browser
 * with a pinned filter rail and three line-labelled rows. His curated collection, never an MLS search.
 */
export default function ListingsPage() {
  return (
    <main className={cn(sohne.variable, editorial.variable, "elite")}>
      <EliteMotion />
      <EliteTransition />
      <EliteNav />

      <section className="lxh" data-ground="light" aria-labelledby="lxh-title">
        <div className="lxh__wrap">
          <p className="eh__tag" data-reveal="up"><span className="eh__mk" aria-hidden="true" />The collection</p>
          <h1 className="lxh__hl" id="lxh-title" data-reveal-01="lines" data-scroll>Browse his <span className="em">listings.</span></h1>
          <p className="lxh__sub" data-reveal="up" data-reveal-delay="0.08">
            A curated set, not an MLS&reg; search. {listings.length} homes on the market now across {brand.market}, with commercial and development shared on request.
          </p>
        </div>
      </section>

      <EliteListingsBrowser />

      <EliteFooter />
    </main>
  );
}
