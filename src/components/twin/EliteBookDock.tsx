"use client";

import { useEffect, useState } from "react";

/**
 * Mobile-only booking dock for the listing detail pages: a "Book a viewing" pill pinned to the bottom-centre
 * that follows the scroll, then retires once the real booking card (which sits right after the mortgage
 * estimate) comes into view. Tapping it jumps down to that form. Hidden on desktop, where the card is sticky.
 */
export function EliteBookDock() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Show while the booking card (which sits right after the mortgage estimate) is still below the lower
    // third of the screen; retire it once the reader scrolls down to the card itself.
    const onScroll = () => {
      const card = document.getElementById("tour-title");
      if (!card) return;
      setShow(card.getBoundingClientRect().top > window.innerHeight * 0.67);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <a className={`ldock${show ? " is-on" : ""}`} href="#tour-title">Book a viewing</a>
  );
}
