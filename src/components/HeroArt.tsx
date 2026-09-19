"use client";

import { motion } from "framer-motion";
import { highlights } from "@/lib/data";

const ARC = "M 40 300 A 220 220 0 0 1 480 300";

type PanelProps = { x: number; y: number; w: number; h: number; skew: number; cols?: number };

function Panel({ x, y, w, h, skew, cols = 6 }: PanelProps) {
  const rows = 3;
  const pts = `${x},${y} ${x + w},${y} ${x + w + skew},${y + h} ${x + skew},${y + h}`;
  const lines = [];
  for (let c = 1; c < cols; c++) {
    const t = c / cols;
    lines.push(
      <line key={`c${c}`} x1={x + w * t} y1={y} x2={x + skew + w * t} y2={y + h} stroke="var(--panel-line)" strokeWidth="1" />
    );
  }
  for (let r = 1; r < rows; r++) {
    const t = r / rows;
    lines.push(
      <line key={`r${r}`} x1={x + skew * t} y1={y + h * t} x2={x + w + skew * t} y2={y + h * t} stroke="var(--panel-line)" strokeWidth="1" />
    );
  }
  return (
    <g>
      <polygon points={pts} fill="url(#panelFill)" stroke="var(--panel-edge)" strokeWidth="1.2" />
      {lines}
      <polygon points={pts} fill="url(#panelGlint)" />
    </g>
  );
}

const CARD_POSITIONS = ["left-0 top-0", "right-0 top-0 text-right"];

export function HeroArt() {
  return (
    <div className="relative w-full max-w-[540px] mx-auto pt-14" aria-hidden="true">
      <svg viewBox="0 0 520 470" className="w-full h-auto block">
        <defs>
          <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--btn-bg)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--btn-bg)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="panelFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--panel-top)" />
            <stop offset="100%" stopColor="var(--panel-bottom)" />
          </linearGradient>
          <linearGradient id="panelGlint" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--btn-bg)" stopOpacity="0.22" />
            <stop offset="45%" stopColor="var(--btn-bg)" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path d={ARC} fill="none" stroke="var(--line-strong)" strokeWidth="1.5" strokeDasharray="4 8" />
        <line x1="20" y1="300" x2="500" y2="300" stroke="var(--line-strong)" strokeWidth="1.2" />

        <g className="sun-orbit">
          <circle r="46" fill="url(#sunGlow)" />
          <circle r="17" fill="var(--btn-bg)" />
        </g>

        <Panel x={70} y={318} w={150} h={58} skew={-26} />
        <Panel x={236} y={318} w={150} h={58} skew={-10} />
        <Panel x={50} y={392} w={170} h={64} skew={-30} />
        <Panel x={236} y={392} w={170} h={64} skew={-12} />
        <Panel x={402} y={318} w={96} h={58} skew={4} cols={3} />
        <Panel x={422} y={392} w={80} h={64} skew={6} cols={3} />
      </svg>

      {highlights.map((h, i) => (
        <motion.div
          key={h.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + i * 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`absolute ${CARD_POSITIONS[i]} rounded-2xl border px-4 py-3 shadow-xl`}
          style={{ background: "var(--nav-bg)", borderColor: "var(--line)", backdropFilter: "blur(10px)" }}
        >
          <div className="text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: "var(--text-faint)" }}>
            {h.label}
          </div>
          <div className="mt-1 font-extrabold text-[18px]" style={{ fontFamily: "var(--font-display)" }}>
            {h.value}
          </div>
          <div className="text-[12.5px]" style={{ color: "var(--text-dim)" }}>
            {h.sub}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
