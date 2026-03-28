"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getCart, getCartCount, subscribeToCartChanges } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import CartDrawer from "./CartDrawer";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();

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
      const y = window.scrollY;
      setIsScrolled((prev) => {
        if (!prev && y > 72) return true;
        if (prev && y < 36) return false;
        return prev;
      });
    };

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

  useEffect(() => {
    const syncCart = () => setCartCount(getCartCount(getCart()));
    syncCart();
    return subscribeToCartChanges(syncCart);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileMenuOpen(false);
    setCartOpen(false);
  }, [pathname]);

  return (
    <>
    <nav
      className={`sticky top-2 z-50 bg-[#F5F5F0] rounded-[24px] md:rounded-[32px] mx-auto mt-3 md:mt-[13px] px-4 md:px-8 lg:px-12 h-auto md:h-[75px] py-4 md:py-0 flex flex-col md:flex-row md:items-center md:justify-between box-border transition-[width,max-width,box-shadow] duration-300 ease-out ${
        isScrolled
          ? "w-[calc(100%-2rem)] md:w-[calc(100%-8rem)] lg:w-[calc(100%-12rem)] max-w-[1100px] shadow-2xl"
          : "w-[calc(100%-2rem)] md:w-[calc(100%-3rem)] lg:w-[calc(100%-4rem)] max-w-[1397px] shadow-sm"
      }`}
    >
      {/* Logo — desktop, left */}
      <Link
        href="/"
        className="hidden shrink-0 items-center outline-none transition hover:opacity-85 focus-visible:ring-2 focus-visible:ring-black/20 md:flex md:mr-6 lg:mr-10"
        aria-label="Moonzy home"
      >
        <Image
          src="/logo.png"
          alt="Moonzy"
          width={128}
          height={40}
          className="h-8 w-auto md:h-9"
          priority
        />
      </Link>

      {/* ── Mobile top bar: Menu │ centered Logo │ Login + Cart ── */}
      <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-2 md:hidden">
        <div className="flex justify-self-start">
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex flex-col gap-1 p-2"
            aria-label="Toggle menu"
          >
            <div className={`h-0.5 w-6 bg-black transition-all duration-300 ${isMenuOpen ? "translate-y-1.5 rotate-45" : ""}`} />
            <div className={`h-0.5 w-6 bg-black transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`} />
            <div className={`h-0.5 w-6 bg-black transition-all duration-300 ${isMenuOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
          </button>
        </div>

        <Link
          href="/"
          className="justify-self-center flex shrink-0 items-center outline-none transition hover:opacity-85 focus-visible:ring-2 focus-visible:ring-black/20"
          aria-label="Moonzy home"
          onClick={() => setIsMenuOpen(false)}
        >
          <Image
            src="/logo.png"
            alt="Moonzy"
            width={120}
            height={36}
            className="h-7 w-auto"
            priority
          />
        </Link>

        {/* Login / Avatar + Cart */}
        <div className="flex justify-self-end items-center gap-2.5">
          {!loading && !user && (
            <button
              type="button"
              onClick={() => { router.push("/auth"); setIsMenuOpen(false); }}
              className="rounded-full border border-[#2B2D3A] bg-[#2B2D3A] px-5 py-1.5 text-[#F5F0E8] font-serif text-sm tracking-wide hover:bg-[#1E2235] transition-all duration-300"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Login
            </button>
          )}
          {!loading && user && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2B2D3A] text-[#F5F5F0] font-semibold hover:bg-[#1E2235] transition-all duration-300"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1rem" }}
                aria-label="Open profile menu"
              >
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </button>
              {isProfileMenuOpen && (
                <div className="absolute right-0 z-50 mt-3 w-56 rounded-[16px] border border-[rgba(200,195,185,0.2)] bg-[#2B2D3A] p-4 shadow-2xl">
                  <div className="mb-3 border-b border-[rgba(200,195,185,0.15)] pb-3">
                    <p className="font-semibold text-[#F5F5F0]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{user.name ?? "Moonzy customer"}</p>
                    <p className="truncate text-xs text-[rgba(200,195,185,0.7)] mt-1" style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif" }}>{user.email}</p>
                  </div>
                  <button type="button" onClick={() => { setIsProfileMenuOpen(false); router.push("/profile"); }} className="block w-full rounded-lg px-3 py-2 text-left text-[#F5F5F0] text-sm hover:bg-[#1E2235] transition-colors duration-200" style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif" }}>View profile</button>
                  <button type="button" onClick={() => { setIsProfileMenuOpen(false); router.push("/orders"); }} className="mt-1 block w-full rounded-lg px-3 py-2 text-left text-[#F5F5F0] text-sm hover:bg-[#1E2235] transition-colors duration-200" style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif" }}>Your orders</button>
                  <button type="button" onClick={() => { void logout(); setIsProfileMenuOpen(false); setIsMenuOpen(false); }} className="mt-1 flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[rgba(200,195,185,0.8)] text-sm hover:bg-[#1E2235] hover:text-[#F5F5F0] transition-colors duration-200" style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif" }}><span>Logout</span></button>
                </div>
              )}
            </div>
          )}
          <button
            type="button"
            onClick={() => {
              setIsMenuOpen(false);
              setCartOpen(true);
            }}
            className="relative flex items-center justify-center bg-[#2B2D3A] rounded-full w-9 h-9 hover:bg-[#1E2235] hover:scale-[1.04] transition-all duration-300 shrink-0"
            aria-label="Open cart"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full border border-white bg-[#F5F5F0] px-0.5 text-[10px] font-semibold text-[#141826]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ── Nav links (collapsible on mobile, always visible on desktop) ── */}
      <div
        className={`flex w-full flex-col items-center gap-3 overflow-hidden transition-all duration-500 ease-in-out sm:gap-4 md:mt-0 md:min-h-0 md:flex-1 md:flex-row md:justify-end md:gap-6 md:overflow-visible lg:gap-8 ${
          isMenuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0 md:max-h-none md:opacity-100"
        }`}
      >
        <button type="button" onClick={() => handleNavClick("home")} className="text-black font-serif text-sm md:text-base tracking-wide hover:opacity-70 transition-all duration-300 hover:scale-[1.03] whitespace-nowrap w-full md:w-auto text-center md:text-left py-2 md:py-0">HOME</button>
        <button type="button" onClick={() => { router.push("/about"); setIsMenuOpen(false); }} className="text-black font-serif text-sm md:text-base tracking-wide hover:opacity-70 transition-all duration-300 hover:scale-[1.03] whitespace-nowrap w-full md:w-auto text-center md:text-left py-2 md:py-0">ABOUT US</button>
        <button
          type="button"
          onClick={() => {
            router.push("/product");
            setIsMenuOpen(false);
          }}
          className="text-black font-serif text-sm md:text-base tracking-wide hover:opacity-70 transition-all duration-300 hover:scale-[1.03] whitespace-nowrap w-full md:w-auto text-center md:text-left py-2 md:py-0"
        >
          SHOP
        </button>
        <button
          type="button"
          onClick={() => {
            router.push("/qr");
            setIsMenuOpen(false);
          }}
          className="text-black font-serif text-sm md:text-base tracking-wide hover:opacity-70 transition-all duration-300 hover:scale-[1.03] whitespace-nowrap w-full md:w-auto text-center md:text-left py-2 md:py-0"
        >
          MOVIE NIGHT PICKS
        </button>
        <button type="button" onClick={() => { router.push("/blog"); setIsMenuOpen(false); }} className="text-black font-serif text-sm md:text-base tracking-wide hover:opacity-70 transition-all duration-300 hover:scale-[1.03] whitespace-nowrap w-full md:w-auto text-center md:text-left py-2 md:py-0">JOURNAL</button>
        <button type="button" onClick={() => { router.push("/contact"); setIsMenuOpen(false); }} className="text-black font-serif text-sm md:text-base tracking-wide hover:opacity-70 transition-all duration-300 hover:scale-[1.03] whitespace-nowrap w-full md:w-auto text-center md:text-left py-2 md:py-0">CONTACT US</button>

        {/* Desktop: Login/Avatar + Cart — separated by a subtle divider */}
        <div className="hidden md:flex items-center gap-3 ml-2 pl-6 border-l border-black/10">
          {!loading && !user && (
            <button
              type="button"
              onClick={() => router.push("/auth")}
              className="rounded-full border border-[#2B2D3A] bg-[#2B2D3A] px-6 py-2 text-[#F5F0E8] font-serif text-sm tracking-wide hover:bg-[#1E2235] transition-all duration-300 hover:scale-[1.02] whitespace-nowrap"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Login
            </button>
          )}
          {!loading && user && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2B2D3A] text-[#F5F5F0] font-semibold hover:bg-[#1E2235] transition-all duration-300 hover:scale-[1.02]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.125rem" }}
                aria-label="Open profile menu"
              >
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </button>
              {isProfileMenuOpen && (
                <div className="absolute right-0 z-50 mt-3 w-56 rounded-[16px] border border-[rgba(200,195,185,0.2)] bg-[#2B2D3A] p-4 shadow-2xl">
                  <div className="mb-3 border-b border-[rgba(200,195,185,0.15)] pb-3">
                    <p className="font-semibold text-[#F5F5F0]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{user.name ?? "Moonzy customer"}</p>
                    <p className="truncate text-xs text-[rgba(200,195,185,0.7)] mt-1" style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif" }}>{user.email}</p>
                  </div>
                  <button type="button" onClick={() => { setIsProfileMenuOpen(false); router.push("/profile"); }} className="block w-full rounded-lg px-3 py-2 text-left text-[#F5F5F0] text-sm hover:bg-[#1E2235] transition-colors duration-200" style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif" }}>View profile</button>
                  <button type="button" onClick={() => { setIsProfileMenuOpen(false); router.push("/orders"); }} className="mt-1 block w-full rounded-lg px-3 py-2 text-left text-[#F5F5F0] text-sm hover:bg-[#1E2235] transition-colors duration-200" style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif" }}>Your orders</button>
                  <button type="button" onClick={() => { void logout(); setIsProfileMenuOpen(false); setIsMenuOpen(false); }} className="mt-1 flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[rgba(200,195,185,0.8)] text-sm hover:bg-[#1E2235] hover:text-[#F5F5F0] transition-colors duration-200" style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif" }}><span>Logout</span></button>
                </div>
              )}
            </div>
          )}
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="relative flex items-center justify-center bg-[#2B2D3A] rounded-full w-10 h-10 hover:bg-[#1E2235] hover:scale-[1.04] transition-all duration-300 shrink-0"
            aria-label="Open cart"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full border border-white bg-[#F5F5F0] px-0.5 text-[10px] font-semibold text-[#141826]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
    <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}