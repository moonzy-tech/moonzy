"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";

type ShipmentsRes = { shipments: Shipment[]; total: number };
type Shipment = {
  _id: string;
  orderId: { _id: string; orderNumber?: string };
  shiprocketOrderId?: string;
  awbCode?: string;
  courierName?: string;
  status: string;
  trackingUrl?: string;
  createdAt: string;
};

export default function ShipmentsPage() {
  const [data, setData] = useState<ShipmentsRes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api<ShipmentsRes>("/admin/shipments")
      .then(setData)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : String(e)))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-slate-600">Loading shipments…</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!data) return null;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-800 mb-6">Shipments</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-left">
              <th className="p-3 font-medium text-slate-600">Order</th>
              <th className="p-3 font-medium text-slate-600">Shiprocket ID</th>
              <th className="p-3 font-medium text-slate-600">AWB</th>
              <th className="p-3 font-medium text-slate-600">Courier</th>
              <th className="p-3 font-medium text-slate-600">Status</th>
              <th className="p-3 font-medium text-slate-600">Created</th>
              <th className="p-3 font-medium text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.shipments.map((s) => (
              <tr key={s._id} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="p-3">
                  <Link
                    href={`/orders/${(s.orderId as { _id: string })._id}`}
                    className="font-medium text-slate-800 hover:underline"
                  >
                    {(s.orderId as { orderNumber?: string }).orderNumber ?? s._id}
                  </Link>
                </td>
                <td className="p-3 text-slate-600">{s.shiprocketOrderId ?? "—"}</td>
                <td className="p-3">{s.awbCode ?? "—"}</td>
                <td className="p-3">{s.courierName ?? "—"}</td>
                <td className="p-3">
                  <span className="inline-block px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-700">
                    {s.status}
                  </span>
                </td>
                <td className="p-3 text-slate-500">
                  {new Date(s.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3">
                  {s.trackingUrl ? (
                    <a
                      href={s.trackingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-600 hover:underline"
                    >
                      Track
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.shipments.length === 0 && (
          <p className="p-6 text-slate-500 text-center">
            No shipments yet. Create one from an order detail page (paid/processing orders).
          </p>
        )}
      </div>
    </div>
  );
}
