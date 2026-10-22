// Demo preview only: the static export writes /roles/planning.html next to a /roles/planning/ folder.
// Vercel serves the short URL, but the local Python preview server does not, so copy each page into
// its folder as index.html. Not needed on the live site.
import { readdirSync, statSync, copyFileSync, existsSync } from "node:fs";
import { join } from "node:path";

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      walk(p);
      continue;
    }
    if (!name.endsWith(".html") || name === "index.html") continue;
    const folder = p.slice(0, -5);
    if (existsSync(folder) && statSync(folder).isDirectory()) copyFileSync(p, join(folder, "index.html"));
  }
}
walk("out");
