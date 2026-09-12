"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { updateSubscriptionStatus } from "@/lib/user-subscriptions";
import type { SubscriptionStatus } from "@/lib/types";

async function setStatus(id: string, status: SubscriptionStatus): Promise<{ error?: string }> {
  const user = await getCurrentUser();
  if (!user) return { error: "Non connecté." };

  const updated = await updateSubscriptionStatus(user.id, id, status);
  if (!updated) return { error: "Abonnement introuvable." };

  revalidatePath("/onboarding/confirmation");
  revalidatePath("/dashboard");
  revalidatePath("/abonnements");
  revalidatePath(`/abonnements/${id}`);
  revalidatePath("/calendrier");
  return {};
}

export async function confirmSubscriptionAction(id: string): Promise<{ error?: string }> {
  return setStatus(id, "actif");
}

export async function ignoreSubscriptionAction(id: string): Promise<{ error?: string }> {
  return setStatus(id, "ignore");
}

export async function updateSubscriptionStatusAction(
  id: string,
  status: SubscriptionStatus
): Promise<{ error?: string }> {
  return setStatus(id, status);
}
