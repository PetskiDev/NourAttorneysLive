import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { env } from "~/env.js";

const ADMIN_TOKEN_COOKIE = "ADMIN_TOKEN";

const ALLOWLIST = new Set<string>([
  "/api/admin/login",
  "/api/admin/logout",
  "/api/services",
]);

async function verifyToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    await jwtVerify(token, new TextEncoder().encode(env.JWT_SECRET));
    return true;
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Handle API routes (respond with 401 JSON if unauthorized)
  if (pathname.startsWith("/api")) {
    return handleApiAuth(req);
  }

  // Handle Admin pages (redirect to /admin/login if unauthorized)
  if (pathname.startsWith("/admin")) {
    return handleAdminGuard(req);
  }

  // Not an API or Admin route
  return NextResponse.next();
}

async function handleApiAuth(req: NextRequest): Promise<NextResponse> {
  const { pathname } = req.nextUrl;

  if (req.method === "OPTIONS") {
    console.info(`[api-auth] allow OPTIONS ${req.method} ${pathname}`);
    return NextResponse.next();
  }

  if (ALLOWLIST.has(pathname)) {
    console.info(`[api-auth] allow allowlist ${req.method} ${pathname}`);
    return NextResponse.next();
  }

  const token = req.cookies.get(ADMIN_TOKEN_COOKIE)?.value;
  const ok = await verifyToken(token);
  if (ok) {
    console.info(`[api-auth] allow token ${req.method} ${pathname}`);
    return NextResponse.next();
  }

  console.warn(`[api-auth] deny unauthorized ${req.method} ${pathname}`);
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

async function handleAdminGuard(req: NextRequest): Promise<NextResponse> {
  const { pathname } = req.nextUrl;
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = req.cookies.get(ADMIN_TOKEN_COOKIE)?.value;
  const ok = await verifyToken(token);
  if (!ok) {
    const loginUrl = new URL("/admin/login", req.url);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/admin/:path*"],
};


