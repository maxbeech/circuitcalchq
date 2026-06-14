import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { POSTS, getPost } from "@/lib/posts";
import { SITE } from "@/lib/site";

export const revalidate = 604800; // 1 week — static guide content

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: `${SITE.url}/blog/${p.slug}` },
    openGraph: { title: p.title, description: p.description, type: "article", url: `${SITE.url}/blog/${p.slug}` },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();

  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: p.title,
    description: p.description,
    datePublished: p.date,
    author: { "@type": "Organization", name: SITE.name },
    publisher: { "@type": "Organization", name: SITE.name },
  };

  return (
    <article className="mx-auto max-w-2xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <nav className="mb-4 text-sm text-slate-500">
        <Link href="/blog" className="hover:text-slate-900">Guides</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700">{p.title}</span>
      </nav>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">{p.title}</h1>
      <p className="mt-2 text-slate-500">{p.description}</p>
      <div className="mt-6 space-y-4">
        {p.body.map((b, i) => {
          if (b.type === "h2") return <h2 key={i} className="mt-6 text-xl font-semibold text-slate-900">{b.text}</h2>;
          if (b.type === "ul") return (
            <ul key={i} className="list-disc space-y-1 pl-5 text-slate-700">
              {b.items.map((it, j) => <li key={j}>{it}</li>)}
            </ul>
          );
          return <p key={i} className="text-slate-700">{b.text}</p>;
        })}
      </div>
      <div className="mt-8 rounded-xl border border-slate-200 bg-slate-100 p-4 text-sm text-slate-600">
        Put this into practice with the{" "}
        <Link href="/calculators" className="font-medium text-blue-600 underline">CircuitCalc HQ calculators</Link>.
      </div>
    </article>
  );
}
