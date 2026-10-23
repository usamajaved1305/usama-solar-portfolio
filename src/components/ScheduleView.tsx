import { PROJECT, dayLabel, schedule, wbsGroups, type Relationship, type Scheduled } from "@/lib/schedule";

const ROW_H = 28;
const DAY_W = 23;
const COL = { id: 56, name: 296, dur: 38, start: 44, finish: 44, tf: 36 };
const LEFT_W = COL.id + COL.name + COL.dur + COL.start + COL.finish + COL.tf;
const HEAD_H = 48;

const { rows, finish } = schedule();
const byId = new Map(rows.map((r) => [r.id, r]));
const PAD = 10; // room left of day 1 so a milestone at the start is not clipped
const GANTT_W = finish * DAY_W + 12; // spare room so the final milestone is not clipped
const WEEK_DAYS = PROJECT.workDaysPerWeek;
const weeks = Math.ceil(finish / WEEK_DAYS);

type DisplayRow =
  | { kind: "group"; code: string; name: string; es: number; ef: number }
  | { kind: "act"; row: Scheduled };

const display: DisplayRow[] = [];
for (const g of wbsGroups) {
  const members = rows.filter((r) => r.wbs === g.code);
  display.push({
    kind: "group",
    code: g.code,
    name: g.name,
    es: Math.min(...members.map((m) => m.es)),
    ef: Math.max(...members.map((m) => m.ef)),
  });
  for (const m of members) display.push({ kind: "act", row: m });
}

const rowIndex = new Map<string, number>();
display.forEach((d, i) => {
  if (d.kind === "act") rowIndex.set(d.row.id, i);
});
const BODY_H = display.length * ROW_H;

const criticalCount = rows.filter((r) => r.critical && r.duration > 0).length;
const nearCriticalCount = rows.filter((r) => r.nearCritical && r.duration > 0).length;
const milestoneCount = rows.filter((r) => r.duration === 0).length;
const workCount = rows.length - milestoneCount;

function isStartMilestone(r: Scheduled) {
  return r.duration === 0 && r.preds.length === 0;
}

function startText(r: Scheduled) {
  if (r.duration === 0) return isStartMilestone(r) ? "1" : "";
  return String(r.es + 1);
}

function finishText(r: Scheduled) {
  if (r.duration === 0) return isStartMilestone(r) ? "" : String(r.ef);
  return String(r.ef);
}

// Is this link the one that fixes the successor's early start, between two critical activities?
function isDriving(rel: Relationship, pred: Scheduled, succ: Scheduled) {
  if (!pred.critical || !succ.critical) return false;
  const lag = rel.lag ?? 0;
  return rel.type === "FS" ? succ.es === pred.ef + lag : succ.es === pred.es + lag;
}

type Link = { d: string; critical: boolean };

function buildLinks(): Link[] {
  const links: Link[] = [];
  for (const succ of rows) {
    for (const rel of succ.preds) {
      const pred = byId.get(rel.from);
      const yi = rowIndex.get(rel.from);
      const yj = rowIndex.get(succ.id);
      if (!pred || yi === undefined || yj === undefined) continue;

      const y1 = yi * ROW_H + ROW_H / 2;
      const y2 = yj * ROW_H + ROW_H / 2;
      const x1 = PAD + (rel.type === "FS" ? pred.ef : pred.es) * DAY_W + (pred.duration === 0 ? 5 : 0);
      const x2 = PAD + succ.es * DAY_W - (succ.duration === 0 ? 6 : 0);
      const down = y2 > y1 ? 1 : -1;

      let d: string;
      if (rel.type === "FS" && x2 >= x1 + 9) {
        d = `M${x1},${y1} H${x1 + 5} V${y2} H${x2}`;
      } else if (rel.type === "FS") {
        // The successor starts at or before the predecessor's end, so route around the bars.
        const ym = y1 + down * (ROW_H / 2);
        d = `M${x1},${y1} H${x1 + 5} V${ym} H${x2 - 6} V${y2} H${x2}`;
      } else {
        // Start to start: leave the left edge of the predecessor and enter the left edge of the successor.
        d = `M${x1},${y1} H${x1 - 6} V${y2} H${x2}`;
      }
      links.push({ d, critical: isDriving(rel, pred, succ) });
    }
  }
  return links;
}

const links = buildLinks();

const criticalChain = rows.filter((r) => r.critical && r.duration > 0);
const structure = byId.get("A2040");
const modules = byId.get("A2020");
const inverter = byId.get("A2030");
const utility = byId.get("A1060");

