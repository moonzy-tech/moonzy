"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@moonzy.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await api<{ user: { role: string } }>("/auth/admin-login", {
        method: "POST",
        body: { email, password },
      });
      router.push("/");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full">
        <h1 className="text-2xl font-semibold text-slate-800 mb-2 text-center">
          Moonzy Admin
        </h1>
        <p className="text-slate-600 mb-6 text-center text-sm">
          Sign in with your admin email and password.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1 text-left">
            <label
              htmlFor="email"
              className="block text-xs font-semibold uppercase tracking-wide text-slate-600"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-800"
              autoComplete="username"
            />
          </div>
          <div className="space-y-1 text-left">
            <label
              htmlFor="password"
              className="block text-xs font-semibold uppercase tracking-wide text-slate-600"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-800"
              autoComplete="current-password"
            />
          </div>
          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-slate-800 text-white rounded-lg hover:bg-slate-700 font-medium disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <p className="mt-4 text-xs text-slate-400 text-center">
          Default admin: admin@moonzy.com / admin123
        </p>
      </div>
    </div>
  );
}
