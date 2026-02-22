"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { api, type Product } from "@/lib/api";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    compareAtPrice: "",
    imageUrl: "",
    sku: "",
    stock: "0",
    isActive: true,
    sortOrder: "0",
  });

  useEffect(() => {
    api<Product[]>(`/products/admin`)
      .then((list: Product[]) => {
        const p = list.find((x: Product) => x._id === id);
        if (p) {
          setProduct(p);
          setForm({
            name: p.name,
            slug: p.slug,
            description: p.description ?? "",
            price: (p.price / 100).toFixed(2),
            compareAtPrice: p.compareAtPrice != null ? (p.compareAtPrice / 100).toFixed(2) : "",
            imageUrl: p.imageUrl ?? "",
            sku: p.sku ?? "",
            stock: String(p.stock),
            isActive: p.isActive,
            sortOrder: String(p.sortOrder),
          });
        }
      })
      .catch((e) => setError(e instanceof Error ? e.message : String(e)))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      await api(`/products/admin/${id}`, {
        method: "PATCH",
        body: {
          name: form.name,
          slug: form.slug || undefined,
          description: form.description || undefined,
          price: Math.round(parseFloat(form.price || "0") * 100),
          compareAtPrice: form.compareAtPrice
            ? Math.round(parseFloat(form.compareAtPrice) * 100)
            : undefined,
          imageUrl: form.imageUrl || undefined,
          sku: form.sku || undefined,
          stock: parseInt(form.stock, 10) || 0,
          isActive: form.isActive,
          sortOrder: parseInt(form.sortOrder, 10) || 0,
        },
      });
      router.push("/products");
      router.refresh();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this product?")) return;
    try {
      await api(`/products/admin/${id}`, { method: "DELETE" });
      router.push("/products");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  };

  if (loading) return <div className="text-slate-600">Loading…</div>;
  if (error && !product) return <div className="text-red-600">{error}</div>;
  if (!product) return <div className="text-slate-600">Product not found.</div>;

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <Link href="/products" className="text-slate-600 hover:text-slate-800">
          ← Products
        </Link>
        <h1 className="text-2xl font-semibold text-slate-800">Edit product</h1>
      </div>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-xl space-y-4">
        {error && (
          <p className="text-red-600 text-sm bg-red-50 p-2 rounded">{error}</p>
        )}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Name *</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="w-full border border-slate-300 rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Slug</label>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
            className="w-full border border-slate-300 rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            rows={3}
            className="w-full border border-slate-300 rounded-lg px-3 py-2"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Price (₹) *</label>
            <input
              type="number"
              step="0.01"
              min="0"
              required
              value={form.price}
              onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
              className="w-full border border-slate-300 rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Compare at (₹)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={form.compareAtPrice}
              onChange={(e) => setForm((f) => ({ ...f, compareAtPrice: e.target.value }))}
              className="w-full border border-slate-300 rounded-lg px-3 py-2"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Stock</label>
            <input
              type="number"
              min="0"
              value={form.stock}
              onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))}
              className="w-full border border-slate-300 rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">SKU</label>
            <input
              type="text"
              value={form.sku}
              onChange={(e) => setForm((f) => ({ ...f, sku: e.target.value }))}
              className="w-full border border-slate-300 rounded-lg px-3 py-2"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Image URL</label>
          <input
            type="url"
            value={form.imageUrl}
            onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
            className="w-full border border-slate-300 rounded-lg px-3 py-2"
          />
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))}
              className="rounded"
            />
            <span className="text-sm text-slate-700">Active</span>
          </label>
          <div>
            <label className="text-sm font-medium text-slate-700 mr-2">Sort order</label>
            <input
              type="number"
              value={form.sortOrder}
              onChange={(e) => setForm((f) => ({ ...f, sortOrder: e.target.value }))}
              className="w-20 border border-slate-300 rounded-lg px-2 py-1 text-sm"
            />
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="py-2 px-4 bg-slate-800 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50 font-medium"
          >
            {saving ? "Saving…" : "Save"}
          </button>
          <Link
            href="/products"
            className="py-2 px-4 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </Link>
          <button
            type="button"
            onClick={handleDelete}
            className="py-2 px-4 text-red-600 hover:bg-red-50 rounded-lg ml-auto"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}
