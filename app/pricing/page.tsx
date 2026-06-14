import type { Metadata } from "next";
import Link from "next/link";
import CheckoutButton from "@/components/CheckoutButton";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing — Permit-Ready Load Reports",
  description: "The CircuitCalc HQ calculators are free forever. Upgrade to a permit-ready load-calculation report PDF with full NEC citations for your submittal.",
  alternates: { canonical: `${SITE.url}/pricing` },
};

const freeFeatures = [
  "Voltage drop, wire size & ampacity (NEC 310.16)",
  "Conduit fill for EMT, PVC & rigid",
  "Dwelling load calculator (Article 220)",
  "Box fill & equipment-ground sizing",
  "Unlimited calculations, no account",
];

const proFeatures = [
  "Everything in Free, plus:",
  "Permit-ready PDF: full Article 220 load calculation",
  "Conductor, breaker, conduit & ground schedule",
  "NEC code citations formatted for your submittal",
  "Saved projects you can revise and re-export",
];

export default function Pricing() {
  return (
    <>
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Simple, honest pricing</h1>
        <p className="mx-auto mt-2 max-w-xl text-slate-600">
          The calculators are free forever. When you&apos;re ready to pull a permit, turn your numbers into a
          report the inspector will accept.
        </p>
      </div>

      <div className="mx-auto mt-8 grid max-w-3xl gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-semibold uppercase text-slate-500">Free</div>
          <div className="mt-1 text-3xl font-bold text-slate-900">$0</div>
          <p className="mt-1 text-sm text-slate-500">Every calculator, unlimited</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {freeFeatures.map((f) => (
              <li key={f} className="flex gap-2"><span className="text-emerald-500">✓</span><span>{f}</span></li>
            ))}
          </ul>
          <Link href="/calculators" className="mt-6 block rounded-lg border border-slate-300 px-4 py-2 text-center text-sm font-medium text-slate-700 hover:bg-slate-50">
            Use the calculators
          </Link>
        </div>

        <div className="rounded-2xl border-2 border-blue-300 bg-white p-6 shadow-sm">
          <div className="text-sm font-semibold uppercase text-blue-700">Pro report</div>
          <div className="mt-1 text-3xl font-bold text-slate-900">$29<span className="text-base font-medium text-slate-500"> one-time</span></div>
          <p className="mt-1 text-sm text-slate-500">Permit-ready load-calc PDF</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {proFeatures.map((f) => (
              <li key={f} className="flex gap-2"><span className="text-blue-500">✓</span><span>{f}</span></li>
            ))}
          </ul>
          <div className="mt-6"><CheckoutButton /></div>
        </div>
      </div>

      <section className="mx-auto mt-10 max-w-3xl rounded-2xl border border-slate-200 bg-slate-100 p-6 text-center text-sm text-slate-600">
        <h2 className="text-base font-semibold text-slate-800">Electricians &amp; contractors</h2>
        <p className="mt-2">
          Want bulk load reports, your logo on the PDF, or an API for your estimating workflow? Email{" "}
          <span className="font-medium text-slate-800">hello@circuitcalchq.com</span>.
        </p>
      </section>
    </>
  );
}
