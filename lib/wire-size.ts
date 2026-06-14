// Wire-size / ampacity engine.
// Allowable ampacity = NEC Table 310.16 base value × ambient-temperature correction
// (Table 310.15(B)(1)) × bundle adjustment (Table 310.15(C)(1)). A conductor is
// sized so its corrected/adjusted ampacity covers the load (continuous load ×125%,
// NEC 210.19(A)/215.2(A)), then capped by the 240.4(D) small-conductor rule.
import {
  CONDUCTORS, baseAmpacity, egcSize, OCPD_240_4D, STANDARD_OCPD,
  type Material, type TempRating,
} from "./nec-conductors";
import { bundleAdjustment, tempCorrection } from "./nec-derate";

export function ampacity(
  size: string,
  material: Material,
  temp: TempRating,
  ambientC = 30,
  ccc = 3,
): number {
  const base = baseAmpacity(size, material, temp);
  if (!base) return 0;
  return base * tempCorrection(ambientC, temp) * bundleAdjustment(ccc);
}

export interface WireInput {
  loadAmps: number;
  material: Material;
  tempRating: TempRating; // conductor insulation column used (60/75/90)
  ambientC?: number;
  ccc?: number; // current-carrying conductors in the raceway
  continuous?: boolean; // load runs ≥3 hours
}

export interface WireResult {
  size?: string; // smallest conductor that works
  requiredAmps: number; // load after the 125% continuous factor
  ampacity?: number; // corrected/adjusted ampacity of the chosen size
  baseAmpacity?: number;
  ocpd?: number; // recommended standard breaker/fuse (A)
  egc?: string; // equipment grounding conductor (Table 250.122)
  derateFactor: number;
  note?: string;
}

export function sizeWire(input: WireInput): WireResult {
  const { loadAmps, material, tempRating } = input;
  const ambientC = input.ambientC ?? 30;
  const ccc = input.ccc ?? 3;
  const requiredAmps = input.continuous ? loadAmps * 1.25 : loadAmps;
  const derateFactor = tempCorrection(ambientC, tempRating) * bundleAdjustment(ccc);

  for (const c of CONDUCTORS) {
    const amps = ampacity(c.size, material, tempRating, ambientC, ccc);
    if (amps <= 0) continue; // e.g. 14 AWG aluminum
    if (amps >= requiredAmps) {
      // 240.4(D) ceiling for small conductors
      const cap = OCPD_240_4D[c.size]?.[material];
      const ocpd = pickOcpd(requiredAmps, cap && cap > 0 ? cap : Infinity);
      return {
        size: c.size,
        requiredAmps: round(requiredAmps, 1),
        ampacity: round(amps, 1),
        baseAmpacity: baseAmpacity(c.size, material, tempRating),
        ocpd,
        egc: egcSize(ocpd, material),
        derateFactor: round(derateFactor, 3),
        note: cap && cap > 0 && requiredAmps > cap
          ? `${c.size} AWG ${material} is limited to a ${cap} A breaker by NEC 240.4(D).`
          : undefined,
      };
    }
  }
  return {
    requiredAmps: round(requiredAmps, 1),
    derateFactor: round(derateFactor, 3),
    note: "Load exceeds the range of this table (>750 kcmil). Parallel conductors are required.",
  };
}

// Smallest standard OCPD that covers the load, not exceeding any 240.4(D) cap.
function pickOcpd(amps: number, cap: number): number {
  for (const r of STANDARD_OCPD) if (r >= amps && r <= cap) return r;
  // load above the cap: clamp to the cap's nearest standard size
  let last = STANDARD_OCPD[0];
  for (const r of STANDARD_OCPD) if (r <= cap) last = r;
  return last;
}

function round(n: number, dp: number): number {
  const f = Math.pow(10, dp);
  return Math.round(n * f) / f;
}
