// GSAP is loaded on demand, a beat after the window load event, so it sits outside the first paint's
// network entirely: the hero's load motion is CSS, and scroll reveals attach once the page has settled.
// Anything already on screen when it attaches is left alone (see `alreadyInView` in the reveal components).
let afterLoad: Promise<void> | null = null;
function whenLoaded() {
  if (!afterLoad)
    afterLoad = new Promise((resolve) => {
      const settle = () => window.setTimeout(resolve, 700); // a beat after load, well clear of the first paint's network
      if (typeof document === "undefined" || document.readyState === "complete") settle();
      else window.addEventListener("load", settle, { once: true });
    });
  return afterLoad;
}

export async function loadGsap() {
  await whenLoaded();
  const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
  gsap.registerPlugin(ScrollTrigger);
  return { gsap, ScrollTrigger };
}
