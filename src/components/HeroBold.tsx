"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, MapPin, Phone } from "lucide-react";
import { profile, stats } from "@/lib/data";
import { fadeUp, staggerContainer } from "@/lib/motion";

// The first sentence of the lede: the second one repeats what the sections below show.
const intro = profile.lede.split(". ")[0] + ".";

// Two lines, so the end of the headline stays on the dark side of the photo instead of the bright sky.
const [headlineFirst, ...headlineParts] = profile.headline.split(", ");
const headlineRest = headlineParts.join(", ");

// Full-width site photo behind the name, with the four headline figures on a glass strip at the bottom.
export function HeroBold() {
  return (
    <section id="top" className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
      <img
        src="/feature/hero-sunset-frame.webp"
        alt=""
        className="hero-drift absolute inset-0 -z-20 h-full w-full object-cover"
        style={{ objectPosition: "62% 40%" }}
      />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(90deg, rgba(5,9,12,0.94) 0%, rgba(5,9,12,0.78) 38%, rgba(5,9,12,0.25) 75%, rgba(5,9,12,0.1) 100%)",
        }}
      />
      {/* A dark band behind the menu, and a fuller wash on phones where the text runs across the bright sky. */}
      <div className="absolute inset-x-0 top-0 -z-10 h-40" style={{ background: "linear-gradient(to bottom, rgba(5,9,12,0.7), transparent)" }} />
      <div className="absolute inset-0 -z-10 lg:hidden" style={{ background: "rgba(5,9,12,0.5)" }} />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-2/5"
        style={{ background: "linear-gradient(to top, var(--bg) 8%, transparent)" }}
      />

      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="container-x pt-32 pb-12 text-white">
        <motion.div variants={fadeUp} className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
          <img
            src="/me/usama-avatar.webp"
            alt="Usama Javed"
            width={72}
            height={72}
            className="h-[72px] w-[72px] rounded-full object-cover"
            style={{ boxShadow: "0 0 0 3px rgba(5,9,12,0.9), 0 0 0 5px #f2a93b" }}
          />
          <span
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-medium"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
            {profile.availability}
          </span>
        </motion.div>

        <motion.h1 variants={fadeUp} className="mt-7 font-extrabold tracking-tight leading-[0.98]" style={{ fontSize: "clamp(48px, 8vw, 104px)" }}>
          {profile.name}
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="mt-4 font-bold leading-tight"
          style={{ fontSize: "clamp(22px, 2.6vw, 34px)", color: "#f2a93b", fontFamily: "var(--font-display)" }}
        >
          {headlineFirst}
          {headlineRest && (
            <>
              ,<br />
              {headlineRest}
            </>
          )}
        </motion.p>
        <motion.p variants={fadeUp} className="mt-5 max-w-[54ch] text-[17px] sm:text-[18px] leading-relaxed text-white/80">
          {intro}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold transition-transform hover:-translate-y-0.5"
            style={{ background: "#f2a93b", color: "#0a0f12" }}
          >
            Get in touch <ArrowRight size={16} aria-hidden="true" />
          </a>
          <a
            href="/Usama-Javed-CV.pdf"
            download
            className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
            style={{ border: "1px solid rgba(255,255,255,0.35)" }}
          >
            <Download size={16} aria-hidden="true" /> Download CV
          </a>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-7 flex flex-wrap gap-x-6 gap-y-1 text-[14px] text-white/70">
          <span className="inline-flex items-center gap-2 min-h-10">
            <MapPin size={15} aria-hidden="true" /> {profile.city}
          </span>
          <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 min-h-10 hover:text-white">
            <Phone size={15} aria-hidden="true" /> {profile.phone}
          </a>
          <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 min-h-10 hover:text-white">
            <Mail size={15} aria-hidden="true" /> {profile.email}
          </a>
        </motion.div>

        <motion.dl
          variants={fadeUp}
          className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-2xl"
          style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(12px)" }}
        >
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col px-5 py-5 sm:px-6" style={{ background: "rgba(8,12,15,0.86)" }}>
              <dt className="order-2 mt-2 text-[13.5px] font-semibold text-white/85">{s.label}</dt>
              <dd className="order-1 font-extrabold leading-none num" style={{ fontSize: "clamp(26px, 3vw, 38px)", fontFamily: "var(--font-display)" }}>
                {s.value}
              </dd>
              <dd className="order-3 mt-1 text-[12.5px] text-white/55 hidden sm:block">{s.sub}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  );
}
