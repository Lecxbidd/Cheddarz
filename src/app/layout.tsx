import type { Metadata } from "next";
import { DM_Sans, Fraunces, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AiChatbot } from "@/components/layout/ai-chatbot";
import { SiteInteractions } from "@/components/layout/site-interactions";
import { SITE_NAME } from "@/lib/constants";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} · Curated apparel`,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    "Editorial-ready clothing for every age — refined basics, elevated streetwear, and professional staples with a calm, luxury-shopping experience.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  openGraph: {
    title: `${SITE_NAME} · Curated apparel`,
    description:
      "Editorial-ready clothing for every age — refined basics and elevated essentials.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-arp=""
      suppressHydrationWarning
      className={`${dmSans.variable} ${fraunces.variable} ${geistMono.variable} h-full`}
    >
      <body
        suppressHydrationWarning
        className="font-sans min-h-full flex flex-col antialiased selection:bg-lux-accent-muted selection:text-foreground"
      >
        <Providers>
          <SiteInteractions />
          <div className="relative z-10 flex min-h-full flex-col transition-colors duration-300 ease-out">
            <SiteHeader />
            <main className="flex flex-1 flex-col">{children}</main>
            <SiteFooter />
          </div>
          <AiChatbot />
        </Providers>
      </body>
    </html>
  );
}
