// Calculator registry — single source of truth for routes, SEO copy and which
// client component each page renders.
export type CalcComponent =
  | "voltage-drop"
  | "wire-size"
  | "conduit-fill"
  | "box-fill"
  | "dwelling-load"
  | "ampacity-chart";

export interface Calc {
  slug: string;
  component: CalcComponent;
  title: string; // H1
  metaTitle: string;
  keyword: string;
  description: string;
  intro: string[];
  faqs: { q: string; a: string }[];
  code: string; // NEC reference shown as the authority badge
  related: string[];
}

export const CALCS: Calc[] = [
  {
    slug: "voltage-drop-calculator",
    component: "voltage-drop",
    title: "Voltage Drop Calculator",
    metaTitle: "Voltage Drop Calculator (NEC) — Copper & Aluminum, 1Ø/3Ø/DC",
    keyword: "voltage drop calculator",
    description:
      "Free voltage drop calculator using the real NEC Chapter 9, Table 8 conductor resistances. Single-phase, three-phase or DC, copper or aluminum — see the exact volts and % dropped and the smallest wire that stays under 3%.",
    intro: [
      "Voltage drop is the voltage you lose to a conductor's own resistance over the length of a run. Too much and motors run hot, lights dim and electronics misbehave. The NEC recommends keeping branch-circuit drop under 3% and the combined feeder-plus-branch drop under 5% (Informational Notes to 210.19(A) and 215.2(A)).",
      "This calculator uses the published DC resistance values from NEC Chapter 9, Table 8 — not an approximation. Enter your conductor, current, one-way distance and system voltage and it returns the volts dropped, the percentage, the voltage at the load, and the smallest conductor that keeps you under your target.",
    ],
    faqs: [
      { q: "What is an acceptable voltage drop?", a: "The NEC recommends a maximum of 3% on a branch circuit and 5% total across feeder and branch. These are recommendations in Informational Notes, not hard requirements, but most inspectors and engineers design to them." },
      { q: "Does aluminum wire have more voltage drop?", a: "Yes. Aluminum has higher resistance than copper for the same size, so for a given run it drops more voltage — which is why aluminum is usually sized one or two gauges larger than copper." },
      { q: "Single-phase vs three-phase?", a: "Single-phase and DC use a factor of 2 (current flows out and back). Three-phase uses √3 (1.732) because of how the phases share return current, so three-phase drops less for the same load." },
    ],
    code: "NEC Ch. 9, Table 8",
    related: ["wire-size-calculator", "wire-ampacity-chart", "conduit-fill-calculator"],
  },
  {
    slug: "wire-size-calculator",
    component: "wire-size",
    title: "Wire Size & Ampacity Calculator",
    metaTitle: "Wire Size Calculator (NEC 310.16) — Copper & Aluminum Ampacity",
    keyword: "wire size calculator",
    description:
      "Pick the right wire gauge for your load. Uses NEC Table 310.16 ampacities with ambient-temperature correction and bundle adjustment, the 240.4(D) small-conductor rule, and the matching breaker and ground wire.",
    intro: [
      "The right wire size depends on more than the amps. NEC Table 310.16 gives a base ampacity for each conductor at 60, 75 or 90°C, and that value is corrected for ambient temperature (Table 310.15(B)(1)) and adjusted when more than three current-carrying conductors share a raceway (Table 310.15(C)(1)).",
      "Enter your load and conditions and this tool returns the smallest copper or aluminum conductor whose corrected ampacity covers the load, the recommended standard breaker, and the equipment grounding conductor from Table 250.122 — all from the published tables.",
    ],
    faqs: [
      { q: "What size wire for 50 amps?", a: "On 75°C terminals, a 50 A load needs 6 AWG copper (65 A) or 4 AWG aluminum. Always confirm the temperature rating of your terminals — many breakers are rated 75°C." },
      { q: "What is the 240.4(D) rule?", a: "It caps the overcurrent protection for small conductors regardless of their table ampacity: 14 AWG copper at 15 A, 12 AWG at 20 A, 10 AWG at 30 A. This calculator applies those ceilings automatically." },
      { q: "Why does temperature reduce ampacity?", a: "Conductors are rated to carry current at a 30°C ambient. In a hot attic or roof the surrounding heat leaves less room for the conductor's own heating, so the allowable current is reduced by a correction factor." },
    ],
    code: "NEC Table 310.16",
    related: ["voltage-drop-calculator", "wire-ampacity-chart", "conduit-fill-calculator"],
  },
  {
    slug: "conduit-fill-calculator",
    component: "conduit-fill",
    title: "Conduit Fill Calculator",
    metaTitle: "Conduit Fill Calculator (NEC Chapter 9) — EMT, PVC, RMC",
    keyword: "conduit fill calculator",
    description:
      "How many wires fit in a conduit? Uses NEC Chapter 9 Table 1 fill limits, Table 4 conduit areas and Table 5 conductor areas for EMT, PVC and rigid — with the smallest legal conduit size.",
    intro: [
      "The NEC limits how full a conduit can be so wires can be pulled without damage and heat can escape: 53% for a single conductor, 31% for two, and 40% for three or more (Chapter 9, Table 1).",
      "This calculator adds up your THHN/THWN-2 conductor areas (Table 5) and compares them against the conduit's internal area (Table 4) for EMT, PVC Schedule 40/80 and rigid metal conduit. It tells you the fill percentage, whether it passes, and the smallest trade size that works.",
    ],
    faqs: [
      { q: "How many 12 AWG THHN fit in 1/2\" EMT?", a: "Nine. A 1/2\" EMT has 0.304 in² of internal area; at the 40% limit that's 0.122 in², and each 12 AWG THHN is 0.0133 in², so nine conductors fit." },
      { q: "Why is the limit 40%?", a: "With three or more conductors the NEC limits fill to 40% of the conduit's area so the wires can be pulled without jamming and so heat dissipates. Single conductors are allowed 53% and two conductors 31%." },
      { q: "Does the equipment ground count?", a: "Yes — every conductor in the conduit, including the equipment grounding conductor, counts toward the fill. Add it as one of your wires." },
    ],
    code: "NEC Ch. 9, Tables 1/4/5",
    related: ["wire-size-calculator", "voltage-drop-calculator", "box-fill-calculator"],
  },
  {
    slug: "electrical-load-calculator",
    component: "dwelling-load",
    title: "Dwelling Electrical Load Calculator",
    metaTitle: "Electrical Load Calculator (NEC Article 220) — Dwelling Service Size",
    keyword: "electrical load calculator",
    description:
      "Size a home's electrical service with the NEC Article 220 standard method — general lighting, small-appliance and laundry circuits with demand factors, range, dryer, HVAC — to a recommended 100/150/200 A service.",
    intro: [
      "Sizing a dwelling service means more than adding up nameplates. NEC Article 220's standard method applies demand factors: the general lighting and receptacle load (3 VA/ft²) plus the small-appliance and laundry circuits get the first 3,000 VA at 100% and the rest at 35%; the range uses Table 220.55; and you count the larger of heating or air conditioning.",
      "Enter your home's details and this calculator works through the standard method step by step and recommends a standard service size (100, 150 or 200 A).",
    ],
    faqs: [
      { q: "Do I need a 100, 150 or 200 amp service?", a: "It depends on the calculated load. Most modern all-electric homes land on 200 A; smaller gas-heated homes often calculate under 150 A. This tool shows the calculated amps and the next standard service size." },
      { q: "How is an electric range counted?", a: "Under Table 220.55, one range up to 12 kW is counted as 8,000 VA (Column C), not its full nameplate. Above 12 kW you add 5% for each kW over 12." },
      { q: "Standard vs optional method?", a: "This uses the standard method (Article 220 Part III). The optional method (220.82) often yields a smaller service for an all-electric home; we plan to add it to the Pro report." },
    ],
    code: "NEC Article 220",
    related: ["wire-size-calculator", "voltage-drop-calculator", "box-fill-calculator"],
  },
  {
    slug: "box-fill-calculator",
    component: "box-fill",
    title: "Box Fill Calculator",
    metaTitle: "Box Fill Calculator (NEC 314.16) — Junction & Device Boxes",
    keyword: "box fill calculator",
    description:
      "Is your junction or device box overfilled? Counts conductors, clamps, support fittings, device yokes and grounds per NEC 314.16(B) and compares against the box's cubic-inch volume.",
    intro: [
      "Cramming too many wires into a box is a code violation and a fire risk. NEC 314.16(B) assigns a cubic-inch volume to each item: every conductor counts as one volume of its size, internal clamps count once, each device yoke counts twice, and all grounding conductors together count once — all at the volume of the largest conductor.",
      "Enter what's in the box and pick the box size; this calculator returns the required volume and whether the box is legal.",
    ],
    faqs: [
      { q: "How do I count cable clamps?", a: "All internal cable clamps together count as a single volume allowance, based on the largest conductor in the box — not one per clamp." },
      { q: "Why does a receptacle count as two?", a: "Each strap or yoke (a switch or receptacle) is counted as two conductors of the largest size connected to it, per 314.16(B)(4), to allow room for the device body." },
      { q: "Do grounds count?", a: "Yes, but all equipment grounding conductors together count as just one volume of the largest ground present (314.16(B)(5))." },
    ],
    code: "NEC 314.16(B)",
    related: ["conduit-fill-calculator", "wire-size-calculator", "voltage-drop-calculator"],
  },
  {
    slug: "wire-ampacity-chart",
    component: "ampacity-chart",
    title: "Wire Ampacity Chart (NEC 310.16)",
    metaTitle: "Wire Ampacity Chart — NEC Table 310.16 Copper & Aluminum",
    keyword: "wire ampacity chart",
    description:
      "The full NEC Table 310.16 ampacity chart for copper and aluminum at 60, 75 and 90°C, from 14 AWG to 750 kcmil, plus each conductor's resistance and circular-mil area.",
    intro: [
      "This is NEC Table 310.16 — the allowable ampacities of insulated conductors rated up to 2000 V, with not more than three current-carrying conductors in a raceway at a 30°C ambient. It's the starting point for every wire-sizing decision.",
      "Use the 60°C column for most 14–10 AWG branch circuits, 75°C for typical breaker terminals, and 90°C only for derating math (the final result still has to respect the terminal rating). Each row also shows the conductor's resistance and area from Chapter 9, Table 8.",
    ],
    faqs: [
      { q: "Which temperature column do I use?", a: "Use the column matching the lowest-rated terminal in the circuit — usually 75°C for breakers and lugs. The 90°C column is generally only used as the starting point for derating calculations." },
      { q: "Why is copper 14 AWG limited to 15 A?", a: "Although Table 310.16 lists 14 AWG copper at 20 A (60°C), the 240.4(D) small-conductor rule caps its overcurrent protection at 15 A." },
    ],
    code: "NEC Table 310.16",
    related: ["wire-size-calculator", "voltage-drop-calculator", "conduit-fill-calculator"],
  },
];

export function getCalc(slug: string): Calc | undefined {
  return CALCS.find((c) => c.slug === slug);
}
