"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { testimonials } from "@/lib/data";

const SLIDE_MS = 620; // must match .tm__track transition duration in elite.css
// Layout effect on the client (measure before paint, no flash), plain effect on the server (no SSR warning).
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Testimonials — Lovable single-rotating-story carousel with prev/next + dots, and a TRUE circular loop:
 * cards are rendered as three back-to-back copies and we step through the MIDDLE copy. Pressing next on the
 * last card slides the first card in from the right (forward, never a rewind); once the slide finishes the
 * track silently jumps back one full set (transition off) onto the identical card in the middle copy, so the
 * sequence can keep going forever. A lock ignores input mid-slide so autoplay or fast clicks can't run the
 * position off the strip.
 *
 * The track is positioned with a REAL px transform computed here, not a CSS var in a calc() — Chromium does
 * not re-evaluate var() inside a transform calc() on change, so the track would never actually move. Card
 * width is read with offsetWidth (layout width) because inactive cards are scale(.9) and their rect width
 * would be short. Autoplay pauses on hover/focus; swipe + arrow keys work. Quotes/names/metrics/ratings are
 * PLACEHOLDERS until Bilal's verified quotes are imported.
 */
export function EliteTestimonials() {
  const items = testimonials;
  const N = items.length;
  const strip = [...items, ...items, ...items]; // three copies; middle copy is the live one
  const [pos, setPos] = useState(N); // start on the first card of the middle copy
  const [anim, setAnim] = useState(true);
  const [paused, setPaused] = useState(false);
  const [unit, setUnit] = useState<{ card: number; gap: number } | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lock = useRef(false);
  const dragX = useRef<number | null>(null);
  const active = ((pos % N) + N) % N;

  const step = (d: number) => {
    if (lock.current) return;
    lock.current = true;
    setAnim(true);
    setPos((p) => p + d);
  };
  const toCard = (i: number) => {
    const target = N + i;
    if (lock.current || target === pos) return;
    lock.current = true;
    setAnim(true);
    setPos(target);
  };

  // Measure the real card + gap widths so the track can be translated in px. offsetWidth is the layout width
  // (inactive cards are scale(.9), so their rect width would be short). Re-measure on resize.
  useIsoLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      const card = track.querySelector<HTMLElement>(".tm__card");
      if (!card || !card.offsetWidth) return;
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      setUnit((u) => (u && u.card === card.offsetWidth && u.gap === gap ? u : { card: card.offsetWidth, gap }));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    return () => ro.disconnect();
  }, []);

  // After each animated slide settles, if we've drifted into an outer copy, snap back one set with no
  // transition (same card, invisible), then re-arm the transition and release the lock on the next frames.
  useEffect(() => {
    if (!anim) return;
    const t = setTimeout(() => {
      if (pos >= 2 * N) { setAnim(false); setPos(pos - N); }
      else if (pos < N) { setAnim(false); setPos(pos + N); }
      else { lock.current = false; }
    }, SLIDE_MS + 40);
    return () => clearTimeout(t);
  }, [pos, anim, N]);

  useEffect(() => {
    if (anim) return;
    let done = false;
    let r2 = 0;
    const arm = () => { if (done) return; done = true; setAnim(true); lock.current = false; };
    // rAF gives a clean paint of the no-transition snap first; the timeout is a fallback because rAF is
    // paused while the tab is backgrounded, which would otherwise leave the track stuck mid-jump.
    const r1 = requestAnimationFrame(() => { r2 = requestAnimationFrame(arm); });
    const to = setTimeout(arm, 90);
    return () => { done = true; cancelAnimationFrame(r1); cancelAnimationFrame(r2); clearTimeout(to); };
  }, [anim]);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => step(1), 6000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  };

  // Real px transform once measured (set before first paint via the layout effect above).
  const tx = unit ? -(pos * (unit.card + unit.gap) + unit.card / 2) : null;
  const trackStyle: React.CSSProperties = {
    transform: tx !== null ? `translateX(${tx}px)` : undefined,
    transition: anim ? undefined : "none",
  };

  return (
    <section
      className="tm"
      aria-labelledby="tm-title"
      aria-roledescription="carousel"
      data-ground="light"
      data-wash="#12100d"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="tm__head">
        <p className="tm__tag" data-reveal="up"><span className="tm__mk" aria-hidden="true" />What clients say</p>
        <h2 className="tm__hl" id="tm-title" data-reveal-01="lines" data-scroll>
          Trusted where it <span className="em">counts.</span>
        </h2>
        <p className="tm__sub" data-reveal="up" data-reveal-delay="0.12">
          A few of the people Bilal has worked with across his three lines.
        </p>
      </div>

      <div
        className="tm__viewport"
        data-reveal="scale"
        tabIndex={0}
        role="group"
        aria-label={`Testimonial ${active + 1} of ${N}`}
        onKeyDown={onKey}
        onPointerDown={(e) => { dragX.current = e.clientX; }}
        onPointerUp={(e) => {
          if (dragX.current === null) return;
          const dx = e.clientX - dragX.current;
          if (Math.abs(dx) > 44) step(dx < 0 ? 1 : -1);
          dragX.current = null;
        }}
      >
        <div ref={trackRef} className={`tm__track${anim ? "" : " is-jumping"}`} style={trackStyle}>
          {strip.map((t, si) => (
            <article
              key={si}
              className={`tm__card${si === pos ? " is-active" : ""}`}
              aria-hidden={si === pos ? undefined : true}
            >
              <p className="tm__cardtag">{t.role}</p>
              <blockquote className="tm__quote">{t.quote}</blockquote>
              <ul className="tm__metrics" role="list">
                {t.metrics.map((m, mi) => (
                  <li key={mi}>
                    <span className="tm__metricval">{m.value}</span>
                    <span className="tm__metriclabel">{m.label}</span>
                  </li>
                ))}
              </ul>
              <div className="tm__stars" role="img" aria-label={`Rated ${t.rating} out of 5`}>
                {Array.from({ length: 5 }).map((_, s) => (
                  <span key={s} className={`tm__star${s < t.rating ? " is-on" : ""}`} aria-hidden="true">&#9733;</span>
                ))}
              </div>
              <div className="tm__person">
                <span className="tm__avatar" aria-hidden="true">{t.name.trim().charAt(0)}</span>
                <span className="tm__personmeta">
                  <span className="tm__name">{t.name}</span>
                  {t.placeholder && <span className="tm__flag">Verified quote pending</span>}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="tm__controls" data-reveal="up">
        <button className="tm__arw" aria-label="Previous testimonial" onClick={() => step(-1)}>
          <span aria-hidden="true">&larr;</span>
        </button>
        <div className="tm__dots" role="tablist" aria-label="Choose testimonial">
          {items.map((t, i) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={i === active}
              aria-label={`Testimonial ${i + 1}`}
              className={`tm__dot${i === active ? " is-on" : ""}`}
              onClick={() => toCard(i)}
            />
          ))}
        </div>
        <button className="tm__arw" aria-label="Next testimonial" onClick={() => step(1)}>
          <span aria-hidden="true">&rarr;</span>
        </button>
      </div>
    </section>
  );
}
