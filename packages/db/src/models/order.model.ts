import mongoose, { Schema, type Document, type Model } from "mongoose";
import type { Types } from "mongoose";
import { addressSchema, type IAddress } from "./address.model.js";

export type OrderStatus =
  | "pending" // created, awaiting payment
  | "paid" // payment confirmed
  | "processing" // preparing / shiprocket order created
  | "shipped"
  | "delivered"
  | "cancelled";

export interface IOrderItem {
  productId: Types.ObjectId;
  name: string;
  sku?: string;
  quantity: number;
  price: number; // unit price in paise
}

export interface IOrder {
  orderNumber: string; // human-readable e.g. MZ-1001
  userId: Types.ObjectId;
  items: IOrderItem[];
  subtotal: number; // paise
  shippingAmount: number;
  taxAmount: number;
  total: number; // paise
  shippingAddress: IAddress;
  status: OrderStatus;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderDocument extends IOrder, Document {}

export interface IOrderModel extends Model<IOrderDocument> {
  getNextOrderNumber(): Promise<string>;
}

const orderItemSchema = new Schema<IOrderItem>(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    name: { type: String, required: true },
    sku: { type: String },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const orderSchema = new Schema<IOrderDocument>(
  {
    orderNumber: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [orderItemSchema],
    subtotal: { type: Number, required: true, min: 0 },
    shippingAmount: { type: Number, required: true, default: 0, min: 0 },
    taxAmount: { type: Number, required: true, default: 0, min: 0 },
    total: { type: Number, required: true, min: 0 },
    shippingAddress: { type: addressSchema, required: true },
    status: {
      type: String,
      enum: ["pending", "paid", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    razorpayOrderId: { type: String, sparse: true },
    razorpayPaymentId: { type: String, sparse: true },
    notes: { type: String },
  },
  { timestamps: true }
);

orderSchema.index({ userId: 1, createdAt: -1 });
// orderNumber already has unique: true → index exists
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });

orderSchema.statics.getNextOrderNumber = async function (): Promise<string> {
  const last = await this.findOne().sort({ createdAt: -1 }).select("orderNumber").lean();
  const num = last?.orderNumber?.replace(/^MZ-/, "") ?? "0";
  const next = Number.parseInt(num, 10) + 1;
  return `MZ-${String(next).padStart(4, "0")}`;
};

export const Order: IOrderModel =
  (mongoose.models.Order as IOrderModel) ??
  mongoose.model<IOrderDocument, IOrderModel>("Order", orderSchema);
