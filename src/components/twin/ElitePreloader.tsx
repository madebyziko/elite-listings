"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * Preloader (adapted from the Vucko reference): the wordmark reveals letter by letter over a dark curtain,
 * a hairline fills, then the whole word travels up to the nav's top-left mark and shrinks onto it as the
 * curtain fades, handing off to the real nav wordmark underneath. Skipped entirely under reduced motion.
 */
const WORD = "Elite Listings";

export function ElitePreloader() {
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const wordRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setDone(true); return; }
    const root = rootRef.current;
    const word = wordRef.current;
    if (!root || !word) return;

    document.documentElement.style.overflow = "hidden";
    window.scrollTo(0, 0);

    const ltrs = word.querySelectorAll<HTMLElement>(".pl__ltr");
    const bar = root.querySelector<HTMLElement>(".pl__bar span");

    const finish = () => { document.documentElement.style.overflow = ""; setDone(true); };
    // Safety: rAF (and GSAP's ticker) pause while the tab is backgrounded, which would otherwise leave the
    // curtain up and scroll locked. This fires regardless, so the page always unlocks.
    const safety = setTimeout(finish, 3800);

    const tl = gsap.timeline({
      defaults: { ease: "power4.out" },
      onComplete: () => { clearTimeout(safety); finish(); },
    });

    tl.set(root, { autoAlpha: 1 });
    tl.fromTo(ltrs, { yPercent: 120 }, { yPercent: 0, duration: 0.9, stagger: { amount: 0.4 } }, 0.15);
    if (bar) tl.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: "power2.inOut" }, 0.2);

    // Fly the word onto the real nav mark, then fade the curtain.
    tl.add(() => {
      const mark = document.querySelector<HTMLElement>(".enav__mark");
      const wr = word.getBoundingClientRect();
      if (mark) {
        const mr = mark.getBoundingClientRect();
        const scale = mr.height / wr.height;
        gsap.to(word, { x: mr.left - wr.left, y: mr.top - wr.top, scale, transformOrigin: "top left", duration: 0.9, ease: "power4.inOut" });
      } else {
        gsap.to(word, { y: -wr.top * 0.7, scale: 0.4, transformOrigin: "top left", duration: 0.9, ease: "power4.inOut" });
      }
    }, 1.35);
    tl.to(root, { autoAlpha: 0, duration: 0.7, ease: "power2.inOut" }, 1.95);

    return () => { clearTimeout(safety); tl.kill(); document.documentElement.style.overflow = ""; };
  }, []);

  if (done) return null;

  return (
    <div className="pl" ref={rootRef} aria-hidden="true">
      <div className="pl__word" ref={wordRef}>
        {WORD.split("").map((ch, i) => (
          <span className="pl__ltrwrap" key={i}><span className="pl__ltr">{ch === " " ? " " : ch}</span></span>
        ))}
      </div>
      <div className="pl__bar"><span /></div>
    </div>
  );
}
