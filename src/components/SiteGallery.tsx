"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SITE_GROUPS, sitePhotos, sitePhotoSrc, siteThumbSrc, type SiteGroup } from "@/lib/demo";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { Popover } from "./Popover";
import { SectionHeading } from "./SectionHeading";

const FILTERS: ("All" | SiteGroup)[] = ["All", ...SITE_GROUPS];

// "All" deals the groups out in turn, so every column of the masonry mixes arrays, inverters and models.
const MIXED = (() => {
  const lists = SITE_GROUPS.map((g) => sitePhotos.filter((p) => p.group === g));
  const out: typeof sitePhotos = [];
  for (let i = 0; out.length < sitePhotos.length; i++) for (const l of lists) if (l[i]) out.push(l[i]);
  return out;
})();

export function SiteGallery() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [index, setIndex] = useState<number | null>(null);
  const shown = filter === "All" ? MIXED : sitePhotos.filter((p) => p.group === filter);
  const current = index === null ? null : shown[index];

  useEffect(() => {
    if (index === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") setIndex((i) => (i === null ? i : (i + 1) % shown.length));
      if (e.key === "ArrowLeft") setIndex((i) => (i === null ? i : (i - 1 + shown.length) % shown.length));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, shown.length]);

  return (
    <section id="site-photos" className="section-pad" style={{ background: "var(--bg-elev)" }}>
      <div className="container-x">
        <SectionHeading
          kicker="From site"
          title="Installations and structure design"
          desc="Photos from solar installations I worked on, and 3D models of elevated mounting structures."
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="-mt-4 mb-8 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filter photos"
        >
          {FILTERS.map((f) => {
            const active = f === filter;
            const count = f === "All" ? sitePhotos.length : sitePhotos.filter((p) => p.group === f).length;
            return (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f)}
                className="rounded-full px-4 py-2 text-[13.5px] font-semibold border transition-colors"
                style={
                  active
                    ? { background: "var(--btn-bg)", color: "var(--btn-fg)", borderColor: "var(--btn-bg)" }
                    : { borderColor: "var(--line-strong)", color: "var(--text-dim)" }
                }
              >
                {f} <span className="opacity-70">{count}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Masonry columns keep every photo at its own shape, so tall inverter shots are not cropped. */}
        <motion.div
          key={filter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4"
        >
          {shown.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => setIndex(i)}
              aria-haspopup="dialog"
              className="img-zoom group relative mb-3 sm:mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl text-left"
              style={{ background: "var(--bg-card-hover)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
              <img
                src={siteThumbSrc(p.slug)}
                alt={p.caption}
                width={p.w}
                height={p.h}
                loading={i < 8 ? "eager" : "lazy"}
                decoding="async"
                className="block h-auto w-full"
              />
              <span
                className="pointer-events-none absolute inset-x-0 bottom-0 p-3 pt-10 text-[12.5px] font-medium leading-snug text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75), transparent)" }}
              >
                {p.caption}
              </span>
            </button>
          ))}
        </motion.div>

        <Popover open={current !== null} onClose={() => setIndex(null)} title={current?.caption ?? ""} xwide>
          {current && (
            <div>
              <div className="relative rounded-xl overflow-hidden" style={{ background: "#0b0f12" }}>
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
                  onClick={() => setIndex((i) => (i === null ? i : (i - 1 + shown.length) % shown.length))}
                  className="absolute left-3 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-black/55 text-white hover:bg-black/75"
                >
                  <ChevronLeft size={20} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label="Next photo"
                  onClick={() => setIndex((i) => (i === null ? i : (i + 1) % shown.length))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-black/55 text-white hover:bg-black/75"
                >
                  <ChevronRight size={20} aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 flex justify-between text-[13px]" style={{ color: "var(--text-faint)" }}>
                <span>{current.group}</span>
                <span>
                  {index! + 1} of {shown.length}
                </span>
              </div>
            </div>
          )}
        </Popover>
      </div>
    </section>
  );
}
