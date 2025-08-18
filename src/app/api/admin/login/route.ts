import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";
import { SignJWT, jwtVerify } from "jose";
import { env } from "~/env.js";

const ADMIN_TOKEN_COOKIE = "ADMIN_TOKEN";
const ADMIN_UI_COOKIE = "admin"; // value "1" when logged in

export const runtime = "nodejs";

function isProduction(): boolean {
  return env.NODE_ENV === "production";
}

function getJwtSecretKey(): Uint8Array {
  return new TextEncoder().encode(env.JWT_SECRET);
}

function minutesFromEnv(): number {
  const minutes = Number(env.ADMIN_JWT_TTL_MINUTES ?? 120);
  return Number.isFinite(minutes) && minutes > 0 ? minutes : 120;
}

async function createToken(): Promise<string> {
  const nowSeconds = Math.floor(Date.now() / 1000);
  const ttlMinutes = minutesFromEnv();
  const expSeconds = nowSeconds + ttlMinutes * 60;
  const jwt = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt(nowSeconds)
    .setExpirationTime(expSeconds)
    .sign(getJwtSecretKey());
  return jwt;
}

async function verifyToken(token: string | undefined): Promise<
  | { valid: true; iat: number; exp: number }
  | { valid: false; reason: string }
> {
  if (!token) return { valid: false, reason: "missing" };
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    const iat = typeof payload.iat === "number" ? payload.iat : 0;
    const exp = typeof payload.exp === "number" ? payload.exp : 0;
    if (!exp) return { valid: false, reason: "noexp" };
    return { valid: true, iat, exp };
  } catch (e) {
    return { valid: false, reason: "invalid" };
  }
}

function setAuthCookies(res: NextResponse, jwt: string): void {
  const ttlMinutes = minutesFromEnv();
  const maxAge = ttlMinutes * 60; // seconds
  res.cookies.set(ADMIN_TOKEN_COOKIE, jwt, {
    httpOnly: true,
    sameSite: "lax",
    secure: isProduction(),
    path: "/",
    maxAge,
  });
  res.cookies.set(ADMIN_UI_COOKIE, "1", {
    httpOnly: false,
    sameSite: "lax",
    secure: isProduction(),
    path: "/",
    maxAge,
  });
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get(ADMIN_TOKEN_COOKIE)?.value;
  const verification = await verifyToken(token);
  if (!verification.valid) {
    return NextResponse.json({ loggedIn: false }, { status: 200 });
  }
  const nowSeconds = Math.floor(Date.now() / 1000);
  const remainingSec = Math.max(0, verification.exp - nowSeconds);
  return NextResponse.json(
    { loggedIn: true, remainingSec, iat: verification.iat, exp: verification.exp },
    { status: 200 },
  );
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as { password?: string };
  const password = body?.password ?? "";

  const expected = env.ADMIN_PASSWORD;
  // Timing-safe compare via HMAC to equalize length and ensure constant-time
  const secretForHmac = env.JWT_SECRET;
  const hmacGiven = createHmac("sha256", secretForHmac).update(password).digest();
  const hmacExpected = createHmac("sha256", secretForHmac).update(expected).digest();
  const isValid = timingSafeEqual(hmacGiven, hmacExpected);

  if (!isValid) {
    // Small delay to mitigate brute forcing a bit
    await new Promise((r) => setTimeout(r, 300));
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const jwt = await createToken();
  const res = NextResponse.json({ ok: true }, { status: 200 });
  setAuthCookies(res, jwt);
  return res;
}


