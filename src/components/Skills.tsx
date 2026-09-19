"use client";

import { motion } from "framer-motion";
import {
  HardHat,
  Ruler,
  CalendarClock,
  Wallet,
  CheckCircle2,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { competencies, toolCategories } from "@/lib/data";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { SectionHeading } from "./SectionHeading";

const ICONS: Record<string, LucideIcon> = {
  "hard-hat": HardHat,
  ruler: Ruler,
  "calendar-clock": CalendarClock,
  wallet: Wallet,
  "check-circle": CheckCircle2,
  "shield-check": ShieldCheck,
};

export function Skills() {
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
                {cat.tools.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
