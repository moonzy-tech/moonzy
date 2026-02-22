import { Router } from "express";
import { Order } from "@repo/db";

export const ordersRouter = Router();

/** List all orders with filters */
ordersRouter.get("/", async (req, res) => {
  const status = req.query.status as string | undefined;
  const limit = Math.min(Number(req.query.limit) || 50, 100);
  const skip = Number(req.query.skip) || 0;
  const filter = status ? { status } : {};
  const [orders, total] = await Promise.all([
    Order.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).populate("userId", "email name").lean(),
    Order.countDocuments(filter),
  ]);
  res.json({ orders, total });
});

/** Get single order */
ordersRouter.get("/:id", async (req, res) => {
  const order = await Order.findById(req.params.id).populate("userId", "email name picture").lean();
  if (!order) {
    res.status(404).json({ error: "Order not found" });
    return;
  }
  res.json(order);
});

/** Update order status */
ordersRouter.patch("/:id", async (req, res) => {
  const { status } = req.body ?? {};
  const allowed = ["pending", "paid", "processing", "shipped", "delivered", "cancelled"];
  if (!allowed.includes(status)) {
    res.status(400).json({ error: "Invalid status" });
    return;
  }
  const order = await Order.findByIdAndUpdate(req.params.id, { $set: { status } }, { new: true }).lean();
  if (!order) {
    res.status(404).json({ error: "Order not found" });
    return;
  }
  res.json(order);
});
