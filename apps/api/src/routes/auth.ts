import { Router } from "express";
import {
  verifyGoogleIdToken,
  exchangeCodeForPayload,
  findOrCreateUser,
} from "../services/auth.service.js";
import { setSessionUserId, clearSession } from "../middleware/session.js";
import type { AuthRequest } from "../middleware/auth.js";

export const authRouter = Router();

authRouter.post("/google", async (req, res) => {
  const idToken = typeof req.body?.idToken === "string" ? req.body.idToken : null;
  const code = typeof req.body?.code === "string" ? req.body.code : null;
  const redirectUri = typeof req.body?.redirectUri === "string" ? req.body.redirectUri : null;

  let payload = null;
  if (idToken) {
    payload = await verifyGoogleIdToken(idToken);
  } else if (code && redirectUri) {
    payload = await exchangeCodeForPayload(code, redirectUri);
  }

  if (!payload) {
    res.status(401).json({ error: "Invalid Google token or code" });
    return;
  }
  const user = await findOrCreateUser(payload);
  if (!user) {
    res.status(500).json({ error: "Could not create user" });
    return;
  }
  setSessionUserId(res, String(user._id));
  res.json({
    user: {
      _id: user._id,
      email: user.email,
      name: user.name,
      picture: user.picture,
      role: user.role,
    },
  });
});

authRouter.get("/me", (req: AuthRequest, res) => {
  if (!req.user) {
    res.json({ user: null });
    return;
  }
  res.json({
    user: {
      _id: req.user._id,
      email: req.user.email,
      name: req.user.name,
      picture: req.user.picture,
      role: req.user.role,
    },
  });
});

authRouter.post("/logout", (_req, res) => {
  clearSession(res);
  res.json({ ok: true });
});
