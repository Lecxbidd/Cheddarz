import type { ProductCategory } from "@/types/product";

export const SITE_NAME = "Cheddar Apparel";

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  kids_wear: "Kids wear",
  boys_wears: "Boys wears",
  girls_wear: "Girls wear",
  ladies_wear: "Ladies wear",
  men_wear: "Men wear",
  adult_wear: "Adult wear",
  street_wear: "Street wear",
  professional_wear: "Professional wear",
};

export const CATEGORY_ORDER: ProductCategory[] = [
  "kids_wear",
  "boys_wears",
  "girls_wear",
  "ladies_wear",
  "men_wear",
  "adult_wear",
  "street_wear",
  "professional_wear",
];

export function formatPrice(cents: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(cents / 100);
}
