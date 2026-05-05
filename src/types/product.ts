export type ProductCategory =
  | "kids_wear"
  | "boys_wears"
  | "girls_wear"
  | "ladies_wear"
  | "men_wear"
  | "adult_wear"
  | "street_wear"
  | "professional_wear";

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price_cents: number;
  currency: string;
  category: ProductCategory;
  sizes: string[] | null;
  image_url: string;
  featured: boolean;
  is_new_arrival: boolean;
  is_best_seller: boolean;
  stock: number;
};

export type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  phone: string | null;
  gender: string | null;
  avatar_url: string | null;
  address_line1: string | null;
  city: string | null;
  country: string | null;
  postal_code: string | null;
  updated_at: string | null;
};
