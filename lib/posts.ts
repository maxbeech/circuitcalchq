export type Block =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

export interface Post {
  slug: string;
  title: string;
  description: string;
  keyword: string;
  date: string;
  readMins: number;
  body: Block[];
}

export const POSTS: Post[] = [
  {
    slug: "how-to-calculate-voltage-drop",
    title: "How to Calculate Voltage Drop (with the NEC Tables)",
    description: "The voltage drop formula explained, with worked single-phase and three-phase examples using the real NEC Chapter 9 Table 8 conductor resistances.",
    keyword: "how to calculate voltage drop",
    date: "2026-06-14",
    readMins: 6,
    body: [
      { type: "p", text: "Voltage drop is the voltage a conductor loses to its own resistance along a run. The longer the wire and the higher the current, the more you lose. Here's how to calculate it the way the NEC intends." },
      { type: "h2", text: "The formula" },
      { type: "p", text: "For a single-phase or DC circuit, Vd = 2 × I × R × L, where I is the current in amps, R is the conductor resistance in ohms per foot, and L is the one-way length. The factor of 2 accounts for the current flowing out and back. For three-phase, swap the 2 for √3 (1.732)." },
      { type: "h2", text: "Where R comes from" },
      { type: "p", text: "Use NEC Chapter 9, Table 8. It lists the DC resistance of every conductor in ohms per 1,000 feet at 75°C — for example, 12 AWG copper is 1.93 Ω/kFT and 4/0 copper is 0.0608 Ω/kFT. Divide by 1,000 to get ohms per foot." },
      { type: "h2", text: "A worked example" },
      { type: "p", text: "A 120 V circuit carrying 20 A through 12 AWG copper, 100 ft away: Vd = 2 × 20 × (1.93 ÷ 1000) × 100 = 7.72 V, or 6.4% — well over the 3% the NEC recommends. Stepping up to 8 AWG brings it under 3%. Our voltage drop calculator does this instantly and suggests the smallest compliant wire." },
    ],
  },
  {
    slug: "what-size-wire-for-50-amps",
    title: "What Size Wire Do You Need for 50 Amps?",
    description: "The right copper and aluminum wire size for a 50 amp circuit, why terminal temperature ratings matter, and when to upsize for voltage drop.",
    keyword: "what size wire for 50 amps",
    date: "2026-06-14",
    readMins: 5,
    body: [
      { type: "p", text: "A 50 amp circuit — common for ranges, EV chargers and sub-panels — needs 6 AWG copper or 4 AWG aluminum on 60°C-rated terminals, which is the NEC default for circuits 100 A and under. On 75°C-rated terminals you may use 8 AWG copper or 6 AWG aluminum. Here's why the terminal rating decides it." },
      { type: "h2", text: "It comes down to the terminal column" },
      { type: "p", text: "NEC 110.14(C)(1) says circuits of 100 A or less are sized from the 60°C column unless the terminals are listed for 75°C. In the 60°C column, 8 AWG copper is only 40 A — short of 50 — so you step up to 6 AWG copper (55 A). If your breaker and lugs are rated 75°C (most modern ones are), 8 AWG copper (50 A) is permitted." },
      { type: "h2", text: "Aluminum runs one size larger" },
      { type: "p", text: "Aluminum 6 AWG is only 40 A at 60°C, so a 50 A circuit takes 4 AWG aluminum on 60°C terminals (or 6 AWG aluminum on 75°C). That's the usual one-to-two-size penalty for aluminum." },
      { type: "h2", text: "When to upsize" },
      { type: "p", text: "On long runs, voltage drop can force a larger wire than ampacity alone. A 50 A load 150 ft out will often need 4 AWG copper to stay under 3%. Run your exact numbers through the wire size and voltage drop calculators." },
    ],
  },
  {
    slug: "copper-vs-aluminum-wire",
    title: "Copper vs Aluminum Wire: Sizing and Trade-offs",
    description: "How aluminum and copper conductors compare on ampacity, resistance, voltage drop and cost — and how many sizes up aluminum needs to go.",
    keyword: "copper vs aluminum wire",
    date: "2026-06-14",
    readMins: 5,
    body: [
      { type: "p", text: "Aluminum conductors are cheaper and lighter than copper, which is why most utility service and large feeders use them. The trade-off is lower ampacity and higher resistance for the same size." },
      { type: "h2", text: "The size penalty" },
      { type: "ul", items: [
        "100 A: 3 AWG copper vs 1 AWG aluminum.",
        "200 A: 4/0 copper vs 250 kcmil aluminum.",
        "As a rule of thumb, aluminum runs about two sizes larger than copper for the same job.",
      ] },
      { type: "h2", text: "Resistance and voltage drop" },
      { type: "p", text: "Aluminum's resistance is roughly 60% higher than copper (12 AWG: 3.18 vs 1.93 Ω/kFT), so it drops more voltage over the same distance — another reason to upsize it." },
      { type: "h2", text: "Terminations matter" },
      { type: "p", text: "Aluminum requires terminals rated CO/ALR or AL/CU and an anti-oxidant compound on larger conductors. Done correctly it's perfectly safe and code-compliant; done poorly it's a fire risk." },
    ],
  },
  {
    slug: "12-volt-wire-size-guide",
    title: "12 Volt Wire Size Guide (Solar, RV and Marine)",
    description: "Why low-voltage DC systems need much larger wire, how to size 12V/24V/48V conductors for voltage drop, and a worked solar example.",
    keyword: "12 volt wire size",
    date: "2026-06-14",
    readMins: 6,
    body: [
      { type: "p", text: "On a 12-volt system, voltage drop is the whole game. The same drop that's trivial at 240 V is catastrophic at 12 V, because it's a far bigger percentage of your supply. That's why solar, RV and marine wiring is so chunky." },
      { type: "h2", text: "Why low voltage needs big wire" },
      { type: "p", text: "A 3% drop at 120 V is 3.6 V; at 12 V it's only 0.36 V. To deliver real power you push high current, and high current over any resistance loses volts fast. Low-voltage DC systems are usually designed to a tighter 2–3% target." },
      { type: "h2", text: "A solar example" },
      { type: "p", text: "A 12 V circuit carrying 30 A through 10 AWG copper just 20 ft away drops about 1.45 V — over 12%. You'd need 4 AWG or larger to keep it sensible. Always size DC runs by voltage drop, not just ampacity." },
      { type: "h2", text: "Use the DC mode" },
      { type: "p", text: "Set the voltage drop calculator to DC and your system voltage (12, 24 or 48 V). It uses the same Table 8 resistances and shows exactly how much you're losing." },
    ],
  },
  {
    slug: "how-many-wires-in-conduit",
    title: "How Many Wires Can You Put in a Conduit?",
    description: "The NEC conduit fill rules explained — 53/31/40% limits, how to count conductors, and a quick reference for 12 AWG THHN in EMT.",
    keyword: "how many wires in conduit",
    date: "2026-06-14",
    readMins: 5,
    body: [
      { type: "p", text: "The number of wires a conduit can hold is set by the NEC's fill limits in Chapter 9, Table 1 — and it's less than most people expect, because the rule is about pulling tension and heat, not just whether the wires physically fit." },
      { type: "h2", text: "The fill limits" },
      { type: "ul", items: [
        "1 conductor: 53% of the conduit's internal area.",
        "2 conductors: 31%.",
        "3 or more conductors: 40%.",
      ] },
      { type: "h2", text: "A quick reference" },
      { type: "p", text: "For 12 AWG THHN, a 1/2\" EMT holds 9, a 3/4\" holds 16, and a 1\" holds 26. Every conductor counts — including the equipment ground and the neutral." },
      { type: "h2", text: "Mixed sizes" },
      { type: "p", text: "When conductors differ in size, add up each one's area from Table 5 and compare the total to 40% of the conduit area. The conduit fill calculator does this for EMT, PVC and rigid in one step." },
    ],
  },
  {
    slug: "what-size-wire-for-100-amp-sub-panel",
    title: "What Size Wire for a 100 Amp Sub-Panel?",
    description: "The conductor and ground sizes for a 100 amp sub-panel feeder in copper or aluminum, plus the four-wire rule for detached buildings.",
    keyword: "wire size for 100 amp sub panel",
    date: "2026-06-14",
    readMins: 5,
    body: [
      { type: "p", text: "A 100 amp sub-panel feeder is typically 3 AWG copper or 1 AWG aluminum on 75°C terminals, with a separate equipment grounding conductor. Here's the full picture." },
      { type: "h2", text: "Feeder conductors" },
      { type: "p", text: "NEC Table 310.16 puts 3 AWG copper at 100 A and 1 AWG aluminum at 100 A in the 75°C column. Many electricians use 2 AWG copper or 1/0 aluminum for a little headroom." },
      { type: "h2", text: "Don't forget the ground" },
      { type: "p", text: "A sub-panel feeder needs an equipment grounding conductor sized from Table 250.122 — for a 100 A circuit that's 8 AWG copper. The neutral and ground must be kept separate (isolated) in a sub-panel." },
      { type: "h2", text: "Long runs" },
      { type: "p", text: "Detached garages and barns are often far from the house, so check voltage drop. A 100 A feeder 120 ft out frequently needs upsizing. Use the wire size and voltage drop calculators together." },
    ],
  },
  {
    slug: "what-size-wire-for-200-amp-service",
    title: "What Size Wire for a 200 Amp Service?",
    description: "The service-entrance conductor size for a 200 amp residential service in copper and aluminum, and why 4/0 aluminum is the standard.",
    keyword: "wire size for 200 amp service",
    date: "2026-06-14",
    readMins: 5,
    body: [
      { type: "p", text: "A 200 amp residential service uses 2/0 copper or 4/0 aluminum service-entrance conductors. The aluminum option is by far the most common because of cost." },
      { type: "h2", text: "The service conductor rule" },
      { type: "p", text: "Dwelling services get a small break: NEC 310.12 lets you size 200 A service conductors at 4/0 aluminum or 2/0 copper, slightly smaller than the general Table 310.16 values, because of how residential loads diversify." },
      { type: "h2", text: "Grounding electrode and ground" },
      { type: "p", text: "The grounding electrode conductor for a 200 A service is typically 4 AWG copper to ground rods or 250.66-sized to a water pipe. Don't confuse it with the feeder equipment ground." },
      { type: "h2", text: "Sizing your actual load" },
      { type: "p", text: "Before assuming 200 A, run the Article 220 load. Many homes calculate well under 200 A; an EV charger or heat pump can push them over. Use the dwelling load calculator to check." },
    ],
  },
  {
    slug: "wire-ampacity-and-derating-explained",
    title: "Wire Ampacity and Derating, Explained",
    description: "What ampacity means, how ambient temperature and conductor bundling reduce it, and how to apply the NEC correction and adjustment factors.",
    keyword: "wire ampacity derating",
    date: "2026-06-14",
    readMins: 6,
    body: [
      { type: "p", text: "Ampacity is the current a conductor can carry continuously without exceeding its temperature rating. The table value is a starting point — real installations almost always reduce it." },
      { type: "h2", text: "Ambient temperature correction" },
      { type: "p", text: "Table 310.16 assumes a 30°C (86°F) ambient. In a hot attic at 50°C, a 75°C conductor keeps only 75% of its rating (Table 310.15(B)(1)). Rooftop conduit in the sun can be hotter still." },
      { type: "h2", text: "Conductor bundling" },
      { type: "p", text: "When more than three current-carrying conductors share a raceway, they can't shed heat as easily, so ampacity is adjusted: 4–6 conductors to 80%, 7–9 to 70%, 10–20 to 50% (Table 310.15(C)(1))." },
      { type: "h2", text: "Putting it together" },
      { type: "p", text: "Multiply the base ampacity by both factors. A 6 AWG copper conductor (75 A at 90°C) in a hot, crowded raceway can fall below 50 A. The wire size calculator applies both factors automatically." },
    ],
  },
  {
    slug: "voltage-drop-3-percent-rule",
    title: "The 3% Voltage Drop Rule: What It Really Means",
    description: "Where the 3% and 5% voltage drop figures come from in the NEC, whether they're mandatory, and how to design to them.",
    keyword: "voltage drop 3 percent rule",
    date: "2026-06-14",
    readMins: 4,
    body: [
      { type: "p", text: "You'll hear that voltage drop must stay under 3%. The truth is more nuanced — and worth understanding before you upsize every run." },
      { type: "h2", text: "Where the numbers come from" },
      { type: "p", text: "The NEC suggests a maximum 3% drop on a branch circuit and 5% total for feeder plus branch, in Informational Notes to 210.19(A) and 215.2(A). Informational Notes are guidance, not enforceable rules — but they're widely treated as the design standard." },
      { type: "h2", text: "Why it matters" },
      { type: "ul", items: [
        "Motors lose torque and run hotter on low voltage.",
        "LED drivers and electronics can misbehave or fail early.",
        "Resistance heating and lighting simply underperform.",
      ] },
      { type: "h2", text: "Designing to it" },
      { type: "p", text: "Pick a target, enter your run, and let the calculator find the smallest conductor that meets it. On long runs that wire is often a size or two above what ampacity alone would require." },
    ],
  },
  {
    slug: "what-size-wire-for-30-amps",
    title: "What Size Wire for 30 Amps?",
    description: "The correct wire for a 30 amp circuit (dryers, water heaters, RV outlets) in copper and aluminum, and the 10 AWG rule.",
    keyword: "what size wire for 30 amps",
    date: "2026-06-14",
    readMins: 4,
    body: [
      { type: "p", text: "A 30 amp circuit — dryers, electric water heaters, RV outlets — calls for 10 AWG copper or 8 AWG aluminum. It's one of the most common circuits in a home." },
      { type: "h2", text: "The 10 AWG rule" },
      { type: "p", text: "10 AWG copper is rated 35 A at 75°C, but the 240.4(D) small-conductor rule caps it at a 30 A breaker — which is exactly what a 30 A circuit needs. Aluminum 10 AWG is only 30 A, so 8 AWG aluminum is the safer pick." },
      { type: "h2", text: "Don't undersize on a long run" },
      { type: "p", text: "A 30 A load 100 ft out on 10 AWG copper drops about 3%, right at the limit. Beyond that, step up to 8 AWG. The voltage drop calculator shows the exact figure for your distance." },
      { type: "h2", text: "Match the breaker" },
      { type: "p", text: "A 30 A circuit takes a 30 A breaker — never put 10 AWG on a 40 A breaker. The wire size calculator returns the correct standard breaker and ground for any load." },
    ],
  },
  {
    slug: "how-to-convert-watts-to-amps",
    title: "How to Convert Watts to Amps",
    description: "The watts-to-amps formula for single-phase, three-phase and DC, why voltage and power factor matter, and worked examples.",
    keyword: "watts to amps",
    date: "2026-06-19",
    readMins: 5,
    body: [
      { type: "p", text: "Watts measure how much power a device actually uses; amps measure the current flowing to it. You can't convert one to the other without knowing the voltage — and for AC, the power factor." },
      { type: "h2", text: "The formula" },
      { type: "ul", items: [
        "Single-phase: amps = watts ÷ (volts × power factor)",
        "Three-phase: amps = watts ÷ (√3 × volts × power factor)",
        "DC: amps = watts ÷ volts",
      ] },
      { type: "h2", text: "A worked example" },
      { type: "p", text: "A 1,500 W heater on a 120 V circuit draws 1500 ÷ 120 = 12.5 A (heaters are resistive, so power factor is 1.0). That's why a 1,500 W heater is right at the edge of a 15 A circuit." },
      { type: "h2", text: "Why power factor matters" },
      { type: "p", text: "Motors and many electronic loads have a power factor below 1.0, meaning they draw more current than their wattage alone suggests. A 1,000 W motor at 0.8 power factor on 120 V draws 1000 ÷ (120 × 0.8) = 10.4 A, not 8.3 A. The watts-to-amps calculator handles all three system types and power factor for you." },
    ],
  },
  {
    slug: "ohms-law-explained",
    title: "Ohm's Law Explained (with Examples)",
    description: "What Ohm's law is, the V = I × R relationship, how power fits in, and how to solve any value from the other two.",
    keyword: "ohms law",
    date: "2026-06-19",
    readMins: 4,
    body: [
      { type: "p", text: "Ohm's law is the single most useful relationship in electrical work. It says voltage equals current times resistance: V = I × R. Rearrange it and you can find any one of the three from the other two." },
      { type: "h2", text: "The three forms" },
      { type: "ul", items: [
        "V = I × R  (find voltage)",
        "I = V ÷ R  (find current)",
        "R = V ÷ I  (find resistance)",
      ] },
      { type: "h2", text: "Adding power" },
      { type: "p", text: "Power (watts) ties in through P = V × I. Combined with Ohm's law that gives P = I²R and P = V²/R, so from any two of voltage, current, resistance and power you can find the other two." },
      { type: "h2", text: "Example" },
      { type: "p", text: "A device on 120 V drawing 0.5 A has a resistance of 120 ÷ 0.5 = 240 Ω and consumes 120 × 0.5 = 60 W. Enter any two values into the Ohm's law calculator and it solves the rest instantly." },
    ],
  },
  {
    slug: "how-to-convert-kw-to-amps",
    title: "How to Convert kW to Amps",
    description: "Convert kilowatts to amps for single-phase, three-phase and DC systems, with the formulas and a generator-sizing example.",
    keyword: "kw to amps",
    date: "2026-06-19",
    readMins: 4,
    body: [
      { type: "p", text: "Kilowatts (kW) are just 1,000 watts. To turn a kW rating into the current it draws, you need the voltage and — for AC — the power factor." },
      { type: "h2", text: "The formula" },
      { type: "ul", items: [
        "Single-phase: amps = (kW × 1000) ÷ (volts × pf)",
        "Three-phase: amps = (kW × 1000) ÷ (√3 × volts × pf)",
        "DC: amps = (kW × 1000) ÷ volts",
      ] },
      { type: "h2", text: "Generator example" },
      { type: "p", text: "A 22 kW standby generator at 240 V single-phase delivers about 22000 ÷ 240 = 91.7 A — which is why it typically lands on a 100 A transfer switch. For a three-phase 22 kW load at 208 V and 0.8 pf, the current is 22000 ÷ (√3 × 208 × 0.8) ≈ 76 A." },
      { type: "h2", text: "Do it instantly" },
      { type: "p", text: "Set the power calculator to kW (via watts), choose your phase and voltage, and read off the amps — then size the conductor with the wire size calculator." },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
