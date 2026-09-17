import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** True when the element's top is already above the given viewport fraction: it is on screen, do not animate it in. */
export function alreadyInView(el: Element, fraction = 0.85) {
  if (typeof window === "undefined") return false;
  return el.getBoundingClientRect().top < window.innerHeight * fraction;
}
