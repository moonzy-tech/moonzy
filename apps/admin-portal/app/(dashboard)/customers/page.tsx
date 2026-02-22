"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";

type CustomersRes = { customers: Customer[]; total: number };
type Customer = {
  _id: string;
  email: string;
  name?: string;
  picture?: string;
  createdAt: string;
  orderCount?: number;
  totalSpent?: number;
};

function formatMoney(paise: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(paise / 100);
}

export default function CustomersPage() {
  const [data, setData] = useState<CustomersRes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api<CustomersRes>("/admin/customers")
      .then(setData)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : String(e)))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-slate-600">Loading customers…</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!data) return null;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-800 mb-6">Customers</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-left">
              <th className="p-3 font-medium text-slate-600">Name</th>
              <th className="p-3 font-medium text-slate-600">Email</th>
              <th className="p-3 font-medium text-slate-600">Orders</th>
              <th className="p-3 font-medium text-slate-600">Total spent</th>
              <th className="p-3 font-medium text-slate-600">Joined</th>
              <th className="p-3 font-medium text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.customers.map((c) => (
              <tr key={c._id} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="p-3 font-medium text-slate-800">{c.name ?? "—"}</td>
                <td className="p-3 text-slate-600">{c.email}</td>
                <td className="p-3">{c.orderCount ?? 0}</td>
                <td className="p-3">{formatMoney(c.totalSpent ?? 0)}</td>
                <td className="p-3 text-slate-500">
                  {new Date(c.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <Link
                    href={`/customers/${c._id}`}
                    className="text-slate-600 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.customers.length === 0 && (
          <p className="p-6 text-slate-500 text-center">No customers yet.</p>
        )}
      </div>
    </div>
  );
}
