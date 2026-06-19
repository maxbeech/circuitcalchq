import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} — ${SITE.tagline}`, template: `%s · ${SITE.name}` },
  description: SITE.description,
  openGraph: { title: SITE.name, description: SITE.description, url: SITE.url, siteName: SITE.name, type: "website" },
  twitter: { card: "summary_large_image", title: SITE.name, description: SITE.description },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563eb",
};

function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-5">
        <Link href="/" className="flex items-center gap-2 font-bold text-slate-900">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-blue-600 text-sm text-white">⚡</span>
          CircuitCalc<span className="text-blue-600">HQ</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm text-slate-600 sm:gap-5">
          <Link href="/calculators" className="hover:text-slate-900">Calculators</Link>
          <Link href="/wire" className="hidden hover:text-slate-900 sm:inline">Wire sizes</Link>
          <Link href="/blog" className="hover:text-slate-900">Guides</Link>
          <Link href="/pricing" className="rounded-lg bg-slate-900 px-3 py-1.5 font-medium text-white hover:bg-slate-700">Pro</Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-100">
      <div className="mx-auto max-w-5xl px-5 py-8 text-sm text-slate-500">
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/calculators/voltage-drop-calculator" className="hover:text-slate-900">Voltage drop</Link>
          <Link href="/calculators/wire-size-calculator" className="hover:text-slate-900">Wire size</Link>
          <Link href="/calculators/conduit-fill-calculator" className="hover:text-slate-900">Conduit fill</Link>
          <Link href="/calculators/electrical-load-calculator" className="hover:text-slate-900">Load calc</Link>
          <Link href="/calculators/box-fill-calculator" className="hover:text-slate-900">Box fill</Link>
          <Link href="/calculators/watts-to-amps-calculator" className="hover:text-slate-900">Watts to amps</Link>
          <Link href="/calculators/ohms-law-calculator" className="hover:text-slate-900">Ohm&apos;s law</Link>
          <Link href="/calculators/wire-ampacity-chart" className="hover:text-slate-900">Ampacity chart</Link>
          <Link href="/states" className="hover:text-slate-900">NEC by state</Link>
          <Link href="/methodology" className="hover:text-slate-900">Methodology</Link>
        </div>
        <p className="mt-4 max-w-2xl text-xs text-slate-500">
          {SITE.name} computes results directly from the published National Electrical Code tables
          (NFPA 70). It is a planning aid for electricians, engineers and informed DIYers — local
          amendments vary, so always confirm sizing and methods with your Authority Having
          Jurisdiction before you wire. © {new Date().getFullYear()} {SITE.name}.
        </p>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <Header />
        <main className="mx-auto max-w-5xl px-5 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
