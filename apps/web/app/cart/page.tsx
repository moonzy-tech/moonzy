"use client";

import Footer from "@/components/Footer";
import {
  clearCart,
  getCart,
  removeFromCart,
  subscribeToCartChanges,
  updateCartItemQuantity,
} from "@/lib/cart";
import { products } from "@/lib/products";
import { useAuth } from "@/lib/auth";
import { api } from "@/lib/api";
import { fetchProfile } from "@/lib/profile";
import { IconTrash } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type CartViewItem = {
  productId: string;
  quantity: number;
  name: string;
  tag: string;
  image: string;
  price: number;
};

const WHATSAPP_NUMBER = "918390255117"; // Replace with your business WhatsApp number
const LAST_ORDER_KEY = "moonzy_last_whatsapp_order_v1";

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState(() => getCart());
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    const sync = () => setCart(getCart());
    return subscribeToCartChanges(sync);
  }, []);

  const items: CartViewItem[] = useMemo(() => {
    const mapped = cart.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) return null;
      return {
        productId: item.productId,
        quantity: item.quantity,
        name: product.name,
        tag: product.tag,
        image: product.image,
        price: product.price,
      } satisfies CartViewItem;
    });

    return mapped.filter(Boolean) as CartViewItem[];
  }, [cart]);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const isEmpty = items.length === 0;
  const MIN_PACKS = 5;
  const meetsMinimum = totalItems >= MIN_PACKS;
  const packsRemaining = Math.max(MIN_PACKS - totalItems, 0);

  async function handleCheckout() {
    if (!meetsMinimum || isEmpty || checkoutLoading) return;
    if (authLoading) return;

    // Require login
    if (!user) {
      if (typeof window !== "undefined") {
        window.location.href = "/auth";
      }
      return;
    }

    setCheckoutLoading(true);
    try {
      const profile = await fetchProfile();

      // Require completed default shipping address
      if (!profile.defaultShippingAddress) {
        if (typeof window !== "undefined") {
          window.location.href = "/profile";
        }
        return;
      }

      const addressParts = [
        profile.defaultShippingAddress?.addressLine1,
        profile.defaultShippingAddress?.addressLine2,
        profile.defaultShippingAddress?.city,
        profile.defaultShippingAddress?.state,
        profile.defaultShippingAddress?.pincode,
        profile.defaultShippingAddress?.country,
      ].filter(Boolean);

      const itemsText = items
        .map((item) => `- ${item.name} x ${item.quantity}`)
        .join("\n");

      const message = [
        "New Moonzy order",
        "",
        "Items:",
        itemsText,
        "",
        `Total: ₹${subtotal}`,
        "",
        "Customer details:",
        `Name: ${profile.defaultShippingAddress?.name ?? profile.name ?? ""}`,
        `Phone: ${profile.defaultShippingAddress?.phone ?? ""}`,
        `Email: ${profile.email}`,
        addressParts.length ? `Address: ${addressParts.join(", ")}` : "",
      ]
        .filter((line) => line.trim().length > 0)
        .join("\n");

      // Create order in backend (in paise)
      try {
        await api("/orders", {
          method: "POST",
          body: {
            items: items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
            })),
            shippingAddress: profile.defaultShippingAddress,
          },
        });
      } catch {
        // Non-blocking: even if order creation fails, continue to WhatsApp
      }

      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        message,
      )}`;

      if (typeof window !== "undefined") {
        try {
          window.localStorage.setItem(
            LAST_ORDER_KEY,
            JSON.stringify({
              createdAt: new Date().toISOString(),
              items: items.map((item) => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
              })),
              subtotal,
            }),
          );
        } catch {
          // ignore storage errors
        }
        window.open(url, "_blank");
      }

      // Clear cart after handing off order to WhatsApp
      clearCart();

      router.push("/orders/whatsapp");
    } finally {
      setCheckoutLoading(false);
    }
  }

  return (
    <>
      <main className="min-h-screen bg-[#FDF5E5] pt-28 pb-20 text-[#13241A]">
        <section className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="mb-10 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[#A45715] md:text-sm">
              Moonzy
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-[#1E3B2A] sm:text-4xl md:text-5xl">
              Your cart, your crunch.
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-[#4C4A3F] sm:text-base">
              Review your packs, tweak quantities, then checkout when you&apos;re
              ready. Minimum order is {MIN_PACKS} packs.
            </p>
          </div>

          {isEmpty ? (
            <div className="mx-auto max-w-3xl rounded-3xl bg-white/90 p-8 text-center shadow-[0_22px_60px_rgba(0,0,0,0.08)] sm:p-10">
              <p className="text-[0.65rem] uppercase tracking-[0.28em] text-[#7A6C54]">
                Cart empty
              </p>
              <h2 className="mt-3 text-2xl font-bold text-[#1E3B2A] sm:text-3xl">
                Let&apos;s fix that.
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#4C4A3F] sm:text-base">
                Pick a flavour, add a few packs, and we&apos;ll keep them here
                for you.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/product"
                  className="inline-flex items-center justify-center rounded-full bg-[#1E3B2A] px-7 py-2 text-[0.7rem] uppercase tracking-[0.22em] text-white shadow-[0_14px_35px_rgba(0,0,0,0.3)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_55px_rgba(0,0,0,0.4)]"
                >
                  Shop flavours
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-full border border-[#1E3B2A] px-7 py-2 text-[0.7rem] uppercase tracking-[0.22em] text-[#1E3B2A] transition hover:-translate-y-0.5 hover:bg-[#1E3B2A] hover:text-white"
                >
                  Back home
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1.2fr_minmax(0,1fr)]">
              <div className="space-y-5">
                <div className="flex items-center justify-between rounded-3xl bg-white/90 px-5 py-4 shadow-[0_18px_45px_rgba(0,0,0,0.08)]">
                  <p className="text-sm font-sans font-semibold text-[#1E3B2A]">
                    {totalItems} pack{totalItems > 1 ? "s" : ""} in cart
                  </p>
                  <button
                    type="button"
                    onClick={() => clearCart()}
                    className="rounded-full border border-[#E1D4C1] bg-white px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[#7A6C54] transition hover:-translate-y-0.5 hover:border-[#1E3B2A] hover:text-[#1E3B2A]"
                  >
                    Clear
                  </button>
                </div>

                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.productId}
                      className="rounded-3xl bg-white/90 p-5 shadow-[0_22px_60px_rgba(0,0,0,0.08)] md:p-6"
                    >
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                          <div className="relative h-20 w-16 shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="4rem"
                              className="object-contain drop-shadow-[0_18px_45px_rgba(0,0,0,0.25)]"
                            />
                          </div>
                          <div>
                            <p className="text-[0.6rem] uppercase tracking-[0.22em] text-[#DB6716]">
                              {item.tag}
                            </p>
                            <p className="mt-1 text-lg font-bold text-[#1E3B2A]">
                              {item.name}
                            </p>
                            <p className="mt-1 text-sm text-[#4C4A3F]">
                              ₹{item.price}{" "}
                              <span className="text-xs text-[#7A6C54]">
                                per pack
                              </span>
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col gap-3 sm:items-end">
                          <p className="text-sm text-[#1E3B2A]">
                            ₹{item.price * item.quantity}
                          </p>
                          <div className="flex flex-wrap items-center gap-3">
                            <div className="inline-flex items-center rounded-full bg-[#FDF5E5] px-2 py-1.5">
                              <button
                                type="button"
                                onClick={() =>
                                  updateCartItemQuantity(
                                    item.productId,
                                    item.quantity - 1,
                                  )
                                }
                                className="h-8 w-8 rounded-full bg-[#F4E3C7] text-lg leading-none text-[#1E3B2A] hover:bg-[#f0d6ae]"
                                aria-label={`Decrease quantity for ${item.name}`}
                              >
                                −
                              </button>
                              <span className="mx-3 min-w-[2ch] text-center text-sm">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  updateCartItemQuantity(
                                    item.productId,
                                    item.quantity + 1,
                                  )
                                }
                                className="h-8 w-8 rounded-full bg-[#1E3B2A] text-lg leading-none text-white hover:bg-[#214732]"
                                aria-label={`Increase quantity for ${item.name}`}
                              >
                                +
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeFromCart(item.productId)}
                              className="inline-flex items-center gap-2 rounded-full border border-[#E1D4C1] bg-white px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[#7A6C54] transition hover:-translate-y-0.5 hover:border-[#1E3B2A] hover:text-[#1E3B2A]"
                              aria-label={`Remove ${item.name}`}
                            >
                              <IconTrash className="h-4 w-4" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-fit rounded-3xl bg-[#0B1811] p-6 shadow-[0_26px_70px_rgba(0,0,0,0.55)]">
                <p className="text-[0.65rem] uppercase tracking-[0.22em] text-white/75">
                  Summary
                </p>
                <h2 className="mt-2 text-2xl font-bold text-white">
                  ₹{subtotal}
                </h2>
                <p className="mt-1 text-xs text-white/60">
                  Subtotal · Taxes & shipping calculated at checkout
                </p>

                <div className="mt-6 space-y-3 rounded-2xl bg-white/10 p-4 text-sm text-white/80">
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Packs</span>
                    <span className="text-white">
                      {totalItems}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Subtotal</span>
                    <span className="text-white">
                      ₹{subtotal}
                    </span>
                  </div>
                  <div className="h-px w-full bg-white/15" />
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Total</span>
                    <span className="text-base font-bold text-white">
                      ₹{subtotal}
                    </span>
                  </div>
                  {!meetsMinimum && (
                    <p className="mt-2 text-xs text-[#F2D9A2]">
                      Minimum order is {MIN_PACKS} packs. Add {packsRemaining} more
                      pack{packsRemaining > 1 ? "s" : ""} to checkout.
                    </p>
                  )}
                </div>

                <div className="mt-6 space-y-3">
                  {meetsMinimum && (
                    <button
                      type="button"
                      onClick={handleCheckout}
                      disabled={checkoutLoading}
                      className="inline-flex w-full items-center justify-center rounded-full bg-[#F2D9A2] px-6 py-2 text-[0.7rem] uppercase tracking-[0.25em] text-[#1E3B2A] shadow-lg shadow-black/30 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {checkoutLoading ? "Opening WhatsApp…" : "Checkout via WhatsApp"}
                    </button>
                  )}
                  <Link
                    href="/product"
                    className="inline-flex w-full items-center justify-center rounded-full border border-white/30 bg-transparent px-6 py-2 text-[0.7rem] uppercase tracking-[0.22em] text-white transition hover:-translate-y-0.5 hover:bg-white hover:text-[#0B1811]"
                  >
                    Add more packs
                  </Link>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

