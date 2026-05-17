import { ImageResponse } from "next/og";

import { SITE_NAME_RU } from "@/lib/site";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          background:
            "radial-gradient(circle at top, rgba(196,160,94,0.22), transparent 28%), linear-gradient(135deg, #08111f 0%, #0d1830 50%, #08111f 100%)",
          color: "white",
          padding: 64,
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 24,
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 28,
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div
            style={{
              fontSize: 24,
              letterSpacing: 8,
              textTransform: "uppercase",
              color: "#e2c78f",
            }}
          >
            United Armenian Senate
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 840 }}>
            <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>
              {SITE_NAME_RU}
            </div>
            <div style={{ fontSize: 30, lineHeight: 1.4, color: "rgba(255,255,255,0.75)" }}>
              Международная платформа представительства армян мира
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
