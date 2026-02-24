"use client";

import { useGoogleLogin } from "@react-oauth/google";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function AuthPageInner() {
  const searchParams = useSearchParams();
  const failed = searchParams.get("error") === "sign_in_failed";
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  const login = useGoogleLogin({
    flow: "auth-code",
    ux_mode: "redirect",
    redirect_uri: typeof window !== "undefined"
      ? `${window.location.origin}/auth/callback`
      : "",
  });

  return (
    <main className="min-h-screen bg-[#FDF5E5] pt-28 pb-20 text-[#13241A]">
      <section className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="mx-auto max-w-lg rounded-3xl bg-white/90 p-6 shadow-[0_22px_60px_rgba(0,0,0,0.08)] md:p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-[#A45715] md:text-sm">
            Moonzy
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-[#1E3B2A] sm:text-4xl">
            Sign in
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-[#4C4A3F] sm:text-base">
            Continue with Google to access your account.
          </p>

          <div className="mt-6 flex flex-col gap-3">
            {!googleClientId ? (
              <div className="rounded-2xl border border-[#E1D4C1] bg-[#FDF5E5] p-4 text-sm text-[#4C4A3F]">
                <p className="font-semibold text-[#1E3B2A]">
                  Google sign-in isn&apos;t configured yet.
                </p>
                <p className="mt-1">
                  Set{" "}
                  <span className="font-mono">NEXT_PUBLIC_GOOGLE_CLIENT_ID</span>{" "}
                  in your environment, then refresh.
                </p>
              </div>
            ) : (
              <div className="flex justify-center rounded-2xl border border-[#E1D4C1] bg-white p-4">
                <button
                  onClick={() => login()}
                  className="flex items-center gap-3 rounded-full border border-[#E1D4C1] bg-white px-6 py-2.5 text-sm font-medium text-[#1E3B2A] shadow-sm transition hover:bg-[#FDF5E5]"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                    <g fill="none" fillRule="evenodd">
                      <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
                    </g>
                  </svg>
                  Continue with Google
                </button>
              </div>
            )}

            {failed && (
              <p className="text-sm font-medium text-[#A45715]" role="alert">
                Google sign-in failed. Please try again.
              </p>
            )}

            <div className="mt-2 flex items-center justify-between text-sm">
              <Link href="/" className="text-[#1E3B2A] underline underline-offset-4">
                Back to home
              </Link>
              <Link
                href="/product"
                className="text-[#1E3B2A] underline underline-offset-4"
              >
                Browse products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function AuthPage() {
  return (
    <Suspense>
      <AuthPageInner />
    </Suspense>
  );
}
