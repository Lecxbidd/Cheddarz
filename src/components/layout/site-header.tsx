import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { SITE_NAME } from "@/lib/constants";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { CartBadgeLink } from "@/components/layout/cart-badge";
import { HeaderAuth } from "@/components/layout/header-auth";
import { MobileNav } from "@/components/layout/mobile-nav";

const nav = [
  { href: "/", label: "Home" },
  { href: "/catalogue", label: "Catalogue" },
  { href: "/contact", label: "Contact" },
];

export async function SiteHeader() {
  let user = null;
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
    } catch (error) {
      console.warn("Supabase not configured for header auth.", error);
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-primary/25 bg-gradient-to-r from-primary/10 via-background/75 to-primary/5 supports-backdrop-filter:backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 md:gap-8">
          <MobileNav />
          <Link href="/" className="font-heading text-xl tracking-tight md:text-2xl">
            {SITE_NAME}
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-foreground text-sm font-medium transition"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <CartBadgeLink />
          <div className="hidden md:block">
            <HeaderAuth user={user} />
          </div>
        </div>
      </div>
      <div className="border-border flex justify-center border-t px-4 py-2 md:hidden">
        <HeaderAuth user={user} />
      </div>
    </header>
  );
}
