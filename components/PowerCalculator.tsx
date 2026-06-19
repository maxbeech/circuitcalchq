"use client";
import { useState } from "react";
import { solvePower, type PhaseMode, type PowerSource } from "@/lib/power";
import { Field, NumberInput, Notice, parseNum, ResultCard, SegButton, Select, Stat } from "./ui";

const SOURCES: { key: PowerSource; label: string; unit: string }[] = [
  { key: "watts", label: "Power", unit: "W" },
  { key: "amps", label: "Current", unit: "A" },
  { key: "kva", label: "Apparent power", unit: "kVA" },
];

export default function PowerCalculator() {
  const [mode, setMode] = useState<PhaseMode>("1");
  const [volts, setVolts] = useState(240);
  const [pf, setPf] = useState(0.9);
  const [source, setSource] = useState<PowerSource>("watts");
  const [value, setValue] = useState(2400);

  const r = solvePower({ mode, volts, pf, source, value });
  const unit = SOURCES.find((s) => s.key === source)!.unit;

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div className="space-y-4">
        <div>
          <span className="mb-1 block text-sm font-medium text-slate-700">System</span>
          <div className="grid grid-cols-3 gap-2">
            <SegButton active={mode === "1"} onClick={() => setMode("1")}>1‑phase</SegButton>
            <SegButton active={mode === "3"} onClick={() => setMode("3")}>3‑phase</SegButton>
            <SegButton active={mode === "dc"} onClick={() => setMode("dc")}>DC</SegButton>
          </div>
        </div>
        <Field label="Voltage (V)" hint={mode === "3" ? "Line-to-line voltage." : undefined}>
          <NumberInput min={0} value={volts} onChange={(e) => setVolts(Math.max(0, parseNum(e.target.value)))} />
        </Field>
        <Field label="I know the…">
          <Select value={source} onChange={(e) => setSource(e.target.value as PowerSource)}>
            {SOURCES.map((s) => <option key={s.key} value={s.key}>{s.label} ({s.unit})</option>)}
          </Select>
        </Field>
        <Field label={`Value (${unit})`}>
          <NumberInput min={0} value={value} onChange={(e) => setValue(Math.max(0, parseNum(e.target.value)))} />
        </Field>
        {mode !== "dc" && (
          <Field label={`Power factor — ${pf.toFixed(2)}`} hint="1.0 = resistive (heaters); ~0.8 motors.">
            <input type="range" min={0.5} max={1} step={0.01} value={pf}
              onChange={(e) => setPf(parseNum(e.target.value))} className="w-full accent-blue-600" />
          </Field>
        )}
      </div>

      <ResultCard>
        {r.valid ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <Stat label="Current" value={`${r.amps} A`} big />
              <Stat label="Real power" value={`${r.watts.toLocaleString()} W`} big sub={`${r.kw} kW`} />
              <Stat label="Apparent power" value={`${r.kva} kVA`} />
              <Stat label="Voltage" value={`${r.volts} V`} sub={mode === "dc" ? "DC" : `pf ${r.pf}`} />
            </div>
            <p className="mt-4 text-xs text-slate-500">
              {mode === "3"
                ? "Three-phase: P = √3 × V × I × pf;  apparent power = √3 × V × I."
                : mode === "dc"
                ? "DC: P = V × I."
                : "Single-phase: P = V × I × pf;  apparent power = V × I."}
            </p>
          </>
        ) : (
          <Notice>Enter a positive voltage and value to convert.</Notice>
        )}
      </ResultCard>
    </div>
  );
}
