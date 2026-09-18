"use client";

import { motion } from "framer-motion";
import { stats } from "@/lib/data";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { AnimatedNumber } from "./AnimatedNumber";

export function Stats() {
  return (
    <section className="border-t border-b" style={{ borderColor: "var(--line)" }}>
      <div className="container-x py-14">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((s) => (
            <motion.div key={s.label} variants={fadeUp}>
              <div
                className="font-extrabold leading-none"
                style={{ fontSize: "clamp(30px, 4vw, 42px)", fontFamily: "var(--font-display)" }}
              >
                <AnimatedNumber value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-3 text-[14.5px] font-semibold" style={{ color: "var(--text)" }}>
                {s.label}
              </div>
              <div className="mt-1 text-[13px]" style={{ color: "var(--text-faint)" }}>
                {s.sub}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
