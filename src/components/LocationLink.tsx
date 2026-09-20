"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { Popover } from "./Popover";
import { profile } from "@/lib/data";

// Dublin city centre, wide enough to read as "Dublin" without pinning a home address.
const BBOX = "-6.40,53.28,-6.10,53.41";
const OSM_EMBED = `https://www.openstreetmap.org/export/embed.html?bbox=${BBOX}&layer=mapnik&marker=53.3498,-6.2603`;
const OSM_LINK = "https://www.openstreetmap.org/?mlat=53.3498&mlon=-6.2603#map=11/53.3498/-6.2603";
const MAPS_LINK = "https://www.google.com/maps/search/?api=1&query=Dublin%2C+Ireland";

export function LocationLink({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={className}
        aria-label={`Show ${profile.city} on a map`}
      >
        <MapPin size={15} aria-hidden="true" /> {profile.city}
      </button>
      <Popover open={open} onClose={() => setOpen(false)} title={`Based in ${profile.city}`} wide>
        <iframe
          title={`Map of ${profile.city}`}
          src={OSM_EMBED}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full rounded-xl border-0"
          style={{ height: "min(56vh, 420px)", background: "var(--bg-elev)" }}
        />
        <div className="mt-3 flex flex-wrap gap-4 text-[13.5px]" style={{ color: "var(--text-dim)" }}>
          <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
            Open in Google Maps
          </a>
          <a href={OSM_LINK} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
            Open in OpenStreetMap
          </a>
        </div>
      </Popover>
    </>
  );
}
