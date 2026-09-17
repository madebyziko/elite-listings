"use client";

import { useEffect, useRef, useState } from "react";
import { aboutStats, brand } from "@/lib/data";

const ROTATE = ["Residential.", "Commercial.", "Development."];

/**
 * About Bilal — rebuilt on the OVA / David Alaba "proof-stack" model: open with a reframing thesis
 * (most agents pick a lane; he works all three), state the reason-to-hire in one dense line, then earn
 * it with hard numbers that count up on scroll. The redundant credential paragraph is gone; the
 * credential now sits as a small nameplate under the portrait. Rotating line-word is the motion
 * signature. Everything is verified (content-pack); the 80+/800+ figures are labelled as the
 * brokerage's / the team's, never his personal numbers. No other individuals are named.
 */
export function EliteAbout() {
  const [word, setWord] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setWord((w) => (w + 1) % ROTATE.length), 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="ab" aria-labelledby="ab-title" data-ground="dark" data-wash="#F6F1E9">
      <div className="ab__grid">
        <div className="ab__left">
          <figure className="ab__portrait" data-reveal="clip">
            <img src="/images/bilal-portrait.png" alt="Bilal Naqsh" loading="lazy" decoding="async" />
          </figure>
          <figcaption className="ab__plate" data-reveal="up" data-reveal-delay="0.1">
            <span className="ab__name">Bilal Naqsh</span>
            <span className="ab__cred">{brand.role} &middot; {brand.team} &middot; {brand.brokerage}</span>
            <a className="ab__more" href="/about">About Bilal <span className="arw" aria-hidden="true">&rarr;</span></a>
          </figcaption>
        </div>

        <div className="ab__right">
          <h2 className="ab__hl" id="ab-title" data-reveal="up">
            <span className="ab__lead">Most agents pick a lane.</span>
            <span className="ab__works">We work</span>
            <span className="ab__rot" aria-label="residential, commercial and development">
              <span className="ab__rot-track" style={{ transform: `translateY(calc(${word} * -1.2em))` }} aria-hidden="true">
                {ROTATE.map((w) => (
                  <span className="ab__rot-word" key={w}>{w}</span>
                ))}
              </span>
            </span>
          </h2>

          <p className="ab__lede" data-reveal="up" data-reveal-delay="0.08">
            Homes, businesses and the land they sit on, bought and sold personally from first
            call to close. We negotiate in <strong>English, Farsi or Hindi</strong>, know Yaletown,
            West Vancouver and Burnaby block by block, and are backed by a full-service brokerage when a
            deal needs more than one set of hands.
          </p>

          <dl className="ab__stats" data-reveal-group="up">
            {aboutStats.map((s) => (
              <div className="ab__stat" data-reveal-item key={s.label}>
                <dt className="ab__statnum">
                  <Count to={s.count} prefix={s.prefix} suffix={s.suffix} />
                </dt>
                <dd className="ab__statlabel">{s.label}</dd>
              </div>
            ))}
          </dl>

          <blockquote className="ab__quote" data-reveal="up">
            &ldquo;Providing quality services because you deserve it.&rdquo;
            <cite>&mdash; Bilal Naqsh</cite>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

/** Counts up from 0 to `to` the first time it scrolls into view. Static under reduced motion. */
function Count({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(to); return; }
    let raf = 0;
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          io.disconnect();
          const start = performance.now();
          const dur = 1300;
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(Math.round(eased * to));
            if (p < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        });
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);

  return <span ref={ref}>{prefix}{n}{suffix}</span>;
}
