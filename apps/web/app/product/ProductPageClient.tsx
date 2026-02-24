"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { addToCart } from "@/lib/cart";
import { products, type ProductId } from "@/lib/products";

export default function ProductPageClient() {
  const searchParams = useSearchParams();
  const flavorParam = searchParams.get("flavor");
  const initialId: ProductId =
    (products.find((p) => p.id === flavorParam)?.id as ProductId | undefined) ??
    "peri";

  const [activeId, setActiveId] = useState<ProductId>(initialId);
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const activeProduct = products.find((p) => p.id === activeId) ?? products[0];

  const handleAddToCart = () => {
    addToCart(activeProduct.id, quantity);
    setAddedMessage(
      `Added ${quantity} pack${quantity > 1 ? "s" : ""} of ${activeProduct.name} to cart`,
    );
    setTimeout(() => setAddedMessage(null), 2200);
  };

  return (
    <main className="min-h-screen bg-[#FDF5E5] pt-28 pb-20 text-[#13241A]">
      <section className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#A45715] md:text-sm">
            Moonzy
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-[#1E3B2A] sm:text-4xl md:text-5xl">
            Pick your Moonzy mood.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-[#4C4A3F] sm:text-base">
            Choose a flavour, set how many packs you&apos;re craving and tap{" "}
            <span className="font-semibold">Add to cart</span>.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_1.15fr]">
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-md rounded-[2rem] bg-[#0B1811] p-6 pt-8 shadow-[0_26px_70px_rgba(0,0,0,0.55)]">
              <div
                className="pointer-events-none absolute inset-3 rounded-[1.7rem] opacity-70 mix-blend-screen"
                style={{ backgroundColor: activeProduct.accent }}
              />
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="relative h-56 w-44 sm:h-100 sm:w-70">
                  <Image
                    src={activeProduct.image}
                    alt={activeProduct.name}
                    fill
                    sizes="(min-width: 1024px) 13rem, 11rem"
                    className="object-contain drop-shadow-[0_26px_70px_rgba(0,0,0,0.9)]"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="relative max-w-xs">
              <button
                type="button"
                onClick={() => setIsDropdownOpen((open) => !open)}
                className="flex w-full items-center justify-between rounded-full border border-[#E1D4C1] bg-white/95 px-4 py-3 text-left font-sans shadow-[0_18px_45px_rgba(0,0,0,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_55px_rgba(0,0,0,0.12)]"
                aria-haspopup="listbox"
                aria-expanded={isDropdownOpen}
              >
                <div className="flex flex-col">
                  <span className="text-[0.6rem] uppercase tracking-[0.22em] text-[#DB6716]">
                    Flavour
                  </span>
                  <span className="text-sm font-semibold text-[#13241A]">
                    {activeProduct.name}
                  </span>
                </div>
                <span className="ml-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#F4E3C7] text-xs text-[#1E3B2A]">
                  {isDropdownOpen ? "▲" : "▼"}
                </span>
              </button>

              {isDropdownOpen && (
                <div
                  className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-[#E1D4C1] bg-white/98 shadow-[0_22px_60px_rgba(0,0,0,0.16)] backdrop-blur-sm"
                  role="listbox"
                >
                  {products.map((product) => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => {
                        setActiveId(product.id);
                        setIsDropdownOpen(false);
                      }}
                      className={`flex w-full items-start gap-3 px-4 py-3 text-left text-sm font-sans transition hover:bg-[#FDF5E5] ${
                        activeId === product.id
                          ? "bg-[#0B1811] text-white"
                          : "text-[#13241A]"
                      }`}
                      role="option"
                      aria-selected={activeId === product.id}
                    >
                      <div className="mt-1 h-2 w-2 rounded-full bg-[#DB6716]" />
                      <div>
                        <p className="text-[0.6rem] uppercase tracking-[0.22em] text-[#DB6716]">
                          {product.tag}
                        </p>
                        <p className="mt-0.5 text-sm font-medium">
                          {product.name}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-3xl bg-white/90 p-5 shadow-[0_22px_60px_rgba(0,0,0,0.08)] md:p-6">
              <p className="inline-flex items-center rounded-full bg-[#F2D9A2]/80 px-3 py-1 text-[0.6rem] uppercase tracking-[0.22em] text-[#1E3B2A]">
                {activeProduct.tag}
              </p>
              <h2 className="mt-3 text-2xl font-bold text-[#1E3B2A] sm:text-3xl">
                {activeProduct.name}
              </h2>
              <p className="mt-1 text-sm font-sans font-semibold text-[#1E3B2A]">
                ₹70{" "}
                <span className="text-xs font-normal text-[#4C4A3F]">
                  per pack
                </span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#4C4A3F] sm:text-base">
                {activeProduct.description}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-[#7A6C54] sm:text-sm">
                {activeProduct.notes}
              </p>

              <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3 rounded-full bg-[#FDF5E5] px-3 py-2 font-sans">
                  <span className="text-[0.65rem] uppercase tracking-[0.2em] text-[#7A6C54]">
                    Packs
                  </span>
                  <div className="inline-flex items-center rounded-full bg-white px-2 py-1 text-sm font-sans shadow-sm">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="h-7 w-7 rounded-full bg-[#F4E3C7] text-lg leading-none text-[#1E3B2A] hover:bg-[#f0d6ae]"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="mx-3 min-w-[2ch] text-center text-sm font-semibold">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                      className="h-7 w-7 rounded-full bg-[#1E3B2A] text-lg leading-none text-white hover:bg-[#214732]"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-1 flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="inline-flex flex-1 items-center justify-center rounded-full bg-[#1E3B2A] px-6 py-2 text-[0.7rem] font-sans font-semibold uppercase tracking-[0.22em] text-white shadow-[0_14px_35px_rgba(0,0,0,0.3)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_55px_rgba(0,0,0,0.4)] sm:flex-none"
                  >
                    Add to cart
                  </button>
                </div>
              </div>

              <div className="mt-3 text-center text-xs text-[#4C4A3F] sm:hidden">
                <Link
                  href="/cart"
                  className="underline underline-offset-4 hover:text-[#1E3B2A]"
                >
                  Go to cart
                </Link>
              </div>

              {addedMessage && (
                <p className="mt-3 text-xs font-medium text-[#A45715]">
                  {addedMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

