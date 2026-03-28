import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IBlog {
  title: string;
  slug: string;
  excerpt: string;
  coverImageUrl: string;
  markdownBody: string;
  author: string;
  publishDate: Date;
  isPublished: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBlogDocument extends IBlog, Document {}

export interface IBlogModel extends Model<IBlogDocument> {}

const blogSchema = new Schema<IBlogDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    excerpt: { type: String, required: true, trim: true },
    coverImageUrl: { type: String, required: true, trim: true },
    markdownBody: { type: String, required: true },
    author: { type: String, required: true, trim: true },
    publishDate: { type: Date, required: true },
    isPublished: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// slug already has unique: true -> index exists.
blogSchema.index({ isPublished: 1, publishDate: -1, sortOrder: 1 });
blogSchema.index({ publishDate: -1 });

export const Blog: IBlogModel =
  (mongoose.models.Blog as IBlogModel) ??
  mongoose.model<IBlogDocument, IBlogModel>("Blog", blogSchema);
