"use client";
import { useState } from "react";
import { sizeLabel, type Material, type TempRating } from "@/lib/nec-conductors";
import { sizeWire } from "@/lib/wire-size";
import { Field, NumberInput, ResultCard, SegButton, Select, Stat, Verdict } from "./ui";

export default function WireSizeCalculator() {
  const [loadAmps, setLoadAmps] = useState(50);
  const [material, setMaterial] = useState<Material>("cu");
  const [tempRating, setTempRating] = useState<TempRating>(75);
  const [ambientC, setAmbientC] = useState(30);
  const [ccc, setCcc] = useState(3);
  const [continuous, setContinuous] = useState(false);

  const r = sizeWire({ loadAmps, material, tempRating, ambientC, ccc, continuous });

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div className="space-y-4">
        <Field label="Load current (A)">
          <NumberInput value={loadAmps} onChange={(e) => setLoadAmps(+e.target.value)} />
        </Field>
        <div>
          <span className="mb-1 block text-sm font-medium text-slate-700">Conductor</span>
          <div className="grid grid-cols-2 gap-2">
            <SegButton active={material === "cu"} onClick={() => setMaterial("cu")}>Copper</SegButton>
            <SegButton active={material === "al"} onClick={() => setMaterial("al")}>Aluminum</SegButton>
          </div>
        </div>
        <Field label="Terminal / insulation rating" hint="Most breakers and lugs are rated 75°C.">
          <Select value={tempRating} onChange={(e) => setTempRating(+e.target.value as TempRating)}>
            <option value={60}>60°C (TW / UF)</option>
            <option value={75}>75°C (THWN / XHHW)</option>
            <option value={90}>90°C (THHN — derating only)</option>
          </Select>
        </Field>
        <Field label="Ambient temperature (°C)" hint="Table 310.16 assumes 30°C.">
          <NumberInput value={ambientC} onChange={(e) => setAmbientC(+e.target.value)} />
        </Field>
        <Field label="Current-carrying conductors in raceway">
          <NumberInput value={ccc} onChange={(e) => setCcc(+e.target.value)} />
        </Field>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={continuous} onChange={(e) => setContinuous(e.target.checked)} className="h-4 w-4 rounded border-slate-300" />
          Continuous load (runs ≥3 hours → ×1.25)
        </label>
      </div>

      <ResultCard>
        {r.size ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <Stat label="Minimum wire" value={`${sizeLabel(r.size)} ${material === "cu" ? "Cu" : "Al"}`} big />
              <Stat label="Breaker / fuse" value={`${r.ocpd} A`} big />
              <Stat label="Corrected ampacity" value={`${r.ampacity} A`} sub={`base ${r.baseAmpacity} A × ${r.derateFactor}`} />
              <Stat label="Ground (250.122)" value={`${sizeLabel(r.egc!)} ${material === "cu" ? "Cu" : "Al"}`} />
            </div>
            <div className="mt-4">
              <Verdict ok>Covers a {r.requiredAmps} A required ampacity.</Verdict>
            </div>
          </>
        ) : (
          <Verdict ok={false}>{r.note ?? "No single conductor covers this load."}</Verdict>
        )}
        {r.note && r.size && <p className="mt-3 text-xs text-amber-700">{r.note}</p>}
        <p className="mt-4 text-xs text-slate-500">
          NEC Table 310.16 ampacity × ambient correction (310.15(B)(1)) × bundle adjustment
          (310.15(C)(1)), with the 240.4(D) small-conductor rule. A planning aid — verify with your AHJ.
        </p>
      </ResultCard>
    </div>
  );
}
