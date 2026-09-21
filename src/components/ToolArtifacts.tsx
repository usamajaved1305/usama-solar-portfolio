import type { ReactNode } from "react";
import { ScheduleView } from "./ScheduleView";

export type ToolArtifact = { title: string; render: () => ReactNode };

// A tool listed here becomes a clickable chip that opens the work behind it.
export const toolArtifacts: Record<string, ToolArtifact> = {
  "Primavera P6": {
    title: "Primavera P6: installation programme for a 20 kW residential PV system",
    render: () => <ScheduleView />,
  },
};
