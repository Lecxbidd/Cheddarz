import type { ProductCategory } from "@/types/product";

export const SITE_NAME = "Cheddar Apparel";

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  children_wears: "Children wears",
  boys_wears: "Boys wears",
  adult_wears: "Adult wears",
  streetwear: "Streetwear",
  casual_wears: "Casual wears",
  accessories: "Accessories",
  other: "Other",
};

export const CATEGORY_ORDER: ProductCategory[] = [
  "children_wears",
  "boys_wears",
  "adult_wears",
  "streetwear",
  "casual_wears",
  "accessories",
  "other",
];

export function formatPrice(cents: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(cents / 100);
}
