import { OAuth2Client } from "google-auth-library";
import { User } from "@repo/db";
import type { IUserDocument } from "@repo/db";

const client = new OAuth2Client(
  process.env["GOOGLE_CLIENT_ID"],
  process.env["GOOGLE_CLIENT_SECRET"],
  undefined
);

export interface GoogleTokenPayload {
  sub: string;
  email: string;
  name?: string;
  picture?: string;
}

export async function verifyGoogleIdToken(idToken: string): Promise<GoogleTokenPayload | null> {
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env["GOOGLE_CLIENT_ID"],
    });
    const payload = ticket.getPayload();
    if (!payload?.email) return null;
    return {
      sub: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
    };
  } catch {
    return null;
  }
}

/** Exchange auth code (from useGoogleLogin flow: "auth-code") for id_token and return payload */
export async function exchangeCodeForPayload(
  code: string,
  redirectUri: string
): Promise<GoogleTokenPayload | null> {
  try {
    const { tokens } = await client.getToken({ code, redirect_uri: redirectUri });
    const idToken = tokens.id_token;
    if (!idToken) return null;
    return verifyGoogleIdToken(idToken);
  } catch {
    return null;
  }
}

export async function findOrCreateUser(payload: GoogleTokenPayload): Promise<IUserDocument | null> {
  const email = payload.email.toLowerCase();
  const doc = await User.findOneAndUpdate(
    { googleId: payload.sub },
    {
      $set: {
        email,
        name: payload.name,
        picture: payload.picture,
        updatedAt: new Date(),
      },
      $setOnInsert: {
        googleId: payload.sub,
        role: "user",
      },
    },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  ).exec();
  return doc as IUserDocument | null;
}

export async function findOrCreateAdminByEmail(email: string): Promise<IUserDocument | null> {
  const normalized = email.toLowerCase();
  const doc = await User.findOneAndUpdate(
    { email: normalized },
    {
      $set: {
        email: normalized,
        role: "admin",
        updatedAt: new Date(),
      },
      $setOnInsert: {
        name: "Moonzy Admin",
      },
    },
    { new: true, upsert: true, setDefaultsOnInsert: true },
  ).exec();
  return doc as IUserDocument | null;
}
