"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingCart, UserCog } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/dashboard", label: "User Dashboard", icon: UserCog },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full rounded-xl border bg-card p-3 lg:w-64 lg:shrink-0">
      <p className="px-2 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
        Admin Panel
      </p>
      <nav className="mt-2 space-y-1">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition",
                active
                  ? "bg-primary text-primary-foreground [&_svg]:text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground [&_svg]:text-foreground [&_svg]:opacity-90"
              )}
            >
              <link.icon className="size-4 shrink-0" />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

