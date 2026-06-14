import type { Metadata } from "next";
import Link from "next/link";
import { CALCS } from "@/lib/calculators";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Electrical Calculators",
  description: "Free NEC electrical calculators: voltage drop, wire size & ampacity, conduit fill, dwelling load and box fill — copper or aluminum.",
  alternates: { canonical: `${SITE.url}/calculators` },
};

export default function CalculatorsIndex() {
  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Electrical calculators</h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        Each tool runs on the published National Electrical Code tables and shows the article it came from.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {CALCS.map((c) => (
          <Link key={c.slug} href={`/calculators/${c.slug}`}
            className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow">
            <div className="text-lg font-semibold text-slate-900 group-hover:text-blue-700">{c.title}</div>
            <p className="mt-1 text-sm text-slate-500">{c.description}</p>
            <div className="mt-3 text-xs font-medium text-blue-600">{c.code}</div>
          </Link>
        ))}
      </div>
    </>
  );
}
