import type { Metadata } from "next";
import Link from "next/link";
import { US_STATES } from "@/lib/states";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "NEC Adoption by State",
  description: "Which edition of the National Electrical Code (NFPA 70) each US state has currently adopted — 2023, 2020 or 2017 — with electrical calculators for your jurisdiction.",
  alternates: { canonical: `${SITE.url}/states` },
};

export default function StatesIndex() {
  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">NEC adoption by state</h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        The NEC is published every three years, but states adopt on their own schedule. Find your state&apos;s
        current edition — then size your circuits with the calculators.
      </p>
      <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {US_STATES.map((s) => (
          <Link key={s.slug} href={`/states/${s.slug}`}
            className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm hover:border-blue-300">
            <span className="text-slate-800">{s.name}</span>
            <span className="font-medium text-blue-600">{s.nec === "No statewide" ? "Local" : `${s.nec} NEC`}</span>
          </Link>
        ))}
      </div>
    </>
  );
}
