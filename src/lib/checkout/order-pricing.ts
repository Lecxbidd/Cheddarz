import { MOCK_PRODUCTS } from "@/data/mock-products";
import { productFromMock } from "@/lib/product-from-mock";
import { createClient } from "@/lib/supabase/server";

export type CartItemInput = { id: string; quantity: number };

export async function computeCartTotalCents(
  items: CartItemInput[]
): Promise<{ ok: true; totalCents: number } | { ok: false; error: string }> {
  if (!items.length) {
    return { ok: false, error: "Cart is empty" };
  }

  let totalCents = 0;

  for (const line of items) {
    const qtyRequested = Math.max(1, Math.floor(Number(line.quantity) || 1));

    const mock = MOCK_PRODUCTS.find((m) => m.id === line.id);
    if (mock) {
      const p = productFromMock(mock);
      const qty = Math.min(qtyRequested, Math.max(p.stock, 1));
      totalCents += p.price_cents * qty;
      continue;
    }

    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      try {
        const supabase = await createClient();
        const { data, error } = await supabase
          .from("products")
          .select("price_cents,stock")
          .eq("id", line.id)
          .maybeSingle();

        if (!error && data && typeof data.price_cents === "number") {
          const stock =
            typeof data.stock === "number" && Number.isFinite(data.stock) ? data.stock : 100;
          const qty = Math.min(qtyRequested, Math.max(stock, 1));
          totalCents += data.price_cents * qty;
          continue;
        }
      } catch {
        /* ignore */
      }
    }

    return { ok: false, error: `Unknown product: ${line.id}` };
  }

  if (totalCents < 50) {
    return {
      ok: false,
      error: "Card payments require a total of at least $0.50 USD. Add another item or use Pay on delivery.",
    };
  }

  return { ok: true, totalCents };
}
