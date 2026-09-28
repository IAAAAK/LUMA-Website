// Single source of truth for plan numbers and credit maths.
// Numbers come from the pricing table in CLAUDE.md — change them here only.

export type PlanId = "starter" | "pro" | "enterprise";

export const PLANS: Record<PlanId, { monthly: number; credits: number }> = {
  starter: { monthly: 50, credits: 60_000 },
  pro: { monthly: 100, credits: 900_000 },
  enterprise: { monthly: 300, credits: 3_000_000 },
};

export const YEARLY_DISCOUNT = 0.25;

export const CREDITS_PER_AI_MESSAGE = 60;
export const CREDITS_PER_VOICE_MINUTE = 600;
export const CREDITS_PER_OUTBOUND_WHATSAPP = 12;
export const CREDITS_PER_DOLLAR = 10_000;

export const TOP_UP_PACKS = [
  { credits: "200K", price: 20 },
  { credits: "500K", price: 50 },
  { credits: "1M", price: 100 },
  { credits: "2M", price: 200 },
  { credits: "5M", price: 500 },
] as const;

export const CALCULATOR = {
  messages: { min: 0, max: 10_000, step: 100, initial: 500 },
  minutes: { min: 0, max: 500, step: 5, initial: 0 },
} as const;

/** Per-month price shown on the pricing cards, e.g. "$50" or "$37.50". */
export function formatPlanPrice(plan: PlanId, yearly: boolean): string {
  const base = PLANS[plan].monthly;
  const value = yearly ? base * (1 - YEARLY_DISCOUNT) : base;
  return "$" + (Number.isInteger(value) ? String(value) : value.toFixed(2));
}

export function estimateCredits(messages: number, minutes: number) {
  const messageCredits = messages * CREDITS_PER_AI_MESSAGE;
  const voiceCredits = minutes * CREDITS_PER_VOICE_MINUTE;
  return { messageCredits, voiceCredits, total: messageCredits + voiceCredits };
}

export function recommendPlan(totalCredits: number): PlanId {
  if (totalCredits <= PLANS.starter.credits) return "starter";
  if (totalCredits <= PLANS.pro.credits) return "pro";
  return "enterprise";
}

/** Western digits with thousands separators in both languages. */
export function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

export function isPlanId(value: unknown): value is PlanId {
  return value === "starter" || value === "pro" || value === "enterprise";
}
