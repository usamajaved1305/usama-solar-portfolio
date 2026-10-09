"use client";

import { motion } from "framer-motion";
import { SolarPanel, Zap } from "lucide-react";
import { stats } from "@/lib/data";
import { sitePhotoSrc } from "@/lib/demo";

const float = (delay: number) => ({
  y: [0, -6, 0],
  transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const, delay },
});

// Portrait with one real site photo and two figures from the CV around it.
export function HeroPortrait() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto w-full max-w-[460px] pb-16 pl-10"
    >
      <div
        className="absolute -inset-6 rounded-[40px] blur-3xl"
        style={{ background: "radial-gradient(circle at 60% 35%, var(--glow-warm), transparent 65%)", opacity: 0.45 }}
        aria-hidden="true"
      />

      <div
        className="relative overflow-hidden rounded-[28px] aspect-[4/5]"
        style={{ boxShadow: "0 30px 60px -20px rgba(10, 20, 30, 0.45)", border: "1px solid var(--line)" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
        <img src="/me/usama-portrait.webp" alt="Usama Javed" className="h-full w-full object-cover" width={720} height={900} />
      </div>

      <motion.figure
        animate={float(0)}
        className="absolute bottom-0 left-0 w-[58%] overflow-hidden rounded-2xl"
        style={{ boxShadow: "0 24px 48px -16px rgba(10, 20, 30, 0.5)", border: "4px solid var(--bg-card)" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
        <img
          src={sitePhotoSrc("elevated-frame-at-sunset")}
          alt="Elevated steel frame and modules on a rooftop at sunset"
          className="aspect-[4/3] w-full object-cover"
        />
        <figcaption
          className="absolute left-2 top-2 rounded-full px-2.5 py-1 text-[11.5px] font-semibold"
          style={{ background: "rgba(10, 15, 18, 0.72)", color: "#fff" }}
        >
          On site
        </figcaption>
      </motion.figure>

      <motion.div
        animate={float(1.2)}
        className="absolute right-[-14px] top-10 flex items-center gap-3 rounded-2xl px-4 py-3"
        style={{ background: "var(--bg-card)", border: "1px solid var(--line)", boxShadow: "0 18px 40px -18px rgba(10, 20, 30, 0.45)" }}
      >
        <span className="grid h-9 w-9 place-items-center rounded-xl" style={{ background: "var(--amber-soft)", color: "var(--amber)" }}>
          <SolarPanel size={18} aria-hidden="true" />
        </span>
        <span>
          <span className="block font-extrabold text-[18px] leading-none num">{stats[1].value}</span>
          <span className="block text-[12px] mt-1" style={{ color: "var(--text-faint)" }}>
            capacity delivered
          </span>
        </span>
      </motion.div>

      <motion.div
        animate={float(2.4)}
        className="absolute right-[-14px] bottom-24 flex items-center gap-3 rounded-2xl px-4 py-3"
        style={{ background: "var(--bg-card)", border: "1px solid var(--line)", boxShadow: "0 18px 40px -18px rgba(10, 20, 30, 0.45)" }}
      >
        <span className="grid h-9 w-9 place-items-center rounded-xl" style={{ background: "var(--emerald-soft)", color: "var(--emerald)" }}>
          <Zap size={18} aria-hidden="true" />
        </span>
        <span>
          <span className="block font-extrabold text-[18px] leading-none num">{stats[0].value}</span>
          <span className="block text-[12px] mt-1" style={{ color: "var(--text-faint)" }}>
            PV installations delivered
          </span>
        </span>
      </motion.div>
    </motion.div>
  );
}
