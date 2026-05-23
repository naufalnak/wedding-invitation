import { NextRequest, NextResponse } from "next/server";

const PROTECTED = "/checkin";
const LOGIN = "/checkin/login";
const COOKIE = "checkin_session";
const SECRET = "authenticated";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Hanya proteksi /checkin, bukan /checkin/login
  if (!pathname.startsWith(PROTECTED) || pathname.startsWith(LOGIN)) {
    return NextResponse.next();
  }

  const session = request.cookies.get(COOKIE)?.value;

  if (session === SECRET) {
    return NextResponse.next();
  }

  // Belum login → redirect ke halaman login
  const loginUrl = new URL(LOGIN, request.url);
  loginUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/checkin", "/checkin/:path*"],
};
