import type { Metadata } from "next";
import { DM_Sans, Fraunces, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { BubbleBackground } from "@/components/layout/bubble-background";
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
    default: `${SITE_NAME} · Modern clothing`,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    "Cheddar Apparel — children's wear, boys' wear, adult fashion, casual essentials, and more.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  openGraph: {
    title: `${SITE_NAME} · Modern clothing`,
    description:
      "Cheddar Apparel — children's wear, boys' wear, adult fashion, casual essentials, and more.",
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
      <body className="font-sans min-h-full flex flex-col antialiased">
        <BubbleBackground />
        <Providers>
          <div className="relative z-10 flex min-h-full flex-col">
            <SiteHeader />
            <main className="flex flex-1 flex-col">{children}</main>
            <SiteFooter />
          </div>
        </Providers>
      </body>
    </html>
  );
}
