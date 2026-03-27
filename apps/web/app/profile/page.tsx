"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import type { Address } from "@/lib/profile";
import { fetchProfile, updateProfile } from "@/lib/profile";
import Navigation from "../components/Navigation";
import FooterSection from "../components/FooterSection";

const INSTRUMENT_SANS = "'Instrument Sans', system-ui, sans-serif";

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

  const inputClass =
    "w-full rounded-xl border border-[rgba(200,195,185,0.2)] bg-[#141826]/80 px-3 py-2.5 text-sm text-[#F5F0E8] outline-none placeholder:text-[rgba(200,195,185,0.4)] focus:border-[#D4A94C] focus:ring-1 focus:ring-[#D4A94C]/30";
  const inputClassNumeric = `${inputClass} tabular-nums tracking-wide`;
  /* Playfair for field titles; Instrument Sans stays on inputs via form style */
  const labelClass =
    "block font-serif text-xs font-semibold uppercase tracking-[0.2em] text-[rgba(200,195,185,0.55)] antialiased";

  if (authLoading || loading) {
    return (
      <main className="min-h-screen bg-[#141826]">
        <Navigation />
        <section className="mx-auto max-w-[1200px] px-6 pb-20 pt-28 md:px-10 lg:px-12">
          <p className="text-sm text-[rgba(200,195,185,0.75)]">
            Loading your profile...
          </p>
        </section>
        <FooterSection />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#141826]">
      <Navigation />
      <section className="relative overflow-hidden pt-24 pb-16 md:pb-20">
        <div
          className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 opacity-[0.07]"
          style={{
            background:
              "radial-gradient(ellipse at center, #D4A94C 0%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-[1200px] px-6 text-center md:px-10 lg:px-12">
          <p
            className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[#D4A94C]"
            style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif" }}
          >
            Moonzy
          </p>
          <h1
            className="mb-5 text-5xl font-normal text-[#F5F0E8] md:mb-6 md:text-6xl lg:text-7xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Your profile & delivery details
          </h1>
          <p
            className="mx-auto max-w-[560px] text-base leading-relaxed text-[rgba(200,195,185,0.6)] md:text-lg"
            style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif" }}
          >
            Add your name and delivery address once, so checkout is smooth when
            you&apos;re ready to order.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-[rgba(200,195,185,0.15)]" />
            <span className="h-1.5 w-1.5 rotate-45 border border-[#D4A94C]/40" />
            <span className="h-px w-16 bg-[rgba(200,195,185,0.15)]" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 pb-20 md:px-10 md:pb-28 lg:px-12">
        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-3xl space-y-6 rounded-[20px] border border-[rgba(200,195,185,0.08)] bg-[#1A1F33]/65 p-6 shadow-[0_8px_40px_rgba(0,0,0,0.3)] sm:p-8"
          style={{ fontFamily: INSTRUMENT_SANS }}
        >
          {error && (
            <p className="rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
              {error}
            </p>
          )}
          {success && (
            <p className="rounded-lg border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">
              {success}
            </p>
          )}

          <div className="space-y-1.5">
            <label className={labelClass}>Email</label>
            <input
              type="email"
              value={user?.email ?? ""}
              disabled
              className={`${inputClass} cursor-not-allowed opacity-80`}
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="name" className={labelClass}>
              Full name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="phone" className={labelClass}>
                Phone number
              </label>
              <input
                id="phone"
                type="tel"
                required
                value={address.phone}
                onChange={handleChange("phone")}
                className={inputClassNumeric}
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="pincode" className={labelClass}>
                PIN code
              </label>
              <input
                id="pincode"
                type="text"
                required
                value={address.pincode}
                onChange={handleChange("pincode")}
                className={inputClassNumeric}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="addressLine1" className={labelClass}>
              Address line 1
            </label>
            <input
              id="addressLine1"
              type="text"
              required
              value={address.addressLine1}
              onChange={handleChange("addressLine1")}
              className={inputClass}
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="addressLine2" className={labelClass}>
              Address line 2 (optional)
            </label>
            <input
              id="addressLine2"
              type="text"
              value={address.addressLine2 ?? ""}
              onChange={handleChange("addressLine2")}
              className={inputClass}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="city" className={labelClass}>
                City
              </label>
              <input
                id="city"
                type="text"
                required
                value={address.city}
                onChange={handleChange("city")}
                className={inputClass}
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="state" className={labelClass}>
                State
              </label>
              <input
                id="state"
                type="text"
                required
                value={address.state}
                onChange={handleChange("state")}
                className={inputClass}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="country" className={labelClass}>
              Country
            </label>
            <input
              id="country"
              type="text"
              required
              value={address.country}
              onChange={handleChange("country")}
              className={inputClass}
            />
            <p className="mt-1 text-xs text-[rgba(200,195,185,0.55)]">
              We currently ship within India. This address will be used as your
              default shipping address at checkout.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center rounded-full bg-[#D4A94C] px-7 py-2.5 font-serif text-sm font-semibold uppercase tracking-[0.14em] text-[#141826] shadow-[0_14px_35px_rgba(0,0,0,0.3)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_55px_rgba(0,0,0,0.4)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {saving ? "Saving…" : "Save profile"}
            </button>
          </div>
        </form>
      </section>
      <FooterSection />
    </main>
  );
}

