"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarClock, Ruler, HardHat, ChartColumn, Check, ArrowRight, type LucideIcon } from "lucide-react";
import { roles, type Role } from "@/lib/roles";
import type { MediaItem } from "@/lib/media";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { SectionHeading } from "./SectionHeading";
import { ToolProof } from "./ToolProof";

export const ROLE_ICONS: Record<Role["icon"], LucideIcon> = {
  calendar: CalendarClock,
  ruler: Ruler,
  "hard-hat": HardHat,
  chart: ChartColumn,
};

export function Roles({ toolShots = {} }: { toolShots?: Record<string, MediaItem[]> }) {
  return (
    <section id="roles" className="section-pad">
      <div className="container-x">
        <SectionHeading
          kicker="Roles I'm targeting"
          title="Where I fit"
          desc="Four kinds of solar job. For each one: what Irish employers ask for, what I bring from my work, and portfolio projects I built in the tools those jobs use."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid lg:grid-cols-2 gap-6"
        >
          {roles.map((r) => {
            const Icon = ROLE_ICONS[r.icon];
            return (
              <motion.article key={r.slug} variants={fadeUp} className="card p-6 sm:p-7 flex flex-col">
                <div className="flex items-start gap-4">
                  <div
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-xl"
                    style={{ background: "var(--amber-soft)", color: "var(--amber)" }}
                  >
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[19px] leading-snug">{r.family}</h3>
                    <p className="mt-1 text-[13.5px]" style={{ color: "var(--text-faint)" }}>
                      {r.targets.join(", ")}
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid sm:grid-cols-2 gap-5 flex-1">
                  <div>
                    <div className="text-[11.5px] font-bold uppercase tracking-wide" style={{ color: "var(--text-faint)" }}>
                      What the role asks
                    </div>
                    <ul className="mt-2 space-y-1.5">
                      {r.asks.map((a) => (
                        <li key={a} className="text-[13.5px] leading-relaxed" style={{ color: "var(--text-dim)" }}>
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-[11.5px] font-bold uppercase tracking-wide" style={{ color: "var(--amber)" }}>
                      What I bring
                    </div>
                    <ul className="mt-2 space-y-1.5">
                      {r.highlights.map((b) => (
                        <li key={b} className="flex gap-2 text-[13.5px] leading-relaxed" style={{ color: "var(--text)" }}>
                          <Check size={15} aria-hidden="true" className="mt-[3px] shrink-0" style={{ color: "var(--emerald)" }} />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t flex flex-col gap-4" style={{ borderColor: "var(--line)" }}>
                  <div>
                    <div className="mb-2 text-[11.5px] font-bold uppercase tracking-wide" style={{ color: "var(--text-faint)" }}>
                      Portfolio projects
                    </div>
                    <ToolProof tools={r.proof} toolShots={toolShots} />
                  </div>
                  <Link
                    href={`/roles/${r.slug}`}
                    className="inline-flex w-fit items-center gap-1.5 text-[14px] font-semibold underline underline-offset-4 hover:no-underline"
                    style={{ color: "var(--text)" }}
                  >
                    Open the {r.family.toLowerCase()} page <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
