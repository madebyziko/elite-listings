"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { EliteButton } from "./EliteButton";

type CTA = { label: string; href: string };
type Seq = { count: number; dir: string }; // frames at `${dir}/f_001.webp` ...
type Video = { src: string; poster: string };
// On phones a scrub hero swaps to this clip, played once (no scroll-scrub). `position` biases the cover-crop
// (e.g. "72% 50%" to keep a subject on the right in frame on a portrait screen).
type MobileVideo = { src: string; poster: string; position?: string };

/**
 * Full-bleed film hero for the line pages — big enough to carry the page. Two modes:
 *  - scrub: a scroll-scrubbed image sequence on a canvas (same technique as the home hero — preloaded frames,
 *    drawn on GSAP's ticker in step with Lenis, no video-seek lag). The frame index is locked straight to
 *    scroll through a tall track, so scrolling down plays the film forward and scrolling back reverses it.
 *  - loop: a muted autoplay <video> that fills the hero and loops (ambient), with a poster still.
 * Text (eyebrow, split headline with a serif accent, sub, CTAs) is overlaid lower-left over a gradient scrim.
 * Dark ground so the fixed nav reads cream. Reduced motion: scrub shows the first frame, loop shows its poster.
 */
export function EliteFilmHero({
  eyebrow,
  lead,
  accent,
  sub,
  primary,
  secondary,
  seq,
  video,
  mobileVideo,
  posterAlt,
}: {
  eyebrow: string;
  lead: string[];
  accent: string;
  sub: string;
  primary: CTA;
  secondary?: CTA;
  seq?: Seq;
  video?: Video;
  mobileVideo?: MobileVideo;
  posterAlt: string;
}) {
  const trackRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // Re-render (and re-run the scrub effect) when we cross the phone breakpoint, so the frame preload is skipped
  // on phones where the play-once video takes over.
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    if (!mobileVideo) return;
    const mq = window.matchMedia("(max-width:900px)");
    const set = () => setMobile(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, [mobileVideo]);

  useEffect(() => {
    if (!seq) return;
    // Phones show the play-once <video> instead of the scrubbed canvas — don't preload the frame sequence there.
    if (mobileVideo && window.matchMedia("(max-width:900px)").matches) return;
    const track = trackRef.current;
    const canvas = canvasRef.current;
    if (!track || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Always open on the first frame (don't let the browser restore scroll onto a mid-scrub frame).
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const N = seq.count;
    const framePath = (i: number) => `${seq.dir}/f_${String(i + 1).padStart(3, "0")}.webp`;
    const imgs: HTMLImageElement[] = [];
    let cur = -1;
    let target = 0;

    const draw = (idx: number) => {
      const im = imgs[Math.max(0, Math.min(N - 1, Math.round(idx)))];
      if (!im || !im.complete || !im.naturalWidth) return;
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      const ir = im.naturalWidth / im.naturalHeight;
      const cr = cw / ch;
      let w: number, h: number;
      if (cr > ir) { w = cw; h = cw / ir; } else { h = ch; w = ch * ir; }
      const x = (cw - w) * 0.5;
      const y = (ch - h) * 0.5;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(im, x, y, w, h);
    };

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(cur < 0 ? 0 : cur);
    };

    const compute = () => {
      const scrollable = track.offsetHeight - window.innerHeight;
      const passed = Math.min(scrollable, Math.max(0, -track.getBoundingClientRect().top));
      target = (scrollable > 0 ? passed / scrollable : 0) * (N - 1);
    };

    for (let i = 0; i < N; i++) {
      const im = new Image();
      im.src = framePath(i);
      if (i === 0) im.onload = () => draw(0);
      imgs.push(im);
    }

    const update = () => {
      compute();
      if (cur !== target) { cur = target; draw(cur); }
    };

    const onResize = () => { resize(); compute(); draw(cur < 0 ? 0 : cur); };
    window.addEventListener("resize", onResize);
    resize();
    compute();
    if (reduce) { cur = target = 0; draw(0); }
    else gsap.ticker.add(update);

    return () => {
      window.removeEventListener("resize", onResize);
      gsap.ticker.remove(update);
    };
  }, [seq, mobile, mobileVideo]);

  const overlay = (
    <>
      <div className="fh__scrim" aria-hidden="true" />
      <div className="fh__inner">
        <p className="fh__eyebrow"><span className="fh__mk" aria-hidden="true" />{eyebrow}</p>
        <h1 className="fh__hl" id="rlh-title" data-reveal-01="lines">
          {lead.map((l, i) => (<span className="ln" key={i}>{l}</span>))}
          <span className="ln"><span className="em">{accent}</span></span>
        </h1>
        <p className="fh__sub">{sub}</p>
        <div className="fh__cta">
          <EliteButton href={primary.href} variant="primary">{primary.label}</EliteButton>
          {secondary && <EliteButton href={secondary.href} variant="ghost">{secondary.label}</EliteButton>}
        </div>
      </div>
      {seq && <div className="fh__cue" aria-hidden="true">Scroll <span className="dot" /></div>}
    </>
  );

  if (seq) {
    return (
      <section className={`fh fh--scrub${mobileVideo ? " fh--hasmvid" : ""}`} ref={trackRef} data-ground="dark" aria-labelledby="rlh-title">
        <div className="fh__pin">
          <canvas className="fh__canvas" ref={canvasRef} aria-hidden="true" />
          {mobileVideo && (
            <video
              className="fh__mvid"
              autoPlay
              muted
              playsInline
              preload="metadata"
              poster={mobileVideo.poster}
              aria-label={posterAlt}
              style={mobileVideo.position ? { objectPosition: mobileVideo.position } : undefined}
            >
              <source src={mobileVideo.src} type="video/mp4" />
            </video>
          )}
          {overlay}
        </div>
      </section>
    );
  }

  return (
    <section className="fh fh--loop" data-ground="dark" aria-labelledby="rlh-title">
      <div className="fh__pin">
        {video && (
          <>
            <video className="fh__video" autoPlay muted loop playsInline preload="metadata" poster={video.poster} aria-label={posterAlt}>
              <source src={video.src} type="video/mp4" />
            </video>
            <img className="fh__vidfallback" src={video.poster} alt={posterAlt} decoding="async" />
          </>
        )}
        {overlay}
      </div>
    </section>
  );
}
