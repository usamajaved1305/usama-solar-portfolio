import fs from "node:fs";
import path from "node:path";

export type MediaItem = { src: string; caption: string };

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

// Words that should keep their technical capitalisation when a filename becomes a caption.
const FIXES: Record<string, string> = {
  kwp: "kWp",
  kw: "kW",
  mwp: "MWp",
  pv: "PV",
  dc: "DC",
  ac: "AC",
  ups: "UPS",
  led: "LED",
  hse: "HSE",
  rams: "RAMS",
  msc: "MSc",
  be: "BE",
  gps: "GPS",
  rtc: "RTC",
  ldr: "LDR",
  nabcep: "NABCEP",
  dtu: "DTU",
  suny: "SUNY",
  solaredge: "SolarEdge",
  sketchup: "SketchUp",
  solidworks: "SolidWorks",
  helioscope: "Helioscope",
  opensolar: "OpenSolar",
  dax: "DAX",
  bom: "BOM",
};

function captionFromFilename(file: string) {
  const base = path
    .basename(file, path.extname(file))
    .replace(/^\d+[-_.\s]+/, "") // strip an ordering prefix like "01-"
    .replace(/[-_]+/g, " ")
    .trim();
  const words = base.split(/\s+/).map((w) => FIXES[w.toLowerCase()] ?? w);
  const caption = words.join(" ");
  return caption.charAt(0).toUpperCase() + caption.slice(1);
}

// Reads at build time. Drop images into the folder and rebuild; no code change needed.
export function readMedia(folder: string): MediaItem[] {
  const dir = path.join(process.cwd(), "public", folder);
  let files: string[];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return [];
  }
  return files
    .filter((f) => IMAGE_EXT.has(path.extname(f).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true }))
    .map((f) => ({ src: `/${folder}/${encodeURIComponent(f)}`, caption: captionFromFilename(f) }));
}
