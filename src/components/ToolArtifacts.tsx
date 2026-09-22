import type { ReactNode } from "react";
import { Download } from "lucide-react";
import type { MediaItem } from "@/lib/media";
import { ScheduleView } from "./ScheduleView";
import { ScreenshotSet } from "./ScreenshotSet";

export type ToolArtifact = { title: string; icon: "gantt" | "sheet" | "chart" | "db" | "code"; render: () => ReactNode };

/** Screenshot folders under public/, one per tool. A tool only opens once its folder has images. */
export const TOOL_SHOT_FOLDERS: Record<string, string> = {
  "MS Project": "tools/ms-project",
  "Advanced Excel": "tools/advanced-excel",
  "Power BI": "tools/power-bi",
  SQL: "tools/sql",
  Python: "tools/python",
};

const EXCEL_WORKBOOK = "/tools/advanced-excel/115-kWp-commercial-rooftop-excel-demo.xlsx";
const SQL_SCRIPT = "/tools/sql/115-kWp-commercial-rooftop-sql-demo.sql";
const PY_NOTEBOOK = "/tools/python/115-kWp-rooftop-energy-yield.ipynb";
const PY_DATA = "/tools/python/pvgis_islamabad_monthly.csv";

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
      title: "Advanced Excel: BOM, procurement and cost tracker for a 115 kWp commercial rooftop",
      icon: "sheet",
      render: () => (
        <ScreenshotSet
          shots={xls}
          intro={
            <>
              <p>
                A project workbook for a 115 kWp commercial rooftop in Islamabad, with 198 Jinko 580 W modules in 11
                strings on a single Huawei SUN2000 inverter. It checks the string design against the inverter&apos;s
                voltage limit, prices the bill of materials, sets an order-by date for each item from the date it is
                needed on site, and tracks budget against committed and forecast cost.
              </p>
              <p>
                A dashboard sums up the job: cost position, late and overdue orders, and spend by supplier. The workbook
                uses Excel Tables, XLOOKUP, SUMIFS, COUNTIF, nested IF and WORKDAY.INTL, with conditional formatting and
                a PivotTable with a slicer. This is a sample project: module and inverter data come from the
                manufacturers&apos; datasheets, and the PKR rates are indicative.
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
                to see the formulas.
              </p>
            </>
          }
          notes={{
            Dashboard:
              "Budget PKR 7.11M against a forecast of PKR 7.14M (PKR 37,340 over), 3 items late or overdue, and a PivotTable with a supplier slicer",
            "Inputs and BOM":
              "18 modules per string reach 1,012 V on a -5 °C morning, inside the inverter's 1,100 V limit, so the check reads OK. The IF formula behind it is in the formula bar",
            "Procurement tracker":
              "The inverter was ordered 4 working days after its order-by date, so it arrives a day after electrical works start. The formula bar shows the nested IF that sets the status",
            "Cost tracker":
              "Mounting is 6% over budget and AC cable 4% under. The formula bar shows the SUMIFS that totals the budget by category",
          }}
        />
      ),
    };
  }

  const pbi = shots["Power BI"] ?? [];
  if (pbi.length > 0) {
    artifacts["Power BI"] = {
      title: "Power BI: cost and procurement report for a 115 kWp commercial rooftop",
      icon: "chart",
      render: () => (
        <ScreenshotSet
          shots={pbi}
          intro={
            <>
              <p>
                A one-page report for the same 115 kWp rooftop, fed from the Excel tracker. It shows budget, forecast
                and variance at a glance, compares budget and forecast for each cost category, counts BOM lines by
                procurement status, and lists the items that need action, most urgent first.
              </p>
              <p>
                Power Query imports and cleans the cost and procurement tables, and four DAX measures (Budget, Forecast,
                Variance and Lines) drive the visuals. The totals agree with the Excel workbook, and as with the
                workbook, the PKR rates are indicative.
              </p>
            </>
          }
          notes={{
            "Report page": "Three cards, a clustered bar chart, a column chart, and a table filtered to the 7 lines that need action",
            "Power Query":
              "The applied steps on the right: keep the columns needed, filter out Excel's total row, set the data types. All 19 BOM lines come through",
            "DAX measure": "Variance = [Budget] - [Forecast] in the formula bar, with the measure's description",
          }}
        />
      ),
    };
  }

  const sql = shots["SQL"] ?? [];
  if (sql.length > 0) {
    artifacts["SQL"] = {
      title: "SQL: BOM and procurement database for a 115 kWp commercial rooftop",
      icon: "db",
      render: () => (
        <ScreenshotSet
          shots={sql}
          intro={
            <>
              <p>
                An SQLite database for the same 115 kWp rooftop, built from the Excel tracker. It holds two linked
                tables: the bill of materials, with quantity, rate, budget and forecast for each of the 19 lines, and
                the procurement record for each line, with its order-by and delivery dates and status.
              </p>
              <p>
                Seven queries pull out the most expensive items, the budget by category, the procurement status of
                every line and, through a join between the two tables, the items that need ordering or chasing, most
                urgent first. The results agree with the Excel workbook and the Power BI report, and as with the
                workbook, the PKR rates are indicative.
              </p>
              <p>
                <a
                  href={SQL_SCRIPT}
                  download
                  className="inline-flex items-center gap-1.5 font-semibold underline underline-offset-4"
                  style={{ color: "var(--amber)" }}
                >
                  <Download size={14} aria-hidden="true" /> Download the SQL script (.sql)
                </a>{" "}
                to build the database and run the queries.
              </p>
            </>
          }
          notes={{
            "Database structure":
              "The two tables and their columns. The line number is the primary key of bom, and procurement uses it to link each row back to its BOM line",
            "Browse data": "All 19 BOM lines with quantity, unit rate, budget and forecast in PKR, supplier and lead time",
            "Budget by category":
              "Line count and budget for each category with GROUP BY. Modules account for PKR 3.10M of the PKR 7.11M total",
            "Items that need action":
              "The join adds item names and suppliers to the procurement status: 1 order overdue, 2 late deliveries and 4 orders due, most urgent first",
          }}
        />
      ),
    };
  }

  const py = shots["Python"] ?? [];
  if (py.length > 0) {
    artifacts["Python"] = {
      title: "Python: energy yield estimate for a 115 kWp commercial rooftop",
      icon: "code",
      render: () => (
        <ScreenshotSet
          shots={py}
          intro={
            <>
              <p>
                A Jupyter notebook that estimates how much energy the 115 kWp rooftop in Islamabad will produce each
                month and over a year. It takes the system size from the bill of materials, reads PVGIS solar data for
                the site (monthly averages for 2005 to 2023), and compares a simple estimate, system size x irradiation
                x a performance ratio of 0.80, with the PVGIS model.
              </p>
              <p>
                The system should produce about 178,300 kWh a year, or 1,553 kWh per kWp, with May the best month and
                February the lowest. The simple estimate comes out 7% high: from May to August the modules run hot and
                the performance ratio drops to about 0.71, so a flat 0.80 overstates the yield in Islamabad&apos;s
                climate. Written in Python with pandas and matplotlib; the 20° south-facing tilt and 14% system losses
                are assumptions.
              </p>
              <p>
                <a
                  href={PY_NOTEBOOK}
                  download
                  className="inline-flex items-center gap-1.5 font-semibold underline underline-offset-4"
                  style={{ color: "var(--amber)" }}
                >
                  <Download size={14} aria-hidden="true" /> Download the notebook (.ipynb)
                </a>{" "}
                and{" "}
                <a
                  href={PY_DATA}
                  download
                  className="font-semibold underline underline-offset-4"
                  style={{ color: "var(--amber)" }}
                >
                  the PVGIS data (.csv)
                </a>{" "}
                to run it yourself.
              </p>
            </>
          }
          notes={{
            "System size and data":
              "198 modules of 580 W give 114.84 kWp, and pandas reads the PVGIS monthly irradiation and energy per kWp for Islamabad from a CSV file",
            "Energy per month and year":
              "New columns for the simple estimate, the PVGIS model and each month's performance ratio, then the totals for the year: 178,296 kWh, or 1,553 kWh per kWp",
            "Monthly energy chart":
              "A matplotlib bar chart of the PVGIS model, with the simple estimate as a line. The gap opens up in the hot months",
          }}
        />
      ),
    };
  }

  return artifacts;
}
