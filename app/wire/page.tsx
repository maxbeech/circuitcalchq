import type { Metadata } from "next";
import Link from "next/link";
import { CONDUCTORS, sizeLabel } from "@/lib/nec-conductors";
import { AMP_TARGETS, gaugeSlug } from "@/lib/wire-pages";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Wire Size Reference — Ampacity, Resistance & Uses",
  description: "Reference pages for every conductor from 14 AWG to 750 kcmil: NEC ampacity, resistance, circular mils and typical applications — plus wire size by amperage.",
  alternates: { canonical: `${SITE.url}/wire` },
};

export default function WireIndex() {
  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Wire size reference</h1>
      <p className="mt-2 max-w-2xl text-slate-600">Pick a conductor for its full NEC spec, or jump to the wire size for a given amperage.</p>

      <h2 className="mt-6 text-lg font-semibold text-slate-900">By conductor size</h2>
      <div className="mt-3 grid gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {CONDUCTORS.map((c) => (
          <Link key={c.size} href={`/wire/${gaugeSlug(c.size)}`}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm hover:border-blue-300 hover:text-blue-700">
            {sizeLabel(c.size)} <span className="text-slate-500">· {c.amp.cu[1]} A Cu @75°C</span>
          </Link>
        ))}
      </div>

      <h2 className="mt-8 text-lg font-semibold text-slate-900">By amperage</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {AMP_TARGETS.map((a) => (
          <Link key={a} href={`/amps/${a}`} className="rounded-full border border-slate-300 bg-white px-3 py-1 text-sm text-slate-700 hover:border-blue-400 hover:text-blue-700">{a} amps</Link>
        ))}
      </div>
    </>
  );
}
