"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { listings, listingPhoto, listingTitle, cad } from "@/lib/listings";
import { EliteButton } from "./EliteButton";

/**
 * "Homes on the market" as a pinned split-scroll (adapted from aircenter.space, id 6211e7af). The section pins
 * a full-height split: the listing photograph on the left, a detail panel on the right (persistent head +
 * counter + segmented progress bar + the active listing's price / address / specs / View link). Scrolling
 * through the pinned runway advances the active listing; the left photo wipes in with a vertical clip reveal
 * (direction-aware — down wipes from the top, up from the bottom) and the right copy cross-fades. Reversible.
 * The head stays in the panel (never scrolls away). Mobile + reduced-motion get a plain stacked list.
 */
export function EliteListingScroll() {
  const N = listings.length;
  const runRef = useRef<HTMLDivElement | null>(null);
  const barsRef = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState(0);
  const [dir, setDir] = useState(1);
  const [staticMode, setStaticMode] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStaticMode(true);
      return;
    }
    const run = runRef.current;
    if (!run) return;
    const isMobile = () => window.matchMedia("(max-width: 767px)").matches;
    let curIdx = -1;

    const update = () => {
      if (isMobile()) return;
      const scrollable = run.offsetHeight - window.innerHeight;
      const passed = Math.min(Math.max(-run.getBoundingClientRect().top, 0), Math.max(scrollable, 1));
      const p = scrollable > 0 ? passed / scrollable : 0;
      const f = p * N;
      const idx = Math.min(Math.floor(f), N - 1);
      const seg = Math.min(Math.max(f - idx, 0), 1);
      barsRef.current.forEach((b, i) => {
        if (!b) return;
        const fill = i < idx ? 1 : i === idx ? seg : 0;
        b.style.transform = `scaleX(${fill})`;
      });
      if (idx !== curIdx) {
        setPrev(curIdx < 0 ? idx : curIdx);
        setDir(idx > curIdx ? 1 : -1);
        curIdx = idx;
        setActive(idx);
      }
    };

    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  }, [N]);

  return (
    <section
      className="lsc sec sec--dark"
      data-ground="dark"
      data-dir={dir}
      data-static={staticMode ? "true" : undefined}
      aria-labelledby="lsc-title"
      style={{ ["--n" as string]: N }}
    >
      <div className="lsc__run" ref={runRef}>
        <div className="lsc__pin">
          <div className="lsc__grid">
            <div className="lsc__media">
              {listings.map((x, i) => (
                <figure className={`lsc__shot${i === active ? " is-on" : ""}${i === prev && i !== active ? " is-prev" : ""}`} key={x.slug} aria-hidden={i !== active}>
                  <img src={listingPhoto(x, 0)} alt={x.photoAlts?.[0] ?? listingTitle(x)} loading="lazy" decoding="async" />
                  {x.openHouse && <span className="lsc__flag">{x.openHouse.label}</span>}
                </figure>
              ))}
            </div>

            <div className="lsc__panel">
              <div className="lsc__ptop">
                <div className="lsc__topbar">
                  <p className="eh__tag"><span className="eh__mk" aria-hidden="true" />Listings</p>
                  <a className="lsc__all" href="/listings">View all <span className="arw" aria-hidden="true">&rarr;</span></a>
                </div>
                <h2 className="eh__hl" id="lsc-title" data-reveal-01="lines" data-scroll>Homes on the <span className="em">market.</span></h2>
                <div className="lsc__meter">
                  <span className="lsc__num" aria-hidden="true">{String(active + 1).padStart(2, "0")}</span>
                  <span className="lsc__tot" aria-hidden="true">/ {String(N).padStart(2, "0")}</span>
                  <div className="lsc__bars" aria-hidden="true">
                    {listings.map((x, i) => (
                      <span className="lsc__bar" key={x.slug}><i ref={(el) => { barsRef.current[i] = el; }} /></span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lsc__cards">
                {listings.map((x, i) => (
                  <article className={`lsc__card${i === active ? " is-on" : ""}`} key={x.slug} aria-hidden={i !== active}>
                    <p className="lsc__eyebrow">{x.type}<span aria-hidden="true"> · </span>{x.neighbourhood}, {x.city}</p>
                    <p className="lsc__price">{cad.format(x.price)}</p>
                    <h3 className="lsc__addr">{listingTitle(x)}</h3>
                    <p className="lsc__specs">{x.beds} bd<span aria-hidden="true"> · </span>{x.baths} ba<span aria-hidden="true"> · </span>{x.sqft.toLocaleString()} sqft</p>
                    <EliteButton href={`/listings/${x.slug}`} variant="primary" className="lsc__cta" tabIndex={i === active ? 0 : -1}>View this listing</EliteButton>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / reduced-motion fallback: a plain stacked list */}
      <ul className="lsc__stack">
        <li className="lsc__stackhead">
          <p className="eh__tag"><span className="eh__mk" aria-hidden="true" />Listings</p>
          <h2 className="eh__hl">Homes on the <span className="em">market.</span></h2>
        </li>
        {listings.map((x) => (
          <li className="lsc__scard" key={x.slug}>
            <a href={`/listings/${x.slug}`}>
              <span className="lsc__smedia">
                <img src={listingPhoto(x, 0)} alt={x.photoAlts?.[0] ?? listingTitle(x)} loading="lazy" decoding="async" />
                {x.openHouse && <span className="lsc__flag">{x.openHouse.label}</span>}
              </span>
              <span className="lsc__price">{cad.format(x.price)}</span>
              <span className="lsc__addr">{listingTitle(x)}</span>
              <span className="lsc__specs">{x.type}<span aria-hidden="true"> · </span>{x.beds} bd<span aria-hidden="true"> · </span>{x.baths} ba<span aria-hidden="true"> · </span>{x.sqft.toLocaleString()} sqft</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
