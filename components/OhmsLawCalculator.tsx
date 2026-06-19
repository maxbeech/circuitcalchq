"use client";
import { useState } from "react";
import { solveOhms, type OhmInput } from "@/lib/power";
import { Field, NumberInput, Notice, parseNum, ResultCard, Stat } from "./ui";

type Key = "v" | "i" | "r" | "p";
const FIELDS: { key: Key; label: string; unit: string }[] = [
  { key: "v", label: "Voltage", unit: "V" },
  { key: "i", label: "Current", unit: "A" },
  { key: "r", label: "Resistance", unit: "Ω" },
  { key: "p", label: "Power", unit: "W" },
];

export default function OhmsLawCalculator() {
  const [vals, setVals] = useState<Record<Key, string>>({ v: "120", i: "", r: "60", p: "" });

  const input: OhmInput = {};
  (Object.keys(vals) as Key[]).forEach((k) => {
    const t = vals[k].trim();
    if (t !== "") input[k] = parseNum(t);
  });
  const res = solveOhms(input);
  const knownCount = (Object.keys(vals) as Key[]).filter((k) => vals[k].trim() !== "" && parseNum(vals[k]) > 0).length;

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div className="space-y-4">
        <p className="text-sm text-slate-600">Enter any <strong>two</strong> values — the other two are calculated.</p>
        {FIELDS.map((f) => (
          <Field key={f.key} label={`${f.label} (${f.unit})`}>
            <NumberInput
              min={0}
              placeholder="—"
              value={vals[f.key]}
              onChange={(e) => setVals((v) => ({ ...v, [f.key]: e.target.value }))}
            />
          </Field>
        ))}
        {knownCount > 0 && (
          <button type="button" onClick={() => setVals({ v: "", i: "", r: "", p: "" })}
            className="text-sm font-medium text-blue-600 hover:text-blue-800">Clear all</button>
        )}
      </div>

      <ResultCard>
        {res.valid ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <Stat label="Voltage" value={`${res.v} V`} big />
              <Stat label="Current" value={`${res.i} A`} big />
              <Stat label="Resistance" value={`${res.r} Ω`} />
              <Stat label="Power" value={`${res.p} W`} />
            </div>
            <p className="mt-4 text-xs text-slate-500">
              Ohm&apos;s law: V = I × R, and power P = V × I = I²R = V²/R.
            </p>
          </>
        ) : (
          <Notice>Enter exactly two positive values (e.g. voltage and resistance) to solve the rest.</Notice>
        )}
      </ResultCard>
    </div>
  );
}
