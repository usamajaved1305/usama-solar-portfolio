export const profile = {
  name: "Usama Javed",
  headline: "Solar PV Project Engineer, Planning and Site Delivery",
  location: "Dublin, Ireland",
  city: "Dublin, Ireland",
  phone: "+353 85 773 5337",
  tel: "tel:+353857735337",
  whatsapp: "https://wa.me/353857735337",
  email: "usamajaved1305@gmail.com",
  linkedin: "https://www.linkedin.com/in/usama-javed-553b8624b",
  github: "https://github.com/usamajaved1305",
  lede:
    "Mechatronics engineer with three and a half years delivering solar PV projects from site survey through installation, commissioning and client handover. Experienced leading installation crews on live sites, and equally strong on the planning side: programmes, bills of material, budgets and milestone tracking.",
  availability: "Open to solar project engineering, planning and site supervision roles",
};

export const stats = [
  { value: "100+", label: "PV installations delivered", sub: "5 kWp domestic systems to a 115 kWp commercial rooftop" },
  { value: "790 kWp", label: "Delivered in one year", sub: "36 projects, 85 to 90% completed on time" },
  { value: "Up to 40", label: "Crew members supervised", sub: "across five concurrent sites" },
  { value: "3.5 years", label: "Solar PV experience", sub: "from site survey through commissioning" },
];

export const highlights = [
  { label: "Portfolio mix", value: "Roughly 70%", sub: "residential, 30% commercial" },
  { label: "System types", value: "On-grid, hybrid", sub: "and off-grid" },
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
    tools: ["Helioscope", "OpenSolar", "SketchUp", "AutoCAD"],
  },
];

export const experience = [
  {
    role: "Project Manager",
    company: "Solar Neon Engineering Pvt Ltd",
    period: "May 2025 to Mar 2026",
    highlights: [
      "Managed delivery of 36 residential and commercial solar PV projects, covering site assessment, design validation, installation supervision, commissioning and client handover.",
      "Led three technical engineers and installation crews totalling up to 40 people across five concurrent sites, allocating daily works and sequencing activities to hold projects to programme.",
      "Held 85 to 90% on-time completion, tracing slippage to material availability and labour shortages and re-sequencing works to contain the impact on downstream activities.",
      "Built and maintained project programmes and cost baselines, tracked actual progress against plan and reported status to senior management.",
      "Validated roof structure, shading, load calculations and system sizing before mobilisation, cutting on-site design changes and rework.",
      "Acted as site escalation point through installation and commissioning, resolving interface conflicts between mechanical mounting, DC string routing and AC connection works.",
    ],
    metrics: [
      { label: "Projects", value: "36" },
      { label: "Capacity", value: "790 kWp" },
      { label: "On-time", value: "85 to 90%" },
      { label: "Crew, 5 sites", value: "Up to 40" },
    ],
  },
  {
    role: "Senior Project Engineer",
    company: "Islamabad Solar House Pvt Ltd",
    period: "Feb 2023 to Apr 2025",
    highlights: [
      "Ran the full project lifecycle on 59 residential and commercial PV installations ranging from 5 kWp to 115 kWp: site assessment, system design, installation coordination, commissioning and aftercare.",
      "Delivered 85 to 95% of projects within the agreed programme while running two concurrent projects at a time.",
      "Managed a two month programme delay caused by an inverter supply shortage, re-planning installation dates and re-sequencing site works to limit knock-on effects for the client.",
      "Reviewed and approved installation drawings, single line diagrams and technical specifications for on-grid, hybrid and off-grid systems.",
      "Maintained bills of material and material call-off schedules with procurement, tracking milestones and flagging slippage early to protect the installation programme.",
      "Carried out commissioning, testing and fault finding, closed out snag lists and issued as-built documentation to clients.",
    ],
    metrics: [
      { label: "Installations", value: "59" },
      { label: "System size", value: "5 to 115 kWp" },
      { label: "On-time", value: "85 to 95%" },
      { label: "Concurrent", value: "2 projects" },
    ],
  },
  {
    role: "Project Engineer",
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
    role: "Mechatronics Engineer Intern",
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
    title: "115 kWp Commercial Rooftop",
    tag: "Design under constraint",
    challenge:
      "The roof runs south east rather than south. Turning the array to face due south fits only 163 modules, so the orientation that looks right on paper is the one that costs the most capacity.",
    action:
      "Set the array out along the building at 146 degrees instead, sized the strings against the coldest morning rather than the nameplate, and settled the fusing from the inverter's tracker layout rather than the string count.",
    result:
      "198 modules at 114.84 kWp, eleven strings of eighteen sitting at 1,012 V against an 1,100 V inverter limit, and no string fuses needed. The turn off south costs under 2% of annual yield and buys 35 more modules.",
    stack: ["String sizing", "Array setting out", "Protection design"],
  },
  {
    title: "Inverter Shortage Recovery",
    tag: "Programme recovery",
    challenge: "An inverter supply shortage caused a two-month delay to the installation programme.",
    action: "Re-planned installation dates and re-sequenced site works around the late equipment.",
    result: "Limited the knock-on effects for the client.",
    stack: ["Re-planning", "Work sequencing", "Supplier delay"],
  },
  {
    title: "Five Concurrent Sites",
    tag: "Multi-site delivery",
    challenge: "Material availability and labour shortages caused slippage while crews worked five sites at once.",
    action:
      "Allocated daily works across crews of up to 40 people, traced slippage to its causes and re-sequenced works to contain the impact on downstream activities.",
    result: "Held 85 to 90% on-time completion across 36 projects in the year.",
    stack: ["Crew allocation", "Slippage tracking", "Programme control"],
  },
];

