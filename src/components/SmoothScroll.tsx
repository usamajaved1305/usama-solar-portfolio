"use client";

import { useEffect } from "react";

// Weighted easing on wheel and anchor jumps. Skipped for touch (native scrolling is already smooth there)
// and for visitors who ask for reduced motion.
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;

    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let frame = 0;
    let cancelled = false;

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      const instance = new Lenis({
        duration: 1.05,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        wheelMultiplier: 0.9,
        anchors: { offset: -84 },
      });
      lenis = instance;
      const loop = (time: number) => {
        instance.raf(time);
        frame = requestAnimationFrame(loop);
      };
      frame = requestAnimationFrame(loop);
      document.documentElement.classList.add("lenis-on");
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      lenis?.destroy();
      document.documentElement.classList.remove("lenis-on");
    };
  }, []);

  return null;
}
