"use client";

import { useMemo, useState } from "react";
import { listings, listingPhoto, listingTitle, cad, num, commercialListings, type Listing, type CommercialListing } from "@/lib/listings";
import { EliteButton } from "./EliteButton";

/**
 * The /listings browser, adapted from TrueKind /products (Details id Y0VPNY…): a pinned left filter rail
 * beside line-labelled rows on the right. Residential cards carry a photo and crossfade to a second on hover;
 * commercial listings (businesses for sale, no downloaded photos, some addresses under a confidentiality
 * agreement) render as text-forward cards that drive to contact. Development has no public sites, so it keeps
 * an honest invitation. Price / type / beds filter the residential grid, client-side.
 * NOTE: this is the standalone listings PAGE component. The home's "Featured" section is EliteListings.
 */
type LineKey = "residential" | "commercial" | "development";

const LINES: { key: LineKey; label: string; lead: string; empty?: string; cta: string }[] = [
  { key: "residential", label: "Residential", lead: "Homes on the market", cta: "Book a call with Bilal" },
  { key: "commercial", label: "Commercial", lead: "Businesses for sale", cta: "Discuss a deal, confidentially" },
  {
    key: "development",
    label: "Development",
    lead: "Land and sites",
    empty: "Development sites are shared on request, once the numbers are worth your time. Tell Bilal what you are working on and he will send what fits.",
    cta: "Send me the site",
  },
];

const PRICE_BANDS = [
  { key: "any", label: "Any price", test: () => true },
  { key: "u1m", label: "Under $1M", test: (p: number) => p < 1_000_000 },
  { key: "1to2", label: "$1M – $2M", test: (p: number) => p >= 1_000_000 && p < 2_000_000 },
  { key: "2plus", label: "$2M and up", test: (p: number) => p >= 2_000_000 },
];
const TYPES = ["Any type", "House", "Townhouse", "Condo"] as const;
const BEDS = [
  { key: "any", label: "Any beds", min: 0 },
  { key: "2", label: "2+", min: 2 },
  { key: "3", label: "3+", min: 3 },
  { key: "4", label: "4+", min: 4 },
];

function HomeCard({ l }: { l: Listing }) {
  return (
    <a className="lx__card" href={`/listings/${l.slug}`}>
      <span className="lx__cardmedia">
        <img className="lx__cardimg" src={listingPhoto(l, 0)} alt={l.photoAlts?.[0] ?? listingTitle(l)} loading="lazy" decoding="async" />
        <img className="lx__cardimg2" src={listingPhoto(l, 2)} alt="" aria-hidden="true" loading="lazy" decoding="async" />
        <span className="lx__cardpill">{l.type}</span>
        {l.openHouse && <span className="lx__cardflag">{l.openHouse.label}</span>}
      </span>
      <span className="lx__cardfoot">
        <span className="lx__cardname">{listingTitle(l)}</span>
        <span className="lx__cardprice">{cad.format(l.price)}</span>
      </span>
      <span className="lx__cardspecs">
        {l.neighbourhood}, {l.city}<span aria-hidden="true"> · </span>{l.beds} bd<span aria-hidden="true"> · </span>{l.baths} ba<span aria-hidden="true"> · </span>{num.format(l.sqft)} sqft
      </span>
    </a>
  );
}

function CommercialCard({ l }: { l: CommercialListing }) {
  const meta = [l.seats ? `${l.seats} seats` : null, l.sqft ? `${num.format(l.sqft)} sqft` : null, `MLS® ${l.mls}`].filter(Boolean).join("  ·  ");
  return (
    <article className="lx__ccard">
      <span className="lx__cardmedia">
        <img className="lx__cardimg" src={`/images/listings/${l.slug}/00.jpg`} alt={`${l.kind} for sale in ${l.area}`} loading="lazy" decoding="async" />
        <span className="lx__cardpill">{l.kind}</span>
      </span>
      <div className="lx__cbody">
        <div className="lx__ctop">
          <h3 className="lx__cname">{l.address ?? l.area}</h3>
          <span className="lx__cprice">{cad.format(l.price)}</span>
        </div>
        <p className="lx__csub">{l.address ? l.area : "Address on a confidentiality agreement"}</p>
        <p className="lx__cnote">{l.note}</p>
        <p className="lx__cmeta">{meta}</p>
        <div className="lx__cactions">
          <EliteButton href="/contact" variant="primary" className="lx__cbtn">Enquire</EliteButton>
          <a className="lx__crew" href={l.rew} target="_blank" rel="noreferrer">View on Realtylink <span className="arw" aria-hidden="true">&#8599;</span></a>
        </div>
      </div>
    </article>
  );
}

