"use client";
import { useState } from "react";
import { CONDUCTORS, sizeLabel, type Material } from "@/lib/nec-conductors";
import { calcVoltageDrop, type Phase } from "@/lib/voltage-drop";
import { Field, NumberInput, ResultCard, SegButton, Select, Stat, Verdict } from "./ui";

export default function VoltageDropCalculator() {
  const [material, setMaterial] = useState<Material>("cu");
  const [phase, setPhase] = useState<Phase>("1");
  const [voltage, setVoltage] = useState(240);
  const [amps, setAmps] = useState(30);
  const [length, setLength] = useState(100);
  const [size, setSize] = useState("8");
  const [target, setTarget] = useState(3);

  const r = calcVoltageDrop({ material, phase, voltage, amps, lengthFt: length, size, maxPercent: target });

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div className="space-y-4">
        <div>
          <span className="mb-1 block text-sm font-medium text-slate-700">Conductor</span>
          <div className="grid grid-cols-2 gap-2">
            <SegButton active={material === "cu"} onClick={() => setMaterial("cu")}>Copper</SegButton>
            <SegButton active={material === "al"} onClick={() => setMaterial("al")}>Aluminum</SegButton>
          </div>
        </div>
        <div>
          <span className="mb-1 block text-sm font-medium text-slate-700">System</span>
          <div className="grid grid-cols-3 gap-2">
            <SegButton active={phase === "1"} onClick={() => setPhase("1")}>1‑phase</SegButton>
            <SegButton active={phase === "3"} onClick={() => setPhase("3")}>3‑phase</SegButton>
            <SegButton active={phase === "dc"} onClick={() => setPhase("dc")}>DC</SegButton>
          </div>
        </div>
        <Field label="System voltage (V)">
          <NumberInput value={voltage} onChange={(e) => setVoltage(+e.target.value)} />
        </Field>
        <Field label="Load current (A)">
          <NumberInput value={amps} onChange={(e) => setAmps(+e.target.value)} />
        </Field>
        <Field label="One-way distance (ft)" hint="The length of the run, not there-and-back.">
          <NumberInput value={length} onChange={(e) => setLength(+e.target.value)} />
        </Field>
        <Field label="Conductor size">
          <Select value={size} onChange={(e) => setSize(e.target.value)}>
            {CONDUCTORS.map((c) => (
              <option key={c.size} value={c.size}>{sizeLabel(c.size)}</option>
            ))}
          </Select>
        </Field>
        <Field label="Target max drop (%)">
          <Select value={target} onChange={(e) => setTarget(+e.target.value)}>
            <option value={3}>3% (branch circuit)</option>
            <option value={5}>5% (feeder + branch)</option>
            <option value={2}>2% (sensitive / low-voltage)</option>
          </Select>
        </Field>
      </div>

      <ResultCard>
        <div className="grid grid-cols-2 gap-4">
          <Stat label="Voltage drop" value={`${r.vd} V`} big />
          <Stat label="Percentage" value={`${r.vdPercent}%`} big />
          <Stat label="Voltage at load" value={`${r.vEnd} V`} />
          <Stat label="Conductor R" value={`${r.resistance} Ω/kft`} sub="NEC Ch. 9, Table 8" />
        </div>
        <div className="mt-4">
          <Verdict ok={r.ok}>
            {r.ok
              ? `Within your ${target}% target.`
              : `Exceeds ${target}%${r.recommended ? ` — upsize to ${sizeLabel(r.recommended)}` : ""}.`}
          </Verdict>
        </div>
        <p className="mt-4 text-xs text-slate-500">
          {phase === "3" ? "Three-phase: Vd = √3 × I × R × L." : "Single-phase / DC: Vd = 2 × I × R × L."}{" "}
          Resistance from NEC Chapter 9, Table 8 at 75°C. A planning aid — verify with your AHJ.
        </p>
      </ResultCard>
    </div>
  );
}
