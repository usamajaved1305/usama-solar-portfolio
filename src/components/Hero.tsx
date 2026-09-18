"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Phone, Mail } from "lucide-react";
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
            className="mt-6 font-extrabold leading-[1.04] tracking-tight"
            style={{ fontSize: "clamp(40px, 5.2vw, 60px)" }}
          >
            {profile.name}
            <br />
            <span className="text-gradient">Solar PV Delivery</span>
            <br />
            &amp; Planning
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
              Get in touch <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <a
              href="/Usama-Javed-CV.docx"
              download
              className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold border transition-colors"
              style={{ borderColor: "var(--line-strong)", color: "var(--text)" }}
            >
              Download CV
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-[14.5px]"
            style={{ color: "var(--text-faint)" }}
          >
            <span className="inline-flex items-center gap-2">
              <MapPin size={15} aria-hidden="true" /> {profile.location}
            </span>
            <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 hover:underline">
              <Phone size={15} aria-hidden="true" /> {profile.phone}
            </a>
            <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 hover:underline">
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
        className="absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full opacity-40 blur-[100px]"
        style={{ background: "radial-gradient(circle, var(--amber) 0%, transparent 70%)" }}
      />
      <div
        className="absolute top-40 left-[-10%] h-[420px] w-[420px] rounded-full opacity-30 blur-[100px]"
        style={{ background: "radial-gradient(circle, var(--emerald) 0%, transparent 70%)" }}
      />
    </div>
  );
}
