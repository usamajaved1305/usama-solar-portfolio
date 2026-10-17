// The four kinds of solar job the portfolio is aimed at. "asks" sums up what Irish job ads for these roles
// ask for (October 2026); "brings" must stay word for word true to the CV in data.ts.
export type Role = {
  slug: "planning" | "project-engineering" | "site-delivery" | "energy-analytics";
  icon: "calendar" | "ruler" | "hard-hat" | "chart";
  family: string;
  targets: string[];
  pitch: string;
  asks: string[];
  /** Short versions of "brings" for the cards on the home page. */
  highlights: string[];
  brings: string[];
  /** Tool names from data.ts toolCategories; each opens the portfolio project built with it. */
  proof: string[];
};

export const roles: Role[] = [
  {
    slug: "planning",
    icon: "calendar",
    family: "Planning and scheduling",
    targets: ["Project Planning Engineer", "Junior Planner", "Project Scheduler"],
    pitch:
      "The programmes I built as a project manager were the ones I then had to deliver, across five concurrent sites, so I plan with the site in mind.",
    asks: [
      "Construction programmes in Primavera P6, Asta Powerproject or MS Project",
      "Baselines, critical path and progress tracked against plan",
      "Delays and risks flagged early",
      "Progress and KPI reporting in Excel and Power BI",
    ],
    highlights: [
      "Built and tracked project programmes and cost baselines",
      "85 to 90% of 36 projects on time, five sites at once",
      "Re-planned site works through a two month inverter delay",
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
    targets: ["Project Engineer", "Technical Engineer", "PV Design Engineer"],
    pitch:
      "Three and a half years delivering solar PV, from site assessment and design checks to commissioning and handover.",
    asks: [
      "PV design in AutoCAD and PVsyst: layouts, system sizing and yield",
      "Technical review of drawings and specifications",
      "Irish grid connection rules: ESB Networks requirements and IEC standards",
      "Site visits during construction, testing and commissioning",
    ],
    highlights: [
      "Full lifecycle on 59 PV installations, 5 to 115 kWp",
      "Drawings, single line diagrams and specifications reviewed and approved",
      "Commissioning, testing, snag lists and as-built handover",
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
    targets: ["Site Supervisor", "Field Operations Manager", "Field Service Engineer"],
    pitch:
      "In my last role I led installation crews across five concurrent sites and was the escalation point for the problems that only show up during installation.",
    asks: [
      "Manage installation and service teams across sites",
      "Check workmanship against drawings and specifications",
      "Health, safety and quality management on site",
      "Commissioning and fault finding on PV and battery systems",
    ],
    highlights: [
      "Crews of up to 40 people across five concurrent sites",
      "Site escalation point for mounting, DC and AC interfaces",
      "12 site inspections on workmanship and safety",
    ],
    brings: [
      "Led three technical engineers and installation crews of up to 40 people across five concurrent sites.",
      "Acted as the site escalation point, resolving clashes between mechanical mounting, DC string routing and AC connection works.",
      "Carried out 12 site inspections to verify workmanship against specification and enforce site safety standards.",
      "Delivered over 100 PV installations, from 5 kWp domestic systems to a 115 kWp commercial rooftop.",
    ],
    proof: ["AutoCAD", "MS Project", "SketchUp"],
  },
  {
    slug: "energy-analytics",
    icon: "chart",
    family: "Energy data and analytics",
    targets: ["Energy Analyst", "Asset Performance Analyst", "Reporting Analyst"],
    pitch:
      "I'm studying for an MSc in Business Analytics after three and a half years delivering solar PV, so I bring an engineer's sense of what energy and project numbers mean.",
    asks: [
      "Power BI dashboards and advanced Excel",
      "Large datasets, with SQL and Python an advantage",
      "An understanding of solar yield, losses and performance",
      "Clear reports for engineers and managers",
    ],
    highlights: [
      "MSc Business Analytics (in progress): Power BI, SQL, Python",
      "3.5 years in solar PV, including shading, loads and sizing",
      "Status and progress reporting to senior management",
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

export function roleBySlug(slug: string) {
  return roles.find((r) => r.slug === slug);
}
