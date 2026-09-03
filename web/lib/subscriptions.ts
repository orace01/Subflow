import type { Subscription, SubscriptionStatus } from "./types";

// Demo dataset. In production this is populated by the transaction-analysis
// pipeline (see architecture doc: recurring-payment detection service),
// not hardcoded — this module is the single seam to swap for a real data
// source (API route / database query) without touching any page component.
export const subscriptions: Subscription[] = [
  {
    id: "clouddrive-pro",
    name: "CloudDrive Pro",
    category: "Cloud & Stockage",
    amount: 9.99,
    frequency: "mensuel",
    nextChargeDate: "2026-09-14",
    firstDetectedDate: "2026-02-14",
    status: "actif",
    confidence: "elevee",
    account: "Carte •••• 4471",
    priceHistory: [{ date: "2026-02-14", amount: 9.99 }],
  },
  {
    id: "streamplus",
    name: "StreamPlus",
    category: "Streaming",
    amount: 89.0,
    frequency: "annuel",
    nextChargeDate: "2026-11-02",
    firstDetectedDate: "2025-11-02",
    status: "actif",
    confidence: "moyenne",
    account: "Carte •••• 4471",
    priceHistory: [{ date: "2025-11-02", amount: 89.0 }],
  },
  {
    id: "musicwave",
    name: "MusicWave",
    category: "Streaming",
    amount: 5.99,
    frequency: "mensuel",
    nextChargeDate: "2026-09-18",
    firstDetectedDate: "2025-06-18",
    status: "actif",
    confidence: "elevee",
    account: "Carte •••• 4471",
    priceHistory: [{ date: "2025-06-18", amount: 5.99 }],
  },
  {
    id: "designsuite",
    name: "DesignSuite",
    category: "Productivité",
    amount: 12.99,
    previousAmount: 9.99,
    frequency: "mensuel",
    nextChargeDate: "2026-09-21",
    firstDetectedDate: "2026-03-03",
    status: "a-verifier",
    confidence: "elevee",
    account: "Carte •••• 4471",
    priceHistory: [
      { date: "2026-03-03", amount: 9.99 },
      { date: "2026-08-01", amount: 12.99 },
    ],
  },
  {
    id: "fittrack",
    name: "FitTrack",
    category: "Sport & Bien-être",
    amount: 24.9,
    frequency: "irregulier",
    nextChargeDate: "2026-09-30",
    firstDetectedDate: "2026-01-10",
    status: "en-pause",
    confidence: "moyenne",
    account: "Carte •••• 4471",
    priceHistory: [{ date: "2026-01-10", amount: 24.9 }],
  },
  {
    id: "newsdaily",
    name: "NewsDaily",
    category: "Presse",
    amount: 7.9,
    frequency: "mensuel",
    nextChargeDate: "2026-09-28",
    firstDetectedDate: "2025-09-28",
    status: "a-resilier",
    confidence: "elevee",
    account: "Carte •••• 4471",
    priceHistory: [{ date: "2025-09-28", amount: 7.9 }],
  },
  {
    id: "photovault",
    name: "PhotoVault",
    category: "Cloud & Stockage",
    amount: 4.99,
    frequency: "mensuel",
    nextChargeDate: "2026-09-09",
    firstDetectedDate: "2025-12-09",
    status: "actif",
    confidence: "elevee",
    account: "Carte •••• 4471",
    priceHistory: [{ date: "2025-12-09", amount: 4.99 }],
  },
  {
    id: "writeflow",
    name: "WriteFlow",
    category: "Productivité",
    amount: 8.0,
    frequency: "mensuel",
    nextChargeDate: "2026-09-11",
    firstDetectedDate: "2025-10-11",
    status: "actif",
    confidence: "elevee",
    account: "Carte •••• 4471",
    priceHistory: [{ date: "2025-10-11", amount: 8.0 }],
  },
  {
    id: "taskboard",
    name: "TaskBoard",
    category: "Productivité",
    amount: 6.5,
    frequency: "mensuel",
    nextChargeDate: "2026-09-16",
    firstDetectedDate: "2025-08-16",
    status: "actif",
    confidence: "elevee",
    account: "Carte •••• 4471",
    priceHistory: [{ date: "2025-08-16", amount: 6.5 }],
  },
  {
    id: "vpnshield",
    name: "VPNShield",
    category: "Sécurité",
    amount: 4.49,
    frequency: "mensuel",
    nextChargeDate: "2026-09-24",
    firstDetectedDate: "2025-07-24",
    status: "actif",
    confidence: "elevee",
    account: "Carte •••• 4471",
    priceHistory: [{ date: "2025-07-24", amount: 4.49 }],
  },
  {
    id: "langlearn",
    name: "LangLearn",
    category: "Éducation",
    amount: 13.99,
    frequency: "mensuel",
    nextChargeDate: "2026-09-19",
    firstDetectedDate: "2026-04-19",
    status: "actif",
    confidence: "moyenne",
    account: "Carte •••• 4471",
    priceHistory: [{ date: "2026-04-19", amount: 13.99 }],
  },
  {
    id: "foodbox",
    name: "FoodBox",
    category: "Autres",
    amount: 34.9,
    frequency: "irregulier",
    nextChargeDate: "2026-09-26",
    firstDetectedDate: "2026-06-26",
    status: "a-verifier",
    confidence: "a-verifier",
    account: "Carte •••• 4471",
    priceHistory: [{ date: "2026-06-26", amount: 34.9 }],
  },
];

