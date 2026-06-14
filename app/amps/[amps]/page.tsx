import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sizeLabel } from "@/lib/nec-conductors";
import { sizeWire } from "@/lib/wire-size";
import { AMP_TARGETS } from "@/lib/wire-pages";
import { SITE } from "@/lib/site";
import { ResultCard, Stat } from "@/components/ui";

export function generateStaticParams() {
  return AMP_TARGETS.map((a) => ({ amps: String(a) }));
}

export async function generateMetadata({ params }: { params: Promise<{ amps: string }> }): Promise<Metadata> {
  const { amps } = await params;
  const n = Number(amps);
  if (!AMP_TARGETS.includes(n)) return {};
  return {
    title: `What Size Wire for ${n} Amps? (NEC Copper & Aluminum)`,
    description: `The correct copper and aluminum wire size for a ${n} amp circuit per NEC Table 310.16, plus the breaker and ground wire.`,
    alternates: { canonical: `${SITE.url}/amps/${n}` },
  };
}

export default async function AmpPage({ params }: { params: Promise<{ amps: string }> }) {
  const { amps } = await params;
  const n = Number(amps);
  if (!AMP_TARGETS.includes(n)) notFound();

  const cu = sizeWire({ loadAmps: n, material: "cu", tempRating: 75 });
  const al = sizeWire({ loadAmps: n, material: "al", tempRating: 75 });

  return (
    <>
      <nav className="mb-4 text-sm text-slate-500">
        <Link href="/wire" className="hover:text-slate-900">Wire sizes</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700">{n} amps</span>
      </nav>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">What size wire for {n} amps?</h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        On standard 75°C terminals, a {n} A circuit needs{" "}
        <strong>{cu.size ? `${sizeLabel(cu.size)} copper` : "a parallel run"}</strong>
        {al.size && <> or <strong>{sizeLabel(al.size)} aluminum</strong></>}. The values below come straight
        from NEC Table 310.16, with the breaker from 240.6(A) and the ground from Table 250.122.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {[{ m: "Copper", r: cu }, { m: "Aluminum", r: al }].map(({ m, r }) => (
          <ResultCard key={m}>
            <div className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">{m}</div>
            {r.size ? (
              <div className="grid grid-cols-2 gap-4">
                <Stat label="Wire size" value={sizeLabel(r.size)} big />
                <Stat label="Breaker" value={`${r.ocpd} A`} big />
                <Stat label="Ampacity" value={`${r.ampacity} A`} sub="at 75°C, 30°C ambient" />
                <Stat label="Ground (250.122)" value={sizeLabel(r.egc!)} />
              </div>
            ) : (
              <p className="text-sm text-slate-500">{r.note}</p>
            )}
          </ResultCard>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        These are the minimum sizes by ampacity at a 30°C ambient. On long runs, voltage drop can force a
        larger conductor — check yours with the{" "}
        <Link href="/calculators/voltage-drop-calculator" className="font-medium underline">voltage drop calculator</Link>.
        In hot or crowded raceways, derate with the{" "}
        <Link href="/calculators/wire-size-calculator" className="font-medium underline">wire size calculator</Link>.
      </div>

      <section className="mt-8">
        <h2 className="text-base font-semibold text-slate-800">Other common circuits</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {AMP_TARGETS.filter((a) => a !== n).map((a) => (
            <Link key={a} href={`/amps/${a}`} className="rounded-full border border-slate-300 bg-white px-3 py-1 text-sm text-slate-700 hover:border-blue-400 hover:text-blue-700">{a} amps</Link>
          ))}
        </div>
      </section>
    </>
  );
}
