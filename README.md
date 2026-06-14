# CircuitCalc HQ

Free electrical calculators built on the real **National Electrical Code** tables — voltage
drop, wire size & ampacity, conduit fill, dwelling load and box fill. Copper or aluminum,
single- or three-phase, with every number traceable to the NEC.

Live: https://circuitcalchq.vercel.app

## Why

NEC calculations are table-heavy, error-prone and permit-required. Electricians, engineers and
informed DIYers do them daily, and the existing free tools are old single-function manufacturer
calculators. CircuitCalc HQ is a fast, modern, SEO-led hub that owns the whole cluster and shows
its work — citing the exact NEC table behind every result.

## What's real here

No fabricated numbers. The engine is driven by values transcribed verbatim from the published NEC:

| Calculator | NEC source |
|---|---|
| Voltage drop | Chapter 9, Table 8 (conductor DC resistance @75°C) |
| Wire size & ampacity | Table 310.16 + 310.15(B)(1)/(C)(1) derating + 240.4(D) |
| Conduit fill | Chapter 9, Tables 1 / 4 / 5 (validated vs Annex C counts) |
| Dwelling load | Article 220 standard method + Table 220.55 |
| Box fill | 314.16(B) + Table 314.16(A) |
| Equipment ground | Table 250.122 |

The engine lives in `lib/` and is covered by `test/electrical.test.mts` — **34 assertions** checking
every value against published NEC tables and worked examples (Annex C conduit counts, Annex D load
example, etc.).

## Stack

Next.js 16 (App Router) · Tailwind CSS 4 · TypeScript · tsx tests. The free calculators are pure
client-side — **no database required**. The Pro tier (permit-ready load report PDF) is an
env-gated Stripe checkout that degrades gracefully when keys are absent.

## SEO surface

~95 static pages: 6 calculator pages, per-amperage "what size wire for N amps", per-AWG wire
reference, per-state NEC adoption (50 states), and 10 guides — plus sitemap, robots and JSON-LD.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm test         # engine tests
npm run lint
```

## Pro tier env (Vercel)

`STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID`, `NEXT_PUBLIC_SITE_URL`. Absent ⇒ the free calculators are
unaffected and checkout returns a friendly "launching shortly" message.

*Planning aid only — the NEC is adopted with local amendments; always verify with your AHJ.*
