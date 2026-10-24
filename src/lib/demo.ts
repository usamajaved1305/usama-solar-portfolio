// Content for the visual demo: real site photos, project thumbnails and the portrait.

export type SitePhoto = { slug: string; caption: string; group: SiteGroup; w: number; h: number };
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
  { slug: "raised-rooftop-arrays-trees", caption: "Raised rooftop arrays with trees behind", group: "Arrays and structures", w: 1280, h: 960 },
  { slug: "tilted-array-flat-rooftop", caption: "Tilted array on a flat rooftop", group: "Arrays and structures", w: 1280, h: 960 },
  { slug: "tilted-rooftop-array-side", caption: "Tilted rooftop array, side view", group: "Arrays and structures", w: 1280, h: 960 },
  { slug: "fox-string-inverter", caption: "FoxESS string inverter with the DC strings connected", group: "Inverters and wiring", w: 1496, h: 1496 },
  { slug: "ac-cabling-breaker-meter", caption: "AC cabling dressed into a CHINT breaker and energy meter", group: "Inverters and wiring", w: 1496, h: 1496 },
  { slug: "fox-inverter-ac-box", caption: "FoxESS inverter beside the AC distribution box", group: "Inverters and wiring", w: 1496, h: 1496 },
  { slug: "growatt-inverter-trunking", caption: "Growatt inverter and breaker enclosures on cable trunking", group: "Inverters and wiring", w: 1600, h: 1600 },
  { slug: "fox-inverter-patterned-wall", caption: "FoxESS inverter with trunking and an AC breaker box", group: "Inverters and wiring", w: 1600, h: 1600 },
  { slug: "inverter-tiled-wall", caption: "Inverter and distribution boards on a tiled wall", group: "Inverters and wiring", w: 900, h: 1600 },
  { slug: "inverex-inverter-indoor", caption: "Inverex Veyron II inverter installed on an indoor wall", group: "Inverters and wiring", w: 1200, h: 1600 },
  { slug: "growatt-inverter-ac-box", caption: "Growatt inverter beside an AC distribution box", group: "Inverters and wiring", w: 1280, h: 960 },
  { slug: "model-canopy-pedestal-footings", caption: "3D model of an elevated canopy on pedestal footings", group: "3D structure design", w: 1215, h: 561 },
  { slug: "model-24-module-canopy", caption: "3D model of an elevated rooftop canopy", group: "3D structure design", w: 1568, h: 844 },
  { slug: "model-three-tier-canopy", caption: "3D model of a three tier elevated canopy", group: "3D structure design", w: 812, h: 587 },
  { slug: "model-canopy-dimensions", caption: "Canopy model with leg heights and spacing", group: "3D structure design", w: 1600, h: 734 },
  { slug: "model-canopy-frame-bracing", caption: "Canopy frame and bracing modelled before the modules", group: "3D structure design", w: 1600, h: 734 },
  { slug: "model-canopy-leg-plan", caption: "Plan of the canopy leg positions and base pads", group: "3D structure design", w: 1600, h: 734 },
  { slug: "design-frame-height-dimensions", caption: "3D design with frame height dimensions", group: "3D structure design", w: 502, h: 444 },
  { slug: "design-house-array-views", caption: "3D design views of a house and its rooftop array", group: "3D structure design", w: 524, h: 556 },
  { slug: "design-front-and-top-views", caption: "Front and top views of the house and array design", group: "3D structure design", w: 527, h: 572 },
];

export const sitePhotoSrc = (slug: string) => `/site/${slug}.webp`;
export const siteThumbSrc = (slug: string) => `/site/thumbs/${slug}.webp`;

/** One card per tool project. `tool` must match a key of the tool popups in ToolArtifacts. */
export type WorkCard = { tool: string; thumb: string; title: string; kind: "Design" | "Planning" | "Data"; big?: boolean };

export const workCards: WorkCard[] = [
  { tool: "SketchUp", thumb: "sketchup", title: "3D model of a house and a shading study of the array", kind: "Design", big: true },
  { tool: "Helioscope", thumb: "helioscope", title: "Roof layout and energy simulation for a 115 kWp commercial rooftop", kind: "Design" },
  { tool: "AutoCAD", thumb: "autocad", title: "Drawing set for a 79 kWp rooftop with a 63 kWh battery", kind: "Design" },
  { tool: "OpenSolar", thumb: "opensolar", title: "Rooftop design and customer proposal for a 20 kW house", kind: "Design" },
  { tool: "Primavera P6", thumb: "p6", title: "Installation programme for a 20 kW residential system", kind: "Planning" },
  { tool: "Power BI", thumb: "power-bi", title: "Cost and procurement report for a 115 kWp rooftop", kind: "Data", big: true },
  { tool: "MS Project", thumb: "ms-project", title: "Installation programme with a tracking baseline", kind: "Planning" },
  { tool: "Advanced Excel", thumb: "excel", title: "BOM, procurement and cost tracker for a 115 kWp rooftop", kind: "Data" },
  { tool: "Python", thumb: "python", title: "Energy yield estimate for a 115 kWp rooftop", kind: "Data" },
  { tool: "SQL", thumb: "sql", title: "BOM and procurement database for a 115 kWp rooftop", kind: "Data" },
];

