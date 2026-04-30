import Image from "next/image";

const items = [
  {
    quote:
      "The boys' denim fits better than anything we've tried from department stores — sturdy without stiffness.",
    name: "Jordan M.",
    role: "Parent · Detroit",
    imageUrl: "https://picsum.photos/seed/testimonial-jordan/120/120",
  },
  {
    quote:
      "Finally a brand where casual pieces feel elevated enough for client dinners but relaxed on weekends.",
    name: "Alex R.",
    role: "Creative director",
    imageUrl: "https://picsum.photos/seed/testimonial-alex/120/120",
  },
  {
    quote:
      "Our toddler lived in the knit set all winter — washes beautifully and still holds its shape.",
    name: "Priya K.",
    role: "Mother of two",
    imageUrl: "https://picsum.photos/seed/testimonial-priya/120/120",
  },
  {
    quote:
      "The quality-to-price ratio is excellent. Fast delivery, clean stitching, and zero surprises.",
    name: "Chinedu O.",
    role: "Verified buyer",
    imageUrl: "https://picsum.photos/seed/testimonial-chinedu/120/120",
  },
  {
    quote:
      "Official store badge gave me confidence to order. The accessories looked even better in person.",
    name: "Sade A.",
    role: "Fashion consultant",
    imageUrl: "https://picsum.photos/seed/testimonial-sade/120/120",
  },
  {
    quote:
      "Customer support was responsive and sizing guidance was accurate. Smooth purchase end-to-end.",
    name: "Tobi E.",
    role: "Returning customer",
    imageUrl: "https://picsum.photos/seed/testimonial-tobi/120/120",
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-gradient-to-b from-muted/25 via-background to-muted/20 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl space-y-3">
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em]">
            Voices
          </p>
          <h2 className="font-heading text-3xl tracking-tight sm:text-4xl">What wearers say</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((t) => (
            <figure
              key={t.name}
              className="bg-card/80 ring-border flex flex-col rounded-2xl p-8 shadow-sm backdrop-blur-sm ring-1"
            >
              <blockquote className="text-muted-foreground flex-1 leading-relaxed">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t pt-4">
                <Image
                  src={t.imageUrl}
                  alt={`${t.name} testimonial`}
                  width={44}
                  height={44}
                  className="rounded-full object-cover ring-1 ring-border"
                />
                <div>
                  <p className="font-medium">{t.name}</p>
                  <p className="text-muted-foreground text-sm">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
