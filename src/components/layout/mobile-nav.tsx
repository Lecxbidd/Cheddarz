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
import { SITE_NAME } from "@/lib/constants";

const links = [
  { href: "/", label: "Home" },
  { href: "/catalogue", label: "Catalogue" },
  { href: "/contact", label: "Contact" },
  { href: "/cart", label: "Cart" },
  { href: "/profile", label: "Profile" },
  { href: "/login", label: "Log in" },
];

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
            <Menu />
          </Button>
        }
      />
      <SheetContent side="left" className="flex flex-col gap-6">
        <SheetHeader>
          <SheetTitle className="font-heading text-left text-xl">{SITE_NAME}</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-3 text-lg">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="border-border hover:text-primary border-b py-2 transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