export const builds = [
  {
    title: "Solar UPS System",
    detail:
      "PV array, charge controller and 12V DC storage with inverter output, delivering uninterrupted backup power for household electrical loads.",
  },
  {
    title: "Single and Dual Axis Solar Trackers",
    detail:
      "Arduino, LDR and servo-based alignment, plus a GPS and RTC variant computing solar position mathematically for light-independent operation.",
  },
];

export const education = [
  {
    degree: "MSc Business Analytics",
    school: "Dublin Business School, Ireland",
    org: "Dublin Business School",
    orgUrl: "https://www.dbs.ie/",
    href: "https://www.dbs.ie/course/postgraduate/master-of-science-(msc)-in-business-analytics",
    period: "2026 to Present",
    detail:
      "Coursework: data modelling and visualisation in Power BI, SQL and Python analytics, forecasting, project and operations decision analysis.",
  },
  {
    degree: "BE Mechatronics Engineering",
    school: "Air University, Islamabad",
    org: "Air University",
    orgUrl: "https://www.au.edu.pk/",
    href: "https://www.au.edu.pk/",
    period: "2018 to 2022",
    detail:
      "Coursework: electric circuits analysis, electronic devices and circuits, control systems, instrumentation and measurement, manufacturing automation, engineering statics, mechanics of materials, fundamentals of thermal sciences, engineering drawing and solid modelling, modelling and simulation, engineering economics.",
  },
];

export const certifications = [
  {
    name: "Foundations of Project Management",
    issuer: "Google, on Coursera",
    org: "Google",
    issued: "Sep 2026",
    image: "foundations-of-project-management-google.jpg",
    verify: "https://coursera.org/verify/F6UCU42EFBAW",
  },
  {
    name: "Photovoltaic Systems",
    issuer: "Technical University of Denmark (DTU), on Coursera",
    org: "Technical University of Denmark",
    issued: "Sep 2024",
    image: "photovoltaic-systems-dtu.jpg",
    verify: "https://coursera.org/verify/LBS63M4AMRHV",
  },
  {
    name: "Solar Energy and Electrical System Design",
    issuer: "University at Buffalo, on Coursera",
    org: "University at Buffalo",
    issued: "Sep 2024",
    image: "solar-energy-and-electrical-system-design-university-at-buffalo.jpg",
    verify: "https://coursera.org/verify/MYX2THBS69EN",
  },
  {
    name: "Solar Energy Basics",
    issuer: "State University of New York (SUNY), on Coursera",
    org: "State University of New York",
    issued: "Sep 2024",
    image: "solar-energy-basics-suny.jpg",
    verify: "https://coursera.org/verify/7DBD2B9RHGV1",
  },
  {
    name: "Introduction to Solar PV Design, Installation and Code",
    issuer: "HeatSpring, taught by Sean White, approved for NABCEP hours",
    org: "HeatSpring",
    issued: "Jul 2024",
    image: "introduction-to-solar-pv-design-heatspring.png",
  },
];

export const languages = [
  { name: "English", level: "Professional" },
  { name: "Urdu", level: "Native" },
  { name: "Punjabi", level: "Fluent" },
];

export const activities = [
  { text: "Student member of ASME", image: "asme-student-member.jpg" },
  { text: "Competitor in inter-university robotics competitions" },
  {
    text: "Member of the Air University Cultural Society",
    href: "https://www.linkedin.com/company/air-university-cultural-and-arts-society/",
  },
];
