// NEC Table 310.16 ampacity chart — rendered from the single CONDUCTORS source.
import { CONDUCTORS, sizeLabel } from "@/lib/nec-conductors";

export default function AmpacityTable() {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50 text-left text-slate-600">
            <th className="px-3 py-2 font-semibold" rowSpan={2}>Size</th>
            <th className="px-3 py-2 text-center font-semibold" colSpan={3}>Copper (A)</th>
            <th className="px-3 py-2 text-center font-semibold" colSpan={3}>Aluminum (A)</th>
            <th className="px-3 py-2 text-right font-semibold" rowSpan={2}>R Cu Ω/kft</th>
          </tr>
          <tr className="border-b border-slate-200 bg-slate-50 text-center text-xs text-slate-400">
            <th className="px-2 py-1 font-medium">60°C</th>
            <th className="px-2 py-1 font-medium">75°C</th>
            <th className="px-2 py-1 font-medium">90°C</th>
            <th className="px-2 py-1 font-medium">60°C</th>
            <th className="px-2 py-1 font-medium">75°C</th>
            <th className="px-2 py-1 font-medium">90°C</th>
          </tr>
        </thead>
        <tbody>
          {CONDUCTORS.map((c) => (
            <tr key={c.size} className="border-b border-slate-100 last:border-0">
              <td className="px-3 py-1.5 font-medium text-slate-900">{sizeLabel(c.size)}</td>
              {c.amp.cu.map((a, i) => <td key={`cu${i}`} className="px-2 py-1.5 text-center text-slate-700">{a}</td>)}
              {c.amp.al.map((a, i) => <td key={`al${i}`} className="px-2 py-1.5 text-center text-slate-700">{a || "—"}</td>)}
              <td className="px-3 py-1.5 text-right text-slate-500">{c.ohm.cu}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="px-3 py-2 text-xs text-slate-400">
        NEC Table 310.16 (≤3 current-carrying conductors, 30°C ambient) · resistance from Chapter 9, Table 8.
      </p>
    </div>
  );
}
