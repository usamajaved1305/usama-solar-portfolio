export const profile = {
  name: "Usama Javed",
  role: "Solar PV Project Delivery, Site Supervision & Project Planning",
  location: "Adamstown, Dublin, Ireland",
  phone: "+353 85 773 5337",
  email: "usamajaved1305@gmail.com",
  // Leave empty until the real profile URL is confirmed; the LinkedIn button only renders when set.
  linkedin: "",
  lede:
    "Mechatronics engineer with three and a half years delivering solar PV projects from site survey through installation, commissioning and client handover. Experienced leading installation crews on live sites, and equally strong on the planning side: programmes, bills of material, budgets and milestone tracking.",
  availability: "Open to site supervision, project engineering and planning roles",
};

export const stats = [
  { value: 100, suffix: "+", label: "PV installations delivered", sub: "5 kWp domestic to 150 kWp factory rooftop" },
  { value: 790, suffix: " kWp", label: "Delivered in a single year", sub: "36 projects, 85% on-time completion" },
  { value: 40, suffix: "", label: "Crew members at peak", sub: "across up to 5 concurrent sites" },
  { value: 3.5, suffix: " yrs", label: "Solar PV experience", sub: "site survey through commissioning" },
];

export const competencies = [
  {
    title: "Site Delivery",
    icon: "hard-hat",
    items: [
      "Installation crew leadership",
      "Daily work allocation and activity sequencing",
      "Workmanship inspection",
      "Snag close-out and client handover",
    ],
  },
  {
    title: "Technical Review",
    icon: "ruler",
    items: [
      "Installation drawings and single line diagrams",
      "Layouts, load calculations and system sizing",
      "On-grid, hybrid and off-grid PV",
      "Rooftop, ground mount and carport",
    ],
  },
  {
    title: "Planning & Controls",
    icon: "calendar-clock",
    items: [
      "Work breakdown structure and baselines",
      "Milestone tracking and critical path awareness",
      "Look-ahead programmes",
      "Variance reporting and recovery planning",
    ],
  },
  {
    title: "Cost & Procurement",
    icon: "wallet",
    items: ["Budget control", "Bill of materials", "Material call-off planning", "Long lead item tracking"],
  },
  {
    title: "Commissioning",
    icon: "check-circle",
    items: ["Testing and fault finding", "As-built documentation", "Post-installation support"],
  },
  {
    title: "Site HSE",
    icon: "shield-check",
    items: ["RAMS awareness", "Toolbox talks", "PPE enforcement", "Working at height and safe systems of work"],
  },
];

export const toolCategories = [
  {
    title: "Scheduling & Data",
    tools: ["Primavera P6", "MS Project", "Advanced Excel", "Power BI", "SQL", "Python"],
  },
  {
    title: "Design Software",
    tools: ["Helioscope", "OpenSolar", "SolidWorks"],
  },
];

