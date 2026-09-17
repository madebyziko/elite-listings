"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
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
const easeInOutQuad = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
// per-face image overrides for the cube (Rayan: residential face uses home1, not the line photo)
const FACE_IMG: Record<string, string> = { residential: "/images/home1.png" };

/**
 * "Which one are you?" as a scroll-driven 3D prism (adapted from the otsuka-air /zeroz cube). A sticky
 * three-face prism — residential / commercial / development — sits beside three full-height copy blocks.
 * Scroll progress through the section drives the prism's rotateY, turning it a quarter-turn per line
 * (face 0 → -90 → -180) with an eased settle at each face, so scroll-down advances and scroll-up reverses.
 * The drawing rides GSAP's ticker (the same loop as Lenis) so the turn stays in step with smooth scroll.
 * Mobile and reduced-motion get a plain stacked list of the three lines instead of the prism.
 */
export function EliteCube({ lines }: { lines: Record<string, LineItem> }) {
  const items = ORDER.map((k) => lines[k]);
  const runRef = useRef<HTMLDivElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [staticMode, setStaticMode] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStaticMode(true);
      return;
    }
    const run = runRef.current;
    const box = boxRef.current;
    if (!run || !box) return;
    const isMobile = () => window.matchMedia("(max-width: 767px)").matches;
    let curT: number | null = null;
    let curA = -1;

    const update = () => {
      if (isMobile()) return; // prism hidden on mobile; the stack is shown instead
      const scrollable = run.offsetHeight - window.innerHeight;
      const passed = Math.min(Math.max(-run.getBoundingClientRect().top, 0), Math.max(scrollable, 1));
      const p = scrollable > 0 ? passed / scrollable : 0;
      const seg = p * 2; // two quarter-turns across three faces
      const i = Math.min(Math.floor(seg), 1);
      const local = Math.min(Math.max(seg - i, 0), 1);
      const deg = -90 * (i + easeInOutQuad(local));
      if (deg !== curT) {
        curT = deg;
        box.style.transform = `rotateX(-7deg) rotateY(${deg}deg)`;
      }
      const ai = Math.min(Math.round(seg), 2);
      if (ai !== curA) {
        curA = ai;
        setActive(ai);
      }
    };

    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <section
      className="cube sec sec--cream"
      data-ground="light"
      data-wash="#0e0b08"
      data-active={active}
      data-static={staticMode ? "true" : undefined}
      aria-labelledby="cube-title"
    >
      {/* Desktop prism experience — the title + prism + counter live in the sticky left column, so the title
          stays with the cube (never scrolls away) and there is no gap; the copy scrolls on the right. */}
      <div className="cube__run" ref={runRef}>
        <div className="cube__left">
          <div className="cube__intro">
            <p className="eh__tag" data-reveal="up"><span className="eh__mk" aria-hidden="true" />Three lines</p>
            <h2 className="cube__q" id="cube-title" data-reveal-01="lines" data-scroll>Which one <span className="em">are you?</span></h2>
          </div>
          <div className="cube__stage" aria-hidden="true">
            <div className="cube__box" ref={boxRef}>
              {items.map((l, i) => (
                <div className="cube__face" data-face={i} key={l.key}>
                  <img src={FACE_IMG[l.key] ?? l.photo.src} alt="" loading="lazy" decoding="async" />
                  <span className="cube__idx">0{i + 1}</span>
                </div>
              ))}
              {/* fourth side + roof + floor close the box so it reads as a solid cube spinning in 3D */}
              <div className="cube__face cube__face--solid" data-face="3" aria-hidden="true" />
              <div className="cube__cap cube__cap--top" aria-hidden="true" />
              <div className="cube__cap cube__cap--bottom" aria-hidden="true" />
            </div>
          </div>
          <span className="cube__count"><b>{String(active + 1).padStart(2, "0")}</b> <i>/ 03</i></span>
        </div>

        <ol className="cube__copy">
          {items.map((l, i) => (
            <li className="cube__item" data-on={i === active ? "true" : "false"} key={l.key}>
              <span className="cube__num" aria-hidden="true">0{i + 1}</span>
              <p className="cube__label">{l.label}</p>
              <h3 className="cube__title">{l.actor}</h3>
              <p className="cube__text">{l.promise}</p>
              <div className="cube__cta">
                <EliteButton href={l.ctaHref} variant="primary">{l.cta}</EliteButton>
                <a className="cube__more" href={`/${l.key}`}>Explore {l.label.toLowerCase()} <span className="arw" aria-hidden="true">&rarr;</span></a>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Mobile / reduced-motion fallback */}
      <ol className="cube__stack">
        {items.map((l) => (
          <li className="cube__scard" key={l.key}>
            <div className="cube__scardmedia">
              <img src={l.photo.src} alt={l.photo.alt} loading="lazy" decoding="async" />
            </div>
            <p className="cube__label">{l.label}</p>
            <h2 className="cube__title">{l.actor}</h2>
            <p className="cube__text">{l.promise}</p>
            <div className="cube__cta"><EliteButton href={l.ctaHref} variant="primary">{l.cta}</EliteButton></div>
          </li>
        ))}
      </ol>
    </section>
  );
}
