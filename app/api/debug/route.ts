export async function GET() {
  return Response.json({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "KOSONG",
    key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ? "ADA (" +
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.slice(0, 10) +
        "...)"
      : "KOSONG",
    base: process.env.NEXT_PUBLIC_BASE_URL ?? "KOSONG",
  });
}
