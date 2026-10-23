import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { SunMark } from "@/components/SunMark";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
};

export default function NotFound() {
  return (
    <>
      <main id="main" tabIndex={-1} className="outline-none">
        <div className="container-x grid min-h-[75vh] place-content-center justify-items-center text-center py-24">
          <SunMark size={44} />
          <h1 className="mt-6 font-extrabold" style={{ fontSize: "clamp(30px, 4vw, 44px)" }}>
            Page not found
          </h1>
          <p className="mt-3 text-[16px] leading-relaxed max-w-[44ch]" style={{ color: "var(--text-dim)" }}>
            This page doesn&apos;t exist. The portfolio, CV and contact details are on the home page.
          </p>
          <Link
            href="/"
            className="btn-primary mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold"
          >
            <ArrowLeft size={16} aria-hidden="true" /> Back to the portfolio
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
