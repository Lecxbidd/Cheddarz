-- Cheddar Apparel — run in Supabase SQL Editor

-- Profiles (1:1 with auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  full_name text,
  phone text,
  gender text,
  avatar_url text,
  address_line1 text,
  city text,
  country text,
  postal_code text,
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);

create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

create policy "profiles_delete_own" on public.profiles
  for delete using (auth.uid() = id);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Products
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  price_cents integer not null check (price_cents >= 0),
  currency text not null default 'USD',
  category text not null,
  sizes text[] default '{}'::text[],
  image_url text not null,
  featured boolean default false,
  is_new_arrival boolean default false,
  is_best_seller boolean default false,
  stock integer not null default 0 check (stock >= 0),
  created_at timestamptz default now()
);

create index if not exists products_category_idx on public.products (category);
create index if not exists products_featured_idx on public.products (featured) where featured = true;
create index if not exists products_new_arrival_idx on public.products (is_new_arrival) where is_new_arrival = true;
create index if not exists products_best_seller_idx on public.products (is_best_seller) where is_best_seller = true;

alter table public.products enable row level security;

create policy "products_read_all" on public.products
  for select using (true);

insert into public.products (name, slug, description, price_cents, category, sizes, image_url, featured, is_new_arrival, is_best_seller, stock)
values
  ('Little Fox Knit Set', 'little-fox-knit-set', 'Soft organic cotton knit set for toddlers.', 4800, 'children_wears', '{2T,3T,4T}'::text[], 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80', true, true, true, 40),
  ('Mini Denim Jacket', 'mini-denim-jacket', 'Classic denim jacket, boys sizes.', 6200, 'boys_wears', '{XS,S,M,L}'::text[], 'https://images.unsplash.com/photo-1519238263530-99bdd11df2e7?w=800&q=80', true, true, false, 25),
  ('Studio Oxford Shirt', 'studio-oxford-shirt', 'Crisp oxford cloth, tailored fit.', 8900, 'adult_wears', '{S,M,L,XL}'::text[], 'https://images.unsplash.com/photo-1593032465171-9061a2c82b2a?w=800&q=80', true, false, true, 60),
  ('Urban Cargo Pants', 'urban-cargo-pants', 'Structured cargos with refined taper.', 7400, 'streetwear', '{S,M,L,XL}'::text[], 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80', true, false, true, 35),
  ('Merino Crewneck', 'merino-crewneck', 'Fine merino wool crewneck sweater.', 11200, 'adult_wears', '{S,M,L,XL}'::text[], 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80', false, true, false, 50),
  ('Sunrise Tee Pack', 'sunrise-tee-pack', 'Three-pack essentials tees.', 3900, 'casual_wears', '{S,M,L}'::text[], 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80', false, true, true, 80),
  ('Heritage Wool Coat', 'heritage-wool-coat', 'Double-face wool coat, premium lining.', 28900, 'casual_wears', '{M,L,XL}'::text[], 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80', true, false, false, 15),
  ('River Stripe Polo', 'river-stripe-polo', 'Breathable piqué polo with subtle stripes.', 5900, 'boys_wears', '{XS,S,M,L}'::text[], 'https://images.unsplash.com/photo-1586790170083-2f85cefdb562?w=800&q=80', false, false, false, 45),
  ('Canvas Sneakers', 'canvas-sneakers', 'Minimal canvas sneakers, everyday wear.', 6900, 'accessories', '{7,8,9,10,11}'::text[], 'https://images.unsplash.com/photo-1549298916-b41d281d253a?w=800&q=80', false, false, true, 70),
  ('Rainbow Raincoat', 'rainbow-raincoat', 'Water-resistant jacket for playful days.', 5200, 'children_wears', '{2T,3T,4T,5T}'::text[], 'https://images.unsplash.com/photo-1620799140408-ed534dff763b?w=800&q=80', false, true, false, 30)
on conflict (slug) do nothing;

-- Saved carts (per user)
create table if not exists public.cart_items (
  user_id uuid not null references auth.users (id) on delete cascade,
  product_id uuid not null references public.products (id) on delete cascade,
  quantity integer not null check (quantity > 0),
  updated_at timestamptz default now(),
  primary key (user_id, product_id)
);

alter table public.cart_items enable row level security;

create policy "cart_items_select_own" on public.cart_items
  for select using (auth.uid() = user_id);

create policy "cart_items_insert_own" on public.cart_items
  for insert with check (auth.uid() = user_id);

create policy "cart_items_update_own" on public.cart_items
  for update using (auth.uid() = user_id);

create policy "cart_items_delete_own" on public.cart_items
  for delete using (auth.uid() = user_id);

drop trigger if exists cart_items_set_updated_at on public.cart_items;
create trigger cart_items_set_updated_at
  before update on public.cart_items
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- Future-ready ecommerce schema
-- -----------------------------------------------------------------------------

-- Enable UUID generation
create extension if not exists pgcrypto;

-- Helper to gate admin-only write policies via Supabase JWT app_metadata.role
create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false);
$$;

-- Categories master (optional normalized catalogue)
create table if not exists public.product_categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists product_categories_sort_idx on public.product_categories (sort_order);

alter table public.product_categories enable row level security;

drop policy if exists "product_categories_read_all" on public.product_categories;
create policy "product_categories_read_all"
  on public.product_categories
  for select
  using (is_active = true or public.is_admin());

drop policy if exists "product_categories_admin_manage" on public.product_categories;
create policy "product_categories_admin_manage"
  on public.product_categories
  for all
  using (public.is_admin())
  with check (public.is_admin());

drop trigger if exists product_categories_set_updated_at on public.product_categories;
create trigger product_categories_set_updated_at
  before update on public.product_categories
  for each row execute function public.set_updated_at();

-- Product gallery images
create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  image_url text not null,
  alt_text text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists product_images_product_idx on public.product_images(product_id);
create index if not exists product_images_sort_idx on public.product_images(sort_order);

alter table public.product_images enable row level security;

drop policy if exists "product_images_read_all" on public.product_images;
create policy "product_images_read_all"
  on public.product_images
  for select
  using (true);

drop policy if exists "product_images_admin_manage" on public.product_images;
create policy "product_images_admin_manage"
  on public.product_images
  for all
  using (public.is_admin())
  with check (public.is_admin());

-- Product variants (size/color/SKU level inventory + pricing)
create table if not exists public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  sku text unique,
  size text,
  color text,
  price_cents integer not null check (price_cents >= 0),
  stock integer not null default 0 check (stock >= 0),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists product_variants_product_idx on public.product_variants(product_id);
create index if not exists product_variants_active_idx on public.product_variants(is_active) where is_active = true;

alter table public.product_variants enable row level security;

drop policy if exists "product_variants_read_all" on public.product_variants;
create policy "product_variants_read_all"
  on public.product_variants
  for select
  using (is_active = true or public.is_admin());

drop policy if exists "product_variants_admin_manage" on public.product_variants;
create policy "product_variants_admin_manage"
  on public.product_variants
  for all
  using (public.is_admin())
  with check (public.is_admin());

drop trigger if exists product_variants_set_updated_at on public.product_variants;
create trigger product_variants_set_updated_at
  before update on public.product_variants
  for each row execute function public.set_updated_at();

-- Saved addresses
create table if not exists public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  line1 text not null,
  line2 text,
  city text not null,
  state text,
  postal_code text not null,
  country text not null,
  is_default_shipping boolean not null default false,
  is_default_billing boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists addresses_user_idx on public.addresses(user_id);

alter table public.addresses enable row level security;

drop policy if exists "addresses_select_own" on public.addresses;
create policy "addresses_select_own"
  on public.addresses
  for select
  using (auth.uid() = user_id or public.is_admin());

drop policy if exists "addresses_insert_own" on public.addresses;
create policy "addresses_insert_own"
  on public.addresses
  for insert
  with check (auth.uid() = user_id or public.is_admin());

drop policy if exists "addresses_update_own" on public.addresses;
create policy "addresses_update_own"
  on public.addresses
  for update
  using (auth.uid() = user_id or public.is_admin())
  with check (auth.uid() = user_id or public.is_admin());

drop policy if exists "addresses_delete_own" on public.addresses;
create policy "addresses_delete_own"
  on public.addresses
  for delete
  using (auth.uid() = user_id or public.is_admin());

drop trigger if exists addresses_set_updated_at on public.addresses;
create trigger addresses_set_updated_at
  before update on public.addresses
  for each row execute function public.set_updated_at();

-- Wishlist
create table if not exists public.wishlist_items (
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, product_id)
);

create index if not exists wishlist_items_product_idx on public.wishlist_items(product_id);

alter table public.wishlist_items enable row level security;

drop policy if exists "wishlist_select_own" on public.wishlist_items;
create policy "wishlist_select_own"
  on public.wishlist_items
  for select
  using (auth.uid() = user_id or public.is_admin());

drop policy if exists "wishlist_insert_own" on public.wishlist_items;
create policy "wishlist_insert_own"
  on public.wishlist_items
  for insert
  with check (auth.uid() = user_id or public.is_admin());

drop policy if exists "wishlist_delete_own" on public.wishlist_items;
create policy "wishlist_delete_own"
  on public.wishlist_items
  for delete
  using (auth.uid() = user_id or public.is_admin());

-- Orders
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  email text not null,
  status text not null default 'pending'
    check (status in ('pending','paid','processing','shipped','delivered','cancelled','refunded')),
  subtotal_cents integer not null check (subtotal_cents >= 0),
  shipping_cents integer not null default 0 check (shipping_cents >= 0),
  tax_cents integer not null default 0 check (tax_cents >= 0),
  discount_cents integer not null default 0 check (discount_cents >= 0),
  total_cents integer not null check (total_cents >= 0),
  currency text not null default 'USD',
  shipping_address_id uuid references public.addresses(id) on delete set null,
  billing_address_id uuid references public.addresses(id) on delete set null,
  notes text,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists orders_user_idx on public.orders(user_id);
create index if not exists orders_status_idx on public.orders(status);
create index if not exists orders_created_at_idx on public.orders(created_at desc);

alter table public.orders enable row level security;

drop policy if exists "orders_select_own" on public.orders;
create policy "orders_select_own"
  on public.orders
  for select
  using (auth.uid() = user_id or public.is_admin());

drop policy if exists "orders_insert_own_or_admin" on public.orders;
create policy "orders_insert_own_or_admin"
  on public.orders
  for insert
  with check (
    public.is_admin()
    or auth.uid() = user_id
    or user_id is null
  );

drop policy if exists "orders_update_admin_only" on public.orders;
create policy "orders_update_admin_only"
  on public.orders
  for update
  using (public.is_admin())
  with check (public.is_admin());

drop trigger if exists orders_set_updated_at on public.orders;
create trigger orders_set_updated_at
  before update on public.orders
  for each row execute function public.set_updated_at();

-- Order line items
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  variant_id uuid references public.product_variants(id) on delete set null,
  product_name text not null,
  product_slug text,
  unit_price_cents integer not null check (unit_price_cents >= 0),
  quantity integer not null check (quantity > 0),
  line_total_cents integer not null check (line_total_cents >= 0),
  created_at timestamptz not null default now()
);

create index if not exists order_items_order_idx on public.order_items(order_id);
create index if not exists order_items_product_idx on public.order_items(product_id);

alter table public.order_items enable row level security;

drop policy if exists "order_items_select_own" on public.order_items;
create policy "order_items_select_own"
  on public.order_items
  for select
  using (
    exists (
      select 1
      from public.orders o
      where o.id = order_id
        and (o.user_id = auth.uid() or public.is_admin())
    )
  );

drop policy if exists "order_items_insert_admin_only" on public.order_items;
create policy "order_items_insert_admin_only"
  on public.order_items
  for insert
  with check (public.is_admin());

drop policy if exists "order_items_update_admin_only" on public.order_items;
create policy "order_items_update_admin_only"
  on public.order_items
  for update
  using (public.is_admin())
  with check (public.is_admin());

-- Payment transactions (Stripe/Paystack/etc logs)
create table if not exists public.payment_transactions (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  provider text not null,
  provider_reference text,
  amount_cents integer not null check (amount_cents >= 0),
  currency text not null default 'USD',
  status text not null default 'pending'
    check (status in ('pending','authorized','captured','failed','refunded')),
  payload jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists payment_transactions_order_idx on public.payment_transactions(order_id);
create index if not exists payment_transactions_provider_ref_idx on public.payment_transactions(provider_reference);

alter table public.payment_transactions enable row level security;

drop policy if exists "payment_transactions_select_own" on public.payment_transactions;
create policy "payment_transactions_select_own"
  on public.payment_transactions
  for select
  using (
    exists (
      select 1
      from public.orders o
      where o.id = order_id
        and (o.user_id = auth.uid() or public.is_admin())
    )
  );

drop policy if exists "payment_transactions_admin_manage" on public.payment_transactions;
create policy "payment_transactions_admin_manage"
  on public.payment_transactions
  for all
  using (public.is_admin())
  with check (public.is_admin());

drop trigger if exists payment_transactions_set_updated_at on public.payment_transactions;
create trigger payment_transactions_set_updated_at
  before update on public.payment_transactions
  for each row execute function public.set_updated_at();

-- Product reviews / ratings
create table if not exists public.product_reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  title text,
  body text,
  is_approved boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (product_id, user_id)
);

create index if not exists product_reviews_product_idx on public.product_reviews(product_id);
create index if not exists product_reviews_approved_idx on public.product_reviews(is_approved);

alter table public.product_reviews enable row level security;

drop policy if exists "product_reviews_read_approved_or_own" on public.product_reviews;
create policy "product_reviews_read_approved_or_own"
  on public.product_reviews
  for select
  using (is_approved = true or auth.uid() = user_id or public.is_admin());

drop policy if exists "product_reviews_insert_own" on public.product_reviews;
create policy "product_reviews_insert_own"
  on public.product_reviews
  for insert
  with check (auth.uid() = user_id or public.is_admin());

drop policy if exists "product_reviews_update_own_or_admin" on public.product_reviews;
create policy "product_reviews_update_own_or_admin"
  on public.product_reviews
  for update
  using (auth.uid() = user_id or public.is_admin())
  with check (auth.uid() = user_id or public.is_admin());

drop policy if exists "product_reviews_delete_own_or_admin" on public.product_reviews;
create policy "product_reviews_delete_own_or_admin"
  on public.product_reviews
  for delete
  using (auth.uid() = user_id or public.is_admin());

drop trigger if exists product_reviews_set_updated_at on public.product_reviews;
create trigger product_reviews_set_updated_at
  before update on public.product_reviews
  for each row execute function public.set_updated_at();

-- Inventory movement audit
create table if not exists public.inventory_movements (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references public.products(id) on delete cascade,
  variant_id uuid references public.product_variants(id) on delete cascade,
  delta integer not null,
  reason text not null,
  source text,
  metadata jsonb,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists inventory_movements_product_idx on public.inventory_movements(product_id);
create index if not exists inventory_movements_variant_idx on public.inventory_movements(variant_id);

alter table public.inventory_movements enable row level security;

drop policy if exists "inventory_movements_admin_only" on public.inventory_movements;
create policy "inventory_movements_admin_only"
  on public.inventory_movements
  for all
  using (public.is_admin())
  with check (public.is_admin());

-- Coupons / promo codes
create table if not exists public.coupons (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  description text,
  discount_type text not null check (discount_type in ('percent','fixed')),
  discount_value numeric(10,2) not null check (discount_value >= 0),
  max_uses integer check (max_uses is null or max_uses > 0),
  used_count integer not null default 0 check (used_count >= 0),
  starts_at timestamptz,
  ends_at timestamptz,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists coupons_code_idx on public.coupons(code);
create index if not exists coupons_active_idx on public.coupons(is_active);

alter table public.coupons enable row level security;

drop policy if exists "coupons_read_active" on public.coupons;
create policy "coupons_read_active"
  on public.coupons
  for select
  using (is_active = true or public.is_admin());

drop policy if exists "coupons_admin_manage" on public.coupons;
create policy "coupons_admin_manage"
  on public.coupons
  for all
  using (public.is_admin())
  with check (public.is_admin());

drop trigger if exists coupons_set_updated_at on public.coupons;
create trigger coupons_set_updated_at
  before update on public.coupons
  for each row execute function public.set_updated_at();

create table if not exists public.coupon_redemptions (
  id uuid primary key default gen_random_uuid(),
  coupon_id uuid not null references public.coupons(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  order_id uuid references public.orders(id) on delete set null,
  redeemed_at timestamptz not null default now()
);

create index if not exists coupon_redemptions_coupon_idx on public.coupon_redemptions(coupon_id);
create index if not exists coupon_redemptions_user_idx on public.coupon_redemptions(user_id);

alter table public.coupon_redemptions enable row level security;

drop policy if exists "coupon_redemptions_select_own_or_admin" on public.coupon_redemptions;
create policy "coupon_redemptions_select_own_or_admin"
  on public.coupon_redemptions
  for select
  using (auth.uid() = user_id or public.is_admin());

drop policy if exists "coupon_redemptions_insert_admin_only" on public.coupon_redemptions;
create policy "coupon_redemptions_insert_admin_only"
  on public.coupon_redemptions
  for insert
  with check (public.is_admin());

-- Contact + newsletter
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  status text not null default 'new' check (status in ('new','in_progress','closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists contact_messages_status_idx on public.contact_messages(status);
create index if not exists contact_messages_created_at_idx on public.contact_messages(created_at desc);

alter table public.contact_messages enable row level security;

drop policy if exists "contact_messages_insert_public" on public.contact_messages;
create policy "contact_messages_insert_public"
  on public.contact_messages
  for insert
  with check (true);

drop policy if exists "contact_messages_admin_select" on public.contact_messages;
create policy "contact_messages_admin_select"
  on public.contact_messages
  for select
  using (public.is_admin());

drop policy if exists "contact_messages_admin_update" on public.contact_messages;
create policy "contact_messages_admin_update"
  on public.contact_messages
  for update
  using (public.is_admin())
  with check (public.is_admin());

drop trigger if exists contact_messages_set_updated_at on public.contact_messages;
create trigger contact_messages_set_updated_at
  before update on public.contact_messages
  for each row execute function public.set_updated_at();

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  is_active boolean not null default true,
  source text,
  subscribed_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists newsletter_subscribers_active_idx on public.newsletter_subscribers(is_active);

alter table public.newsletter_subscribers enable row level security;

drop policy if exists "newsletter_insert_public" on public.newsletter_subscribers;
create policy "newsletter_insert_public"
  on public.newsletter_subscribers
  for insert
  with check (true);

drop policy if exists "newsletter_admin_select" on public.newsletter_subscribers;
create policy "newsletter_admin_select"
  on public.newsletter_subscribers
  for select
  using (public.is_admin());

drop policy if exists "newsletter_admin_update" on public.newsletter_subscribers;
create policy "newsletter_admin_update"
  on public.newsletter_subscribers
  for update
  using (public.is_admin())
  with check (public.is_admin());

drop trigger if exists newsletter_subscribers_set_updated_at on public.newsletter_subscribers;
create trigger newsletter_subscribers_set_updated_at
  before update on public.newsletter_subscribers
  for each row execute function public.set_updated_at();

-- Optional app settings table (CMS-lite)
create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

drop policy if exists "site_settings_public_read" on public.site_settings;
create policy "site_settings_public_read"
  on public.site_settings
  for select
  using (true);

drop policy if exists "site_settings_admin_manage" on public.site_settings;
create policy "site_settings_admin_manage"
  on public.site_settings
  for all
  using (public.is_admin())
  with check (public.is_admin());

drop trigger if exists site_settings_set_updated_at on public.site_settings;
create trigger site_settings_set_updated_at
  before update on public.site_settings
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- Storage buckets & policies
-- -----------------------------------------------------------------------------
-- Creates a public bucket named `media` for product/profile images.
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

-- Public read
drop policy if exists "media_public_read" on storage.objects;
create policy "media_public_read"
  on storage.objects
  for select
  using (bucket_id = 'media');

-- Authenticated users can upload files to their own folder: /{user_id}/...
drop policy if exists "media_auth_insert_own_folder" on storage.objects;
create policy "media_auth_insert_own_folder"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'media'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "media_auth_update_own_folder" on storage.objects;
create policy "media_auth_update_own_folder"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'media'
    and (storage.foldername(name))[1] = auth.uid()::text
  )
  with check (
    bucket_id = 'media'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "media_auth_delete_own_folder" on storage.objects;
create policy "media_auth_delete_own_folder"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'media'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
