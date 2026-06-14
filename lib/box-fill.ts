// Box-fill engine — NEC 314.16(B) volume allowances.
// Each conductor counts as one volume of its own size; clamps, support fittings,
// device yokes (×2) and the grounding-conductor group are counted at the volume
// of the LARGEST conductor in the box.
import type { WireGroup } from "./conduit-fill";

// NEC Table 314.16(B) — free space per conductor, cubic inches.
const VOLUME: Record<string, number> = {
  "18": 1.5, "16": 1.75, "14": 2.0, "12": 2.25, "10": 2.5, "8": 3.0, "6": 5.0,
};

// NEC Table 314.16(A) — common box volumes, cubic inches.
export const COMMON_BOXES: { label: string; volume: number }[] = [
  { label: '3×2×2" device box', volume: 10.0 },
  { label: '3×2×2-1/2" device box', volume: 12.5 },
  { label: '3×2×2-3/4" device box', volume: 14.0 },
  { label: '3×2×3-1/2" device box', volume: 18.0 },
  { label: '4" square × 1-1/4" deep', volume: 18.0 },
  { label: '4" square × 1-1/2" deep', volume: 21.0 },
  { label: '4" square × 2-1/8" deep', volume: 30.3 },
  { label: '4-11/16" square × 1-1/2" deep', volume: 29.5 },
  { label: '4-11/16" square × 2-1/8" deep', volume: 42.0 },
  { label: '4" octagon × 1-1/2" deep', volume: 15.5 },
];

export function unitVolume(size: string): number {
  return VOLUME[size] ?? 0;
}

export interface BoxInput {
  conductors: WireGroup[]; // insulated current-carrying + neutral conductors
  devices: number; // switch/receptacle yokes
  clamps: boolean; // internal cable clamps present
  supports: number; // luminaire studs / hickeys
  grounds: boolean; // equipment grounding conductors present
  groundSize?: string; // largest EGC gauge (default 14)
  boxVolume: number; // cubic inches available
}

export interface BoxResult {
  largest: string;
  conductorFill: number;
  clampFill: number;
  supportFill: number;
  deviceFill: number;
  groundFill: number;
  required: number;
  ok: boolean;
}

export function calcBoxFill(input: BoxInput): BoxResult {
  const sizes = input.conductors.filter((w) => w.count > 0).map((w) => w.size);
  const largest = sizes.reduce((a, b) => (unitVolume(b) > unitVolume(a) ? b : a), sizes[0] ?? "14");
  const big = unitVolume(largest);

  const conductorFill = input.conductors.reduce((s, w) => s + unitVolume(w.size) * w.count, 0);
  const clampFill = input.clamps ? big : 0;
  const supportFill = input.supports * big;
  const deviceFill = input.devices * 2 * big;
  const groundFill = input.grounds ? unitVolume(input.groundSize ?? "14") : 0;
  const required = conductorFill + clampFill + supportFill + deviceFill + groundFill;

  return {
    largest,
    conductorFill: round(conductorFill),
    clampFill: round(clampFill),
    supportFill: round(supportFill),
    deviceFill: round(deviceFill),
    groundFill: round(groundFill),
    required: round(required),
    ok: required <= input.boxVolume,
  };
}

function round(n: number): number {
  return Math.round(n * 100) / 100;
}
