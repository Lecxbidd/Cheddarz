"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { resolvedTheme, setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <div className="flex items-center gap-2">
      <span className="hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground sm:inline">
        Theme
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={mounted ? isDark : undefined}
        aria-label={
          !mounted
            ? "Theme: loading"
            : isDark
              ? "Switch to light mode"
              : "Switch to dark mode"
        }
        disabled={!mounted}
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className={cn(
          "relative flex h-9 w-[3.75rem] shrink-0 cursor-pointer items-center rounded-full border p-1 shadow-inner transition-[background-color,border-color,box-shadow] duration-300 ease-out outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-wait disabled:opacity-60",
          isDark
            ? "justify-end border-foreground/15 bg-foreground/15 dark:border-white/15 dark:bg-white/10"
            : "justify-start border-border bg-muted/90 dark:bg-muted/50",
        )}
      >
        <span className="relative z-10 flex size-7 items-center justify-center rounded-full bg-card text-foreground shadow-md ring-1 ring-black/[0.06] transition-transform duration-300 ease-[cubic-bezier(0.34,1.4,0.64,1)] dark:ring-white/10">
          {isDark ? (
            <Moon className="size-3.5 text-foreground/90" aria-hidden />
          ) : (
            <Sun className="size-3.5 text-amber-500" aria-hidden />
          )}
        </span>
        <span
          className="pointer-events-none absolute inset-y-0 left-2 flex w-5 items-center justify-center opacity-35"
          aria-hidden
        >
          <Sun className="size-3 text-foreground" />
        </span>
        <span
          className="pointer-events-none absolute inset-y-0 right-2 flex w-5 items-center justify-center opacity-35"
          aria-hidden
        >
          <Moon className="size-3 text-foreground" />
        </span>
      </button>
      {mounted && theme === "system" ? (
        <span className="sr-only">Following system appearance. Toggle sets an explicit preference.</span>
      ) : null}
    </div>
  );
}
