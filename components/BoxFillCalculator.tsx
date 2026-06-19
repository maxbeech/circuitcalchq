"use client";
import { useState } from "react";
import { sizeLabel } from "@/lib/nec-conductors";
import type { WireGroup } from "@/lib/conduit-fill";
import { COMMON_BOXES, calcBoxFill, unitVolume } from "@/lib/box-fill";
import { Field, NumberInput, parseNum, ResultCard, Select, Stat, Verdict } from "./ui";

const SIZES = ["14", "12", "10", "8", "6"];

export default function BoxFillCalculator() {
  const [conductors, setConductors] = useState<WireGroup[]>([{ size: "14", count: 4 }]);
  const [devices, setDevices] = useState(1);
  const [supports, setSupports] = useState(0);
  const [clamps, setClamps] = useState(true);
  const [grounds, setGrounds] = useState(true);
  const [boxIdx, setBoxIdx] = useState(4);

  const box = COMMON_BOXES[boxIdx];
  // NEC 314.16(B)(5): the grounding-conductor group counts at the volume of the
  // largest conductor in the box (conservative when the EGC isn't entered separately).
  const present = conductors.filter((w) => w.count > 0).map((w) => w.size);
  const groundSize = present.reduce((a, b) => (unitVolume(b) > unitVolume(a) ? b : a), present[0] ?? "14");
  const r = calcBoxFill({ conductors, devices, clamps, supports, grounds, groundSize, boxVolume: box.volume });
  const update = (i: number, patch: Partial<WireGroup>) =>
    setConductors((w) => w.map((row, j) => (j === i ? { ...row, ...patch } : row)));

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div className="space-y-4">
        <div>
          <span className="mb-1 block text-sm font-medium text-slate-700">Insulated conductors</span>
          <div className="space-y-2">
            {conductors.map((w, i) => (
              <div key={i} className="flex items-center gap-2">
                <NumberInput value={w.count} min={0} onChange={(e) => update(i, { count: Math.max(0, parseNum(e.target.value)) })} className="w-20 rounded-lg border border-slate-300 bg-white px-3 py-2" />
                <span className="text-slate-500">×</span>
                <Select value={w.size} onChange={(e) => update(i, { size: e.target.value })}>
                  {SIZES.map((s) => <option key={s} value={s}>{sizeLabel(s)}</option>)}
                </Select>
                <button type="button" onClick={() => setConductors((w) => w.filter((_, j) => j !== i))} className="rounded-lg px-2 py-1 text-slate-500 hover:bg-slate-100 hover:text-rose-600" aria-label="Remove">✕</button>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => setConductors((w) => [...w, { size: "14", count: 1 }])} className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-800">+ Add conductor group</button>
        </div>
        <Field label="Device yokes (switches / receptacles)">
          <NumberInput value={devices} min={0} onChange={(e) => setDevices(Math.max(0, parseNum(e.target.value)))} />
        </Field>
        <Field label="Support fittings (luminaire studs / hickeys)">
          <NumberInput value={supports} min={0} onChange={(e) => setSupports(Math.max(0, parseNum(e.target.value)))} />
        </Field>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={clamps} onChange={(e) => setClamps(e.target.checked)} className="h-4 w-4 rounded border-slate-300" />
          Internal cable clamps present
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={grounds} onChange={(e) => setGrounds(e.target.checked)} className="h-4 w-4 rounded border-slate-300" />
          Equipment grounding conductors present
        </label>
        <Field label="Box">
          <Select value={boxIdx} onChange={(e) => setBoxIdx(+e.target.value)}>
            {COMMON_BOXES.map((b, i) => <option key={i} value={i}>{b.label} — {b.volume} in³</option>)}
          </Select>
        </Field>
      </div>

      <ResultCard>
        <div className="grid grid-cols-2 gap-4">
          <Stat label="Required volume" value={`${r.required} in³`} big />
          <Stat label="Box volume" value={`${box.volume} in³`} big />
          <Stat label="Conductors" value={`${r.conductorFill} in³`} />
          <Stat label="Devices ×2" value={`${r.deviceFill} in³`} />
          <Stat label="Clamps" value={`${r.clampFill} in³`} />
          {r.supportFill > 0 && <Stat label="Support fittings" value={`${r.supportFill} in³`} />}
          <Stat label="Grounds" value={`${r.groundFill} in³`} />
        </div>
        <div className="mt-4">
          <Verdict ok={r.ok}>{r.ok ? "Within the box's volume." : "Overfilled — use a larger or deeper box."}</Verdict>
        </div>
        <p className="mt-4 text-xs text-slate-500">
          NEC 314.16(B): each conductor counts at its own size; clamps, support fittings, device
          yokes (×2) and the ground group count at the largest conductor. A planning aid — verify with your AHJ.
        </p>
      </ResultCard>
    </div>
  );
}
