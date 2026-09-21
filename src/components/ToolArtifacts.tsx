import type { ReactNode } from "react";
import { Download } from "lucide-react";
import type { MediaItem } from "@/lib/media";
import { ScheduleView } from "./ScheduleView";
import { ScreenshotSet } from "./ScreenshotSet";

export type ToolArtifact = { title: string; icon: "gantt" | "sheet" | "chart"; render: () => ReactNode };

/** Screenshot folders under public/, one per tool. A tool only opens once its folder has images. */
export const TOOL_SHOT_FOLDERS: Record<string, string> = {
  "MS Project": "tools/ms-project",
  "Advanced Excel": "tools/advanced-excel",
  "Power BI": "tools/power-bi",
};

const EXCEL_WORKBOOK = "/tools/advanced-excel/115-kWp-commercial-rooftop-excel-demo.xlsx";

// A tool listed here becomes a clickable chip that opens the work behind it.
export function buildToolArtifacts(shots: Record<string, MediaItem[]>): Record<string, ToolArtifact> {
  const artifacts: Record<string, ToolArtifact> = {
    "Primavera P6": {
      title: "Primavera P6: installation programme for a 20 kW residential PV system",
      icon: "gantt",
      render: () => <ScheduleView />,
    },
  };

  const msp = shots["MS Project"] ?? [];
  if (msp.length > 0) {
    artifacts["MS Project"] = {
      title: "MS Project: baseline, status update and recovery for a 20 kW residential PV system",
      icon: "gantt",
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

  const xls = shots["Advanced Excel"] ?? [];
  if (xls.length > 0) {
    artifacts["Advanced Excel"] = {
      title: "Advanced Excel: design check, BOM, procurement and cost control for a 100 kW commercial rooftop",
      icon: "sheet",
      render: () => (
        <ScreenshotSet
          shots={xls}
          intro={
            <>
              <p>
                A workbook I built in Excel for a 100 kW commercial rooftop in Islamabad, the kind of commercial job I
                delivered. It checks string sizing against the Jinko and Huawei datasheets, builds the bill of
                materials from the design, turns required-on-site dates into order-by dates on a Monday to Saturday
                calendar, and tracks budget against committed and forecast cost. It is a demonstration project: the PKR
                rates and the procurement status are illustrative, and the equipment figures come from the
                manufacturers&apos; datasheets.
              </p>
              <p>
                Built with structured tables, XLOOKUP, LET, a named LAMBDA for working days, WORKDAY.INTL, SUMIFS,
                dynamic arrays (UNIQUE, FILTER, SORTBY, CHOOSECOLS, SEQUENCE, MAP), conditional formatting, data
                validation, and a PivotTable with a slicer and a Pareto chart. The screenshots are from Excel itself.
              </p>
              <p>
                <a
                  href={EXCEL_WORKBOOK}
                  download
                  className="inline-flex items-center gap-1.5 font-semibold underline underline-offset-4"
                  style={{ color: "var(--amber)" }}
                >
                  <Download size={14} aria-hidden="true" /> Download the workbook (.xlsx)
                </a>{" "}
                to see every formula.
              </p>
            </>
          }
          notes={{
            Dashboard:
              "Headline figures, budget against forecast by category, cumulative commitment, and the items needing action as at the status date",
            "Design and string sizing":
              "String Voc on a -5 °C morning is 1,012 V against the inverter's 1,100 V limit, and all nine checks pass. The formula bar shows the LET formula for cold Voc",
            "Bill of materials":
              "Quantities come from the design, so changing the module or the string length updates the BOM. The formula bar shows the rail count",
            "Procurement tracker":
              "The inverter order went out 4 working days after its order-by date, so it now arrives a day after electrical works start. The formula bar shows the status logic",
            "Cost control":
              "Mounting came in 6% over budget and AC cable 4% under, leaving the forecast PKR 39,180 (about 0.5%) over",
            "Pivot analysis": "Modules, and the inverter with its monitoring, make up 64% of the budget",
          }}
        />
      ),
    };
  }

  const pbi = shots["Power BI"] ?? [];
  if (pbi.length > 0) {
    artifacts["Power BI"] = {
      title: "Power BI: cost and procurement report for a 100 kW commercial rooftop",
      icon: "chart",
      render: () => (
        <ScreenshotSet
          shots={pbi}
          intro={
            <>
              <p>
                An entry-level Power BI report built on the Excel tracker behind the Advanced Excel chip, so the two tools
                tell one story: Excel holds the data, Power BI reports on it. Power Query loads three tables from the
                workbook, the model links them on the BOM line number, and eight DAX measures drive the page.
              </p>
              <p>
                The page shows budget, forecast, variance and the share already committed, budget against forecast by
                category, lines by procurement status, a supplier slicer, and a table of the items that need action. The
                figures match the Excel workbook exactly. It is a demonstration project with illustrative PKR rates, and
                the screenshots are from Power BI Desktop itself.
              </p>
            </>
          }
          notes={{
            "Report page":
              "Cards, a clustered bar chart, a donut, a slicer and a table with a visual-level filter showing only red and amber lines",
            "Data model":
              "A small star: Items is the dimension, Cost and Procurement are facts, joined one-to-many on Line",
            "DAX measure":
              "Items needing action uses CALCULATE with an IN filter on Status. The formula bar shows the measure",
          }}
        />
      ),
    };
  }

  return artifacts;
}
