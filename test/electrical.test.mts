// CircuitCalc HQ engine tests — every value checked against the published NEC.
import assert from "node:assert";
import { baseAmpacity, egcSize, getConductor, resistance } from "../lib/nec-conductors.ts";
import { bundleAdjustment, tempCorrection } from "../lib/nec-derate.ts";
import { calcVoltageDrop, voltageDropVolts } from "../lib/voltage-drop.ts";
import { ampacity, sizeWire } from "../lib/wire-size.ts";
import { calcFill, conductorArea, minConduit } from "../lib/conduit-fill.ts";
import { calcBoxFill } from "../lib/box-fill.ts";
import { calcDwellingLoad, rangeDemandVa } from "../lib/dwelling-load.ts";

let pass = 0;
let fail = 0;
function t(name: string, fn: () => void) {
  try {
    fn();
    pass++;
  } catch (e) {
    fail++;
    console.error(`✗ ${name}\n  ${(e as Error).message}`);
  }
}
const near = (a: number, b: number, tol = 0.01) => assert.ok(Math.abs(a - b) <= tol, `${a} ≈ ${b}`);

// ---- NEC Table 8: conductor properties (verbatim) ----
t("Table 8 resistance: 12 AWG Cu = 1.93 Ω/kFT", () => near(resistance("12", "cu"), 1.93));
t("Table 8 resistance: 4/0 Cu = 0.0608", () => near(resistance("4/0", "cu"), 0.0608, 0.0001));
t("Table 8 resistance: 12 Al = 3.18", () => near(resistance("12", "al"), 3.18));
t("Circular mils: 12 AWG = 6530", () => assert.equal(getConductor("12")!.cmil, 6530));
t("Circular mils: 250 kcmil = 250000", () => assert.equal(getConductor("250")!.cmil, 250000));

// ---- NEC Table 310.16: ampacity (verbatim) ----
t("310.16: 12 Cu = 20/25/30", () => {
  assert.equal(baseAmpacity("12", "cu", 60), 20);
  assert.equal(baseAmpacity("12", "cu", 75), 25);
  assert.equal(baseAmpacity("12", "cu", 90), 30);
});
t("310.16: 6 Cu 75°C = 65", () => assert.equal(baseAmpacity("6", "cu", 75), 65));
t("310.16: 4/0 Cu 75°C = 230", () => assert.equal(baseAmpacity("4/0", "cu", 75), 230));
t("310.16: 250 Al 75°C = 205", () => assert.equal(baseAmpacity("250", "al", 75), 205));
t("310.16: 14 Al = N/A (0)", () => assert.equal(baseAmpacity("14", "al", 90), 0));

// ---- Derating factors ----
t("310.15(C)(1): 6 CCC → 0.80", () => assert.equal(bundleAdjustment(6), 0.8));
t("310.15(C)(1): 12 CCC → 0.50", () => assert.equal(bundleAdjustment(12), 0.5));
t("310.15(B)(1): 40°C, 75°C col → 0.88", () => near(tempCorrection(40, 75), 0.88));
t("310.15(B)(1): 30°C → 1.00", () => near(tempCorrection(30, 90), 1.0));

// ---- Voltage drop (NEC Ch9 T8 method) ----
t("Vd: 120V 1ph 20A 12AWG Cu 100ft = 7.72 V (6.43%)", () => {
  const r = calcVoltageDrop({ material: "cu", phase: "1", voltage: 120, amps: 20, lengthFt: 100, size: "12" });
  near(r.vd, 7.72, 0.02);
  near(r.vdPercent, 6.43, 0.05);
  assert.equal(r.ok, false);
  assert.equal(r.recommended, "8"); // first size ≤3%
});
t("Vd: 480V 3ph 100A 4/0 Cu 500ft ≈ 5.27 V", () => {
  const r = calcVoltageDrop({ material: "cu", phase: "3", voltage: 480, amps: 100, lengthFt: 500, size: "4/0" });
  near(r.vd, 5.27, 0.05);
  assert.ok(r.ok);
});
t("Vd 3ph multiplier = √3", () => near(voltageDropVolts("cu", "3", 100, 1000, "1/0"), Math.sqrt(3) * 100 * (0.122 / 1000) * 1000, 0.001));

