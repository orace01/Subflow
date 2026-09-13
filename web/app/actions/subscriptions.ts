"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { updateSubscriptionStatus, createSubscription } from "@/lib/user-subscriptions";
import type { SubscriptionStatus, Frequency } from "@/lib/types";

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

  await createSubscription(user.id, { name, category, amount, frequency, nextChargeDate });

  revalidatePath("/dashboard");
  revalidatePath("/abonnements");
  revalidatePath("/calendrier");
  revalidatePath("/onboarding/abonnements");
  return { success: true };
}
