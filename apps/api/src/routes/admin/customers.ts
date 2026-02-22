import { Router } from "express";
import { User, Order } from "@repo/db";

export const customersRouter = Router();

/** List customers (users who are not admin) with order counts */
customersRouter.get("/", async (req, res) => {
  const limit = Math.min(Number(req.query.limit) || 50, 100);
  const skip = Number(req.query.skip) || 0;
  const customers = await User.find({ role: "user" })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .select("email name picture createdAt")
    .lean();

  const userIds = customers.map((c) => c._id);
  const orderCounts = await Order.aggregate([
    { $match: { userId: { $in: userIds } } },
    { $group: { _id: "$userId", count: { $sum: 1 }, totalSpent: { $sum: "$total" } } },
  ]);
  const countMap = new Map(orderCounts.map((o) => [String(o._id), { count: o.count, totalSpent: o.totalSpent }]));

  const withStats = customers.map((c) => ({
    ...c,
    orderCount: countMap.get(String(c._id))?.count ?? 0,
    totalSpent: countMap.get(String(c._id))?.totalSpent ?? 0,
  }));

  const total = await User.countDocuments({ role: "user" });
  res.json({ customers: withStats, total });
});

/** Get single customer with order history */
customersRouter.get("/:id", async (req, res) => {
  const customer = await User.findOne({ _id: req.params.id, role: "user" })
    .select("email name picture googleId createdAt")
    .lean();
  if (!customer) {
    res.status(404).json({ error: "Customer not found" });
    return;
  }
  const orders = await Order.find({ userId: customer._id }).sort({ createdAt: -1 }).limit(50).lean();
  res.json({ ...customer, orders });
});
