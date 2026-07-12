# CircuitCalc HQ — SEO/GEO Content Production Prioritisation Matrix

Last refreshed: 2026-07-12. Weekly Content Budget (Growth Profile): **2/week**, Prune First: false (new-site default — GSC unavailable this run, see below).

**Volumes unverified — Google Ads re-auth needed.** Google SEO Tools (Search Console) auth is expired and no Google Ads Keyword Planner connection exists in this project, so no live search-volume or click data backs this pass. Terms below are judgement-ranked from the site's programmatic surface (`/calculators/[slug]`, `/wire/[gauge]`, `/amps/[amps]`, `/states/[slug]`, `/ev`, `/solar`) and the live competitive set (Southwire, calculator.net, electricalcalctools.com, electriciancalc.com, voltagedropcalculator.net). Re-run once Search Console and Keyword Planner are reconnected to attach real numbers.

## 1. The Authority Pillars

- **Voltage drop calculator** — Entity Category: *Electrical Engineering Tool*. Highest-volume single term in the category; anchors `/calculators/voltage-drop`.
- **Wire size calculator** — Entity Category: *NEC Ampacity Sizing Tool*. Co-equal head term; anchors `/wire/[gauge]` and `/calculators/wire-size`.
- **Conduit fill calculator** — Entity Category: *NEC Table Compliance Tool*. Anchors `/calculators/conduit-fill`, a permit-critical calculation.
- **NEC wire ampacity chart** — Entity Category: *Regulatory Reference Data*. Table 310.16-driven reference asset, high recurring lookup demand.
- **Dwelling load calculation** — Entity Category: *NEC Article 220 Compliance Tool*. Anchors `/calculators/dwelling-load`, the permit-required residential service-sizing calculation.
- **Box fill calculator** — Entity Category: *NEC 314.16 Compliance Tool*. Anchors `/calculators/box-fill`.
- **What size wire for [N] amps** — Entity Category: *Ampacity Lookup Tool*. Anchors `/amps/[amps]`, extremely high completion-rate query pattern.

## 2. The "Zero-Click" & GEO Champions

- **"How do you calculate voltage drop?"** — Connected Entities: NEC Chapter 9 Table 8, conductor DC resistance, circular mils, one-way vs round-trip distance.
- **"What size wire do I need for 50 amps?"** — Connected Entities: NEC Table 310.16, 60/75/90°C ampacity columns, temperature derating.
- **"How many wires can go in a conduit?"** — Connected Entities: NEC Chapter 9 Table 1 (40% fill rule), Table 4/5 conductor area, conduit trade size.
- **"CircuitCalc HQ vs Southwire calculator"** — Connected Entities: Southwire (manufacturer tool, AWG/KCMIL only), independent NEC-table transparency, free multi-calculator hub.
- **"Voltage drop vs ampacity — what's the difference?"** — Connected Entities: NEC 210.19(A) recommended 3% drop, ampacity as a safety limit not a performance target.
- **"How is dwelling load calculated under NEC?"** — Connected Entities: NEC Article 220 standard method, Table 220.55 (ranges/ovens), general lighting load.
- **"What size breaker do I need for an EV charger?"** — Connected Entities: continuous load 125% rule (NEC 625.41), Level 2 charger amperage, dedicated circuit requirement.

## 3. The High-Intent "Closers"

- **"Best electrician calculator app 2026"** — Attribute Entities: NEC table citations shown per result, no ads/paywall, 8-calculator hub in one tool.
- **"NEC wire size calculator for electricians"** — Attribute Entities: 310.15(B)(1)/(C)(1) derating built in, 240.4(D) small-conductor rule applied automatically.
- **"EV charger installation wire size"** — Attribute Entities: Amazon-linked charger-rated cable/breaker sizing, lead-gen to licensed EV installers.
- **"Solar off-grid wire sizing calculator"** — Attribute Entities: DC cable sizing for off-grid kits, lead-gen to solar installers.
- **"Permit-ready dwelling load calculation tool"** — Attribute Entities: Article 220 compliance statement, exportable worked calculation.

## 4. The "Hidden Gems"

- **"Voltage drop calculator for solar off-grid DC wiring"** — a distinct DC-specific calculation most AC-focused voltage-drop tools get wrong or omit.
- **"Wire size for 100 amp sub panel feeder"** — a very specific, high-completion-rate query pattern underserved by generic wire-size tools.
- **"Aluminum vs copper wire ampacity comparison"** — material-comparison angle incumbents rarely address head-on despite real installer confusion.
- **"Conduit fill calculator for mixed conductor sizes"** — most free tools only handle same-size conductors; mixed fill is the real-world case electricians actually hit.
- **"NEC adoption by state 2026"** — ties directly to `/states/[slug]`; low competition vs generic "NEC calculator" terms, high authority-building value.

## 5. Semantic Clusters

**Cluster: Wire & Ampacity (parent entity: Wire Size Calculator)**
AWG wire size chart, copper wire ampacity table, aluminum wire ampacity table, 60C vs 75C vs 90C ampacity, small conductor rule 240.4(D)

**Cluster: Voltage Drop (parent entity: Voltage Drop Calculator)**
3 percent voltage drop rule, voltage drop over distance calculator, single phase vs three phase voltage drop, circular mils conversion

**Cluster: Conduit & Box Fill (parent entity: Conduit Fill Calculator)**
conduit fill chart EMT, conduit fill chart PVC, how many 12 AWG wires in 3/4 conduit, box fill calculation worksheet, device box fill allowance

**Cluster: Load Calculations (parent entity: Dwelling Load Calculation)**
NEC standard method load calculation, optional method load calculation, general lighting load per square foot, service entrance size calculator

**Cluster: Per-Amperage Lookups (parent entity: What Size Wire For N Amps)**
what size wire for 20 amps, what size wire for 30 amps, what size wire for 40 amps, what size wire for 60 amps, what size wire for 100 amps, what size wire for 200 amp service

**Cluster: EV Charger Vertical (parent entity: EV Charger Wire Sizing)**
level 2 EV charger circuit size, 40 amp vs 50 amp EV charger circuit, EV charger continuous load calculation, EV charger breaker size

**Cluster: Solar / Off-Grid Vertical (parent entity: Solar Off-Grid Wire Sizing)**
off-grid solar cable sizing, solar charge controller wire size, battery bank cable sizing, DC voltage drop solar

**Cluster: Per-State NEC Adoption (parent entity: NEC Wire Ampacity Chart)**
NEC edition adopted by [state], electrical permit requirements [state], residential wiring code [state] (via `/states/[slug]`, 50 states)

**Cluster: Competitor Comparisons (parent entity: Voltage Drop Calculator)**
CircuitCalc HQ vs calculator.net, CircuitCalc HQ vs ElectricianCalc, best free NEC calculator 2026, wire size calculator comparison
