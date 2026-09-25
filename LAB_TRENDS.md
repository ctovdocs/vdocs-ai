# Complete-panel lab trends

The first five foundation patients are Rahul Sharma, Priya Patel, Sunita Rao, Farah Khan and Arjun Desai (stable cohort IDs, not whatever order a filtered patient table happens to use).

Opening one of these patients imports 140 synthetic reports through the existing shared workflow save: seven CBCs, seven kidney/electrolyte panels, seven liver panels and seven urine panels per patient. The import is additive, deterministic and idempotent; existing reports, orders, reviews and encounters are not overwritten. In Supabase mode this uses the existing revision-checked patch RPC. A failed import shows Retry instead of claiming persistence. Live hosted import requires opening the signed-in app and was not performed through the CLI.

## Data design

- CBC: haemoglobin, RBC, haematocrit, MCV, MCH, MCHC, RDW, WBC, five-part differential and platelets. RBC indices are mathematically consistent; differential percentages sum to 100.
- KFT: creatinine, urea, sodium, potassium, chloride, bicarbonate, calcium and phosphate.
- LFT: total/direct bilirubin, AST, ALT, ALP, GGT, albumin and total protein.
- Urine: colour, appearance, specific gravity, pH, protein, glucose, ketones, blood, nitrite, leukocyte esterase, WBC/RBC microscopy, casts and crystals.
- Series reuse existing scenario values where available and use authored synthetic accompanying observations. They illustrate renal/anaemia trends, recovery from iron deficiency, and acute illness changes; they are not medical recommendations or actual Fortis reports.
- Four high-acuity demo patients carry disease signatures that worsen into the latest (acute) collection, so most results are high or low — tested at ≥70% of numeric results in the latest report and ≥60% across the latest five:
  - Rahul Sharma — advanced CKD with iron-deficient anaemia, uncontrolled type 2 diabetes and fatty liver.
  - Sunita Rao — CKD 5 on haemodialysis with hyperkalaemia and functional iron deficiency (aminotransferases are *below* range, as is typical on dialysis).
  - Farah Khan — type 2 diabetes with iron-deficiency anaemia progressing to sepsis/pneumonia/AKI.
  - Arjun Desai — poorly controlled type 1 diabetes (glycogenic hepatopathy, haemoconcentration) progressing to DKA.
  Scenario anchor values already in their charts (e.g. Sunita's potassium 4.8→6.8, Rahul's creatinine 1.4→2.1) are preserved, so some earlier visit-aligned values stay in range. Priya Patel stays mostly normal as the contrast case. Flags are always computed from the reference intervals, never set by hand. Parameters with no disease rationale (e.g. MCHC, basophils) are left in range.
- Seed marker `vdoc.lab-trends.v3`. Opening any of the five patients on a record seeded with an earlier version upgrades it in place: same report IDs and dates, values replaced, no duplicate reports or timeline entries; the delta save sends only the changed reports.
- Five sample dates align with recorded visits. Two intermediate archived outpatient collections explicitly have no encounter linkage; no fabricated admission or physician order is created. Only encounter-linked reports add encounter timeline entries. All reports remain available to the chart, report lookup and patient AI context.
- Reference intervals are illustrative adult demo intervals, not Fortis laboratory standards. No eGFR or treatment decision is inferred. Historic dates remain historic; they do not pretend to be today's tests.

Panel content was informed by [MedlinePlus CBC](https://medlineplus.gov/lab-tests/complete-blood-count-cbc/), [kidney tests](https://medlineplus.gov/kidneytests.html), [liver tests](https://www.medlineplus.gov/lab-tests/liver-function-tests/) and [urinalysis](https://medlineplus.gov/ency/article/003579.htm). These sources describe panel content, not validation of the authored fixture values or clinical ordering frequency.

## Interaction

Patient workspace → Lab trends. The section is collapsed by default behind a **Show trends** switch; the choice is remembered per browser (`vdoc.labTrends.visible` in localStorage). When on, a Separate / Table control picks the view (Separate is the default). The Combined view below is implemented but currently hidden from the view picker:

- **Combined** — every numeric parameter of the panel on one graph. Each line is the value's position within *that result's own* reference interval (0% = low limit, 100% = high limit, shaded band = inside the interval), so mixed-unit panels such as CBC can share one chart without placing different units on a raw shared axis. Selecting a point shows the real value, unit, reference and source report. Legend chips hide/show individual lines. Parameters that are qualitative or have no numeric reference interval are listed as "Not plotted" and remain in the Table view.
- **Separate** — one real-unit graph per numeric parameter (the same graph as View trend); qualitative parameters show a View history button.
- **Table** — the report-per-column table described below.

Colour key everywhere (graph points, zones, inspector, table cells): **green = within reference, orange ↓ = below, red ↑ = above**. Colours follow the source report's own flag; arrows and text labels always accompany the colour. Single-parameter graphs shade the plot into Low / Normal / High zones around the reference interval; in compare mode each line keeps its series colour while points keep their flag colour.

Choose a panel. Default is the latest five complete reports; select seven, ten, twenty-five or all (capped at 1,000), with inclusive IST date filters and parameter search. Each date column is a report, not one analyte. Existing other lab panels remain selectable.

View trend opens a detailed patient-context dialog: chronological line chart, readable axes, report-specific values, selected-result inspector and a dated results table. Up to two additional same-unit parameters may be compared with distinct colours and a shared scale. Different units are never implicitly converted or placed on a shared axis. The reference band appears only for a single series with one common numeric reference interval.

Graphs use actual date spacing and an explicitly auto-scaled Y-axis. Missing, bounded and qualitative results are not converted to zero or joined across gaps. Source flags remain visible, without treatment suggestions. Qualitative tests open a result-history dialog rather than a fabricated graph. Point selection is keyboard accessible, and the result dropdown/table provide non-graph alternatives. Open source report closes the trend dialog and opens the full report drawer.

The importer and selectors are tested, including patch round-trip persistence, duplicate import, complete panel counts, dates, missing data and mixed units. Browser/visual and hosted database verification remain manual; no Playwright was run.
