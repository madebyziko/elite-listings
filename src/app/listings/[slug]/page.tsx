import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sohne, editorial } from "@/fonts/elite";
import { cn } from "@/lib/utils";
import { EliteMotion } from "@/components/twin/EliteMotion";
import { EliteTransition } from "@/components/twin/EliteTransition";
import { EliteNav } from "@/components/twin/EliteNav";
import { EliteButton } from "@/components/twin/EliteButton";
import { EliteGallery } from "@/components/twin/EliteGallery";
import { EliteTourCard } from "@/components/twin/EliteTourCard";
import { EliteMortgage } from "@/components/twin/EliteMortgage";
import { EliteBookDock } from "@/components/twin/EliteBookDock";
import { EliteFooter } from "@/components/twin/EliteFooter";
import { cad, listingBySlug, listingPhoto, listingTitle, listings, num } from "@/lib/listings";
import "../../elite.css";

export function generateStaticParams() {
  return listings.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const l = listingBySlug((await params).slug);
  if (!l) return {};
  return {
    title: `${listingTitle(l)} · ${cad.format(l.price)} · Elite Listings`,
    description: l.headline,
  };
}

/**
 * Listing detail, rebuilt in the elite system to the current /listings/155a-surrey layout: the header, the
 * photographs, the remarks and facts, the building and schools, a payment estimate, a sticky book-a-viewing
 * card, and the rest of his collection. The one action that follows you: book a viewing with Bilal.
 */
export default async function ListingPage({ params }: { params: Promise<{ slug: string }> }) {
  const l = listingBySlug((await params).slug);
  if (!l) notFound();
  const others = listings.filter((x) => x.slug !== l.slug);
  const meta = [
    `${l.beds} bd`,
    l.halfBaths ? `${l.baths} full, ${l.halfBaths} half ba` : `${l.baths} ba`,
    `${num.format(l.sqft)} sqft`,
    l.lot,
    `built ${l.yearBuilt}`,
  ].filter(Boolean);

  return (
    <main className={cn(sohne.variable, editorial.variable, "elite")}>
      <EliteMotion />
      <EliteTransition />
      <EliteNav />

      {/* Header */}
      <section className="ldh" data-ground="light" aria-labelledby="ld-title">
        <div className="ldh__wrap">
          <div className="ldh__top">
            <div>
              <p className="eh__tag" data-reveal="up"><span className="eh__mk" aria-hidden="true" />{l.type} in {l.neighbourhood}, {l.city}</p>
              <h1 className="ldh__hl" id="ld-title" data-reveal-01="lines" data-scroll>{l.unit ? `${l.unit} – ${l.address},` : `${l.address},`} <span className="em">{l.city}.</span></h1>
            </div>
            <div className="ldh__meta" data-reveal="up" data-reveal-delay="0.08">
              <p className="ldh__price">{cad.format(l.price)}</p>
              <p className="ldh__specs">{meta.join("  ·  ")}.</p>
              {l.openHouse && <p className="ldh__oh"><span className="ldh__ohmk" aria-hidden="true" />{l.openHouse.when}</p>}
            </div>
          </div>
        </div>
      </section>

      {/* Photographs */}
      <div className="ldgwrap"><EliteGallery l={l} /></div>

      {/* Body: article + sticky tour card */}
      <section className="ldb sec sec--cream" data-ground="light">
        <div className="ldb__grid">
          <article className="ldb__main">
            <p className="eh__tag" data-reveal="up"><span className="eh__mk" aria-hidden="true" />Overview</p>
            <h2 className="ldb__headline" data-reveal="up" data-reveal-delay="0.04">{l.headline}</h2>
            <p className="ldb__remarks" data-reveal="up" data-reveal-delay="0.08">{l.remarks}</p>

            <section className="ldb__block" aria-labelledby="details-title">
              <h3 className="ldb__blockhead" id="details-title">Property details</h3>
              <dl className="ldb__facts" data-reveal-group="up">
                {l.facts.map(([k, v]) => (
                  <div className="ldb__fact" data-reveal-item key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="ldb__mls">MLS&reg; {l.mls}</p>
            </section>

            {l.building && (
              <section className="ldb__block" aria-labelledby="building-title">
                <h3 className="ldb__blockhead" id="building-title">The building</h3>
                <p className="ldb__buildingname">{l.building.name}</p>
                <p className="ldb__buildingnote">{l.building.note}</p>
                <dl className="ldb__buildingfacts">
                  {l.building.facts.map(([k, v]) => (
                    <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
                  ))}
                </dl>
              </section>
            )}

            <section className="ldb__block" aria-labelledby="schools-title">
              <h3 className="ldb__blockhead" id="schools-title">Schools nearby</h3>
              <ul className="ldb__schools" data-reveal-group="up">
                {l.schools.map((s) => (
                  <li className="ldb__school" data-reveal-item key={s.name}>
                    <p className="ldb__schoolname">{s.name}</p>
                    <p className="ldb__schoolmeta">{s.kind}, {s.grades}, {s.distanceKm} km{s.catchment ? ", in catchment" : ""}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section className="ldb__block" aria-labelledby="mortgage-title">
              <h3 className="ldb__blockhead" id="mortgage-title">Mortgage estimate</h3>
              <p className="ldb__blocksub">Your down payment and rate, on this price. An estimate for planning, not a quote.</p>
              <EliteMortgage initialPrice={l.price} />
            </section>
          </article>

          <div className="ldb__aside">
            <EliteTourCard l={l} />
          </div>
        </div>
      </section>

      {/* Rest of the collection */}
      <section className="ldr sec sec--dark" data-ground="dark" aria-labelledby="ldr-title">
        <div className="ldr__head">
          <p className="eh__tag" data-reveal="up"><span className="eh__mk" aria-hidden="true" />Also on the market</p>
          <h2 className="eh__hl" id="ldr-title" data-reveal-01="lines" data-scroll>More with <span className="em">Bilal.</span></h2>
        </div>
        <div className="ldr__cards" data-reveal-group="up">
          {others.map((o) => (
            <a className="lx__card" data-reveal-item href={`/listings/${o.slug}`} key={o.slug}>
              <span className="lx__cardmedia">
                <img className="lx__cardimg" src={listingPhoto(o, 0)} alt={o.photoAlts?.[0] ?? listingTitle(o)} loading="lazy" decoding="async" />
                <img className="lx__cardimg2" src={listingPhoto(o, 2)} alt="" aria-hidden="true" loading="lazy" decoding="async" />
                <span className="lx__cardpill">{o.type}</span>
              </span>
              <span className="lx__cardfoot">
                <span className="lx__cardname">{listingTitle(o)}</span>
                <span className="lx__cardprice">{cad.format(o.price)}</span>
              </span>
              <span className="lx__cardspecs">{o.neighbourhood}, {o.city}<span aria-hidden="true"> · </span>{o.beds} bd<span aria-hidden="true"> · </span>{o.baths} ba<span aria-hidden="true"> · </span>{num.format(o.sqft)} sqft</span>
            </a>
          ))}
        </div>
        <div className="ldr__cta" data-reveal="up">
          <EliteButton href="/listings" variant="ghost">Browse all listings</EliteButton>
        </div>
      </section>

      <EliteBookDock />

      <EliteFooter />
    </main>
  );
}
