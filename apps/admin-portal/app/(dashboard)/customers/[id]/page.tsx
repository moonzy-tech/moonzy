"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";

type CustomerDetail = {
  _id: string;
  email: string;
  name?: string;
  picture?: string;
  createdAt: string;
  orders?: Array<{
    _id: string;
    orderNumber: string;
    total: number;
    status: string;
    createdAt: string;
  }>;
};

function formatMoney(paise: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(paise / 100);
}

export default function CustomerDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [customer, setCustomer] = useState<CustomerDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api<CustomerDetail>(`/admin/customers/${id}`)
      .then(setCustomer)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : String(e)))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-slate-600">Loading…</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!customer) return <div className="text-slate-600">Customer not found.</div>;

  return (
    <div>
      <div className="mb-6">
        <Link href="/customers" className="text-slate-600 hover:text-slate-800">
          ← Customers
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h1 className="text-2xl font-semibold text-slate-800 mb-4">
          {customer.name ?? customer.email}
        </h1>
        <p className="text-slate-600">{customer.email}</p>
        <p className="text-slate-500 text-sm mt-1">
          Joined {new Date(customer.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <h2 className="p-4 border-b border-slate-200 font-medium text-slate-800">
          Order history
        </h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-left">
              <th className="p-3 font-medium text-slate-600">Order</th>
              <th className="p-3 font-medium text-slate-600">Total</th>
              <th className="p-3 font-medium text-slate-600">Status</th>
              <th className="p-3 font-medium text-slate-600">Date</th>
            </tr>
          </thead>
          <tbody>
            {(customer.orders ?? []).map((o) => (
              <tr key={o._id} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="p-3">
                  <Link
                    href={`/orders/${o._id}`}
                    className="font-medium text-slate-800 hover:underline"
                  >
                    {o.orderNumber}
                  </Link>
                </td>
                <td className="p-3">{formatMoney(o.total)}</td>
                <td className="p-3">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs ${
                      o.status === "delivered"
                        ? "bg-green-100 text-green-800"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {o.status}
                  </span>
                </td>
                <td className="p-3 text-slate-500">
                  {new Date(o.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {(!customer.orders || customer.orders.length === 0) && (
          <p className="p-6 text-slate-500 text-center">No orders yet.</p>
        )}
      </div>
    </div>
  );
}