export const workThumbSrc = (key: string) => `/thumbs/work/${key}.webp`;

// ---- Dark and bold version ----

/** The eight sharpest, most varied site photos, in the order they sit in the grid. */
export const bestPhotos = [
  "tilted-array-flat-rooftop",
  "fox-string-inverter",
  "raised-rooftop-arrays-trees",
  "tilted-row-galvanised-legs",
  "ac-cabling-breaker-meter",
  "tilted-rooftop-array-side",
  "growatt-inverter-ac-box",
  "pole-mounted-array-front",
];

export type Feature = {
  key: string;
  tag: string;
  title: string;
  text: string;
  figures?: { value: string; label: string }[];
  chips: string[];
  /** small: a narrower copy for single-density screens and phones, used in srcset. */
  image: { src: string; alt: string; w: number; h: number; light?: boolean; small?: { src: string; w: number } };
  inset?: { src: string; alt: string; label: string; w: number; h: number; small?: { src: string; w: number } };
  tool?: string;
  toolLabel?: string;
  project?: ProjectGallery;
};

export type Shot = { src: string; caption: string };
/** A whole job in one window: the design beside the built frame, then the model and the site photos. */
export type ProjectGallery = {
  title: string;
  intro: string[];
  pairs: { design: Shot; built: Shot }[];
  model: Shot[];
  site: Shot[];
  /** What went into the job, from the quotation (no prices). */
  scope?: [string, string][];
};

