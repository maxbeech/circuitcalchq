"use client";
import { useState } from "react";
import { CONDUCTORS, sizeLabel } from "@/lib/nec-conductors";
import { CONDUIT_LABELS, TRADE_SIZES, type ConduitType } from "@/lib/nec-conduit";
import { calcFill, minConduit, type WireGroup } from "@/lib/conduit-fill";
import { Field, NumberInput, ResultCard, Select, Stat, Verdict } from "./ui";

export default function ConduitFillCalculator() {
  const [type, setType] = useState<ConduitType>("emt");
  const [wires, setWires] = useState<WireGroup[]>([
    { size: "12", count: 3 },
    { size: "12", count: 1 },
  ]);

  const min = minConduit(type, wires);
  const checkIndex = min ? min.tradeIndex : TRADE_SIZES.length - 1;
  const fill = calcFill(type, checkIndex, wires);

  const update = (i: number, patch: Partial<WireGroup>) =>
    setWires((w) => w.map((row, j) => (j === i ? { ...row, ...patch } : row)));
  const remove = (i: number) => setWires((w) => w.filter((_, j) => j !== i));

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div className="space-y-4">
        <Field label="Conduit type">
          <Select value={type} onChange={(e) => setType(e.target.value as ConduitType)}>
            {(Object.keys(CONDUIT_LABELS) as ConduitType[]).map((k) => (
              <option key={k} value={k}>{CONDUIT_LABELS[k]}</option>
            ))}
          </Select>
        </Field>
        <div>
          <span className="mb-1 block text-sm font-medium text-slate-700">Conductors (THHN / THWN-2)</span>
          <div className="space-y-2">
            {wires.map((w, i) => (
              <div key={i} className="flex items-center gap-2">
                <NumberInput value={w.count} min={0} onChange={(e) => update(i, { count: Math.max(0, +e.target.value) })} className="w-20 rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900" />
                <span className="text-slate-400">×</span>
                <Select value={w.size} onChange={(e) => update(i, { size: e.target.value })}>
                  {CONDUCTORS.map((c) => (
                    <option key={c.size} value={c.size}>{sizeLabel(c.size)}</option>
                  ))}
                </Select>
                <button type="button" onClick={() => remove(i)} className="rounded-lg px-2 py-1 text-slate-400 hover:bg-slate-100 hover:text-rose-600" aria-label="Remove conductor">✕</button>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => setWires((w) => [...w, { size: "12", count: 1 }])} className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-800">+ Add conductor</button>
        </div>
      </div>

      <ResultCard>
        <div className="grid grid-cols-2 gap-4">
          <Stat label="Smallest conduit" value={min ? `${min.label}` : "—"} big sub={CONDUIT_LABELS[type].split(" ")[0]} />
          <Stat label="Fill in that size" value={`${fill.fillPercent}%`} big sub={`limit ${fill.permittedPercent}%`} />
          <Stat label="Conductor area" value={`${fill.conductorArea} in²`} sub={`${fill.totalWires} wires`} />
          <Stat label="Allowed area" value={`${fill.allowedArea} in²`} sub={`of ${fill.conduitArea} in²`} />
        </div>
        <div className="mt-4">
          {min ? (
            <Verdict ok>{`${fill.totalWires} conductors fit in ${min.label} ${CONDUIT_LABELS[type].split(" ")[0]}.`}</Verdict>
          ) : (
            <Verdict ok={false}>These conductors exceed 4&quot; conduit — split the run or use a larger raceway.</Verdict>
          )}
        </div>
        <p className="mt-4 text-xs text-slate-500">
          NEC Chapter 9: Table 1 fill limits (53% / 31% / 40%), Table 4 conduit areas, Table 5
          conductor areas. A planning aid — verify with your AHJ.
        </p>
      </ResultCard>
    </div>
  );
}
