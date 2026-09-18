"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/data";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { SectionHeading } from "./SectionHeading";

export function Experience() {
  return (
    <section id="experience" className="section-pad">
      <div className="container-x">
        <SectionHeading
          kicker="Experience"
          title="From site survey to client handover"
          desc="Roughly 70% residential and 30% commercial work across on-grid, hybrid and off-grid systems, from small domestic installs to factory rooftops and a 36 project, 790 kWp year."
        />

        <div className="relative">
          <div
            className="absolute left-[7px] top-2 bottom-2 w-px hidden sm:block"
            style={{ background: "var(--line)" }}
          />
          <div className="flex flex-col gap-10">
            {experience.map((job, i) => (
              <motion.div
                key={job.role + job.period}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                custom={i}
                className="relative sm:pl-10"
              >
                <span
                  className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full hidden sm:block"
                  style={{ background: "var(--amber)", boxShadow: "0 0 0 4px var(--bg)" }}
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
                    <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
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

                  <ul className="mt-5 space-y-2.5">
                    {job.highlights.map((h) => (
                      <li
                        key={h}
                        className="text-[14.5px] leading-relaxed pl-4 relative"
                        style={{ color: "var(--text-dim)" }}
                      >
                        <span
                          className="absolute left-0 top-[9px] h-1 w-1 rounded-full"
                          style={{ background: "var(--text-faint)" }}
                        />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
