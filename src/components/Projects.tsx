"use client";

import { motion } from "framer-motion";
import { Cpu } from "lucide-react";
import { projects, builds } from "@/lib/data";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { SectionHeading } from "./SectionHeading";

const STEPS = [
  { key: "challenge", label: "Challenge" },
  { key: "action", label: "Action" },
  { key: "result", label: "Result" },
] as const;

export function Projects() {
  return (
    <section id="projects" className="section-pad" style={{ background: "var(--bg-elev)" }}>
      <div className="container-x">
        <SectionHeading
          kicker="Projects"
          title="Selected work"
          desc="Three situations from site: the problem, what I did and how it turned out."
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
              <h3 className="mt-4 font-bold text-[19px] leading-snug">{p.title}</h3>

              <div className="mt-5 flex flex-col gap-4 flex-1">
                {STEPS.map((s) => (
                  <div key={s.key}>
                    <div
                      className="text-[11.5px] font-bold uppercase tracking-wide"
                      style={{ color: s.key === "result" ? "var(--amber)" : "var(--text-faint)" }}
                    >
                      {s.label}
                    </div>
                    <p
                      className={`mt-1.5 text-[14px] leading-relaxed ${s.key === "result" ? "font-medium" : ""}`}
                      style={{ color: s.key === "result" ? "var(--text)" : "var(--text-dim)" }}
                    >
                      {p[s.key]}
                    </p>
                  </div>
                ))}
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

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12"
        >
          <h3 className="text-[13px] font-bold uppercase tracking-[0.1em]" style={{ color: "var(--text-faint)" }}>
            Engineering builds
          </h3>
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            {builds.map((b) => (
              <div key={b.title} className="card p-5 flex gap-4 items-start">
                <div
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
                  style={{ background: "var(--amber-soft)", color: "var(--amber)" }}
                >
                  <Cpu size={18} aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-bold text-[15.5px]">{b.title}</h4>
                  <p className="mt-1 text-[14px] leading-relaxed" style={{ color: "var(--text-dim)" }}>
                    {b.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
