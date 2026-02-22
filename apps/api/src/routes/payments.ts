import express, { Router } from "express";
import { Order, Payment } from "@repo/db";
import { requireAuth, type AuthRequest } from "../middleware/auth.js";
import { createOrder as createRazorpayOrder, verifyPaymentSignature } from "../services/razorpay.service.js";

export const paymentsRouter = Router();

/** Webhook handler – mount with express.raw() so body is Buffer for signature verification */
export async function handleRazorpayWebhook(
  req: express.Request<object, unknown, Buffer>,
  res: express.Response
): Promise<void> {
  const rawBody = req.body;
  const signature = req.headers["x-razorpay-signature"] as string | undefined;
  const webhookSecret = process.env["RAZORPAY_WEBHOOK_SECRET"];
  if (!webhookSecret || !signature || !rawBody) {
    res.status(400).send("Bad request");
    return;
  }
  const crypto = await import("node:crypto");
  const expected = crypto
    .createHmac("sha256", webhookSecret)
    .update(Buffer.isBuffer(rawBody) ? rawBody : String(rawBody))
    .digest("hex");
  if (expected !== signature) {
    res.status(400).send("Invalid signature");
    return;
  }
  const event = JSON.parse(Buffer.isBuffer(rawBody) ? rawBody.toString("utf8") : String(rawBody));
  const eventType = event.event as string;
  if (eventType === "order.paid" || eventType === "payment.captured") {
    const payload = event.payload?.payment?.entity ?? event.payload?.order?.entity;
    const razorpayOrderId = payload?.order_id ?? payload?.id;
    if (razorpayOrderId) {
      await Payment.updateOne(
        { razorpayOrderId },
        { $set: { status: "captured", razorpayPaymentId: payload?.id } }
      );
      await Order.updateOne(
        { razorpayOrderId },
        { $set: { status: "paid", razorpayPaymentId: payload?.id } }
      );
    }
  }
  res.send("ok");
}

/** Create Razorpay order for an existing pending order */
paymentsRouter.post("/create-order", requireAuth, async (req: AuthRequest, res) => {
  const orderId = req.body?.orderId;
  if (!orderId) {
    res.status(400).json({ error: "orderId required" });
    return;
  }
  const order = await Order.findById(orderId).lean();
  if (!order) {
    res.status(404).json({ error: "Order not found" });
    return;
  }
  if (String(order.userId) !== String(req.user!._id)) {
    res.status(403).json({ error: "Forbidden" });
    return;
  }
  if (order.status !== "pending") {
    res.status(400).json({ error: "Order is not pending payment" });
    return;
  }
  try {
    const razorpayOrder = await createRazorpayOrder({
      amount: order.total,
      receipt: order.orderNumber,
      notes: { orderId: String(order._id) },
    });
    await Payment.findOneAndUpdate(
      { orderId: order._id },
      {
        $set: {
          orderId: order._id,
          razorpayOrderId: razorpayOrder.id,
          amount: order.total,
          currency: "INR",
          status: "created",
        },
      },
      { upsert: true, new: true }
    );
    res.json({
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: process.env["RAZORPAY_KEY_ID"],
    });
  } catch (e) {
    res.status(500).json({ error: "Failed to create payment", details: String(e) });
  }
});

/** Verify payment after checkout (frontend sends razorpay_order_id, razorpay_payment_id, razorpay_signature) */
paymentsRouter.post("/verify", requireAuth, async (req: AuthRequest, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body ?? {};
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    res.status(400).json({ error: "razorpay_order_id, razorpay_payment_id, razorpay_signature required" });
    return;
  }
  const valid = verifyPaymentSignature(
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
  );
  if (!valid) {
    res.status(400).json({ error: "Invalid signature" });
    return;
  }
  const payment = await Payment.findOne({ razorpayOrderId: razorpay_order_id }).exec();
  if (!payment) {
    res.status(404).json({ error: "Payment not found" });
    return;
  }
  await Payment.updateOne(
    { _id: payment._id },
    {
      $set: {
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        status: "captured",
      },
    }
  );
  await Order.updateOne(
    { _id: payment.orderId },
    { $set: { status: "paid", razorpayOrderId: razorpay_order_id, razorpayPaymentId: razorpay_payment_id } }
  );
  const order = await Order.findById(payment.orderId).lean();
  res.json({ ok: true, orderId: order?._id, orderNumber: order?.orderNumber });
});

