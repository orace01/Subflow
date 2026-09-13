import "server-only";

import { randomBytes, createHash } from "crypto";
import { db } from "./db";

const RESET_TOKEN_TTL_MS = 60 * 60 * 1000; // 1 heure
const RESEND_COOLDOWN_MS = 60 * 1000; // évite un double envoi (double clic, etc.)

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

/**
 * Issues a new reset token for a user, unless one was already issued in the
 * last minute (returns null then, so the caller can skip re-sending the
 * e-mail). Only the SHA-256 hash is persisted — the raw token is returned
 * once, to be embedded in the e-mailed link, and is never stored as-is.
 */
export async function createPasswordResetToken(userId: string): Promise<string | null> {
  const recent = await db.passwordResetToken.findFirst({
    where: { userId, createdAt: { gte: new Date(Date.now() - RESEND_COOLDOWN_MS) } },
  });
  if (recent) return null;

  const rawToken = randomBytes(32).toString("hex");
  await db.passwordResetToken.create({
    data: {
      userId,
      tokenHash: hashToken(rawToken),
      expiresAt: new Date(Date.now() + RESET_TOKEN_TTL_MS),
    },
  });
  return rawToken;
}

/**
 * Validates a raw token, applies the new password hash, marks the token
 * used, and revokes every existing session for that user — all in one
 * transaction, since a password reset should not leave a stale session
 * (e.g. on a stolen device) still valid. Returns false for a missing,
 * already-used, or expired token without revealing which.
 */
export async function resetPasswordWithToken(
  rawToken: string,
  newPasswordHash: string
): Promise<boolean> {
  const record = await db.passwordResetToken.findUnique({
    where: { tokenHash: hashToken(rawToken) },
  });
  if (!record || record.usedAt || record.expiresAt < new Date()) return false;

  await db.$transaction([
    db.passwordResetToken.update({ where: { id: record.id }, data: { usedAt: new Date() } }),
    db.user.update({ where: { id: record.userId }, data: { passwordHash: newPasswordHash } }),
    db.session.deleteMany({ where: { userId: record.userId } }),
  ]);
  return true;
}
