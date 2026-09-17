"use client";

import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/utils";
import { loadGsap } from "./gsap";

// Smooth scroll. Lenis and GSAP load after first paint so neither sits in the LCP path;
// off entirely under reduced motion.
export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let cleanup = () => {};
    let cancelled = false;
    const start = async () => {
      const [{ default: Lenis }, { gsap, ScrollTrigger }] = await Promise.all([import("lenis"), loadGsap()]);
      if (cancelled) return;
      const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 0.95, anchors: true });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (t: number) => lenis.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      cleanup = () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    };
    const id = window.setTimeout(start, 300);
    return () => {
      cancelled = true;
      window.clearTimeout(id);
      cleanup();
    };
  }, []);
  return <>{children}</>;
}
