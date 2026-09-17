"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { EliteButton } from "./EliteButton";

const FRAME_COUNT = 60;
const framePath = (i: number) => `/elite/seq/f_${String(i + 1).padStart(3, "0")}.webp`;
// Phones swap the scroll-scrub for the same clip played once (see the max-width:900px rules in elite.css).
const MOBILE_VIDEO = "/elite/hero-walk-mobile.mp4";
const MOBILE_POSTER = "/elite/home-hero-poster.webp";

/**
 * Elite Listings hero: a scroll-scrubbed film rendered as a preloaded image sequence on a canvas
 * (smooth, no video-seek lag). Scrolling through the tall track eases the frame index, so scroll down
 * walks Bilal forward to his thumbs-up and scroll up reverses it. Split headline: "Buy smart." upper-left
 * with the description and CTAs, "Sell strong." lower-right, framing him as he walks up the middle.
 */
export function EliteHero() {
  const trackRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width:900px)");
    const set = () => setMobile(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  useEffect(() => {
    // Phones play the clip once instead of scrubbing frames, so skip the sequence preload there.
    if (window.matchMedia("(max-width:900px)").matches) return;
    const track = trackRef.current;
    const canvas = canvasRef.current;
    if (!track || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Always open on frame 1 (the wide establishing shot). Without this, browsers restore the
    // previous scroll position on reload and drop the visitor onto the pushed-in climax frame.
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const imgs: HTMLImageElement[] = [];
    let cur = 0;
    let target = 0;

    const draw = (idx: number) => {
      const im = imgs[Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(idx)))];
      if (!im || !im.complete || !im.naturalWidth) return;
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      const ir = im.naturalWidth / im.naturalHeight;
      const cr = cw / ch;
      let w: number, h: number;
      if (cr > ir) { w = cw; h = cw / ir; } else { h = ch; w = ch * ir; }
      const x = (cw - w) * 0.58;
      const y = (ch - h) * 0.5;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(im, x, y, w, h);
    };

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(cur);
    };

    const compute = () => {
      const scrollable = track.offsetHeight - window.innerHeight;
      const passed = Math.min(scrollable, Math.max(0, -track.getBoundingClientRect().top));
      target = (scrollable > 0 ? passed / scrollable : 0) * (FRAME_COUNT - 1);
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
      const im = new Image();
      im.src = framePath(i);
      if (i === 0) im.onload = () => draw(0);
      imgs.push(im);
    }

    // Draw on GSAP's ticker, the SAME frame loop that drives Lenis, so the canvas frame is always in step
    // with the smooth scroll (a separate rAF here jittered a frame ahead/behind and read as a stutter when
    // scrolling stopped). The frame is locked straight to scroll (no second easing layer); draw only on change.
    const update = () => {
      compute();
      if (cur !== target) { cur = target; draw(cur); }
    };

    const onResize = () => { resize(); compute(); draw(cur); };
    window.addEventListener("resize", onResize);
    resize();
    compute();
    if (reduce) { cur = target = 0; draw(0); }
    else gsap.ticker.add(update);

    return () => {
      window.removeEventListener("resize", onResize);
      gsap.ticker.remove(update);
    };
  }, [mobile]);

  return (
    <section className="track track--hasmvid" ref={trackRef} data-ground="dark">
      <div className="pin">
        <canvas className="hero-canvas" ref={canvasRef} aria-hidden="true" />
        <video className="hero-mvid" autoPlay muted playsInline preload="metadata" poster={MOBILE_POSTER} aria-hidden="true">
          <source src={MOBILE_VIDEO} type="video/mp4" />
        </video>
        <div className="scrim" />

        <div className="tl">
          <h1 className="hl">
            Buy <span className="em">smart.</span>
          </h1>
          <div className="tl__under">
            <p className="sub">Calm, strategic real estate advice across Greater Vancouver.</p>
            <div className="cta">
              <EliteButton href="/contact" variant="primary">Book a call with Bilal</EliteButton>
              <EliteButton href="/listings" variant="ghost">Browse listings</EliteButton>
            </div>
          </div>
        </div>

        <div className="br">
          <h1 className="hl">Sell <span className="em">strong.</span></h1>
        </div>

        <div className="cue">
          Scroll <span className="dot" />
        </div>
      </div>
    </section>
  );
}
