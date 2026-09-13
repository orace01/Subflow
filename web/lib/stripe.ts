import "server-only";

import Stripe from "stripe";

let client: Stripe | null = null;

export function getStripeClient(): Stripe {
  if (client) return client;
  const apiKey = process.env.STRIPE_SECRET_KEY;
  if (!apiKey) {
    throw new Error("STRIPE_SECRET_KEY manquant : impossible de contacter Stripe.");
  }
  client = new Stripe(apiKey);
  return client;
}
