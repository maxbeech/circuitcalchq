import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { US_STATES, getState } from "@/lib/states";
import { CALCS } from "@/lib/calculators";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return US_STATES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getState(slug);
  if (!s) return {};
  return {
    title: `${s.name} Electrical Code — NEC Edition & Calculators`,
    description: `${s.name} ${s.nec === "No statewide" ? "has no statewide NEC adoption (local jurisdictions set the code)" : `currently enforces the ${s.nec} NEC`}. Free voltage drop, wire size and load calculators for ${s.name} electrical permits.`,
    alternates: { canonical: `${SITE.url}/states/${s.slug}` },
  };
}

export default async function StatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getState(slug);
  if (!s) notFound();
  const local = s.nec === "No statewide";

  return (
    <>
      <nav className="mb-4 text-sm text-slate-500">
        <Link href="/states" className="hover:text-slate-900">NEC by state</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700">{s.name}</span>
      </nav>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{s.name} electrical code</h1>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="text-xs uppercase tracking-wide text-slate-400">Adopted NEC edition</div>
        <div className="mt-1 text-3xl font-bold text-slate-900">{local ? "No statewide adoption" : `${s.nec} NEC`}</div>
        <p className="mt-2 text-sm text-slate-600">
          {local
            ? `${s.name} does not adopt the NEC statewide — individual cities and counties set their own electrical code, so confirm the enforced edition with your local building department.`
            : `${s.name} currently enforces the ${s.nec} edition of the National Electrical Code (NFPA 70) for new electrical work. Major cities may amend it, so confirm with your local AHJ.`}
        </p>
      </div>

      <p className="mt-6 max-w-2xl text-slate-600">
        Whatever edition applies, the core conductor ampacities (Table 310.16), voltage-drop method
        (Chapter 9, Table 8) and conduit-fill limits are stable across recent NEC cycles. Size your
        {" "}{s.name} circuits with these calculators:
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {CALCS.filter((c) => c.component !== "ampacity-chart").map((c) => (
          <Link key={c.slug} href={`/calculators/${c.slug}`}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-blue-300">
            <div className="font-semibold text-slate-900">{c.title}</div>
            <p className="mt-1 text-sm text-slate-500">{c.code}</p>
          </Link>
        ))}
      </div>

      <p className="mt-6 text-xs text-slate-400">
        Adoption status reflects statewide tracking and can change; always verify the enforced edition
        with your Authority Having Jurisdiction.
      </p>
    </>
  );
}
