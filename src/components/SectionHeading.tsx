"use client";

import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/motion";

export function SectionHeading({
  kicker,
  title,
  desc,
}: {
  kicker: string;
  title: string;
  desc?: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="max-w-2xl mb-12"
    >
      <span className="text-[12.5px] font-bold uppercase tracking-[0.14em]" style={{ color: "var(--amber)" }}>
        {kicker}
      </span>
      <h2 className="mt-3 font-extrabold" style={{ fontSize: "clamp(28px, 3.6vw, 40px)" }}>
        {title}
      </h2>
      {desc && (
        <p className="mt-3 text-[16px] leading-relaxed" style={{ color: "var(--text-dim)" }}>
          {desc}
        </p>
      )}
    </motion.div>
  );
}
