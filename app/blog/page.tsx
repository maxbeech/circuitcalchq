import type { Metadata } from "next";
import Link from "next/link";
import { POSTS } from "@/lib/posts";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Electrical Guides",
  description: "Plain-English guides to voltage drop, wire sizing, conduit fill and the NEC — written for electricians, engineers and informed DIYers.",
  alternates: { canonical: `${SITE.url}/blog` },
};

export default function Blog() {
  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Electrical guides</h1>
      <p className="mt-2 max-w-2xl text-slate-600">Clear, code-grounded answers to the questions behind the calculators.</p>
      <div className="mt-6 space-y-4">
        {POSTS.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`}
            className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow">
            <h2 className="text-lg font-semibold text-slate-900">{p.title}</h2>
            <p className="mt-1 text-sm text-slate-500">{p.description}</p>
            <div className="mt-2 text-xs text-slate-400">{p.readMins} min read</div>
          </Link>
        ))}
      </div>
    </>
  );
}
