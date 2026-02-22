"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const IMAGES = ["/1.png", "/2.png", "/3.png", "/4.png"];
const HERO_SCROLL_HEIGHT = 4; // number of "screens" to scroll through

function lerp(start: number, end: number, t: number) {
  return start + (end - start) * Math.max(0, Math.min(1, t));
}

export default function HeroSection() {
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
      {/* Sticky viewport-sized container so images stay fixed while we scroll */}
      <div className="sticky top-0 left-0 h-screen w-full overflow-hidden">
        {IMAGES.map((src, i) => {
          // Crossfade windows: each image fades in then out over scroll
          const segment = 1 / IMAGES.length;
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

          // Subtle scale: slight zoom as image is “active”
          const active = scrollProgress >= inStart && scrollProgress <= outEnd;
          const fadeInT =
            active && scrollProgress <= inEnd
              ? (scrollProgress - inStart) / (inEnd - inStart)
              : active && scrollProgress >= outStart
                ? 1 - (scrollProgress - outStart) / (outEnd - outStart)
                : active ? 1 : 0;
          const scale = 0.98 + 0.04 * fadeInT;

          return (
            <div
              key={src}
              className="absolute inset-0"
              style={{
                opacity,
                transform: `scale(${scale})`,
                transition: "opacity 0.15s ease-out, transform 0.15s ease-out",
              }}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="100vw"
                className="object-contain"
                priority={i === 0}
                quality={90}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
