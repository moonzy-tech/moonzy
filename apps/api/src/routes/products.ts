import { Router } from "express";
import { Product } from "@repo/db";
import type { Request } from "express";

export const productsRouter = Router();

/** Public: list active products */
productsRouter.get("/", async (_req, res) => {
  try {
    const products = await Product.find({ isActive: true })
      .sort({ sortOrder: 1, createdAt: 1 })
      .lean();
    res.json(products);
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

/** Public: get single product by slug */
productsRouter.get("/by-slug/:slug", async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug, isActive: true }).lean();
  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  res.json(product);
});

/** Admin: list all products (auth disabled for now) */
productsRouter.get("/admin", async (_req, res) => {
  try {
    const products = await Product.find().sort({ sortOrder: 1, createdAt: 1 }).lean();
    res.json(products);
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

/** Admin: create product (auth disabled for now) */
productsRouter.post("/admin", async (req: Request, res) => {
  try {
    const body = req.body as Record<string, unknown>;
    const slug =
      typeof body.slug === "string"
        ? body.slug
        : (body.name as string)?.toLowerCase().replace(/\s+/g, "-");
    const product = await Product.create({
      name: body.name,
      slug,
      description: body.description,
      price: Number(body.price) ?? 0,
      compareAtPrice: body.compareAtPrice != null ? Number(body.compareAtPrice) : undefined,
      imageUrl: body.imageUrl,
      images: Array.isArray(body.images) ? body.images : undefined,
      sku: body.sku,
      stock: Number(body.stock) ?? 0,
      isActive: body.isActive !== false,
      sortOrder: Number(body.sortOrder) ?? 0,
    });
    res.status(201).json(product);
  } catch (e) {
    res.status(400).json({ error: "Invalid payload", details: String(e) });
  }
});

/** Admin: update product (auth disabled for now) */
productsRouter.patch("/admin/:id", async (req: Request, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { $set: req.body as Record<string, unknown> },
    { new: true }
  );
  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  res.json(product);
});

/** Admin: delete product (auth disabled for now) */
productsRouter.delete("/admin/:id", async (req, res) => {
  const deleted = await Product.findByIdAndDelete(req.params.id);
  if (!deleted) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  res.json({ ok: true });
});
