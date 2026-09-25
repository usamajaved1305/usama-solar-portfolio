import type { ReactNode } from "react";
import { Download } from "lucide-react";
import type { MediaItem } from "@/lib/media";
import { ScheduleView } from "./ScheduleView";
import { ScreenshotSet } from "./ScreenshotSet";

export type ToolArtifact = {
  title: string;
  icon: "gantt" | "sheet" | "chart" | "db" | "code" | "solar" | "home" | "model";
  render: () => ReactNode;
};

/** Screenshot folders under public/, one per tool. A tool only opens once its folder has images. */
export const TOOL_SHOT_FOLDERS: Record<string, string> = {
  "MS Project": "tools/ms-project",
  "Advanced Excel": "tools/advanced-excel",
  "Power BI": "tools/power-bi",
  SQL: "tools/sql",
  Python: "tools/python",
  Helioscope: "tools/helioscope",
  OpenSolar: "tools/opensolar",
  SketchUp: "tools/sketchup",
};

const MSP_FILE = "/tools/ms-project/20-kW-residential-pv-ms-project.mpp";
const EXCEL_WORKBOOK = "/tools/advanced-excel/115-kWp-commercial-rooftop-excel-demo.xlsx";
const SQL_SCRIPT = "/tools/sql/115-kWp-commercial-rooftop-sql-demo.sql";
const SKP_MODEL = "/tools/sketchup/20-kW-rooftop-pv-islamabad.skp";
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
      title: "MS Project: installation programme for a 20 kW residential PV system",
      icon: "gantt",
      render: () => (
        <ScreenshotSet
          shots={msp}
          intro={
            <>
              <p>
                The same 20 kW on-grid residential programme as the Primavera P6 view, built in Microsoft Project: 25
                activities under 4 summary tasks, from the site survey to handover, on a Monday to Saturday calendar,
                with finish-to-start links and two start-to-start links with lags. Project&apos;s own schedule matches
                the P6 view exactly: handover on working day 25, with 13 critical tasks shown in red.
              </p>
              <p>
                The baseline is saved, so the Tracking Gantt shows a grey baseline bar under every task and 0 days of
                finish variance, and any slip entered from here on shows against it. The start date of Mon 5 Oct 2026
                is an example, and the durations are my own planning estimates.
              </p>
              <p>
                <a
                  href={MSP_FILE}
                  download
                  className="inline-flex items-center gap-1.5 font-semibold underline underline-offset-4"
                  style={{ color: "var(--amber)" }}
                >
                  <Download size={14} aria-hidden="true" /> Download the project file (.mpp)
                </a>
              </p>
            </>
          }
          notes={{
            "Gantt chart":
              "Every task with its activity ID, duration and dates. The critical path is in red, the blue tasks have float, and the diamonds are milestones",
            "Tracking Gantt with baseline":
              "After the baseline is saved, a grey bar sits under each scheduled bar and every task shows 0 days of finish variance. Handover is baselined for Mon 2 Nov 2026",
          }}
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

  const helio = shots["Helioscope"] ?? [];
  if (helio.length > 0) {
    artifacts["Helioscope"] = {
      title: "HelioScope: roof layout and energy simulation for a 115 kWp commercial rooftop",
      icon: "solar",
      render: () => (
        <ScreenshotSet
          shots={helio}
          intro={
            <>
              <p>
                The same 115 kWp system as the Excel, Power BI, SQL and Python projects, designed in HelioScope on a
                typical industrial roof in Islamabad&apos;s I-9 area: 198 Jinko 580 W modules on fixed-tilt racking at
                20°, wired in 11 strings of 18 into one Huawei SUN2000-100KTL-M2 inverter (DC/AC ratio 1.15).
                HelioScope checked the strings against Islamabad temperatures: 998 V on the coldest morning, inside the
                inverter&apos;s 1,100 V limit.
              </p>
              <p>
                The rows follow the building, at an azimuth of 146° (34° east of south), to fit all 198 modules; that
                costs about 2% of yield against due south. The simulation, on Meteonorm weather data, gives 158.8 MWh a
                year, or 1,383 kWh per kWp at a performance ratio of 81%. That is about 9% below the PVGIS figure for the
                same orientation, mainly because Meteonorm has 14% less sunshine for Islamabad than PVGIS&apos;s ERA5
                data. It is a sample design, using HelioScope&apos;s default loss settings.
              </p>
            </>
          }
          notes={{
            "Roof layout":
              "The field segment on the roof: 198 modules at 20° tilt and 146° azimuth, capped at 114.84 kWp, with each roof edge measured in metres",
            "Wiring and inverter":
              "One Huawei 100 kW inverter and 11 strings of 18 modules on 6 mm² copper. The lines on the roof show how HelioScope routed the strings",
            "Production report":
              "158.8 MWh a year, 1,382.5 kWh/kWp and a performance ratio of 81.3%, with production by month and the loss breakdown",
            "Loss breakdown":
              "Step by step from 1,576.5 kWh/m² of sunlight to 158,761 kWh sent to the grid: shading 3.6%, reflection 3.0%, soiling 2.0%, heat 4.9%, mismatch 3.8% and the inverter 1.6%",
          }}
        />
      ),
    };
  }

  const os = shots["OpenSolar"] ?? [];
  if (os.length > 0) {
    artifacts["OpenSolar"] = {
      title: "OpenSolar: rooftop design and customer proposal for a 20 kW house system",
      icon: "home",
      render: () => (
        <ScreenshotSet
          shots={os}
          intro={
            <>
              <p>
                The same 20 kW house system as the Primavera P6 and MS Project programmes, drawn in OpenSolar on a
                rooftop in Islamabad&apos;s F-11/2: 36 LONGi 550 W modules, 19.8 kWp, on tilted frames facing south at
                20°, wired as two strings of 18 into one Growatt MID 20KTL3-X, a 20 kW three-phase inverter, so the
                DC/AC ratio is 0.99.
              </p>
              <p>
                OpenSolar runs the layout through NREL&apos;s System Advisor Model and gives 27,930 kWh a year, or 1,410
                kWh per kWp, at 13.8% system losses. Against a household using 24,000 kWh a year that covers 116%. It
                then writes the customer proposal: the system, the monthly production and the local NEPRA tariff. It is
                a sample design on flat satellite imagery, so shading is not modelled, and the pricing pages are left
                out.
              </p>
            </>
          }
          notes={{
            "Roof layout":
              "36 modules on the flat roof, 6 rows of 6 on single-tilt frames at 20° facing 180°, covering 6.8 m by 11.84 m",
            "Inverter and strings":
              "One Growatt MID 20KTL3-X and its two MPPT inputs, with OpenSolar's automatic stringing: 18 modules per string, drawn across the array",
            "Customer proposal":
              "What the client sees: 36 x 550 W LONGi modules, 19.8 kW, one 20 kW Growatt inverter, 27,930 kWh a year, with the panel and inverter warranties",
            "System performance":
              "Production month by month against the household's use, 116% of a 24,000 kWh year, modelled with the System Advisor Model at 13.8% losses",
          }}
        />
      ),
    };
  }

  const sku = shots["SketchUp"] ?? [];
  if (sku.length > 0) {
    artifacts["SketchUp"] = {
      title: "SketchUp: 3D model of the 20 kW roof, frames and winter shading",
      icon: "model",
      render: () => (
        <ScreenshotSet
          shots={sku}
          intro={
            <>
              <p>
                The 20 kW house system from the Primavera P6 and MS Project programmes, built in 3D: 36 LONGi 550 W
                modules in 6 rows of 6 on single-tilt steel frames at 20° facing south. The array covers 6.80 m by 11.78
                m on a 16 m by 14 m flat roof with a 0.9 m parapet, and the frames stand 0.30 m above the roof at the
                front and 0.95 m at the back.
              </p>
              <p>
                The model sits on the same roof as the OpenSolar design, in F-11/2 Islamabad, so SketchUp&apos;s shadows
                are the real ones for the site. At midday on 21 December the sun is 32.9° above the horizon and each row
                throws a 1.05 m shadow; with 2.0 m between rows that covers about 0.8 m of the row behind. Clearing it
                takes 2.8 m between rows, which leaves room for five rows instead of six. That is the trade-off for
                fitting 36 modules on this roof.
              </p>
              <p>
                <a
                  href={SKP_MODEL}
                  download
                  className="inline-flex items-center gap-1.5 font-semibold underline underline-offset-4"
                  style={{ color: "var(--amber)" }}
                >
                  <Download size={14} aria-hidden="true" /> Download the model (.skp)
                </a>
              </p>
            </>
          }
          notes={{
            "Array on the roof":
              "The system in place: 36 modules in 6 rows on tilted steel frames, with the walkways left around them",
            "Roof plan and dimensions":
              "The setting out for site: 6.80 m by 11.78 m of array, 2.0 m from row to row, on a 16 m by 14 m roof",
            "December noon shadows":
              "The same model at midday on 21 December: the shadow of each row falls across the bottom of the row behind it",
            "Frame and row spacing":
              "The frames: modules at 20° on rails 0.30 m high at the front and 0.95 m at the back, with a gap to walk and work between rows",
          }}
        />
      ),
    };
  }

  return artifacts;
}
