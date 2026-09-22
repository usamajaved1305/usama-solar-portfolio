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
      title: "Advanced Excel: BOM, procurement and cost tracker for a 100 kW commercial rooftop",
      icon: "sheet",
      render: () => (
        <ScreenshotSet
          shots={xls}
          intro={
            <>
              <p>
                A workbook I built in Excel for a 100 kW commercial rooftop in Islamabad, the kind of commercial job I
                delivered. It works out the module count and checks the string voltage on a cold morning against the
                inverter limit, prices the bill of materials, turns the date each item is needed on site into an
                order-by date, and tracks budget against committed and forecast cost. It is a demonstration project:
                the PKR rates and purchase-order status are illustrative, and the module and inverter figures come from
                the Jinko and Huawei datasheets.
              </p>
              <p>
                Built with Excel Tables, XLOOKUP, IF, SUMIFS, COUNTIF, ROUNDUP, WORKDAY.INTL, conditional formatting,
                drop-down lists, two charts and a PivotTable with a slicer. The screenshots are from Excel itself.
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
              "Budget PKR 7.11M against a forecast of PKR 7.14M (PKR 37,340 over), 3 items late or overdue, and a PivotTable with a Supplier slicer",
            "Inputs and BOM":
              "18 modules per string gives 1,012 V on a -5 °C morning, under the inverter's 1,100 V limit, so the check shows OK. The formula bar shows the IF formula",
            "Procurement tracker":
              "The inverter was ordered 4 working days after its order-by date, so it arrives a day after electrical works start. The formula bar shows the status formula, a nested IF",
            "Cost tracker":
              "Mounting came in 6% over budget and AC cable 4% under. The formula bar shows SUMIFS adding up the budget by category",
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
                tell one story: Excel holds the data, Power BI reports on it. Power Query loads two tables from the
                workbook in three clicked steps (keep the columns needed, remove Excel&apos;s total row, set the data
                types), and four DAX measures drive the page: Budget, Forecast, Variance and Lines.
              </p>
              <p>
                The page shows budget, forecast and variance, budget against forecast by category, BOM lines by
                procurement status, and a table of the items that need action. The figures match the Excel workbook
                exactly. It is a demonstration project with illustrative PKR rates, and the screenshots are from Power BI
                Desktop itself.
              </p>
            </>
          }
          notes={{
            "Report page":
              "Three cards, a clustered bar chart, a column chart, and a table with a visual-level filter showing only the 7 lines that need action",
            "Power Query":
              "The applied steps on the right: remove other columns, filter out Excel's total row, set the data types. All 19 BOM lines come through",
            "DAX measure": "Variance = [Budget] - [Forecast], shown in the formula bar with the measure's description",
          }}
        />
      ),
    };
  }

  return artifacts;
}
