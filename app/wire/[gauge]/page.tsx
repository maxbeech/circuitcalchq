import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CONDUCTORS, getConductor, sizeLabel } from "@/lib/nec-conductors";
import { GAUGE_USE, gaugeFromSlug, gaugeSlug } from "@/lib/wire-pages";
import { SITE, breadcrumbLd } from "@/lib/site";
import { ResultCard, Stat } from "@/components/ui";

export function generateStaticParams() {
  return CONDUCTORS.map((c) => ({ gauge: gaugeSlug(c.size) }));
}

export async function generateMetadata({ params }: { params: Promise<{ gauge: string }> }): Promise<Metadata> {
  const { gauge } = await params;
  const c = getConductor(gaugeFromSlug(gauge));
  if (!c) return {};
  const label = sizeLabel(c.size);
  return {
    title: `${label} Wire — Ampacity, Resistance & Uses (NEC)`,
    description: `${label} conductor: NEC Table 310.16 ampacity (${c.amp.cu[1]} A copper, 75°C), resistance ${c.ohm.cu} Ω/kft, ${c.cmil.toLocaleString()} circular mils, and what it's used for.`,
    alternates: { canonical: `${SITE.url}/wire/${gauge}` },
    openGraph: {
      title: `${label} Wire — Ampacity, Resistance & Uses`,
      description: `${label}: NEC ampacity ${c.amp.cu[1]} A copper @75°C, resistance ${c.ohm.cu} Ω/kft.`,
      url: `${SITE.url}/wire/${gauge}`,
    },
  };
}

export default async function GaugePage({ params }: { params: Promise<{ gauge: string }> }) {
  const { gauge } = await params;
  const c = getConductor(gaugeFromSlug(gauge));
  if (!c) notFound();
  const label = sizeLabel(c.size);
  const idx = CONDUCTORS.indexOf(c);
  const neighbours = [CONDUCTORS[idx - 1], CONDUCTORS[idx + 1]].filter(Boolean);

  const crumbLd = breadcrumbLd([
    { name: "Wire sizes", path: "/wire" },
    { name: label, path: `/wire/${gauge}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbLd) }} />
      <nav className="mb-4 text-sm text-slate-500">
        <Link href="/wire" className="hover:text-slate-900">Wire sizes</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700">{label}</span>
      </nav>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{label} wire</h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        {GAUGE_USE[c.size] ? `Typically used for ${GAUGE_USE[c.size].toLowerCase()} ` : ""}
        Here is the full NEC spec for {label} copper and aluminum conductors.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <ResultCard>
          <div className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Ampacity (NEC 310.16)</div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <Stat label="Cu 60°C" value={c.amp.cu[0]} />
            <Stat label="Cu 75°C" value={c.amp.cu[1]} />
            <Stat label="Cu 90°C" value={c.amp.cu[2]} />
            <Stat label="Al 60°C" value={c.amp.al[0] || "—"} />
            <Stat label="Al 75°C" value={c.amp.al[1] || "—"} />
            <Stat label="Al 90°C" value={c.amp.al[2] || "—"} />
          </div>
        </ResultCard>
        <ResultCard>
          <div className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Properties (NEC Ch. 9, Table 8)</div>
          <div className="grid grid-cols-2 gap-4">
            <Stat label="Circular mils" value={c.cmil.toLocaleString()} />
            <Stat label="THHN area" value={`${c.thhn} in²`} />
            <Stat label="Resistance Cu" value={`${c.ohm.cu} Ω/kft`} />
            <Stat label="Resistance Al" value={`${c.ohm.al} Ω/kft`} />
          </div>
        </ResultCard>
      </div>

      <div className="mt-6 rounded-xl border border-slate-200 bg-slate-100 p-4 text-sm text-slate-600">
        Size {label} for your own load and run length with the{" "}
        <Link href="/calculators/wire-size-calculator" className="font-medium text-blue-600 underline">wire size calculator</Link>{" "}
        and check it for voltage drop with the{" "}
        <Link href="/calculators/voltage-drop-calculator" className="font-medium text-blue-600 underline">voltage drop calculator</Link>.
      </div>

      {neighbours.length > 0 && (
        <section className="mt-8">
          <h2 className="text-base font-semibold text-slate-800">Nearby sizes</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {neighbours.map((n) => (
              <Link key={n.size} href={`/wire/${gaugeSlug(n.size)}`} className="rounded-full border border-slate-300 bg-white px-3 py-1 text-sm text-slate-700 hover:border-blue-400 hover:text-blue-700">{sizeLabel(n.size)}</Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