// ---- Wire sizing ----
t("sizeWire: 40A load Cu 75°C → 8 AWG, 40A OCPD", () => {
  const r = sizeWire({ loadAmps: 40, material: "cu", tempRating: 75 });
  assert.equal(r.size, "8");
  assert.equal(r.ocpd, 40);
  assert.equal(r.egc, "10");
});
t("sizeWire: 20A load Cu 60°C → 12 AWG capped at 20A (240.4(D))", () => {
  const r = sizeWire({ loadAmps: 20, material: "cu", tempRating: 60 });
  assert.equal(r.size, "12");
  assert.equal(r.ocpd, 20);
});
t("ampacity derated: 6 Cu 75°C @40°C ambient = 57.2", () => near(ampacity("6", "cu", 75, 40, 3), 57.2, 0.1));
t("ampacity derated: 6 Cu 90°C, 6 CCC = 60", () => near(ampacity("6", "cu", 90, 30, 6), 60, 0.1));

// ---- Conduit fill (validated vs NEC Annex C counts) ----
t("Annex C.1: 9× #12 THHN fits 1/2\" EMT", () => assert.ok(calcFill("emt", 0, [{ size: "12", count: 9 }]).ok));
t("1/2\" EMT rejects 10× #12 THHN", () => assert.equal(calcFill("emt", 0, [{ size: "12", count: 10 }]).ok, false));
t("Annex C.1: 16× #12 THHN fits 3/4\" EMT", () => assert.ok(calcFill("emt", 1, [{ size: "12", count: 16 }]).ok));
t("minConduit: 10× #12 THHN → 3/4\" EMT", () => assert.equal(minConduit("emt", [{ size: "12", count: 10 }])!.label, '3/4"'));
t("fill %: single conductor = 53%, two = 31%", () => {
  assert.equal(calcFill("emt", 5, [{ size: "4/0", count: 1 }]).permittedPercent, 53);
  assert.equal(calcFill("emt", 5, [{ size: "4/0", count: 2 }]).permittedPercent, 31);
});
t("conductorArea sums Table 5 areas", () => near(conductorArea([{ size: "12", count: 3 }]).area, 0.0399, 0.0001));

// ---- Box fill (NEC 314.16) ----
t("Box fill: 4×#14 + clamp + 1 device + ground = 16.0 in³", () => {
  const r = calcBoxFill({ conductors: [{ size: "14", count: 4 }], devices: 1, clamps: true, supports: 0, grounds: true, boxVolume: 18 });
  near(r.required, 16.0);
  assert.ok(r.ok);
});
t("Box fill: 6×#12 + 2 devices + clamp + ground = 27.0 in³", () => {
  const r = calcBoxFill({ conductors: [{ size: "12", count: 6 }], devices: 2, clamps: true, supports: 0, grounds: true, groundSize: "12", boxVolume: 21 });
  near(r.required, 27.0);
  assert.equal(r.ok, false);
});

// ---- Dwelling load (NEC Annex D / Article 220 standard method) ----
t("Dwelling load: 1500 ft² + 12 kW range (Annex D1a pieces)", () => {
  const r = calcDwellingLoad({ sqft: 1500, smallApplianceCircuits: 2, laundryCircuits: 1, fastenedApplianceVa: 0, fastenedApplianceCount: 0, dryerVa: 0, rangeKw: 12, heatVa: 0, acVa: 0, voltage: 240 });
  assert.equal(r.generalConnected, 9000);
  assert.equal(r.generalDemand, 5100);
  assert.equal(r.rangeDemand, 8000);
  assert.equal(r.totalVa, 13100);
  assert.equal(r.service, 100);
});
t("range demand: ≤12kW → 8000; 16kW → 9600", () => {
  assert.equal(rangeDemandVa(12), 8000);
  assert.equal(rangeDemandVa(16), 9600);
});
t("fastened appliances: 75% demand when ≥4", () => {
  const r = calcDwellingLoad({ sqft: 1000, smallApplianceCircuits: 2, laundryCircuits: 1, fastenedApplianceVa: 4000, fastenedApplianceCount: 4, dryerVa: 0, rangeKw: 0, heatVa: 0, acVa: 0, voltage: 240 });
  assert.equal(r.fastenedDemand, 3000);
});
t("HVAC: larger of heat vs AC", () => {
  const r = calcDwellingLoad({ sqft: 1000, smallApplianceCircuits: 2, laundryCircuits: 1, fastenedApplianceVa: 0, fastenedApplianceCount: 0, dryerVa: 0, rangeKw: 0, heatVa: 9000, acVa: 5000, voltage: 240 });
  assert.equal(r.hvacDemand, 9000);
});

// ---- EGC (NEC Table 250.122) ----
t("EGC: 15A→14, 20A→12, 100A→8, 200A→6 (Cu)", () => {
  assert.equal(egcSize(15, "cu"), "14");
  assert.equal(egcSize(20, "cu"), "12");
  assert.equal(egcSize(100, "cu"), "8");
  assert.equal(egcSize(200, "cu"), "6");
});

console.log(`\n${pass} passed, ${fail} failed`);
if (fail > 0) process.exit(1);
