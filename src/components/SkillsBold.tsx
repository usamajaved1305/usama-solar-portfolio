"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Box,
  CalendarClock,
  ChartColumn,
  ChartGantt,
  CheckCircle2,
  Code,
  Database,
  DraftingCompass,
  HardHat,
  House,
  Ruler,
  Sheet,
  ShieldCheck,
  SolarPanel,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { competencies } from "@/lib/data";
import type { MediaItem } from "@/lib/media";
import { toolTiles } from "@/lib/demo";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { Popover } from "./Popover";
import { SectionHeading } from "./SectionHeading";
import { buildToolArtifacts } from "./ToolArtifacts";

const AREA_ICONS: Record<string, LucideIcon> = {
  "hard-hat": HardHat,
  ruler: Ruler,
  "calendar-clock": CalendarClock,
  wallet: Wallet,
  "check-circle": CheckCircle2,
  "shield-check": ShieldCheck,
};

const TOOL_ICONS: Record<string, LucideIcon> = {
  "Primavera P6": ChartGantt,
  "MS Project": ChartGantt,
  "Advanced Excel": Sheet,
  "Power BI": ChartColumn,
  SQL: Database,
  Python: Code,
  Helioscope: SolarPanel,
  OpenSolar: House,
  SketchUp: Box,
  AutoCAD: DraftingCompass,
};

// The six areas of work in short form, then one tile per software project.
export function SkillsBold({ toolShots = {} }: { toolShots?: Record<string, MediaItem[]> }) {
  const [open, setOpen] = useState<string | null>(null);
  const artifacts = buildToolArtifacts(toolShots);

  return (
    <section id="skills" className="section-pad">
      <div className="container-x">
        <SectionHeading kicker="Skills" title="What I do on a project" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px overflow-hidden rounded-3xl"
          style={{ background: "var(--line)", border: "1px solid var(--line)" }}
        >
          {competencies.map((c) => {
            const Icon = AREA_ICONS[c.icon] ?? HardHat;
            return (
              <motion.div key={c.title} variants={fadeUp} className="p-6 sm:p-7" style={{ background: "var(--bg-card)" }}>
                <div className="flex items-center gap-3">
                  <Icon size={20} style={{ color: "var(--amber)" }} aria-hidden="true" />
                  <h3 className="font-bold text-[16.5px]">{c.title}</h3>
                </div>
                <p className="mt-3 text-[14px] leading-relaxed" style={{ color: "var(--text-dim)" }}>
                  {c.items.join(" · ")}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-20">
          <h3 className="font-extrabold leading-tight" style={{ fontSize: "clamp(24px, 2.6vw, 32px)" }}>
            Software, with a project to open for each
          </h3>
          <p className="mt-2 text-[15.5px]" style={{ color: "var(--text-dim)" }}>
            Each tile opens the full project.
          </p>

          {/* One grid of ten, design tools first, so the rows always fill: five across on a wide screen, two on a phone. */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-8 grid grid-cols-2 lg:grid-cols-5 gap-3"
          >
            {[...toolTiles].reverse().flatMap((g) =>
              g.tools
                .filter((t) => artifacts[t.tool])
                .map((t) => {
                  const Icon = TOOL_ICONS[t.tool] ?? Box;
                  return (
                    <motion.button
                      key={t.tool}
                      variants={fadeUp}
                      type="button"
                      onClick={() => setOpen(t.tool)}
                      aria-haspopup="dialog"
                      className="tool-tile group card relative flex flex-col p-5 text-left"
                    >
                      <span
                        className="grid h-12 w-12 place-items-center rounded-xl"
                        style={{ background: "var(--amber-soft)", color: "var(--amber)" }}
                      >
                        <Icon size={22} aria-hidden="true" />
                      </span>
                      <ArrowUpRight
                        size={18}
                        aria-hidden="true"
                        className="absolute right-4 top-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        style={{ color: "var(--text-faint)" }}
                      />
                      <span className="mt-4 text-[11px] font-bold uppercase tracking-[0.1em]" style={{ color: "var(--text-faint)" }}>
                        {g.group}
                      </span>
                      <span className="mt-1 block font-bold text-[16px]">{t.tool === "Helioscope" ? "HelioScope" : t.tool}</span>
                      <span className="mt-1 block text-[13.5px] leading-snug" style={{ color: "var(--text-dim)" }}>
                        {t.line}
                      </span>
                    </motion.button>
                  );
                })
            )}
          </motion.div>
        </div>

        {Object.entries(artifacts).map(([name, a]) => (
          <Popover key={name} open={open === name} onClose={() => setOpen(null)} title={a.title} xwide>
            {open === name && a.render()}
          </Popover>
        ))}
      </div>
    </section>
  );
}
