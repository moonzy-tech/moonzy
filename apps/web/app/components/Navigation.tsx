"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (!el) return;

    const navOffset = window.innerWidth < 768 ? 88 : 104;
    const top = el.getBoundingClientRect().top + window.scrollY - navOffset;

    window.scrollTo({
      top: Math.max(0, top),
      behavior: "smooth",
    });

    setIsMenuOpen(false);
  };

  const handleNavClick = (sectionId: string) => {
    if (pathname === "/") {
      scrollToSection(sectionId);
      return;
    }
    router.push(`/#${sectionId}`);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const syncScrolledState = () => {
      const shouldBeScrolled = window.scrollY > 50;
      setIsScrolled((prev) => (prev === shouldBeScrolled ? prev : shouldBeScrolled));
    };

    // Run immediately and again after hash-based scroll settles.
    syncScrolledState();
    const rafId = window.requestAnimationFrame(syncScrolledState);
    const timeoutId = window.setTimeout(syncScrolledState, 120);

    window.addEventListener("scroll", syncScrolledState, { passive: true });
    window.addEventListener("hashchange", syncScrolledState);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
      window.removeEventListener("scroll", syncScrolledState);
      window.removeEventListener("hashchange", syncScrolledState);
    };
  }, [pathname]);

  return (
    <nav className={`sticky top-2 z-50 bg-[#F5F5F0] rounded-[24px] md:rounded-[32px] mx-auto mt-3 md:mt-[13px] px-4 md:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between md:justify-end box-border transition-[width,max-width,height,padding,box-shadow] duration-300 ease-out ${
      isScrolled
        ? "w-[calc(100%-4rem)] md:w-[calc(100%-8rem)] lg:w-[calc(100%-12rem)] max-w-[1100px] h-auto md:h-[60px] py-2 md:py-0 shadow-2xl"
        : "w-[calc(100%-2rem)] md:w-[calc(100%-3rem)] lg:w-[calc(100%-4rem)] max-w-[1397px] h-auto md:h-[85px] py-4 md:py-0 shadow-sm"
    }`}>
      {/* Mobile: Hamburger + Cart */}
      <div className="w-full md:hidden flex items-center justify-between">
        {/* Hamburger Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex flex-col gap-1 p-2"
          aria-label="Toggle menu"
        >
          <div
            className={`w-6 h-0.5 bg-black transition-all duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <div
            className={`w-6 h-0.5 bg-black transition-all duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          />
          <div
            className={`w-6 h-0.5 bg-black transition-all duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </button>

        {/* Cart Icon - Always visible */}
        <button className="bg-[#2B2D3A] rounded-full p-2.5 hover:opacity-90 transition-opacity flex items-center justify-center flex-shrink-0">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        </button>
      </div>

      {/* Navigation Links */}
      <div
        className={`w-full md:w-auto flex flex-col md:flex-row items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 overflow-hidden md:overflow-visible transition-all duration-500 ease-in-out ${
          isMenuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0 md:max-h-none md:opacity-100 md:mt-0"
        }`}
      >
        <button
          type="button"
          onClick={() => handleNavClick("home")}
          className="text-black font-serif text-sm md:text-base tracking-wide hover:opacity-70 transition-all duration-300 hover:scale-110 whitespace-nowrap w-full md:w-auto text-center md:text-left py-2 md:py-0"
        >
          HOME
        </button>
        <button
          type="button"
          onClick={() => handleNavClick("shop")}
          className="text-black font-serif text-sm md:text-base tracking-wide hover:opacity-70 transition-all duration-300 hover:scale-110 whitespace-nowrap w-full md:w-auto text-center md:text-left py-2 md:py-0"
        >
          SHOP
        </button>
        <button
          type="button"
          onClick={() => handleNavClick("about")}
          className="text-black font-serif text-sm md:text-base tracking-wide hover:opacity-70 transition-all duration-300 hover:scale-110 whitespace-nowrap w-full md:w-auto text-center md:text-left py-2 md:py-0"
        >
          ABOUT US
        </button>
        <button
          type="button"
          onClick={() => handleNavClick("contact")}
          className="text-black font-serif text-sm md:text-base tracking-wide hover:opacity-70 transition-all duration-300 hover:scale-110 whitespace-nowrap w-full md:w-auto text-center md:text-left py-2 md:py-0"
        >
          CONTACT US
        </button>

        {/* Cart Icon - Desktop only */}
        <button className="hidden md:flex bg-[#2B2D3A] rounded-full p-2.5 md:p-3 hover:opacity-90 transition-opacity items-center justify-center ml-2 md:ml-4 flex-shrink-0">
          <svg
            width="18"
            height="18"
            className="md:w-5 md:h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
