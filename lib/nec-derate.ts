// Ampacity correction & adjustment factors — verbatim from the NEC.
import type { TempRating } from "./nec-conductors";

// NEC Table 310.15(C)(1) — adjustment factor for >3 current-carrying conductors.
export function bundleAdjustment(ccc: number): number {
  if (ccc <= 3) return 1.0;
  if (ccc <= 6) return 0.8;
  if (ccc <= 9) return 0.7;
  if (ccc <= 20) return 0.5;
  if (ccc <= 30) return 0.45;
  if (ccc <= 40) return 0.4;
  return 0.35;
}

// NEC Table 310.15(B)(1) — ambient-temperature correction (base 30°C / 86°F).
// Rows: [maxAmbientC, factor60, factor75, factor90]. 0 = not permitted in that column.
const TEMP_CORRECTION: [number, number, number, number][] = [
  [10, 1.29, 1.2, 1.15],
  [15, 1.22, 1.15, 1.12],
  [20, 1.15, 1.11, 1.08],
  [25, 1.08, 1.05, 1.04],
  [30, 1.0, 1.0, 1.0],
  [35, 0.91, 0.94, 0.96],
  [40, 0.82, 0.88, 0.91],
  [45, 0.71, 0.82, 0.87],
  [50, 0.58, 0.75, 0.82],
  [55, 0.41, 0.67, 0.76],
  [60, 0.0, 0.58, 0.71],
  [70, 0.0, 0.33, 0.58],
  [80, 0.0, 0.0, 0.41],
];

export function tempCorrection(ambientC: number, temp: TempRating): number {
  const col = temp === 60 ? 1 : temp === 75 ? 2 : 3;
  for (const row of TEMP_CORRECTION) if (ambientC <= row[0]) return row[col] as number;
  return 0;
}
