"use server";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { hashPassword, verifyPassword, createSession, destroySession, getCurrentUser, getBaseUrl } from "@/lib/auth";
import { createCheckoutUrl, type PaidPlan } from "@/lib/billing";
import { PAYMENTS_ENABLED } from "@/lib/billing-config";

export interface FormState {
  error?: string;
  fieldErrors?: Record<string, string>;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_PLANS = new Set(["essai", "gratuit", "pro", "annuel"]);

const MAX_LOGIN_ATTEMPTS = 5;
const LOGIN_LOCKOUT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

export async function signupAction(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");
  const planRaw = String(formData.get("plan") ?? "essai");
  const requestedPlan = VALID_PLANS.has(planRaw) ? planRaw : "essai";
  // "pro"/"annuel" are paid — signing up alone never grants them for free.
  // The account starts on the trial (already full-featured) and, for a paid
  // request, would be sent to Checkout to upgrade — paused for now (see
  // PAYMENTS_ENABLED), so it just lands on the trial with an honest notice.
  const isPaidPlanRequest = requestedPlan === "pro" || requestedPlan === "annuel";
  const initialPlan = isPaidPlanRequest ? "essai" : requestedPlan;

  const fieldErrors: Record<string, string> = {};
  if (!firstName) fieldErrors.firstName = "Requis";
  if (!lastName) fieldErrors.lastName = "Requis";
  if (!EMAIL_RE.test(email)) fieldErrors.email = "E-mail invalide";
  if (password.length < 8) fieldErrors.password = "8 caractères minimum";
  if (Object.keys(fieldErrors).length > 0) return { fieldErrors };

  const existing = await db.user.findUnique({ where: { email } });
  if (existing) {
    return { fieldErrors: { email: "Un compte existe déjà avec cet e-mail" } };
  }

  const passwordHash = await hashPassword(password);
  const user = await db.user.create({
    data: { firstName, lastName, email, passwordHash, plan: initialPlan },
  });

  await createSession(user.id);

  if (isPaidPlanRequest) {
    if (!PAYMENTS_ENABLED) {
      redirect("/onboarding/methode?checkout=unavailable");
    }

    const baseUrl = await getBaseUrl();
    let checkoutUrl: string | null = null;
    try {
      checkoutUrl = await createCheckoutUrl({
        userId: user.id,
        email: user.email,
        plan: requestedPlan as PaidPlan,
        successUrl: `${baseUrl}/onboarding/methode?checkout=success`,
        cancelUrl: `${baseUrl}/onboarding/methode?checkout=cancel`,
      });
    } catch (err) {
      // Le compte existe déjà avec l'accès complet de l'essai — on ne
      // bloque pas l'inscription si Stripe est indisponible.
      console.error("stripe checkout at signup failed:", err);
    }
    redirect(checkoutUrl ?? "/onboarding/methode?checkout=error");
  }

  redirect("/onboarding/methode");
}

/**
 * Sliding-window lockout keyed by the submitted e-mail (not the user id, so
 * a wrong e-mail still counts — this blocks both password-guessing on a
 * known account and account-enumeration-by-timing). Purely local (a
 * `LoginAttempt` row per failure), no external service needed.
 */
async function isLockedOut(email: string): Promise<boolean> {
  const since = new Date(Date.now() - LOGIN_LOCKOUT_WINDOW_MS);
  const recentFailures = await db.loginAttempt.count({
    where: { email, createdAt: { gte: since } },
  });
  return recentFailures >= MAX_LOGIN_ATTEMPTS;
}

export async function loginAction(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Renseignez votre e-mail et votre mot de passe." };
  }

  if (await isLockedOut(email)) {
    return {
      error: "Trop de tentatives. Réessayez dans 15 minutes ou réinitialisez votre mot de passe.",
    };
  }

  const user = await db.user.findUnique({ where: { email } });
  const validPassword = user ? await verifyPassword(password, user.passwordHash) : false;

  if (!user || !validPassword) {
    await db.loginAttempt.create({ data: { email, userId: user?.id } });
    // Volontairement générique : ne pas révéler si l'e-mail existe.
    return { error: "E-mail ou mot de passe incorrect." };
  }

  await db.loginAttempt.deleteMany({ where: { email } });
  await createSession(user.id);
  redirect("/dashboard");
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/");
}

export interface DeleteAccountState {
  error?: string;
}

/**
 * Requires re-entering the password, since deleting the account is
 * irreversible. `onDelete: Cascade` on every `userId` foreign key
 * (sessions, subscriptions + their price history, login attempts, password
 * reset tokens) means a single `user.delete` removes everything.
 */
export async function deleteAccountAction(
  _prevState: DeleteAccountState,
  formData: FormData
): Promise<DeleteAccountState> {
  const user = await getCurrentUser();
  if (!user) return { error: "Non connecté." };

  const password = String(formData.get("password") ?? "");
  const validPassword = await verifyPassword(password, user.passwordHash);
  if (!validPassword) return { error: "Mot de passe incorrect." };

  await db.user.delete({ where: { id: user.id } });
  await destroySession();
  redirect("/");
}

export type DetectionMethod = "manuel" | "automatique";

/**
 * Records the user's choice without redirecting: the client component
 * decides what to show next (the manual-entry step directly, or the
 * maintenance notice for "automatique") based on the returned method,
 * since the two lead to different in-page views, not just different URLs.
 */
export async function chooseMethodAction(
  method: DetectionMethod
): Promise<{ method: DetectionMethod } | { error: string }> {
  const user = await getCurrentUser();
  if (!user) return { error: "Non connecté." };

  await db.user.update({
    where: { id: user.id },
    data: { detectionMethod: method },
  });

  return { method };
}
