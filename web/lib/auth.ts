import "server-only";

import { randomBytes } from "crypto";
import { cache } from "react";
import { cookies, headers } from "next/headers";
import bcrypt from "bcryptjs";
import { db } from "./db";
import type { User } from "@prisma/client";

const SESSION_COOKIE = "subflow_session";
const SESSION_DURATION_MS = 30 * 24 * 60 * 60 * 1000; // 30 days
const BCRYPT_ROUNDS = 12;

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_ROUNDS);
}

export function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Whether the current request reached us over HTTPS. `NODE_ENV` alone is not
 * a safe proxy for this: `next start` (production build) run locally over
 * plain HTTP would otherwise get a `Secure` cookie that browsers silently
 * refuse to store, breaking auth with no visible error. Reverse proxies
 * (Vercel and most hosts) set `x-forwarded-proto`; fall back to the
 * connection's own protocol when there is no proxy in front.
 */
async function isHttpsRequest(): Promise<boolean> {
  const headerList = await headers();
  const forwardedProto = headerList.get("x-forwarded-proto");
  if (forwardedProto) return forwardedProto === "https";
  return headerList.get("x-forwarded-ssl") === "on";
}

/**
 * Creates a session row in the database and sets the httpOnly cookie that
 * points to it. The cookie only ever carries an opaque random token — never
 * the user id or any user data — so a stolen cookie is only useful until the
 * session is revoked server-side (see `destroySession`).
 */
export async function createSession(userId: string): Promise<void> {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  await db.session.create({
    data: { id: token, userId, expiresAt },
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: await isHttpsRequest(),
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

/**
 * Reads the session cookie, resolves the user it points to, and evicts
 * expired sessions. Wrapped in React `cache()` so repeated calls within the
 * same request (layout + page + component) hit the database only once.
 */
export const getCurrentUser = cache(async (): Promise<User | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const session = await db.session.findUnique({
    where: { id: token },
    include: { user: true },
  });

  if (!session) return null;

  if (session.expiresAt < new Date()) {
    await db.session.delete({ where: { id: token } }).catch(() => {});
    return null;
  }

  return session.user;
});

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token) {
    await db.session.delete({ where: { id: token } }).catch(() => {});
  }
  cookieStore.delete(SESSION_COOKIE);
}

export { SESSION_COOKIE };
