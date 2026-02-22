import Razorpay from "razorpay";
import crypto from "node:crypto";

const keyId = process.env["RAZORPAY_KEY_ID"];
const keySecret = process.env["RAZORPAY_KEY_SECRET"];

export const razorpay =
  keyId && keySecret
    ? new Razorpay({ key_id: keyId, key_secret: keySecret })
    : null;

export function createOrder(params: {
  amount: number; // paise
  receipt: string;
  notes?: Record<string, string>;
}): Promise<{ id: string; amount: number; currency: string }> {
  if (!razorpay) {
    return Promise.reject(new Error("Razorpay not configured"));
  }
  return razorpay.orders.create({
    amount: params.amount,
    currency: "INR",
    receipt: params.receipt,
    notes: params.notes,
  }) as Promise<{ id: string; amount: number; currency: string }>;
}

export function verifyPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  if (!keySecret) return false;
  const body = `${orderId}|${paymentId}`;
  const expected = crypto
    .createHmac("sha256", keySecret)
    .update(body)
    .digest("hex");
  return expected === signature;
}
