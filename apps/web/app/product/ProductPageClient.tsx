"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { addToCart } from "@/lib/cart";
import { products, type ProductId } from "@/lib/products";
import { useToast } from "@/components/Toast";
import Navigation from "../components/Navigation";
import FooterSection from "../components/FooterSection";

export default function ProductPageClient() {
  const searchParams = useSearchParams();
  const flavorParam = searchParams.get("flavor");
  const initialId: ProductId =
    (products.find((p) => p.id === flavorParam)?.id as ProductId | undefined) ??
    "peri";

  const [activeId, setActiveId] = useState<ProductId>(initialId);
  const [quantity, setQuantity] = useState(1);
  const [showIngredients, setShowIngredients] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { showToast } = useToast();

  const activeProduct = products.find((p) => p.id === activeId) ?? products[0];
  const otherProducts = products.filter((p) => p.id !== activeId);

  const handleAddToCart = () => {
    addToCart(activeProduct.id, quantity);
    showToast(
      `Added ${quantity} pack${quantity > 1 ? "s" : ""} of ${activeProduct.name} to cart 🎉`
    );
  };

  const faqs = [
    { question: "ARE YOUR COOKIES SAFE FOR KIDS OF ALL AGES?", answer: "Yes. Our cookies are made with carefully selected, kid-friendly ingredients" },
    { question: "DO YOU USE ARTIFICIAL FLAVORS OR COLORS?", answer: "No, we use only natural flavors and colors in all our products." },
    { question: "ARE YOUR COOKIES FRESHLY BAKED?", answer: "Yes, all our cookies are freshly baked and packaged to maintain maximum freshness." },
    { question: "DO YOU OFFER NUT-FREE COOKIE OPTIONS?", answer: "Yes, we have nut-free options available. Please check product descriptions." },
    { question: "ARE ANY OF YOUR COOKIES GLUTEN-FREE?", answer: "We are working on gluten-free options. Currently, our standard recipes contain gluten." },
    { question: "CAN I ORDER COOKIES FOR BIRTHDAYS OR SCHOOL EVENTS?", answer: "Absolutely! We offer bulk ordering for special events and celebrations." },
    { question: "HOW LONG DO THE COOKIES STAY FRESH?", answer: "Our cookies stay fresh for up to 2 weeks when stored in an airtight container." },
  ];

  return (
    <main style={{ backgroundColor: "#1E2030", minHeight: "100vh" }}>
      <Navigation />

      {/* ─── Product Hero ─── */}
      <section style={{ maxWidth: "1080px", margin: "0 auto", padding: "100px 24px 60px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: "48px", alignItems: "start" }}>

          {/* Left — Images */}
          <div className="opacity-0 animate-fadeInUp" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
            <div
              className="transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
              style={{
                backgroundColor: "#F5F0E8",
                borderRadius: "18px",
                aspectRatio: "0.85 / 1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px",
                marginBottom: "14px",
              }}
            >
              <div style={{ position: "relative", width: "85%", height: "90%" }}>
                <Image src={activeProduct.image} alt={activeProduct.name} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "contain" }} priority />
              </div>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              {[0, 1].map((i) => (
                <div
                  key={i}
                  className="transition-all duration-300 hover:scale-[1.05] hover:shadow-lg"
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "10px",
                    overflow: "hidden",
                    cursor: "pointer",
                    border: i === 0 ? "2px solid #D4A94C" : "2px solid rgba(200,195,185,0.15)",
                    backgroundColor: "#F5F0E8",
                    padding: "4px",
                    flexShrink: 0,
                  }}
                >
                  <div style={{ position: "relative", width: "100%", height: "100%" }}>
                    <Image src={activeProduct.image} alt={`${activeProduct.name} thumb`} fill sizes="80px" style={{ objectFit: "cover", borderRadius: "7px" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Product Info */}
          <div className="opacity-0 animate-fadeInUp" style={{ display: "flex", flexDirection: "column", gap: "22px", animationDelay: '300ms', animationFillMode: 'forwards' }}>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#F5F0E8", fontSize: "3.4rem", fontWeight: 700, lineHeight: 1.05, letterSpacing: "0.03em", textTransform: "uppercase" }}>
              {activeProduct.name}
            </h1>

            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "14px" }}>
                <span style={{ fontFamily: "system-ui, sans-serif", color: "#F5F0E8", fontSize: "1.15rem", fontWeight: 700 }}>₹{activeProduct.price}.00</span>
                <span style={{ fontFamily: "system-ui, sans-serif", color: "rgba(200,195,185,0.4)", fontSize: "1rem", textDecoration: "line-through" }}>₹{Math.round(activeProduct.price * 1.4)}.00</span>
              </div>
              <span style={{ fontFamily: "system-ui, sans-serif", color: "rgba(200,195,185,0.55)", fontSize: "0.88rem" }}>15 in</span>
            </div>

            <p style={{ fontFamily: "'Georgia', serif", color: "rgba(245,240,232,0.65)", fontSize: "0.92rem", lineHeight: 1.7 }}>
              {activeProduct.description} {activeProduct.notes}
            </p>

            {/* Quantity + Buy Now */}
            <div style={{ display: "flex", gap: "14px", alignItems: "stretch" }}>
              <div style={{ display: "flex", alignItems: "center", backgroundColor: "#F5F0E8", borderRadius: "999px", padding: "0 4px", flex: "0 0 190px", height: "52px" }}>
                <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} style={{ width: "46px", height: "44px", borderRadius: "50%", border: "none", background: "transparent", color: "#1E2030", fontSize: "1.3rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 300 }}>−</button>
                <span style={{ flex: 1, textAlign: "center", fontFamily: "system-ui, sans-serif", color: "#1E2030", fontSize: "1.05rem", fontWeight: 600 }}>{quantity}</span>
                <button type="button" onClick={() => setQuantity((q) => Math.min(10, q + 1))} style={{ width: "46px", height: "44px", borderRadius: "50%", border: "none", background: "transparent", color: "#1E2030", fontSize: "1.3rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 300 }}>+</button>
              </div>
              <button type="button" onClick={handleAddToCart} className="transition-all duration-300 hover:scale-[1.02] hover:shadow-xl" style={{ flex: 1, borderRadius: "999px", border: "none", backgroundColor: "#F5F0E8", color: "#1E2030", fontFamily: "'Instrument Sans', system-ui, sans-serif", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", height: "52px" }}>BUY NOW</button>
            </div>

            {/* Add to Cart */}
            <button type="button" onClick={handleAddToCart} className="transition-all duration-300 hover:scale-[1.02] hover:shadow-xl" style={{ width: "100%", padding: "16px 24px", borderRadius: "999px", border: "none", backgroundColor: "#D4A94C", color: "#1E2030", fontFamily: "'Instrument Sans', system-ui, sans-serif", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", height: "52px" }}>
              🛒 ADD TO CART
            </button>

            {/* Ingredients */}
            <div className="transition-all duration-300 hover:border-[#D4A94C]" style={{ border: "1.5px solid rgba(245,240,232,0.2)", borderRadius: "14px", overflow: "hidden", backgroundColor: "#1A1C2E", marginTop: "4px" }}>
              <button type="button" onClick={() => setShowIngredients(!showIngredients)} className="transition-all duration-300" style={{ width: "100%", padding: "18px 22px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "transparent", border: "none", color: "#F5F0E8", fontFamily: "'Instrument Sans', system-ui, sans-serif", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}>
                <span>INGREDIENTS</span>
                <span className="transition-transform duration-300" style={{ fontSize: "1.1rem", transform: showIngredients ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
              </button>
              <div
                className="transition-all duration-500 ease-in-out overflow-hidden"
                style={{
                  maxHeight: showIngredients ? "150px" : "0px",
                  opacity: showIngredients ? 1 : 0,
                }}
              >
                <div style={{ padding: "0 22px 18px" }}>
                  <p style={{ fontFamily: "'Georgia', serif", color: "rgba(200,195,185,0.55)", fontSize: "0.88rem", lineHeight: 1.6 }}>
                    Millet flour (86%), palm oil, salt, spices, natural flavoring. Roasted, not fried.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ Section ─── */}
      <section style={{ backgroundColor: "#1E2030", padding: "48px 0 64px" }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "380px 1fr", gap: "24px", alignItems: "stretch" }}>

          {/* Left — CTA Card */}
          <div className="opacity-0 animate-fadeInUp transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl" style={{ backgroundColor: "#2B2D3A", borderRadius: "24px", padding: "60px 40px 50px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "28px", animationDelay: '100ms', animationFillMode: 'forwards', alignSelf: "start", position: "sticky", top: "100px" }}>
            {/* Icon */}
            <div style={{ marginBottom: "12px" }}>
              <svg width="64" height="75" viewBox="0 0 64 64" fill="none">
                <rect x="8" y="10" width="48" height="36" rx="4" stroke="white" strokeWidth="3" fill="none" />
                <path d="M8 46 L20 56" stroke="white" strokeWidth="3" strokeLinecap="round" />
                <circle cx="22" cy="26" r="2.5" fill="white" />
                <circle cx="32" cy="26" r="2.5" fill="white" />
                <circle cx="42" cy="26" r="2.5" fill="white" />
              </svg>
            </div>

            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#F5F5F0", fontSize: "2.25rem", fontWeight: 400, lineHeight: 1.25, margin: 0 }}>
              Everything Parents<br />Want to Know
            </h2>

            <p style={{ fontFamily: "'Georgia', serif", color: "rgba(255,255,255,0.7)", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: "340px", margin: 0 }}>
              Thoughtful answers about our ingredients, recipes, and processes—designed to give parents peace of mind at every step.
            </p>

            <button className="transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:brightness-110" style={{ width: "100%", backgroundColor: "#D4A94C", color: "#2B2D3A", padding: "18px 40px", borderRadius: "999px", border: "none", fontFamily: "system-ui, -apple-system, sans-serif", fontSize: "0.9rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", marginTop: "12px" }}>
              SHOOT A DIRECT
            </button>
          </div>

          {/* Right — FAQ Accordion with visible cream borders */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="opacity-0 animate-fadeInUp transition-all duration-300 hover:border-[#D4A94C]"
                style={{
                  borderRadius: "14px",
                  overflow: "hidden",
                  border: "1.5px solid rgba(245, 240, 232, 0.2)",
                  backgroundColor: "#1A1C2E",
                  animationDelay: `${300 + index * 100}ms`,
                  animationFillMode: 'forwards'
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="transition-all duration-300"
                  style={{
                    width: "100%",
                    padding: "18px 22px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "transparent",
                    border: "none",
                    color: "#F5F0E8",
                    fontFamily: "'Instrument Sans', system-ui, sans-serif",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span>{faq.question}</span>
                  <span className="transition-transform duration-300" style={{ fontSize: "1.1rem", transform: openFaq === index ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
                </button>
                <div
                  className="transition-all duration-500 ease-in-out overflow-hidden"
                  style={{
                    maxHeight: openFaq === index ? "200px" : "0px",
                    opacity: openFaq === index ? 1 : 0,
                  }}
                >
                  <div style={{ padding: "0 22px 18px" }}>
                    <p style={{ fontFamily: "'Georgia', serif", color: "rgba(245,240,232,0.6)", fontSize: "0.88rem", lineHeight: 1.65 }}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── You May Also Like ─── */}
      <section style={{ backgroundColor: "#1E2030", padding: "48px 0 72px" }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto", padding: "0 24px" }}>
          <div className="opacity-0 animate-fadeInUp" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px", animationDelay: '100ms', animationFillMode: 'forwards' }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#F5F0E8", fontSize: "2rem", fontWeight: 500 }}>You may also like</h2>
            <button className="transition-all duration-300 hover:scale-[1.05] hover:bg-white hover:text-[#1E2030]" style={{ border: "1.5px solid rgba(200,195,185,0.2)", borderRadius: "999px", padding: "9px 24px", background: "transparent", color: "#F5F0E8", fontFamily: "'Instrument Sans', system-ui, sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}>VIEW ALL</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
            {otherProducts.map((product, index) => (
              <Link key={product.id} href={`/product?flavor=${product.id}`} className="group" style={{ textDecoration: "none" }}>
                <div className="opacity-0 animate-fadeInUp transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:-translate-y-1 hover:border-[#D4A94C]" style={{ border: "1px solid rgba(200,195,185,0.12)", borderRadius: "18px", padding: "12px", paddingBottom: "0", backgroundColor: "rgba(26,28,46,0.5)", animationDelay: `${300 + index * 150}ms`, animationFillMode: 'forwards' }}>
                  <div style={{ backgroundColor: product.accent, borderRadius: "12px", aspectRatio: "1 / 1.1", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", position: "relative" }}>
                    <div className="transition-transform duration-500 group-hover:scale-[1.05] group-hover:rotate-2" style={{ position: "relative", width: "70%", height: "85%" }}>
                      <Image src={product.image} alt={product.name} fill sizes="300px" style={{ objectFit: "contain" }} />
                    </div>
                  </div>
                </div>
                <div style={{ padding: "12px 4px 0" }}>
                  <h3 style={{ fontFamily: "'Georgia', serif", color: "#F5F0E8", fontSize: "0.95rem", fontWeight: 400, marginBottom: "6px" }}>{product.name}</h3>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                    <span style={{ fontFamily: "system-ui, sans-serif", color: "#F5F0E8", fontSize: "1rem", fontWeight: 700 }}>₹{product.price}.00</span>
                    <span style={{ fontFamily: "system-ui, sans-serif", color: "rgba(200,195,185,0.35)", fontSize: "0.88rem", textDecoration: "line-through" }}>₹{Math.round(product.price * 1.4)}.00</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}