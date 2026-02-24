import crypto from "node:crypto";
import type { Response, NextFunction } from "express";
import { User } from "@repo/db";
import type { AuthRequest } from "./auth.js";

const SESSION_COOKIE = "moonzy_session";
const SESSION_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function getSecret(): string {
  const s = process.env["SESSION_SECRET"];
  if (!s || s.length < 16) {
    throw new Error("SESSION_SECRET must be set and at least 16 characters");
  }
  return s;
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

function verifyPayload(cookieValue: string): string | null {
  const i = cookieValue.lastIndexOf(".");
  if (i === -1) return null;
  const payload = cookieValue.slice(0, i);
  const sig = cookieValue.slice(i + 1);
  if (sign(payload) !== sig) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (typeof data.userId !== "string" || typeof data.exp !== "number") return null;
    if (Date.now() > data.exp) return null;
    return data.userId;
  } catch {
    return null;
  }
}

export function setSessionUserId(res: Response, userId: string): void {
  const exp = Date.now() + SESSION_MAX_AGE_MS;
  const payload = Buffer.from(JSON.stringify({ userId, exp }), "utf8").toString("base64url");
  const value = `${payload}.${sign(payload)}`;
  const isProd = process.env["NODE_ENV"] === "production";
  res.cookie(SESSION_COOKIE, value, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    maxAge: SESSION_MAX_AGE_MS,
    path: "/",
  });
}

export function clearSession(res: Response): void {
  const isProd = process.env["NODE_ENV"] === "production";
  res.clearCookie(SESSION_COOKIE, {
    path: "/",
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
  });
}

export async function loadSession(
  req: AuthRequest,
  _res: Response,
  next: NextFunction
): Promise<void> {
  const raw = req.cookies?.[SESSION_COOKIE];
  if (!raw || typeof raw !== "string") {
    next();
    return;
  }
  const userId = verifyPayload(raw);
  if (!userId) {
    next();
    return;
  }
  try {
    const user = await User.findById(userId).lean();
    if (user) {
      req.user = user as unknown as AuthRequest["user"];
    }
  } catch {
    // ignore
  }
  next();
}
