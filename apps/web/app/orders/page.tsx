"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth";

type Order = {
  _id: string;
  orderNumber: string;
  total: number;
  status: string;
  createdAt: string;
};

function formatMoney(paise: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(paise / 100);
}

export default function OrdersPage() {
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      if (typeof window !== "undefined") {
        window.location.href = "/auth";
      }
      return;
    }

    api<Order[]>("/orders")
      .then(setOrders)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : String(e)))
      .finally(() => setLoading(false));
  }, [authLoading, user]);

  if (authLoading || (loading && !orders)) {
    return (
      <main className="min-h-screen bg-[#FDF5E5] pt-28 pb-20 text-[#13241A]">
        <section className="mx-auto max-w-6xl px-6 lg:px-10">
          <p className="text-sm text-[#4C4A3F]">Loading your orders…</p>
        </section>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#FDF5E5] pt-28 pb-20 text-[#13241A]">
      <section className="mx-auto max-w-6xl px-6 lg:px-10">
        <p className="text-xs uppercase tracking-[0.3em] text-[#A45715] md:text-sm">
          Moonzy
        </p>
        <h1 className="mt-3 text-3xl font-bold leading-tight text-[#1E3B2A] sm:text-4xl md:text-5xl">
          Your orders
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[#4C4A3F] sm:text-base">
          Track your Moonzy orders and see their current status.
        </p>

        {error && (
          <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <div className="mt-8 rounded-3xl bg-white/95 p-6 shadow-[0_22px_60px_rgba(0,0,0,0.08)] sm:p-8">
          {!orders || orders.length === 0 ? (
            <div className="text-sm text-[#4C4A3F]">
              <p>You don&apos;t have any orders yet.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/product"
                  className="inline-flex items-center justify-center rounded-full bg-[#1E3B2A] px-6 py-2 text-[0.7rem] uppercase tracking-[0.22em] text-white shadow-[0_14px_35px_rgba(0,0,0,0.3)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_55px_rgba(0,0,0,0.4)]"
                >
                  Shop flavours
                </Link>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-[#E1D4C1] text-left text-xs font-semibold uppercase tracking-[0.18em] text-[#7A6C54]">
                    <th className="py-2 pr-4">Order</th>
                    <th className="py-2 pr-4">Date</th>
                    <th className="py-2 pr-4">Total</th>
                    <th className="py-2 pr-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-b border-[#F1E5D4] last:border-0 hover:bg-[#FDF5E5]"
                    >
                      <td className="py-3 pr-4 font-semibold text-[#1E3B2A]">
                        {order.orderNumber}
                      </td>
                      <td className="py-3 pr-4 text-[#4C4A3F]">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="py-3 pr-4 text-[#1E3B2A]">
                        {formatMoney(order.total)}
                      </td>
                      <td className="py-3 pr-4">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                            order.status === "delivered"
                              ? "bg-emerald-100 text-emerald-800"
                              : order.status === "cancelled"
                                ? "bg-red-100 text-red-700"
                                : order.status === "paid" || order.status === "processing"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

