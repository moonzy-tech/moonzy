"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import Navigation from "../components/Navigation";
import FooterSection from "../components/FooterSection";

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
      <main className="min-h-screen bg-[#141826]">
        <Navigation />
        <section className="mx-auto max-w-[1200px] px-6 pb-20 pt-28 md:px-10 lg:px-12">
          <p className="text-sm text-[rgba(200,195,185,0.75)]">Loading your orders...</p>
        </section>
        <FooterSection />
      </main>
    );
  }

  if (!user) {
    return null;
  }

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
            className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[#D4A94C]"
            style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif" }}
          >
            Moonzy
          </p>
          <h1
            className="mb-5 text-5xl font-normal text-[#F5F0E8] md:mb-6 md:text-6xl lg:text-7xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Your Orders
          </h1>
          <p
            className="mx-auto max-w-[560px] text-base leading-relaxed text-[rgba(200,195,185,0.6)] md:text-lg"
            style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif" }}
          >
            Track your Moonzy orders and follow their current status.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-[rgba(200,195,185,0.15)]" />
            <span className="h-1.5 w-1.5 rotate-45 border border-[#D4A94C]/40" />
            <span className="h-px w-16 bg-[rgba(200,195,185,0.15)]" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 pb-20 md:px-10 md:pb-28 lg:px-12">
        {error && (
          <p className="mb-4 rounded-lg border border-[#D4A94C]/35 bg-[#D4A94C]/10 px-3 py-2 text-sm text-[#D4A94C]">
            {error}
          </p>
        )}

        <div className="rounded-[20px] border border-[rgba(200,195,185,0.08)] bg-[#1A1F33]/65 p-6 shadow-[0_8px_40px_rgba(0,0,0,0.3)] sm:p-8">
          {!orders || orders.length === 0 ? (
            <div className="text-sm text-[rgba(200,195,185,0.75)]">
              <p>You don&apos;t have any orders yet.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/product"
                  className="inline-flex items-center justify-center rounded-full bg-[#D4A94C] px-6 py-2 text-[0.7rem] uppercase tracking-[0.22em] text-[#141826] shadow-[0_14px_35px_rgba(0,0,0,0.3)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_55px_rgba(0,0,0,0.4)]"
                >
                  Shop flavours
                </Link>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-[rgba(200,195,185,0.12)] text-left text-xs font-semibold uppercase tracking-[0.18em] text-[rgba(200,195,185,0.55)]">
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
                      className="border-b border-[rgba(200,195,185,0.08)] last:border-0 hover:bg-white/5"
                    >
                      <td className="py-3 pr-4 font-semibold text-[#F5F0E8]">
                        {order.orderNumber}
                      </td>
                      <td className="py-3 pr-4 text-[rgba(200,195,185,0.72)]">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="py-3 pr-4 text-[#F5F0E8]">
                        {formatMoney(order.total)}
                      </td>
                      <td className="py-3 pr-4">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                            order.status === "delivered"
                              ? "bg-emerald-200/20 text-emerald-300"
                              : order.status === "cancelled"
                                ? "bg-red-200/20 text-red-300"
                                : order.status === "paid" || order.status === "processing"
                                  ? "bg-[#D4A94C]/20 text-[#D4A94C]"
                                  : "bg-slate-200/20 text-slate-200"
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
      <FooterSection />
    </main>
  );
}

