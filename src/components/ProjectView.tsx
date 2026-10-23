import type { ProjectGallery } from "@/lib/demo";

function Pic({ shot, className = "", whole = false }: { shot: { src: string; caption: string }; className?: string; whole?: boolean }) {
  return (
    <figure className={className}>
      <a href={shot.src} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-xl" style={{ background: whole ? "#cfd3d6" : "#05080a" }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
        <img src={shot.src} alt={shot.caption} loading="lazy" decoding="async" className={`aspect-[4/3] w-full ${whole ? "object-contain" : "object-cover"} transition-transform duration-500 hover:scale-[1.03]`} />
      </a>
      <figcaption className="mt-2 text-[13px] leading-snug" style={{ color: "var(--text-dim)" }}>
        {shot.caption}
      </figcaption>
    </figure>
  );
}

/** One job in full: the story, the model beside the build, the model views and the site photos. */
export function ProjectView({ p }: { p: ProjectGallery }) {
  const head = "mt-8 mb-3 text-[12.5px] font-bold uppercase tracking-[0.12em]";
  return (
    <div className="max-h-[78vh] overflow-y-auto pr-1">
      <div className="space-y-3 text-[15px] leading-relaxed" style={{ color: "var(--text-dim)" }}>
        {p.intro.map((t) => (
          <p key={t}>{t}</p>
        ))}
      </div>

      {p.scope && (
        <>
          <h3 className={head} style={{ color: "var(--amber)" }}>What went in</h3>
          <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-2 rounded-xl p-4" style={{ background: "var(--bg-elev)", border: "1px solid var(--line)" }}>
            {p.scope.map(([k, v]) => (
              <div key={k} className="flex gap-3 text-[14px] leading-snug">
                <dt className="w-24 shrink-0 font-semibold" style={{ color: "var(--text)" }}>{k}</dt>
                <dd style={{ color: "var(--text-dim)" }}>{v}</dd>
              </div>
            ))}
          </dl>
        </>
      )}

      <h3 className={head} style={{ color: "var(--amber)" }}>The SketchUp model beside the frame as built</h3>
      <div className="space-y-5">
        {p.pairs.map((pair) => (
          <div key={pair.built.src} className="grid gap-3 sm:grid-cols-2">
            <Pic shot={pair.design} />
            <Pic shot={pair.built} />
          </div>
        ))}
      </div>

      <h3 className={head} style={{ color: "var(--amber)" }}>The SketchUp model</h3>
      <div className="grid gap-3 sm:grid-cols-3">
        {p.model.map((s) => (
          <Pic key={s.src} shot={s} whole />
        ))}
      </div>

      <h3 className={head} style={{ color: "var(--amber)" }}>On site</h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {p.site.map((s) => (
          <Pic key={s.src} shot={s} />
        ))}
      </div>
      <p className="mt-6 text-[12.5px]" style={{ color: "var(--text-faint)" }}>
        Click any picture to open it full size.
      </p>
    </div>
  );
}
