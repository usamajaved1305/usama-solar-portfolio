// The four kinds of solar job the portfolio is aimed at. "asks" sums up what Irish job ads for these roles
// ask for (October 2026), kept to the asks the "brings" column can answer; "brings" must stay true to the CV
// in data.ts.
export type Role = {
  slug: "planning" | "project-engineering" | "site-delivery" | "energy-analytics";
  icon: "calendar" | "ruler" | "hard-hat" | "chart";
  family: string;
  /** Card heading on the home page and the H1 of the role page: the job title Irish ads use. */
  title: string;
  /** Page title before " | Usama Javed"; kept under about 60 characters with the suffix. */
  seoTitle: string;
  /** Under about 155 characters so Google shows it whole. */
  metaDescription: string;
  /** One line: the part of the job I'd pick up. */
  fit: string;
  /** One line of numbers from the CV. */
  record: string;
  tools: string[];
  targets: string[];
  pitch: string;
  asks: string[];
  brings: string[];
  /** Keys of buildToolArtifacts; each opens a portfolio project. */
  proof: string[];
  /** The two proofs shown on the home card; the role page shows them all. */
  homeProof: string[];
  /** Button text that differs from PROOF_LABELS on this page only. */
  proofLabels?: Record<string, string>;
  /** One picture under the hero, so the page is not text only. small: a narrower copy for srcset. */
  picture?: { src: string; alt: string; caption: string; w: number; h: number; small?: { src: string; w: number } };
};

