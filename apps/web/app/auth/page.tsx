"use client";

import { GoogleLogin } from "@react-oauth/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { api, type User } from "@/lib/api";
import { useAuth } from "@/lib/auth";

export default function AuthPage() {
  const router = useRouter();
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const [error, setError] = useState<string | null>(null);
  const { refresh } = useAuth();

  const missingClientId = useMemo(() => !googleClientId, [googleClientId]);

  return (
    <main className="min-h-screen bg-[#FDF5E5] pt-28 pb-20 text-[#13241A]">
      <section className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="mx-auto max-w-lg rounded-3xl bg:white/90 p-6 shadow-[0_22px_60px_rgba(0,0,0,0.08)] md:p-8">
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
            {missingClientId ? (
              <div className="rounded-2xl border border-[#E1D4C1] bg-[#FDF5E5] p-4 text-sm text-[#4C4A3F]">
                <p className="font-semibold text-[#1E3B2A]">
                  Google sign-in isn&apos;t configured yet.
                </p>
                <p className="mt-1">
                  Set <span className="font-mono">NEXT_PUBLIC_GOOGLE_CLIENT_ID</span>{" "}
                  in your environment, then refresh.
                </p>
              </div>
            ) : (
              <div className="flex justify-center rounded-2xl border border-[#E1D4C1] bg-white p-4">
                <GoogleLogin
                  onSuccess={async (credentialResponse) => {
                    setError(null);
                    if (!credentialResponse.credential) {
                      setError("Google sign-in did not return a credential.");
                      return;
                    }

                    try {
                      await api<{ user: User }>("/auth/google", {
                        method: "POST",
                        body: { idToken: credentialResponse.credential },
                      });
                      await refresh();
                      router.push("/");
                    } catch (e) {
                      setError(
                        e instanceof Error
                          ? e.message
                          : "Unable to sign in with Google. Please try again.",
                      );
                    }
                  }}
                  onError={() =>
                    setError("Google sign-in failed. Please try again.")
                  }
                  useOneTap={false}
                  theme="outline"
                  size="large"
                  text="continue_with"
                  shape="pill"
                />
              </div>
            )}

            {error && (
              <p className="text-sm font-medium text-[#A45715]" role="alert">
                {error}
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
