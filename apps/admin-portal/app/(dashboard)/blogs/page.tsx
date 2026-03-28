"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api, type Blog } from "@/lib/api";

function formatDate(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api<Blog[]>("/blogs/admin")
      .then(setBlogs)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : String(e)))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-slate-600">Loading blogs…</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-slate-800">Blogs</h1>
        <Link
          href="/blogs/new"
          className="py-2 px-4 bg-slate-800 text-white rounded-lg hover:bg-slate-700 font-medium text-sm"
        >
          Add blog
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-left">
              <th className="p-3 font-medium text-slate-600">Title</th>
              <th className="p-3 font-medium text-slate-600">Slug</th>
              <th className="p-3 font-medium text-slate-600">Author</th>
              <th className="p-3 font-medium text-slate-600">Publish date</th>
              <th className="p-3 font-medium text-slate-600">Status</th>
              <th className="p-3 font-medium text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((b) => (
              <tr key={b._id} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="p-3 font-medium text-slate-800">{b.title}</td>
                <td className="p-3 text-slate-600">{b.slug}</td>
                <td className="p-3 text-slate-600">{b.author}</td>
                <td className="p-3 text-slate-600">{formatDate(b.publishDate)}</td>
                <td className="p-3">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs ${
                      b.isPublished ? "bg-green-100 text-green-800" : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {b.isPublished ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="p-3">
                  <Link href={`/blogs/${b._id}`} className="text-slate-600 hover:text-slate-800 underline">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {blogs.length === 0 && (
          <p className="p-6 text-slate-500 text-center">No blogs. Add one to get started.</p>
        )}
      </div>
    </div>
  );
}
