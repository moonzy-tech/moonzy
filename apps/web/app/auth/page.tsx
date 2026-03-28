"use client";

import { useGoogleLogin } from "@react-oauth/google";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Navigation from "../components/Navigation";
import FooterSection from "../components/FooterSection";

function GoogleLoginButton() {
  const login = useGoogleLogin({
    flow: "auth-code",
    ux_mode: "redirect",
    redirect_uri:
      typeof window !== "undefined" ? `${window.location.origin}/auth/callback` : "",
  });

  return (
    <div className="flex justify-center rounded-2xl border border-[rgba(200,195,185,0.12)] bg-[#141826]/60 p-4">
      <button
        onClick={() => login()}
        className="flex items-center gap-3 rounded-full border border-[rgba(200,195,185,0.18)] bg-[#F5F0E8] px-6 py-2.5 text-sm font-medium text-[#141826] shadow-sm transition hover:bg-white"
        style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif" }}
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
  );
}

function AuthPageInner() {
  const searchParams = useSearchParams();
  const failed = searchParams.get("error") === "sign_in_failed";
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  return (
    <main className="min-h-screen bg-[#141826]">
      <Navigation />

      <section className="relative overflow-hidden pt-24 pb-16 md:pb-20">
        <div
          className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 opacity-[0.07]"
          style={{
            background: "radial-gradient(ellipse at center, #D4A94C 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-[1200px] px-6 text-center md:px-10 lg:px-12">
          <p
            className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[#D4A94C] opacity-0 animate-fadeInUp"
            style={{
              fontFamily: "'Instrument Sans', system-ui, sans-serif",
              animationDelay: "100ms",
              animationFillMode: "forwards",
            }}
          >
            Account
          </p>

          <h1
            className="mb-5 text-5xl font-normal text-[#F5F0E8] opacity-0 animate-fadeInUp md:mb-6 md:text-6xl lg:text-7xl"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              animationDelay: "200ms",
              animationFillMode: "forwards",
            }}
          >
            Sign In to Moonzy
          </h1>

          <p
            className="mx-auto max-w-[560px] text-base leading-relaxed text-[rgba(200,195,185,0.6)] opacity-0 animate-fadeInUp md:text-lg"
            style={{
              fontFamily: "'Instrument Sans', system-ui, sans-serif",
              animationDelay: "300ms",
              animationFillMode: "forwards",
            }}
          >
            Continue with Google to access your profile, orders, and checkout
            faster on your next snack run.
          </p>

          <div
            className="mt-8 flex items-center justify-center gap-3 opacity-0 animate-fadeInUp"
            style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
          >
            <span className="h-px w-16 bg-[rgba(200,195,185,0.15)]" />
            <span className="h-1.5 w-1.5 rotate-45 border border-[#D4A94C]/40" />
            <span className="h-px w-16 bg-[rgba(200,195,185,0.15)]" />
          </div>
        </div>
      </section>

      <section className="mx-auto mb-20 max-w-[1200px] px-6 md:mb-24 md:px-10 lg:px-12">
        <div className="mx-auto w-full max-w-[640px] rounded-[20px] border border-[rgba(200,195,185,0.08)] bg-[#1A1F33]/65 p-6 shadow-[0_8px_40px_rgba(0,0,0,0.3)] md:rounded-[24px] md:p-8">
          <div className="mb-5 flex items-center gap-4">
            <span
              className="text-xs font-semibold uppercase tracking-[0.2em] text-[rgba(200,195,185,0.45)]"
              style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif" }}
            >
              Secure Login
            </span>
            <span className="h-px flex-1 bg-[rgba(200,195,185,0.08)]" />
          </div>

          {!googleClientId ? (
            <div
              className="rounded-2xl border border-[#D4A94C]/25 bg-[#D4A94C]/10 p-4 text-sm text-[rgba(245,240,232,0.78)]"
              style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif" }}
            >
              <p className="font-semibold text-[#F5F0E8]">
                Google sign-in isn&apos;t configured yet.
              </p>
              <p className="mt-1.5">
                Set{" "}
                <span className="rounded bg-black/20 px-1 py-0.5 font-mono text-[#D4A94C]">
                  NEXT_PUBLIC_GOOGLE_CLIENT_ID
                </span>{" "}
                and restart the web app.
              </p>
            </div>
          ) : (
            <GoogleLoginButton />
          )}

          {failed && (
            <p
              className="mt-4 text-sm font-medium text-[#D4A94C]"
              role="alert"
              style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif" }}
            >
              Google sign-in failed. Please try again.
            </p>
          )}

          <div
            className="mt-6 flex items-center justify-between text-sm text-[rgba(200,195,185,0.75)]"
            style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif" }}
          >
            <Link href="/" className="underline underline-offset-4 hover:text-[#F5F0E8]">
              Back to home
            </Link>
            <Link
              href="/product"
              className="underline underline-offset-4 hover:text-[#F5F0E8]"
            >
              Browse products
            </Link>
          </div>
        </div>
      </section>

      <FooterSection />
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
