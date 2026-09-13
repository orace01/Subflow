import "server-only";

import { getStripeClient } from "./stripe";

export type PaidPlan = "pro" | "annuel";

/**
 * Prices are passed inline to Stripe (`price_data`) instead of referencing
 * pre-created Price objects — this way, going live only needs an API key and
 * a webhook secret, not a Stripe dashboard product setup to keep in sync
 * with the numbers already on the pricing page.
 */
const PLAN_PRICING: Record<PaidPlan, { label: string; amountCents: number; interval: "month" | "year" }> = {
  pro: { label: "SubFlow Pro", amountCents: 699, interval: "month" },
  annuel: { label: "SubFlow Annuel", amountCents: 5900, interval: "year" },
};

export interface CreateCheckoutParams {
  userId: string;
  email: string;
  stripeCustomerId?: string | null;
  plan: PaidPlan;
  successUrl: string;
  cancelUrl: string;
}

export async function createCheckoutUrl(params: CreateCheckoutParams): Promise<string> {
  const stripe = getStripeClient();
  const pricing = PLAN_PRICING[params.plan];

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: params.stripeCustomerId ?? undefined,
    customer_email: params.stripeCustomerId ? undefined : params.email,
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: { name: pricing.label },
          unit_amount: pricing.amountCents,
          recurring: { interval: pricing.interval },
        },
        quantity: 1,
      },
    ],
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    metadata: { userId: params.userId, plan: params.plan },
    subscription_data: { metadata: { userId: params.userId, plan: params.plan } },
  });

  if (!session.url) throw new Error("Stripe n'a pas renvoyé d'URL de paiement.");
  return session.url;
}
