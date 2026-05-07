import Image from "next/image";
import Link from "next/link";
import { MOCK_PRODUCTS, CLOTHING_CATEGORIES } from "@/data/mock-products";
import { SITE_NAME } from "@/lib/constants";
import { ProductCard } from "@/components/product/product-card";
import { TcpHomeHero } from "@/components/home/tcp-home-hero";
import { CountdownSection } from "@/components/home/countdown-section";
import { TcpShortsRail } from "@/components/home/tcp-shorts-rail";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { picksBalancedByCategory } from "@/lib/picks-balanced-by-category";
import { AdminBannerLinks } from "@/components/layout/admin-banner-links";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

export default function HomePage() {
  const clothing = MOCK_PRODUCTS.filter((p) => CLOTHING_CATEGORIES.includes(p.category));

  const shortsRailProducts = picksBalancedByCategory(clothing, 14);
  const comboA = clothing[18];
  const comboB = clothing[22];
  const ugc = clothing.slice(48, 52);
  const recommended = clothing.slice(30, 38);

  const tileLink =
    "group relative overflow-hidden rounded-2xl border border-border bg-muted/40 shadow-[0_20px_40px_-28px_rgba(0,0,0,0.35)] ring-1 ring-black/[0.04] transition duration-500 hover:shadow-[0_28px_56px_-24px_rgba(0,0,0,0.42)] dark:ring-white/[0.06]";

  return (
    <div className="bg-background">
      <TcpHomeHero />

      <ScrollReveal>
        <TcpShortsRail title="Editor’s picks · bottoms & layers" products={shortsRailProducts} />
      </ScrollReveal>

      <ScrollReveal>
        <CountdownSection />
      </ScrollReveal>

      {/* Promo ribbon */}
      <ScrollReveal>
      <section className="relative overflow-hidden bg-neutral-950 text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_70%_-20%,rgba(180,140,90,0.22),transparent_55%)]" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-10 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div className="max-w-xl space-y-3">
            <p className="lux-eyebrow text-white/55">Limited window</p>
            <p className="font-heading text-balance text-3xl font-medium tracking-tight md:text-4xl">
              Twenty percent off your edit*
            </p>
          </div>
          <Link
            href="/catalogue"
            className="inline-flex shrink-0 items-center rounded-full border border-white/25 bg-white px-10 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-950 transition hover:bg-lux-accent-muted hover:border-transparent"
          >
            Shop collection
          </Link>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col items-stretch gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <p className="text-center text-[10px] font-medium uppercase tracking-[0.2em] text-white/55 sm:text-left">
              Store team · catalogue & orders
            </p>
            <div className="flex justify-center sm:justify-end">
              <AdminBannerLinks variant="promo" />
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* Split editorial block */}
      <ScrollReveal>
      <section
        id="about"
        className="mx-auto max-w-7xl scroll-mt-[calc(7rem+env(safe-area-inset-top))] px-4 py-14 sm:px-6 lg:px-8"
      >
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-[0_24px_48px_-32px_rgba(0,0,0,0.2)] md:grid md:grid-cols-2 dark:shadow-[0_24px_48px_-32px_rgba(0,0,0,0.65)]">
          <div className="flex flex-col justify-center bg-muted/40 p-10 md:p-14 lg:p-16">
            <p className="lux-eyebrow text-lux-accent">Today&apos;s focus</p>
            <h3 className="lux-heading-xl mt-4 text-4xl font-medium md:text-[2.75rem] md:leading-[1.05]">
              Soft jersey, sharp silhouette
            </h3>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
              Everyday tees and layers with the handfeel you notice — built for motion, styled like an editorial spread.
            </p>
            <Link
              href="/catalogue?category=adult_wear"
              className="mt-10 inline-flex w-fit rounded-full bg-primary px-9 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-foreground transition hover:bg-primary/88"
            >
              Shop tees
            </Link>
          </div>
          <div className="relative min-h-[300px] bg-muted md:min-h-[380px]">
            {clothing[6] ? (
              <Image
                src={clothing[6].imageUrl}
                alt={clothing[6].name}
                fill
                className="object-cover transition duration-700 hover:scale-[1.02]"
                sizes="(max-width:768px) 100vw, 50vw"
              />
            ) : null}
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* Two-up lifestyle tiles */}
      <ScrollReveal>
      <section className="mx-auto grid max-w-7xl gap-5 px-4 pb-14 sm:px-6 md:grid-cols-2 lg:px-8">
        {comboA ? (
          <Link href={`/products/${comboA.slug}`} className={`${tileLink} aspect-[5/6] md:aspect-square`}>
            <Image
              src={comboA.imageUrl}
              alt={comboA.name}
              fill
              className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
              sizes="(max-width:768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 text-white md:p-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/75">Mix &amp; match</p>
              <p className="mt-3 font-heading text-3xl font-medium tracking-tight md:text-4xl">Building blocks</p>
              <span className="mt-5 inline-block text-[11px] font-semibold uppercase tracking-[0.22em] underline underline-offset-[10px] decoration-white/40 transition group-hover:decoration-white">
                View piece
              </span>
            </div>
          </Link>
        ) : null}
        {comboB ? (
          <Link href={`/products/${comboB.slug}`} className={`${tileLink} aspect-[5/6] md:aspect-square`}>
            <Image
              src={comboB.imageUrl}
              alt={comboB.name}
              fill
              className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
              sizes="(max-width:768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 text-white md:p-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/75">Resort</p>
              <p className="mt-3 font-heading text-3xl font-medium tracking-tight md:text-4xl">Sun-ready layers</p>
              <span className="mt-5 inline-block text-[11px] font-semibold uppercase tracking-[0.22em] underline underline-offset-[10px] decoration-white/40 transition group-hover:decoration-white">
                Explore swim
              </span>
            </div>
          </Link>
        ) : null}
      </section>
      </ScrollReveal>

      {/* Wide seasonal story — editorial asset from /assets/hero (full-bleed banner) */}
      <ScrollReveal>
        <section className="border-y border-border bg-muted/25">
          <Link href="/catalogue?category=street_wear" className="relative mx-auto block max-w-7xl">
            <div className="relative aspect-[21/9] min-h-[220px] w-full bg-muted md:min-h-[300px]">
              <Image
                src="/assets/hero/mens-summer-street.png"
                alt="Men’s elevated streetwear — tailored layers and movement in the city"
                fill
                className="object-cover object-[center_38%]"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-transparent" />
              <div className="absolute bottom-8 left-6 max-w-lg sm:left-12">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/75">Season</p>
                <p className="mt-3 font-heading text-balance text-3xl font-medium tracking-tight text-white md:text-5xl">
                  Statement classics
                </p>
                <span className="mt-6 inline-flex rounded-full border border-white/35 bg-white/10 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition hover:bg-white hover:text-neutral-950">
                  Shop the look
                </span>
              </div>
            </div>
          </Link>
        </section>
      </ScrollReveal>

      {/* Kids duo */}
      <ScrollReveal>
      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-14 sm:px-6 md:grid-cols-2 lg:px-8">
        <Link href="/catalogue?category=girls_wear" className={`${tileLink} aspect-[3/5]`}>
          <Image
            src="/assets/girls-wear/04ce930c02c37cdf99610f36f5ab4518.jpg"
            alt="Girls denim editorial — playful capsule styling"
            fill
            className="object-cover object-center transition duration-700 group-hover:scale-[1.03]"
            sizes="(max-width:768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 text-white">
            <p className="font-heading text-2xl font-medium md:text-3xl">Playroom capsule</p>
            <p className="mt-2 text-sm text-white/85">Feminine cuts &amp; soft palettes</p>
          </div>
        </Link>
        <Link href="/catalogue?category=boys_wears" className={`${tileLink} aspect-[3/5]`}>
          <Image
            src="/assets/hero/kids-western.png"
            alt="Boyswear editorial — everyday essentials and soft layers"
            fill
            className="object-cover object-[center_32%] transition duration-700 group-hover:scale-[1.03]"
            sizes="(max-width:768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 text-white">
            <p className="font-heading text-2xl font-medium md:text-3xl">Tiny icons</p>
            <p className="mt-2 text-sm text-white/85">Baby &amp; toddler essentials</p>
          </div>
        </Link>
      </section>
      </ScrollReveal>

      {/* Archive sale strip — tonal, not loud red */}
      <ScrollReveal>
      <section className="border-y border-border bg-muted/50 py-10">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="font-heading text-2xl font-medium tracking-tight md:text-3xl">Archive · up to 70% off</p>
          <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
            Past-season gems while supplies last — prices already reflected.
          </p>
          <Link
            href="/catalogue"
            className="mt-6 inline-block text-[11px] font-semibold uppercase tracking-[0.22em] text-lux-accent underline underline-offset-[10px] decoration-lux-accent/35 transition hover:decoration-lux-accent"
          >
            Browse archive
          </Link>
        </div>
      </section>
      </ScrollReveal>

      {/* Partner callout */}
      <ScrollReveal>
      <section className="border-b border-border bg-stone-100 py-16 dark:bg-stone-950/40">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="lux-eyebrow text-stone-600 dark:text-stone-400">Also discover</p>
          <h3 className="font-heading mt-5 text-4xl font-medium tracking-tight text-stone-900 dark:text-stone-100 md:text-5xl">
            Little Labels Studio
          </h3>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-stone-600 dark:text-stone-400">
            A softer sibling line — portrait-day detailing with the same fabric discipline as our main collection.
          </p>
          <Link
            href="/catalogue"
            className="mt-10 inline-flex rounded-full border border-stone-900/15 bg-white px-10 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-900 shadow-sm transition hover:border-stone-900/35 hover:bg-stone-50 dark:border-stone-100/20 dark:bg-stone-950 dark:text-stone-100 dark:hover:bg-stone-900"
          >
            View the edit
          </Link>
        </div>
      </section>
      </ScrollReveal>

      <ScrollReveal>
        <TestimonialsSection />
      </ScrollReveal>

      {/* Social grid */}
      <ScrollReveal>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="lux-eyebrow text-lux-accent">Community</p>
          <h3 className="lux-heading-xl mt-4 text-3xl font-medium md:text-4xl">
            #{SITE_NAME.replace(/\s+/g, "").toUpperCase()}STYLE
          </h3>
          <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
            Styled by you · curated by us
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {ugc.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-border bg-card shadow-md ring-1 ring-black/[0.04] transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:ring-white/[0.06]"
            >
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width:768px) 50vw, 25vw"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <p className="truncate text-[10px] font-semibold uppercase tracking-[0.14em] text-white/95">{product.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      </ScrollReveal>

      {/* Recommended */}
      <ScrollReveal>
      <section className="border-t border-border bg-muted/25 py-12 dark:bg-muted/15">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h3 className="lux-heading-xl text-xl font-medium md:text-2xl">Recommended</h3>
            <Link
              href="/catalogue"
              className="text-[11px] font-semibold uppercase tracking-[0.2em] text-lux-accent transition hover:underline underline-offset-8"
            >
              View all
            </Link>
          </div>
          <div className="mt-8 flex gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {recommended.map((product) => (
              <div key={product.id} className="w-[min(100%,240px)] shrink-0 sm:w-[248px]">
                <ProductCard product={product} variant="rail" />
              </div>
            ))}
          </div>
        </div>
      </section>
      </ScrollReveal>
    </div>
  );
}
