import { HeroSection } from "@/components/home/hero-section";
import { FeaturedProductsSection } from "@/components/home/featured-products-section";
import { CountdownSection } from "@/components/home/countdown-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { AboutSection } from "@/components/home/about-section";
import { ContactSection } from "@/components/home/contact-section";
import { MOCK_PRODUCTS } from "@/data/mock-products";

export default async function HomePage() {
  const featuredProducts = MOCK_PRODUCTS.filter(
    (p) =>
      p.isFeatured &&
      (p.category === "children" ||
        p.category === "boys" ||
        p.category === "ladies" ||
        p.category === "guys" ||
        p.category === "adults")
  );

  return (
    <>
      <HeroSection />
      <CountdownSection />
      <FeaturedProductsSection products={featuredProducts} />
      <TestimonialsSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
