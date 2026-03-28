import { Router } from "express";
import type { Request } from "express";
import { Blog } from "@repo/db";

export const blogsRouter = Router();

/** Public: list published blogs */
blogsRouter.get("/", async (_req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true })
      .sort({ sortOrder: 1, publishDate: -1, createdAt: -1 })
      .lean();
    res.json(blogs);
  } catch {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

/** Public: get single published blog by slug */
blogsRouter.get("/by-slug/:slug", async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug, isPublished: true }).lean();
  if (!blog) {
    res.status(404).json({ error: "Blog not found" });
    return;
  }
  res.json(blog);
});

/** Admin: list all blogs (auth disabled for now) */
blogsRouter.get("/admin", async (_req, res) => {
  try {
    const blogs = await Blog.find().sort({ sortOrder: 1, publishDate: -1, createdAt: -1 }).lean();
    res.json(blogs);
  } catch {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

/** Admin: create blog (auth disabled for now) */
blogsRouter.post("/admin", async (req: Request, res) => {
  try {
    const body = req.body as Record<string, unknown>;
    const slug =
      typeof body.slug === "string"
        ? body.slug
        : (body.title as string)?.toLowerCase().replace(/\s+/g, "-");

    const blog = await Blog.create({
      title: body.title,
      slug,
      excerpt: body.excerpt,
      coverImageUrl: body.coverImageUrl,
      markdownBody: body.markdownBody,
      author: body.author,
      publishDate: body.publishDate ? new Date(String(body.publishDate)) : new Date(),
      isPublished: body.isPublished !== false,
      sortOrder: Number(body.sortOrder) || 0,
    });
    res.status(201).json(blog);
  } catch (e) {
    res.status(400).json({ error: "Invalid payload", details: String(e) });
  }
});

/** Admin: update blog (auth disabled for now) */
blogsRouter.patch("/admin/:id", async (req: Request, res) => {
  const body = req.body as Record<string, unknown>;
  const update: Record<string, unknown> = { ...body };
  if (body.publishDate != null) {
    update.publishDate = new Date(String(body.publishDate));
  }

  const blog = await Blog.findByIdAndUpdate(req.params.id, { $set: update }, { new: true });
  if (!blog) {
    res.status(404).json({ error: "Blog not found" });
    return;
  }
  res.json(blog);
});

/** Admin: delete blog (auth disabled for now) */
blogsRouter.delete("/admin/:id", async (req, res) => {
  const deleted = await Blog.findByIdAndDelete(req.params.id);
  if (!deleted) {
    res.status(404).json({ error: "Blog not found" });
    return;
  }
  res.json({ ok: true });
});
