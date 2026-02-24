"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api, type User } from "@/lib/api";

const nav = [
  { href: "/", label: "Dashboard" },
  { href: "/products", label: "Products" },
  { href: "/orders", label: "Orders" },
  { href: "/customers", label: "Customers" },
  { href: "/shipments", label: "Shipments" },
];

export default function DashboardLayout({
  children,
}: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function checkAuth() {
      try {
        const res = await api<{ user: User | null }>("/auth/me");
        if (cancelled) return;
        if (!res.user || res.user.role !== "admin") {
          router.replace("/login");
          return;
        }
        setAuthorized(true);
      } catch {
        if (!cancelled) {
          router.replace("/login");
        }
      } finally {
        if (!cancelled) setChecking(false);
      }
    }
    void checkAuth();
    return () => {
      cancelled = true;
    };
  }, [router]);

  if (checking || !authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="text-slate-600 text-sm">Checking admin access…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-100">
      <aside className="w-56 bg-slate-800 text-white flex flex-col">
        <div className="p-4 border-b border-slate-700">
          <Link href="/" className="font-semibold text-lg">
            Moonzy Admin
          </Link>
        </div>
        <nav className="flex-1 p-2">
          {nav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`block py-2 px-3 rounded mb-1 ${
                pathname === href || (href !== "/" && pathname.startsWith(href))
                  ? "bg-slate-700"
                  : "hover:bg-slate-700/70"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  );
}
