"use client";

import { useEffect, useState } from "react";
import { brand } from "@/lib/data";
import { EliteButton } from "./EliteButton";

/**
 * Elite Listings nav, adapted from the Exo Ape reference: a minimal fixed bar (wordmark + Book a call + a
 * Menu toggle) that opens a fullscreen overlay. On the right, oversized links; on the left, a media panel
 * that crossfades to the hovered link's image (a line's work, or Bilal). Links flip to Cormorant italic on
 * hover (the Obys steal). The bar recolours dark over the cream sections below the hero.
 */
const NAV = [
  { label: "Home", href: "/", img: "/elite/hero-poster.jpg" },
  { label: "Residential", href: "/residential", img: "/elite/res-seq/f_024.webp" },
  { label: "Commercial", href: "/commercial", img: "/elite/com-seq/f_048.webp" },
  { label: "Development", href: "/development", img: "/elite/dev-potential-poster.jpg" },
  { label: "Listings", href: "/listings", img: "/images/listings/hedley-burnaby/00.jpg" },
  { label: "About", href: "/about", img: "/images/about-portrait.webp" },
  { label: "Contact", href: "/contact", img: "/images/contact-marina.webp" },
];

export function EliteNav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [light, setLight] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Recolour the bar to suit whichever section currently sits under it: dark text over cream (paper)
  // grounds, cream text over dark grounds. Reads each section's data-ground so it flips both ways.
  useEffect(() => {
    const line = 44;
    const read = () => {
      setScrolled(window.scrollY > 24);
      const sections = document.querySelectorAll<HTMLElement>("[data-ground]");
      let ground = "dark";
      // Panels overlap by a rounded lip (negative margins), so more than one can cross the line at a
      // boundary. Take the LAST match in DOM order: that is the panel painted on top under the bar.
      for (const s of sections) {
        const r = s.getBoundingClientRect();
        if (r.top <= line && r.bottom > line) ground = s.dataset.ground || "dark";
      }
      setLight(ground === "light");
    };
    read();
    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read);
    return () => { window.removeEventListener("scroll", read); window.removeEventListener("resize", read); };
  }, []);

  return (
    <>
      <header className={`enav${light ? " is-light" : ""}${open ? " is-open" : ""}${scrolled ? " is-scrolled" : ""}`}>
        <a className="enav__mark" href="/" aria-label="Elite Listings, home">Elite Listings</a>
        <div className="enav__right">
          <EliteButton href="/contact" variant="primary" className="enav__book">Book a call</EliteButton>
          <button
            className="enav__toggle"
            aria-expanded={open}
            aria-controls="enav-overlay"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="enav__toggle-label">{open ? "Close" : "Menu"}</span>
            <span className="enav__toggle-icon" aria-hidden="true"><i /><i /><i /></span>
          </button>
        </div>
      </header>

      <div id="enav-overlay" className={`enav-ov${open ? " is-open" : ""}`} aria-hidden={!open}>
        <div className="enav-ov__inner">
          <div className="enav-ov__media" aria-hidden="true">
            {NAV.map((n, i) => (
              <img key={n.label} src={n.img} alt="" className={i === active ? "is-on" : ""} loading="lazy" decoding="async" />
            ))}
          </div>
          <nav className="enav-ov__nav" aria-label="Primary">
            {NAV.map((n, i) => (
              <a
                key={n.label}
                href={n.href}
                className="enav-ov__link"
                style={{ transitionDelay: open ? `${0.14 + i * 0.06}s` : "0s" }}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                tabIndex={open ? 0 : -1}
              >
                <span className="d">{n.label}</span>
                <span className="i" aria-hidden="true">{n.label}</span>
              </a>
            ))}
          </nav>
        </div>
        <div className="enav-ov__foot">
          <a href={brand.phoneHref} tabIndex={open ? 0 : -1}>{brand.phone}</a>
          <a href={`mailto:${brand.email}`} tabIndex={open ? 0 : -1}>{brand.email}</a>
          <a href={`https://www.instagram.com/${brand.instagram}/`} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>Instagram</a>
        </div>
      </div>
    </>
  );
}
