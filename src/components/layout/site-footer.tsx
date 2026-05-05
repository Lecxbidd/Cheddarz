import Link from "next/link";
import { CATEGORY_LABELS, CATEGORY_ORDER, SITE_NAME } from "@/lib/constants";
import { BrandWordmark } from "@/components/layout/brand-wordmark";

const cols = [
  {
    title: "Customer service",
    links: [
      { href: "/contact", label: "Contact us" },
      { href: "/track-order", label: "Track order" },
      { href: "/returns", label: "Returns & exchanges" },
      { href: "/shipping", label: "Shipping info" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms of use" },
    ],
  },
  {
    title: "Shopping",
    links: [
      ...CATEGORY_ORDER.map((key) => ({
        href: `/catalogue?category=${key}`,
        label: CATEGORY_LABELS[key],
      })),
      { href: "/catalogue", label: "Shop all" },
      { href: "/wishlist", label: "Wishlist" },
    ],
  },
  {
    title: "About",
    links: [
      { href: "/", label: "Our story" },
      { href: "/contact", label: "Store locator" },
      { href: "/login", label: "My account" },
      { href: "/checkout", label: "Checkout" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/35 dark:bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-sans">
              <BrandWordmark className="text-xl sm:text-2xl" withScissorsBehind={false} />
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Quiet luxury essentials — timeless silhouettes, honest materials, and a shopping flow that stays out of your way.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <p className="lux-eyebrow text-lux-accent">{c.title}</p>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-foreground/80 transition-colors hover:text-lux-accent hover:underline underline-offset-4"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-border bg-card p-8 shadow-[0_24px_48px_-28px_rgba(0,0,0,0.18)] dark:shadow-[0_24px_48px_-28px_rgba(0,0,0,0.55)]">
          <p className="lux-eyebrow text-lux-accent">Newsletter</p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            Early access to drops and curated edits — no clutter in your inbox.
          </p>
          <form className="mt-6 flex max-w-lg flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Email address"
              className="h-12 flex-1 rounded-full border border-border bg-background px-5 text-sm outline-none transition placeholder:text-muted-foreground focus:border-lux-accent/45 focus:ring-2 focus:ring-lux-accent/15"
            />
            <button
              type="button"
              className="h-12 shrink-0 rounded-full bg-primary px-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-foreground transition hover:bg-primary/90"
            >
              Subscribe
            </button>
          </form>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-10 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span className="max-w-prose leading-relaxed">
            © {new Date().getFullYear()} {SITE_NAME}. Demo storefront — replace policy and legal copy with your own.
          </span>
          <Link
            href="/catalogue"
            className="text-sm font-medium text-foreground transition hover:text-lux-accent hover:underline underline-offset-4"
          >
            Continue shopping
          </Link>
        </div>
      </div>

      <div className="border-t border-border bg-foreground py-4 text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-background/85">
        *Promotional messaging for demo only
      </div>
    </footer>
  );
}
