import { NextResponse } from "next/server";
import { env } from "~/env.js";

const ADMIN_TOKEN_COOKIE = "ADMIN_TOKEN";
const ADMIN_UI_COOKIE = "admin";

export const runtime = "nodejs";

function isProduction(): boolean {
  return env.NODE_ENV === "production";
}

function clearAuthCookies(res: NextResponse): void {
  const cookieBase = {
    path: "/",
    sameSite: "lax" as const,
    secure: isProduction(),
  };
  res.cookies.set(ADMIN_TOKEN_COOKIE, "", { ...cookieBase, httpOnly: true, maxAge: 0 });
  res.cookies.set(ADMIN_UI_COOKIE, "", { ...cookieBase, httpOnly: false, maxAge: 0 });
}

export async function POST() {
  const res = NextResponse.json({ ok: true }, { status: 200 });
  clearAuthCookies(res);
  return res;
}


