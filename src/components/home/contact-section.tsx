import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ContactSection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="bg-card ring-border overflow-hidden rounded-3xl shadow-sm ring-1 md:grid md:grid-cols-2">
          <div className="space-y-6 p-8 sm:p-12">
            <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em]">
              Contact
            </p>
            <h2 className="font-heading text-3xl tracking-tight sm:text-4xl">
              Visit us or write the studio
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Wholesale inquiries, sizing advice, or partnership ideas — our team replies within one
              business day.
            </p>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="text-primary mt-0.5 size-5 shrink-0" />
                <span>
                  428 Mercer Street
                  <br />
                  New York, NY 10012
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="text-primary mt-0.5 size-5 shrink-0" />
                <a href="tel:+12125550198" className="hover:text-primary underline-offset-4 transition hover:underline">
                  +1 (212) 555-0198
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="text-primary mt-0.5 size-5 shrink-0" />
                <a
                  href="mailto:hello@cheddar.apparel"
                  className="hover:text-primary underline-offset-4 transition hover:underline"
                >
                  hello@cheddar.apparel
                </a>
              </li>
            </ul>
            <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "inline-flex")}>
              Open contact form
            </Link>
          </div>
          <div className="bg-muted/40 relative min-h-[280px] md:min-h-full">
            <div className="absolute inset-6 rounded-2xl border border-dashed border-muted-foreground/30" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
