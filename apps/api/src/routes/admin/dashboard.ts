import { Router } from "express";
import { Order, Product, User } from "@repo/db";

export const dashboardRouter = Router();

/** Overview stats for admin */
dashboardRouter.get("/", async (_req, res) => {
  try {
    const [
      totalOrders,
      totalRevenue,
      pendingOrders,
      paidOrders,
      productCount,
      customerCount,
      recentOrders,
    ] = await Promise.all([
      Order.countDocuments(),
      Order.aggregate([
        { $match: { status: { $in: ["paid", "processing", "shipped", "delivered"] } } },
        { $group: { _id: null, total: { $sum: "$total" } } },
      ]).then((r) => (r[0]?.total ?? 0) as number),
      Order.countDocuments({ status: "pending" }),
      Order.countDocuments({ status: "paid" }),
      Product.countDocuments(),
      User.countDocuments({ role: "user" }),
      Order.find()
        .sort({ createdAt: -1 })
        .limit(10)
        .populate("userId", "email name")
        .lean(),
    ]);

    const revenueByStatus = await Order.aggregate([
      { $match: { status: { $in: ["paid", "processing", "shipped", "delivered"] } } },
      { $group: { _id: "$status", total: { $sum: "$total" }, count: { $sum: 1 } } },
    ]);

    res.json({
      totalOrders,
      totalRevenue,
      pendingOrders,
      paidOrders,
      productCount,
      customerCount,
      revenueByStatus,
      recentOrders,
    });
  } catch (e) {
    res.status(500).json({ error: "Failed to load dashboard", details: String(e) });
  }
});
