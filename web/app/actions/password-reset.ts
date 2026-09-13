"use server";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { hashPassword, getBaseUrl } from "@/lib/auth";
import { createPasswordResetToken, resetPasswordWithToken } from "@/lib/password-reset";
import { sendPasswordResetEmail } from "@/lib/email";

export interface RequestResetState {
  success?: boolean;
  error?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function requestPasswordResetAction(
  _prevState: RequestResetState,
  formData: FormData
): Promise<RequestResetState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  if (!EMAIL_RE.test(email)) return { error: "E-mail invalide." };

  const user = await db.user.findUnique({ where: { email } });

  // Always report success, whether or not the account exists — otherwise
  // this form becomes an account-enumeration oracle.
  if (user) {
    const rawToken = await createPasswordResetToken(user.id);
    if (rawToken) {
      const baseUrl = await getBaseUrl();
      const resetUrl = `${baseUrl}/reinitialiser-mot-de-passe?token=${rawToken}`;
      try {
        await sendPasswordResetEmail(user.email, user.firstName, resetUrl);
      } catch (err) {
        console.error("password reset e-mail failed:", err);
        return { error: "L'envoi de l'e-mail a échoué. Réessayez dans quelques instants." };
      }
    }
  }

  return { success: true };
}

export interface ResetPasswordState {
  error?: string;
  fieldErrors?: Record<string, string>;
}

export async function resetPasswordAction(
  _prevState: ResetPasswordState,
  formData: FormData
): Promise<ResetPasswordState> {
  const token = String(formData.get("token") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!token) return { error: "Lien invalide." };
  if (password.length < 8) return { fieldErrors: { password: "8 caractères minimum" } };

  const passwordHash = await hashPassword(password);
  const ok = await resetPasswordWithToken(token, passwordHash);
  if (!ok) return { error: "Ce lien a expiré ou a déjà été utilisé. Demandez-en un nouveau." };

  redirect("/connexion?reset=1");
}
