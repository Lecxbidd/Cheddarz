"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BrandWordmark } from "@/components/layout/brand-wordmark";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { PRIMARY_NAV_LINKS } from "@/lib/nav-links";
import { cn } from "@/lib/utils";

const secondaryLinks = [
  { href: "/wishlist", label: "Wishlist" },
  { href: "/cart", label: "Cart" },
  { href: "/checkout", label: "Checkout" },
  { href: "/login", label: "Sign in" },
  { href: "/signup", label: "Create account" },
  { href: "/contact", label: "Help" },
  { href: "/admin/login", label: "Store admin" },
];

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
            <Menu className="size-5 shrink-0 text-foreground" />
          </Button>
        }
      />
      <SheetContent
        side="left"
        className="flex h-full max-h-[100dvh] min-h-0 w-[min(380px,100%)] flex-col gap-6 border-border bg-background sm:w-[380px]"
      >
        <SheetHeader className="text-left">
          <SheetTitle className="font-sans text-lg tracking-tight">
            <BrandWordmark withScissorsBehind={false} />
          </SheetTitle>
        </SheetHeader>

        <nav className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto" aria-label="Mobile">
          <div>
            <p className="lux-eyebrow px-3 text-[10px] text-lux-accent">Menu</p>
            <ul className="mt-2 flex flex-col gap-0.5">
              {PRIMARY_NAV_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={cn(
                      "mobile-nav-row-link block rounded-xl px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground transition-colors",
                      "relative after:pointer-events-none after:absolute after:inset-x-3 after:bottom-2 after:h-px after:origin-center after:scale-x-0 after:bg-gradient-to-r after:from-transparent after:via-lux-accent/70 after:to-transparent after:transition-transform after:duration-300 hover:bg-muted hover:text-foreground hover:after:scale-x-100"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-border pt-5">
            <p className="lux-eyebrow px-3 text-[10px] text-muted-foreground">More</p>
            <ul className="mt-2 flex flex-col gap-0.5">
              {secondaryLinks.map((item) => (
                <li key={item.href + item.label}>
                  <Link
                    href={item.href}
                    className="block rounded-xl px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="mt-auto flex shrink-0 items-center justify-between gap-4 border-t border-border pt-5">
          <p className="text-xs font-medium text-muted-foreground">Appearance</p>
          <ThemeToggle />
        </div>
      </SheetContent>
    </Sheet>
  );
}
