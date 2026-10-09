import type { ReactNode } from "react";
import { Download } from "lucide-react";
import type { MediaItem } from "@/lib/media";
import { ScheduleView } from "./ScheduleView";
import { ScreenshotSet } from "./ScreenshotSet";

export type ToolArtifact = {
  title: string;
  icon: "gantt" | "sheet" | "chart" | "db" | "code" | "solar" | "home" | "model" | "draft" | "battery";
  render: () => ReactNode;
};

/** Screenshot folders under public/, one per tool. A tool only opens once its folder has images. */
export const TOOL_SHOT_FOLDERS: Record<string, string> = {
  "Primavera P6": "tools/p6",
  "MS Project": "tools/ms-project",
  "Advanced Excel": "tools/advanced-excel",
  "Power BI": "tools/power-bi",
  SQL: "tools/sql",
  Python: "tools/python",
  Helioscope: "tools/helioscope",
  OpenSolar: "tools/opensolar",
  SketchUp: "tools/sketchup",
  AutoCAD: "tools/autocad",
  BESS: "tools/bess",
};

const P6_XER = "/tools/p6/20-kW-residential-pv-p6.xer";
const MSP_FILE = "/tools/ms-project/20-kW-residential-pv-ms-project.mpp";
const EXCEL_WORKBOOK = "/tools/advanced-excel/115-kWp-commercial-rooftop-excel-demo.xlsx";
const SQL_SCRIPT = "/tools/sql/115-kWp-commercial-rooftop-sql-demo.sql";
const SKP_MODEL = "/tools/sketchup/20-kW-rooftop-pv-islamabad.skp";
/** The three BESS sheets as drawn in AutoCAD: the plotted A1 PDF and the DWG behind it. */
const BESS_SHEETS: [string, string][] = [
  ["PV-01 mechanical", "/tools/autocad/80-kW-bess-PV-01-mechanical"],
  ["PV-03 battery control", "/tools/autocad/80-kW-bess-PV-03-battery-control"],
  ["PV-04 single line diagram", "/tools/autocad/80-kW-bess-PV-04-single-line-diagram"],
];

