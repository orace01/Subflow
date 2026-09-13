/**
 * Paused on purpose: Stripe was wired up and verified end-to-end (checkout
 * session creation, signed webhook handling), but the product decision is to
 * not use Stripe as the payment aggregator — a different provider may be
 * chosen later. Every call site checks this flag first instead of attempting
 * (and always failing) a real payment call, so "not available yet" reads as
 * a deliberate state rather than a broken integration. No `server-only` here
 * (unlike lib/billing.ts) since client components read this flag too, to
 * decide whether to render an upgrade button at all.
 */
export const PAYMENTS_ENABLED = false;
