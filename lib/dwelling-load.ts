// Dwelling service/feeder load — NEC Article 220, Part III "standard method".
//  • General lighting & receptacles: 3 VA/ft² (220.12/220.41)
//  • 2+ small-appliance circuits @1500 VA, 1 laundry @1500 VA (220.52)
//  • General-load demand: first 3000 VA @100%, remainder @35% (Table 220.42)
//  • Fastened appliances: 75% if 4 or more (220.53)
//  • Dryer: 5000 VA or nameplate, larger (220.54)
//  • Range: Table 220.55 column C (8 kW for one range ≤12 kW, +5%/kW over 12)
//  • Heating vs A/C: the larger of the two (220.60)

export interface LoadInput {
  sqft: number;
  smallApplianceCircuits: number; // default 2 (minimum)
  laundryCircuits: number; // default 1
  fastenedApplianceVa: number; // dishwasher, disposal, water heater, etc. (total)
  fastenedApplianceCount: number;
  dryerVa: number; // nameplate, 0 if none
  rangeKw: number; // nameplate kW, 0 if none
  heatVa: number;
  acVa: number;
  voltage: number; // 240 typical
}

export interface LoadResult {
  generalConnected: number;
  generalDemand: number;
  fastenedDemand: number;
  dryerDemand: number;
  rangeDemand: number;
  hvacDemand: number;
  totalVa: number;
  amps: number;
  service: number; // recommended standard service size, A
}

const SERVICE_SIZES = [100, 125, 150, 200, 225, 300, 400, 600];

export function rangeDemandVa(kw: number): number {
  if (kw <= 0) return 0;
  if (kw <= 12) return 8000;
  const over = Math.ceil(kw - 12);
  return Math.round(8000 * (1 + 0.05 * over));
}

export function calcDwellingLoad(input: LoadInput): LoadResult {
  const general =
    input.sqft * 3 +
    Math.max(2, input.smallApplianceCircuits) * 1500 +
    Math.max(1, input.laundryCircuits) * 1500;
  const generalDemand = Math.min(general, 3000) + Math.max(0, general - 3000) * 0.35;

  const fastenedDemand =
    input.fastenedApplianceCount >= 4 ? input.fastenedApplianceVa * 0.75 : input.fastenedApplianceVa;

  const dryerDemand = input.dryerVa > 0 ? Math.max(5000, input.dryerVa) : 0;
  const rangeDemand = rangeDemandVa(input.rangeKw);
  const hvacDemand = Math.max(input.heatVa, input.acVa);

  const totalVa = generalDemand + fastenedDemand + dryerDemand + rangeDemand + hvacDemand;
  const v = input.voltage > 0 ? input.voltage : 240;
  const amps = totalVa / v;
  const service = SERVICE_SIZES.find((s) => s >= amps) ?? SERVICE_SIZES[SERVICE_SIZES.length - 1];

  return {
    generalConnected: Math.round(general),
    generalDemand: Math.round(generalDemand),
    fastenedDemand: Math.round(fastenedDemand),
    dryerDemand: Math.round(dryerDemand),
    rangeDemand: Math.round(rangeDemand),
    hvacDemand: Math.round(hvacDemand),
    totalVa: Math.round(totalVa),
    amps: Math.round(amps * 10) / 10,
    service,
  };
}
