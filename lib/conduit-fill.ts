// Conduit-fill engine — NEC Chapter 9 (Table 1 fill %, Table 4 conduit areas,
// Table 5 conductor areas via the THHN/THWN-2 column on each Conductor).
import { getConductor } from "./nec-conductors";
import { CONDUIT_AREA, TRADE_SIZES, fillPercent, type ConduitType } from "./nec-conduit";

export interface WireGroup {
  size: string; // AWG/kcmil
  count: number;
}

export interface FillResult {
  totalWires: number;
  conductorArea: number; // sq in
  conduitArea: number; // sq in (total internal)
  allowedArea: number; // sq in (conduitArea × permitted %)
  permittedPercent: number; // 53 / 31 / 40
  fillPercent: number; // actual % of total area used
  ok: boolean;
}

export function conductorArea(wires: WireGroup[]): { area: number; count: number } {
  let area = 0;
  let count = 0;
  for (const w of wires) {
    const c = getConductor(w.size);
    if (!c) continue;
    area += c.thhn * w.count;
    count += w.count;
  }
  return { area, count };
}

export function calcFill(type: ConduitType, tradeIndex: number, wires: WireGroup[]): FillResult {
  const { area, count } = conductorArea(wires);
  const conduit = CONDUIT_AREA[type][tradeIndex] ?? 0;
  const pct = fillPercent(count);
  const allowed = conduit * pct;
  return {
    totalWires: count,
    conductorArea: round(area, 4),
    conduitArea: conduit,
    allowedArea: round(allowed, 4),
    permittedPercent: Math.round(pct * 100),
    fillPercent: conduit > 0 ? round((area / conduit) * 100, 1) : 0,
    ok: area <= allowed && count > 0,
  };
}

// Smallest trade size of the given conduit type that legally holds the wires.
export function minConduit(type: ConduitType, wires: WireGroup[]): { tradeIndex: number; label: string } | null {
  for (let i = 0; i < TRADE_SIZES.length; i++) {
    if (calcFill(type, i, wires).ok) return { tradeIndex: i, label: TRADE_SIZES[i] };
  }
  return null;
}

function round(n: number, dp: number): number {
  const f = Math.pow(10, dp);
  return Math.round(n * f) / f;
}
