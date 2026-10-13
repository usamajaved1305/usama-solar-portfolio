"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Cpu, LayoutGrid } from "lucide-react";
import { builds } from "@/lib/data";
import type { MediaItem } from "@/lib/media";
import { features, type Feature, type ProjectGallery } from "@/lib/demo";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { Popover } from "./Popover";
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
            Engineering builds
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
            <Popover key={'p-' + f.key} open={project === f.key} onClose={() => setProject(null)} title={f.project!.title} xwide>
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
            alt={f.image.alt}
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
            <img src={f.inset.src} alt={f.inset.alt} loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover" />
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
          <dl className="mt-7 grid grid-cols-3 gap-4 border-t pt-6" style={{ borderColor: "var(--line)" }}>
            {f.figures.map((x) => (
              <div key={x.label}>
                <dd className="font-extrabold text-[20px] sm:text-[22px] leading-tight num" style={{ fontFamily: "var(--font-display)" }}>
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

function Pic({ shot, className = "" }: { shot: { src: string; caption: string }; className?: string }) {
  return (
    <figure className={className}>
      <a href={shot.src} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-xl" style={{ background: "#05080a" }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
        <img src={shot.src} alt={shot.caption} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-[1.03]" />
      </a>
      <figcaption className="mt-2 text-[13px] leading-snug" style={{ color: "var(--text-dim)" }}>
        {shot.caption}
      </figcaption>
    </figure>
  );
}

/** One job in full: the story, the design beside the build, the model views and the site photos. */
function ProjectView({ p }: { p: ProjectGallery }) {
  const head = "mt-8 mb-3 text-[12.5px] font-bold uppercase tracking-[0.12em]";
  return (
    <div className="max-h-[78vh] overflow-y-auto pr-1">
      <div className="space-y-3 text-[15px] leading-relaxed" style={{ color: "var(--text-dim)" }}>
        {p.intro.map((t) => (
          <p key={t}>{t}</p>
        ))}
      </div>

      <h3 className={head} style={{ color: "var(--amber)" }}>Design and build, from the same spot</h3>
      <div className="space-y-5">
        {p.pairs.map((pair) => (
          <div key={pair.built.src} className="grid gap-3 sm:grid-cols-2">
            <Pic shot={pair.design} />
            <Pic shot={pair.built} />
          </div>
        ))}
      </div>

      <h3 className={head} style={{ color: "var(--amber)" }}>The SketchUp model</h3>
      <div className="grid gap-3 sm:grid-cols-3">
        {p.model.map((s) => (
          <Pic key={s.src} shot={s} />
        ))}
      </div>

      <h3 className={head} style={{ color: "var(--amber)" }}>On site</h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {p.site.map((s) => (
          <Pic key={s.src} shot={s} />
        ))}
      </div>
      <p className="mt-6 text-[12.5px]" style={{ color: "var(--text-faint)" }}>
        Click any picture to open it full size.
      </p>
    </div>
  );
}
