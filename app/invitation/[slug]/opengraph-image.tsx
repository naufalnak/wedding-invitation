import { ImageResponse } from "@vercel/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: { slug: string };
}

export default async function OgImage({ params }: Props) {
  // ── Fetch langsung via REST, tidak pakai supabase client ──
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  let guestName = "Tamu Undangan";

  try {
    const res = await fetch(
      `${supabaseUrl}/rest/v1/guests?slug=eq.${params.slug}&select=name&limit=1`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
        cache: "no-store",
      },
    );
    const rows = await res.json();
    if (rows?.[0]?.name) guestName = rows[0].name;
  } catch {
    // fallback ke default
  }

  const brideGroom = "Rizky & Amira";
  const weddingDate = "Sabtu, 14 Juni 2025";
  const location = "Surabaya, Jawa Timur";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1a0a0a",
        fontFamily: "serif",
        position: "relative",
        overflow: "hidden",
      }}>
      {/* Lingkaran dekoratif */}
      <div
        style={{
          position: "absolute",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          border: "1px solid rgba(212,164,14,0.12)",
          top: "-50px",
          left: "250px",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          border: "1px solid rgba(212,164,14,0.18)",
          top: "65px",
          left: "350px",
        }}
      />

      {/* Garis emas atas & bawah */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background:
            "linear-gradient(90deg, transparent, #d4a40e, transparent)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "3px",
          background:
            "linear-gradient(90deg, transparent, #d4a40e, transparent)",
        }}
      />

      {/* Sudut ornamen */}
      <CornerOrnament top={24} left={24} rotate={0} />
      <CornerOrnament top={24} right={24} rotate={90} />
      <CornerOrnament bottom={24} left={24} rotate={270} />
      <CornerOrnament bottom={24} right={24} rotate={180} />

      {/* Konten */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "0 80px",
          gap: "0px",
        }}>
        <p
          style={{
            color: "rgba(212,164,14,0.7)",
            fontSize: "14px",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            margin: "0 0 16px",
            fontFamily: "sans-serif",
          }}>
          Undangan Pernikahan
        </p>

        {/* Divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "24px",
          }}>
          <div
            style={{
              width: "60px",
              height: "1px",
              background: "rgba(212,164,14,0.4)",
            }}
          />
          <div
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#d4a40e",
              opacity: 0.7,
            }}
          />
          <div
            style={{
              width: "60px",
              height: "1px",
              background: "rgba(212,164,14,0.4)",
            }}
          />
        </div>

        <p
          style={{
            color: "rgba(250,245,232,0.6)",
            fontSize: "18px",
            margin: "0 0 8px",
            fontStyle: "italic",
          }}>
          Kepada Yth.
        </p>

        <p
          style={{
            color: "#d4a40e",
            fontSize: guestName.length > 20 ? "40px" : "52px",
            fontWeight: "bold",
            margin: "0 0 4px",
            lineHeight: 1.1,
          }}>
          {guestName}
        </p>

        <p
          style={{
            color: "rgba(250,245,232,0.5)",
            fontSize: "18px",
            margin: "0 0 36px",
            fontStyle: "italic",
          }}>
          &amp; Keluarga
        </p>

        {/* Divider diamond */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "32px",
          }}>
          <div
            style={{
              width: "80px",
              height: "1px",
              background: "rgba(212,164,14,0.3)",
            }}
          />
          <div
            style={{
              width: "8px",
              height: "8px",
              background: "#d4a40e",
              opacity: 0.6,
              transform: "rotate(45deg)",
            }}
          />
          <div
            style={{
              width: "80px",
              height: "1px",
              background: "rgba(212,164,14,0.3)",
            }}
          />
        </div>

        <p
          style={{
            color: "rgba(250,245,232,0.95)",
            fontSize: "48px",
            fontWeight: "bold",
            margin: "0 0 16px",
            letterSpacing: "0.02em",
          }}>
          {brideGroom}
        </p>

        <p
          style={{
            color: "rgba(250,245,232,0.45)",
            fontSize: "16px",
            margin: "0",
            letterSpacing: "0.1em",
            fontFamily: "sans-serif",
          }}>
          {weddingDate} &nbsp;·&nbsp; {location}
        </p>
      </div>

      <p
        style={{
          position: "absolute",
          bottom: "24px",
          right: "60px",
          color: "rgba(212,164,14,0.35)",
          fontSize: "13px",
          fontStyle: "italic",
          fontFamily: "serif",
          margin: 0,
        }}>
        Sugeng rawuh
      </p>
    </div>,
    { ...size },
  );
}

function CornerOrnament({
  top,
  left,
  right,
  bottom,
  rotate = 0,
}: {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  rotate?: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        right,
        bottom,
        width: "48px",
        height: "48px",
        transform: `rotate(${rotate}deg)`,
        opacity: 0.45,
      }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "1px",
          height: "28px",
          backgroundColor: "#d4a40e",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "28px",
          height: "1px",
          backgroundColor: "#d4a40e",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "-2px",
          left: "-2px",
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          backgroundColor: "#d4a40e",
        }}
      />
    </div>
  );
}
