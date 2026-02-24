 "use client";

import Image from "next/image";
import { useState } from "react";
import { addToCart } from "@/lib/cart";
import { products, type ProductId } from "@/lib/products";

export default function ProductPage() {
  const [activeId, setActiveId] = useState<ProductId>("peri");
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState<string | null>(null);

  const activeProduct = products.find((p) => p.id === activeId) ?? products[0];

  const handleAddToCart = () => {
    addToCart(activeProduct.id, quantity);
    setAddedMessage(
      `Added ${quantity} pack${quantity > 1 ? "s" : ""} of ${activeProduct.name} to cart`,
    );
    setTimeout(() => setAddedMessage(null), 2200);
  };

  const handleBuyNow = () => {
    if (typeof window !== "undefined") {
      window.location.href = "#contact";
    }
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
            <span className="font-semibold">Add to cart</span> or{" "}
            <span className="font-semibold">Buy now</span>.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.15fr_minmax(0,1fr)]">
          <div className="space-y-5">

            <div className="flex flex-wrap gap-3 rounded-3xl bg-white/90 p-3 shadow-[0_18px_45px_rgba(0,0,0,0.08)]">
              {products.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => setActiveId(product.id)}
                  className={`relative flex-1 min-w-36 rounded-2xl border px-3 py-3 text-left transition hover:-translate-y-0.5 hover:shadow-md ${
                    activeId === product.id
                      ? "border-[#1E3B2A] bg-[#0B1811] text-white"
                      : "border-[#E1D4C1] bg-white text-[#13241A]"
                  }`}
                >
                  <p className="text-[0.6rem] uppercase tracking-[0.22em] text-[#DB6716]">
                    {product.tag}
                  </p>
                  <p className="mt-1 text-sm">{product.name}</p>
                </button>
              ))}
            </div>

            <div className="rounded-3xl bg-white/90 p-5 shadow-[0_22px_60px_rgba(0,0,0,0.08)] md:p-6">
              <p className="inline-flex items-center rounded-full bg-[#F2D9A2]/80 px-3 py-1 text-[0.6rem] uppercase tracking-[0.22em] text-[#1E3B2A]">
                {activeProduct.tag}
              </p>
              <h2 className="mt-3 text-2xl font-bold text-[#1E3B2A] sm:text-3xl">
                {activeProduct.name}
              </h2>
              <p className="mt-1 text-sm font-sans font-semibold text-[#1E3B2A]">
                ₹{activeProduct.price}{" "}
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
                <div className="flex items-center gap-3 rounded-full bg-[#FDF5E5] px-3 py-2">
                  <span className="text-[0.65rem] uppercase tracking-[0.2em] text-[#7A6C54]">
                    Packs
                  </span>
                  <div className="inline-flex items-center rounded-full bg-white px-2 py-1 text-sm shadow-sm">
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
                    className="inline-flex flex-1 items-center justify-center rounded-full bg-[#1E3B2A] px-6 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white shadow-[0_14px_35px_rgba(0,0,0,0.3)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_55px_rgba(0,0,0,0.4)] sm:flex-none"
                  >
                    Add to cart
                  </button>
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="inline-flex flex-1 items-center justify-center rounded-full border border-[#1E3B2A] bg-transparent px-6 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#1E3B2A] transition hover:-translate-y-0.5 hover:bg-[#1E3B2A] hover:text-white sm:flex-none"
                  >
                    Buy now
                  </button>
                </div>
              </div>

              {addedMessage && (
                <p className="mt-3 text-xs font-medium text-[#A45715]">
                  {addedMessage} · Checkout coming soon.
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-md rounded-[2rem] bg-[#0B1811] p-6 pt-8 shadow-[0_26px_70px_rgba(0,0,0,0.55)]">
              <div
                className="pointer-events-none absolute inset-3 rounded-[1.7rem] opacity-70 mix-blend-screen"
                style={{ backgroundColor: activeProduct.accent }}
              />
              <div className="relative z-10 flex flex-col items-center gap-4">
                <p className="text-[0.65rem] uppercase tracking-[0.22em] text-white/80">
                  Your pick:
                </p>
                <p className="text-lg font-semibold text-white">
                  {activeProduct.name}
                </p>
                <div className="relative h-56 w-44 sm:h-64 sm:w-52">
                  <Image
                    src={activeProduct.image}
                    alt={activeProduct.name}
                    fill
                    sizes="(min-width: 1024px) 13rem, 11rem"
                    className="object-contain drop-shadow-[0_26px_70px_rgba(0,0,0,0.9)]"
                    priority
                  />
                </div>
                <p className="text-[0.65rem] uppercase tracking-[0.22em] text-white/70">
                  Crunch Level: Loud · Shareability: Max
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

