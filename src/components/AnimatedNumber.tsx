"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

// Renders the final value on the server so crawlers, link previews and no-JS visitors never see "0".
export function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion) return;
    const alreadyVisible = el.getBoundingClientRect().top < window.innerHeight;
    if (!alreadyVisible) {
      setDisplay(0);
      setArmed(true);
    }
  }, [reduceMotion]);

  useEffect(() => {
    if (!armed || !inView) return;
    const duration = 1200;
    const start = performance.now();
    const isDecimal = value % 1 !== 0;
    let frame: number;
    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1);
      const current = value * (1 - Math.pow(1 - t, 3));
      setDisplay(isDecimal ? Math.round(current * 10) / 10 : Math.round(current));
      if (t < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [armed, inView, value]);

  return (
    <span ref={ref} className="num">
      <span className="sr-only">
        {value}
        {suffix}
      </span>
      <span aria-hidden="true">
        {display}
        {suffix}
      </span>
    </span>
  );
}
