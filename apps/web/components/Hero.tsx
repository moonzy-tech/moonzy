"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { products } from "@/lib/products";

const HERO_SCROLL_HEIGHT = products.length; // number of "screens" to scroll through

function lerp(start: number, end: number, t: number) {
  return start + (end - start) * Math.max(0, Math.min(1, t));
}

export default function Hero() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const totalHeroHeight = viewportHeight * HERO_SCROLL_HEIGHT;
      const progress = Math.min(1, scrollY / totalHeroHeight);
      setScrollProgress(progress);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      className="relative"
      style={{ height: `${HERO_SCROLL_HEIGHT * 100}vh` }}
      aria-label="Hero"
    >
      <div className="sticky top-0 left-0 h-screen w-full overflow-hidden">
        {products.map((product, i) => {
          const segment = 1 / products.length;
          const fadeLen = 0.08;
          const inStart = i * segment - fadeLen;
          const inEnd = i * segment;
          const outStart = (i + 1) * segment - fadeLen;
          const outEnd = (i + 1) * segment;

          let opacity = 0;
          if (scrollProgress < inStart) opacity = 0;
          else if (scrollProgress <= inEnd) {
            opacity = lerp(0, 1, (scrollProgress - inStart) / (inEnd - inStart));
          } else if (scrollProgress < outStart) opacity = 1;
          else if (scrollProgress <= outEnd) {
            opacity = lerp(1, 0, (scrollProgress - outStart) / (outEnd - outStart));
          } else opacity = 0;

          const active =
            scrollProgress >= inStart && scrollProgress <= outEnd;
          const fadeInT =
            active && scrollProgress <= inEnd
              ? (scrollProgress - inStart) / (inEnd - inStart)
              : active && scrollProgress >= outStart
                ? 1 - (scrollProgress - outStart) / (outEnd - outStart)
                : active
                  ? 1
                  : 0;
          const scale = 0.98 + 0.04 * fadeInT;

          return (
            <div
              key={product.id}
              className={`absolute inset-0 bg-layer ${product.heroBg}`}
              style={{
                opacity,
                transform: `scale(${scale})`,
                transition: "opacity 0.15s ease-out, transform 0.15s ease-out",
              }}
            >
              <div className="relative flex h-full w-full flex-col items-center justify-center gap-8 px-6 text-white lg:mx-auto lg:block lg:max-w-6xl lg:px-10">
                {/* Product image: slightly right on large screens */}
                <div className="pointer-events-none flex justify-center lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-16">
                  <Image
                    src={product.image}
                    alt={`${product.name} chips`}
                    width={588}
                    height={798}
                    className="w-[320px] max-w-[88vw] sm:w-[340px] md:w-[380px] lg:w-[440px] xl:w-[600px] drop-shadow-[0_25px_80px_rgba(0,0,0,0.55)]"
                  />
                </div>

                {/* Text: below lg under image (centered); lg+ further left from image */}
                <div className=" space-y-4 text-center text-[#1c1414] lg:absolute lg:left-4 lg:top-1/2 lg:z-10 lg:-translate-y-1/2 lg:text-left xl:left-5">
                  <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                    {product.heroHeadlineLines[0]}
                    <br /> 
                    {product.heroHeadlineLines[1]}
                    <br />
                    {product.heroHeadlineLines[2]}
                  </h1> 
                  <p className="text-sm leading-relaxed text-[#F5E9CF] sm:text-base">
                    {product.heroDescription}
                  </p>
                  <button className="inline-flex items-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-[#20562B] shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:shadow-xl sm:px-8 sm:py-3 sm:text-base">
                    Know More
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}