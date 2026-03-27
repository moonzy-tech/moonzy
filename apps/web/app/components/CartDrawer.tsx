"use client";

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
import { IconTrash, IconX } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const WHATSAPP_NUMBER = "918390255117";
const LAST_ORDER_KEY = "moonzy_last_whatsapp_order_v1";
const MIN_PACKS = 5;

const sans = { fontFamily: "'Instrument Sans', system-ui, sans-serif" } as const;
const serif = { fontFamily: "'Playfair Display', Georgia, serif" } as const;

type CartViewItem = {
  productId: string;
  quantity: number;
  name: string;
  tag: string;
  image: string;
  price: number;
};

type CartDrawerContentProps = {
  onClose?: () => void;
  showCloseButton?: boolean;
  variant?: "drawer" | "page";
};

export function CartDrawerContent({
  onClose,
  showCloseButton = true,
  variant = "drawer",
}: CartDrawerContentProps) {
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
  const meetsMinimum = totalItems >= MIN_PACKS;
  const packsRemaining = Math.max(MIN_PACKS - totalItems, 0);

  async function handleCheckout() {
    if (!meetsMinimum || isEmpty || checkoutLoading) return;
    if (authLoading) return;

    if (!user) {
      if (typeof window !== "undefined") window.location.href = "/auth";
      return;
    }

    setCheckoutLoading(true);
    try {
      const profile = await fetchProfile();
      if (!profile.defaultShippingAddress) {
        if (typeof window !== "undefined") window.location.href = "/profile";
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
        // non-blocking
      }

      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
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
          // ignore
        }
        window.open(url, "_blank");
      }

      clearCart();
      onClose?.();
      router.push("/orders/whatsapp");
    } finally {
      setCheckoutLoading(false);
    }
  }

  const shellClass =
    variant === "drawer"
      ? "relative flex h-full min-h-0 flex-col overflow-hidden bg-[#141826]"
      : "relative flex min-h-[min(70vh,640px)] flex-col overflow-hidden rounded-[28px] border border-[rgba(200,195,185,0.08)] bg-[#141826] shadow-[0_26px_70px_rgba(0,0,0,0.55)]";

  return (
    <div className={shellClass}>
      {/* Masthead glow — matches /blog hero */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-[280px] w-[min(100%,480px)] -translate-x-1/2 opacity-[0.07]"
        style={{
          background:
            "radial-gradient(ellipse at center, #D4A94C 0%, transparent 70%)",
        }}
      />

      <header className="relative shrink-0 border-b border-[rgba(200,195,185,0.08)] px-5 pb-5 pt-6 md:px-6 md:pt-7">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#D4A94C]"
              style={sans}
            >
              Your order
            </p>
            <div className="flex flex-wrap items-end gap-3">
              <h2
                className="text-[#F5F0E8] text-2xl font-normal leading-tight md:text-3xl"
                style={serif}
              >
                Your cart
              </h2>
              <span
                className="inline-flex items-center gap-1.5 rounded-full border border-[#D4A94C]/30 bg-[#D4A94C]/15 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#D4A94C] backdrop-blur-sm"
                style={sans}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#D4A94C]" />
                {totalItems > 99 ? "99+" : totalItems}{" "}
                {totalItems === 1 ? "pack" : "packs"}
              </span>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <span className="h-px w-12 bg-[rgba(200,195,185,0.15)]" />
              <span className="h-1.5 w-1.5 rotate-45 border border-[#D4A94C]/40" />
              <span className="h-px w-12 bg-[rgba(200,195,185,0.15)]" />
            </div>
          </div>
          {showCloseButton && onClose && (
            <button
              type="button"
              onClick={onClose}
              className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[rgba(200,195,185,0.1)] bg-[#1E2235] text-[rgba(200,195,185,0.55)] transition-all duration-300 hover:border-transparent hover:bg-[#D4A94C] hover:text-[#1E2235]"
              aria-label="Close cart"
            >
              <IconX className="h-4 w-4" stroke={1.5} />
            </button>
          )}
        </div>
      </header>

      <div className="relative min-h-0 flex-1 overflow-y-auto px-5 py-6 md:px-6">
        {isEmpty ? (
          <div className="flex min-h-[240px] flex-col items-center justify-center px-2 text-center md:min-h-[300px]">
            <p
              className="text-lg leading-[1.75] text-[#E8DFC8] md:text-xl"
              style={serif}
            >
              Your cart is empty.
            </p>
            <p
              className="mx-auto mt-4 max-w-[320px] text-sm leading-relaxed text-[rgba(200,195,185,0.6)]"
              style={sans}
            >
              Add a few packs from the shop — we&apos;ll keep them here for you.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-[rgba(200,195,185,0.15)]" />
              <span className="h-1.5 w-1.5 rotate-45 border border-[#D4A94C]/40" />
              <span className="h-px w-10 bg-[rgba(200,195,185,0.15)]" />
            </div>
            <Link
              href="/product"
              onClick={() => onClose?.()}
              className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#D4A94C] transition-all duration-300 hover:gap-3"
              style={sans}
            >
              Shop flavours
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <span
                className="text-xs font-semibold uppercase tracking-[0.2em] text-[rgba(200,195,185,0.4)]"
                style={sans}
              >
                In your bag
              </span>
              <span className="h-px flex-1 bg-[rgba(200,195,185,0.08)]" />
            </div>

            <div className="flex items-center justify-between gap-3">
              <p
                className="text-sm text-[rgba(200,195,185,0.55)]"
                style={sans}
              >
                {totalItems} pack{totalItems > 1 ? "s" : ""} total
              </p>
              <button
                type="button"
                onClick={() => clearCart()}
                className="text-xs font-semibold uppercase tracking-[0.15em] text-[rgba(245,240,232,0.45)] transition-colors hover:text-[#D4A94C]"
                style={sans}
              >
                Clear all
              </button>
            </div>

            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.productId}
                  className="rounded-[16px] border border-[rgba(200,195,185,0.07)] bg-[#1A1F33]/60 p-4 transition-all duration-500 md:rounded-[20px]"
                >
                  <div className="flex gap-3">
                    <div className="relative h-[72px] w-[60px] shrink-0 overflow-hidden rounded-xl bg-[#141826]/50">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="60px"
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#D4A94C]/70"
                        style={sans}
                      >
                        {item.tag}
                      </p>
                      <p
                        className="mt-0.5 line-clamp-2 text-base font-normal leading-snug text-[#F5F0E8] md:text-lg"
                        style={serif}
                      >
                        {item.name}
                      </p>
                      <p
                        className="mt-1 text-[0.82rem] leading-[1.7] text-[rgba(200,195,185,0.55)]"
                        style={sans}
                      >
                        ₹{item.price}{" "}
                        <span className="text-[rgba(200,195,185,0.35)]">
                          per pack
                        </span>
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <div className="inline-flex items-center rounded-full border border-[rgba(200,195,185,0.12)] bg-[#141826]/70 px-1.5 py-1">
                          <button
                            type="button"
                            onClick={() =>
                              updateCartItemQuantity(
                                item.productId,
                                item.quantity - 1,
                              )
                            }
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-[rgba(200,195,185,0.2)] text-lg leading-none text-[#F5F0E8] transition hover:bg-[rgba(200,195,185,0.3)]"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="min-w-[2ch] px-2 text-center text-sm text-[#F5F0E8]">
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
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-[#D4A94C] text-lg leading-none text-[#141826] transition hover:bg-[#e4bc69]"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.productId)}
                          className="inline-flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[#D4A94C]/60 transition-all hover:text-[#D4A94C]"
                          style={sans}
                          aria-label={`Remove ${item.name}`}
                        >
                          <IconTrash className="h-3.5 w-3.5" />
                          Remove
                        </button>
                      </div>
                    </div>
                    <p
                      className="shrink-0 pt-0.5 text-base font-normal tabular-nums text-[#F5F0E8]"
                      style={serif}
                    >
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {!meetsMinimum && (
              <div className="rounded-2xl border border-[rgba(200,195,185,0.08)] bg-[#1A1F33]/80 p-4 text-center">
                <p
                  className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4A94C]"
                  style={sans}
                >
                  Minimum {MIN_PACKS} packs to checkout
                </p>
                <p
                  className="mt-2 text-sm text-[rgba(200,195,185,0.55)]"
                  style={sans}
                >
                  Add {packsRemaining} more pack
                  {packsRemaining > 1 ? "s" : ""} to continue.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <footer className="relative shrink-0 space-y-5 border-t border-[rgba(200,195,185,0.08)] bg-[#141826] px-5 py-5 md:px-6">
        <div className="flex items-center justify-center gap-3 opacity-90">
          <span className="h-px w-10 bg-[rgba(200,195,185,0.2)]" />
          <span className="h-2 w-2 rotate-45 border border-[#D4A94C]/40" />
          <span className="h-px w-10 bg-[rgba(200,195,185,0.2)]" />
        </div>

        <div className="flex items-end justify-between gap-4">
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-[0.18em] text-[rgba(200,195,185,0.5)]"
              style={sans}
            >
              Subtotal
            </p>
            <p
              className="mt-1 text-2xl font-normal tabular-nums text-[#F5F0E8] md:text-3xl"
              style={serif}
            >
              ₹{subtotal}
            </p>
          </div>
          <p
            className="max-w-[140px] text-right text-[0.65rem] leading-snug text-[rgba(200,195,185,0.45)]"
            style={sans}
          >
            Taxes &amp; shipping at checkout
          </p>
        </div>

        <button
          type="button"
          onClick={handleCheckout}
          disabled={isEmpty || !meetsMinimum || checkoutLoading}
          className="inline-flex w-full items-center justify-center rounded-full bg-[#D4A94C] px-6 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#141826] shadow-lg shadow-black/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-50"
          style={sans}
        >
          {checkoutLoading ? "Opening WhatsApp…" : "Checkout via WhatsApp"}
        </button>

        {!isEmpty && (
          <Link
            href="/product"
            onClick={() => onClose?.()}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#D4A94C]/40 bg-transparent px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#D4A94C] transition-all duration-300 hover:bg-[#D4A94C] hover:text-[#1E2235] hover:border-transparent"
            style={sans}
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add more packs
          </Link>
        )}
      </footer>
    </div>
  );
}

export default function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <>
      <div
        className={`fixed inset-0 z-200 bg-[#141826]/60 backdrop-blur-[2px] transition-opacity duration-300 ease-out motion-reduce:transition-none ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden={!open}
      />
      <aside
        className={`fixed right-0 top-0 z-201 flex h-full max-h-dvh w-full max-w-md flex-col border-l border-[rgba(200,195,185,0.08)] bg-[#141826] shadow-[0_0_80px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-out motion-reduce:transition-none ${
          open ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <CartDrawerContent onClose={onClose} showCloseButton variant="drawer" />
      </aside>
    </>
  );
}
