// Conduit dimensions & fill limits — verbatim from NEC Chapter 9.
//  • Total internal area (sq in): Table 4 (per conduit type & trade size)
//  • Permitted fill %: Table 1 (1 wire 53%, 2 wires 31%, over 2 wires 40%)

export type ConduitType = "emt" | "pvc40" | "pvc80" | "rmc";

export const CONDUIT_LABELS: Record<ConduitType, string> = {
  emt: "EMT (electrical metallic tubing)",
  pvc40: "PVC Schedule 40",
  pvc80: "PVC Schedule 80",
  rmc: "Rigid Metal Conduit (RMC)",
};

export const TRADE_SIZES = ['1/2"', '3/4"', '1"', '1-1/4"', '1-1/2"', '2"', '2-1/2"', '3"', '3-1/2"', '4"'];

// Total internal cross-sectional area, sq in — NEC Chapter 9, Table 4.
export const CONDUIT_AREA: Record<ConduitType, number[]> = {
  emt: [0.304, 0.533, 0.864, 1.496, 2.036, 3.356, 5.858, 8.846, 11.545, 14.753],
  pvc40: [0.285, 0.508, 0.832, 1.453, 1.986, 3.291, 4.695, 7.268, 9.737, 12.554],
  pvc80: [0.217, 0.409, 0.688, 1.237, 1.711, 2.874, 4.119, 6.442, 8.688, 11.258],
  rmc: [0.314, 0.549, 0.887, 1.526, 2.071, 3.408, 4.866, 7.499, 10.01, 12.882],
};

// NEC Chapter 9, Table 1 — maximum permitted fill by conductor count.
export function fillPercent(wireCount: number): number {
  if (wireCount <= 0) return 0.4;
  if (wireCount === 1) return 0.53;
  if (wireCount === 2) return 0.31;
  return 0.4;
}
