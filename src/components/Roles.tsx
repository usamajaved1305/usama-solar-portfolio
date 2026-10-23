"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarClock, Ruler, HardHat, ChartColumn, ArrowRight, type LucideIcon } from "lucide-react";
import { roles, PROOF_LABELS, type Role } from "@/lib/roles";
import type { MediaItem } from "@/lib/media";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { ToolProof } from "./ToolProof";

export const ROLE_ICONS: Record<Role["icon"], LucideIcon> = {
  calendar: CalendarClock,
  ruler: Ruler,
  "hard-hat": HardHat,
  chart: ChartColumn,
};

function Line({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <p className="text-[14.5px] leading-relaxed" style={{ color: "var(--text-dim)" }}>
      <span className="font-bold" style={{ color: "var(--text)" }}>
        {label}:
      </span>{" "}
      {children}
    </p>
  );
}

export function Roles({ toolShots = {} }: { toolShots?: Record<string, MediaItem[]> }) {
  return (
    <section id="roles" className="section-pad">
      <div className="container-x">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} className="max-w-3xl mb-12">
          <span className="text-[12.5px] font-bold uppercase tracking-[0.14em]" style={{ color: "var(--amber)" }}>
            Roles I&apos;m targeting
          </span>
          <h2 className="mt-3 font-extrabold leading-[1.08]" style={{ fontSize: "clamp(30px, 4.2vw, 46px)" }}>
            The roles I&apos;m applying for
          </h2>
          <p className="mt-4 text-[16.5px] leading-relaxed" style={{ color: "var(--text-dim)" }}>
            Each card shows where I fit, the record behind it and two projects you can open. The role pages have the
            full detail, ready to send with an application.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid lg:grid-cols-2 gap-5"
        >
          {roles.map((r) => {
            const Icon = ROLE_ICONS[r.icon];
            return (
              <motion.article
                key={r.slug}
                variants={fadeUp}
                className="card relative overflow-hidden p-6 sm:p-7 pl-7 sm:pl-8 flex flex-col"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 bottom-0 w-[3px]"
                  style={{ background: "linear-gradient(180deg, var(--amber), var(--emerald))" }}
                />
                <h3 className="flex items-center gap-2.5 font-bold text-[19px] leading-snug">
                  <Icon size={20} aria-hidden="true" style={{ color: "var(--amber)" }} className="shrink-0" />
                  {r.title}
                </h3>

                <div className="mt-4 space-y-3 flex-1">
                  <Line label="Where I fit">{r.fit}</Line>
                  <Line label="Track record">{r.record}</Line>
                  <Line label="Tools">{r.tools.join(", ")}</Line>
                  <div>
                    <p className="text-[14.5px] font-bold">Portfolio projects:</p>
                    <div className="mt-2">
                      <ToolProof tools={r.homeProof} toolShots={toolShots} labels={PROOF_LABELS} list />
                    </div>
                  </div>
                </div>

                <Link
                  href={`/roles/${r.slug}`}
                  className="mt-5 inline-flex min-h-10 w-fit items-center gap-1.5 text-[14px] font-semibold underline underline-offset-4 hover:no-underline"
                >
                  The {r.title} page <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
