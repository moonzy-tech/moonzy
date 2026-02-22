import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IProduct {
  name: string;
  slug: string;
  description?: string;
  price: number; // in paise (Razorpay uses paise)
  compareAtPrice?: number;
  imageUrl?: string;
  images?: string[];
  sku?: string;
  stock: number;
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProductDocument extends IProduct, Document {}

export interface IProductModel extends Model<IProductDocument> {}

const productSchema = new Schema<IProductDocument>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    description: { type: String },
    price: { type: Number, required: true, min: 0 },
    compareAtPrice: { type: Number, min: 0 },
    imageUrl: { type: String },
    images: [{ type: String }],
    sku: { type: String, trim: true, sparse: true },
    stock: { type: Number, required: true, default: 0, min: 0 },
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// slug already has unique: true → index exists; only add compound index
productSchema.index({ isActive: 1, sortOrder: 1 });

export const Product: IProductModel =
  (mongoose.models.Product as IProductModel) ??
  mongoose.model<IProductDocument, IProductModel>("Product", productSchema);
