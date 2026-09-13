import { NextResponse, type NextRequest } from "next/server";
import type Stripe from "stripe";
import { getStripeClient } from "@/lib/stripe";
import { db } from "@/lib/db";

/**
 * Stripe posts here directly (not through a Server Action, since it needs a
 * stable public URL it can sign requests against). The raw body is read via
 * `request.text()` — Route Handlers don't auto-parse it — because signature
 * verification needs the exact bytes Stripe signed, not a re-serialized copy.
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !webhookSecret) {
    console.error("stripe webhook: missing signature header or STRIPE_WEBHOOK_SECRET");
    return NextResponse.json({ error: "Webhook non configuré." }, { status: 500 });
  }

  const rawBody = await request.text();

  let stripe: Stripe;
  try {
    stripe = getStripeClient();
  } catch (err) {
    console.error("stripe webhook: Stripe not configured:", err);
    return NextResponse.json({ error: "Webhook non configuré." }, { status: 500 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error("stripe webhook: signature verification failed:", err);
    return NextResponse.json({ error: "Signature invalide." }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      const plan = session.metadata?.plan;
      if (userId && plan) {
        await db.user.update({
          where: { id: userId },
          data: {
            plan,
            stripeCustomerId:
              typeof session.customer === "string" ? session.customer : (session.customer?.id ?? null),
            stripeSubscriptionId:
              typeof session.subscription === "string"
                ? session.subscription
                : (session.subscription?.id ?? null),
          },
        });
      }
      break;
    }
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      await db.user.updateMany({
        where: { stripeSubscriptionId: subscription.id },
        data: { plan: "gratuit", stripeSubscriptionId: null },
      });
      break;
    }
  }

  return NextResponse.json({ received: true });
}
