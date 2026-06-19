import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CALCS, getCalc, type CalcComponent } from "@/lib/calculators";
import { SITE, breadcrumbLd } from "@/lib/site";
import { CodeBadge } from "@/components/ui";
import VoltageDropCalculator from "@/components/VoltageDropCalculator";
import WireSizeCalculator from "@/components/WireSizeCalculator";
import ConduitFillCalculator from "@/components/ConduitFillCalculator";
import BoxFillCalculator from "@/components/BoxFillCalculator";
import LoadCalculator from "@/components/LoadCalculator";
import AmpacityTable from "@/components/AmpacityTable";
import PowerCalculator from "@/components/PowerCalculator";
import OhmsLawCalculator from "@/components/OhmsLawCalculator";

export function generateStaticParams() {
  return CALCS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCalc(slug);
  if (!c) return {};
  return {
    title: c.metaTitle,
    description: c.description,
    alternates: { canonical: `${SITE.url}/calculators/${c.slug}` },
    openGraph: { title: c.metaTitle, description: c.description, url: `${SITE.url}/calculators/${c.slug}` },
  };
}

function renderCalc(component: CalcComponent) {
  switch (component) {
    case "voltage-drop": return <VoltageDropCalculator />;
    case "wire-size": return <WireSizeCalculator />;
    case "conduit-fill": return <ConduitFillCalculator />;
    case "box-fill": return <BoxFillCalculator />;
    case "dwelling-load": return <LoadCalculator />;
    case "ampacity-chart": return <AmpacityTable />;
    case "power": return <PowerCalculator />;
    case "ohms-law": return <OhmsLawCalculator />;
  }
}

export default async function CalcPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCalc(slug);
  if (!c) notFound();

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const crumbLd = breadcrumbLd([
    { name: "Calculators", path: "/calculators" },
    { name: c.title, path: `/calculators/${c.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbLd) }} />

      <nav className="mb-4 text-sm text-slate-500">
        <Link href="/calculators" className="hover:text-slate-900">Calculators</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700">{c.title}</span>
      </nav>

      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{c.title}</h1>
        <CodeBadge>{c.code}</CodeBadge>
      </div>
      <div className="mt-3 space-y-3 text-slate-600">
        {c.intro.map((p, i) => <p key={i}>{p}</p>)}
      </div>

      <div className="mt-6">{renderCalc(c.component)}</div>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-slate-900">Frequently asked questions</h2>
        <div className="mt-4 space-y-4">
          {c.faqs.map((f) => (
            <div key={f.q} className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="font-semibold text-slate-900">{f.q}</h3>
              <p className="mt-1 text-sm text-slate-600">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-slate-900">Related calculators</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {c.related.map((slug) => {
            const rc = getCalc(slug);
            if (!rc) return null;
            return (
              <Link key={slug} href={`/calculators/${slug}`} className="rounded-full border border-slate-300 bg-white px-3 py-1 text-sm text-slate-700 hover:border-blue-400 hover:text-blue-700">
                {rc.title}
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
