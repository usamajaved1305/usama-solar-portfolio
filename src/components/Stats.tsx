"use client";

import { motion } from "framer-motion";
import { stats } from "@/lib/data";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function Stats() {
  return (
    <section className="border-t border-b" style={{ borderColor: "var(--line)" }} aria-label="Key figures">
      <div className="container-x py-14">
        <motion.dl
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          {stats.map((s) => (
            <motion.div key={s.label} variants={fadeUp} className="flex flex-col">
              <dt className="order-2 mt-3 text-[14.5px] font-semibold text-balance" style={{ color: "var(--text)" }}>
                {s.label}
              </dt>
              <dd
                className="order-1 font-extrabold leading-none num"
                style={{ fontSize: "clamp(28px, 3.6vw, 40px)", fontFamily: "var(--font-display)" }}
              >
                {s.value}
              </dd>
              <dd className="order-3 mt-1 text-[13px] text-pretty" style={{ color: "var(--text-faint)" }}>
                {s.sub}
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
