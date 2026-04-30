import Link from "next/link";
import { ExternalLink, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { SITE_NAME } from "@/lib/constants";

const footerLinks = [
  { href: "/catalogue", label: "Catalogue" },
  { href: "/contact", label: "Contact" },
  { href: "/login", label: "Account" },
];

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm space-y-4">
            <p className="font-heading text-2xl tracking-tight">{SITE_NAME}</p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Elevated essentials for little explorers and grown-ups alike —
              timeless silhouettes, honest fabrics, and everyday polish.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-10 gap-y-4 text-sm">
            {footerLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-muted-foreground hover:text-foreground transition"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex gap-4">
            <a
              href="mailto:hello@cheddar.apparel"
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition"
            >
              <Mail className="size-4" />
              hello@cheddar.apparel
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground inline-flex gap-1.5 text-sm transition"
              aria-label="Instagram"
            >
              <ExternalLink className="size-4" />
              Instagram
            </a>
          </div>
        </div>
        <Separator />
        <div className="text-muted-foreground flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</span>
          <span>Crafted with Next.js & Supabase.</span>
        </div>
      </div>
    </footer>
  );
}
