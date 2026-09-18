"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/data";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { SectionHeading } from "./SectionHeading";

export function Projects() {
  return (
    <section id="projects" className="section-pad" style={{ background: "var(--bg-elev)" }}>
      <div className="container-x">
        <SectionHeading
          kicker="Projects"
          title="Selected work"
          desc="For each one: the constraint, what I did about it, and the outcome."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid md:grid-cols-3 gap-6"
        >
          {projects.map((p) => (
            <motion.article key={p.title} variants={fadeUp} className="card p-6 sm:p-7 flex flex-col">
              <span
                className="text-[11.5px] font-bold uppercase tracking-[0.1em] w-fit rounded-full px-3 py-1"
                style={{ background: "var(--emerald-soft)", color: "var(--emerald)" }}
              >
                {p.tag}
              </span>
              <h3 className="mt-4 font-bold text-[19px]">{p.title}</h3>

              <div className="mt-5 flex flex-col gap-4 flex-1">
                <div>
                  <div className="text-[11.5px] font-bold uppercase tracking-wide" style={{ color: "var(--text-faint)" }}>
                    Challenge
                  </div>
                  <p className="mt-1.5 text-[14px] leading-relaxed" style={{ color: "var(--text-dim)" }}>
                    {p.challenge}
                  </p>
                </div>
                <div>
                  <div className="text-[11.5px] font-bold uppercase tracking-wide" style={{ color: "var(--text-faint)" }}>
                    Action
                  </div>
                  <p className="mt-1.5 text-[14px] leading-relaxed" style={{ color: "var(--text-dim)" }}>
                    {p.action}
                  </p>
                </div>
                <div>
                  <div className="text-[11.5px] font-bold uppercase tracking-wide" style={{ color: "var(--amber)" }}>
                    Result
                  </div>
                  <p className="mt-1.5 text-[14px] leading-relaxed font-medium">{p.result}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 pt-5 border-t" style={{ borderColor: "var(--line)" }}>
                {p.stack.map((s) => (
                  <span key={s} className="chip chip-sm">
                    {s}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
