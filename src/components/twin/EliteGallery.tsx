"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { listingPhoto, type Listing } from "@/lib/listings";

/**
 * Listing photographs, elite-styled (adapted from the ink Gallery): a desktop mosaic (one large frame + four
 * beside it) with "See all N photos", a swipeable row on phones, and a full lightbox (prev / next / swipe /
 * keyboard). Plain <img> to match the elite system. The first frame is the LCP.
 */
export function EliteGallery({ l }: { l: Listing }) {
  const [open, setOpen] = useState<number | null>(null);
  const all = Array.from({ length: l.photos }, (_, i) => i);

  return (
    <section className="ldg" aria-label="Photographs">
      <div className="ldg__mosaic">
        <button type="button" className="ldg__cell ldg__cell--lead" onClick={() => setOpen(0)} aria-label={`Open photo 1 of ${l.photos}`}>
          <img src={listingPhoto(l, 0)} alt={l.photoAlts[0]} loading="eager" fetchPriority="high" decoding="async" />
        </button>
        {[1, 2, 3, 4].map((i) => (
          <button type="button" key={i} className="ldg__cell" onClick={() => setOpen(i)} aria-label={`Open photo ${i + 1} of ${l.photos}`}>
            <img src={listingPhoto(l, i)} alt={l.photoAlts[i] ?? ""} loading="lazy" decoding="async" />
          </button>
        ))}
        <button type="button" className="ldg__all" onClick={() => setOpen(0)}>See all {l.photos} photos</button>
      </div>

      {/* Phone: swipe row */}
      <ul className="ldg__row" aria-label={`All ${l.photos} photographs, swipe`}>
        {all.map((i) => (
          <li key={i}>
            <button type="button" className="ldg__cell" onClick={() => setOpen(i)} aria-label={`Open photo ${i + 1} of ${l.photos}`}>
              <img src={listingPhoto(l, i)} alt={l.photoAlts[i] ?? ""} loading={i === 0 ? "eager" : "lazy"} fetchPriority={i === 0 ? "high" : undefined} decoding="async" />
            </button>
          </li>
        ))}
      </ul>

      {open !== null && <Lightbox l={l} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
    </section>
  );
}

function Lightbox({ l, index, onIndex, onClose }: { l: Listing; index: number; onIndex: (i: number) => void; onClose: () => void }) {
  const n = l.photos;
  const prev = useCallback(() => onIndex((index - 1 + n) % n), [index, n, onIndex]);
  const next = useCallback(() => onIndex((index + 1) % n), [index, n, onIndex]);
  const startX = useRef<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prevOverflow;
    };
  }, [onClose, prev, next]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${n}`}
      className="ldx"
      onPointerDown={(e) => (startX.current = e.clientX)}
      onPointerUp={(e) => {
        if (startX.current === null) return;
        const dx = e.clientX - startX.current;
        startX.current = null;
        if (dx > 50) prev();
        else if (dx < -50) next();
      }}
    >
      <div className="ldx__bar">
        <span className="ldx__count">{index + 1} / {n}</span>
        <button ref={closeRef} type="button" className="ldx__btn" onClick={onClose}>Close</button>
      </div>
      <div className="ldx__stage">
        <img key={index} src={listingPhoto(l, index)} alt={l.photoAlts[index] ?? ""} decoding="async" />
      </div>
      <div className="ldx__bar">
        <button type="button" className="ldx__btn" onClick={prev} aria-label="Previous photo">Previous</button>
        <p className="ldx__cap">{l.photoAlts[index]}</p>
        <button type="button" className="ldx__btn" onClick={next} aria-label="Next photo">Next</button>
      </div>
    </div>
  );
}
