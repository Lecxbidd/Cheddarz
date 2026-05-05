import type { MockProduct } from "@/data/mock-products";
import type { Product, ProductCategory } from "@/types/product";

function defaultSizes(category: ProductCategory): string[] {
  if (
    category === "kids_wear" ||
    category === "boys_wears" ||
    category === "girls_wear"
  ) {
    return ["2T", "3T", "4T", "5T", "6"];
  }
  return ["XS", "S", "M", "L", "XL", "XXL"];
}

export function productFromMock(product: MockProduct): Product {
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    description: product.description,
    price_cents: Math.round(product.price * 100),
    currency: "USD",
    category: product.category,
    sizes: defaultSizes(product.category),
    image_url: product.imageUrl,
    featured: product.isFeatured,
    is_new_arrival: false,
    is_best_seller: false,
    stock: 100,
  };
}
