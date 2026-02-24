import { api } from "./api";

export type Address = {
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
};

export type Profile = {
  _id: string;
  email: string;
  name?: string;
  picture?: string;
  role: string;
  defaultShippingAddress: Address | null;
};

export async function fetchProfile(): Promise<Profile> {
  const res = await api<{ profile: Profile }>("/profile");
  return res.profile;
}

export async function updateProfile(data: {
  name?: string;
  defaultShippingAddress?: Address;
}): Promise<Profile> {
  const res = await api<{ profile: Profile }>("/profile", {
    method: "PUT",
    body: data,
  });
  return res.profile;
}

