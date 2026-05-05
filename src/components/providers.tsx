"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  /* next-themes: `storageKey` → localStorage `cheddarz-theme` (`light` | `dark` | `system`). */
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey="cheddarz-theme"
      disableTransitionOnChange={false}
    >
      {children}
      <Toaster richColors position="top-center" />
    </ThemeProvider>
  );
}
