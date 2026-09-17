"use client";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

/**
 * Text Reveal 01 — SplitText line/word/char slide-up. Opt in with `data-reveal-01="lines|words|chars"`; add
 * `data-scroll` to hold until the element scrolls into view (otherwise it reveals on init, for heroes).
 * Per-element overrides: data-duration / data-stagger / data-delay / data-ease.
 *
 * Reveal is driven by an IntersectionObserver, NOT ScrollTrigger: IO fires immediately for anything already
 * in the viewport and can never leave a title stuck hidden (the earlier ScrollTrigger version, created after
 * fonts.ready, sometimes never fired so titles stayed empty until you scrolled past). Splits once after fonts
 * load for correct line breaks; reveals with no animation under reduced motion; returns a cleanup.
 */

let registered = false;

const CONFIG = {
  lines: { duration: 0.9, stagger: 0.09, ease: "power4.out" },
  words: { duration: 0.9, stagger: 0.04, ease: "power4.out" },
  chars: { duration: 0.6, stagger: 0.012, ease: "power4.out" },
} as const;

type Kind = "lines" | "words" | "chars";

export function initTextReveal(scope: ParentNode = document): () => void {
  if (typeof window === "undefined") return () => {};
  const els = Array.from(scope.querySelectorAll<HTMLElement>("[data-reveal-01]"));
  if (!els.length) return () => {};

  // Reduced motion: show final state, never split or animate.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.set(els, { visibility: "visible" });
    return () => {};
  }

  if (!registered) { gsap.registerPlugin(SplitText); registered = true; }

  const splits: SplitText[] = [];
  const observers: IntersectionObserver[] = [];
  let cancelled = false;

  const build = () => {
    if (cancelled) return;
    els.forEach((el) => {
      const kind = ((el.getAttribute("data-reveal-01") || "lines") as Kind);
      const c = CONFIG[kind] ?? CONFIG.lines;
      const typeMap: Record<Kind, string> = { lines: "lines", words: "words,lines", chars: "chars,words,lines" };
      const maskMap: Record<Kind, "lines" | "words" | "chars"> = { lines: "lines", words: "words", chars: "chars" };
      const useScroll = el.hasAttribute("data-scroll");
      const duration = parseFloat(el.dataset.duration || "") || c.duration;
      const stagger = parseFloat(el.dataset.stagger || "") || c.stagger;
      const delay = parseFloat(el.dataset.delay || "") || 0;
      const ease = el.dataset.ease || c.ease;

      try {
        const split = SplitText.create(el, {
          type: typeMap[kind],
          mask: maskMap[kind],
          autoSplit: false,
          linesClass: "line",
          wordsClass: "word",
          charsClass: "char",
          onSplit(self) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const targets = (self as any)[kind] as HTMLElement[];
            gsap.set(el, { visibility: "visible" });
            const tween = gsap.from(targets, { yPercent: 110, duration, stagger, delay, ease, paused: true });
            if (!useScroll) {
              tween.play();
            } else {
              const io = new IntersectionObserver((entries, obs) => {
                entries.forEach((e) => { if (e.isIntersecting) { tween.play(); obs.disconnect(); } });
              }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
              io.observe(el);
              observers.push(io);
            }
            return tween;
          },
        });
        splits.push(split);
      } catch {
        gsap.set(el, { visibility: "visible" }); // never leave a title hidden if SplitText throws
      }
    });
  };

  // Split after fonts load so line breaks are measured against the real faces.
  if (document.fonts && "ready" in document.fonts) document.fonts.ready.then(build);
  else build();

  return () => {
    cancelled = true;
    observers.forEach((io) => io.disconnect());
    splits.forEach((s) => { try { s.revert(); } catch { /* already gone */ } });
  };
}
