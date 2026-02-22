import mongoose, { Schema, type Document, type Model } from "mongoose";

export type UserRole = "user" | "admin";

export interface IUser {
  email: string;
  name?: string;
  picture?: string;
  googleId?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserDocument extends IUser, Document {}

export interface IUserModel extends Model<IUserDocument> {}

const userSchema = new Schema<IUserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    name: { type: String, trim: true },
    picture: { type: String },
    googleId: { type: String, sparse: true, unique: true },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

export const User: IUserModel =
  (mongoose.models.User as IUserModel) ??
  mongoose.model<IUserDocument, IUserModel>("User", userSchema);
