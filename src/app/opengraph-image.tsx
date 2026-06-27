import { ImageResponse } from "next/og";

// Convenção de arquivo do Next: gera automaticamente og:image e twitter:image.
export const runtime = "edge";

export const alt = "RJjstore — Luxury Streetwear";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const SAND = "#E9E1D4";
const ESPRESSO = "#3B2A1E";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: SAND,
          color: ESPRESSO,
          fontFamily: "Georgia, 'Times New Roman', serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 56,
            left: 64,
            fontSize: 26,
            letterSpacing: 11,
            textTransform: "uppercase",
            opacity: 0.7,
          }}
        >
          Luxury Streetwear
        </div>
        <div style={{ fontSize: 132, fontWeight: 600, letterSpacing: -2 }}>
          RJjstore
        </div>
        <div
          style={{
            marginTop: 18,
            fontSize: 34,
            letterSpacing: 2,
            opacity: 0.82,
          }}
        >
          Luxury Streetwear · Curadoria de marca
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 56,
            width: 240,
            height: 2,
            backgroundColor: ESPRESSO,
            opacity: 0.5,
          }}
        />
      </div>
    ),
    { ...size },
  );
}
