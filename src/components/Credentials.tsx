"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, Languages, Users } from "lucide-react";
import { education, certifications, languages, activities } from "@/lib/data";
import type { MediaItem } from "@/lib/media";
import { CertificateWall } from "./CertificateWall";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { SectionHeading } from "./SectionHeading";

export function Credentials({ certificates = [] }: { certificates?: MediaItem[] }) {
  return (
    <section id="credentials" className="section-pad" style={{ background: "var(--bg-elev)" }}>
      <div className="container-x">
        <SectionHeading kicker="Education & Credentials" title="Formal training behind the fieldwork" />

        <div className="grid lg:grid-cols-2 gap-10">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce}>
            <div className="flex items-center gap-2.5 mb-5">
              <GraduationCap size={18} style={{ color: "var(--amber)" }} />
              <h3 className="font-bold text-[16.5px]">Education</h3>
            </div>
            <div className="flex flex-col gap-4">
              {education.map((e) => (
                <div key={e.degree} className="card p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="font-bold text-[15.5px]">{e.degree}</h4>
                    <span className="text-[13px] font-semibold" style={{ color: "var(--text-faint)" }}>
                      {e.period}
                    </span>
                  </div>
                  <div className="mt-1 text-[14px]" style={{ color: "var(--amber)" }}>
                    {e.school}
                  </div>
                  {e.detail && (
                    <p className="mt-2 text-[13.5px] leading-relaxed" style={{ color: "var(--text-dim)" }}>
                      {e.detail}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2.5 mb-5 mt-10">
              <Languages size={18} style={{ color: "var(--amber)" }} />
              <h3 className="font-bold text-[16.5px]">Languages</h3>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {languages.map((l) => (
                <span key={l.name} className="chip" style={{ gap: "6px" }}>
                  <span>{l.name}</span>
                  <span aria-hidden="true" style={{ color: "var(--text-faint)" }}>·</span>
                  <span style={{ color: "var(--text-faint)" }}>{l.level}</span>
                </span>
              ))}
            </div>

            <div className="mt-8">
              <div className="flex items-center gap-2.5 mb-5">
                <Users size={18} style={{ color: "var(--amber)" }} aria-hidden="true" />
                <h3 className="font-bold text-[16.5px]">Activities</h3>
              </div>
              <ul className="space-y-2">
                {activities.map((a) => (
                  <li key={a} className="text-[14px] leading-relaxed" style={{ color: "var(--text-dim)" }}>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            <div className="flex items-center gap-2.5 mb-5">
              <Award size={18} style={{ color: "var(--amber)" }} />
              <h3 className="font-bold text-[16.5px]">Certifications</h3>
            </div>
            <div className="flex flex-col gap-3">
              {certifications.map((c) => (
                <motion.div key={c.name} variants={fadeUp} className="card p-5">
                  <h4 className="font-bold text-[15px]">{c.name}</h4>
                  <div className="mt-1 text-[13.5px]" style={{ color: "var(--text-dim)" }}>
                    {c.issuer}
                  </div>
                </motion.div>
              ))}
            </div>

            <CertificateWall certificates={certificates} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
