"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api, type Product } from "@/lib/api";

function formatMoney(paise: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(paise / 100);
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api<Product[]>("/products/admin")
      .then(setProducts)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : String(e)))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-slate-600">Loading products…</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-slate-800">Products</h1>
        <Link
          href="/products/new"
          className="py-2 px-4 bg-slate-800 text-white rounded-lg hover:bg-slate-700 font-medium text-sm"
        >
          Add product
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-left">
              <th className="p-3 font-medium text-slate-600">Name</th>
              <th className="p-3 font-medium text-slate-600">Slug</th>
              <th className="p-3 font-medium text-slate-600">Price</th>
              <th className="p-3 font-medium text-slate-600">Stock</th>
              <th className="p-3 font-medium text-slate-600">Status</th>
              <th className="p-3 font-medium text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="p-3 font-medium text-slate-800">{p.name}</td>
                <td className="p-3 text-slate-600">{p.slug}</td>
                <td className="p-3">{formatMoney(p.price)}</td>
                <td className="p-3">{p.stock}</td>
                <td className="p-3">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs ${
                      p.isActive ? "bg-green-100 text-green-800" : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {p.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="p-3">
                  <Link
                    href={`/products/${p._id}`}
                    className="text-slate-600 hover:text-slate-800 underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && (
          <p className="p-6 text-slate-500 text-center">No products. Add one to get started.</p>
        )}
      </div>
    </div>
  );
}
