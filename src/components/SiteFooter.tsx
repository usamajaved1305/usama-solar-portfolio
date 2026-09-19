import Link from "next/link";
import { profile } from "@/lib/data";
import { SunMark } from "./SunMark";

// Server component: the year is fixed at build time, so the client never re-evaluates it.
export function SiteFooter() {
  return (
    <footer className="border-t" style={{ borderColor: "var(--line)" }}>
      <div className="container-x pt-8 pb-10 flex flex-wrap items-center justify-between gap-4">
        <Link href="/#top" className="flex items-center gap-2.5">
          <SunMark size={26} />
          <span className="text-[13.5px] font-semibold" style={{ color: "var(--text-dim)" }}>
            {profile.headline}, {profile.city}
          </span>
        </Link>
        <span className="text-[13px]" style={{ color: "var(--text-faint)" }}>
          © {new Date().getFullYear()} {profile.name}
        </span>
      </div>
    </footer>
  );
}
