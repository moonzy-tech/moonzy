"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";

const SLIDE_INTERVAL = 4500; // ms between auto-slides
const TRANSITION_MS = 700; // slide transition duration

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pausedRef = useRef(false);
  const total = products.length;

  /* ── helpers ─────────────────────────────────────────── */
  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(((index % total) + total) % total);
      setTimeout(() => setIsTransitioning(false), TRANSITION_MS);
    },
    [isTransitioning, total],
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  /* ── auto-play ──────────────────────────────────────── */
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!pausedRef.current) {
        setCurrent((c) => (c + 1) % total);
      }
    }, SLIDE_INTERVAL);
  }, [total]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  /* Reset timer when user manually navigates */
  const handleNav = useCallback(
    (idx: number) => {
      goTo(idx);
      startTimer();
    },
    [goTo, startTimer],
  );

  /* ── keyboard nav ───────────────────────────────────── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNav(current + 1);
      if (e.key === "ArrowLeft") handleNav(current - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, handleNav]);

  return (
    <section
      className="relative h-screen w-full overflow-hidden select-none"
      aria-label="Hero Banner"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      {/* ── slides ────────────────────────────────────── */}
      {products.map((product, i) => {
        const isActive = i === current;
        return (
          <div
            key={product.id}
            className={`absolute inset-0 ${product.heroBg}`}
            style={{
              opacity: isActive ? 1 : 0,
              transform: isActive ? "scale(1)" : "scale(1.04)",
              transition: `opacity ${TRANSITION_MS}ms cubic-bezier(.4,0,.2,1), transform ${TRANSITION_MS}ms cubic-bezier(.4,0,.2,1)`,
              zIndex: isActive ? 10 : 1,
              pointerEvents: isActive ? "auto" : "none",
            }}
          >
            <div className="relative flex h-full w-full flex-col items-center justify-center gap-6 px-6 pb-20 text-white sm:gap-8 sm:pb-8 lg:mx-auto lg:block lg:max-w-6xl lg:px-10 lg:pb-0">
              {/* Product image */}
              <div className="pointer-events-none flex justify-center lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-16">
                <Image
                  src={product.image}
                  alt={`${product.name} chips`}
                  width={588}
                  height={798}
                  priority={i === 0}
                  className={`
                    w-[320px] max-w-[88vw] sm:w-[340px] md:w-[380px] lg:w-[440px] xl:w-[600px]
                    drop-shadow-[0_25px_80px_rgba(0,0,0,0.55)]
                    transition-transform duration-700 ease-out
                    ${isActive ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
                  `}
                  style={{
                    transitionDelay: isActive ? "200ms" : "0ms",
                  }}
                />
              </div>

              {/* Text */}
              <div
                className={`
                  space-y-4 text-center text-[#1c1414]
                  lg:absolute lg:left-4 lg:top-1/2 lg:z-10 lg:-translate-y-1/2 lg:text-left xl:left-5
                  transition-all duration-700 ease-out
                  ${isActive ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0"}
                `}
                style={{
                  transitionDelay: isActive ? "100ms" : "0ms",
                }}
              >
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
                <Link href={`/product?flavor=${product.id}`}>
                  <button className="inline-flex items-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-[#20562B] shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:shadow-xl sm:px-8 sm:py-3 sm:text-base">
                    Know More
                  </button>
                </Link>
              </div>
            </div>
          </div>
        );
      })}

      {/* ── Left arrow ────────────────────────────────── */}
      <button
        onClick={() => handleNav(current - 1)}
        aria-label="Previous slide"
        className="
          group absolute left-3 top-1/2 z-30 -translate-y-1/2
          flex h-11 w-11 items-center justify-center
          rounded-full bg-white/20 backdrop-blur-md
          border border-white/30
          text-white shadow-lg
          transition-all duration-300
          hover:bg-white/40 hover:scale-110 hover:shadow-xl
          active:scale-95
          sm:left-5 sm:h-12 sm:w-12
          lg:left-8 lg:h-14 lg:w-14
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-0.5 sm:h-6 sm:w-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* ── Right arrow ───────────────────────────────── */}
      <button
        onClick={() => handleNav(current + 1)}
        aria-label="Next slide"
        className="
          group absolute right-3 top-1/2 z-30 -translate-y-1/2
          flex h-11 w-11 items-center justify-center
          rounded-full bg-white/20 backdrop-blur-md
          border border-white/30
          text-white shadow-lg
          transition-all duration-300
          hover:bg-white/40 hover:scale-110 hover:shadow-xl
          active:scale-95
          sm:right-5 sm:h-12 sm:w-12
          lg:right-8 lg:h-14 lg:w-14
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5 sm:h-6 sm:w-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* ── Dot indicators + progress bar ─────────────── */}
      <div className="absolute bottom-3 left-1/2 z-30 -translate-x-1/2 flex items-center gap-3 sm:bottom-10">
        {products.map((product, i) => (
          <button
            key={product.id}
            onClick={() => handleNav(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="group relative flex items-center justify-center"
          >
            {/* Outer ring for active */}
            <span
              className={`
                absolute h-6 w-6 rounded-full border-2 transition-all duration-500
                ${i === current ? "border-white/60 scale-100" : "border-transparent scale-0"}
              `}
            />
            {/* Inner dot */}
            <span
              className={`
                relative block rounded-full transition-all duration-500
                ${
                  i === current
                    ? "h-3 w-3 bg-white shadow-[0_0_12px_rgba(255,255,255,0.6)]"
                    : "h-2.5 w-2.5 bg-white/40 group-hover:bg-white/70"
                }
              `}
            />
          </button>
        ))}
      </div>

      {/* ── Thin progress bar at bottom ───────────────── */}
      <div className="absolute bottom-0 left-0 z-30 h-[3px] w-full bg-black/10">
        <div
          className="h-full bg-white/70 transition-all ease-linear"
          style={{
            width: `${((current + 1) / total) * 100}%`,
            transitionDuration: `${SLIDE_INTERVAL}ms`,
          }}
        />
      </div>
    </section>
  );
}