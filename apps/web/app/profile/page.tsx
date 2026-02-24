"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import type { Address } from "@/lib/profile";
import { fetchProfile, updateProfile } from "@/lib/profile";

const emptyAddress: Address = {
  name: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  pincode: "",
  country: "India",
};

export default function ProfilePage() {
  const { user, loading: authLoading, refresh } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState<Address>(emptyAddress);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push("/auth");
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const profile = await fetchProfile();
        if (cancelled) return;
        setName(profile.name ?? "");
        setAddress(
          profile.defaultShippingAddress ?? {
            ...emptyAddress,
            name: profile.name ?? "",
          },
        );
      } catch (err) {
        if (!cancelled) {
          setError((err as Error).message ?? "Failed to load profile");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [authLoading, user, router]);

  const handleChange =
    (field: keyof Address) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setAddress((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setSaving(true);
    try {
      const updated = await updateProfile({
        name: name.trim() || undefined,
        defaultShippingAddress: {
          ...address,
          country: address.country || "India",
        },
      });
      setSuccess("Profile updated successfully");
      setName(updated.name ?? "");
      setAddress(
        updated.defaultShippingAddress ?? {
          ...emptyAddress,
          name: updated.name ?? "",
        },
      );
      await refresh();
      router.push("/");
    } catch (err) {
      setError((err as Error).message ?? "Failed to save profile");
    } finally {
      setSaving(false);
    }
  }

  if (authLoading || loading) {
    return (
      <main className="min-h-screen bg-[#FDF5E5] pt-28 pb-20 text-[#13241A]">
        <section className="mx-auto max-w-3xl px-6 lg:px-10">
          <p className="text-sm text-[#4C4A3F]">Loading your profile…</p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FDF5E5] pt-28 pb-20 text-[#13241A]">
      <section className="mx-auto max-w-3xl px-6 lg:px-10">
        <p className="text-xs uppercase tracking-[0.3em] text-[#A45715] md:text-sm">
          Moonzy
        </p>
        <h1 className="mt-3 text-3xl font-bold leading-tight text-[#1E3B2A] sm:text-4xl md:text-5xl">
          Your profile & delivery details
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[#4C4A3F] sm:text-base">
          Add your name and delivery address once, so checkout is smooth when
          you&apos;re ready to order.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-3xl bg-white/95 p-6 shadow-[0_22px_60px_rgba(0,0,0,0.08)] sm:p-8 space-y-6"
        >
          {error && (
            <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}
          {success && (
            <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
              {success}
            </p>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7A6C54]">
              Email
            </label>
            <input
              type="email"
              value={user?.email ?? ""}
              disabled
              className="w-full rounded-xl border border-[#E1D4C1] bg-[#F9F2E6] px-3 py-2 text-sm text-[#4C4A3F] outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="name"
              className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7A6C54]"
            >
              Full name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-[#E1D4C1] bg-white px-3 py-2 text-sm text-[#1E3B2A] outline-none focus:border-[#1E3B2A]"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label
                htmlFor="phone"
                className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7A6C54]"
              >
                Phone number
              </label>
              <input
                id="phone"
                type="tel"
                required
                value={address.phone}
                onChange={handleChange("phone")}
                className="w-full rounded-xl border border-[#E1D4C1] bg-white px-3 py-2 text-sm text-[#1E3B2A] outline-none focus:border-[#1E3B2A]"
              />
            </div>
            <div className="space-y-1.5">
              <label
                htmlFor="pincode"
                className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7A6C54]"
              >
                Pincode
              </label>
              <input
                id="pincode"
                type="text"
                required
                value={address.pincode}
                onChange={handleChange("pincode")}
                className="w-full rounded-xl border border-[#E1D4C1] bg-white px-3 py-2 text-sm text-[#1E3B2A] outline-none focus:border-[#1E3B2A]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="addressLine1"
              className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7A6C54]"
            >
              Address line 1
            </label>
            <input
              id="addressLine1"
              type="text"
              required
              value={address.addressLine1}
              onChange={handleChange("addressLine1")}
              className="w-full rounded-xl border border-[#E1D4C1] bg-white px-3 py-2 text-sm text-[#1E3B2A] outline-none focus:border-[#1E3B2A]"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="addressLine2"
              className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7A6C54]"
            >
              Address line 2 (optional)
            </label>
            <input
              id="addressLine2"
              type="text"
              value={address.addressLine2 ?? ""}
              onChange={handleChange("addressLine2")}
              className="w-full rounded-xl border border-[#E1D4C1] bg-white px-3 py-2 text-sm text-[#1E3B2A] outline-none focus:border-[#1E3B2A]"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label
                htmlFor="city"
                className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7A6C54]"
              >
                City
              </label>
              <input
                id="city"
                type="text"
                required
                value={address.city}
                onChange={handleChange("city")}
                className="w-full rounded-xl border border-[#E1D4C1] bg-white px-3 py-2 text-sm text-[#1E3B2A] outline-none focus:border-[#1E3B2A]"
              />
            </div>
            <div className="space-y-1.5">
              <label
                htmlFor="state"
                className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7A6C54]"
              >
                State
              </label>
              <input
                id="state"
                type="text"
                required
                value={address.state}
                onChange={handleChange("state")}
                className="w-full rounded-xl border border-[#E1D4C1] bg-white px-3 py-2 text-sm text-[#1E3B2A] outline-none focus:border-[#1E3B2A]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="country"
              className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7A6C54]"
            >
              Country
            </label>
            <input
              id="country"
              type="text"
              required
              value={address.country}
              onChange={handleChange("country")}
              className="w-full rounded-xl border border-[#E1D4C1] bg-white px-3 py-2 text-sm text-[#1E3B2A] outline-none focus:border-[#1E3B2A]"
            />
            <p className="mt-1 text-xs text-[#7A6C54]">
              We currently ship within India. This address will be used as your
              default shipping address at checkout.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center rounded-full bg-[#1E3B2A] px-7 py-2 text-[0.7rem] uppercase tracking-[0.22em] text-white shadow-[0_14px_35px_rgba(0,0,0,0.3)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_55px_rgba(0,0,0,0.4)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {saving ? "Saving…" : "Save profile"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

