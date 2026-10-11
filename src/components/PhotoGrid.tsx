"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Images } from "lucide-react";
import { SITE_GROUPS, bestPhotos, sitePhotos, sitePhotoSrc, siteThumbSrc } from "@/lib/demo";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { Popover } from "./Popover";
import { SectionHeading } from "./SectionHeading";

const BEST = bestPhotos.map((slug) => sitePhotos.find((p) => p.slug === slug)!).filter(Boolean);

// Every photo for the "see all" viewer: the best eight first, then the rest grouped.
const ALL = [
  ...BEST,
  ...SITE_GROUPS.flatMap((g) => sitePhotos.filter((p) => p.group === g && !bestPhotos.includes(p.slug))),
];

// Eight photos at one size, and a viewer that steps through all of them.
export function PhotoGrid() {
  const [index, setIndex] = useState<number | null>(null);
  const current = index === null ? null : ALL[index];
  const step = (d: number) => setIndex((i) => (i === null ? i : (i + d + ALL.length) % ALL.length));

  useEffect(() => {
    if (index === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index]);

  return (
    <section id="site-photos" className="section-pad" style={{ background: "var(--bg-elev)" }}>
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading kicker="From site" title="On site" desc="A few of the installations I worked on." />
          <button
            type="button"
            onClick={() => setIndex(0)}
            aria-haspopup="dialog"
            className="mb-12 inline-flex items-center gap-2 rounded-full border px-5 py-3 text-[14.5px] font-semibold transition-colors hover:bg-[var(--bg-card-hover)]"
            style={{ borderColor: "var(--line-strong)", color: "var(--text)" }}
          >
            <Images size={16} aria-hidden="true" /> See all {ALL.length} photos
          </button>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          {BEST.map((p, i) => (
            <motion.button
              key={p.slug}
              variants={fadeUp}
              type="button"
              onClick={() => setIndex(i)}
              aria-haspopup="dialog"
              className="img-zoom group relative overflow-hidden rounded-2xl text-left"
              style={{ background: "var(--bg-card)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
              <img src={siteThumbSrc(p.slug)} alt={p.caption} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover" />
              <span
                className="pointer-events-none absolute inset-x-0 bottom-0 p-3 pt-12 text-[12.5px] font-medium leading-snug text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)" }}
              >
                {p.caption}
              </span>
            </motion.button>
          ))}
        </motion.div>

        <Popover open={current !== null} onClose={() => setIndex(null)} title={current?.caption ?? ""} xwide>
          {current && (
            <div>
              <div className="relative overflow-hidden rounded-xl" style={{ background: "#05080a" }}>
                {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
                <img
                  src={sitePhotoSrc(current.slug)}
                  alt={current.caption}
                  className="mx-auto max-h-[70vh] w-auto object-contain"
                  style={{ maxWidth: `min(100%, ${Math.round(current.w * 1.5)}px)` }}
                />
                <button
                  type="button"
                  aria-label="Previous photo"
                  onClick={() => step(-1)}
                  className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/55 text-white hover:bg-black/75"
                >
                  <ChevronLeft size={20} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label="Next photo"
                  onClick={() => step(1)}
                  className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/55 text-white hover:bg-black/75"
                >
                  <ChevronRight size={20} aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 flex justify-between text-[13px]" style={{ color: "var(--text-faint)" }}>
                <span>{current.group}</span>
                <span>
                  {index! + 1} of {ALL.length}
                </span>
              </div>
            </div>
          )}
        </Popover>
      </div>
    </section>
  );
}