export const experience = [
  {
    role: "Project Manager, Solar PV",
    company: "Solar Neon Engineering Pvt Ltd",
    period: "May 2025 to Mar 2026",
    highlights: [
      "Managed delivery of 36 residential and commercial solar PV projects totalling 790 kWp, covering site assessment, design validation, installation supervision, commissioning and client handover.",
      "Led three technical engineers and installation crews totalling up to 40 people across five concurrent sites, allocating daily works and sequencing activities to hold projects to programme.",
      "Held 85% on-time completion, tracing slippage to material availability and labour shortages and re-sequencing works to contain the impact on downstream activities.",
      "Built and maintained project programmes and cost baselines, tracked actual progress against plan and reported status to senior management.",
      "Validated roof structure, shading, load calculations and system sizing before mobilisation, cutting on-site design changes and rework.",
      "Acted as site escalation point through installation and commissioning, resolving interface conflicts between mechanical mounting, DC string routing and AC connection works.",
    ],
    metrics: [
      { label: "Projects", value: "36" },
      { label: "Capacity", value: "790 kWp" },
      { label: "On-time", value: "85%" },
      { label: "Peak crew", value: "40 across 5 sites" },
    ],
  },
  {
    role: "Senior Project Engineer, Solar PV",
    company: "Islamabad Solar House Pvt Ltd",
    period: "Feb 2023 to Apr 2025",
    highlights: [
      "Ran the full project lifecycle on 59 residential and commercial PV installations ranging from 5 kWp to 150 kWp: site assessment, system design, installation coordination, commissioning and aftercare.",
      "Delivered 85 to 95% of projects within the agreed programme while running two concurrent projects at a time.",
      "Managed a two month programme delay caused by an inverter supply shortage, re-planning installation dates and re-sequencing site works to limit knock-on effects for the client.",
      "Reviewed and approved installation drawings, single line diagrams and technical specifications for on-grid, hybrid and off-grid systems.",
      "Maintained bills of material and material call-off schedules with procurement, tracking milestones and flagging slippage early to protect the installation programme.",
      "Carried out commissioning, testing and fault finding, closed out snag lists and issued as-built documentation to clients.",
    ],
    metrics: [
      { label: "Installations", value: "59" },
      { label: "System size", value: "5 to 150 kWp" },
      { label: "On-time", value: "85 to 95%" },
      { label: "Concurrent", value: "2 projects" },
    ],
  },
  {
    role: "Project Engineer, Solar PV",
    company: "Safeway Renewable Energy Pvt Ltd",
    period: "Sep 2022 to Jan 2023",
    highlights: [
      "Supported execution of seven residential and commercial solar projects, developing scope and duration assumptions from installation drawings, load calculations and technical specifications.",
      "Conducted 12 site inspections to monitor progress, verify workmanship against specification and enforce site safety standards.",
      "Managed interfaces and dependencies between MEP, solar PV and installation teams to protect completion dates.",
    ],
    metrics: [
      { label: "Projects", value: "7" },
      { label: "Site inspections", value: "12" },
    ],
  },
  {
    role: "Mechatronics Engineer, Intern",
    company: "National Institute of Electronics",
    period: "Jul 2022 to Aug 2022",
    highlights: [
      "PIC microcontroller programming and sensor and hardware interfacing for automation and embedded system applications.",
      "Built and tested a temperature monitoring system with real time data capture and system validation.",
    ],
    metrics: [],
  },
];

export const projects = [
  {
    title: "150 kWp Factory Rooftop",
    tag: "Largest installation delivered",
    challenge:
      "The client restricted the usable roof area and the available footprint suffered significant shading, capping achievable yield.",
    action: "Reworked module placement and string layout to keep shaded modules off critical strings.",
    result: "Protected output while holding the system within the client's cost ceiling and the area allowed.",
    stack: ["Shading analysis", "String layout", "Module placement"],
  },
  {
    title: "Solar UPS System",
    tag: "Backup power",
    challenge: "Provide uninterrupted backup power for household electrical loads.",
    action: "Combined a PV array, charge controller and 12V DC storage with inverter output.",
    result: "Uninterrupted backup power for household electrical loads.",
    stack: ["PV array", "Charge controller", "12V DC storage", "Inverter"],
  },
  {
    title: "Single and Dual Axis Solar Trackers",
    tag: "Automation",
    challenge: "Keep panels aligned with the sun instead of relying on a fixed mount.",
    action:
      "Built Arduino, LDR and servo based alignment, plus a GPS and RTC variant that computes solar position mathematically.",
    result: "Two approaches: light-seeking tracking with LDRs, and light independent tracking from calculated sun position.",
    stack: ["Arduino", "LDR sensing", "Servo control", "GPS and RTC"],
  },
];

export const education = [
  {
    degree: "MSc Business Analytics",
    school: "Dublin Business School, Ireland",
    period: "2026 to Present",
    detail:
      "Coursework: data modelling and visualisation in Power BI, SQL and Python analytics, forecasting, project and operations decision analysis.",
  },
  {
    degree: "BE Mechatronics Engineering",
    school: "Air University, Islamabad",
    period: "2018 to 2022",
    detail: "",
  },
];

export const certifications = [
  { name: "Google Project Management", issuer: "Google Career Certificate: scheduling, budgeting, risk and stakeholder management" },
  { name: "Solar PV Design and Installation", issuer: "Sean White, NABCEP aligned curriculum" },
  { name: "Photovoltaic Systems", issuer: "Technical University of Denmark (DTU)" },
  { name: "Solar Energy Basics", issuer: "State University of New York (SUNY)" },
  { name: "Solar Residential Sales", issuer: "SolarEdge Technologies" },
];

export const languages = [
  { name: "English", level: "Professional" },
  { name: "Urdu", level: "Native" },
  { name: "Punjabi", level: "Fluent" },
];

export const activities = [
  "Member of ASME",
  "Competitor in inter-university robotics competitions",
  "Member of the Air University Cultural Society",
];
