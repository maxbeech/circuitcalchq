"use client";
import { useState } from "react";
import { calcDwellingLoad } from "@/lib/dwelling-load";
import { Field, NumberInput, parseNum, ResultCard, Stat, Verdict } from "./ui";

const nn = (v: string) => Math.max(0, parseNum(v));

export default function LoadCalculator() {
  const [sqft, setSqft] = useState(2000);
  const [rangeKw, setRangeKw] = useState(12);
  const [dryerVa, setDryerVa] = useState(5000);
  const [fastenedApplianceVa, setFastened] = useState(4500);
  const [fastenedApplianceCount, setCount] = useState(3);
  const [heatVa, setHeat] = useState(0);
  const [acVa, setAc] = useState(5000);

  const r = calcDwellingLoad({
    sqft, smallApplianceCircuits: 2, laundryCircuits: 1,
    fastenedApplianceVa, fastenedApplianceCount, dryerVa, rangeKw, heatVa, acVa, voltage: 240,
  });

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div className="space-y-4">
        <Field label="Living area (ft²)" hint="Heated/conditioned floor area. 3 VA/ft² general load.">
          <NumberInput min={0} value={sqft} onChange={(e) => setSqft(nn(e.target.value))} />
        </Field>
        <Field label="Electric range (kW)" hint="Single dwelling, one range. 0 if gas. ≤12 kW counts as 8 kVA (Table 220.55).">
          <NumberInput min={0} value={rangeKw} onChange={(e) => setRangeKw(nn(e.target.value))} />
        </Field>
        <Field label="Electric dryer (VA)" hint="0 if gas. Counted at 5000 VA minimum.">
          <NumberInput min={0} value={dryerVa} onChange={(e) => setDryerVa(nn(e.target.value))} />
        </Field>
        <Field label="Other fastened appliances — total VA" hint="Dishwasher, disposal, water heater, etc.">
          <NumberInput min={0} value={fastenedApplianceVa} onChange={(e) => setFastened(nn(e.target.value))} />
        </Field>
        <Field label="Number of those appliances" hint="4 or more → 75% demand factor.">
          <NumberInput min={0} value={fastenedApplianceCount} onChange={(e) => setCount(nn(e.target.value))} />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Heating (VA)"><NumberInput min={0} value={heatVa} onChange={(e) => setHeat(nn(e.target.value))} /></Field>
          <Field label="Air conditioning (VA)"><NumberInput min={0} value={acVa} onChange={(e) => setAc(nn(e.target.value))} /></Field>
        </div>
      </div>

      <ResultCard>
        <div className="grid grid-cols-2 gap-4">
          <Stat label="Calculated load" value={`${r.amps} A`} big sub={`${r.totalVa.toLocaleString()} VA @ 240 V`} />
          <Stat label="Service size" value={`${r.service} A`} big />
        </div>
        <div className="mt-4 space-y-1 border-t border-slate-100 pt-3 text-sm text-slate-600">
          <Row label="General (after demand factors)" value={r.generalDemand} note={`${r.generalConnected.toLocaleString()} VA connected`} />
          <Row label="Fastened appliances" value={r.fastenedDemand} />
          <Row label="Range (Table 220.55)" value={r.rangeDemand} />
          <Row label="Dryer" value={r.dryerDemand} />
          <Row label="Heating / AC (larger)" value={r.hvacDemand} />
        </div>
        <div className="mt-4">
          <Verdict ok>{`A ${r.service} A service covers this dwelling.`}</Verdict>
        </div>
        <p className="mt-3 text-xs text-slate-500">NEC Article 220 standard method. A planning aid — verify with your AHJ.</p>
      </ResultCard>
    </div>
  );
}

function Row({ label, value, note }: { label: string; value: number; note?: string }) {
  return (
    <div className="flex justify-between">
      <span>{label}{note && <span className="text-slate-500"> · {note}</span>}</span>
      <span className="font-medium text-slate-900">{value.toLocaleString()} VA</span>
    </div>
  );
}
