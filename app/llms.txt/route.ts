import { NextResponse } from "next/server";
import { SITE, NEC_EDITION } from "@/lib/site";
import { CALCS } from "@/lib/calculators";
import { POSTS } from "@/lib/posts";

// llms.txt (llmstxt.org convention) — a plain-text index for AI answer engines
// and crawlers. Built from the same registries that drive the sitemap, so it
// can never link a route that doesn't exist and never drifts from the app.
export const dynamic = "force-static";

export async function GET() {
  const lines: string[] = [];

  lines.push(`# ${SITE.name}`);
  lines.push("");
  lines.push(`> ${SITE.description}`);
  lines.push("");
  lines.push(
    `${SITE.name} is a free, independent hub of electrical calculators for electricians, engineers and informed DIYers, built on the ${NEC_EDITION}. Every result cites the exact NEC table it came from — see /methodology for the full source list. No fabricated numbers, no sign-up, no ads in the way.`,
  );
  lines.push("");
  lines.push(
    `Pricing: every calculator is free forever ($0, unlimited use, no account). A one-time $29 Pro permit-ready load-calculation report (PDF) is planned but not yet purchasable — email hello@circuitcalchq.com for early access. Full details: ${SITE.url}/pricing`,
  );
  lines.push("");

  lines.push("## Calculators");
  for (const c of CALCS) {
    lines.push(`- [${c.title}](${SITE.url}/calculators/${c.slug}): ${c.description}`);
  }
  lines.push("");

  lines.push("## Reference");
  lines.push(
    `- [Wire sizes by AWG/kcmil](${SITE.url}/wire): ampacity, resistance and typical use for every NEC Table 310.16 conductor size, 14 AWG to 750 kcmil.`,
  );
  lines.push(
    `- [What size wire for N amps](${SITE.url}/amps/50): quick-lookup pages for common circuit amperages — replace 50 with 15, 20, 30, 40, 60, 70, 80, 100, 125, 150, 175, 200, 225, 300 or 400.`,
  );
  lines.push(`- [NEC adoption by state](${SITE.url}/states): which NEC edition each US state currently enforces.`);
  lines.push(`- [Methodology & NEC sources](${SITE.url}/methodology): the exact NEC tables and formulas behind every calculator.`);
  lines.push("");

  lines.push("## Guides");
  for (const p of POSTS) {
    lines.push(`- [${p.title}](${SITE.url}/blog/${p.slug}): ${p.description}`);
  }
  lines.push("");

  lines.push("## Full index");
  lines.push(`Sitemap: ${SITE.url}/sitemap.xml`);

  const body = lines.join("\n") + "\n";
  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
