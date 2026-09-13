"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export type AlertToggleKey = "alertBeforeCharge" | "alertPriceHike" | "alertWeeklyDigest";

const VALID_TOGGLE_KEYS: AlertToggleKey[] = [
  "alertBeforeCharge",
  "alertPriceHike",
  "alertWeeklyDigest",
];

export async function toggleAlertAction(
  key: AlertToggleKey,
  value: boolean
): Promise<{ error?: string }> {
  const user = await getCurrentUser();
  if (!user) return { error: "Non connecté." };
  if (!VALID_TOGGLE_KEYS.includes(key)) return { error: "Réglage invalide." };

  await db.user.update({
    where: { id: user.id },
    data: { [key]: value },
  });

  revalidatePath("/alertes");
  return {};
}

const VALID_DELAYS = [1, 3, 7];

export async function setAlertDelayAction(days: number): Promise<{ error?: string }> {
  const user = await getCurrentUser();
  if (!user) return { error: "Non connecté." };
  if (!VALID_DELAYS.includes(days)) return { error: "Délai invalide." };

  await db.user.update({
    where: { id: user.id },
    data: { alertDelayDays: days },
  });

  revalidatePath("/alertes");
  return {};
}
