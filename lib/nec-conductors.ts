// NEC conductor data — single source of truth.
// Values transcribed verbatim from the published National Electrical Code:
//  • Area (circular mils) + DC resistance @75°C: NEC Chapter 9, Table 8 (uncoated copper / aluminum)
//  • Allowable ampacity (60/75/90°C): NEC Table 310.16 (≤3 CCCs, 30°C ambient)
//  • THHN/THWN-2 approx. area (sq in): NEC Chapter 9, Table 5
// NO fabricated numbers. kcmil circular mils are definitional (kcmil × 1000).

export type Material = "cu" | "al";
export type TempRating = 60 | 75 | 90;

export interface Conductor {
  size: string; // "14", "1/0", "250" (kcmil) ...
  kcmil: boolean;
  cmil: number; // circular mils
  ohm: { cu: number; al: number }; // Ω per 1000 ft @75°C (NEC Ch9 T8)
  amp: { cu: [number, number, number]; al: [number, number, number] }; // 60/75/90°C; 0 = N/A
  thhn: number; // approx area, sq in (NEC Ch9 T5)
}

// prettier-ignore
export const CONDUCTORS: Conductor[] = [
  { size: "14",  kcmil: false, cmil: 4110,   ohm: { cu: 3.07,   al: 5.06   }, amp: { cu: [15, 20, 25],    al: [0, 0, 0]       }, thhn: 0.0097 },
  { size: "12",  kcmil: false, cmil: 6530,   ohm: { cu: 1.93,   al: 3.18   }, amp: { cu: [20, 25, 30],    al: [15, 20, 25]    }, thhn: 0.0133 },
  { size: "10",  kcmil: false, cmil: 10380,  ohm: { cu: 1.21,   al: 2.00   }, amp: { cu: [30, 35, 40],    al: [25, 30, 35]    }, thhn: 0.0211 },
  { size: "8",   kcmil: false, cmil: 16510,  ohm: { cu: 0.764,  al: 1.26   }, amp: { cu: [40, 50, 55],    al: [35, 40, 45]    }, thhn: 0.0366 },
  { size: "6",   kcmil: false, cmil: 26240,  ohm: { cu: 0.491,  al: 0.808  }, amp: { cu: [55, 65, 75],    al: [40, 50, 55]    }, thhn: 0.0507 },
  { size: "4",   kcmil: false, cmil: 41740,  ohm: { cu: 0.308,  al: 0.508  }, amp: { cu: [70, 85, 95],    al: [55, 65, 75]    }, thhn: 0.0824 },
  { size: "3",   kcmil: false, cmil: 52620,  ohm: { cu: 0.245,  al: 0.403  }, amp: { cu: [85, 100, 115],  al: [65, 75, 85]    }, thhn: 0.0973 },
  { size: "2",   kcmil: false, cmil: 66360,  ohm: { cu: 0.194,  al: 0.319  }, amp: { cu: [95, 115, 130],  al: [75, 90, 100]   }, thhn: 0.1158 },
  { size: "1",   kcmil: false, cmil: 83690,  ohm: { cu: 0.154,  al: 0.253  }, amp: { cu: [110, 130, 145], al: [85, 100, 115]  }, thhn: 0.1562 },
  { size: "1/0", kcmil: false, cmil: 105600, ohm: { cu: 0.122,  al: 0.201  }, amp: { cu: [125, 150, 170], al: [100, 120, 135] }, thhn: 0.1855 },
  { size: "2/0", kcmil: false, cmil: 133100, ohm: { cu: 0.0967, al: 0.159  }, amp: { cu: [145, 175, 195], al: [115, 135, 150] }, thhn: 0.2223 },
  { size: "3/0", kcmil: false, cmil: 167800, ohm: { cu: 0.0766, al: 0.126  }, amp: { cu: [165, 200, 225], al: [130, 155, 175] }, thhn: 0.2679 },
  { size: "4/0", kcmil: false, cmil: 211600, ohm: { cu: 0.0608, al: 0.100  }, amp: { cu: [195, 230, 260], al: [150, 180, 205] }, thhn: 0.3237 },
  { size: "250", kcmil: true,  cmil: 250000, ohm: { cu: 0.0515, al: 0.0847 }, amp: { cu: [215, 255, 290], al: [170, 205, 230] }, thhn: 0.3970 },
  { size: "300", kcmil: true,  cmil: 300000, ohm: { cu: 0.0429, al: 0.0707 }, amp: { cu: [240, 285, 320], al: [195, 230, 260] }, thhn: 0.4608 },
  { size: "350", kcmil: true,  cmil: 350000, ohm: { cu: 0.0367, al: 0.0605 }, amp: { cu: [260, 310, 350], al: [210, 250, 280] }, thhn: 0.5242 },
  { size: "400", kcmil: true,  cmil: 400000, ohm: { cu: 0.0321, al: 0.0529 }, amp: { cu: [280, 335, 380], al: [225, 270, 305] }, thhn: 0.5863 },
  { size: "500", kcmil: true,  cmil: 500000, ohm: { cu: 0.0258, al: 0.0424 }, amp: { cu: [320, 380, 430], al: [260, 310, 350] }, thhn: 0.7073 },
  { size: "600", kcmil: true,  cmil: 600000, ohm: { cu: 0.0214, al: 0.0353 }, amp: { cu: [350, 420, 475], al: [285, 340, 385] }, thhn: 0.8676 },
  { size: "750", kcmil: true,  cmil: 750000, ohm: { cu: 0.0171, al: 0.0282 }, amp: { cu: [400, 475, 535], al: [320, 385, 435] }, thhn: 1.0496 },
];

