"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { experience } from "@/lib/data";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { SectionHeading } from "./SectionHeading";

const METRIC_COLS: Record<number, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
};

export function Experience() {
  return (
    <section id="experience" className="section-pad">
      <div className="container-x">
        <SectionHeading
          kicker="Experience"
          title="From site survey to client handover"
          desc="Roughly 70% residential and 30% commercial work across on-grid, hybrid and off-grid systems, from small domestic systems to commercial rooftops."
        />

        <div className="relative">
          <div
            className="absolute left-[7px] top-2 bottom-2 w-px hidden sm:block"
            style={{ background: "var(--line)" }}
            aria-hidden="true"
          />
          <div className="flex flex-col gap-10">
            {experience.map((job) => (
              <motion.div
                key={job.role + job.period}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                className="relative sm:pl-10"
              >
                <span
                  className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full hidden sm:block"
                  style={{ background: "var(--btn-bg)", boxShadow: "0 0 0 4px var(--bg)" }}
                  aria-hidden="true"
                />

                <div className="card p-6 sm:p-7">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-bold text-[19px]">{job.role}</h3>
                    <span className="text-[13.5px] font-semibold" style={{ color: "var(--text-faint)" }}>
                      {job.period}
                    </span>
                  </div>
                  <div className="mt-1 text-[14.5px] font-medium" style={{ color: "var(--amber)" }}>
                    {job.company}
                  </div>

                  {job.metrics.length > 0 && (
                    <div className={`mt-5 grid grid-cols-2 ${METRIC_COLS[job.metrics.length]} gap-3`}>
                      {job.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="rounded-xl px-3.5 py-3"
                          style={{ background: "var(--bg-elev)", border: "1px solid var(--line)" }}
                        >
                          <div className="font-bold text-[16px] num">{m.value}</div>
                          <div className="text-[12px] mt-0.5" style={{ color: "var(--text-faint)" }}>
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <Highlights items={job.highlights} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** The first point stays visible; the rest open on request so the section reads at a glance. */
function Highlights({ items }: { items: string[] }) {
  const [open, setOpen] = useState(false);
  const shown = open ? items : items.slice(0, 1);
  return (
    <div className="mt-5">
      <ul className="space-y-2.5">
        {shown.map((h) => (
          <li key={h} className="text-[14.5px] leading-relaxed pl-4 relative" style={{ color: "var(--text-dim)" }}>
            <span
              className="absolute left-0 top-[9px] h-1 w-1 rounded-full"
              style={{ background: "var(--text-faint)" }}
              aria-hidden="true"
            />
            {h}
          </li>
        ))}
      </ul>
      {items.length > 1 && (
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="mt-3 inline-flex items-center gap-1.5 text-[13.5px] font-semibold"
          style={{ color: "var(--amber)" }}
        >
          {open ? "Show less" : `Show all ${items.length} points`}
          <ChevronDown size={15} aria-hidden="true" className={`transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
      )}
    </div>
  );
}
