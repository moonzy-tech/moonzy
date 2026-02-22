"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api, type Order } from "@/lib/api";

function CreateShipmentButton({
  orderId,
  onSuccess,
}: {
  orderId: string;
  onSuccess: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const create = async () => {
    setErr(null);
    setLoading(true);
    try {
      await api<{ ok: boolean }>(`/admin/shipments/create/${orderId}`, {
        method: "POST",
      });
      onSuccess();
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={create}
        disabled={loading}
        className="py-2 px-4 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 text-sm font-medium"
      >
        {loading ? "Creating…" : "Create shipment (Shiprocket)"}
      </button>
      {err && <p className="mt-2 text-red-600 text-sm">{err}</p>}
    </div>
  );
}

function formatMoney(paise: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(paise / 100);
}

const STATUS_OPTIONS = ["pending", "paid", "processing", "shipped", "delivered", "cancelled"];

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    api<Order>(`/admin/orders/${id}`)
      .then((o) => {
        setOrder(o);
        setNewStatus(o.status);
      })
      .catch((e) => setError(e instanceof Error ? e.message : String(e)))
      .finally(() => setLoading(false));
  }, [id]);

  const handleStatusChange = async () => {
    if (!order || newStatus === order.status) return;
    setUpdating(true);
    setError(null);
    try {
      const updated = await api<Order>(`/admin/orders/${id}`, {
        method: "PATCH",
        body: { status: newStatus },
      });
      setOrder(updated);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="text-slate-600">Loading order…</div>;
  if (error && !order) return <div className="text-red-600">{error}</div>;
  if (!order) return <div className="text-slate-600">Order not found.</div>;

  const user = order.userId as { _id: string; email?: string; name?: string } | undefined;

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <Link href="/orders" className="text-slate-600 hover:text-slate-800">
          ← Orders
        </Link>
        <h1 className="text-2xl font-semibold text-slate-800">{order.orderNumber}</h1>
        <span
          className={`inline-block px-3 py-1 rounded text-sm ${
            order.status === "delivered"
              ? "bg-green-100 text-green-800"
              : order.status === "cancelled"
                ? "bg-red-100 text-red-800"
                : "bg-slate-100 text-slate-700"
          }`}
        >
          {order.status}
        </span>
      </div>

      {error && (
        <p className="mb-4 text-red-600 text-sm bg-red-50 p-2 rounded">{error}</p>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="font-medium text-slate-800 mb-3">Customer</h2>
          <p className="text-slate-600">{user?.name ?? "—"}</p>
          <p className="text-slate-600">{user?.email ?? "—"}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="font-medium text-slate-800 mb-3">Shipping address</h2>
          <p className="text-slate-600">{order.shippingAddress.name}</p>
          <p className="text-slate-600">{order.shippingAddress.addressLine1}</p>
          {order.shippingAddress.addressLine2 && (
            <p className="text-slate-600">{order.shippingAddress.addressLine2}</p>
          )}
          <p className="text-slate-600">
            {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
            {order.shippingAddress.pincode}
          </p>
          <p className="text-slate-600">{order.shippingAddress.phone}</p>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-lg shadow p-6">
        <h2 className="font-medium text-slate-800 mb-3">Items</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500">
              <th className="pb-2">Product</th>
              <th className="pb-2">Qty</th>
              <th className="pb-2 text-right">Price</th>
              <th className="pb-2 text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item: { name: string; quantity: number; price: number }, i: number) => (
              <tr key={i} className="border-t border-slate-100">
                <td className="py-2 text-slate-800">{item.name}</td>
                <td className="py-2">{item.quantity}</td>
                <td className="py-2 text-right">{formatMoney(item.price)}</td>
                <td className="py-2 text-right">
                  {formatMoney(item.price * item.quantity)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 pt-4 border-t border-slate-200 flex justify-end gap-6 text-sm">
          <span>Subtotal: {formatMoney(order.subtotal)}</span>
          <span>Shipping: {formatMoney(order.shippingAmount)}</span>
          <span>Tax: {formatMoney(order.taxAmount)}</span>
          <span className="font-semibold">Total: {formatMoney(order.total)}</span>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-lg shadow p-6">
        <h2 className="font-medium text-slate-800 mb-3">Update status</h2>
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="border border-slate-300 rounded-lg px-3 py-2 text-sm"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleStatusChange}
            disabled={updating || newStatus === order.status}
            className="py-2 px-4 bg-slate-800 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50 text-sm font-medium"
          >
            {updating ? "Saving…" : "Save status"}
          </button>
        </div>
      </div>

      {(order.status === "paid" || order.status === "processing") && (
        <CreateShipmentButton orderId={id} onSuccess={() => setOrder((o: Order | null) => (o ? { ...o, status: "processing" } : o))} />
      )}
    </div>
  );
}
