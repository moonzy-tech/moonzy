"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api, type Dashboard as DashboardType } from "@/lib/api";

function formatMoney(paise: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(paise / 100);
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api<DashboardType>("/admin/dashboard")
      .then(setData)
      .catch((e) => setError(e instanceof Error ? e.message : String(e)))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-slate-600">Loading dashboard…</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!data) return null;

  const cards = [
    { label: "Total orders", value: data.totalOrders },
    { label: "Total revenue", value: formatMoney(data.totalRevenue) },
    { label: "Pending orders", value: data.pendingOrders },
    { label: "Paid (unfulfilled)", value: data.paidOrders },
    { label: "Products", value: data.productCount },
    { label: "Customers", value: data.customerCount },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {cards.map(({ label, value }) => (
          <div key={label} className="bg-white rounded-lg shadow p-4">
            <p className="text-slate-500 text-sm">{label}</p>
            <p className="text-xl font-semibold text-slate-800 mt-1">{value}</p>
          </div>
        ))}
      </div>
      {data.revenueByStatus?.length > 0 && (
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <h2 className="font-medium text-slate-800 mb-3">Revenue by status</h2>
          <ul className="space-y-1 text-sm">
            {data.revenueByStatus.map((r) => (
              <li key={r._id} className="flex justify-between">
                <span className="text-slate-600">{r._id}</span>
                <span>{formatMoney(r.total)}</span>
                <span className="text-slate-500">({r.count} orders)</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center">
          <h2 className="font-medium text-slate-800">Recent orders</h2>
          <Link href="/orders" className="text-sm text-slate-600 hover:text-slate-800">
            View all
          </Link>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-left">
              <th className="p-3 font-medium text-slate-600">Order</th>
              <th className="p-3 font-medium text-slate-600">Customer</th>
              <th className="p-3 font-medium text-slate-600">Total</th>
              <th className="p-3 font-medium text-slate-600">Status</th>
              <th className="p-3 font-medium text-slate-600">Date</th>
            </tr>
          </thead>
          <tbody>
            {data.recentOrders?.map((o) => (
              <tr key={o._id} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="p-3">
                  <Link href={`/orders/${o._id}`} className="text-slate-800 font-medium hover:underline">
                    {o.orderNumber}
                  </Link>
                </td>
                <td className="p-3 text-slate-600">
                  {(o.userId as { email?: string; name?: string })?.email ?? "—"}
                </td>
                <td className="p-3">{formatMoney(o.total)}</td>
                <td className="p-3">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs ${
                      o.status === "delivered"
                        ? "bg-green-100 text-green-800"
                        : o.status === "cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {o.status}
                  </span>
                </td>
                <td className="p-3 text-slate-500">
                  {o.createdAt ? new Date(o.createdAt).toLocaleDateString() : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {(!data.recentOrders || data.recentOrders.length === 0) && (
          <p className="p-4 text-slate-500 text-center">No orders yet.</p>
        )}
      </div>
    </div>
  );
}
