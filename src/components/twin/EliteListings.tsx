"use client";

import { useEffect, useRef, useState } from "react";
import { listings, listingPhoto, listingTitle, cad } from "@/lib/listings";

/**
 * Featured Listings, adapted from the Hestia reference: a staggered cluster of listing thumbnails on the
 * left, and one large preview on the right that crossfades to whichever listing is hovered. Onto Hestia's
 * plain preview we add the listing's cover details, price + beds/baths + a "View listing" pill.
 */
export function EliteListings() {
  const [active, setActive] = useState(0);
  const [entered, setEntered] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { setEntered(true); io.disconnect(); } }),
      { threshold: 0.28 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const al = listings[active];

  return (
    <section ref={ref} className={`fl${entered ? " is-in" : ""}`} aria-labelledby="fl-title" data-ground="dark" data-wash="#F6F1E9">
      <div className="fl__head">
        <p className="fl__tag" data-reveal="up"><span className="fl__mk" aria-hidden="true" />Featured</p>
        <h2 className="fl__hl" id="fl-title" data-reveal="mask" data-reveal-delay="0.06"><span className="ln">On the market <span className="em">with Bilal.</span></span></h2>
      </div>

      <div className="fl__stage">
        <ul className="fl__thumbs" role="list" data-reveal-group="up">
          {listings.map((l, i) => (
            <li key={l.slug} data-reveal-item>
              <button
                className={`fl__thumb${i === active ? " is-on" : ""}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-label={`${listingTitle(l)}, ${cad.format(l.price)}`}
              >
                <img src={listingPhoto(l, 0)} alt="" loading="lazy" decoding="async" />
                <span className="fl__thumbcap">{l.neighbourhood}, {l.city}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="fl__preview" data-reveal="clip">
          {listings.map((l, i) => (
            <img
              key={l.slug}
              src={listingPhoto(l, 0)}
              alt={i === active ? (l.photoAlts?.[0] ?? listingTitle(l)) : ""}
              className={`fl__previmg${i === active ? " is-on" : ""}`}
              loading="lazy"
              decoding="async"
            />
          ))}
          <a className="fl__card" href={`/listings/${al.slug}`}>
            <div className="fl__cardhead">
              <span className="fl__price">{cad.format(al.price)}</span>
              <span className="fl__pill">View listing <span className="arw" aria-hidden="true">&rarr;</span></span>
            </div>
            <p className="fl__addr">{listingTitle(al)}</p>
            <p className="fl__specs">
              {al.type} <span>·</span> {al.beds} bd <span>·</span> {al.baths} ba <span>·</span> {al.sqft.toLocaleString()} sqft
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}
