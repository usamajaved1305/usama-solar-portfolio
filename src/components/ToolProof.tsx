"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { MediaItem } from "@/lib/media";
import { Popover } from "./Popover";
import { buildToolArtifacts } from "./ToolArtifacts";

// Chips that open the same project popups as the Skills section, so a role card can point at its evidence.
export function ToolProof({ tools, toolShots = {} }: { tools: string[]; toolShots?: Record<string, MediaItem[]> }) {
  const [open, setOpen] = useState<string | null>(null);
  const artifacts = useMemo(() => buildToolArtifacts(toolShots), [toolShots]);
  const available = tools.filter((t) => artifacts[t]);
  const current = open ? artifacts[open] : null;

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {available.map((t) => (
          <button
            key={t}
            type="button"
            className="chip chip-action"
            aria-haspopup="dialog"
            title={`Open the ${t} project`}
            onClick={() => setOpen(t)}
          >
            {t}
            <ArrowUpRight size={14} aria-hidden="true" style={{ color: "var(--amber)" }} />
          </button>
        ))}
      </div>
      <Popover open={current !== null} onClose={() => setOpen(null)} title={current?.title ?? ""} xwide>
        {current && current.render()}
      </Popover>
    </>
  );
}
