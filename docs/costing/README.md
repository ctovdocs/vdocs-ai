# Reproducible VDocs cost model

Read the [cost estimate and assumptions](../developer/COST_ESTIMATE.md) first.

- `inputs.json`: editable workload, sizing, FX, reserve and company-budget inputs.
- `pricing-snapshot-2026-10-19.json`: verified public rates, source URLs, AWS SKUs and catalog dates.
- `cost_model.py`: offline Python calculator; no third-party packages or cloud credentials required.
- `scenario-totals.csv`: generated scenario results for spreadsheet use.

From the repository root:

```sh
python3 docs/costing/cost_model.py
```

This refreshes generated document tables and CSV results. It does not fetch new prices or change deployed services. Review narrative examples if you change the inputs. Values marked as allowances are internal estimates, not vendor quotes. Staffing, onboarding and sales-price examples are budget inputs rather than sourced market rates.
