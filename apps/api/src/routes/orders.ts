import { Router } from "express";
import { Order, Product, Shipment } from "@repo/db";
import { requireAuth, type AuthRequest } from "../middleware/auth.js";
import type { IAddress } from "@repo/db";

export const ordersRouter = Router();

/** Create order (customer): creates pending order and returns Razorpay order id for checkout */
ordersRouter.post("/", requireAuth, async (req: AuthRequest, res) => {
  const user = req.user!;
  const body = req.body as {
    items?: Array<{ productId: string; quantity: number }>;
    shippingAddress?: IAddress;
  };
  if (!body.items?.length || !body.shippingAddress) {
    res.status(400).json({ error: "items and shippingAddress required" });
    return;
  }
  // Frontend sends logical product IDs like "peri", "pudina" which correspond to product slugs
  const productSlugs = body.items.map((i) => i.productId);
  const products = await Product.find({
    slug: { $in: productSlugs },
    isActive: true,
  }).lean();
  const productMap = new Map(products.map((p) => [p.slug, p]));

  const orderItems: Array<{ productId: typeof products[0]["_id"]; name: string; sku?: string; quantity: number; price: number }> = [];
  let subtotal = 0;
  for (const item of body.items) {
    const product = productMap.get(item.productId);
    if (!product || item.quantity < 1) continue;
    if (product.stock < item.quantity) {
      res.status(400).json({ error: `Insufficient stock for ${product.name}` });
      return;
    }
    orderItems.push({
      productId: product._id,
      name: product.name,
      sku: product.sku,
      quantity: item.quantity,
      price: product.price,
    });
    subtotal += product.price * item.quantity;
  }
  if (orderItems.length === 0) {
    res.status(400).json({ error: "No valid items" });
    return;
  }

  const shippingAmount = 0; // TODO: calculate or fixed
  const taxAmount = 0; // TODO: if needed
  const total = subtotal + shippingAmount + taxAmount;

  const orderNumber = await Order.getNextOrderNumber();
  const order = await Order.create({
    orderNumber,
    userId: user._id,
    items: orderItems,
    subtotal,
    shippingAmount,
    taxAmount,
    total,
    shippingAddress: body.shippingAddress,
    status: "pending",
  });

  await Shipment.create({ orderId: order._id, status: "pending" });

  res.status(201).json({
    order: {
      _id: order._id,
      orderNumber: order.orderNumber,
      total: order.total,
      status: order.status,
    },
  });
});

/** List my orders */
ordersRouter.get("/", requireAuth, async (req: AuthRequest, res) => {
  const user = req.user!;
  const orders = await Order.find({ userId: user._id })
    .sort({ createdAt: -1 })
    .lean();
  res.json(orders);
});

/** Get single order (own or admin will be in admin route) */
ordersRouter.get("/:id", requireAuth, async (req: AuthRequest, res) => {
  const order = await Order.findById(req.params.id)
    .populate("items.productId", "name slug imageUrl")
    .lean();
  if (!order) {
    res.status(404).json({ error: "Order not found" });
    return;
  }
  if (String(order.userId) !== String(req.user!._id)) {
    res.status(404).json({ error: "Order not found" });
    return;
  }
  res.json(order);
});
