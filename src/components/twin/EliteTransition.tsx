"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

/**
 * Page transition — a branded shell (the "Elite Listings" wordmark on the dark ground) sweeps up to cover the
 * screen, the route swaps behind it, then it continues up and off to reveal the new page. Adapted from the
 * Power Type reference (shell-through-the-navigation), kept crisp (~0.6s each way, not their 2.2s) and
 * reliable inside the Next App Router: because the component unmounts with the page, the "arriving" half is
 * re-armed through a sessionStorage flag and re-covers before first paint so the swap is never seen.
 *
 * Only fires when navigating INTO a route in ELITE_ROUTES (the elite line pages). /twin keeps its own
 * preloader entrance, and links to the old "ink" pages navigate normally. No-op under reduced motion.
 */
const ELITE_ROUTES = ["/residential", "/commercial", "/development", "/listings", "/about", "/contact"];
const FLAG = "elite:transitioning";
const COVER_MS = 560;
const REVEAL_MS = 640;

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function EliteTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<"idle" | "cover" | "arrive" | "reveal">("idle");
  const busy = useRef(false);
  const reduced = useRef(false);
  const arriving = useRef<boolean | null>(null);

  useEffect(() => {
    setMounted(true);
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // Arriving half: if we got here through a transition, cover before paint, then reveal. The flag is captured
  // into a ref on the first run so React Strict Mode's double-invoke (which cancels the first schedule in its
  // cleanup) re-schedules the reveal on the second run instead of bailing on an already-consumed flag.
  useIsoLayoutEffect(() => {
    if (arriving.current === null) {
      let flagged = false;
      try { flagged = sessionStorage.getItem(FLAG) === "1"; } catch { /* private mode */ }
      if (flagged) { try { sessionStorage.removeItem(FLAG); } catch { /* ignore */ } }
      arriving.current = flagged;
    }
    if (!arriving.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setPhase("arrive"); // instant cover before first paint, so the swap is never seen
    let done = false;
    let idleT = 0;
    const reveal = () => {
      if (done) return;
      done = true;
      setPhase("reveal");
      idleT = window.setTimeout(() => setPhase("idle"), REVEAL_MS);
    };
    // rAF gives a clean paint of the covered state first; the timeout is a fallback because rAF is paused
    // while the tab is backgrounded, which would otherwise leave the page stuck under the shell.
    const r = requestAnimationFrame(() => requestAnimationFrame(reveal));
    const fallbackT = window.setTimeout(reveal, 120);
    return () => { cancelAnimationFrame(r); clearTimeout(fallbackT); if (idleT) clearTimeout(idleT); };
  }, []);

  // Leaving half: intercept clicks to another elite route, cover, then push.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (reduced.current) return;
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement)?.closest?.("a");
      if (!a) return;
      if (a.target === "_blank" || a.hasAttribute("download")) return;
      const href = a.getAttribute("href") || "";
      if (!href.startsWith("/")) return; // internal only
      const path = href.split("#")[0].split("?")[0];
      if (!path || path === pathname) return; // same page (e.g. #contact)
      // cover when heading into an elite page or any listing detail (/listings/<slug>)
      if (!ELITE_ROUTES.includes(path) && !path.startsWith("/listings/")) return;
      e.preventDefault();
      if (busy.current) return;
      busy.current = true;
      setPhase("cover");
      window.setTimeout(() => {
        try { sessionStorage.setItem(FLAG, "1"); } catch { /* ignore */ }
        router.push(href);
      }, COVER_MS);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname, router]);

  if (!mounted) return null;
  return (
    <div className={`etrans etrans--${phase}`} aria-hidden="true">
      <span className="etrans__mark">Elite Listings</span>
    </div>
  );
}
