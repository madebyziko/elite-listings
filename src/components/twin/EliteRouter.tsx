"use client";

import { useEffect, useRef, useState } from "react";
import { EliteButton } from "./EliteButton";

type LineItem = {
  key: string;
  label: string;
  actor: string;
  promise: string;
  cta: string;
  ctaHref: string;
  photo: { src: string; alt: string; sample?: boolean };
};

const ORDER = ["residential", "commercial", "development"] as const;

/**
 * "Which one is you?" — the three-paths router, adapted from the Suffo reference: a left column
 * (line chips, tag, split headline, lede) beside a fanned deck of cards on the right that cycles
 * through the three service lines. Each card carries that line's matched CTA where Suffo put a "+".
 * On scroll-in the deck flies in from the top-right and settles; chips (a tablist) bring a line to front.
 */
export function EliteRouter({ lines }: { lines: Record<string, LineItem> }) {
  const items = ORDER.map((k) => lines[k]);
  const [active, setActive] = useState(0);
  const [entered, setEntered] = useState(false);
  const ref = useRef<HTMLElement | null>(null);
  // Pause is a ref, not state, so hovering never tears down and restarts the timer (that was the wonky,
  // inconsistent cadence). The interval keeps a steady rhythm and simply skips a beat while paused.
  const pausedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Toggle both ways so the deck fly-in replays every time the section re-enters.
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => setEntered(e.isIntersecting)),
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!entered) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let id: ReturnType<typeof setInterval>;
    const advance = () => { if (!pausedRef.current && !document.hidden) setActive((a) => (a + 1) % items.length); };
    // First card turns ~0.9s after the deck settles, then a steady 3.2s cadence.
    const first = setTimeout(() => { advance(); id = setInterval(advance, 3200); }, 900);
    return () => { clearTimeout(first); if (id) clearInterval(id); };
  }, [entered, items.length]);

  return (
    <section
      ref={ref}
      className={`rt${entered ? " is-in" : ""}`}
      aria-labelledby="rt-title"
      data-ground="light"
      data-wash="#0e0b08"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
      onFocusCapture={() => { pausedRef.current = true; }}
      onBlurCapture={() => { pausedRef.current = false; }}
    >
      <span className="rt__num" aria-hidden="true"><span key={active}>{String(active + 1).padStart(2, "0")}</span></span>
      <div className="rt__grid">
        <div className="rt__head">
          <div className="rt__chips" role="tablist" aria-label="Service lines">
            {items.map((l, i) => (
              <button
                key={l.key}
                role="tab"
                id={`rt-tab-${l.key}`}
                aria-selected={i === active}
                aria-controls="rt-panel"
                className={`rt__chip${i === active ? " is-on" : ""}`}
                onClick={() => setActive(i)}
              >
                {l.label}
              </button>
            ))}
            <button
              className="rt__chip rt__chip--arw"
              aria-label="Next line"
              onClick={() => setActive((a) => (a + 1) % items.length)}
            >
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>

          <p className="rt__tag" data-reveal="up"><span className="rt__dot" aria-hidden="true" />Three lines</p>
          <h2 className="rt__hl" id="rt-title" data-reveal-01="lines" data-scroll>
            Which one <span className="em">are you?</span>
          </h2>
          <p className="rt__sub" data-reveal="up" data-reveal-delay="0.12">
            A home to buy or sell, a business to move on from, a site with something in it. We work all three.
          </p>
        </div>

        <div className="rt__stage">
          <div className="rt__deck">
            {items.map((l, i) => {
              const depth = (i - active + items.length) % items.length;
              const front = depth === 0;
              return (
                <article
                  key={l.key}
                  className="rt__card"
                  data-depth={depth}
                  {...(front
                    ? { role: "tabpanel", id: "rt-panel", "aria-labelledby": `rt-tab-${l.key}` }
                    : { "aria-hidden": true })}
                >
                  <div className="rt__media">
                    <img src={l.photo.src} alt={front ? l.photo.alt : ""} loading="lazy" decoding="async" />
                  </div>
                  <p className="rt__cardlabel">{l.label}</p>
                  <h3 className="rt__cardtitle">{l.actor}</h3>
                  <p className="rt__cardtext">{l.promise}</p>
                  <EliteButton href={l.ctaHref} variant="primary" className="rt__cta" tabIndex={front ? 0 : -1}>{l.cta}</EliteButton>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
