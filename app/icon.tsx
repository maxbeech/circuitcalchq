import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Brand favicon — lightning bolt on the CircuitCalc blue.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", alignItems: "center",
          justifyContent: "center", background: "#2563eb", color: "white",
          fontSize: 22, borderRadius: 7,
        }}
      >
        ⚡
      </div>
    ),
    { ...size },
  );
}
