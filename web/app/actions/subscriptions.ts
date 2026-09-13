"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import {
  updateSubscriptionStatus,
  createSubscription,
  updateSubscriptionDetails,
  deleteSubscription,
  countTrackedSubscriptions,
} from "@/lib/user-subscriptions";
import { PAYMENTS_ENABLED } from "@/lib/billing-config";
import type { SubscriptionStatus, Frequency } from "@/lib/types";

const FREE_PLAN_SUBSCRIPTION_LIMIT = 5;

export async function updateSubscriptionStatusAction(
  id: string,
  status: SubscriptionStatus
): Promise<{ error?: string }> {
  const user = await getCurrentUser();
  if (!user) return { error: "Non connecté." };

  const updated = await updateSubscriptionStatus(user.id, id, status);
  if (!updated) return { error: "Abonnement introuvable." };

  revalidatePath("/dashboard");
  revalidatePath("/abonnements");
  revalidatePath(`/abonnements/${id}`);
  revalidatePath("/calendrier");
  return {};
}

export interface AddSubscriptionState {
  error?: string;
  fieldErrors?: Record<string, string>;
  success?: boolean;
}

const VALID_FREQUENCIES: Frequency[] = ["mensuel", "annuel", "irregulier"];

export async function addSubscriptionAction(
  _prevState: AddSubscriptionState,
  formData: FormData
): Promise<AddSubscriptionState> {
  const user = await getCurrentUser();
  if (!user) return { error: "Non connecté." };

  const name = String(formData.get("name") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const amountRaw = String(formData.get("amount") ?? "").replace(",", ".");
  const amount = Number.parseFloat(amountRaw);
  const frequencyRaw = String(formData.get("frequency") ?? "");
  const frequency = VALID_FREQUENCIES.includes(frequencyRaw as Frequency)
    ? (frequencyRaw as Frequency)
    : "mensuel";
  const nextChargeDate = String(formData.get("nextChargeDate") ?? "");

  const fieldErrors: Record<string, string> = {};
  if (!name) fieldErrors.name = "Requis";
  if (!category) fieldErrors.category = "Requis";
  if (!Number.isFinite(amount) || amount <= 0) fieldErrors.amount = "Montant invalide";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(nextChargeDate)) fieldErrors.nextChargeDate = "Date requise";
  if (Object.keys(fieldErrors).length > 0) return { fieldErrors };

  // Le passage en Pro n'est pas encore disponible (PAYMENTS_ENABLED) : tant
  // que la limite ne peut pas être levée par l'utilisateur lui-même, la
  // bloquer serait une impasse plutôt qu'une vraie limite de plan.
  if (PAYMENTS_ENABLED && user.plan === "gratuit") {
    const trackedCount = await countTrackedSubscriptions(user.id);
    if (trackedCount >= FREE_PLAN_SUBSCRIPTION_LIMIT) {
      return {
        error: `L'offre Gratuite est limitée à ${FREE_PLAN_SUBSCRIPTION_LIMIT} abonnements suivis. Passez en Pro pour en suivre sans limite.`,
      };
    }
  }

  await createSubscription(user.id, { name, category, amount, frequency, nextChargeDate });

  revalidatePath("/dashboard");
  revalidatePath("/abonnements");
  revalidatePath("/calendrier");
  revalidatePath("/onboarding/abonnements");
  return { success: true };
}

export async function updateSubscriptionAction(
  id: string,
  _prevState: AddSubscriptionState,
  formData: FormData
): Promise<AddSubscriptionState> {
  const user = await getCurrentUser();
  if (!user) return { error: "Non connecté." };

  const name = String(formData.get("name") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const amountRaw = String(formData.get("amount") ?? "").replace(",", ".");
  const amount = Number.parseFloat(amountRaw);
  const frequencyRaw = String(formData.get("frequency") ?? "");
  const frequency = VALID_FREQUENCIES.includes(frequencyRaw as Frequency)
    ? (frequencyRaw as Frequency)
    : "mensuel";
  const nextChargeDate = String(formData.get("nextChargeDate") ?? "");

  const fieldErrors: Record<string, string> = {};
  if (!name) fieldErrors.name = "Requis";
  if (!category) fieldErrors.category = "Requis";
  if (!Number.isFinite(amount) || amount <= 0) fieldErrors.amount = "Montant invalide";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(nextChargeDate)) fieldErrors.nextChargeDate = "Date requise";
  if (Object.keys(fieldErrors).length > 0) return { fieldErrors };

  const updated = await updateSubscriptionDetails(user.id, id, {
    name,
    category,
    amount,
    frequency,
    nextChargeDate,
  });
  if (!updated) return { error: "Abonnement introuvable." };

  revalidatePath("/dashboard");
  revalidatePath("/abonnements");
  revalidatePath(`/abonnements/${id}`);
  revalidatePath("/calendrier");
  return { success: true };
}

export async function deleteSubscriptionAction(id: string): Promise<{ error?: string }> {
  const user = await getCurrentUser();
  if (!user) return { error: "Non connecté." };

  const deleted = await deleteSubscription(user.id, id);
  if (!deleted) return { error: "Abonnement introuvable." };

  revalidatePath("/dashboard");
  revalidatePath("/abonnements");
  revalidatePath("/calendrier");
  return {};
}
