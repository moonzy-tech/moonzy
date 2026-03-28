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
    <main className="min-h-screen bg-[#141826]">
      {/* Navigation Skeleton */}
      <div className="sticky top-2 z-50 mx-auto mt-3 md:mt-[13px] px-2 md:px-4">
        <div className="bg-[#F5F5F0] rounded-[24px] md:rounded-[32px] h-16 md:h-[75px] w-full max-w-[1397px] mx-auto animate-pulse" />
      </div>

      {/* Hero Section Skeleton */}
      <section className="w-full bg-[#141826] py-5 md:py-4">
        <div className="max-w-[1440px] mx-auto px-3 md:px-4 lg:px-6">
          <div className="bg-[#1E2235] rounded-[16px] md:rounded-[20px] lg:rounded-[28px] p-6 md:p-10 lg:p-12">
            <div className="grid gap-6 md:gap-12 lg:gap-20 grid-cols-1 lg:grid-cols-2">
              {/* Text skeleton */}
              <div className="space-y-4 md:space-y-6">
                <div className="h-12 md:h-16 lg:h-20 bg-[#2B2D3A] rounded-lg animate-pulse w-3/4" />
                <div className="h-6 md:h-8 bg-[#2B2D3A] rounded-lg animate-pulse w-full" />
                <div className="h-10 md:h-12 bg-[#D4A94C]/30 rounded-full animate-pulse w-48" />
              </div>

              {/* Grid skeleton */}
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="bg-[#2B2D3A] rounded-xl md:rounded-2xl h-32 md:h-40 animate-pulse"
                    style={{ animationDelay: `${i * 100}ms` }}
                  />
                ))}
              </div>
            </div>

            {/* Footer bar skeleton */}
            <div className="mt-6 md:mt-8 h-12 md:h-16 bg-[#2B2D3A] rounded-lg animate-pulse" />
          </div>
        </div>
      </section>

      {/* Products Section Skeleton */}
      <section className="bg-[#141826] py-12 md:py-16">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-12">
          {/* Title skeleton */}
          <div className="mb-8 md:mb-10 text-center">
            <div className="h-10 md:h-12 bg-[#1E2235] rounded-lg animate-pulse w-64 mx-auto mb-4" />
            <div className="h-6 bg-[#1E2235] rounded-lg animate-pulse w-96 mx-auto" />
          </div>

          {/* Product cards skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-[#1E2235] rounded-[16px] md:rounded-[20px] overflow-hidden animate-pulse"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="aspect-square bg-[#2B2D3A]" />
                <div className="p-4 space-y-3">
                  <div className="h-6 bg-[#2B2D3A] rounded w-3/4" />
                  <div className="h-4 bg-[#2B2D3A] rounded w-1/2" />
                  <div className="h-8 bg-[#D4A94C]/30 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journal Section Skeleton */}
      <section className="bg-[#141826] py-12 md:py-16">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-12">
          <div className="flex justify-between items-center mb-8 md:mb-10">
            <div className="h-10 bg-[#1E2235] rounded-lg animate-pulse w-64" />
            <div className="h-10 bg-[#D4A94C]/30 rounded-full animate-pulse w-32" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-[#1E2235] rounded-2xl md:rounded-3xl overflow-hidden animate-pulse"
                style={{ animationDelay: `${i * 200}ms` }}
              >
                <div className="aspect-[4/3] bg-[#2B2D3A]" />
                <div className="p-4 space-y-3">
                  <div className="h-6 bg-[#2B2D3A] rounded w-full" />
                  <div className="h-4 bg-[#2B2D3A] rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Skeleton */}
      <div className="bg-[#1E2235] py-8 md:py-12">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-3">
                <div className="h-6 bg-[#2B2D3A] rounded w-24 animate-pulse" />
                <div className="h-4 bg-[#2B2D3A] rounded w-full animate-pulse" />
                <div className="h-4 bg-[#2B2D3A] rounded w-3/4 animate-pulse" />
              </div>
            ))}
          </div>
          <div className="h-px bg-[#2B2D3A] mb-6" />
          <div className="h-4 bg-[#2B2D3A] rounded w-48 mx-auto animate-pulse" />
        </div>
      </div>

      {/* Loading indicator */}
      <div className="fixed bottom-8 right-8 bg-[#D4A94C] text-[#141826] px-6 py-3 rounded-full shadow-2xl flex items-center gap-3">
        <div className="w-4 h-4 border-2 border-[#141826] border-t-transparent rounded-full animate-spin" />
        <span className="text-sm font-semibold" style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif" }}>
          Signing you in…
        </span>
      </div>
    </main>
  );
}
