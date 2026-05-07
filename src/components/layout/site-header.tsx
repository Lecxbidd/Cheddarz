import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { BrandWordmark } from "@/components/layout/brand-wordmark";
import { CartBadgeLink } from "@/components/layout/cart-badge";
import { HeaderAuth } from "@/components/layout/header-auth";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Search } from "lucide-react";
import { isAdminEmail } from "@/lib/auth/roles";
import { WishlistBadgeLink } from "@/components/layout/wishlist-badge";
import { AdminBannerLinks } from "@/components/layout/admin-banner-links";
import { PRIMARY_NAV_LINKS } from "@/lib/nav-links";
import { cn } from "@/lib/utils";
import { CATEGORY_LABELS, CATEGORY_ORDER } from "@/lib/constants";
import { ChevronDown } from "lucide-react";

const MEGA_MENU_CATALOGUE_LINKS = CATEGORY_ORDER.map((category) => ({
  href: `/catalogue?category=${category}`,
  label: CATEGORY_LABELS[category],
}));

const MEGA_MENU_QUICK_LINKS = [
  {
    href: "/catalogue?category=street_wear",
    title: "Street edits",
    copy: "Trending pieces for casual and city looks.",
  },
  {
    href: "/catalogue?category=professional_wear",
    title: "Casual wear",
    copy: "Everyday essentials with elevated fit.",
  },
  {
    href: "/catalogue?category=ladies_wear",
    title: "Ladies spotlight",
    copy: "Latest arrivals curated for women.",
  },
] as const;

export async function SiteHeader() {
  let user = null;
  let isAdmin = false;
  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    try {
      const supabase = await createClient();
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();
      user = authUser;
      isAdmin = isAdminEmail(authUser?.email);
    } catch (error) {
      console.warn("Supabase not configured for header auth.", error);
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/80 shadow-[0_1px_0_rgba(0,0,0,0.04)] backdrop-blur-xl supports-[backdrop-filter]:bg-background/72 dark:border-border/60 dark:shadow-[0_1px_0_rgba(255,255,255,0.06)]">
      {/* Top utility bar */}
      <div className="border-b border-border/60 bg-muted/40 dark:bg-muted/25">
        <div className="mx-auto flex min-h-9 max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground sm:px-6 lg:px-8">
          <span className="truncate text-foreground/80">Complimentary shipping on qualifying orders*</span>
          <div className="flex shrink-0 flex-wrap items-center gap-x-5 gap-y-1">
            <AdminBannerLinks variant="header" />
            <Link
              href="/contact"
              className="shrink-0 text-foreground/75 transition-colors hover:text-lux-accent hover:underline underline-offset-4"
            >
              Help
            </Link>
          </div>
        </div>
      </div>

      {/* Logo · primary nav · search · utilities */}
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-3 gap-y-3 px-4 py-3 sm:gap-x-5 sm:px-6 lg:flex-nowrap lg:gap-x-6 lg:px-8 lg:py-4">
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3 lg:flex-none lg:flex-initial">
          <MobileNav />
          <Link href="/" className="min-w-0 font-sans leading-tight">
            <BrandWordmark className="text-lg sm:text-xl md:text-2xl" />
          </Link>

          <nav
            className="ml-2 hidden items-center gap-1 lg:ml-6 lg:flex xl:gap-2"
            aria-label="Primary"
          >
            {PRIMARY_NAV_LINKS.map((item) =>
              item.label === "Catalogue" ? (
                <div key={item.label} className="group/mega relative">
                  <Link
                    href={item.href}
                    className={cn(
                      "nav-link-underline inline-flex items-center gap-1.5 px-3 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
                    )}
                  >
                    {item.label}
                    <ChevronDown className="size-3.5 transition-transform duration-200 group-hover/mega:rotate-180" />
                  </Link>
                  <div className="pointer-events-none invisible absolute left-1/2 top-full z-50 mt-2 w-[min(86vw,760px)] -translate-x-1/2 rounded-2xl border border-border/80 bg-background/98 p-5 opacity-0 shadow-[0_30px_70px_-35px_rgba(0,0,0,0.45)] ring-1 ring-black/[0.04] backdrop-blur-xl transition-all duration-200 group-hover/mega:pointer-events-auto group-hover/mega:visible group-hover/mega:opacity-100 dark:ring-white/[0.06]">
                    <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
                      <div>
                        <p className="lux-eyebrow text-lux-accent">Browse by category</p>
                        <div className="mt-3 grid grid-cols-2 gap-2">
                          {MEGA_MENU_CATALOGUE_LINKS.map((entry) => (
                            <Link
                              key={entry.href}
                              href={entry.href}
                              className="rounded-lg border border-border/70 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                            >
                              {entry.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="lux-eyebrow text-lux-accent">Quick picks</p>
                        <div className="mt-3 space-y-2">
                          {MEGA_MENU_QUICK_LINKS.map((entry) => (
                            <Link
                              key={entry.href + entry.title}
                              href={entry.href}
                              className="block rounded-xl border border-border/70 bg-card/60 p-3 transition hover:bg-muted"
                            >
                              <p className="text-sm font-semibold text-foreground">{entry.title}</p>
                              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{entry.copy}</p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "nav-link-underline px-3 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>
        </div>

        <form
          action="/catalogue"
          className="order-last hidden min-w-0 md:order-none md:mx-auto md:flex md:w-full md:max-w-xl md:flex-1 lg:max-w-md xl:max-w-xl"
        >
          <div className="relative w-full">
            <Search className="pointer-events-none absolute top-1/2 left-4 size-[18px] -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              name="q"
              placeholder="Search the collection…"
              className="h-11 w-full rounded-full border border-border bg-secondary/60 pl-11 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-lux-accent/40 focus:bg-background focus:ring-2 focus:ring-lux-accent/20"
            />
          </div>
        </form>

        <div className="ml-auto flex shrink-0 items-center justify-end gap-0.5 text-foreground sm:gap-1 [&_svg]:text-foreground/85">
          <div className="hidden sm:block [&_a]:text-foreground/85 [&_a:hover]:text-lux-accent [&_a]:transition-colors">
            <WishlistBadgeLink />
          </div>
          <ThemeToggle />
          <div className="[&_button]:text-foreground/85 [&_span]:rounded-full [&_a]:text-foreground/85">
            <HeaderAuth user={user} isAdmin={isAdmin} variant="icon" />
          </div>
          <CartBadgeLink />
        </div>
      </div>

      {/* Mobile search */}
      <div className="border-t border-border/60 bg-background px-4 pb-4 pt-3 md:hidden">
        <form action="/catalogue">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              name="q"
              placeholder="Search…"
              className="h-10 w-full rounded-full border border-border bg-secondary/50 pl-10 pr-3 text-sm outline-none transition focus:border-lux-accent/40 focus:ring-2 focus:ring-lux-accent/15"
            />
          </div>
        </form>
      </div>
    </header>
  );
}
