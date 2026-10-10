// Content for the visual demo: real site photos, project thumbnails and the portrait.

/** `small` marks a photo only available as a small preview; the lightbox will not blow it up. */
export type SitePhoto = { slug: string; caption: string; group: SiteGroup; w: number; h: number; small?: boolean };
export type SiteGroup = "Arrays and structures" | "Inverters and wiring" | "3D structure design";

export const SITE_GROUPS: SiteGroup[] = ["Arrays and structures", "Inverters and wiring", "3D structure design"];

export const sitePhotos: SitePhoto[] = [
  { slug: "elevated-frame-at-sunset", caption: "Elevated steel frame and modules on a rooftop at sunset", group: "Arrays and structures", w: 1600, h: 900 },
  { slug: "pole-mounted-array", caption: "Pole mounted solar array on open ground", group: "Arrays and structures", w: 1280, h: 960 },
  { slug: "elevated-canopy-rooftop", caption: "Elevated steel canopy carrying modules over a flat rooftop", group: "Arrays and structures", w: 1280, h: 960 },
  { slug: "pole-mounted-array-front", caption: "Front view of a pole mounted array beside green fields", group: "Arrays and structures", w: 1280, h: 605 },
  { slug: "tilted-row-galvanised-legs", caption: "Rear of a tilted module row on galvanised steel legs", group: "Arrays and structures", w: 1600, h: 1200 },
  { slug: "pole-mount-frame-rear", caption: "Steel frame and pole supporting the array, rear view", group: "Arrays and structures", w: 1280, h: 605 },
  { slug: "tilted-rooftop-arrays", caption: "Tilted rooftop arrays on a flat concrete roof", group: "Arrays and structures", w: 1040, h: 468 },
  { slug: "rooftop-install-in-progress", caption: "Rooftop arrays during installation", group: "Arrays and structures", w: 1040, h: 468 },
  { slug: "flat-rooftop-array", caption: "Flat rooftop array among neighbouring buildings", group: "Arrays and structures", w: 916, h: 468 },
  { slug: "raised-rooftop-arrays-trees", caption: "Raised rooftop arrays with trees behind", group: "Arrays and structures", w: 160, h: 120, small: true },
  { slug: "tilted-array-flat-rooftop", caption: "Tilted array on a flat rooftop", group: "Arrays and structures", w: 160, h: 120, small: true },
  { slug: "tilted-rooftop-array-side", caption: "Tilted rooftop array, side view", group: "Arrays and structures", w: 160, h: 120, small: true },
  { slug: "fox-string-inverter", caption: "FOX ESS string inverter with the DC strings connected", group: "Inverters and wiring", w: 1496, h: 1496 },
  { slug: "ac-cabling-breaker-meter", caption: "AC cabling dressed into a CHINT breaker and energy meter", group: "Inverters and wiring", w: 1496, h: 1496 },
  { slug: "fox-inverter-ac-box", caption: "FOX ESS inverter beside the AC distribution box", group: "Inverters and wiring", w: 1496, h: 1496 },
  { slug: "growatt-inverter-trunking", caption: "Growatt inverter and breaker enclosures on cable trunking", group: "Inverters and wiring", w: 1600, h: 1600 },
  { slug: "fox-inverter-patterned-wall", caption: "FOX ESS inverter with trunking and an AC breaker box", group: "Inverters and wiring", w: 1600, h: 1600 },
  { slug: "inverter-tiled-wall", caption: "Inverter and distribution boards on a tiled wall", group: "Inverters and wiring", w: 900, h: 1600 },
  { slug: "inverex-inverter-indoor", caption: "Inverex Veyron II inverter installed on an indoor wall", group: "Inverters and wiring", w: 1200, h: 1600 },
  { slug: "growatt-inverter-ac-box", caption: "Growatt inverter beside an AC distribution box", group: "Inverters and wiring", w: 160, h: 120, small: true },
  { slug: "model-canopy-pedestal-footings", caption: "3D model of an elevated canopy on pedestal footings", group: "3D structure design", w: 1215, h: 561 },
  { slug: "model-24-module-canopy", caption: "3D model of an elevated rooftop canopy", group: "3D structure design", w: 1568, h: 844 },
  { slug: "model-three-tier-canopy", caption: "3D model of a three tier elevated canopy", group: "3D structure design", w: 812, h: 587 },
  { slug: "model-canopy-dimensions", caption: "Canopy model with leg heights and spacing", group: "3D structure design", w: 1600, h: 734 },
  { slug: "model-canopy-frame-bracing", caption: "Canopy frame and bracing modelled before the modules", group: "3D structure design", w: 1600, h: 734 },
  { slug: "model-canopy-leg-plan", caption: "Plan of the canopy leg positions and base pads", group: "3D structure design", w: 1600, h: 734 },
  { slug: "design-frame-height-dimensions", caption: "3D design with frame height dimensions", group: "3D structure design", w: 160, h: 141, small: true },
  { slug: "design-house-array-views", caption: "3D design views of a house and its rooftop array", group: "3D structure design", w: 150, h: 160, small: true },
  { slug: "design-front-and-top-views", caption: "Front and top views of the house and array design", group: "3D structure design", w: 147, h: 160, small: true },
];

export const sitePhotoSrc = (slug: string) => `/site/${slug}.webp`;
export const siteThumbSrc = (slug: string) => `/site/thumbs/${slug}.webp`;

/** One card per tool project. `tool` must match a key of the tool popups in ToolArtifacts. */
export type WorkCard = { tool: string; thumb: string; title: string; kind: "Design" | "Planning" | "Data"; big?: boolean };

export const workCards: WorkCard[] = [
  { tool: "SketchUp", thumb: "sketchup", title: "3D model of a house and a shading study of the array", kind: "Design", big: true },
  { tool: "Helioscope", thumb: "helioscope", title: "Roof layout and energy simulation for a 115 kWp commercial rooftop", kind: "Design" },
  { tool: "AutoCAD", thumb: "autocad", title: "Drawing set for an 80 kW rooftop with a 63 kWh battery", kind: "Design" },
  { tool: "OpenSolar", thumb: "opensolar", title: "Rooftop design and customer proposal for a 20 kW house", kind: "Design" },
  { tool: "Primavera P6", thumb: "p6", title: "Installation programme for a 20 kW residential system", kind: "Planning" },
  { tool: "Power BI", thumb: "power-bi", title: "Cost and procurement report for a 115 kWp rooftop", kind: "Data", big: true },
  { tool: "MS Project", thumb: "ms-project", title: "Installation programme with a tracking baseline", kind: "Planning" },
  { tool: "Advanced Excel", thumb: "excel", title: "BOM, procurement and cost tracker for a 115 kWp rooftop", kind: "Data" },
  { tool: "Python", thumb: "python", title: "Energy yield estimate for a 115 kWp rooftop", kind: "Data" },
  { tool: "SQL", thumb: "sql", title: "BOM and procurement database for a 115 kWp rooftop", kind: "Data" },
];

export const workThumbSrc = (key: string) => `/thumbs/work/${key}.webp`;
