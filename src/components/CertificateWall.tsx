"use client";

import { motion } from "framer-motion";
import type { MediaItem } from "@/lib/media";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function CertificateWall({ certificates }: { certificates: MediaItem[] }) {
  if (certificates.length === 0) return null;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="mt-6 grid grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {certificates.map((c) => (
        <motion.a
          key={c.src}
          variants={fadeUp}
          href={c.src}
          target="_blank"
          rel="noopener noreferrer"
          className="card p-3 block transition-transform hover:-translate-y-0.5"
          title={c.caption}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- static export serves these unoptimised; sizes are unknown at build time */}
          <img
            src={c.src}
            alt={c.caption}
            loading="lazy"
            decoding="async"
            className="w-full aspect-[4/3] object-contain rounded-xl"
            style={{ background: "#ffffff" }}
          />
          <span className="mt-2.5 block text-[12.5px] leading-snug" style={{ color: "var(--text-dim)" }}>
            {c.caption}
          </span>
        </motion.a>
      ))}
    </motion.div>
  );
}
