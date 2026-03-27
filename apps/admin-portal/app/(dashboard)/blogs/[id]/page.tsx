"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { api, type Blog } from "@/lib/api";

function toDateInput(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    coverImageUrl: "",
    markdownBody: "",
    author: "",
    publishDate: "",
    isPublished: false,
    sortOrder: "0",
  });

  useEffect(() => {
    api<Blog[]>("/blogs/admin")
      .then((list: Blog[]) => {
        const b = list.find((x: Blog) => x._id === id);
        if (b) {
          setBlog(b);
          setForm({
            title: b.title,
            slug: b.slug,
            excerpt: b.excerpt,
            coverImageUrl: b.coverImageUrl,
            markdownBody: b.markdownBody,
            author: b.author,
            publishDate: toDateInput(b.publishDate),
            isPublished: b.isPublished,
            sortOrder: String(b.sortOrder),
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
      await api(`/blogs/admin/${id}`, {
        method: "PATCH",
        body: {
          title: form.title,
          slug: form.slug || undefined,
          excerpt: form.excerpt,
          coverImageUrl: form.coverImageUrl,
          markdownBody: form.markdownBody,
          author: form.author,
          publishDate: new Date(form.publishDate).toISOString(),
          isPublished: form.isPublished,
          sortOrder: parseInt(form.sortOrder, 10) || 0,
        },
      });
      router.push("/blogs");
      router.refresh();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this blog?")) return;
    try {
      await api(`/blogs/admin/${id}`, { method: "DELETE" });
      router.push("/blogs");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  };

  if (loading) return <div className="text-slate-600">Loading…</div>;
  if (error && !blog) return <div className="text-red-600">{error}</div>;
  if (!blog) return <div className="text-slate-600">Blog not found.</div>;

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <Link href="/blogs" className="text-slate-600 hover:text-slate-800">
          ← Blogs
        </Link>
        <h1 className="text-2xl font-semibold text-slate-800">Edit blog</h1>
      </div>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-2xl space-y-4">
        {error && <p className="text-red-600 text-sm bg-red-50 p-2 rounded">{error}</p>}

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
          <input
            type="text"
            required
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
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
          <label className="block text-sm font-medium text-slate-700 mb-1">Excerpt *</label>
          <textarea
            required
            value={form.excerpt}
            onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
            rows={3}
            className="w-full border border-slate-300 rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Cover image URL *</label>
          <input
            type="url"
            required
            value={form.coverImageUrl}
            onChange={(e) => setForm((f) => ({ ...f, coverImageUrl: e.target.value }))}
            className="w-full border border-slate-300 rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Body text *</label>
          <textarea
            required
            value={form.markdownBody}
            onChange={(e) => setForm((f) => ({ ...f, markdownBody: e.target.value }))}
            rows={12}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Author *</label>
            <input
              type="text"
              required
              value={form.author}
              onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
              className="w-full border border-slate-300 rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Publish date *</label>
            <input
              type="date"
              required
              value={form.publishDate}
              onChange={(e) => setForm((f) => ({ ...f, publishDate: e.target.value }))}
              className="w-full border border-slate-300 rounded-lg px-3 py-2"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isPublished}
              onChange={(e) => setForm((f) => ({ ...f, isPublished: e.target.checked }))}
              className="rounded"
            />
            <span className="text-sm text-slate-700">Published</span>
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
          <Link href="/blogs" className="py-2 px-4 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50">
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
