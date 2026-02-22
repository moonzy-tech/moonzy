import mongoose, { Schema, type Document, type Model } from "mongoose";
import type { Types } from "mongoose";

export type PaymentStatus = "created" | "authorized" | "captured" | "failed" | "refunded";

export interface IPayment {
  orderId: Types.ObjectId;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  amount: number; // paise
  currency: string;
  status: PaymentStatus;
  razorpaySignature?: string;
  failureReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPaymentDocument extends IPayment, Document {}

export interface IPaymentModel extends Model<IPaymentDocument> {}

const paymentSchema = new Schema<IPaymentDocument>(
  {
    orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    razorpayOrderId: { type: String, required: true },
    razorpayPaymentId: { type: String },
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, default: "INR" },
    status: {
      type: String,
      enum: ["created", "authorized", "captured", "failed", "refunded"],
      default: "created",
    },
    razorpaySignature: { type: String },
    failureReason: { type: String },
  },
  { timestamps: true }
);

paymentSchema.index({ orderId: 1 });
paymentSchema.index({ razorpayOrderId: 1 });

export const Payment: IPaymentModel =
  (mongoose.models.Payment as IPaymentModel) ??
  mongoose.model<IPaymentDocument, IPaymentModel>("Payment", paymentSchema);
