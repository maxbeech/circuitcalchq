// Data for the programmatic /amps/[n] ("wire size for N amps") and /wire/[gauge]
// reference pages. Common-use notes are practical, NEC-grounded descriptions.

// Common amperage targets people search "what size wire for ___ amps".
export const AMP_TARGETS = [15, 20, 30, 40, 50, 60, 70, 80, 100, 125, 150, 175, 200, 225, 300, 400];

// Typical applications by conductor size (copper branch/feeder usage).
export const GAUGE_USE: Record<string, string> = {
  "14": "15 A lighting and general-purpose receptacle circuits.",
  "12": "20 A kitchen, bathroom and garage receptacle circuits.",
  "10": "30 A electric dryers, water heaters and small A/C condensers.",
  "8": "40–50 A ranges, sub-feeds and larger A/C units.",
  "6": "55–65 A ranges, hot tubs and 60 A sub-panels.",
  "4": "70–85 A feeders and 100 A aluminum sub-panels.",
  "3": "85–100 A copper feeders.",
  "2": "95–115 A feeders and 100 A aluminum services.",
  "1": "110–130 A feeders and sub-panels.",
  "1/0": "125–150 A feeders; common copper 150 A service conductor.",
  "2/0": "145–175 A feeders and sub-panels.",
  "3/0": "165–200 A feeders; common aluminum 200 A service (with 4/0 Al).",
  "4/0": "195–230 A; the classic copper 200 A service conductor.",
  "250": "215–255 A feeders and services.",
  "300": "240–285 A feeders and services.",
  "350": "260–310 A feeders; common aluminum 300 A service.",
  "400": "280–335 A large feeders and services.",
  "500": "320–380 A large feeders and services.",
  "600": "350–420 A; often run in parallel for larger services.",
  "750": "400–475 A; typically run in parallel sets.",
};

export function gaugeSlug(size: string): string {
  return size.replace("/", "-"); // "1/0" -> "1-0"
}
export function gaugeFromSlug(slug: string): string {
  return slug.replace("-", "/");
}
