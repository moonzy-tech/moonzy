import { Router } from "express";
import { Order, Shipment } from "@repo/db";
import { createShiprocketOrder } from "../../services/shiprocket.service.js";

export const shipmentsRouter = Router();

/** List shipments */
shipmentsRouter.get("/", async (req, res) => {
  const [shipments, total] = await Promise.all([
    Shipment.find()
      .sort({ createdAt: -1 })
      .populate("orderId")
      .limit(Number(req.query.limit) || 50)
      .skip(Number(req.query.skip) || 0)
      .lean(),
    Shipment.countDocuments(),
  ]);
  res.json({ shipments, total });
});

/** Create Shiprocket order for a paid order (dispatch to ship) */
shipmentsRouter.post("/create/:orderId", async (req, res) => {
  const order = await Order.findById(req.params.orderId).lean();
  if (!order) {
    res.status(404).json({ error: "Order not found" });
    return;
  }
  if (order.status !== "paid" && order.status !== "processing") {
    res.status(400).json({ error: "Order must be paid before creating shipment" });
    return;
  }
  const existing = await Shipment.findOne({ orderId: order._id }).lean();
  if (existing?.shiprocketOrderId) {
    res.status(400).json({ error: "Shipment already created for this order", shipment: existing });
    return;
  }

  const addr = order.shippingAddress;
  const subTotal = order.subtotal / 100; // paise -> rupees for Shiprocket
  const orderItems = order.items.map((item) => ({
    name: item.name,
    sku: item.sku ?? item.productId.toString(),
    units: item.quantity,
    selling_price: item.price / 100,
  }));

  try {
    const result = await createShiprocketOrder({
      orderId: order.orderNumber,
      channel: "Moonzy",
      billingCustomerName: addr.name,
      billingAddress: addr.addressLine1,
      billingAddress2: addr.addressLine2,
      billingCity: addr.city,
      billingState: addr.state,
      billingPincode: addr.pincode,
      billingCountry: addr.country,
      billingPhone: addr.phone,
      shippingCustomerName: addr.name,
      shippingAddress: addr.addressLine1,
      shippingAddress2: addr.addressLine2,
      shippingCity: addr.city,
      shippingState: addr.state,
      shippingPincode: addr.pincode,
      shippingCountry: addr.country,
      shippingPhone: addr.phone,
      orderItems,
      paymentMethod: "Prepaid",
      subTotal,
    });

    await Shipment.updateOne(
      { orderId: order._id },
      {
        $set: {
          shiprocketOrderId: String(result.order_id),
          shiprocketShipmentId: String(result.shipment_id),
          status: "created",
        },
      }
    );
    await Order.updateOne({ _id: order._id }, { $set: { status: "processing" } });

    res.json({
      ok: true,
      shiprocketOrderId: result.order_id,
      shiprocketShipmentId: result.shipment_id,
      status: result.status_label,
    });
  } catch (e) {
    res.status(500).json({
      error: "Failed to create Shiprocket order",
      details: String(e),
    });
  }
});

/** Update shipment status (e.g. after webhook or manual) */
shipmentsRouter.patch("/:id", async (req, res) => {
  const { status, awbCode, courierName, trackingUrl } = req.body ?? {};
  const update: Record<string, unknown> = {};
  if (status) update.status = status;
  if (awbCode) update.awbCode = awbCode;
  if (courierName) update.courierName = courierName;
  if (trackingUrl) update.trackingUrl = trackingUrl;
  const shipment = await Shipment.findByIdAndUpdate(req.params.id, { $set: update }, { new: true }).lean();
  if (!shipment) {
    res.status(404).json({ error: "Shipment not found" });
    return;
  }
  res.json(shipment);
});
