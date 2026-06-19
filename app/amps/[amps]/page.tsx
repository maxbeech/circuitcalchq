import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sizeLabel, type Material, type TempRating } from "@/lib/nec-conductors";
import { sizeWire } from "@/lib/wire-size";
import { AMP_TARGETS } from "@/lib/wire-pages";
import { SITE, breadcrumbLd } from "@/lib/site";
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
    description: `The correct copper and aluminum wire size for a ${n} amp circuit per NEC Table 310.16 — at both 60°C and 75°C terminals — plus the breaker and ground wire.`,
    alternates: { canonical: `${SITE.url}/amps/${n}` },
    openGraph: {
      title: `What Size Wire for ${n} Amps?`,
      description: `Copper & aluminum wire size for a ${n} A circuit per NEC Table 310.16.`,
      url: `${SITE.url}/amps/${n}`,
    },
  };
}

function wire(n: number, material: Material, temp: TempRating) {
  return sizeWire({ loadAmps: n, material, tempRating: temp }).size;
}

export default async function AmpPage({ params }: { params: Promise<{ amps: string }> }) {
  const { amps } = await params;
  const n = Number(amps);
  if (!AMP_TARGETS.includes(n)) notFound();

  // The NEC default column is 60°C for circuits ≤100 A (110.14(C)(1)); 75°C is
  // permitted when the terminals and conductors are rated for it.
  const defaultCol: TempRating = n <= 100 ? 60 : 75;
  const headline = sizeWire({ loadAmps: n, material: "cu", tempRating: defaultCol });

  const rows: { m: string; mat: Material }[] = [
    { m: "Copper", mat: "cu" },
    { m: "Aluminum", mat: "al" },
  ];

  const crumbLd = breadcrumbLd([
    { name: "Wire sizes", path: "/wire" },
    { name: `${n} amps`, path: `/amps/${n}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbLd) }} />
      <nav className="mb-4 text-sm text-slate-500">
        <Link href="/wire" className="hover:text-slate-900">Wire sizes</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700">{n} amps</span>
      </nav>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">What size wire for {n} amps?</h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        A {n} A circuit needs <strong>{headline.size ? `${sizeLabel(headline.size)} copper` : "a parallel run"}</strong>{" "}
        on {defaultCol}°C-rated terminals
        {n <= 100 && <> — the NEC default for circuits 100 A and under (110.14(C)(1))</>}. The full table below
        shows both terminal ratings, from NEC Table 310.16, with the breaker (240.6(A)) and ground (Table 250.122).
      </p>

      <ResultCard>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-slate-500">
                <th className="px-3 py-2 font-semibold">Conductor</th>
                <th className="px-3 py-2 font-semibold">60°C terminals</th>
                <th className="px-3 py-2 font-semibold">75°C terminals</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ m, mat }) => {
                const c60 = wire(n, mat, 60);
                const c75 = wire(n, mat, 75);
                return (
                  <tr key={m} className="border-b border-slate-100 last:border-0">
                    <td className="px-3 py-2 font-medium text-slate-900">{m}</td>
                    <td className="px-3 py-2 text-slate-700">{c60 ? sizeLabel(c60) : "parallel run"}</td>
                    <td className="px-3 py-2 text-slate-700">{c75 ? sizeLabel(c75) : "parallel run"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
          <Stat label="Breaker / fuse" value={`${headline.ocpd ?? n} A`} />
          <Stat label="Ground (250.122)" value={headline.egc ? sizeLabel(headline.egc) : "—"} />
        </div>
      </ResultCard>

      <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        These are minimum sizes by ampacity at a 30°C ambient. On long runs, voltage drop can force a larger
        conductor — check yours with the{" "}
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