/** Small bordered table for the figures that read better as text than as a picture. */
function MiniTable({ head, rows, mark }: { head: string[]; rows: string[][]; mark?: number }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-[12.5px]" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ color: "var(--text)" }}>
            {head.map((h) => (
              <th key={h} className="py-1.5 pr-3 font-semibold" style={{ borderBottom: "1px solid var(--line)" }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={mark === i ? { color: "var(--text)", fontWeight: 600 } : undefined}>
              {row.map((cell, j) => (
                <td key={j} className="py-1.5 pr-3 align-top" style={{ borderBottom: "1px solid var(--line)" }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const BESS_TABLE_CABLE = (
  <MiniTable
    head={["Tag", "Cable", "Length", "Protection"]}
    rows={[
      ["W1", "16 × 1C 6 mm² PV1-F", "45 m", "None, one string per MPPT"],
      ["W2", "2 × 1C 35 mm² Cu XLPE", "8 m", "QF1, 125 A DC, 2 pole"],
      ["W3", "4C 95 mm² Cu SWA", "32 m", "QF2, 160 A MCCB"],
      ["W4", "4C 35 mm² Cu", "12 m", "QF4, 63 A MCB"],
      ["W5", "1C 50 mm² green/yellow", "20 m", "Main earthing conductor"],
    ]}
  />
);

const BESS_TABLE_PROT = (
  <MiniTable
    head={["Function", "Setting", "Trip time"]}
    rows={[
      ["27 under voltage", "0.80 Un", "2.5 s"],
      ["27 stage 2", "0.50 Un", "0.5 s"],
      ["59 over voltage", "1.15 Un", "1.0 s"],
      ["81 under frequency", "47.5 Hz", "0.5 s"],
      ["81 over frequency", "51.5 Hz", "0.5 s"],
      ["ROCOF", "1.0 Hz/s", "0.5 s"],
      ["Reconnect delay", "After the grid returns", "180 s"],
    ]}
  />
);

const BESS_TABLE_CONTROL = (
  <MiniTable
    head={["Period", "Action", "Limit"]}
    rows={[
      ["00:00 to 05:00", "Charge from the grid at the off peak rate", "Stop at 75% SoC"],
      ["06:00 to 18:00", "Charge from PV surplus", "Up to 100%"],
      ["06:00 to 18:00", "Discharge only to hold grid import down", "Not below 55%"],
      ["18:00 to 20:00", "Grid off, EPS board runs on PV and battery", "Down to 10%"],
      ["20:00 to 06:00", "Discharge if import would exceed the target", "Down to 10%"],
    ]}
  />
);

const BESS_TABLE_RESULT = (
  <MiniTable
    head={["Over a year", "Without battery", "With battery"]}
    rows={[
      ["PV generated", "116,742 kWh", "116,742 kWh"],
      ["Site load", "383,139 kWh", "383,139 kWh"],
      ["Grid import, total", "240,188 kWh", "250,546 kWh"],
      ["of which off peak charging", "none", "12,649 kWh"],
      ["Annual grid peak", "75.2 kW", "75.2 kW"],
      ["Hours over the 55 kW target", "1,078", "695, down 35.5%"],
      ["Outage demand met", "0%", "96.8%"],
      ["Battery throughput", "none", "12,729 kWh, 223.9 full cycles"],
      ["Round trip loss, battery only", "none", "641 kWh"],
    ]}
  />
);

const BESS_TABLE_SENS = (
  <MiniTable
    head={["Off peak charge target", "Outage met", "Hours over 55 kW", "PV stored", "Cycles a year"]}
    rows={[
      ["60%", "95.5%", "965", "1,106 kWh", "193.5"],
      ["75%, the one drawn", "96.8%", "695", "720 kWh", "223.9"],
      ["90%", "97.4%", "503", "305 kWh", "247.2"],
      ["100%", "97.7%", "390", "none", "260.2"],
    ]}
    mark={1}
  />
);
const PY_NOTEBOOK = "/tools/python/115-kWp-rooftop-energy-yield.ipynb";
const PY_DATA = "/tools/python/pvgis_islamabad_monthly.csv";

// A tool listed here becomes a clickable chip that opens the work behind it.
export function buildToolArtifacts(shots: Record<string, MediaItem[]>): Record<string, ToolArtifact> {
  const p6 = shots["Primavera P6"] ?? [];
  const artifacts: Record<string, ToolArtifact> = {
    "Primavera P6": {
      title: "Primavera P6: installation programme for a 20 kW residential PV system",
      icon: "gantt",
      render: () =>
        p6.length === 0 ? (
          <ScheduleView />
        ) : (
          <div>
            <ScreenshotSet
              shots={p6}
              intro={
                <>
                  <p>
                    The installation programme for the 20 kW on-grid residential system, built in Primavera P6
                    Professional 25.12 on a standalone database: <strong>25 activities</strong> under four WBS groups,
                    from the site survey to handover, joined by <strong>31 relationships</strong> on a Monday to
                    Saturday calendar. Starting Mon 5 Oct 2026, P6 schedules the job to finish on{" "}
                    <strong>Mon 2 Nov 2026</strong>, working day 25, with <strong>17 activities on the critical path</strong>{" "}
                    and no date constraints anywhere in the logic.
                  </p>
                  <p>
                    The programme is worth more than its bar chart. Utility approval takes 14 days but carries 2 days of
                    float, so it is not what drives the job; the mounting steel is. Cables have 9 days of float, the
                    modules 7 and the inverter 5, which is what tells you where a late delivery actually hurts. Stretch
                    the inverter from 6 days to 13 and the finish moves only <strong>2 days</strong>, because the float
                    absorbs the rest, but the critical path jumps off the steel and onto the inverter, so the job now
                    has to be managed somewhere else.
                  </p>
                  <p>
                    P6&apos;s own scheduler was checked against the critical path this site calculates in the browser,
                    shown below the screenshots: every duration and every total float agrees, 17 critical activities in
                    both, and the same working day 25 finish that the MS Project version gives. The start date is an
                    example and the durations are my own planning estimates.
                  </p>
                  <p>
                    <a
                      href={P6_XER}
                      download
                      className="inline-flex items-center gap-1.5 font-semibold underline underline-offset-4"
                      style={{ color: "var(--amber)" }}
                    >
                      <Download size={14} aria-hidden="true" /> Download the programme (.xer)
                    </a>{" "}
                    to open it in any copy of P6.
                  </p>
                </>
              }
              notes={{
                "Gantt with the critical path":
                  "All 25 activities under the four WBS groups, with original duration, start, finish and total float. Red bars are critical, green bars have float, diamonds are milestones and the black bars are the WBS summaries",
                "Critical activities only":
                  "P6's Critical filter, showing only the 17 activities with zero total float: survey, design, sign-off, the mounting steel, the installation sequence and everything from pre-commissioning to handover",
                "Relationships and lag":
                  "Mounting the inverter has two predecessors: the inverter delivery finish-to-start, and the mounting structure start-to-start with a 2 day lag, so the electrical work begins while the steel is still going up",
                "What if the inverter is late":
                  "The inverter delivery stretched from 6 days to 13. The finish slips only to Wed 4 Nov because the activity had 5 days of float, and the critical path moves off the mounting steel onto the inverter chain",
              }}
            />
            <div className="mt-8 border-t pt-6" style={{ borderColor: "var(--line)" }}>
              <ScheduleView />
            </div>
          </div>
        ),
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
      title: "SketchUp: 3D model of the house and a ray traced shading study of the array",
      icon: "model",
      render: () => (
        <ScreenshotSet
          shots={sku}
          intro={
            <>
              <p>
                The 20 kW house system from the Primavera P6 and MS Project programmes, modelled on its building: a two
                storey brick house 16 m by 14 m, with the stair block and the water tank that sit on almost every
                Islamabad roof. On top are 36 LONGi 550 W modules, 19.8 kWp, in six rows of six on single-tilt steel
                frames at 20° facing south, 6.80 m by 11.78 m of array with 2.0 m between rows.
              </p>
              <p>
                The model is geo-located on the real roof in F-11/2, so the sun is the site&apos;s own. A script fires a
                ray from 432 points across the array towards the sun at every daylight hour on the solstices and the
                equinoxes, 19,008 tests in all, and records what blocks each one. The array averages{" "}
                <strong>90.8% solar access</strong>. The worst module, beside the stair block, gets 70.5%; the best gets
                94.9%. On 21 December only 47% of the array is in sun at 08:00 and 79% at midday, while in March, June
                and September it is fully lit from mid morning to mid afternoon.
              </p>
              <p>
                The map colours every module by its own result, and the two winter views show where the losses come
                from: the stair block across the back row, the water tank across the front corner, and the rows across
                each other around midday. Solar access counts sun hours equally, so it is a geometry check, not an
                energy figure.
              </p>
              <p>
                <a
                  href={SKP_MODEL}
                  download
                  className="inline-flex items-center gap-1.5 font-semibold underline underline-offset-4"
                  style={{ color: "var(--amber)" }}
                >
                  <Download size={14} aria-hidden="true" /> Download the model (.skp, 37 MB)
                </a>
              </p>
            </>
          }
          notes={{
            "House and array":
              "The house as modelled: brick, plaster bands, stone plinth, windows and porch, with the stair block, the water tank and the 19.8 kWp array on the roof",
            "Roof plan and dimensions":
              "The setting out for site: 6.80 m by 11.78 m of array, 2.0 m from row to row, on a 16 m by 14 m roof",
            "December morning shadows":
              "21 December at 09:00, with the sun 17.8° up: the stair block and the water tank throw shadows across the array",
            "December noon shadows":
              "21 December at 12:00, sun 32.9° up: the rows now clip the bottom of the row behind them",
            "Solar access map":
              "Every module coloured by its ray traced result: 90.8% across the array, 70.5% at the worst module beside the stair block",
            "Frame and row spacing":
              "The frames: modules at 20° on rails 0.30 m high at the front and 0.95 m at the back, with room to walk between rows",
          }}
        />
      ),
    };
  }

  const cad = shots["AutoCAD"] ?? [];
  if (cad.length > 0) {
    artifacts["AutoCAD"] = {
      title: "AutoCAD: drawings for an 80 kW rooftop with a 63 kWh battery",
      icon: "draft",
      render: () => (
        <ScreenshotSet
          shots={cad}
          intro={
            <>
              <p>
                The drawing set for an 80 kW rooftop PV system with battery storage on a commercial unit in Islamabad:
                136 Jinko 580&nbsp;W modules at <strong>78.88&nbsp;kWp</strong> on a <strong>FoxESS P3-80-Plus</strong>{" "}
                hybrid inverter, with <strong>nine FoxESS CQ7 modules</strong> in series giving 63.18&nbsp;kWh at
                518.4&nbsp;V. Three A1 sheets, drawn in AutoCAD 2027: the single line diagram, the mechanical layout and
                the battery control sheet.
              </p>
              <p>
                <strong>PV-04, the single line diagram, is drawn the way it would be issued.</strong> Frame and title
                block, revision history, legend, a tag on every device and every conductor, surge arresters on the DC
                and AC sides, current transformers and metering, interface protection with its trip and settings, the
                existing LV board and the point of supply, and the earthing. Figures 1 to 8 open that one sheet up block
                by block, because a whole A1 sheet reduced to the width of this panel puts its lettering under 3&nbsp;px.
                Figure 1 is the key diagram, the whole system on one line before any of the detail.
              </p>
              <p>
                Figures 9 to 11 come from PV-01, the mechanical layout: the roof plan and how the array is set out on it,
                the mounting section that fixes the row spacing, and the plant room.
              </p>
              <p>
                The cable schedule and the interface protection settings as they appear on PV-04. Lengths are design
                figures for this building. Cable sizes and volt drop are to be confirmed on the actual route, and the
                relay settings with IESCO, so the sheet stays at revision P3, issued for comment, until they are.
              </p>
              {BESS_TABLE_CABLE}
              {BESS_TABLE_PROT}
              <p>
                The full sheets as AutoCAD plotted them at A1, and the drawing files. The battery sizing and the hourly
                model behind them are under BESS.
              </p>
              <p className="flex flex-wrap gap-x-4 gap-y-1.5">
                {BESS_SHEETS.flatMap(([label, base]) =>
                  (["pdf", "dwg"] as const).map((ext) => (
                    <a
                      key={`${base}.${ext}`}
                      href={`${base}.${ext}`}
                      download
                      className="inline-flex items-center gap-1.5 font-semibold underline underline-offset-4"
                      style={{ color: "var(--amber)" }}
                    >
                      <Download size={14} aria-hidden="true" /> {label} (.{ext})
                    </a>
                  )),
                )}
              </p>
            </>
          }
          notes={{
            "The key diagram":
              "The bottom left corner of the sheet. Array and battery into the hybrid inverter, out to the grid on one side and the essential board on the other, with the device tags that every other view uses. A key diagram is there so somebody can take in the shape of the system before reading any of the detail",
            "The array and its DC protection":
              "Eight strings of seventeen, each run to its own MPP tracker as a separate circuit, so nothing is paralleled on the DC side and no string fuse is needed. A Type 2 surge arrester per tracker sits at the array end, and the DC switch is the one built into the P3-80-Plus. 956 V at minus 5 degrees, under the inverter's 1,000 V limit",
            "The battery and its protection":
              "Nine CQ7 modules in series, 63.18 kWh at 518.4 V. The 125 A two pole DC breaker, rated 1,000 V DC, is above the 110 A sixty second peak so it does not nuisance trip and below the rating of the 35 mm² cable so the cable stays protected. The isolator is for safe isolation, not for clearing faults. The BMS sets the charge limits and the inverter follows them over CAN, and the emergency stop is in that same loop",
            "The inverter":
              "The functions that live inside the unit rather than on the wall beside it: eight MPP trackers, the integral DC switch, Type 2 surge protection on the DC and AC sides, a Type B residual current monitor, anti islanding to IEC 62116, and three battery ports of which one is in use. Knowing what is already inside the box is what stops you specifying it twice",
            "The metering and interface protection":
              "A current transformer on the generation cable feeding the generation meter, and an interface protection relay watching voltage, frequency and rate of change of frequency. Its trip output opens the new 160 A way through a shunt trip, which takes the whole system off the board. This is the block a network operator asks about first on any grid connected generator",
            "The essential board and earthing":
              "The essential board is fed only from the inverter's EPS port. In normal running the inverter passes grid power through to it, and when the grid fails it changes over inside the unit in under 10 ms, so the board never sees the grid go. Below it the main earth bar, with the array frame, the battery enclosure, the inverter and the main board all bonded to it and an electrode under 10 ohms",
            "The point of connection":
              "Where the system actually joins the building. A new 160 A way on the existing busbar, the existing 630 A incomer, the utility transformer outside the board with the point of supply marked, the import export meter, and the current transformer whose signal limits export. Drawing the existing installation is what turns a schematic into something a contractor can work from",
            "The title block and revisions":
              "Client, project, drawing title, number, scale and revision, with the history above it: issued for comment, surge protection and metering added, then issued for comment again after a full drawing review. It stays at P status until the cable sizes and protection settings are confirmed. Without this a drawing cannot be referenced, superseded or checked",
            "The roof plan and array setting out":
              "The south west part of the roof plan on PV-01, at 1:100. Eight rows of seventeen modules in landscape at a 1,800 mm pitch, set 3,000 mm clear of the south parapet and 3,477 mm in from the west edge of a 46 by 24 m roof. The string cables run in DC trunking along the north side to a single sealed cable entry, so the ballasted frame itself needs no roof penetration",
            "The mounting section and row spacing":
              "Detail A at 1:20, south on the left. Ballasted frames at 15 degrees, with the front rail 300 mm and the rear rail 594 mm above the membrane. The dashed line is the shading ray on 21 December at 09:00: at its 24.8 degree profile angle the shadow ends 69 mm short of the next row, which is what sets the 1,800 mm pitch",
            "The plant room":
              "Detail B at 1:50. The inverter, the AC panel and the EPS board on the north wall, the nine module CQ7 stack 200 mm off it, a 1,000 mm clear working zone in front of all four, and a 900 mm door opening in at the south east corner",
          }}
        />
      ),
    };
  }

  const bess = shots["BESS"] ?? [];
  if (bess.length > 0) {
    artifacts["BESS"] = {
      title: "Battery storage: an 80 kW rooftop with a 63 kWh FoxESS battery",
      icon: "battery",
      render: () => (
        <ScreenshotSet
          shots={bess}
          intro={
            <>
              <p>
                A design for a commercial unit in Islamabad: 136 Jinko 580&nbsp;W modules at{" "}
                <strong>78.88&nbsp;kWp</strong> on a <strong>FoxESS P3-80-Plus</strong> hybrid inverter, with{" "}
                <strong>nine FoxESS CQ7 modules</strong> in series giving 63.18&nbsp;kWh at 518.4&nbsp;V. The drawings
                for it, the single line diagram, the mechanical layout and the control sheet, are under AutoCAD.
              </p>
              <p>
                The first thing the model said was that the battery was not worth fitting. Charged only from surplus PV
                it cycled about 13 times a year, because the site load is <strong>3.3 times</strong> the generation
                and there is almost no surplus to store. That result is what shaped everything after it: the battery
                only earns its place if it is charged off peak and given the job of carrying the site through the daily
                outage.
              </p>
              <p>
                Dispatch was modelled hour by hour for a year in plain Python with no libraries, so every number can be
                traced by reading the file. Three jobs, in priority order: hold a reserve for the essential board
                through the evening outage, keep grid import under the maximum demand target, and soak up whatever PV
                would otherwise be exported.
              </p>
              {BESS_TABLE_CONTROL}
              {BESS_TABLE_RESULT}
              <p>
                Total import rises because off peak charging is itself an import. Of the 12,729&nbsp;kWh the battery
                delivers in a year, 10,438&nbsp;kWh carries the essential board through the evening outage and
                2,291&nbsp;kWh cuts daytime import above the target. The 55% floor holds 1.9 hours of reserve against a
                2 hour outage, so 96.8% of outage demand is met. A higher floor would cover more of the outage and
                leave less for daytime shaving.
              </p>
              <p>
                <strong>The annual peak does not move, and that is worth saying out loud.</strong> It falls on a
                December afternoon when there is no PV left and the state of charge is pinned at the 55% floor that
                protects the 18:00 outage. Hours spent over the target do fall, by a third. Lowering the maximum as well
                needs a second CQ7 stack on port two, or an agreement to accept a shorter backup through the winter.
                That is a commercial decision, not an electrical one.
              </p>
              <p>
                How full to charge off peak is the one setting that trades the three jobs against each other. Charging
                fuller shaves better and covers the outage better, but leaves no room for the midday PV surplus. At 100%
                the battery takes no PV at all.
              </p>
              {BESS_TABLE_SENS}
              <p>
                Equipment figures come from the FoxESS P3 Plus and CQ7 datasheets and the Jinko 72HL4-V datasheet. The
                load profile, the outage window and the tariff periods are design assumptions, declared at the top of
                the model, and would be replaced with half hourly meter data before anything was ordered.
              </p>
            </>
          }
          notes={{
            "A year of dispatch in two days":
              "The same control on the two days that matter. In April grid import stays at or below the 55 kW target all day. In December there is no PV left by the afternoon and the state of charge is pinned at the floor, so the import climbs to the 75.2 kW that sets the annual peak",
          }}
        />
      ),
    };
  }

  return artifacts;
}
