"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import type { PropsWithChildren } from "react";

export function Providers({ children }: PropsWithChildren) {
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  if (!googleClientId) {
    return children;
  }

  return (
    <GoogleOAuthProvider clientId={googleClientId}>{children}</GoogleOAuthProvider>
  );
}