export const roles: Role[] = [
  {
    slug: "planning",
    icon: "calendar",
    family: "Planning and scheduling",
    title: "Project Planning Engineer",
    seoTitle: "Solar Project Planning Engineer, Dublin",
    metaDescription:
      "Solar PV project planner in Dublin: built programmes and cost baselines for 36 projects, 85 to 90% on time. P6 and MS Project programme files to open.",
    fit:
      "Construction programmes, baselines, look-aheads and progress reporting, planned by someone who has had to deliver them on site.",
    record:
      "Built and tracked programmes and cost baselines as a solar project manager; 85 to 90% of 36 projects on time.",
    tools: ["Primavera P6", "MS Project", "Advanced Excel", "Power BI"],
    targets: ["Project Planner", "Project Scheduler", "Planning Engineer"],
    pitch:
      "The programmes I built as a project manager were the ones I then had to deliver, across five concurrent sites, so I plan with the site in mind.",
    asks: [
      "Programmes in Primavera P6, Asta Powerproject or MS Project",
      "Baselines, critical path and progress tracked against plan",
      "Delays, interfaces and material needs flagged early",
      "Progress and KPI reporting in Excel and Power BI",
    ],
    brings: [
      "Built and maintained project programmes and cost baselines, tracked actual progress against plan and reported status to senior management.",
      "Held 85 to 90% on-time completion across 36 projects with five sites running at once, tracing slippage to material availability and labour shortages and re-sequencing works to contain the impact on downstream activities.",
      "Re-planned installation dates and re-sequenced site works through a two-month inverter supply delay.",
      "Maintained bills of material and material call-off schedules with procurement, flagging slippage early to protect the installation programme.",
      "Managed interfaces and dependencies between MEP, solar PV and installation teams to protect completion dates.",
    ],
    proof: ["Primavera P6", "MS Project", "Power BI", "Advanced Excel"],
    homeProof: ["Primavera P6", "Power BI"],
  },
  {
    slug: "project-engineering",
    icon: "ruler",
    family: "Solar project and technical engineering",
    title: "Solar PV Project Engineer",
    seoTitle: "Solar PV Project Engineer, Dublin",
    metaDescription:
      "Solar PV project engineer in Dublin: 59 installations from 5 to 115 kWp run end to end, with drawing and SLD review, design checks and commissioning.",
    fit:
      "PV design checks, layouts, drawings and single line diagrams, then site support through testing, commissioning and handover.",
    record:
      "Full lifecycle on 59 installations from 5 kWp to 115 kWp, on-grid, hybrid and off-grid.",
    tools: ["HelioScope", "OpenSolar", "AutoCAD", "SketchUp"],
    targets: ["Project Engineer", "Technical Engineer", "PV Design Engineer"],
    pitch:
      "I ran 59 residential and commercial PV installations from 5 kWp to 115 kWp end to end, from site assessment and design checks to commissioning and handover.",
    asks: [
      "Layouts, single line diagrams and system sizing",
      "Technical review of drawings and specifications",
      "Design checks on roof structure, shading and loads before work starts",
      "Site support through installation, testing and commissioning",
    ],
    brings: [
      "Ran the full lifecycle on 59 residential and commercial PV installations from 5 kWp to 115 kWp.",
      "Reviewed and approved installation drawings, single line diagrams and specifications for on-grid, hybrid and off-grid systems.",
      "Validated roof structure, shading, load calculations and system sizing before mobilisation, cutting on-site design changes and rework.",
      "Carried out commissioning, testing and fault finding, closed out snag lists and issued as-built documentation.",
    ],
    proof: ["Elevated canopy", "Helioscope", "AutoCAD", "SketchUp", "OpenSolar"],
    homeProof: ["Helioscope", "AutoCAD"],
    picture: {
      src: "/feature/helioscope-layout.webp",
      alt: "HelioScope layout of 198 modules on a 115 kWp commercial rooftop",
      caption: "115 kWp commercial rooftop: 198 modules set out along the building at 146 degrees, which fits 35 more modules than facing due south.",
      w: 1090,
      h: 772,
      small: { src: "/feature/helioscope-layout-720.webp", w: 720 },
    },
  },
  {
    slug: "site-delivery",
    icon: "hard-hat",
    family: "Site and field delivery",
    title: "Solar Site Supervisor",
    seoTitle: "Solar PV Site Supervisor, Dublin",
    metaDescription:
      "Solar site supervisor in Dublin: led installation crews of up to 40 across five concurrent sites, checked workmanship and carried out commissioning.",
    fit:
      "Running installation crews, sequencing the work and checking workmanship, with commissioning and fault finding at the end.",
    record:
      "Up to 40 crew members across five concurrent sites; site escalation point for mounting, DC and AC works.",
    tools: ["MS Project", "AutoCAD", "Advanced Excel"],
    targets: ["Installation Supervisor", "Assistant Site Manager"],
    pitch:
      "As a project manager I led three engineers and installation crews of up to 40 people across five concurrent solar sites, and was the escalation point when mounting, DC string routing and AC connection works clashed.",
    asks: [
      "Run installation crews across several sites at once",
      "Health and safety on site, from toolbox talks to working at height",
      "Workmanship checks, snag close-out and client handover",
      "Commissioning, testing and fault finding",
    ],
    brings: [
      "Led three technical engineers and installation crews totalling up to 40 people across five concurrent sites, allocating daily works and sequencing activities to hold projects to programme.",
      "Site HSE: RAMS awareness, toolbox talks, PPE enforcement, working at height and safe systems of work.",
      "Workmanship inspection against specification, snag close-out and client handover.",
      "Carried out commissioning, testing and fault finding, closed out snag lists and issued as-built documentation to clients.",
      "Delivered over 100 PV installations, from 5 kWp domestic systems to a 115 kWp commercial rooftop.",
    ],
    proof: ["Elevated canopy", "MS Project", "AutoCAD"],
    homeProof: ["Elevated canopy", "MS Project"],
    picture: {
      src: "/feature/canopy-model-and-built.webp",
      alt: "SketchUp model of an elevated rooftop solar frame beside the same frame as built",
      caption: "Elevated rooftop frame, 15.375 kWp: the SketchUp model beside the frame as built on site.",
      w: 1200,
      h: 630,
    },
  },
  {
    slug: "energy-analytics",
    icon: "chart",
    family: "Energy data and analytics",
    title: "Energy and Reporting Analyst",
    seoTitle: "Energy and Reporting Analyst, Solar PV",
    metaDescription:
      "Solar engineer with 3.5 years in PV, now on an MSc in Business Analytics in Dublin. Power BI, SQL and Python work built on a 115 kWp commercial rooftop.",
    fit:
      "Turning project and energy data into clear reports, with the solar background to sense-check the numbers.",
    record:
      "MSc Business Analytics (in progress) after 3.5 years in solar PV, including progress reporting to senior management.",
    tools: ["Power BI", "Advanced Excel", "SQL", "Python"],
    targets: ["Reporting Analyst", "Energy Analyst", "Project Controls Analyst"],
    pitch:
      "Three and a half years delivering solar PV, now applying Power BI, SQL and Python to project reporting and forecasting in an MSc in Business Analytics at Dublin Business School.",
    asks: [
      "Power BI dashboards and advanced Excel",
      "SQL and Python to prepare and check data",
      "Solar yields, losses and project KPIs read with an engineer's eye",
      "Regular progress and KPI reports for managers",
    ],
    brings: [
      "MSc Business Analytics at Dublin Business School (in progress): Power BI, SQL, Python analytics and forecasting.",
      "Tracked actual progress against plan and reported project status to senior management as a solar project manager.",
      "Three and a half years delivering solar PV, including shading checks, load calculations and system sizing.",
      "Portfolio work: a Power BI report, a SQL database and a Python energy model for a 115 kWp commercial rooftop, and an hourly battery model in Python.",
    ],
    proof: ["Python", "AutoCAD", "Power BI", "SQL", "Advanced Excel"],
    homeProof: ["Python", "SQL"],
    proofLabels: { AutoCAD: "Hourly battery dispatch model, 79 kWp PV and 63 kWh battery" },
    picture: {
      src: "/feature/autocad-dispatch.webp",
      alt: "Hourly PV generation, site demand, grid import and battery state of charge over two typical days",
      caption: "Battery dispatch on two typical days, from an hour-by-hour Python model of a year for a 79 kWp PV and 63 kWh battery system.",
      w: 900,
      h: 581,
      small: { src: "/feature/autocad-dispatch-480.webp", w: 480 },
    },
  },
];

/** Names for the portfolio projects behind each tool, used on the proof buttons. */
export const PROOF_LABELS: Record<string, string> = {
  "Elevated canopy": "15.375 kWp raised steel frame, designed and built on site",
  "Primavera P6": "20 kW installation programme in P6",
  "MS Project": "20 kW installation programme in MS Project",
  "Advanced Excel": "115 kWp BOM and cost tracker in Excel",
  "Power BI": "115 kWp cost and procurement report in Power BI",
  SQL: "115 kWp procurement database in SQL",
  Python: "115 kWp energy yield estimate in Python",
  Helioscope: "115 kWp roof layout and simulation in HelioScope",
  OpenSolar: "20 kW house design and proposal in OpenSolar",
  SketchUp: "3D model and shading check in SketchUp",
  AutoCAD: "79 kWp PV and 63 kWh battery drawings in AutoCAD",
};

export function roleBySlug(slug: string) {
  return roles.find((r) => r.slug === slug);
}
