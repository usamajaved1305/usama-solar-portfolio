import type { ReactNode } from "react";
import type { MediaItem } from "@/lib/media";
import { ScheduleView } from "./ScheduleView";
import { ScreenshotSet } from "./ScreenshotSet";

export type ToolArtifact = { title: string; render: () => ReactNode };

/** Screenshot folders under public/, one per tool. A tool only opens once its folder has images. */
export const TOOL_SHOT_FOLDERS: Record<string, string> = {
  "MS Project": "tools/ms-project",
};

// A tool listed here becomes a clickable chip that opens the work behind it.
export function buildToolArtifacts(shots: Record<string, MediaItem[]>): Record<string, ToolArtifact> {
  const artifacts: Record<string, ToolArtifact> = {
    "Primavera P6": {
      title: "Primavera P6: installation programme for a 20 kW residential PV system",
      render: () => <ScheduleView />,
    },
  };

  const msp = shots["MS Project"] ?? [];
  if (msp.length > 0) {
    artifacts["MS Project"] = {
      title: "MS Project: baseline, status update and recovery for a 20 kW residential PV system",
      render: () => (
        <ScreenshotSet
          shots={msp}
          intro={
            <>
              <p>
                Screenshots from Microsoft Project of the same 20 kW on-grid residential programme as the Primavera P6
                view: 25 tasks under 4 summary tasks, a Monday to Saturday calendar, and finish-to-start and
                start-to-start links with lags.
              </p>
              <p>
                It shows the control side of planning. I saved a baseline, then ran a status update in which the
                inverter supplier pushes delivery back 7 working days. The inverter had 5 days of float, so handover
                slips 2 days. The recovery pulls the AC cable while the inverter is still on its way, terminates it
                once the inverter is mounted, and adds a second electrician for the mounting. That brings handover back
                to the baseline date. The delay and recovery are a practice scenario built for this portfolio, not a
                record of a real job.
              </p>
            </>
          }
        />
      ),
    };
  }

  return artifacts;
}
