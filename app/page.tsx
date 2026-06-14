import Link from "next/link";
import VoltageDropCalculator from "@/components/VoltageDropCalculator";
import { CALCS } from "@/lib/calculators";
import { AMP_TARGETS } from "@/lib/wire-pages";
import { SITE } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE.url}/calculators?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="text-center">
        <h1 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Free electrical calculators, built on the real NEC tables
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-slate-600">
          Voltage drop, wire size, conduit fill, load and box fill — every number traceable to the
          National Electrical Code. No sign-up, no ads in your way.
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Voltage Drop Calculator</h2>
          <Link href="/calculators/voltage-drop-calculator" className="text-sm font-medium text-blue-600 hover:text-blue-800">Open full page →</Link>
        </div>
        <VoltageDropCalculator />
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-slate-900">All calculators</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CALCS.map((c) => (
            <Link key={c.slug} href={`/calculators/${c.slug}`}
              className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-300 hover:shadow">
              <div className="font-semibold text-slate-900 group-hover:text-blue-700">{c.title}</div>
              <p className="mt-1 line-clamp-2 text-sm text-slate-500">{c.description}</p>
              <div className="mt-2 text-xs font-medium text-blue-600">{c.code}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-slate-200 bg-slate-100 p-6">
        <h2 className="text-base font-semibold text-slate-800">Popular: what size wire for…</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {AMP_TARGETS.map((a) => (
            <Link key={a} href={`/amps/${a}`} className="rounded-full border border-slate-300 bg-white px-3 py-1 text-sm text-slate-700 hover:border-blue-400 hover:text-blue-700">
              {a} amps
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-4 sm:grid-cols-3 text-sm">
        <Feature title="Straight from the code" body="Resistances, ampacities and fill limits are transcribed from NEC Chapter 9, Table 310.16 and Article 220 — not approximations." />
        <Feature title="Copper or aluminum" body="Every calculator handles both conductors, plus single-phase, three-phase and DC where it matters." />
        <Feature title="Show your work" body="Each result cites the table it came from, so you can defend it to an inspector or plans examiner." />
      </section>
    </>
  );
}

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="font-semibold text-slate-900">{title}</div>
      <p className="mt-1 text-slate-500">{body}</p>
    </div>
  );
}
