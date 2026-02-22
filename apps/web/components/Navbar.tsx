"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
] as const;

const linkClass =
  "text-[#1C2B40] text-base transition-opacity hover:opacity-80 py-2 whitespace-nowrap";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full py-4 md:py-5">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 sm:px-6">
        {/* Desktop: white pill with links */}
        <div className="hidden w-full max-w-2xl md:flex md:mx-auto md:justify-center">
          <div className="flex w-full items-center justify-between rounded-full bg-white px-8 py-3 shadow-lg">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} className={linkClass}>
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile: pill with menu button */}
        <div className="flex w-full items-center justify-center md:hidden">
          <div className="flex w-full max-w-sm items-center justify-between rounded-full bg-white px-6 py-3 shadow-lg">
            <Link href="/" className={linkClass}>
              Home
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="flex h-8 w-8 flex-col items-center justify-center gap-1 rounded-full text-[#1C2B40] transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[#1C2B40]/30"
            >
              <span
                className={`h-0.5 w-5 bg-current transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
              />
              <span
                className={`h-0.5 w-5 bg-current transition-opacity ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`h-0.5 w-5 bg-current transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu panel */}
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-200 ease-out md:hidden ${menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="mx-auto max-w-sm px-4 pb-4 pt-2">
          <div className="rounded-2xl bg-white px-6 py-4 shadow-lg">
            <div className="flex flex-col gap-1">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-lg px-4 py-3 ${linkClass} active:opacity-80`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
