"use client";

import { motion } from "framer-motion";
import { Cpu, CalendarClock, Users } from "lucide-react";
import { projects, builds } from "@/lib/data";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { SectionHeading } from "./SectionHeading";
import { workThumbSrc } from "@/lib/demo";

/** A picture or a headline figure on top of each story, so the card reads before the text does. */
function CardVisual({ tag }: { tag: string }) {
  if (tag === "Design under constraint") {
    return (
      <figure className="relative -mx-6 -mt-6 sm:-mx-7 sm:-mt-7 mb-5 overflow-hidden rounded-t-[inherit]">
        {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
        <img src={workThumbSrc("helioscope")} alt="HelioScope layout of the 198 modules on this roof" className="aspect-[16/9] w-full object-cover" loading="lazy" />
        <figcaption className="absolute left-3 bottom-3 rounded-full px-2.5 py-1 text-[11.5px] font-semibold text-white" style={{ background: "rgba(10,15,18,0.72)" }}>
          The layout on this roof, in HelioScope
        </figcaption>
      </figure>
    );
  }
  const figure = tag === "Programme recovery"
    ? { Icon: CalendarClock, value: "2 months", label: "of inverter supply delay re-planned", dots: 0 }
    : { Icon: Users, value: "5 sites", label: "running at once, with crews of up to 40", dots: 5 };
  const { Icon } = figure;
  return (
    <div
      className="-mx-6 -mt-6 sm:-mx-7 sm:-mt-7 mb-5 rounded-t-[inherit] px-6 sm:px-7 flex items-center gap-4 aspect-[16/9]"
      style={{ background: "linear-gradient(135deg, var(--amber-soft), var(--emerald-soft))" }}
    >
      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl" style={{ background: "var(--bg-card)", color: "var(--amber)" }}>
        <Icon size={26} aria-hidden="true" />
      </span>
      <div>
        <div className="font-extrabold leading-none num" style={{ fontSize: "clamp(30px, 3vw, 40px)", fontFamily: "var(--font-display)" }}>
          {figure.value}
        </div>
        <div className="mt-2 text-[13.5px]" style={{ color: "var(--text-dim)" }}>
          {figure.label}
        </div>
        {figure.dots > 0 && (
          <div className="mt-3 flex gap-1.5" aria-hidden="true">
            {Array.from({ length: figure.dots }, (_, i) => (
              <span key={i} className="h-2.5 w-6 rounded-full" style={{ background: "var(--btn-bg)", opacity: 1 - i * 0.12 }} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

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
            <motion.article key={p.title} variants={fadeUp} className="card p-6 sm:p-7 flex flex-col overflow-hidden">
              <CardVisual tag={p.tag} />
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
