"use client";

import Navigation from "../components/Navigation";
import FooterSection from "../components/FooterSection";
import { CartDrawerContent } from "../components/CartDrawer";

export default function CartPage() {
  return (
    <>
      <main className="min-h-screen bg-[#141826]">
        <Navigation />
        <div className="relative overflow-hidden pt-20 pb-10 md:pt-24">
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 opacity-[0.07]"
            style={{
              background:
                "radial-gradient(ellipse at center, #D4A94C 0%, transparent 70%)",
            }}
          />
          <div className="relative mx-auto max-w-[1200px] px-6 text-center md:px-10 lg:px-12">
            <p
              className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#D4A94C]"
              style={{
                fontFamily: "'Instrument Sans', system-ui, sans-serif",
              }}
            >
              Moonzy
            </p>
            <h1
              className="mb-3 text-4xl font-normal text-[#F5F0E8] md:text-5xl lg:text-6xl"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Your cart
            </h1>
            <p
              className="mx-auto max-w-[520px] text-base leading-relaxed text-[rgba(200,195,185,0.6)] md:text-lg"
              style={{
                fontFamily: "'Instrument Sans', system-ui, sans-serif",
              }}
            >
              Review your packs and checkout when you&apos;re ready. Minimum{" "}
              {5} packs.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <span className="h-px w-16 bg-[rgba(200,195,185,0.15)]" />
              <span className="h-1.5 w-1.5 rotate-45 border border-[#D4A94C]/40" />
              <span className="h-px w-16 bg-[rgba(200,195,185,0.15)]" />
            </div>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[1200px] px-6 pb-20 md:px-10 md:pb-28 lg:px-12">
          <div className="mx-auto w-full max-w-md">
            <CartDrawerContent showCloseButton={false} variant="page" />
          </div>
        </div>
      </main>
      <FooterSection />
    </>
  );
}
