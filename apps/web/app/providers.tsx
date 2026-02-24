"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import type { PropsWithChildren } from "react";
import { AuthProvider } from "@/lib/auth";

export function Providers({ children }: PropsWithChildren) {
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  if (!googleClientId) {
    return <AuthProvider>{children}</AuthProvider>;
  }

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <AuthProvider>{children}</AuthProvider>
    </GoogleOAuthProvider>
  );
}
