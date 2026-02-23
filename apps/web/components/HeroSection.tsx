"use client";

import { useEffect, useState } from "react";

const COLORS = ["#20562B", "#DB6716", "#990E0F", "#E9E6C5"];
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
      {/* Sticky viewport-sized container so screens stay fixed while we scroll */}
      <div className="sticky top-0 left-0 h-screen w-full overflow-hidden">
        {COLORS.map((color, i) => {
          // Crossfade: each screen fades in then out over scroll
          const segment = 1 / COLORS.length;
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

          // Subtle scale: slight zoom as screen is “active”
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
              key={color}
              className="absolute inset-0 flex items-center justify-center"
              style={{
                backgroundColor: color,
                opacity,
                transform: `scale(${scale})`,
                transition: "opacity 0.15s ease-out, transform 0.15s ease-out",
              }}
            >
              {/* Add your respective component for this screen here */}
              <div className="h-full w-full" />
            </div>
          );
        })}
      </div>
    </section>
  );
}
