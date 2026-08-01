import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "Tenant Care Solution";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#10453A",
          color: "#F6F4EF",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#C3E04B", marginBottom: 24 }}>
          Tenant Care Solution
        </div>
        <div style={{ display: "flex", fontSize: 56, fontWeight: 700, maxWidth: 900, lineHeight: 1.15 }}>
          {title.replace(/\+/g, " ")}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
