"use client";

import { useEffect, useState } from "react";
import { Menu, X, Download } from "lucide-react";
import { SunMark } from "./SunMark";
import { ThemeToggle } from "./ThemeToggle";
import { profile } from "@/lib/data";

const LINKS = [
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#credentials", label: "Credentials" },
  { href: "#contact", label: "Contact" },
];

export function Nav({ hasPhotos = false }: { hasPhotos?: boolean }) {
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      const h = document.documentElement;
      const scrollTop = h.scrollTop;
      const scrollHeight = h.scrollHeight - h.clientHeight;
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
      setScrolled(scrollTop > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = hasPhotos
    ? [...LINKS.slice(0, 2), { href: "#site-photos", label: "Site photos" }, ...LINKS.slice(2)]
    : LINKS;
  const solid = scrolled || open;

  return (
    <>
      <div
        className="print-hidden fixed top-0 left-0 z-50 h-[2.5px]"
        style={{ width: `${progress}%`, background: "linear-gradient(90deg, var(--amber), var(--emerald))" }}
        aria-hidden="true"
      />
      <header
        className="fixed top-0 inset-x-0 z-40 transition-colors"
        style={{
          background: solid ? "var(--nav-bg)" : "transparent",
          backdropFilter: solid ? "blur(14px)" : "none",
          WebkitBackdropFilter: solid ? "blur(14px)" : "none",
          borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
        }}
      >
        <nav aria-label="Main" className="container-x flex h-[68px] items-center justify-between">
          <a href="#top" className="flex items-center gap-2.5 shrink-0">
            <SunMark size={32} />
            <span className="block leading-tight">
              <span className="block font-bold text-[15px]" style={{ color: "var(--text)", fontFamily: "var(--font-display)" }}>
                {profile.name}
              </span>
              <span className="hidden lg:block text-[11.5px]" style={{ color: "var(--text-faint)" }}>
                {profile.headline}
              </span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[14.5px] font-medium text-[var(--text-dim)] transition-colors hover:text-[var(--text)]"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <a
              href="/Usama-Javed-CV.pdf"
              download
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[14px] font-semibold transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--text)", color: "var(--bg)" }}
            >
              <Download size={15} aria-hidden="true" /> Download CV
            </a>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="print-hidden grid h-10 w-10 place-items-center rounded-full border"
              style={{ borderColor: "var(--line)", color: "var(--text)" }}
            >
              {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
            </button>
          </div>
        </nav>

        <nav
          id="mobile-menu"
          aria-label="Mobile"
          hidden={!open}
          className="md:hidden border-t"
          style={{ borderColor: "var(--line)", background: "var(--bg)" }}
        >
          <div className="container-x flex flex-col py-4 gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-[15px] font-medium border-b"
                style={{ color: "var(--text)", borderColor: "var(--line)" }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="/Usama-Javed-CV.pdf"
              download
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-3 text-[14.5px] font-semibold"
              style={{ background: "var(--text)", color: "var(--bg)" }}
            >
              <Download size={15} aria-hidden="true" /> Download CV
            </a>
          </div>
        </nav>
      </header>
    </>
  );
}
