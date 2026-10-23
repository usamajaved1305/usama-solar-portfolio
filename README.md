# Usama Javed | Solar PV Project Engineer, Planning and Site Delivery

Live portfolio: **[usamajaved.ie](https://usamajaved.ie)**

Personal portfolio website for Usama Javed, a mechatronics engineer with three and a half years delivering solar PV projects from site survey through installation, commissioning and client handover, currently completing an MSc in Business Analytics at Dublin Business School.

## Target Role Pages

- **[Project Planner / Scheduler](https://usamajaved.ie/roles/planning)**: construction programmes, baselines, look-aheads and progress reporting in Primavera P6, MS Project, Advanced Excel and Power BI.
- **[Solar Project / Technical Engineer](https://usamajaved.ie/roles/project-engineering)**: PV design checks, layouts, drawings and single line diagrams in HelioScope, OpenSolar, AutoCAD and SketchUp.
- **[Site Supervisor / Field Delivery](https://usamajaved.ie/roles/site-delivery)**: installation crew leadership across up to five concurrent sites (up to 40 people), activity sequencing, workmanship inspection, testing and commissioning.
- **[Energy / Reporting Analyst](https://usamajaved.ie/roles/energy-analytics)**: project and energy reporting in Power BI, Advanced Excel, SQL and Python, grounded in 3.5 years of solar PV delivery.

## Project Deliverables on the Site

Each tool chip on the portfolio opens the actual project files, drawings, models and reports built in that software:

| Tool | Project | Standalone Repository |
|---|---|---|
| **AutoCAD** | 80 kW commercial rooftop PV (136 x Jinko 580 W, 78.88 kWp) with a 63.18 kWh FoxESS CQ7 battery on a P3-80-Plus hybrid inverter: A1 sheets PV-01, PV-03 and PV-04 (DWG and PDF) plus an 8,760-hour Python dispatch model | [80kw-pv-bess-autocad-dispatch](https://github.com/usamajaved1305/80kw-pv-bess-autocad-dispatch) |
| **Primavera P6** | 20 kW on-grid residential PV installation programme (25 activities, 4 WBS groups, 31 relationships, Mon to Sat calendar, working day 25 finish, 17 critical activities, `.xer` export) | [20kw-rooftop-pv-schedule-and-shading](https://github.com/usamajaved1305/20kw-rooftop-pv-schedule-and-shading) |
| **MS Project** | 20 kW residential PV programme with saved baseline and Tracking Gantt (`.mpp` file) | [20kw-rooftop-pv-schedule-and-shading](https://github.com/usamajaved1305/20kw-rooftop-pv-schedule-and-shading) |
| **OpenSolar** | 20 kW house system in F-11/2, Islamabad (36 x LONGi 550 W, 19.8 kWp, Growatt MID 20KTL3-X, 6 rows of 6 at 20 deg tilt and 148 deg azimuth, 27,283 kWh/yr SAM output and customer proposal) | [20kw-rooftop-pv-schedule-and-shading](https://github.com/usamajaved1305/20kw-rooftop-pv-schedule-and-shading) |
| **SketchUp** | 3D house and roof array model (`.skp`) aligned to the OpenSolar geometry (11.7 m by 17.7 m roof, 2.80 m row pitch) with a Python ray-traced shading check (3.8% annual clear-sky direct beam loss) | [20kw-rooftop-pv-schedule-and-shading](https://github.com/usamajaved1305/20kw-rooftop-pv-schedule-and-shading) |
| **Advanced Excel** | 115 kWp commercial rooftop BOM, procurement lead-time tracker and cost workbook (198 x Jinko 580 W on Huawei SUN2000-100KTL-M2, cold Voc check at 1,012 V against 1,100 V limit, `.xlsx` download) | [115kwp-solar-bom-cost-procurement](https://github.com/usamajaved1305/115kwp-solar-bom-cost-procurement) |
| **Power BI** | Cost and procurement report fed from the 115 kWp Excel workbook through Power Query and DAX measures (Budget, Forecast, Variance and Lines) | [115kwp-solar-bom-cost-procurement](https://github.com/usamajaved1305/115kwp-solar-bom-cost-procurement) |
| **SQL** | SQLite database (`bom` and `procurement` tables, 19 lines) and seven analytical queries for cost breakdown and overdue procurement tracking (`.sql` script) | [115kwp-solar-bom-cost-procurement](https://github.com/usamajaved1305/115kwp-solar-bom-cost-procurement) |
| **Python** | Jupyter notebook estimating monthly and annual energy yield for the 115 kWp rooftop using PVGIS ERA5 solar data (2005 to 2023): 178,296 kWh/yr, 1,553 kWh/kWp, PR 0.75 | [115kwp-solar-energy-yield-python](https://github.com/usamajaved1305/115kwp-solar-energy-yield-python) |
| **HelioScope** | Roof layout, string wiring (11 strings of 18 on 6 mm2 copper) and Meteonorm simulation (158.8 MWh/yr, 1,382.5 kWh/kWp, PR 81.3%) for the 115 kWp commercial rooftop | [115kwp-solar-energy-yield-python](https://github.com/usamajaved1305/115kwp-solar-energy-yield-python) |

## Tech Stack

- **Framework**: Next.js 16 (App Router, static export)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Motion**: Framer Motion
- **Deployment**: Vercel ([usamajaved.ie](https://usamajaved.ie))

## Local Development

```bash
npm install
npm run dev
```

Build the static export to `out/`:

```bash
npm run build
```
