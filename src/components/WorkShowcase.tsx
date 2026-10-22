"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { MediaItem } from "@/lib/media";
import { workCards, workThumbSrc } from "@/lib/demo";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { Popover } from "./Popover";
import { SectionHeading } from "./SectionHeading";
import { buildToolArtifacts } from "./ToolArtifacts";

const KIND_STYLE = {
  Design: { background: "rgba(242, 169, 59, 0.92)", color: "#1a1206" },
  Planning: { background: "rgba(91, 147, 224, 0.92)", color: "#06121f" },
  Data: { background: "rgba(52, 211, 153, 0.92)", color: "#04170f" },
} as const;

export function WorkShowcase({ toolShots = {} }: { toolShots?: Record<string, MediaItem[]> }) {
  const [open, setOpen] = useState<string | null>(null);
  const artifacts = buildToolArtifacts(toolShots);
  const cards = workCards.filter((c) => artifacts[c.tool]);

  return (
    <section id="work" className="section-pad">
      <div className="container-x">
        <SectionHeading
          kicker="Work"
          title="Projects you can open"
          desc="Designs, programmes and reports I built in the tools a project team uses. Click any picture to open the full project."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {cards.map((c) => (
            <motion.button
              key={c.tool}
              type="button"
              variants={fadeUp}
              onClick={() => setOpen(c.tool)}
              aria-haspopup="dialog"
              className={`img-zoom group card overflow-hidden text-left flex flex-col ${c.big ? "lg:col-span-2" : ""}`}
            >
              <div
                className={`relative flex-1 overflow-hidden ${c.big ? "aspect-[16/8]" : "aspect-[16/10]"}`}
                style={{ background: "var(--bg-card-hover)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
                <img
                  src={workThumbSrc(c.thumb)}
                  alt={`${c.tool}: ${c.title}`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
                <span
                  className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.08em]"
                  style={KIND_STYLE[c.kind]}
                >
                  {c.kind}
                </span>
              </div>
              <div className="p-5 flex items-start justify-between gap-4">
                <div>
                  <div className="text-[13px] font-bold" style={{ color: "var(--amber)" }}>
                    {c.tool}
                  </div>
                  <div className="mt-1 font-semibold text-[15.5px] leading-snug">{c.title}</div>
                </div>
                <span
                  className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  style={{ borderColor: "var(--line-strong)", color: "var(--text-dim)" }}
                  aria-hidden="true"
                >
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {cards.map((c) => (
          <Popover key={c.tool} open={open === c.tool} onClose={() => setOpen(null)} title={artifacts[c.tool].title} xwide>
            {open === c.tool && artifacts[c.tool].render()}
          </Popover>
        ))}
      </div>
    </section>
  );
}
