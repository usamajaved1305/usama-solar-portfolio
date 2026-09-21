// Installation programme for the 20 kW on-grid residential system.
// Durations and logic are entered here; start, finish and float are calculated by the
// critical path method (forward pass, then backward pass), not typed in.

export type RelType = "FS" | "SS";

export type Relationship = { from: string; type: RelType; lag?: number };

export type Activity = {
  id: string;
  name: string;
  wbs: string;
  /** Working days. Zero means a milestone. */
  duration: number;
  preds: Relationship[];
};

export type WbsGroup = { code: string; name: string };

export type Scheduled = Activity & {
  /** Time in working days from the start of Day 1, so the start of Day 1 is 0. */
  es: number;
  ef: number;
  ls: number;
  lf: number;
  totalFloat: number;
  critical: boolean;
  nearCritical: boolean;
};

export const PROJECT = {
  name: "20 kW On-Grid Residential Solar System",
  code: "RES-20",
  workDaysPerWeek: 6,
};

export const wbsGroups: WbsGroup[] = [
  { code: "1.1", name: "Design and Approvals" },
  { code: "1.2", name: "Procurement" },
  { code: "1.3", name: "Installation" },
  { code: "1.4", name: "Testing, Commissioning and Handover" },
];

export const activities: Activity[] = [
  { id: "A1000", name: "Project start", wbs: "1.1", duration: 0, preds: [] },
  { id: "A1010", name: "Site survey and roof assessment", wbs: "1.1", duration: 1, preds: [{ from: "A1000", type: "FS" }] },
  {
    id: "A1020",
    name: "System design, layout and single line diagram",
    wbs: "1.1",
    duration: 3,
    preds: [{ from: "A1010", type: "FS" }],
  },
  { id: "A1030", name: "Client design review and sign-off", wbs: "1.1", duration: 1, preds: [{ from: "A1020", type: "FS" }] },
  { id: "A1040", name: "Design approved", wbs: "1.1", duration: 0, preds: [{ from: "A1030", type: "FS" }] },
  {
    id: "A1050",
    name: "Submit grid connection application",
    wbs: "1.1",
    duration: 1,
    preds: [{ from: "A1040", type: "FS" }],
  },
  {
    id: "A1060",
    name: "Utility approval and metering (external)",
    wbs: "1.1",
    duration: 14,
    preds: [{ from: "A1050", type: "FS" }],
  },

  {
    id: "A2010",
    name: "Bill of materials and purchase orders",
    wbs: "1.2",
    duration: 1,
    preds: [{ from: "A1040", type: "FS" }],
  },
  {
    id: "A2020",
    name: "Module delivery, Longi 550 W N-type",
    wbs: "1.2",
    duration: 5,
    preds: [{ from: "A2010", type: "FS" }],
  },
  {
    id: "A2030",
    name: "Inverter delivery, Growatt 20 kW",
    wbs: "1.2",
    duration: 6,
    preds: [{ from: "A2010", type: "FS" }],
  },
  {
    id: "A2040",
    name: "Mounting structure fabrication and delivery",
    wbs: "1.2",
    duration: 7,
    preds: [{ from: "A2010", type: "FS" }],
  },
  {
    id: "A2050",
    name: "Cables, protection and earthing delivery",
    wbs: "1.2",
    duration: 4,
    preds: [{ from: "A2010", type: "FS" }],
  },

  {
    id: "A3010",
    name: "Site mobilisation, induction and setup",
    wbs: "1.3",
    duration: 1,
    preds: [{ from: "A2040", type: "FS" }],
  },
  { id: "A3020", name: "Install mounting structure", wbs: "1.3", duration: 4, preds: [{ from: "A3010", type: "FS" }] },
  {
    id: "A3030",
    name: "Install PV modules",
    wbs: "1.3",
    duration: 3,
    preds: [
      { from: "A3020", type: "FS" },
      { from: "A2020", type: "FS" },
    ],
  },
  {
    id: "A3040",
    name: "DC string cabling and terminations",
    wbs: "1.3",
    duration: 2,
    preds: [{ from: "A3030", type: "SS", lag: 1 }],
  },
  {
    id: "A3050",
    name: "Mount inverter and AC/DC protection boxes",
    wbs: "1.3",
    duration: 2,
    preds: [
      { from: "A3020", type: "SS", lag: 2 },
      { from: "A2030", type: "FS" },
    ],
  },
  {
    id: "A3060",
    name: "AC cabling to distribution board",
    wbs: "1.3",
    duration: 2,
    preds: [
      { from: "A3050", type: "FS" },
      { from: "A2050", type: "FS" },
    ],
  },
  { id: "A3070", name: "Earthing and lightning protection", wbs: "1.3", duration: 2, preds: [{ from: "A3020", type: "FS" }] },
  {
    id: "A3080",
    name: "Mechanical and electrical completion",
    wbs: "1.3",
    duration: 0,
    preds: [
      { from: "A3030", type: "FS" },
      { from: "A3040", type: "FS" },
      { from: "A3060", type: "FS" },
      { from: "A3070", type: "FS" },
    ],
  },

  {
    id: "A4010",
    name: "Pre-commissioning inspection and testing",
    wbs: "1.4",
    duration: 1,
    preds: [{ from: "A3080", type: "FS" }],
  },
  {
    id: "A4020",
    name: "Inverter setup, energisation and commissioning",
    wbs: "1.4",
    duration: 1,
    preds: [
      { from: "A4010", type: "FS" },
      { from: "A1060", type: "FS" },
    ],
  },
  { id: "A4030", name: "Snagging and rectification", wbs: "1.4", duration: 1, preds: [{ from: "A4020", type: "FS" }] },
  {
    id: "A4040",
    name: "As-builts, monitoring setup and handover",
    wbs: "1.4",
    duration: 1,
    preds: [{ from: "A4030", type: "FS" }],
  },
  { id: "A4050", name: "Project complete", wbs: "1.4", duration: 0, preds: [{ from: "A4040", type: "FS" }] },
];

