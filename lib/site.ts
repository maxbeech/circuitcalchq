export const SITE = {
  name: "CircuitCalc HQ",
  domain: "circuitcalchq.com",
  // Canonical/OG base. Defaults to the live deployment so canonicals resolve today;
  // set NEXT_PUBLIC_SITE_URL=https://circuitcalchq.com once the domain points to Vercel.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://circuitcalchq.vercel.app",
  tagline: "Free NEC electrical calculators",
  description:
    "Free electrical calculators built on the real National Electrical Code tables — voltage drop, wire size & ampacity, conduit fill, dwelling load and box fill. Copper or aluminum, single- or three-phase, with every number traceable to the NEC.",
};

export const NEC_EDITION = "2023 NEC (NFPA 70)";

// BreadcrumbList JSON-LD — single source for every page with a breadcrumb trail.
export function breadcrumbLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${SITE.url}${t.path}`,
    })),
  };
}