export const features: Feature[] = [
  {
    key: "elevated",
    tag: "Structures",
    title: "Elevated rooftop frames",
    text: "A 15.375 kWp on-grid system on a raised steel shed over a rooftop stair room and the open roof in front of it. Designed in SketchUp and built on site; the model shown is redrawn from that design, the bill of materials and the site photos.",
    figures: [
      { value: "15.375 kWp", label: "on-grid system" },
      { value: "25", label: "615 W bifacial panels" },
      { value: "15 kW", label: "FoxESS inverter" },
    ],
    chips: ["Steel frame", "SketchUp model", "Site supervision"],
    image: { src: "/projects/elevated-canopy/site-finished-right.webp", alt: "The finished elevated frame and modules over the stair room", w: 1280, h: 960, small: { src: "/projects/elevated-canopy/site-finished-right-800.webp", w: 800 } },
    inset: { src: "/projects/elevated-canopy/model-front-right.webp", alt: "The same view in the SketchUp model", label: "SketchUp model", w: 848, h: 636, small: { src: "/projects/elevated-canopy/model-front-right-480.webp", w: 480 } },
    project: {
      title: "Elevated rooftop canopy over a stair room",
      intro: [
        "A 15.375 kWp on-grid system on the roof of a 10 marla house: 25 Canadian Solar 615 W N-type bifacial panels on a FoxESS 15 kW on-grid inverter, carried on a raised mild steel shed over the rooftop stair room and the open roof in front of it.",
        "The shed is built from 2.5 x 5 in I-beam columns and girders with U-channel rails up the slope, anchored to concrete bases on block pads. Three columns stand on the open roof in front of the stair room, each braced back to its own base, and short legs stand on the stair room slab.",
        "I redrew the job in SketchUp from my original design, the bill of materials and the photos of the built frame: three lines of landscape panels running up the slope over the stair room, on a frame tilted about 10 degrees.",
      ],
      pairs: [
        { design: { src: "/projects/elevated-canopy/model-front-left.webp", caption: "SketchUp model" }, built: { src: "/projects/elevated-canopy/site-finished-front.webp", caption: "Built on site" } },
        { design: { src: "/projects/elevated-canopy/model-front-right.webp", caption: "SketchUp model" }, built: { src: "/projects/elevated-canopy/site-finished-right.webp", caption: "Built on site" } },
      ],
      model: [
        { src: "/projects/elevated-canopy/model-overview.webp", caption: "The whole roof: stair room, frame and array" },
        { src: "/projects/elevated-canopy/model-side.webp", caption: "Side view: low edge at the front, high edge over the stair room" },
        { src: "/projects/elevated-canopy/model-plan.webp", caption: "Plan, front of the roof on the left: three lines of panels running up the slope" },
      ],
      site: [
        { src: "/projects/elevated-canopy/site-frame-during-build.webp", caption: "The frame going up, before the modules" },
        { src: "/projects/elevated-canopy/site-underside.webp", caption: "The array running past the parapet, seen from below" },
        { src: "/projects/elevated-canopy/site-inverter-porch.webp", caption: "Inverter and AC trunking on the porch wall" },
        { src: "/projects/elevated-canopy/site-inverter-wall.webp", caption: "Inverter and distribution boards" },
      ],
      scope: [
        ["Panels", "25 x Canadian Solar 615 W N-type bifacial, 15.375 kWp"],
        ["Inverter", "FoxESS 15 kW on-grid, IP65, with WiFi monitoring"],
        ["Structure", "Mild steel elevated shed: 2.5 x 5 in I-beams, U channels, anchors"],
        ["Civil", "Concrete bases, block pads, epoxy waterproofing"],
        ["Protection", "Indoor AC and DC distribution boxes (CHINT, TOMZN), TOMZN surge protection"],
        ["Cabling", "Double tin-coated AC and DC cables, MC4 connectors, piping and ducting"],
        ["Earthing", "Two GI earthing pits: DC and lightning arrester"],
      ],
    },
  },
  {
    key: "rooftop",
    tag: "Design under constraint",
    title: "115 kWp commercial rooftop",
    text: "The roof runs south east. Facing the array due south fits only 163 modules, so the rows follow the building at 146 degrees instead.",
    figures: [
      { value: "198", label: "modules" },
      { value: "114.84 kWp", label: "DC capacity" },
      { value: "Under 2%", label: "less yield per kWp, for 35 more modules" },
    ],
    chips: ["String sizing", "Array setting out", "Protection design"],
    image: { src: "/feature/helioscope-layout.webp", alt: "HelioScope layout of 198 modules on the rooftop", w: 1090, h: 772, small: { src: "/feature/helioscope-layout-720.webp", w: 720 } },
    tool: "Helioscope",
    toolLabel: "Open the HelioScope project",
  },
  {
    key: "battery",
    tag: "Design study",
    title: "79 kWp rooftop with a 63 kWh battery",
    text: "136 modules on an 80 kW FoxESS hybrid inverter, with nine battery modules in series. Drawn in AutoCAD as three A1 sheets: the single line diagram, the mechanical layout and the battery control sheet.",
    figures: [
      { value: "78.88 kWp", label: "PV array" },
      { value: "63.18 kWh", label: "battery" },
      { value: "3", label: "A1 sheets" },
    ],
    chips: ["AutoCAD", "Single line diagram", "Battery sizing"],
    image: { src: "/feature/autocad-key-diagram.webp", alt: "Key diagram of the 79 kWp PV and 63 kWh battery system", w: 1400, h: 975, light: true, small: { src: "/feature/autocad-key-diagram-800.webp", w: 800 } },
    inset: { src: "/feature/autocad-dispatch.webp", alt: "Battery dispatch on a typical April day and the December peak day", label: "Battery dispatch", w: 900, h: 581, small: { src: "/feature/autocad-dispatch-480.webp", w: 480 } },
    tool: "AutoCAD",
    toolLabel: "Open the drawing set",
  },
];

/** One line per tool tile; the tile opens the full project. */
export const toolTiles: { group: string; tools: { tool: string; line: string }[] }[] = [
  {
    group: "Planning and data",
    tools: [
      { tool: "Primavera P6", line: "Installation programme, 20 kW house" },
      { tool: "MS Project", line: "Programme with a tracking baseline" },
      { tool: "Advanced Excel", line: "BOM, procurement and cost tracker" },
      { tool: "Power BI", line: "Cost and procurement report" },
      { tool: "SQL", line: "BOM and procurement database" },
      { tool: "Python", line: "Energy yield estimate, 115 kWp" },
    ],
  },
  {
    group: "Design",
    tools: [
      { tool: "Helioscope", line: "Roof layout and energy simulation" },
      { tool: "OpenSolar", line: "Rooftop design and customer proposal" },
      { tool: "SketchUp", line: "3D house model and shading study" },
      { tool: "AutoCAD", line: "Drawing set, 79 kWp with a battery" },
    ],
  },
];
