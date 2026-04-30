import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Cheddar Apparel for support, sizing advice, and partnerships.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="border-border bg-muted/30 border-b py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em]">
            Contact
          </p>
          <h1 className="font-heading mt-3 text-4xl tracking-tight">Let&apos;s talk</h1>
          <p className="text-muted-foreground mt-3 max-w-xl">
            Studio visits by appointment — or drop us a note. We reply within one business day.
          </p>
        </div>
      </section>

      <section className="flex-1 py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16 lg:px-8">
          <div className="space-y-8">
            <div>
              <h2 className="font-heading text-xl">Studio</h2>
              <ul className="text-muted-foreground mt-4 space-y-4 text-sm leading-relaxed">
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
                  <a href="tel:+12125550198" className="hover:text-foreground underline-offset-4 transition hover:underline">
                    +1 (212) 555-0198
                  </a>
                </li>
                <li className="flex gap-3">
                  <Mail className="text-primary mt-0.5 size-5 shrink-0" />
                  <a
                    href="mailto:hello@cheddar.apparel"
                    className="hover:text-foreground underline-offset-4 transition hover:underline"
                  >
                    hello@cheddar.apparel
                  </a>
                </li>
              </ul>
            </div>
            <p className="text-muted-foreground text-sm">
              Prefer the rails? Browse the{" "}
              <Link href="/catalogue" className="text-primary font-medium underline underline-offset-4">
                catalogue
              </Link>{" "}
              anytime.
            </p>
          </div>

          <div className="bg-card ring-border rounded-3xl p-8 shadow-sm ring-1 sm:p-10">
            <h2 className="font-heading text-xl">Send a message</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
