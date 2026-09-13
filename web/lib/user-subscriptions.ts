import "server-only";

import { db } from "./db";
import type { Subscription, SubscriptionStatus, Confidence, Frequency } from "./types";
import type { Subscription as PrismaSubscription, PriceChange as PrismaPriceChange } from "@prisma/client";

type SubscriptionRow = PrismaSubscription & { priceHistory: PrismaPriceChange[] };

function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function toSubscription(row: SubscriptionRow): Subscription {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    amount: row.amount,
    previousAmount: row.previousAmount ?? undefined,
    frequency: row.frequency as Frequency,
    nextChargeDate: toIsoDate(row.nextChargeDate),
    firstDetectedDate: toIsoDate(row.firstDetectedDate),
    status: row.status as SubscriptionStatus,
    confidence: row.confidence as Confidence,
    account: row.account,
    priceHistory: [...row.priceHistory]
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .map((p) => ({ date: toIsoDate(p.date), amount: p.amount })),
  };
}

export async function getUserSubscriptions(userId: string): Promise<Subscription[]> {
  const rows = await db.subscription.findMany({
    where: { userId },
    include: { priceHistory: true },
    orderBy: { createdAt: "asc" },
  });
  return rows.map(toSubscription);
}

export async function getUserSubscriptionById(
  userId: string,
  id: string
): Promise<Subscription | null> {
  const row = await db.subscription.findFirst({
    where: { id, userId },
    include: { priceHistory: true },
  });
  return row ? toSubscription(row) : null;
}

export interface NewSubscriptionInput {
  name: string;
  category: string;
  amount: number;
  frequency: Frequency;
  nextChargeDate: string; // ISO date (yyyy-mm-dd)
}

/**
 * Manually-entered subscription: the user is the source of truth, so it
 * starts `actif` with `elevee` confidence — there is nothing to confirm,
 * unlike a (future) automated detection.
 */
export async function createSubscription(
  userId: string,
  input: NewSubscriptionInput
): Promise<Subscription> {
  const nextCharge = new Date(`${input.nextChargeDate}T00:00:00Z`);
  const row = await db.subscription.create({
    data: {
      userId,
      name: input.name,
      category: input.category,
      amount: input.amount,
      frequency: input.frequency,
      nextChargeDate: nextCharge,
      firstDetectedDate: new Date(),
      status: "actif",
      confidence: "elevee",
      account: "Ajouté manuellement",
      priceHistory: {
        create: [{ date: new Date(), amount: input.amount }],
      },
    },
    include: { priceHistory: true },
  });
  return toSubscription(row);
}

const VALID_STATUSES: SubscriptionStatus[] = ["actif", "a-verifier", "a-resilier", "en-pause", "ignore"];

/**
 * Updates a subscription's status, scoped to its owner. The compound
 * `id` + `userId` filter is the ownership check: a session for user A can
 * never touch user B's row, regardless of what id is passed in.
 */
export async function updateSubscriptionStatus(
  userId: string,
  id: string,
  status: string
): Promise<boolean> {
  if (!VALID_STATUSES.includes(status as SubscriptionStatus)) return false;

  const result = await db.subscription.updateMany({
    where: { id, userId },
    data: { status },
  });
  return result.count > 0;
}
