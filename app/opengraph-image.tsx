import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column",
          justifyContent: "center", padding: "80px", background: "#f8fafc",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: "#2563eb", color: "white",
            fontSize: 38, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>⚡</div>
          <div style={{ display: "flex", fontSize: 44, fontWeight: 800, color: "#0f172a" }}>
            <span>CircuitCalc</span><span style={{ color: "#2563eb" }}>HQ</span>
          </div>
        </div>
        <div style={{ marginTop: 36, fontSize: 58, fontWeight: 800, color: "#0f172a", lineHeight: 1.1, maxWidth: 1000, display: "flex" }}>
          Free electrical calculators, built on the real NEC tables
        </div>
        <div style={{ marginTop: 24, fontSize: 28, color: "#475569", maxWidth: 960, display: "flex" }}>
          Voltage drop · wire size &amp; ampacity · conduit fill · load · box fill
        </div>
      </div>
    ),
    { ...size },
  );
}
