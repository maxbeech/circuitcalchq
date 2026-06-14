import type { Metadata } from "next";
import Link from "next/link";
import { SITE, NEC_EDITION } from "@/lib/site";

export const metadata: Metadata = {
  title: "Methodology & NEC Sources",
  description: "Exactly which NEC tables and formulas CircuitCalc HQ uses — Table 310.16, Chapter 9 Tables 1/4/5/8, Article 220 and 250.122 — and the assumptions behind each calculator.",
  alternates: { canonical: `${SITE.url}/methodology` },
};

const sources = [
  { t: "Voltage drop", d: "DC resistance (Ω/1000 ft at 75°C) from NEC Chapter 9, Table 8. Single-phase and DC use Vd = 2·I·R·L; three-phase uses √3·I·R·L (L = one-way length). The 3% / 5% targets are the recommendations in the Informational Notes to 210.19(A) and 215.2(A)." },
  { t: "Wire size & ampacity", d: "Base ampacity from Table 310.16 (60/75/90°C, copper & aluminum, ≤3 CCCs, 30°C ambient), multiplied by the ambient correction factor (Table 310.15(B)(1)) and the bundle adjustment factor (Table 310.15(C)(1)). Overcurrent protection respects the 240.4(D) small-conductor ceilings and standard ratings from 240.6(A)." },
  { t: "Conduit fill", d: "Permitted fill from Chapter 9, Table 1 (53% one conductor, 31% two, 40% three or more), conduit internal areas from Table 4 (EMT, PVC Sch 40/80, RMC) and conductor areas from Table 5 (THHN / THWN-2). Verified against the conductor counts published in NEC Annex C." },
  { t: "Dwelling load", d: "Article 220 Part III standard method: 3 VA/ft² general lighting plus small-appliance and laundry circuits, demand factors from Table 220.42, range from Table 220.55 (Column C), dryer per 220.54, and the larger of heating or A/C per 220.60." },
  { t: "Box fill", d: "Volume allowances from 314.16(B): each conductor at its own size, with clamps, support fittings, device yokes (×2) and the grounding-conductor group counted at the largest conductor. Box volumes from Table 314.16(A)." },
  { t: "Equipment ground", d: "Minimum equipment grounding conductor sized from Table 250.122 by overcurrent-device rating." },
];

export default function Methodology() {
  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Methodology &amp; sources</h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        Every figure CircuitCalc HQ returns comes from the published {NEC_EDITION} tables — no
        approximations, no invented numbers. Here is exactly what each calculator uses.
      </p>

      <div className="mt-6 space-y-4">
        {sources.map((s) => (
          <div key={s.t} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-semibold text-slate-900">{s.t}</h2>
            <p className="mt-1 text-sm text-slate-600">{s.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        <strong>Important:</strong> these tools are planning aids. The NEC is adopted with local
        amendments, terminal ratings and field conditions vary, and the Authority Having Jurisdiction
        has the final say. Always have electrical work verified and inspected. CircuitCalc HQ is not a
        substitute for a licensed electrician or engineer.
      </div>

      <p className="mt-6 text-sm text-slate-600">
        Questions about a calculation? Email <span className="font-medium">hello@circuitcalchq.com</span> — or
        start with the <Link href="/calculators" className="font-medium text-blue-600 underline">calculators</Link>.
      </p>
    </>
  );
}
