"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const flavors = {
    pudina: {
      bg: "bg-pudina",
      image: "/mint.svg",
    },
    peri: {
      bg: "bg-peri",
      image: "/Peri.svg",
    },
    caramel: {
      bg: "bg-caramel",
      image: "/caramel.svg",
    },
  hing: {
    bg: "bg-hing",
    image: "/hing.svg",
  },
} as const;

const HERO_SCROLL_HEIGHT = 4; // number of "screens" to scroll through

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
        {(Object.keys(flavors) as (keyof typeof flavors)[]).map((key, i) => {
          const segment = 1 / Object.keys(flavors).length;
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
              key={key}
              className={`absolute inset-0 bg-layer ${flavors[key].bg}`}
              style={{
                opacity,
                transform: `scale(${scale})`,
                transition: "opacity 0.15s ease-out, transform 0.15s ease-out",
              }}
            >
              <div className="relative flex h-full w-full flex-col items-center justify-center gap-8 px-6 text-white lg:mx-auto lg:block lg:max-w-6xl lg:px-10">
                {/* Product image: centered; below lg in flow (top), lg+ absolute center */}
                <div className="pointer-events-none flex justify-center lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">
                  <Image
                    src={flavors[key].image}
                    alt={`${key} chips`}
                    width={560}
                    height={760}
                    className="w-[320px] max-w-[88vw] sm:w-[340px] md:w-[380px] lg:w-[440px] xl:w-[500px]"
                  />
                </div>

                {/* Text: below lg under image (centered); lg+ further left from image */}
                <div className="max-w-sm space-y-4 text-center text-white lg:absolute lg:left-4 lg:top-1/2 lg:z-10 lg:-translate-y-1/2 lg:text-left xl:left-10 2xl:left-16">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#F2D9A2]">
                    Turn up the heat
                  </p>
                  <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
                    TURN UP THE HEAT
                    <br />
                    WITH EVERY FIERY
                    <br />
                    CRUNCH
                  </h1>
                  <p className="text-xs leading-relaxed text-[#F5E9CF] sm:text-sm">
                    Our Sizzlin&apos; Hot Chips are made for the
                    <br />
                    fearless snacker. Packed with intense spice
                    <br />
                    and fiery flavor.
                  </p>
                  <button className="inline-flex items-center rounded-full bg-white px-6 py-2.5 text-xs font-semibold text-[#20562B] shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:shadow-xl sm:px-8 sm:py-3 sm:text-sm">
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