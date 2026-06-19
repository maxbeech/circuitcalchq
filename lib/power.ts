// Power & Ohm's-law engine — pure electrical algebra (no NEC tables).
// Single source for the Ohm's Law and Power (watts/amps/volts/kVA) calculators.

export type PhaseMode = "1" | "3" | "dc";

export function phaseFactor(mode: PhaseMode): number {
  return mode === "3" ? Math.sqrt(3) : 1;
}

const r = (n: number, dp = 2) => {
  if (!Number.isFinite(n)) return 0;
  const f = Math.pow(10, dp);
  return Math.round(n * f) / f;
};

// ---- Ohm's law: V = I·R, P = V·I (DC / resistive). Provide exactly two of V,I,R,P. ----
export type OhmField = "v" | "i" | "r" | "p";
export interface OhmInput { v?: number; i?: number; r?: number; p?: number; }
export interface OhmResult { v: number; i: number; r: number; p: number; valid: boolean; }

export function solveOhms(input: OhmInput): OhmResult {
  const has = (x?: number): x is number => typeof x === "number" && Number.isFinite(x) && x > 0;
  let { v, i, r: res, p } = input;
  const known = [has(v), has(i), has(res), has(p)].filter(Boolean).length;
  if (known !== 2) return { v: v ?? 0, i: i ?? 0, r: res ?? 0, p: p ?? 0, valid: false };

  if (has(v) && has(i)) { res = v / i; p = v * i; }
  else if (has(v) && has(res)) { i = v / res; p = (v * v) / res; }
  else if (has(v) && has(p)) { i = p / v; res = (v * v) / p; }
  else if (has(i) && has(res)) { v = i * res; p = i * i * res; }
  else if (has(i) && has(p)) { v = p / i; res = p / (i * i); }
  else if (has(res) && has(p)) { i = Math.sqrt(p / res); v = Math.sqrt(p * res); }

  return { v: r(v!, 3), i: r(i!, 3), r: r(res!, 4), p: r(p!, 3), valid: true };
}

// ---- Power: relate watts, amps, volts, kVA with phase + power factor. ----
export type PowerSource = "watts" | "amps" | "kva";
export interface PowerInput {
  mode: PhaseMode;
  volts: number;
  pf: number; // 0..1 (ignored for DC)
  source: PowerSource;
  value: number; // the value of `source`
}
export interface PowerResult {
  watts: number; amps: number; volts: number; kva: number; kw: number; pf: number; valid: boolean;
}

export function solvePower(input: PowerInput): PowerResult {
  const { mode, volts, source, value } = input;
  const pf = mode === "dc" ? 1 : Math.min(1, Math.max(0.01, input.pf));
  const f = phaseFactor(mode);
  const base = { watts: 0, amps: 0, volts, kva: 0, kw: 0, pf, valid: false };
  if (!(volts > 0) || !(value > 0)) return base;

  let amps = 0, kva = 0, watts = 0;
  if (source === "amps") { amps = value; kva = (volts * amps * f) / 1000; watts = kva * 1000 * pf; }
  else if (source === "watts") { watts = value; amps = watts / (volts * pf * f); kva = (volts * amps * f) / 1000; }
  else { kva = value; amps = (kva * 1000) / (volts * f); watts = kva * 1000 * pf; }

  return { watts: r(watts), amps: r(amps, 2), volts, kva: r(kva, 3), kw: r(watts / 1000, 3), pf, valid: true };
}
