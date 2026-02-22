"use client";

import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const code = (tokenResponse as { code?: string }).code;
      if (!code) {
        alert("Google did not return a code.");
        return;
      }
      const redirectUri =
        typeof window !== "undefined"
          ? `${window.location.origin}${window.location.pathname}`
          : "";
      try {
        await api<{ user: { role: string } }>("/auth/google", {
          method: "POST",
          body: { code, redirectUri },
        });
        router.push("/");
        router.refresh();
      } catch (e) {
        alert("Login failed: " + (e instanceof Error ? e.message : String(e)));
      }
    },
    flow: "auth-code",
    scope: "openid email profile",
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-sm">
        <h1 className="text-2xl font-semibold text-slate-800 mb-2">Moonzy Admin</h1>
        <p className="text-slate-600 mb-6">Sign in with your Google account.</p>
        <button
          type="button"
          onClick={() => login()}
          className="w-full py-3 px-4 bg-slate-800 text-white rounded-lg hover:bg-slate-700 font-medium"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
