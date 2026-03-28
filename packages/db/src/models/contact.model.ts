import mongoose, { Schema, type Document, type Model } from "mongoose";

export type ContactStatus = "new" | "read" | "replied" | "archived";

export interface IContactMessage {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
  status: ContactStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface IContactMessageDocument extends IContactMessage, Document {}

export interface IContactMessageModel extends Model<IContactMessageDocument> {}

const contactMessageSchema = new Schema<IContactMessageDocument>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["new", "read", "replied", "archived"],
      default: "new"
    },
  },
  { timestamps: true }
);

// Indexes for efficient querying
contactMessageSchema.index({ createdAt: -1 });
contactMessageSchema.index({ status: 1, createdAt: -1 });
contactMessageSchema.index({ email: 1 });

export const ContactMessage: IContactMessageModel =
  (mongoose.models.ContactMessage as IContactMessageModel) ??
  mongoose.model<IContactMessageDocument, IContactMessageModel>("ContactMessage", contactMessageSchema);
