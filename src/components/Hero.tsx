"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, MapPin, Phone, Mail } from "lucide-react";
import { profile } from "@/lib/data";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { HeroArt } from "./HeroArt";

export function Hero() {
  return (
    <section id="top" className="relative pt-[120px] pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-grid [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <HeroGlow />

      <div className="container-x relative grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-12 items-center">
        <motion.div variants={staggerContainer} initial="hidden" animate="show">
          <motion.div variants={fadeUp} className="chip">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--emerald)" }} aria-hidden="true" />
            {profile.availability}
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-6 font-extrabold tracking-tight"
          >
            <span className="block leading-[1.02]" style={{ fontSize: "clamp(44px, 6vw, 68px)" }}>
              {profile.name}
            </span>
            <span
              className="mt-3 block leading-[1.15] text-gradient"
              style={{ fontSize: "clamp(24px, 2.7vw, 34px)" }}
            >
              Solar PV Delivery,
              <br />
              Site Supervision &amp; Planning
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-[56ch] text-[17px] sm:text-[18.5px] leading-relaxed"
            style={{ color: "var(--text-dim)" }}
          >
            {profile.lede}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold transition-transform hover:-translate-y-0.5"
            >
              Get in touch <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a
              href="/Usama-Javed-CV.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold border transition-colors"
              style={{ borderColor: "var(--line-strong)", color: "var(--text)" }}
            >
              <Download size={16} aria-hidden="true" /> Download CV
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center gap-x-6 text-[14.5px]"
            style={{ color: "var(--text-faint)" }}
          >
            <span className="inline-flex items-center gap-2 min-h-11">
              <MapPin size={15} aria-hidden="true" /> {profile.city}
            </span>
            <a
              href={`tel:${profile.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 min-h-11 hover:underline"
            >
              <Phone size={15} aria-hidden="true" /> {profile.phone}
            </a>
            <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 min-h-11 hover:underline">
              <Mail size={15} aria-hidden="true" /> {profile.email}
            </a>
          </motion.div>
        </motion.div>

        <div className="hidden lg:block">
          <HeroArt />
        </div>
      </div>
    </section>
  );
}

function HeroGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full blur-[100px]"
        style={{ background: "radial-gradient(circle, var(--glow-warm) 0%, transparent 70%)", opacity: "var(--glow-opacity)" }}
      />
      <div
        className="absolute top-40 left-[-10%] h-[420px] w-[420px] rounded-full blur-[100px]"
        style={{ background: "radial-gradient(circle, var(--glow-cool) 0%, transparent 70%)", opacity: "var(--glow-opacity)" }}
      />
    </div>
  );
}
