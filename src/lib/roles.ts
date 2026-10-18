// The four kinds of solar job the portfolio is aimed at. "asks" sums up what Irish job ads for these roles
// ask for (October 2026); "brings" must stay word for word true to the CV in data.ts.
export type Role = {
  slug: "planning" | "project-engineering" | "site-delivery" | "energy-analytics";
  icon: "calendar" | "ruler" | "hard-hat" | "chart";
  family: string;
  /** Card heading on the home page. */
  title: string;
  /** One line: the part of the job I'd pick up. */
  fit: string;
  /** One line of numbers from the CV. */
  record: string;
  tools: string[];
  targets: string[];
  pitch: string;
  asks: string[];
  brings: string[];
  /** Tool names from data.ts toolCategories; each opens the portfolio project built with it. */
  proof: string[];
};

export const roles: Role[] = [
  {
    slug: "planning",
    icon: "calendar",
    family: "Planning and scheduling",
    title: "Project Planner / Scheduler",
    fit:
      "Construction programmes, baselines, look-aheads and progress reporting, planned by someone who has had to deliver them on site.",
    record:
      "Built and tracked programmes and cost baselines as a solar project manager; 85 to 90% of 36 projects on time.",
    tools: ["Primavera P6", "MS Project", "Advanced Excel", "Power BI"],
    targets: ["Project Planning Engineer", "Junior Planner", "Project Scheduler"],
    pitch:
      "The programmes I built as a project manager were the ones I then had to deliver, across five concurrent sites, so I plan with the site in mind.",
    asks: [
      "Construction programmes in Primavera P6, Asta Powerproject or MS Project",
      "Baselines, critical path and progress tracked against plan",
      "Delays and risks flagged early",
      "Progress and KPI reporting in Excel and Power BI",
    ],
    brings: [
      "Built and maintained project programmes and cost baselines, tracked actual progress against plan and reported status to senior management.",
      "Held 85 to 90% on-time completion across 36 projects with five sites running at once, tracing slippage to material availability and labour shortages and re-sequencing works to contain the impact on downstream activities.",
      "Re-planned installation dates and re-sequenced site works through a two month inverter supply delay.",
      "Work breakdown structures, look-ahead programmes, milestone tracking and variance reporting.",
    ],
    proof: ["Primavera P6", "MS Project", "Power BI", "Advanced Excel"],
  },
  {
    slug: "project-engineering",
    icon: "ruler",
    family: "Solar project and technical engineering",
    title: "Solar Project / Technical Engineer",
    fit:
      "PV design checks, layouts, drawings and single line diagrams, then site support through testing, commissioning and handover.",
    record:
      "Full lifecycle on 59 installations from 5 kWp to 115 kWp, on-grid, hybrid and off-grid.",
    tools: ["Helioscope", "OpenSolar", "AutoCAD", "SketchUp"],
    targets: ["Project Engineer", "Technical Engineer", "PV Design Engineer"],
    pitch:
      "Three and a half years delivering solar PV, from site assessment and design checks to commissioning and handover.",
    asks: [
      "PV design in AutoCAD and PVsyst: layouts, system sizing and yield",
      "Technical review of drawings and specifications",
      "ESB Networks connection requirements, ET103 and IEC standards",
      "Site visits during construction, testing and commissioning",
    ],
    brings: [
      "Ran the full lifecycle on 59 residential and commercial PV installations from 5 kWp to 115 kWp.",
      "Reviewed and approved installation drawings, single line diagrams and specifications for on-grid, hybrid and off-grid systems.",
      "Validated roof structure, shading, load calculations and system sizing before mobilisation, cutting on-site design changes and rework.",
      "Carried out commissioning, testing and fault finding, closed out snag lists and issued as-built documentation.",
    ],
    proof: ["Helioscope", "OpenSolar", "AutoCAD", "SketchUp"],
  },
  {
    slug: "site-delivery",
    icon: "hard-hat",
    family: "Site and field delivery",
    title: "Site Supervisor / Field Delivery",
    fit:
      "Running installation crews, sequencing the work and checking workmanship, with commissioning and fault finding at the end.",
    record:
      "Up to 40 crew members across five concurrent sites; site escalation point for mounting, DC and AC works.",
    tools: ["MS Project", "AutoCAD", "Advanced Excel"],
    targets: ["Site Supervisor", "Field Operations Manager", "Field Service Engineer"],
    pitch:
      "In my last role I led installation crews across five concurrent sites and was the site escalation point for clashes between mounting, DC string routing and AC connection works.",
    asks: [
      "Manage installation and service teams across sites",
      "Read drawings and schematics, and work safely on LV and MV systems",
      "Health, safety and quality management on site",
      "Commissioning and fault finding on PV and battery systems",
    ],
    brings: [
      "Led three technical engineers and installation crews totalling up to 40 people across five concurrent sites.",
      "Acted as the site escalation point, resolving clashes between mechanical mounting, DC string routing and AC connection works.",
      "Carried out 12 site inspections to verify workmanship against specification and enforce site safety standards.",
      "Delivered over 100 PV installations, from 5 kWp domestic systems to a 115 kWp commercial rooftop.",
    ],
    proof: ["AutoCAD", "MS Project", "Advanced Excel"],
  },
  {
    slug: "energy-analytics",
    icon: "chart",
    family: "Energy data and analytics",
    title: "Energy / Reporting Analyst",
    fit:
      "Turning project and energy data into clear reports, with the solar background to sense-check the numbers.",
    record:
      "MSc Business Analytics (in progress) after 3.5 years in solar PV, including progress reporting to senior management.",
    tools: ["Power BI", "Advanced Excel", "SQL", "Python"],
    targets: ["Energy Analyst", "Technical Report Writer", "Reporting Analyst"],
    pitch:
      "I'm studying for an MSc in Business Analytics after three and a half years delivering solar PV, so I bring an engineer's sense of what energy and project numbers mean.",
    asks: [
      "Power BI dashboards and advanced Excel",
      "Large datasets, with SQL and Python an advantage",
      "Renewables experience and an understanding of solar asset performance",
      "Regular performance and KPI reports",
    ],
    brings: [
      "MSc Business Analytics at Dublin Business School (in progress): Power BI, SQL, Python analytics and forecasting.",
      "Three and a half years delivering solar PV, including shading checks, load calculations and system sizing.",
      "Tracked actual progress against plan and reported project status to senior management.",
      "Portfolio work: a Power BI report, a SQL database and a Python energy model for a 115 kWp commercial rooftop.",
    ],
    proof: ["Power BI", "SQL", "Python", "Advanced Excel"],
  },
];

/** Names for the portfolio projects behind each tool, used on the proof buttons. */
export const PROOF_LABELS: Record<string, string> = {
  "Primavera P6": "20 kW installation programme in P6",
  "MS Project": "20 kW installation programme in MS Project",
  "Advanced Excel": "115 kWp BOM and cost tracker in Excel",
  "Power BI": "115 kWp cost and procurement report in Power BI",
  SQL: "115 kWp procurement database in SQL",
  Python: "115 kWp energy yield estimate in Python",
  Helioscope: "115 kWp roof layout and simulation in HelioScope",
  OpenSolar: "20 kW house design and proposal in OpenSolar",
  SketchUp: "3D model and shading check in SketchUp",
  AutoCAD: "80 kW PV and 63 kWh battery drawings in AutoCAD",
};

export function roleBySlug(slug: string) {
  return roles.find((r) => r.slug === slug);
}
