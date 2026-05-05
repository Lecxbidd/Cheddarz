import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/auth/roles";
import { ClipboardList, LayoutDashboard, LogIn, Package } from "lucide-react";

type Variant = "header" | "promo";

export async function AdminBannerLinks({ variant = "header" }: { variant?: Variant }) {
  let isAdmin = false;
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    try {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      isAdmin = isAdminEmail(user?.email);
    } catch {
      /* ignore */
    }
  }

  const iconClass =
    variant === "header"
      ? "size-3.5 shrink-0 text-foreground/65"
      : "size-3.5 shrink-0 text-white/95";

  const linkBase =
    variant === "header"
      ? "inline-flex items-center gap-1.5 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/70 transition-colors hover:text-lux-accent hover:underline underline-offset-4"
      : "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/25 bg-white/10 px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition hover:border-white/45 hover:bg-white/18";

  if (isAdmin) {
    return (
      <nav
        className="flex flex-wrap items-center gap-x-4 gap-y-1 sm:gap-x-5"
        aria-label="Store administration"
      >
        <Link href="/admin" className={linkBase}>
          <LayoutDashboard className={iconClass} aria-hidden />
          Admin
        </Link>
        <Link href="/admin/products" className={linkBase}>
          <Package className={iconClass} aria-hidden />
          Products
        </Link>
        <Link href="/admin/orders" className={linkBase}>
          <ClipboardList className={iconClass} aria-hidden />
          Orders
        </Link>
      </nav>
    );
  }

  return (
    <Link href="/admin/login" className={linkBase}>
      <LogIn className={iconClass} aria-hidden />
      Store admin
    </Link>
  );
}
