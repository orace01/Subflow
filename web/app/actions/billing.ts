"use server";

import { redirect } from "next/navigation";
import { getCurrentUser, getBaseUrl } from "@/lib/auth";
import { createCheckoutUrl, type PaidPlan } from "@/lib/billing";
import { PAYMENTS_ENABLED } from "@/lib/billing-config";

export interface CheckoutState {
  error?: string;
}

export async function createCheckoutSessionAction(plan: PaidPlan): Promise<CheckoutState> {
  const user = await getCurrentUser();
  if (!user) return { error: "Non connecté." };

  if (!PAYMENTS_ENABLED) {
    return { error: "Le paiement en ligne n'est pas encore disponible." };
  }

  const baseUrl = await getBaseUrl();

  let checkoutUrl: string;
  try {
    checkoutUrl = await createCheckoutUrl({
      userId: user.id,
      email: user.email,
      stripeCustomerId: user.stripeCustomerId,
      plan,
      successUrl: `${baseUrl}/parametres?checkout=success`,
      cancelUrl: `${baseUrl}/parametres?checkout=cancel`,
    });
  } catch (err) {
    console.error("stripe checkout error:", err);
    return { error: "Paiement indisponible pour le moment. Réessayez plus tard." };
  }

  redirect(checkoutUrl);
}