export function getConductor(size: string): Conductor | undefined {
  return CONDUCTORS.find((c) => c.size === size);
}

export function resistance(size: string, material: Material): number {
  const c = getConductor(size);
  return c ? c.ohm[material] : NaN;
}

export function baseAmpacity(size: string, material: Material, temp: TempRating): number {
  const c = getConductor(size);
  if (!c) return 0;
  return c.amp[material][temp === 60 ? 0 : temp === 75 ? 1 : 2];
}

export function sizeLabel(size: string): string {
  const c = getConductor(size);
  return c?.kcmil ? `${size} kcmil` : `${size} AWG`;
}

// NEC 240.4(D) — small-conductor overcurrent-protection ceilings (max breaker/fuse).
export const OCPD_240_4D: Record<string, { cu: number; al: number }> = {
  "14": { cu: 15, al: 0 },
  "12": { cu: 20, al: 15 },
  "10": { cu: 30, al: 25 },
};

// NEC Table 250.122 — minimum equipment grounding conductor by OCPD rating.
export const EGC_250_122: { ocpd: number; cu: string; al: string }[] = [
  { ocpd: 15, cu: "14", al: "12" },
  { ocpd: 20, cu: "12", al: "10" },
  { ocpd: 60, cu: "10", al: "8" },
  { ocpd: 100, cu: "8", al: "6" },
  { ocpd: 200, cu: "6", al: "4" },
  { ocpd: 300, cu: "4", al: "2" },
  { ocpd: 400, cu: "3", al: "1" },
  { ocpd: 500, cu: "2", al: "1/0" },
  { ocpd: 600, cu: "1", al: "2/0" },
  { ocpd: 800, cu: "1/0", al: "3/0" },
  { ocpd: 1000, cu: "2/0", al: "4/0" },
  { ocpd: 1200, cu: "3/0", al: "250" },
];

export function egcSize(ocpd: number, material: Material): string {
  for (const row of EGC_250_122) if (ocpd <= row.ocpd) return material === "cu" ? row.cu : row.al;
  return EGC_250_122[EGC_250_122.length - 1][material];
}

// Standard OCPD ratings — NEC 240.6(A).
export const STANDARD_OCPD = [
  15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100, 110, 125, 150, 175, 200,
  225, 250, 300, 350, 400, 450, 500, 600,
];
