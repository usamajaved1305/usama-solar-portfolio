import type { MediaItem } from "@/lib/media";

type Props = {
  intro: React.ReactNode;
  shots: MediaItem[];
  /** Short text under each screenshot, keyed by the caption made from its filename. */
  notes?: Record<string, string>;
  /** Optional text after the screenshots, for the detail behind them. */
  outro?: React.ReactNode;
};

// Real screenshots from the software, shown in order. Each opens full size in a new tab.
export function ScreenshotSet({ intro, shots, notes = {}, outro }: Props) {
  return (
    <div>
      <div className="text-[13.5px] leading-relaxed space-y-2" style={{ color: "var(--text-dim)" }}>
        {intro}
      </div>
      <div className="mt-5 space-y-6">
        {shots.map((s, i) => (
          <figure key={s.src}>
            <a
              href={s.src}
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden rounded-xl border"
              style={{ borderColor: "var(--line)", background: "#ffffff" }}
              title="Open full size"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- static export serves these unoptimised; sizes are unknown at build time */}
              <img src={s.src} alt={s.caption} loading={i === 0 ? "eager" : "lazy"} className="w-full h-auto" />
            </a>
            <figcaption className="mt-2 text-[13px] leading-relaxed" style={{ color: "var(--text-dim)" }}>
              <span className="font-semibold" style={{ color: "var(--text)" }}>
                {i + 1}. {s.caption}
              </span>
              {notes[s.caption] ? <span>. {notes[s.caption]}</span> : null}
            </figcaption>
          </figure>
        ))}
      </div>
      {outro ? (
        <div className="mt-6 text-[13.5px] leading-relaxed space-y-2" style={{ color: "var(--text-dim)" }}>
          {outro}
        </div>
      ) : null}
    </div>
  );
}
