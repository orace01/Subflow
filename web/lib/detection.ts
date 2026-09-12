import "server-only";

import { db } from "./db";
import { subscriptions as demoDetectionSeed } from "./subscriptions";

/**
 * Simulates a first detection pass over a newly connected mailbox.
 *
 * Real Gmail/Outlook parsing isn't wired in yet (see README) — until it is,
 * this seeds a realistic set of "detected" subscriptions so the rest of the
 * product (confirmation, dashboard, alerts) has real per-user rows to work
 * with. Every seeded row starts as "a-verifier" (pending), exactly like a
 * real detection would, so the confirmation flow is genuinely doing
 * something rather than editing decorative data.
 *
 * This is the single seam to replace once real parsing exists: same
 * signature, same effect (creates `Subscription` rows for `userId`), just a
 * real extraction pipeline instead of the demo dataset as its source.
 */
export async function seedDetectedSubscriptions(userId: string): Promise<void> {
  const alreadyDetected = await db.subscription.count({ where: { userId } });
  if (alreadyDetected > 0) return;

  await Promise.all(
    demoDetectionSeed.map((demo) =>
      db.subscription.create({
        data: {
          userId,
          name: demo.name,
          category: demo.category,
          amount: demo.amount,
          previousAmount: demo.previousAmount,
          frequency: demo.frequency,
          nextChargeDate: new Date(`${demo.nextChargeDate}T00:00:00Z`),
          firstDetectedDate: new Date(`${demo.firstDetectedDate}T00:00:00Z`),
          status: "a-verifier",
          confidence: demo.confidence,
          account: demo.account,
          priceHistory: {
            create: demo.priceHistory.map((p) => ({
              date: new Date(`${p.date}T00:00:00Z`),
              amount: p.amount,
            })),
          },
        },
      })
    )
  );
}
