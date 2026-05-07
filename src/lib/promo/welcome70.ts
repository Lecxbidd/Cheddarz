/** Welcome promo shown after signup; keep in sync with signup-offer popup. */
export const WELCOME70_PROMO_CODE = "WELCOME70";

/** 70% off subtotal (customer pays 30%). */
export function welcome70DiscountCents(subtotalCents: number): number {
  if (subtotalCents <= 0) return 0;
  return Math.round(subtotalCents * 0.7);
}

export function welcome70TotalCents(subtotalCents: number): number {
  return Math.max(0, subtotalCents - welcome70DiscountCents(subtotalCents));
}

export function normalizePromoCode(raw: string): string {
  return raw.trim().toUpperCase();
}
