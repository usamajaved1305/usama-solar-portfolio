"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  HardHat,
  Ruler,
  CalendarClock,
  Wallet,
  CheckCircle2,
  ShieldCheck,
  ChartGantt,
  Sheet,
  ChartColumn,
  Database,
  Code,
  SolarPanel,
  House,
  Box,
  DraftingCompass,
  BatteryCharging,
  type LucideIcon,
} from "lucide-react";
import { competencies, toolCategories } from "@/lib/data";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { Popover } from "./Popover";
import { SectionHeading } from "./SectionHeading";
import { buildToolArtifacts, type ToolArtifact } from "./ToolArtifacts";
import type { MediaItem } from "@/lib/media";

const ARTIFACT_ICONS: Record<ToolArtifact["icon"], LucideIcon> = {
  gantt: ChartGantt,
  sheet: Sheet,
  chart: ChartColumn,
  db: Database,
  code: Code,
  solar: SolarPanel,
  home: House,
  model: Box,
  draft: DraftingCompass,
  battery: BatteryCharging,
};

const ICONS: Record<string, LucideIcon> = {
  "hard-hat": HardHat,
  ruler: Ruler,
  "calendar-clock": CalendarClock,
  wallet: Wallet,
  "check-circle": CheckCircle2,
  "shield-check": ShieldCheck,
};

export function Skills({ toolShots = {} }: { toolShots?: Record<string, MediaItem[]> }) {
  const [openTool, setOpenTool] = useState<string | null>(null);
  const toolArtifacts = buildToolArtifacts(toolShots);

  return (
    <section id="skills" className="section-pad">
      <div className="container-x">
        <SectionHeading
          kicker="Core Competencies"
          title="What I do on a project"
          desc="Six areas that cover the job from crew allocation to cost control."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {competencies.map((c) => {
            const Icon = ICONS[c.icon] ?? HardHat;
            return (
              <motion.div key={c.title} variants={fadeUp} className="card p-6">
                <div
                  className="grid h-11 w-11 place-items-center rounded-xl"
                  style={{ background: "var(--amber-soft)", color: "var(--amber)" }}
                >
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 font-bold text-[16.5px]">{c.title}</h3>
                <ul className="mt-3 space-y-2">
                  {c.items.map((it) => (
                    <li key={it} className="text-[13.5px] leading-relaxed" style={{ color: "var(--text-dim)" }}>
                      {it}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[3fr_2fr]">
          {toolCategories.map((cat) => (
            <div key={cat.title}>
              <h3 className="text-[13px] font-bold uppercase tracking-[0.1em]" style={{ color: "var(--text-faint)" }}>
                {cat.title}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {cat.tools.map((t) => {
                  const artifact = toolArtifacts[t];
                  if (!artifact) {
                    return (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    );
                  }
                  const ArtifactIcon = ARTIFACT_ICONS[artifact.icon];
                  return (
                    <button
                      key={t}
                      type="button"
                      className="chip chip-action"
                      aria-haspopup="dialog"
                      title={`Open the ${t} project`}
                      onClick={() => setOpenTool(t)}
                    >
                      {t}
                      <ArtifactIcon size={14} aria-hidden="true" style={{ color: "var(--amber)" }} />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-[13px]" style={{ color: "var(--text-faint)" }}>
          Highlighted tools open the project I built with them.
        </p>

        {Object.entries(toolArtifacts).map(([name, artifact]) => (
          <Popover key={name} open={openTool === name} onClose={() => setOpenTool(null)} title={artifact.title} xwide>
            {openTool === name && artifact.render()}
          </Popover>
        ))}
      </div>
    </section>
  );
}
