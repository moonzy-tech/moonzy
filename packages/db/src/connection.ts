import mongoose from "mongoose";

const MONGODB_URI = process.env["MONGODB_URI"] ?? ""
let isConnected = false;

/**
 * Connect to MongoDB. Safe to call multiple times; reuses existing connection.
 */
export async function connectDB(): Promise<typeof mongoose> {
  if (isConnected) {
    return mongoose;
  }

  const conn = await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");
  console.log(MONGODB_URI);
  isConnected = true;
  return conn;
}

/**
 * Disconnect from MongoDB. Useful for tests or graceful shutdown.
 */
export async function disconnectDB(): Promise<void> {
  if (!isConnected) return;
  await mongoose.disconnect();
  isConnected = false;
}

export { mongoose };
