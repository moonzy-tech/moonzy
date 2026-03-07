"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

/* Moonzy packet images that float across the section */
const FLOATING_PACKETS = [
  { src: "/Peri.png", left: 5, delay: 0, duration: 11, size: 200 },
  { src: "/Mint.png", left: 42, delay: 3.5, duration: 13, size: 240 },
  { src: "/Caramel.png", left: 78, delay: 1.8, duration: 12, size: 180 },
];

/* Countdown timer that shows time until the next hourly refresh */
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    function update() {
      const now = new Date();
      const mins = 59 - now.getMinutes();
      const secs = 59 - now.getSeconds();
      setTimeLeft(
        `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`,
      );
    }
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="font-mono tabular-nums tracking-wider">{timeLeft}</span>
  );
}

export default function MoviePicks() {
  return (
    <section
      id="movie-picks"
      className="relative overflow-hidden py-20 md:py-28"
      style={{
        background:
          "linear-gradient(165deg, #0B0E17 0%, #151929 35%, #1A1040 65%, #0B0E17 100%)",
      }}
    >
      {/* Starfield / grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(1.5px 1.5px at 20px 30px, rgba(255,255,255,0.5), transparent), " +
            "radial-gradient(1px 1px at 80px 120px, rgba(255,255,255,0.3), transparent), " +
            "radial-gradient(1.5px 1.5px at 160px 60px, rgba(255,255,255,0.4), transparent), " +
            "radial-gradient(1px 1px at 250px 200px, rgba(255,255,255,0.35), transparent)",
          backgroundSize: "300px 300px",
        }}
      />

      {/* Glow blobs */}
      <div className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-purple-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-16 bottom-1/4 h-64 w-64 rounded-full bg-amber-500/15 blur-[100px]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[80px]" />

      {/* Floating Moonzy packets */}
      {FLOATING_PACKETS.map((packet, i) => (
        <div
          key={i}
          aria-hidden
          className="pointer-events-none absolute select-none"
          style={{
            left: `${packet.left}%`,
            bottom: "-80px",
            opacity: 0,
            animation: `floatUp ${packet.duration}s ${packet.delay}s ease-in infinite`,
          }}
        >
          <Image
            src={packet.src}
            alt=""
            width={280}
            height={380}
            className="opacity-15 drop-shadow-[0_0_35px_rgba(168,85,247,0.3)]"
            style={{
              width: `${packet.size}px`,
              height: "auto",
            }}
          />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-10">
        <div className="flex flex-col items-center text-center">
          {/* Moonzy packet cluster — hero visual */}
          <div className="mb-8 flex items-end justify-center gap-3 sm:gap-5">
            {/* Left packet — tilted */}
            <div
              className="relative"
              style={{
                animation: "gentleFloat 4s ease-in-out infinite",
                animationDelay: "0.5s",
              }}
            >
              <Image
                src="/Mint.png"
                alt="Pudina Mint Chips"
                width={120}
                height={160}
                className="w-16 sm:w-20 md:w-24 -rotate-12 drop-shadow-[0_15px_40px_rgba(100,200,100,0.3)]"
              />
            </div>

            {/* Center packet — larger, straight */}
            <div
              className="relative -mb-2"
              style={{
                animation: "gentleFloat 4s ease-in-out infinite",
              }}
            >
              <Image
                src="/Peri.png"
                alt="Peri Peri Chips"
                width={150}
                height={200}
                className="w-24 sm:w-28 md:w-36 drop-shadow-[0_20px_50px_rgba(168,85,247,0.4)]"
              />
              {/* Glow ring behind center packet */}
              <div className="absolute -inset-4 -z-10 rounded-full bg-purple-500/15 blur-2xl" />
            </div>

            {/* Right packet — tilted opposite */}
            <div
              className="relative"
              style={{
                animation: "gentleFloat 4s ease-in-out infinite",
                animationDelay: "1s",
              }}
            >
              <Image
                src="/Caramel.png"
                alt="Caramel Chips"
                width={120}
                height={160}
                className="w-16 sm:w-20 md:w-24 rotate-12 drop-shadow-[0_15px_40px_rgba(200,150,50,0.3)]"
              />
            </div>
          </div>

          {/* Headline */}
          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Moonzy{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
              Movie Picks
            </span>
          </h2>

          {/* Sub-heading */}
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg md:text-xl">
            Every hour, we pick a fresh movie for you. <br className="hidden sm:block" />
            Grab your Moonzy, grab the remote — we handle the hard part.
          </p>

          {/* Countdown line */}
          <div className="mt-6 flex flex-col items-center gap-1.5">
            <p className="text-xs uppercase tracking-[0.2em] text-white/40 sm:text-sm">
              Next pick drops in
            </p>
            <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-2 text-2xl font-bold text-white backdrop-blur-sm sm:text-3xl">
              <CountdownTimer />
            </div>
          </div>

          {/* CTA button */}
          <Link href="/qr" className="group mt-10">
            <button className="relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-[0_10px_40px_rgba(168,85,247,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_50px_rgba(168,85,247,0.5)] active:scale-95 sm:px-10 sm:py-4 sm:text-base">
              {/* Shimmer sweep */}
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative z-10 flex items-center gap-2.5">
                See Today&apos;s Pick
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </span>
            </button>
          </Link>

          {/* Bottom flavor text */}
          <p className="mt-6 text-xs text-white/30 sm:text-sm">
            Curated recommendations · Refreshed every hour · Powered by TMDB
          </p>
        </div>
      </div>

      {/* Keyframes */}
      <style jsx>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.2;
          }
          90% {
            opacity: 0.2;
          }
          100% {
            transform: translateY(-700px) rotate(20deg);
            opacity: 0;
          }
        }
        @keyframes gentleFloat {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }
      `}</style>
    </section>
  );
}
