"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { api, type User } from "@/lib/api";
import { useAuth } from "@/lib/auth";

export default function AuthCallbackPage() {
  const router = useRouter();
  const { refresh } = useAuth();
  const called = useRef(false);

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const error = params.get("error");

    if (error || !code) {
      router.replace("/auth?error=sign_in_failed");
      return;
    }

    const redirectUri = `${window.location.origin}/auth/callback`;

    api<{ user: User }>("/auth/google", {
      method: "POST",
      body: { code, redirectUri },
    })
      .then(async () => {
        await refresh();
        router.replace("/");
      })
      .catch(() => {
        router.replace("/auth?error=sign_in_failed");
      });
  }, [router, refresh]);

  return (
    <main className="min-h-screen bg-[#FDF5E5] flex items-center justify-center">
      <p className="text-lg text-[#4C4A3F]">Signing you in…</p>
    </main>
  );
}
