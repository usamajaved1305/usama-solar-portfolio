"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Cpu, LayoutGrid } from "lucide-react";
import { builds } from "@/lib/data";
import type { MediaItem } from "@/lib/media";
import { features, type Feature } from "@/lib/demo";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { Popover } from "./Popover";
import { ProjectView } from "./ProjectView";
import { SectionHeading } from "./SectionHeading";
import { buildToolArtifacts } from "./ToolArtifacts";

// Four projects told with one big picture each, alternating sides.
export function FeaturedProjects({ toolShots = {} }: { toolShots?: Record<string, MediaItem[]> }) {
  const [open, setOpen] = useState<string | null>(null);
  const [project, setProject] = useState<string | null>(null);
  const artifacts = buildToolArtifacts(toolShots);

  return (
    <section id="projects" className="section-pad">
      <div className="container-x">
        <SectionHeading kicker="Projects" title="Selected work" desc="Installations from site, and the design work behind them." />

        <div className="flex flex-col gap-24 lg:gap-32">
          {features.map((f, i) => (
            <FeatureBlock
              key={f.key}
              f={f}
              index={i}
              onOpen={f.tool && artifacts[f.tool] ? () => setOpen(f.tool!) : undefined}
              onProject={f.project ? () => setProject(f.key) : undefined}
            />
          ))}
        </div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} className="mt-24">
          <h3 className="text-[13px] font-bold uppercase tracking-[0.12em]" style={{ color: "var(--text-faint)" }}>
            University projects, Air University
          </h3>
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            {builds.map((b) => (
              <div key={b.title} className="card p-5 flex gap-4 items-start">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl" style={{ background: "var(--amber-soft)", color: "var(--amber)" }}>
                  <Cpu size={18} aria-hidden="true" />
                </span>
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

        {features
          .filter((f) => f.project)
          .map((f) => (
            <Popover key={"p-" + f.key} open={project === f.key} onClose={() => setProject(null)} title={f.project!.title} xwide>
              {project === f.key && <ProjectView p={f.project!} />}
            </Popover>
          ))}

        {features
          .filter((f) => f.tool && artifacts[f.tool])
          .map((f) => (
            <Popover key={f.key} open={open === f.tool} onClose={() => setOpen(null)} title={artifacts[f.tool!].title} xwide>
              {open === f.tool && artifacts[f.tool!].render()}
            </Popover>
          ))}
      </div>
    </section>
  );
}

function FeatureBlock({ f, index, onOpen, onProject }: { f: Feature; index: number; onOpen?: () => void; onProject?: () => void }) {
  const flip = index % 2 === 1;
  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14"
    >
      <div className={`relative lg:col-span-7 ${flip ? "lg:order-2" : ""} ${f.inset ? "pb-10 sm:pb-12" : ""}`}>
        <div
          className="img-zoom overflow-hidden rounded-3xl"
          style={{ background: f.image.light ? "#ffffff" : "var(--bg-card)", boxShadow: "0 40px 80px -40px rgba(0,0,0,0.7)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
          <img
            src={f.image.src}
            srcSet={f.image.small ? `${f.image.small.src} ${f.image.small.w}w, ${f.image.src} ${f.image.w}w` : undefined}
            sizes="(min-width: 1280px) 700px, (min-width: 1024px) 58vw, 100vw"
            alt={f.image.alt}
            width={f.image.w}
            height={f.image.h}
            loading="lazy"
            decoding="async"
            className={`aspect-[4/3] w-full ${f.image.light ? "object-contain p-6" : "object-cover"}`}
          />
        </div>
        {f.inset && (
          <figure
            className={`absolute bottom-0 w-[44%] overflow-hidden rounded-2xl ${flip ? "left-4 sm:left-6" : "right-4 sm:right-6"}`}
            style={{ border: "4px solid var(--bg)", boxShadow: "0 24px 48px -16px rgba(0,0,0,0.7)", background: "var(--bg-card)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
            <img
              src={f.inset.src}
              srcSet={f.inset.small ? `${f.inset.small.src} ${f.inset.small.w}w, ${f.inset.src} ${f.inset.w}w` : undefined}
              sizes="(min-width: 1280px) 310px, (min-width: 1024px) 26vw, 44vw"
              alt={f.inset.alt}
              width={f.inset.w}
              height={f.inset.h}
              loading="lazy"
              decoding="async"
              className="aspect-[16/10] w-full object-cover"
            />
            <figcaption
              className="absolute left-2 top-2 rounded-full px-2.5 py-1 text-[11.5px] font-semibold text-white"
              style={{ background: "rgba(5,9,12,0.75)" }}
            >
              {f.inset.label}
            </figcaption>
          </figure>
        )}
      </div>

      <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <div className="flex items-center gap-3">
          <span className="font-extrabold text-[15px] num" style={{ color: "var(--amber)", fontFamily: "var(--font-display)" }}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="h-px w-10" style={{ background: "var(--line-strong)" }} aria-hidden="true" />
          <span className="text-[12px] font-bold uppercase tracking-[0.12em]" style={{ color: "var(--text-faint)" }}>
            {f.tag}
          </span>
        </div>
        <h3 className="mt-4 font-extrabold leading-[1.08]" style={{ fontSize: "clamp(28px, 3.2vw, 42px)" }}>
          {f.title}
        </h3>
        <p className="mt-4 text-[16.5px] leading-relaxed" style={{ color: "var(--text-dim)" }}>
          {f.text}
        </p>

        {f.figures && (
          <dl className="mt-7 grid gap-x-5 gap-y-4 border-t pt-6" style={{ borderColor: "var(--line)", gridTemplateColumns: "repeat(3, auto)" }}>
            {f.figures.map((x) => (
              <div key={x.label}>
                <dd className="whitespace-nowrap font-extrabold text-[19px] sm:text-[22px] leading-tight num" style={{ fontFamily: "var(--font-display)" }}>
                  {x.value}
                </dd>
                <dt className="mt-1 text-[12.5px] leading-snug" style={{ color: "var(--text-faint)" }}>
                  {x.label}
                </dt>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-6 flex flex-wrap gap-2">
          {f.chips.map((c) => (
            <span key={c} className="chip chip-sm">
              {c}
            </span>
          ))}
        </div>

        {onProject && (
          <button
            type="button"
            onClick={onProject}
            aria-haspopup="dialog"
            className="mt-8 inline-flex items-center gap-2 rounded-full px-5 py-3 text-[14.5px] font-semibold transition-transform hover:-translate-y-0.5"
            style={{ background: "var(--btn-bg)", color: "var(--btn-fg)" }}
          >
            <LayoutGrid size={16} aria-hidden="true" /> View the full project
          </button>
        )}

        {onOpen && (
          <button
            type="button"
            onClick={onOpen}
            aria-haspopup="dialog"
            className="mt-8 inline-flex items-center gap-2 rounded-full px-5 py-3 text-[14.5px] font-semibold transition-transform hover:-translate-y-0.5"
            style={{ background: "var(--btn-bg)", color: "var(--btn-fg)" }}
          >
            {f.toolLabel} <ArrowUpRight size={16} aria-hidden="true" />
          </button>
        )}
      </div>
    </motion.article>
  );
}
