"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { MediaItem } from "@/lib/media";
import { Popover } from "./Popover";
import { buildToolArtifacts } from "./ToolArtifacts";

// Chips that open the same project popups as the Skills section, so a role card can point at its evidence.
export function ToolProof({
  tools,
  toolShots = {},
  labels = {},
  list = false,
}: {
  tools: string[];
  toolShots?: Record<string, MediaItem[]>;
  /** Button text per tool, for example the project name; the tool name is used when missing. */
  labels?: Record<string, string>;
  /** One link per line instead of chips, for long project names. */
  list?: boolean;
}) {
  const [open, setOpen] = useState<string | null>(null);
  const artifacts = useMemo(() => buildToolArtifacts(toolShots), [toolShots]);
  const available = tools.filter((t) => artifacts[t]);
  const current = open ? artifacts[open] : null;

  return (
    <>
      {list ? (
        <ul className="space-y-0.5">
          {available.map((t) => (
            <li key={t}>
              <button
                type="button"
                aria-haspopup="dialog"
                onClick={() => setOpen(t)}
                className="inline-flex min-h-9 items-start gap-1.5 py-1.5 text-left text-[14px] font-semibold underline-offset-4 hover:underline"
                style={{ color: "var(--amber)" }}
              >
                <ArrowUpRight size={15} aria-hidden="true" className="mt-[3px] shrink-0" />
                <span>{labels[t] ?? t}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-wrap gap-2">
          {available.map((t) => (
            <button
              key={t}
              type="button"
              className="chip chip-action"
              aria-haspopup="dialog"
              onClick={() => setOpen(t)}
            >
              {labels[t] ?? t}
              <ArrowUpRight size={14} aria-hidden="true" style={{ color: "var(--amber)" }} />
            </button>
          ))}
        </div>
      )}
      <Popover open={current !== null} onClose={() => setOpen(null)} title={current?.title ?? ""} xwide>
        {current && current.render()}
      </Popover>
    </>
  );
}
