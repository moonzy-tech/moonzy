import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { loadSession } from "./middleware/session.js";
import { authRouter } from "./routes/auth.js";
import { healthRouter } from "./routes/health.js";
import { productsRouter } from "./routes/products.js";
import { ordersRouter } from "./routes/orders.js";
import { paymentsRouter, handleRazorpayWebhook } from "./routes/payments.js";
import { adminRouter } from "./routes/admin/index.js";
import { profileRouter } from "./routes/profile.js";

const app = express();

const envOrigins = (process.env["FRONTEND_ORIGIN"] ?? "http://localhost:3000,http://localhost:3001")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);
const devOrigins = ["http://localhost:3000", "http://localhost:3001"];
const allowedOrigins =
  process.env["NODE_ENV"] === "development"
    ? [...new Set([...envOrigins, ...devOrigins])]
    : envOrigins;
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || allowedOrigins.includes(origin)) cb(null, origin ?? allowedOrigins[0]);
      else cb(null, false);
    },
    credentials: true,
  })
);
app.post(
  "/payments/webhook",
  express.raw({ type: "application/json" }),
  (req, res, next) => {
    handleRazorpayWebhook(req as Parameters<typeof handleRazorpayWebhook>[0], res).catch(next);
  }
);
app.use(express.json());
app.use(cookieParser());
app.use(loadSession);

app.use("/health", healthRouter);
app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/products", productsRouter);
app.use("/orders", ordersRouter);
app.use("/payments", paymentsRouter);
app.use("/admin", adminRouter);

export { app };
