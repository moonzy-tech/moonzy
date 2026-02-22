"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";

type OrdersRes = { orders: Order[]; total: number };
type Order = {
  _id: string;
  orderNumber: string;
  total: number;
  status: string;
  createdAt: string;
  userId?: { email?: string; name?: string };
};

function formatMoney(paise: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(paise / 100);
}

const STATUS_OPTIONS = ["pending", "paid", "processing", "shipped", "delivered", "cancelled"];

export default function OrdersPage() {
  const [data, setData] = useState<OrdersRes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("");

  useEffect(() => {
    const q = statusFilter ? `?status=${encodeURIComponent(statusFilter)}` : "";
    api<OrdersRes>(`/admin/orders${q}`)
      .then(setData)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : String(e)))
      .finally(() => setLoading(false));
  }, [statusFilter]);

  if (loading) return <div className="text-slate-600">Loading orders…</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!data) return null;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-slate-800">Orders</h1>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-slate-300 rounded-lg px-3 py-2 text-sm"
        >
          <option value="">All statuses</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-left">
              <th className="p-3 font-medium text-slate-600">Order</th>
              <th className="p-3 font-medium text-slate-600">Customer</th>
              <th className="p-3 font-medium text-slate-600">Total</th>
              <th className="p-3 font-medium text-slate-600">Status</th>
              <th className="p-3 font-medium text-slate-600">Date</th>
              <th className="p-3 font-medium text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.orders.map((o) => (
              <tr key={o._id} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="p-3 font-medium">
                  <Link href={`/orders/${o._id}`} className="text-slate-800 hover:underline">
                    {o.orderNumber}
                  </Link>
                </td>
                <td className="p-3 text-slate-600">
                  {(o.userId as { email?: string })?.email ?? "—"}
                </td>
                <td className="p-3">{formatMoney(o.total)}</td>
                <td className="p-3">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs ${
                      o.status === "delivered"
                        ? "bg-green-100 text-green-800"
                        : o.status === "cancelled"
                          ? "bg-red-100 text-red-800"
                          : o.status === "paid" || o.status === "processing"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {o.status}
                  </span>
                </td>
                <td className="p-3 text-slate-500">
                  {new Date(o.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <Link href={`/orders/${o._id}`} className="text-slate-600 hover:underline">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.orders.length === 0 && (
          <p className="p-6 text-slate-500 text-center">No orders match the filter.</p>
        )}
      </div>
    </div>
  );
}