export function EliteListingsBrowser() {
  const [band, setBand] = useState("any");
  const [type, setType] = useState<string>("Any type");
  const [beds, setBeds] = useState("any");

  const priceTest = PRICE_BANDS.find((b) => b.key === band)!.test;
  const bedMin = BEDS.find((b) => b.key === beds)!.min;

  const filteredResidential = useMemo(
    () => listings.filter((l) => priceTest(l.price) && (type === "Any type" || l.type === type) && l.beds >= bedMin),
    [band, type, beds], // eslint-disable-line react-hooks/exhaustive-deps
  );

  const reset = () => { setBand("any"); setType("Any type"); setBeds("any"); };
  const anyFilter = band !== "any" || type !== "Any type" || beds !== "any";

  const counts: Record<LineKey, number> = {
    residential: filteredResidential.length,
    commercial: commercialListings.length,
    development: 0,
  };

  return (
    <section className="lx sec sec--cream" data-ground="light" aria-label="Listings">
      <div className="lx__grid">
        {/* Left: pinned filters */}
        <aside className="lx__filters" aria-label="Filter listings">
          <div className="lx__filtersticky">
            <p className="lx__ftitle">Filters</p>

            <div className="lx__group">
              <p className="lx__glabel">Lines</p>
              <ul className="lx__lines">
                {LINES.map((ln) => (
                  <li key={ln.key}><a href={`#line-${ln.key}`}>{ln.label}</a></li>
                ))}
              </ul>
            </div>

            <div className="lx__group">
              <p className="lx__glabel">Price</p>
              <div className="lx__chips">
                {PRICE_BANDS.map((b) => (
                  <button key={b.key} type="button" className={`lx__chip${band === b.key ? " is-on" : ""}`} aria-pressed={band === b.key} onClick={() => setBand(b.key)}>{b.label}</button>
                ))}
              </div>
            </div>

            <div className="lx__group">
              <p className="lx__glabel">Home type</p>
              <div className="lx__chips">
                {TYPES.map((t) => (
                  <button key={t} type="button" className={`lx__chip${type === t ? " is-on" : ""}`} aria-pressed={type === t} onClick={() => setType(t)}>{t}</button>
                ))}
              </div>
            </div>

            <div className="lx__group">
              <p className="lx__glabel">Bedrooms</p>
              <div className="lx__chips">
                {BEDS.map((b) => (
                  <button key={b.key} type="button" className={`lx__chip${beds === b.key ? " is-on" : ""}`} aria-pressed={beds === b.key} onClick={() => setBeds(b.key)}>{b.label}</button>
                ))}
              </div>
            </div>

            {anyFilter && <button type="button" className="lx__reset" onClick={reset}>Clear filters</button>}
            <p className="lx__filternote">Home filters refine residential. Commercial is his full book of business.</p>
          </div>
        </aside>

        {/* Right: line rows */}
        <div className="lx__lines-col">
          {LINES.map((ln) => (
            <section className="lx__line" id={`line-${ln.key}`} key={ln.key} aria-labelledby={`line-${ln.key}-t`}>
              <div className="lx__linehead">
                <div>
                  <p className="lx__lineeyebrow">{ln.lead}</p>
                  <h2 className="lx__linetitle" id={`line-${ln.key}-t`}>{ln.label}<span className="em">.</span></h2>
                </div>
                {counts[ln.key] > 0 && <span className="lx__linecount">{counts[ln.key]} {counts[ln.key] === 1 ? "listing" : "listings"}</span>}
              </div>

              {ln.key === "residential" && (
                filteredResidential.length > 0 ? (
                  <div className="lx__cards">{filteredResidential.map((l) => <HomeCard l={l} key={l.slug} />)}</div>
                ) : (
                  <div className="lx__empty">
                    <p className="lx__emptytext">No homes match these filters right now. Clear them, or tell Bilal what you are after and he will send what fits.</p>
                    <button type="button" className="lx__reset lx__reset--inline" onClick={reset}>Clear filters</button>
                  </div>
                )
              )}

              {ln.key === "commercial" && (
                <div className="lx__ccards">{commercialListings.map((l) => <CommercialCard l={l} key={l.slug} />)}</div>
              )}

              {ln.key === "development" && (
                <div className="lx__empty">
                  <p className="lx__emptytext">{ln.empty}</p>
                  <EliteButton href="/contact" variant="primary">{ln.cta}</EliteButton>
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
