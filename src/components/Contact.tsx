"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/data";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { SunMark } from "./SunMark";

function LinkedInGlyph({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.44-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

const telHref = `tel:${profile.phone.replace(/\s/g, "")}`;

export function Contact() {
  return (
    <section id="contact" className="section-pad relative overflow-hidden">
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(circle_at_center,black,transparent_75%)] opacity-70" />
      <div className="container-x relative">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.span
            variants={fadeUp}
            className="text-[12.5px] font-bold uppercase tracking-[0.14em]"
            style={{ color: "var(--amber)" }}
          >
            Get in touch
          </motion.span>
          <motion.h2 variants={fadeUp} className="mt-3 font-extrabold" style={{ fontSize: "clamp(30px, 4.4vw, 48px)" }}>
            Let&apos;s talk about your next site
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-[16px] leading-relaxed" style={{ color: "var(--text-dim)" }}>
            {profile.availability}. Based in {profile.location}.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold transition-transform hover:-translate-y-0.5"
            >
              <Mail size={16} aria-hidden="true" /> Email me
            </a>
            <a
              href="/Usama-Javed-CV.docx"
              download
              className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold border transition-colors"
              style={{ borderColor: "var(--line-strong)", color: "var(--text)" }}
            >
              Download CV
            </a>
            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold border transition-colors"
                style={{ borderColor: "var(--line-strong)", color: "var(--text)" }}
              >
                <LinkedInGlyph size={16} /> LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            )}
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[14.5px]"
            style={{ color: "var(--text-faint)" }}
          >
            <a href={telHref} className="inline-flex items-center gap-2 hover:underline">
              <Phone size={15} aria-hidden="true" /> {profile.phone}
            </a>
            <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 hover:underline">
              <Mail size={15} aria-hidden="true" /> {profile.email}
            </a>
            <span className="inline-flex items-center gap-2">
              <MapPin size={15} aria-hidden="true" /> {profile.location}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer
      className="container-x pt-8 pb-10 border-t flex flex-wrap items-center justify-between gap-4"
      style={{ borderColor: "var(--line)" }}
    >
      <a href="#top" className="flex items-center gap-2.5">
        <SunMark size={26} />
        <span className="text-[13.5px] font-semibold" style={{ color: "var(--text-dim)" }}>
          {profile.name}
        </span>
      </a>
      <span className="text-[13px]" style={{ color: "var(--text-faint)" }}>
        © {new Date().getFullYear()} {profile.name}
      </span>
    </footer>
  );
}
