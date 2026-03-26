"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function ProductsSection() {
  const router = useRouter();

  type BackendProduct = {
    _id?: string;
    name: string;
    slug: string;
    price: number; // paise
    compareAtPrice?: number; // paise
    imageUrl?: string;
  };

  type UiProduct = {
    key: string;
    flavorId: "peri" | "pudina" | "caramel" | "hing";
    name: string;
    price: string;
    originalPrice?: string;
    bgColor: string;
    image: string;
  };

  const [products, setProducts] = useState<BackendProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api<BackendProduct[]>("/products")
      .then(setProducts)
      .catch(() => {
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, []);

  function formatPaise(paise: number) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(paise / 100);
  }

  function toFlavorId(slug: string): UiProduct["flavorId"] {
    const value = slug.toLowerCase();
    if (value.includes("hing")) return "hing";
    if (value.includes("caramel")) return "caramel";
    if (value.includes("peri")) return "peri";
    return "pudina";
  }

  const uiProducts: UiProduct[] = useMemo(() => {
    const themeBySlug: Record<string, { bgColor: string; fallbackImage: string }> = {
      pudina: { bgColor: "#7BF0A8", fallbackImage: "/products/pudina-mint.png" },
      hing: { bgColor: "#5A8C5A", fallbackImage: "/products/hing-chutney.png" },
      peri: { bgColor: "#F07878", fallbackImage: "/products/peri-peri.png" },
      caramel: { bgColor: "#F5A84B", fallbackImage: "/products/caramel.png" },
    };

    return products.map((p) => {
      const theme = (themeBySlug[p.slug] ?? themeBySlug.pudina)!;
      return {
        key: p._id ?? p.slug,
        flavorId: toFlavorId(p.slug),
        name: p.name,
        price: formatPaise(p.price),
        originalPrice: p.compareAtPrice != null ? formatPaise(p.compareAtPrice) : undefined,
        bgColor: theme.bgColor,
        image: p.imageUrl ?? theme.fallbackImage,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  return (
    <section id="shop" className="bg-[#141826] py-12 md:py-16 lg:py-18 xl:py-20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-12">
        {/* Heading */}
        <div className="text-center mb-8 md:mb-12 lg:mb-[52px]">
          <h2
            className="font-serif text-[#F0E6CC] text-3xl sm:text-4xl md:text-5xl lg:text-[3.8rem] font-bold leading-tight mb-3 md:mb-4"
            style={{
              letterSpacing: "-0.01em",
            }}
          >
            The Night Had Everything
          </h2>
          <p
            className="text-[#F0E6CC] text-base md:text-lg lg:text-[1.1rem] leading-normal italic"
            style={{
              fontFamily: "'Georgia', 'Times New Roman', serif",
            }}
          >
            Except one thing. A snack built for it.
          </p>
        </div>

        {/* Product Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-10"
        >
          {uiProducts.map((product) => {
            const productHref = `/product?flavor=${product.flavorId}`;
            return (
            <Link
              key={product.key}
              href={productHref}
              aria-label={`View ${product.name}`}
              className="group"
              style={{
                cursor: "pointer",
                display: "block",
                width: "100%",
                maxWidth: "280px",
                justifySelf: "center",
              }}
              onClick={(e) => {
                e.preventDefault();
                router.push(productHref);
              }}
            >
              {/* Card Container */}
              <div
                className="border border-[rgba(200,195,185,0.18)] rounded-2xl md:rounded-3xl lg:rounded-[22px] p-3 md:p-3.5 lg:p-[14px] mb-3 md:mb-4 transform transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:-translate-y-2"
                style={{
                  background: "rgba(30, 33, 48, 0.6)",
                }}
              >
                {/* Colored Image Area */}
                <div
                  className="rounded-xl md:rounded-2xl lg:rounded-[14px] flex items-center justify-center overflow-hidden relative"
                  style={{
                    backgroundColor: product.bgColor,
                    aspectRatio: "1 / 1.15",
                  }}
                >
                  {/* Placeholder for product image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                    style={{
                      width: "75%",
                      height: "90%",
                      objectFit: "contain",
                      filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.2))",
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      if (e.currentTarget.nextSibling) {
                        (e.currentTarget.nextSibling as HTMLElement).style.display = "flex";
                      }
                    }}
                  />
                  <div
                    style={{
                      display: "none",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      inset: 0,
                    }}
                  >
                    {/* Package placeholder */}
                    <div
                      style={{
                        width: "60%",
                        height: "75%",
                        background: "rgba(0,0,0,0.12)",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                        fill="none"
                      >
                        <rect
                          x="8"
                          y="12"
                          width="32"
                          height="28"
                          rx="4"
                          stroke="rgba(255,255,255,0.5)"
                          strokeWidth="2"
                          fill="none"
                        />
                        <path
                          d="M8 20L24 8L40 20"
                          stroke="rgba(255,255,255,0.5)"
                          strokeWidth="2"
                          fill="none"
                        />
                        <text
                          x="24"
                          y="32"
                          textAnchor="middle"
                          fill="rgba(255,255,255,0.4)"
                          fontSize="6"
                          fontFamily="system-ui"
                        >
                          Product Image
                        </text>
                      </svg>
                    </div>
                  </div>
                </div>
                {/* Product Info - Inside Card */}
                <div className="pl-1 pt-4">
                  <h3
                    className="text-[#F5F0E8] text-sm md:text-base mb-2 leading-tight"
                    style={{
                      fontFamily: "'Georgia', 'Times New Roman', serif",
                    }}
                  >
                    {product.name}
                  </h3>
                  <div className="flex items-baseline gap-2 md:gap-3">
                    <span
                      className="text-[#F5F0E8] text-base md:text-lg lg:text-[1.15rem] font-bold"
                      style={{
                        fontFamily: "system-ui, -apple-system, sans-serif",
                      }}
                    >
                      {product.price}
                    </span>
                    {product.originalPrice ? (
                      <span
                        className="text-[rgba(245,240,232,0.4)] text-sm md:text-base line-through"
                        style={{
                          fontFamily: "system-ui, -apple-system, sans-serif",
                        }}
                      >
                        {product.originalPrice}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            </Link>
          );
          })}
        </div>
      </div>
    </section>
  );
}