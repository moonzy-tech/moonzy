"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
