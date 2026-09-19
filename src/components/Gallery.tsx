"use client";

import { motion } from "framer-motion";
import type { MediaItem } from "@/lib/media";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { SectionHeading } from "./SectionHeading";

export function Gallery({ photos }: { photos: MediaItem[] }) {
  if (photos.length === 0) return null;

  return (
    <section id="site-photos" className="section-pad">
      <div className="container-x">
        <SectionHeading
          kicker="From site"
          title="Installations, commissioning and design work"
          desc="Photographs from projects I delivered."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {photos.map((p) => (
            <motion.figure key={p.src} variants={fadeUp} className="card overflow-hidden">
              <a href={p.src} target="_blank" rel="noopener noreferrer" className="block">
                {/* eslint-disable-next-line @next/next/no-img-element -- static export serves these unoptimised; sizes are unknown at build time */}
                <img
                  src={p.src}
                  alt={p.caption}
                  loading="lazy"
                  decoding="async"
                  className="w-full aspect-[4/3] object-cover"
                  style={{ background: "var(--bg-card-hover)" }}
                />
              </a>
              <figcaption className="px-5 py-4 text-[14px]" style={{ color: "var(--text-dim)" }}>
                {p.caption}
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
