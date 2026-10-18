"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Download, Mail, Phone } from "lucide-react";
import { profile, experience } from "@/lib/data";
import { roles, PROOF_LABELS, type Role } from "@/lib/roles";
import type { MediaItem } from "@/lib/media";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { SunMark } from "./SunMark";
import { ThemeToggle } from "./ThemeToggle";
import { ToolProof } from "./ToolProof";
import { ROLE_ICONS } from "./Roles";

// One page per role family, to send with an application. Everything on it comes from the CV.
export function RoleView({ role, toolShots = {} }: { role: Role; toolShots?: Record<string, MediaItem[]> }) {
  const Icon = ROLE_ICONS[role.icon];
  const others = roles.filter((r) => r.slug !== role.slug);

  return (
    <>
      <header className="border-b" style={{ borderColor: "var(--line)" }}>
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
            <ThemeToggle />
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
        <section className="relative pt-12 pb-10 sm:pt-16">
          <div className="absolute inset-0 bg-grid [mask-image:linear-gradient(to_bottom,black,transparent)]" />
          <motion.div variants={staggerContainer} initial="hidden" animate="show" className="container-x relative max-w-4xl">
            <motion.div variants={fadeUp}>
              <Link
                href="/#roles"
                className="inline-flex items-center gap-1.5 text-[13.5px] font-medium hover:underline"
                style={{ color: "var(--text-faint)" }}
              >
                <ArrowLeft size={15} aria-hidden="true" /> All roles on the full portfolio
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-6 flex items-center gap-3">
              <div
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl"
                style={{ background: "var(--amber-soft)", color: "var(--amber)" }}
              >
                <Icon size={20} aria-hidden="true" />
              </div>
              <span className="text-[12.5px] font-bold uppercase tracking-[0.14em]" style={{ color: "var(--amber)" }}>
                Roles I&apos;m targeting
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="mt-4 font-extrabold leading-[1.08]" style={{ fontSize: "clamp(32px, 4.6vw, 50px)" }}>
              {role.family}
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-3 text-[15px] font-semibold" style={{ color: "var(--text-dim)" }}>
              {role.targets.join(", ")}
            </motion.p>
            <motion.p variants={fadeUp} className="mt-5 max-w-[62ch] text-[17px] leading-relaxed" style={{ color: "var(--text-dim)" }}>
              {role.pitch}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold transition-transform hover:-translate-y-0.5"
              >
                <Mail size={16} aria-hidden="true" /> Email me
              </a>
              <a
                href={profile.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold border"
                style={{ borderColor: "var(--line-strong)", color: "var(--text)" }}
              >
                <Phone size={16} aria-hidden="true" /> {profile.phone}
              </a>
            </motion.div>
          </motion.div>
        </section>

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
                Each button opens a project I built with that tool: the screenshots, what they show and, where there is one, the file to download.
              </p>
              <ToolProof tools={role.proof} toolShots={toolShots} labels={PROOF_LABELS} list />
            </div>

            <div className="card p-6 md:col-span-2">
              <h2 className="text-[12px] font-bold uppercase tracking-[0.1em]" style={{ color: "var(--text-faint)" }}>
                Experience
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
              </ul>
              <Link
                href="/#experience"
                className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold underline underline-offset-4 hover:no-underline"
              >
                Full experience and projects <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="container-x max-w-4xl">
            <h2 className="text-[12px] font-bold uppercase tracking-[0.1em]" style={{ color: "var(--text-faint)" }}>
              Other roles I&apos;m targeting
            </h2>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {others.map((r) => (
                <Link key={r.slug} href={`/roles/${r.slug}`} className="chip chip-action">
                  {r.family} <ArrowRight size={14} aria-hidden="true" style={{ color: "var(--amber)" }} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
