"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { scope } from "@/lib/data";

/**
 * "How it runs" as a pinned circular gauge (adapted from Vooban /approach, Details id vv6RCiV…): a dark panel
 * pins while a bordeaux arc sweeps clockwise from the top and the centre content advances through the four
 * development steps (site, plan, budget, return); the surrounding radial ticks read as a technical dial. The
 * arc fills continuously with scroll; the counter and title snap per quarter. Rides GSAP's ticker (Lenis loop),
 * the same driver as the cube and the listing split-scroll. Reversible. Mobile / reduced-motion get a list.
 */
const STEPS = scope.development.process; // {name, what} x4

// 60 radial ticks around the dial; every fifth is longer/brighter (a gauge, not a clock).
// Coordinates are rounded so server and client render byte-identical strings (no hydration mismatch).
const r2 = (n: number) => Math.round(n * 100) / 100;
const TICKS = Array.from({ length: 60 }, (_, i) => {
  const a = (i * 6 * Math.PI) / 180;
  const long = i % 5 === 0;
  const rOut = 190;
  const rIn = long ? 168 : 178;
  return {
    x1: r2(200 + rOut * Math.cos(a)), y1: r2(200 + rOut * Math.sin(a)),
    x2: r2(200 + rIn * Math.cos(a)), y2: r2(200 + rIn * Math.sin(a)),
    long,
  };
});

export function EliteProcessDial() {
  const N = STEPS.length;
  const runRef = useRef<HTMLDivElement | null>(null);
  const arcRef = useRef<SVGCircleElement | null>(null);
  const [active, setActive] = useState(0);
  const [staticMode, setStaticMode] = useState(false);
  const ticks = useMemo(() => TICKS, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setStaticMode(true); return; }
    const run = runRef.current;
    if (!run) return;
    const isMobile = () => window.matchMedia("(max-width: 767px)").matches;
    let curIdx = -1;
    let curArc = -1;

    const update = () => {
      if (isMobile()) return;
      const scrollable = run.offsetHeight - window.innerHeight;
      const passed = Math.min(Math.max(-run.getBoundingClientRect().top, 0), Math.max(scrollable, 1));
      const p = scrollable > 0 ? passed / scrollable : 0;
      // arc fills continuously; a small head start so step one already reads as "in progress"
      const arc = Math.min(1, 0.04 + p * 0.96);
      if (arc !== curArc && arcRef.current) {
        curArc = arc;
        arcRef.current.style.strokeDashoffset = String(1 - arc);
      }
      const idx = Math.min(Math.floor(p * N), N - 1);
      if (idx !== curIdx) { curIdx = idx; setActive(idx); }
    };

    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  }, [N]);

  return (
    <section className="pd sec sec--dark" data-ground="dark" data-static={staticMode ? "true" : undefined} aria-labelledby="pd-title">
      <div className="pd__run" ref={runRef} style={{ ["--n" as string]: N }}>
        <div className="pd__pin">
          <div className="eh eh--wide pd__head">
            <p className="eh__tag" data-reveal="up"><span className="eh__mk" aria-hidden="true" />How it runs</p>
            <h2 className="eh__hl" id="pd-title" data-reveal-01="lines" data-scroll>Site, plan, budget, <span className="em">return.</span></h2>
          </div>

          <div className="pd__dial">
            <svg className="pd__svg" viewBox="0 0 400 400" aria-hidden="true">
              {ticks.map((t, i) => (
                <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} className={t.long ? "pd__tick pd__tick--long" : "pd__tick"} />
              ))}
              <g transform="rotate(-90 200 200)">
                <circle cx="200" cy="200" r="182" className="pd__track" pathLength={1} />
                <circle cx="200" cy="200" r="182" className="pd__arc" ref={arcRef} pathLength={1} strokeDasharray="1" strokeDashoffset="0.96" />
              </g>
            </svg>

            <div className="pd__center">
              <span className="pd__count" aria-hidden="true">{String(active + 1).padStart(2, "0")} <i>/ {String(N).padStart(2, "0")}</i></span>
              <div className="pd__steps">
                {STEPS.map((s, i) => (
                  <div className={`pd__step${i === active ? " is-on" : ""}`} key={s.name} aria-hidden={i !== active}>
                    <h3 className="pd__steptitle">{i + 1}. {s.name}</h3>
                    <p className="pd__steptext">{s.what}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="pd__aside" data-reveal="up">
              Numbers first. We test what can be built, what it costs and what it sells for before anyone commits to the land.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile / reduced-motion fallback: a plain numbered list */}
      <ol className="pd__list">
        <li className="pd__listhead">
          <p className="eh__tag"><span className="eh__mk" aria-hidden="true" />How it runs</p>
          <h2 className="eh__hl">Site, plan, budget, <span className="em">return.</span></h2>
        </li>
        {STEPS.map((s, i) => (
          <li className="pd__listitem" key={s.name}>
            <span className="pd__listn" aria-hidden="true">0{i + 1}</span>
            <span className="pd__listbody">
              <span className="pd__listname">{s.name}</span>
              <span className="pd__listwhat">{s.what}</span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
