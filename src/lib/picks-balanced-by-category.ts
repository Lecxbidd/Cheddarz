import "server-only";
import { CLOTHING_CATEGORIES, type MockProduct } from "@/data/mock-products";

/** Round-robin picks so carousel slides mirror real category inventory (correct imagery per category). */
export function picksBalancedByCategory(products: MockProduct[], target = 14): MockProduct[] {
  const seen = new Set<string>();
  const picks: MockProduct[] = [];
  const byCategory = new Map<string, MockProduct[]>();

  for (const cat of CLOTHING_CATEGORIES) {
    byCategory.set(cat, []);
  }
  for (const product of products) {
    const bucket = byCategory.get(product.category);
    if (bucket) bucket.push(product);
  }

  let round = 0;
  while (picks.length < target && round < 24) {
    for (const cat of CLOTHING_CATEGORIES) {
      const row = byCategory.get(cat) ?? [];
      const item = row[round];
      if (item && !seen.has(item.id)) {
        seen.add(item.id);
        picks.push(item);
      }
      if (picks.length >= target) break;
    }
    round++;
  }
  return picks.length >= Math.min(6, products.length) ? picks : products.slice(0, target);
}
