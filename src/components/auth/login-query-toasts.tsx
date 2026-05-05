"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";

function safeDecodeQueryValue(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function LoginQueryToasts({
  registered,
  errorMessage,
}: {
  registered: boolean;
  errorMessage: string | null;
}) {
  const didReg = useRef(false);
  const didErr = useRef(false);

  useEffect(() => {
    if (registered && !didReg.current) {
      didReg.current = true;
      toast.success("Account created", {
        id: "login-registered",
        description: "Check your email to confirm, then sign in.",
      });
    }
  }, [registered]);

  useEffect(() => {
    if (errorMessage && !didErr.current) {
      didErr.current = true;
      toast.error("Sign-in issue", {
        id: "login-error",
        description: safeDecodeQueryValue(errorMessage),
      });
    }
  }, [errorMessage]);

  return null;
}
