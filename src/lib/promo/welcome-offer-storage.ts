import { WELCOME70_PROMO_CODE } from "@/lib/promo/welcome70";

const OFFER_KEY = "cheddarz-signup-offer";
const USED_KEY = "cheddarz-welcome70-used";

export type StoredWelcomeOffer = { code: string; expiresAt: number };

export function readWelcomeOfferFromStorage(): StoredWelcomeOffer | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(OFFER_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { code?: string; expiresAt?: number };
    if (parsed.code !== WELCOME70_PROMO_CODE || typeof parsed.expiresAt !== "number") return null;
    if (Date.now() > parsed.expiresAt) return null;
    return { code: parsed.code, expiresAt: parsed.expiresAt };
  } catch {
    return null;
  }
}

export function isWelcome70AlreadyUsed(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(USED_KEY) === "1";
  } catch {
    return false;
  }
}

export function markWelcome70Used(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(USED_KEY, "1");
    localStorage.removeItem(OFFER_KEY);
  } catch {
    // no-op
  }
}
