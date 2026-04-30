# Cheddar Apparel

Full-stack modern clothing ecommerce app built with:

- Next.js (App Router)
- Tailwind CSS + shadcn/ui
- Supabase Auth + PostgreSQL + Storage
- Zustand cart

## Project phases

- Phase 1-2: Core UI (`Navbar`, `Footer`, `Hero`, `Product Card`, `Product Carousel`, `Theme Toggle`)
- Phase 3: Supabase setup (project, auth, OAuth, tables, storage bucket)
- Phase 4: Auth system (register/login/logout/Google/protected profile)
- Phase 5: Profile CRUD
- Phase 6: Product system (catalogue, filters, detail page, featured/new/best carousel)
- Phase 7: Cart system (add/remove/update/clear + subtotal + saved cart for logged-in users)
- Phase 8: Marketing sections (countdown, testimonials, about, contact)
- Phase 9: Final polish (responsive, loading states, validation, toast, metadata)

## Local setup

1) Install dependencies

```bash
npm install
```

2) Create `.env.local` in project root

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

3) Apply database schema

- Open Supabase SQL editor
- Run `supabase/schema.sql`

4) Run app

```bash
npm run dev
```

## Supabase configuration

### Auth settings

- Enable Email/Password in Supabase Auth providers
- Enable Google provider and add credentials
- Add redirect URL:
  - `http://localhost:3000/auth/callback`
  - `https://YOUR_DOMAIN/auth/callback` (production)

### Storage bucket

Create a public bucket, e.g. `media`, for:

- Product images
- Profile images

## Deployment (Vercel)

1) Push project to GitHub
2) Import repo in Vercel
3) Add environment variables in Vercel Project Settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` (your Vercel domain)
4) Deploy
5) Update Supabase Google OAuth redirect URLs with your Vercel callback URL

## Build check

```bash
npm run build
```
