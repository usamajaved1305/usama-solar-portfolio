"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Download, Mail, Phone } from "lucide-react";
import { profile, experience, education } from "@/lib/data";
import { PROOF_LABELS, type Role } from "@/lib/roles";
import type { MediaItem } from "@/lib/media";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { SunMark } from "./SunMark";
import { ToolProof } from "./ToolProof";
import { ROLE_ICONS } from "./Roles";

// One page per role, to send with an application for that job. Everything on it comes from the CV.
export function RoleView({ role, toolShots = {} }: { role: Role; toolShots?: Record<string, MediaItem[]> }) {
  const Icon = ROLE_ICONS[role.icon];
  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(role.title)}`;

  return (
    <>
      <header
        className="sticky top-0 z-40 border-b backdrop-blur"
        style={{ borderColor: "var(--line)", background: "var(--nav-bg)" }}
      >
        <nav aria-label="Main" className="container-x flex h-[68px] items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <SunMark size={32} />
            <span className="block leading-tight">
              <span className="block font-bold text-[15px]" style={{ fontFamily: "var(--font-display)" }}>
                {profile.name}
              </span>
              <span className="hidden sm:block text-[11.5px]" style={{ color: "var(--text-faint)" }}>
                {profile.headline}
              </span>
            </span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="/Usama-Javed-CV.pdf"
              download
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[14px] font-semibold"
              style={{ background: "var(--text)", color: "var(--bg)" }}
            >
              <Download size={15} aria-hidden="true" /> <span className="hidden sm:inline">Download</span> CV
            </a>
          </div>
        </nav>
      </header>

      <main id="main" tabIndex={-1} className="outline-none">
        <section className="relative pt-10 pb-10 sm:pt-14">
          <div className="absolute inset-0 bg-grid [mask-image:linear-gradient(to_bottom,black,transparent)]" />
          {/* initial={false}: the hero paints at full opacity from the static HTML instead of waiting for hydration. */}
          <motion.div variants={staggerContainer} initial={false} animate="show" className="container-x relative max-w-4xl">
            <motion.div variants={fadeUp}>
              <Link
                href="/"
                className="inline-flex min-h-10 items-center gap-1.5 text-[13.5px] font-medium hover:underline"
                style={{ color: "var(--text-faint)" }}
              >
                <ArrowLeft size={15} aria-hidden="true" /> Full portfolio
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-5 flex items-center gap-3.5">
              {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
              <img
                src="/me/usama-avatar-192.webp"
                alt="Usama Javed"
                width={56}
                height={56}
                decoding="async"
                className="h-14 w-14 shrink-0 rounded-full object-cover"
                style={{ boxShadow: "0 0 0 3px var(--bg), 0 0 0 5px var(--btn-bg)" }}
              />
              <span className="text-[14px] leading-snug" style={{ color: "var(--text-dim)" }}>
                <span className="block font-semibold" style={{ color: "var(--text)" }}>
                  {profile.name}
                </span>
                Mechatronics engineer, 3.5 years in solar PV, Dublin based
              </span>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-7 flex items-center gap-2">
              <Icon size={16} aria-hidden="true" style={{ color: "var(--amber)" }} />
              <span className="text-[12.5px] font-bold uppercase tracking-[0.14em]" style={{ color: "var(--amber)" }}>
                {role.family}
              </span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="mt-3 font-extrabold leading-[1.08]" style={{ fontSize: "clamp(32px, 4.6vw, 50px)" }}>
              {role.title}
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-3 text-[15px] font-semibold" style={{ color: "var(--text-dim)" }}>
              Also: {role.targets.join(", ")}
            </motion.p>
            <motion.p variants={fadeUp} className="mt-5 max-w-[62ch] text-[17px] leading-relaxed" style={{ color: "var(--text-dim)" }}>
              {role.pitch}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={mailto}
                className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold transition-transform hover:-translate-y-0.5"
              >
                <Mail size={16} aria-hidden="true" /> Email me
              </a>
              <a
                href={profile.tel}
                className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold border"
                style={{ borderColor: "var(--line-strong)", color: "var(--text)" }}
              >
                <Phone size={16} aria-hidden="true" /> {profile.phone}
              </a>
              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold border"
                  style={{ borderColor: "var(--line-strong)", color: "var(--text)" }}
                >
                  LinkedIn
                </a>
              )}
            </motion.div>
          </motion.div>
        </section>

        {role.picture && (
          <section className="pb-10">
            <figure className="container-x max-w-4xl">
              <div className="overflow-hidden rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--line)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
                <img
                  src={role.picture.src}
                  srcSet={role.picture.small ? `${role.picture.small.src} ${role.picture.small.w}w, ${role.picture.src} ${role.picture.w}w` : undefined}
                  sizes="(min-width: 960px) 896px, 100vw"
                  alt={role.picture.alt}
                  width={role.picture.w}
                  height={role.picture.h}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full"
                />
              </div>
              <figcaption className="mt-2.5 text-[13.5px] leading-snug" style={{ color: "var(--text-dim)" }}>
                {role.picture.caption}
              </figcaption>
            </figure>
          </section>
        )}

        <section className="pb-14">
          <div className="container-x max-w-4xl grid md:grid-cols-2 gap-6">
            <div className="card p-6">
              <h2 className="text-[12px] font-bold uppercase tracking-[0.1em]" style={{ color: "var(--text-faint)" }}>
                What the role asks
              </h2>
              <ul className="mt-4 space-y-3">
                {role.asks.map((a) => (
                  <li key={a} className="text-[15px] leading-relaxed" style={{ color: "var(--text-dim)" }}>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-6">
              <h2 className="text-[12px] font-bold uppercase tracking-[0.1em]" style={{ color: "var(--amber)" }}>
                What I bring
              </h2>
              <ul className="mt-4 space-y-3">
                {role.brings.map((b) => (
                  <li key={b} className="flex gap-2.5 text-[15px] leading-relaxed">
                    <Check size={17} aria-hidden="true" className="mt-[3px] shrink-0" style={{ color: "var(--emerald)" }} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-6 md:col-span-2">
              <h2 className="text-[12px] font-bold uppercase tracking-[0.1em]" style={{ color: "var(--text-faint)" }}>
                Portfolio projects
              </h2>
              <p className="mt-2 mb-4 text-[14px]" style={{ color: "var(--text-dim)" }}>
                Each one opens the work itself: the photos or screenshots, what they show and, where there is one, the
                file to download.
              </p>
              <ToolProof tools={role.proof} toolShots={toolShots} labels={{ ...PROOF_LABELS, ...role.proofLabels }} list />
            </div>

            <div className="card p-6 md:col-span-2">
              <h2 className="text-[12px] font-bold uppercase tracking-[0.1em]" style={{ color: "var(--text-faint)" }}>
                Experience and education
              </h2>
              <ul className="mt-4 divide-y" style={{ borderColor: "var(--line)" }}>
                {experience.map((e) => (
                  <li
                    key={e.role + e.company}
                    className="py-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1"
                    style={{ borderColor: "var(--line)" }}
                  >
                    <span className="text-[15px]">
                      <span className="font-semibold">{e.role}</span>
                      <span style={{ color: "var(--text-dim)" }}>, {e.company}</span>
                    </span>
                    <span className="text-[13.5px]" style={{ color: "var(--text-faint)" }}>
                      {e.period}
                    </span>
                  </li>
                ))}
                {education.map((ed) => (
                  <li
                    key={ed.degree}
                    className="py-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1"
                    style={{ borderColor: "var(--line)" }}
                  >
                    <span className="text-[15px]">
                      <span className="font-semibold">{ed.degree}</span>
                      <span style={{ color: "var(--text-dim)" }}>, {ed.school}</span>
                    </span>
                    <span className="text-[13.5px]" style={{ color: "var(--text-faint)" }}>
                      {ed.period}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href="/#experience"
                className="mt-4 inline-flex min-h-10 items-center gap-1.5 text-[14px] font-semibold underline underline-offset-4 hover:no-underline"
              >
                Full experience and projects <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="container-x max-w-4xl">
            <div className="card p-6 sm:p-8">
              <h2 className="text-[22px] font-bold">Talk to me about this role</h2>
              <p className="mt-2 text-[15px]" style={{ color: "var(--text-dim)" }}>
                Based in {profile.city}. Email, call or download the CV.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={mailto}
                  className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold"
                >
                  <Mail size={16} aria-hidden="true" /> Email me
                </a>
                <a
                  href={profile.tel}
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold border"
                  style={{ borderColor: "var(--line-strong)", color: "var(--text)" }}
                >
                  <Phone size={16} aria-hidden="true" /> {profile.phone}
                </a>
                <a
                  href="/Usama-Javed-CV.pdf"
                  download
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold border"
                  style={{ borderColor: "var(--line-strong)", color: "var(--text)" }}
                >
                  <Download size={16} aria-hidden="true" /> Download CV
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
