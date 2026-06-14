// Voltage-drop engine — uses NEC Chapter 9, Table 8 DC resistance (Ω/1000 ft @75°C).
// Single-phase / DC:  Vd = 2 × I × (R/1000) × L
// Three-phase:        Vd = √3 × I × (R/1000) × L
// (L = one-way run length in feet.) NEC 210.19(A)/215.2(A) Informational Notes
// recommend the combined feeder+branch drop stay ≤5%, with ≤3% on either part.
import { CONDUCTORS, resistance, type Material } from "./nec-conductors";

export type Phase = "1" | "3" | "dc";

export interface VdInput {
  material: Material;
  phase: Phase;
  voltage: number;
  amps: number;
  lengthFt: number; // one-way
  size: string;
  maxPercent?: number; // target, default 3%
}

export interface VdResult {
  vd: number; // volts dropped
  vdPercent: number;
  vEnd: number; // voltage at the load
  ok: boolean;
  resistance: number; // Ω/1000 ft used
  multiplier: number;
  recommended?: string; // smallest size that meets the target, if current is over
}

export function phaseMultiplier(phase: Phase): number {
  return phase === "3" ? Math.sqrt(3) : 2;
}

export function voltageDropVolts(
  material: Material,
  phase: Phase,
  amps: number,
  lengthFt: number,
  size: string,
): number {
  const r = resistance(size, material); // Ω per 1000 ft
  return (phaseMultiplier(phase) * amps * (r / 1000) * lengthFt);
}

export function calcVoltageDrop(input: VdInput): VdResult {
  const { material, phase, voltage, amps, lengthFt, size } = input;
  const maxPercent = input.maxPercent ?? 3;
  const r = resistance(size, material);
  const vd = voltageDropVolts(material, phase, amps, lengthFt, size);
  const vdPercent = voltage > 0 ? (vd / voltage) * 100 : 0;
  const ok = vdPercent <= maxPercent;
  let recommended: string | undefined;
  if (!ok) {
    for (const c of CONDUCTORS) {
      const p = voltage > 0 ? (voltageDropVolts(material, phase, amps, lengthFt, c.size) / voltage) * 100 : 0;
      if (p <= maxPercent) {
        recommended = c.size;
        break;
      }
    }
  }
  return {
    vd: round(vd, 2),
    vdPercent: round(vdPercent, 2),
    vEnd: round(voltage - vd, 2),
    ok,
    resistance: r,
    multiplier: round(phaseMultiplier(phase), 4),
    recommended,
  };
}

function round(n: number, dp: number): number {
  const f = Math.pow(10, dp);
  return Math.round(n * f) / f;
}
