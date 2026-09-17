"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initTextReveal } from "./textReveal";

/**
 * Motion backbone. NO smooth-scroll library: Lenis's glide-to-stop was the post-scroll "readjust" stutter
 * (momentum smoothing always keeps moving a beat after your input stops). The page uses native scroll, which
 * has none of that. ScrollTrigger drives the reveals off native scroll directly.
 *
 * Reveal vocabulary — any element with data-reveal animates in on scroll and reverses when it scrolls back
 * out (re-runs both directions): up | down | left | right | scale | mask | clip | line | letters.
 * Groups: data-reveal-group + data-reveal-item. data-reveal-delay / data-reveal-dist tune each.
 * All a no-op under prefers-reduced-motion.
 */
export function EliteMotion() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Section-title / hero SplitText reveal. Runs after fonts load (real line breaks) and handles reduced
    // motion internally, so it must run even when the scroll reveals below are skipped.
    let cancelled = false;
    let cleanupText = () => {};
    const runText = () => { if (!cancelled) cleanupText = initTextReveal(document); };
    if (document.fonts && "ready" in document.fonts) document.fonts.ready.then(runText);
    else runText();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => { cancelled = true; cleanupText(); };
    }

    gsap.registerPlugin(ScrollTrigger);
    document.documentElement.style.overflowAnchor = "none";

    const triggers: ScrollTrigger[] = [];
    /** Play on enter, reverse on leave-back, so the reveal re-runs every time it re-enters. */
    const bind = (el: Element, anim: gsap.core.Tween | gsap.core.Timeline, start = "top 86%") => {
      anim.pause();
      triggers.push(ScrollTrigger.create({
        trigger: el, start,
        onEnter: () => anim.play(),
        onLeaveBack: () => anim.reverse(),
      }));
    };

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        const type = el.dataset.reveal || "up";
        const dist = parseFloat(el.dataset.revealDist || "") || 52;
        const delay = parseFloat(el.dataset.revealDelay || "0");

        if (type === "letters") {
          const ltrs = el.querySelectorAll<HTMLElement>(".ltr");
          gsap.set(el, { overflow: "hidden" });
          bind(el, gsap.fromTo(ltrs, { yPercent: 120 }, { yPercent: 0, duration: 1.2, ease: "expo.out", stagger: { amount: 0.35, from: "end" }, delay }), "top 92%");
          return;
        }
        if (type === "line") {
          bind(el, gsap.fromTo(el, { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 0.9, ease: "power4.inOut", delay }), "top 90%");
          return;
        }
        if (type === "mask") {
          const found = el.querySelectorAll<HTMLElement>(".ln");
          const movers: Element[] = found.length ? Array.from(found) : (el.firstElementChild ? [el.firstElementChild] : [el]);
          gsap.set(el, { overflow: "hidden" });
          bind(el, gsap.fromTo(movers, { yPercent: 118 }, { yPercent: 0, duration: 1.05, ease: "power4.out", stagger: 0.09, delay }));
          return;
        }
        if (type === "clip") {
          const img = el.querySelector<HTMLElement>("img");
          const tl = gsap.timeline();
          tl.fromTo(el, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.15, ease: "power4.inOut", delay }, 0);
          if (img) tl.fromTo(img, { scale: 1.22, transformOrigin: "50% 55%" }, { scale: 1, duration: 1.6, ease: "power3.out", delay }, 0);
          bind(el, tl, "top 84%");
          return;
        }
        const from: gsap.TweenVars = { autoAlpha: 0 };
        const to: gsap.TweenVars = { autoAlpha: 1, x: 0, y: 0, scale: 1, duration: 1.05, ease: "power3.out", delay };
        if (type === "up") from.y = dist;
        else if (type === "down") from.y = -dist;
        else if (type === "right") from.x = dist;
        else if (type === "left") from.x = -dist;
        else if (type === "scale") { from.scale = 0.92; from.y = dist * 0.4; }
        bind(el, gsap.fromTo(el, from, to), "top 88%");
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
        const items = gsap.utils.toArray<HTMLElement>("[data-reveal-item]", group);
        if (!items.length) return;
        const type = group.dataset.revealGroup || "up";
        const dist = parseFloat(group.dataset.revealDist || "") || 56;
        const from: gsap.TweenVars = { autoAlpha: 0 };
        if (type === "up") from.y = dist;
        else if (type === "right") from.x = dist;
        else if (type === "left") from.x = -dist;
        else if (type === "scale") { from.scale = 0.94; from.y = dist * 0.4; }
        bind(group, gsap.fromTo(items, from, { autoAlpha: 1, x: 0, y: 0, scale: 1, duration: 1, ease: "power3.out", stagger: 0.11 }), "top 84%");
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts && "ready" in document.fonts) document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);
    const settleT = setTimeout(refresh, 700);

    return () => {
      cancelled = true;
      cleanupText();
      window.removeEventListener("load", refresh);
      clearTimeout(settleT);
      triggers.forEach((t) => t.kill());
      ctx.revert();
    };
  }, []);

  return null;
}
