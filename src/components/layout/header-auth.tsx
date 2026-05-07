"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { UserRound } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function HeaderAuth({
  user,
  isAdmin,
  variant = "default",
}: {
  user: User | null;
  isAdmin?: boolean;
  /** `icon` — compact header: profile glyph when signed out, avatar trigger when signed in */
  variant?: "default" | "icon";
}) {
  const router = useRouter();

  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
    router.push("/");
  }

  if (!user) {
    if (variant === "icon") {
      return (
        <Link
          href="/login"
          className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "text-foreground/85")}
          aria-label="Sign in"
        >
          <UserRound className="size-5" strokeWidth={1.85} />
        </Link>
      );
    }
    return (
      <div className="flex items-center gap-2">
        <Link href="/login" className={cn(buttonVariants({ variant: "ghost" }))}>
          Log in
        </Link>
        <Link href="/signup" className={cn(buttonVariants())}>
          Sign up
        </Link>
      </div>
    );
  }

  const initial =
    user.email?.slice(0, 2).toUpperCase() ??
    String(user.user_metadata?.full_name ?? "?").slice(0, 2).toUpperCase();

  const triggerClass =
    variant === "icon"
      ? cn(buttonVariants({ variant: "ghost", size: "icon" }), "text-foreground/85")
      : buttonVariants({ variant: "ghost" }) + " inline-flex items-center gap-2 px-2";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger aria-label={variant === "icon" ? "Account menu" : undefined}>
        <span className={triggerClass}>
          <Avatar className="size-8">
            <AvatarFallback>{initial}</AvatarFallback>
          </Avatar>
          {variant === "icon" ? null : (
            <>
              <span className="hidden max-w-[140px] truncate text-sm md:inline">{user.email}</span>
              <Badge variant={isAdmin ? "default" : "secondary"} className="hidden text-[10px] md:inline-flex">
                {isAdmin ? "Admin" : "User"}
              </Badge>
            </>
          )}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[200px]">
        <DropdownMenuItem disabled>
          <span className="mr-2 text-xs text-muted-foreground">Role</span>
          <Badge variant={isAdmin ? "default" : "secondary"}>{isAdmin ? "Admin" : "User"}</Badge>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/dashboard")}>Dashboard</DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/profile")}>Profile</DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/orders")}>Orders</DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/cart")}>Cart</DropdownMenuItem>
        {isAdmin ? (
          <DropdownMenuItem onClick={() => router.push("/admin")}>Admin Dashboard</DropdownMenuItem>
        ) : null}
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={() => logout()}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
