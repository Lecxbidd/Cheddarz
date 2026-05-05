import type { Product, ProductCategory } from "@/types/product";
import { createClient } from "@/lib/supabase/server";
import { MOCK_PRODUCTS } from "@/data/mock-products";
import { productFromMock } from "@/lib/product-from-mock";

function mapMockToProduct(): Product[] {
  return MOCK_PRODUCTS.map(productFromMock);
}

function extractProductIdFromSlug(slug: string) {
  const match = slug.match(/-(p-\d{3})$/i);
  return match ? match[1].toLowerCase() : null;
}

export async function getProducts(filters?: {
  category?: ProductCategory | null;
  featured?: boolean;
  is_new_arrival?: boolean;
  is_best_seller?: boolean;
}) {
  const mockProducts = mapMockToProduct();

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return mockProducts.filter((product) => {
      if (filters?.category && product.category !== filters.category) return false;
      if (filters?.featured === true && !product.featured) return false;
      if (filters?.is_new_arrival === true && !product.is_new_arrival) return false;
      if (filters?.is_best_seller === true && !product.is_best_seller) return false;
      return true;
    });
  }

  const supabase = await createClient();

  let query = supabase.from("products").select("*").order("created_at", {
    ascending: false,
  });

  if (filters?.category) {
    query = query.eq("category", filters.category);
  }
  if (filters?.featured === true) {
    query = query.eq("featured", true);
  }
  if (filters?.is_new_arrival === true) {
    query = query.eq("is_new_arrival", true);
  }
  if (filters?.is_best_seller === true) {
    query = query.eq("is_best_seller", true);
  }

  const { data, error } = await query;

  if (error) {
    console.error("getProducts", error.message);
    return mockProducts;
  }

  const supabaseProducts = (data ?? []) as Product[];
  return supabaseProducts.length > 0 ? supabaseProducts : mockProducts;
}

export async function getProductBySlug(slug: string) {
  const mockProduct = mapMockToProduct().find((product) => product.slug === slug) ?? null;

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return mockProduct;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    const missingSlugColumn =
      error.code === "42703" || /column .*slug.* does not exist/i.test(error.message);
    if (missingSlugColumn) {
      // Backward-compatible path for DB schemas without `slug` yet.
      const productId = extractProductIdFromSlug(slug);
      if (productId) {
        const { data: byIdData, error: byIdError } = await supabase
          .from("products")
          .select("*")
          .eq("id", productId)
          .maybeSingle();
        if (!byIdError && byIdData) {
          return byIdData as Product;
        }
      }
      return mockProduct;
    }
    console.error("getProductBySlug", error.message);
    return mockProduct;
  }

  return (data as Product | null) ?? mockProduct;
}