const NEAR_CRITICAL_DAYS = 2;

/** Earliest start an activity may take given one predecessor relationship. */
function earliestFrom(rel: Relationship, pred: { es: number; ef: number }): number {
  const lag = rel.lag ?? 0;
  if (rel.type === "FS") return pred.ef + lag;
  return pred.es + lag; // SS
}

/** Latest start the predecessor may take without delaying the successor. */
function latestStartFor(rel: Relationship, succLs: number, duration: number): number {
  const lag = rel.lag ?? 0;
  if (rel.type === "FS") return succLs - lag - duration;
  return succLs - lag; // SS: the predecessor must start `lag` days before the successor starts
}

export function schedule(list: Activity[] = activities): { rows: Scheduled[]; finish: number } {
  const byId = new Map<string, Scheduled>();
  const rows: Scheduled[] = [];

  // Forward pass. The list is ordered so predecessors always appear first.
  for (const a of list) {
    let es = 0;
    for (const rel of a.preds) {
      const p = byId.get(rel.from);
      if (!p) throw new Error(`${a.id}: predecessor ${rel.from} is missing or listed after it`);
      es = Math.max(es, earliestFrom(rel, p));
    }
    const row: Scheduled = {
      ...a,
      es,
      ef: es + a.duration,
      ls: 0,
      lf: 0,
      totalFloat: 0,
      critical: false,
      nearCritical: false,
    };
    byId.set(a.id, row);
    rows.push(row);
  }

  const finish = Math.max(...rows.map((r) => r.ef));

  // Backward pass, from the last activity back to the first.
  const succs = new Map<string, { rel: Relationship; succ: Scheduled }[]>();
  for (const r of rows) {
    for (const rel of r.preds) {
      const bucket = succs.get(rel.from) ?? [];
      bucket.push({ rel, succ: r });
      succs.set(rel.from, bucket);
    }
  }
  for (const r of [...rows].reverse()) {
    let ls = finish - r.duration;
    for (const { rel, succ } of succs.get(r.id) ?? []) {
      ls = Math.min(ls, latestStartFor(rel, succ.ls, r.duration));
    }
    r.ls = ls;
    r.lf = ls + r.duration;
    r.totalFloat = r.ls - r.es;
    r.critical = r.totalFloat === 0;
    r.nearCritical = r.totalFloat > 0 && r.totalFloat <= NEAR_CRITICAL_DAYS;
  }

  return { rows, finish };
}

/** The structural checks a planner runs before trusting a programme. Returns the problems found. */
export function validate(list: Activity[] = activities): string[] {
  const problems: string[] = [];
  const ids = new Set<string>();
  for (const a of list) {
    if (ids.has(a.id)) problems.push(`Duplicate ID ${a.id}`);
    ids.add(a.id);
  }
  // Open ends: every activity needs a finish-driven successor (FS) and a start-driven predecessor (FS or SS).
  const hasFsSucc = new Set<string>();
  for (const a of list) for (const r of a.preds) if (r.type === "FS") hasFsSucc.add(r.from);
  const startless = list.filter((a) => a.preds.length === 0);
  if (startless.length !== 1) problems.push(`Expected one start activity, found ${startless.length}`);
  const endless = list.filter((a) => !hasFsSucc.has(a.id));
  if (endless.length !== 1) problems.push(`Open finish (no FS successor): ${endless.map((a) => a.id).join(", ")}`);
  for (const a of list) if (a.duration < 0 || !Number.isInteger(a.duration)) problems.push(`${a.id}: bad duration`);
  for (const g of new Set(list.map((a) => a.wbs))) {
    if (!wbsGroups.some((w) => w.code === g)) problems.push(`Unknown WBS ${g}`);
  }
  try {
    schedule(list);
  } catch (e) {
    problems.push(String(e));
  }
  return problems;
}

/** Working-day label such as "Wk 2 Mon". Day 1 is a Monday. */
export function dayLabel(day: number): string {
  const week = Math.ceil(day / PROJECT.workDaysPerWeek);
  const dow = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][(day - 1) % PROJECT.workDaysPerWeek];
  return `Wk ${week} ${dow}`;
}
