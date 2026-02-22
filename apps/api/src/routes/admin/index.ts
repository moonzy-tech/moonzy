import { Router } from "express";
import { dashboardRouter } from "./dashboard.js";
import { ordersRouter } from "./orders.js";
import { customersRouter } from "./customers.js";
import { shipmentsRouter } from "./shipments.js";

const adminRouter = Router();

// Auth disabled for now: adminRouter.use(requireAuth); adminRouter.use(requireAdmin);

adminRouter.use("/dashboard", dashboardRouter);
adminRouter.use("/orders", ordersRouter);
adminRouter.use("/customers", customersRouter);
adminRouter.use("/shipments", shipmentsRouter);

export { adminRouter };
