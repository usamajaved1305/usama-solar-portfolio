"use client";

import { motion } from "framer-motion";
import { highlights } from "@/lib/data";

const HORIZON = 300;

type PanelSpec = { x: number; y: number; w: number; h: number; skew: number; cols: number };

// Two rows of modules in loose perspective: the back row sits higher and smaller.
const PANELS: PanelSpec[] = [
  { x: 78, y: 300, w: 132, h: 50, skew: -22, cols: 5 },
  { x: 226, y: 300, w: 132, h: 50, skew: -8, cols: 5 },
  { x: 374, y: 300, w: 116, h: 50, skew: 6, cols: 4 },
  { x: 46, y: 372, w: 158, h: 60, skew: -28, cols: 6 },
  { x: 222, y: 372, w: 158, h: 60, skew: -10, cols: 6 },
  { x: 398, y: 372, w: 132, h: 60, skew: 8, cols: 5 },
];

function panelPoints({ x, y, w, h, skew }: PanelSpec) {
  return `${x},${y} ${x + w},${y} ${x + w + skew},${y + h} ${x + skew},${y + h}`;
}

function Cells({ x, y, w, h, skew, cols }: PanelSpec) {
  const lines = [];
  for (let c = 1; c < cols; c++) {
    const t = c / cols;
    lines.push(
      <line key={`c${c}`} x1={x + w * t} y1={y} x2={x + skew + w * t} y2={y + h} stroke="var(--panel-line)" strokeWidth="0.9" />
    );
  }
  for (let r = 1; r < 3; r++) {
    const t = r / 3;
    lines.push(
      <line key={`r${r}`} x1={x + skew * t} y1={y + h * t} x2={x + w + skew * t} y2={y + h * t} stroke="var(--panel-line)" strokeWidth="0.9" />
    );
  }
  return <g>{lines}</g>;
}

export function HeroArt() {
  return (
    <div className="relative w-full max-w-[540px] mx-auto pt-14">
      <svg viewBox="0 0 520 470" className="w-full h-auto block" aria-hidden="true">
        <defs>
          <clipPath id="sceneClip">
            <rect x="8" y="8" width="504" height="454" rx="22" />
          </clipPath>

          <linearGradient id="skyDay" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--sky-top)" />
            <stop offset="100%" stopColor="var(--sky-bottom)" />
          </linearGradient>
          <linearGradient id="skyDusk" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--dusk-top)" />
            <stop offset="100%" stopColor="var(--dusk-bottom)" />
          </linearGradient>

          <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--btn-bg)" stopOpacity="0.85" />
            <stop offset="55%" stopColor="var(--btn-bg)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--btn-bg)" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="panelFill" x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0%" stopColor="var(--panel-top)" />
            <stop offset="100%" stopColor="var(--panel-bottom)" />
          </linearGradient>
          <linearGradient id="panelLit" x1="0" y1="0" x2="0.6" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
            <stop offset="45%" stopColor="var(--btn-bg)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--btn-bg)" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="groundLight" cx="50%" cy="0%" r="75%">
            <stop offset="0%" stopColor="var(--btn-bg)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--btn-bg)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g clipPath="url(#sceneClip)">
          <rect x="0" y="0" width="520" height={HORIZON} fill="url(#skyDay)" />
          <rect className="sky-dusk" x="0" y="0" width="520" height={HORIZON} fill="url(#skyDusk)" />

          <g className="sun-orbit">
            <circle className="sun-glow" r="58" fill="url(#sunGlow)" />
            <circle r="16" fill="var(--btn-bg)" />
          </g>

          <rect x="0" y={HORIZON} width="520" height={470 - HORIZON} fill="var(--ground)" />
          <rect className="ground-light" x="0" y={HORIZON} width="520" height={470 - HORIZON} fill="url(#groundLight)" />
          <line x1="0" y1={HORIZON} x2="520" y2={HORIZON} stroke="var(--line-strong)" strokeWidth="1" />

          <g className="panel-shadows">
            {PANELS.map((p) => (
              <polygon
                key={`s${p.x}-${p.y}`}
                points={panelPoints({ ...p, y: p.y + p.h - 4, h: 16, skew: p.skew * 0.5 })}
                fill="var(--panel-shadow)"
              />
            ))}
          </g>

          {PANELS.map((p) => (
            <g key={`p${p.x}-${p.y}`}>
              <polygon points={panelPoints(p)} fill="url(#panelFill)" stroke="var(--panel-edge)" strokeWidth="1.1" />
              <Cells {...p} />
              <polygon className="panel-lit" points={panelPoints(p)} fill="url(#panelLit)" />
            </g>
          ))}
        </g>
      </svg>

      {highlights.map((h, i) => (
        <motion.div
          key={h.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + i * 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`absolute ${i === 0 ? "left-0 top-0" : "right-0 top-0 text-right"} rounded-2xl border px-4 py-3 shadow-xl`}
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
