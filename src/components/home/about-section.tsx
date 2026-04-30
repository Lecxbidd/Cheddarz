import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SITE_NAME } from "@/lib/constants";

export function AboutSection() {
  return (
    <section className="bg-muted/30 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
        <div className="space-y-5">
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em]">About us</p>
          <h2 className="font-heading text-3xl tracking-tight sm:text-4xl">
            Quiet luxury for real routines
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {SITE_NAME} began as a conversation between tailors and parents — how do we build clothes
            that feel honest on skin, endure messy days, and still photograph beautifully? Today we
            design across kids, teens, and adults with the same compass: refined silhouettes,
            ethical sourcing where possible, and prices that respect your life&apos;s budget.
          </p>
          <Link href="/catalogue" className={cn(buttonVariants({ variant: "secondary" }))}>
            Explore collections
          </Link>
        </div>
        <div className="bg-card ring-border grid gap-4 rounded-3xl p-8 shadow-sm ring-1 sm:p-10">
          <dl className="grid gap-6 sm:grid-cols-2">
            <div>
              <dt className="text-muted-foreground text-xs uppercase tracking-wide">Founded</dt>
              <dd className="font-heading mt-1 text-2xl">2018</dd>
            </div>
            <div>
              <dt className="text-muted-foreground text-xs uppercase tracking-wide">Ship zones</dt>
              <dd className="font-heading mt-1 text-2xl">NA · EU · UK</dd>
            </div>
            <div>
              <dt className="text-muted-foreground text-xs uppercase tracking-wide">Fabrics</dt>
              <dd className="font-heading mt-1 text-2xl">Organic · recycled blends</dd>
            </div>
            <div>
              <dt className="text-muted-foreground text-xs uppercase tracking-wide">Care</dt>
              <dd className="font-heading mt-1 text-2xl">Repair program</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
