import Link from "next/link";
import { profile } from "@/lib/data";
import { roles } from "@/lib/roles";
import { SunMark } from "./SunMark";

// Server component: the year is fixed at build time, so the client never re-evaluates it.
export function SiteFooter() {
  return (
    <footer className="border-t" style={{ borderColor: "var(--line)" }}>
      <div className="container-x pt-8 pb-10 flex flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/#top" className="flex items-center gap-2.5">
            <SunMark size={26} />
            <span className="text-[13.5px] font-semibold" style={{ color: "var(--text-dim)" }}>
              {profile.name} | {profile.headline}, {profile.city}
            </span>
          </Link>
          <span className="text-[13px]" style={{ color: "var(--text-faint)" }}>
            © {new Date().getFullYear()} {profile.name} (usamajaved.ie)
          </span>
        </div>
        <nav aria-label="Role pages and resources" className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px]" style={{ color: "var(--text-faint)" }}>
          {roles.map((r) => (
            <Link key={r.slug} href={`/roles/${r.slug}`} className="hover:underline">
              {r.title}
            </Link>
          ))}
          <a href="/Usama-Javed-CV.pdf" className="hover:underline">
            CV (PDF)
          </a>
        </nav>
      </div>
    </footer>
  );
}
