import { Router } from "express";
import type { AuthRequest } from "../middleware/auth.js";
import { requireAuth } from "../middleware/auth.js";
import { User, type IAddress } from "@repo/db";

export const profileRouter = Router();

type ProfileBody = {
  name?: string;
  defaultShippingAddress?: IAddress;
};

profileRouter.get("/", requireAuth, async (req: AuthRequest, res) => {
  const user = req.user!;

  res.json({
    profile: {
      _id: user._id,
      email: user.email,
      name: user.name,
      picture: user.picture,
      role: user.role,
      defaultShippingAddress: user.defaultShippingAddress ?? null,
    },
  });
});

profileRouter.put("/", requireAuth, async (req: AuthRequest, res) => {
  const user = req.user!;
  const body = req.body as ProfileBody;

  const update: Partial<{
    name: string | undefined;
    defaultShippingAddress: IAddress | undefined;
  }> = {};

  if (typeof body.name === "string") {
    update.name = body.name;
  }

  if (body.defaultShippingAddress) {
    update.defaultShippingAddress = body.defaultShippingAddress;
  }

  const updated = await User.findByIdAndUpdate(user._id, update, {
    new: true,
  }).lean();

  if (!updated) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  res.json({
    profile: {
      _id: updated._id,
      email: updated.email,
      name: updated.name,
      picture: updated.picture,
      role: updated.role,
      defaultShippingAddress: (updated as unknown as { defaultShippingAddress?: IAddress }).defaultShippingAddress ?? null,
    },
  });
});

