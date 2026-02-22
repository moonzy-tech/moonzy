import mongoose, { Schema, type Document, type Model } from "mongoose";
import type { Types } from "mongoose";

export type ShipmentStatus =
  | "pending" // not yet sent to Shiprocket
  | "created" // order created in Shiprocket
  | "pickup_scheduled"
  | "picked"
  | "in_transit"
  | "delivered"
  | "cancelled";

export interface IShipment {
  orderId: Types.ObjectId;
  shiprocketOrderId?: string;
  shiprocketShipmentId?: string;
  awbCode?: string;
  courierName?: string;
  status: ShipmentStatus;
  trackingUrl?: string;
  labelUrl?: string;
  failureReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IShipmentDocument extends IShipment, Document {}

export interface IShipmentModel extends Model<IShipmentDocument> {}

const shipmentSchema = new Schema<IShipmentDocument>(
  {
    orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    shiprocketOrderId: { type: String, sparse: true },
    shiprocketShipmentId: { type: String, sparse: true },
    awbCode: { type: String },
    courierName: { type: String },
    status: {
      type: String,
      enum: [
        "pending",
        "created",
        "pickup_scheduled",
        "picked",
        "in_transit",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },
    trackingUrl: { type: String },
    labelUrl: { type: String },
    failureReason: { type: String },
  },
  { timestamps: true }
);

shipmentSchema.index({ orderId: 1 });
// shiprocketOrderId has sparse: true on path; explicit index was duplicate
shipmentSchema.index({ status: 1 });

export const Shipment: IShipmentModel =
  (mongoose.models.Shipment as IShipmentModel) ??
  mongoose.model<IShipmentDocument, IShipmentModel>("Shipment", shipmentSchema);