const gridBackground = [
  `repeating-linear-gradient(to right, var(--week-line) 0, var(--week-line) 1px, transparent 1px, transparent ${
    DAY_W * WEEK_DAYS
  }px)`,
  `repeating-linear-gradient(to right, var(--day-line) 0, var(--day-line) 1px, transparent 1px, transparent ${DAY_W}px)`,
  `repeating-linear-gradient(to bottom, transparent 0, transparent ${ROW_H - 1}px, var(--line) ${ROW_H - 1}px, var(--line) ${ROW_H}px)`,
].join(", ");

function LegendItem({ children, swatch }: { children: React.ReactNode; swatch: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2">
      {swatch}
      <span>{children}</span>
    </span>
  );
}

export function ScheduleView() {
  return (
    <div>
      <p className="text-[13.5px] leading-relaxed" style={{ color: "var(--text-dim)" }}>
        The same programme again, recalculated here in the browser from the activity list and the logic links, so the
        critical path and every float are computed rather than typed in. It is a check on the P6 schedule above and it
        agrees with it activity for activity: {finish} working days from the site survey to handover, the same
        durations, the same total floats. The system is 19.8 kWp of LONGi 550 W N-type modules on a Growatt 20 kW
        inverter. Durations are my own planning estimates.
      </p>

      <dl className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { k: "Duration", v: `${finish} working days`, s: `Ends ${dayLabel(finish)}` },
          { k: "Activities", v: `${workCount} + ${milestoneCount} milestones`, s: `${wbsGroups.length} WBS groups` },
          { k: "Critical", v: `${criticalCount} activities`, s: "Total float of zero" },
          { k: "Near critical", v: `${nearCriticalCount} activities`, s: "Float of 1 to 2 days" },
        ].map((x) => (
          <div key={x.k} className="rounded-xl border px-3.5 py-2.5" style={{ borderColor: "var(--line)" }}>
            <dt className="text-[11.5px] font-semibold uppercase tracking-[0.08em]" style={{ color: "var(--text-faint)" }}>
              {x.k}
            </dt>
            <dd className="mt-0.5 text-[14.5px] font-bold">{x.v}</dd>
            <dd className="text-[12px]" style={{ color: "var(--text-faint)" }}>
              {x.s}
            </dd>
          </div>
        ))}
      </dl>

      <div
        className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[12px]"
        style={{ color: "var(--text-dim)" }}
        aria-hidden="true"
      >
        <LegendItem swatch={<span className="h-2.5 w-6 rounded-sm" style={{ background: "var(--crit)" }} />}>
          Critical activity
        </LegendItem>
        <LegendItem swatch={<span className="h-2.5 w-6 rounded-sm" style={{ background: "var(--bar)" }} />}>
          Non-critical activity
        </LegendItem>
        <LegendItem swatch={<span className="h-0.5 w-6" style={{ background: "var(--bar-float)" }} />}>
          Total float
        </LegendItem>
        <LegendItem
          swatch={<span className="h-2.5 w-2.5 rotate-45" style={{ background: "var(--text)" }} />}
        >
          Milestone
        </LegendItem>
        <LegendItem swatch={<span className="h-1.5 w-6 rounded-sm" style={{ background: "var(--text-dim)" }} />}>
          WBS summary
        </LegendItem>
      </div>

      {/* Screen readers get a real table; the drawing below is decorative. */}
      <table className="sr-only">
        <caption>Activity list with working-day start, finish and total float</caption>
        <thead>
          <tr>
            <th>ID</th>
            <th>Activity</th>
            <th>Duration</th>
            <th>Start day</th>
            <th>Finish day</th>
            <th>Total float</th>
            <th>Predecessors</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.name}</td>
              <td>{r.duration}</td>
              <td>{startText(r)}</td>
              <td>{finishText(r)}</td>
              <td>{r.totalFloat}</td>
              <td>{r.preds.map((p) => `${p.from} ${p.type}${p.lag ? ` +${p.lag}` : ""}`).join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="sm:hidden mt-3 text-[12px]" style={{ color: "var(--text-faint)" }}>
        Swipe the programme sideways to see the timeline.
      </p>
      <div
        className="mt-3 overflow-x-auto rounded-xl border"
        style={{ borderColor: "var(--line)", background: "var(--bg-card)" }}
        role="region"
        aria-label="Programme drawing, scrolls sideways on small screens"
        tabIndex={0}
      >
        <div className="flex" style={{ minWidth: LEFT_W + PAD + GANTT_W }} aria-hidden="true">
          {/* Left: activity table */}
          <div
            className="shrink-0 sm:sticky sm:left-0 z-10 border-r"
            style={{ width: LEFT_W, background: "var(--bg-card)", borderColor: "var(--line-strong)" }}
          >
            <div
              className="flex items-end border-b text-[11px] font-bold uppercase tracking-[0.06em]"
              style={{ height: HEAD_H, borderColor: "var(--line-strong)", color: "var(--text-faint)" }}
            >
              <div className="px-2 pb-1.5" style={{ width: COL.id }}>
                ID
              </div>
              <div className="pb-1.5" style={{ width: COL.name }}>
                Activity name
              </div>
              <div className="pb-1.5 text-right pr-2" style={{ width: COL.dur }}>
                Dur
              </div>
              <div className="pb-1.5 text-right pr-2" style={{ width: COL.start }}>
                Start
              </div>
              <div className="pb-1.5 text-right pr-2" style={{ width: COL.finish }}>
                Finish
              </div>
              <div className="pb-1.5 text-right pr-2" style={{ width: COL.tf }}>
                TF
              </div>
            </div>
            {display.map((d) =>
              d.kind === "group" ? (
                <div
                  key={d.code}
                  className="flex items-center border-b text-[12px] font-bold"
                  style={{ height: ROW_H, borderColor: "var(--line)", background: "var(--bg-card-hover)" }}
                >
                  <div className="px-2" style={{ width: COL.id }}>
                    {d.code}
                  </div>
                  <div className="truncate" style={{ width: COL.name }}>
                    {d.name}
                  </div>
                  <div className="text-right pr-2 font-semibold" style={{ width: COL.dur, color: "var(--text-dim)" }}>
                    {d.ef - d.es}
                  </div>
                  <div className="text-right pr-2 font-semibold" style={{ width: COL.start, color: "var(--text-dim)" }}>
                    {d.es + 1}
                  </div>
                  <div className="text-right pr-2 font-semibold" style={{ width: COL.finish, color: "var(--text-dim)" }}>
                    {d.ef}
                  </div>
                  <div style={{ width: COL.tf }} />
                </div>
              ) : (
                <div
                  key={d.row.id}
                  className="flex items-center border-b text-[12px]"
                  style={{
                    height: ROW_H,
                    borderColor: "var(--line)",
                    color: d.row.critical ? "var(--text)" : "var(--text-dim)",
                  }}
                >
                  <div className="px-2 font-mono text-[11px]" style={{ width: COL.id, color: "var(--text-faint)" }}>
                    {d.row.id}
                  </div>
                  <div className="truncate pr-2" style={{ width: COL.name }} title={d.row.name}>
                    {d.row.name}
                  </div>
                  <div className="text-right pr-2 tabular-nums" style={{ width: COL.dur }}>
                    {d.row.duration}
                  </div>
                  <div className="text-right pr-2 tabular-nums" style={{ width: COL.start }}>
                    {startText(d.row)}
                  </div>
                  <div className="text-right pr-2 tabular-nums" style={{ width: COL.finish }}>
                    {finishText(d.row)}
                  </div>
                  <div
                    className="text-right pr-2 tabular-nums font-semibold"
                    style={{ width: COL.tf, color: d.row.critical ? "var(--crit)" : undefined }}
                  >
                    {d.row.totalFloat}
                  </div>
                </div>
              )
            )}
          </div>

          {/* Right: timeline */}
          <div className="relative flex-1" style={{ minWidth: PAD + GANTT_W }}>
            <div className="border-b" style={{ height: HEAD_H, borderColor: "var(--line-strong)" }}>
              <div className="flex" style={{ height: HEAD_H / 2, paddingLeft: PAD }}>
                {Array.from({ length: weeks }, (_, w) => {
                  const days = Math.min(WEEK_DAYS, finish - w * WEEK_DAYS);
                  return (
                    <div
                      key={w}
                      className="border-l text-center text-[11px] font-bold leading-6 overflow-hidden"
                      style={{
                        width: days * DAY_W,
                        borderColor: "var(--week-line)",
                        color: "var(--text-dim)",
                      }}
                    >
                      {days >= 3 ? `Wk ${w + 1}` : `W${w + 1}`}
                    </div>
                  );
                })}
              </div>
              <div className="flex" style={{ height: HEAD_H / 2, paddingLeft: PAD }}>
                {Array.from({ length: finish }, (_, i) => (
                  <div
                    key={i}
                    className="text-center text-[10.5px] leading-6 tabular-nums"
                    style={{ width: DAY_W, color: "var(--text-faint)" }}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative" style={{ height: BODY_H, backgroundImage: gridBackground, backgroundPosition: `${PAD}px 0, ${PAD}px 0, 0 0` }}>
              {display.map((d, i) => {
                const top = i * ROW_H;
                if (d.kind === "group") {
                  return (
                    <div
                      key={d.code}
                      className="absolute"
                      style={{
                        left: PAD + d.es * DAY_W,
                        width: (d.ef - d.es) * DAY_W,
                        top: top + 9,
                        height: 8,
                        background: "var(--text-dim)",
                        clipPath: "polygon(0 0, 100% 0, 100% 100%, calc(100% - 5px) 55%, 5px 55%, 0 100%)",
                      }}
                    />
                  );
                }
                const r = d.row;
                if (r.duration === 0) {
                  return (
                    <div
                      key={r.id}
                      className="absolute"
                      style={{
                        left: PAD + r.es * DAY_W - 6,
                        top: top + 8,
                        width: 12,
                        height: 12,
                        transform: "rotate(45deg)",
                        background: "var(--text)",
                        borderRadius: 2,
                      }}
                    />
                  );
                }
                return (
                  <div key={r.id}>
                    <div
                      className="absolute"
                      style={{
                        left: PAD + r.es * DAY_W + 1,
                        width: r.duration * DAY_W - 2,
                        top: top + 8,
                        height: 12,
                        borderRadius: 3,
                        background: r.critical ? "var(--crit)" : "var(--bar)",
                      }}
                    />
                    {r.totalFloat > 0 && (
                      <div
                        className="absolute"
                        style={{
                          left: PAD + r.ef * DAY_W,
                          width: r.totalFloat * DAY_W,
                          top: top + 13,
                          height: 2,
                          background: "var(--bar-float)",
                        }}
                      />
                    )}
                  </div>
                );
              })}

              <svg className="absolute inset-0 pointer-events-none" width="100%" height={BODY_H}>
                <defs>
                  <marker id="p6-arrow" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M0,0 L6,3 L0,6 z" style={{ fill: "var(--link)" }} />
                  </marker>
                  <marker id="p6-arrow-crit" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M0,0 L6,3 L0,6 z" style={{ fill: "var(--crit)" }} />
                  </marker>
                </defs>
                {links.map((l, i) => (
                  <path
                    key={i}
                    d={l.d}
                    fill="none"
                    strokeWidth={1}
                    style={{ stroke: l.critical ? "var(--crit)" : "var(--link)" }}
                    markerEnd={l.critical ? "url(#p6-arrow-crit)" : "url(#p6-arrow)"}
                  />
                ))}
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div>
          <h3 className="text-[13px] font-bold uppercase tracking-[0.1em]" style={{ color: "var(--text-faint)" }}>
            Critical path
          </h3>
          <ol className="mt-3 space-y-1.5">
            {criticalChain.map((r, i) => (
              <li key={r.id} className="flex items-center gap-3 text-[13px]">
                <span
                  className="grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[11px] font-bold tabular-nums"
                  style={{ borderColor: "var(--crit)", color: "var(--crit)" }}
                >
                  {i + 1}
                </span>
                <span className="flex-1" style={{ color: "var(--text)" }}>
                  {r.name}
                </span>
                <span className="tabular-nums" style={{ color: "var(--text-faint)" }}>
                  {r.duration} {r.duration === 1 ? "day" : "days"}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h3 className="text-[13px] font-bold uppercase tracking-[0.1em]" style={{ color: "var(--text-faint)" }}>
            What the programme shows
          </h3>
          <ul className="mt-3 space-y-2 text-[13.5px] leading-relaxed" style={{ color: "var(--text-dim)" }}>
            {structure && modules && inverter && (
              <li>
                Mounting structure fabrication ({structure.duration} days) drives the programme, so it is the order to
                chase hardest. Modules carry {modules.totalFloat} days of float and the inverter {inverter.totalFloat},
                so those deliveries can slip that far before handover moves.
              </li>
            )}
            {utility && (
              <li>
                The utility approval has {utility.totalFloat} days of float. It sits outside my control, which makes it
                the nearest thing to a second critical path.
              </li>
            )}
            <li>
              Any delay to a critical activity moves the handover day for day. A delay to a floated activity only does
              once it has used up its float.
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-6 rounded-xl border p-4" style={{ borderColor: "var(--line)" }}>
        <h3 className="text-[13px] font-bold uppercase tracking-[0.1em]" style={{ color: "var(--text-faint)" }}>
          How it is set up
        </h3>
        <ul className="mt-3 space-y-1.5 text-[13px] leading-relaxed" style={{ color: "var(--text-dim)" }}>
          <li>
            Calendar: six working days a week, Monday to Saturday. Durations are working days, and day 1 is a Monday.
          </li>
          <li>
            Logic: finish to start unless noted. Two start-to-start links carry lags: DC cabling starts 1 day into
            module installation, and inverter mounting starts 2 days into the structure work.
          </li>
          <li>
            A start milestone, a finish milestone and two in between (design approved, and mechanical and electrical
            completion). No open ends: every activity has a predecessor and a successor.
          </li>
          <li>
            Start, finish and float are calculated by a forward and backward pass over the durations and logic. Nothing
            is typed in.
          </li>
          <li>
            Activity durations and the utility approval time are my own planning estimates. There is no resource or
            cost loading.
          </li>
        </ul>
      </div>
    </div>
  );
}