export function getSubscriptions(): Subscription[] {
  return subscriptions;
}

export function getSubscriptionById(id: string): Subscription | undefined {
  return subscriptions.find((s) => s.id === id);
}

const CHARGING_STATUSES: SubscriptionStatus[] = [
  "actif",
  "a-verifier",
  "a-resilier",
];

/** Monthly-equivalent amount, used for totals and category breakdowns. */
export function monthlyEquivalent(sub: Subscription): number {
  if (sub.frequency === "annuel") return sub.amount / 12;
  return sub.amount;
}

export function isCurrentlyCharging(sub: Subscription): boolean {
  return CHARGING_STATUSES.includes(sub.status);
}

export function computeMonthlyTotal(subs: Subscription[]): number {
  return subs
    .filter(isCurrentlyCharging)
    .reduce((sum, s) => sum + monthlyEquivalent(s), 0);
}

export function computeAnnualEstimate(subs: Subscription[]): number {
  return computeMonthlyTotal(subs) * 12;
}

export interface CategoryTotal {
  category: string;
  amount: number;
}

export function computeCategoryBreakdown(subs: Subscription[]): CategoryTotal[] {
  const byCategory = new Map<string, number>();
  for (const s of subs.filter(isCurrentlyCharging)) {
    byCategory.set(
      s.category,
      (byCategory.get(s.category) ?? 0) + monthlyEquivalent(s)
    );
  }
  return [...byCategory.entries()]
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);
}

export function computeTopSpenders(subs: Subscription[], count = 3): Subscription[] {
  return [...subs.filter(isCurrentlyCharging)]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, count);
}

export function computeStatusCounts(
  subs: Subscription[]
): Record<SubscriptionStatus, number> {
  const counts: Record<SubscriptionStatus, number> = {
    actif: 0,
    "a-verifier": 0,
    "a-resilier": 0,
    "en-pause": 0,
    ignore: 0,
  };
  for (const s of subs) counts[s.status]++;
  return counts;
}

export function computeUpcomingCharges(
  subs: Subscription[],
  count = 6
): Subscription[] {
  return [...subs.filter(isCurrentlyCharging)]
    .sort(
      (a, b) =>
        new Date(a.nextChargeDate).getTime() -
        new Date(b.nextChargeDate).getTime()
    )
    .slice(0, count);
}
