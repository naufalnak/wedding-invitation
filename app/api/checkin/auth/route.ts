import { NextRequest, NextResponse } from "next/server";

const COOKIE = "checkin_session";
const SECRET = "authenticated";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const password = body.password ?? "";

  const correct = process.env.CHECKIN_PASSWORD;

  if (!correct) {
    return NextResponse.json(
      { error: "Server error: password belum dikonfigurasi." },
      { status: 500 },
    );
  }

  if (password !== correct) {
    // Delay 500ms supaya tidak bisa brute-force terlalu cepat
    await new Promise((r) => setTimeout(r, 500));
    return NextResponse.json(
      { error: "Password salah. Silakan coba lagi." },
      { status: 401 },
    );
  }

  // Password benar → set cookie
  const response = NextResponse.json({ ok: true });

  response.cookies.set(COOKIE, SECRET, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 12, // 12 jam
    path: "/",
  });

  return response;
}

export async function DELETE(request: NextRequest) {
  // Logout — hapus cookie
  const response = NextResponse.json({ ok: true });
  response.cookies.delete(COOKIE);
  return response;
}
