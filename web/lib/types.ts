export type SubscriptionStatus =
  | "actif"
  | "a-verifier"
  | "a-resilier"
  | "en-pause"
  | "ignore";

export type Confidence = "elevee" | "moyenne" | "a-verifier";

export type Frequency = "mensuel" | "annuel" | "irregulier";

export interface PriceChange {
  date: string; // ISO date
  amount: number;
}

export interface Subscription {
  id: string;
  name: string;
  category: string;
  amount: number;
  previousAmount?: number;
  frequency: Frequency;
  nextChargeDate: string; // ISO date, only meaningful when still being charged
  firstDetectedDate: string; // ISO date
  status: SubscriptionStatus;
  confidence: Confidence;
  account: string;
  priceHistory: PriceChange[];
}
