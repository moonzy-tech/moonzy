"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { IconShoppingCart, IconUser } from "@tabler/icons-react";
import {
  Navbar as ResizableNavbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { getCart, getCartCount, subscribeToCartChanges } from "@/lib/cart";
import { useAuth } from "@/lib/auth";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const { user, loading, logout } = useAuth();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Flavours",
      link: "/#products",
    },
    {
      name: "About Moonzy",
      link: "/#about",
    },
    {
      name: "Movie Night Picks",
      link: "/qr",
    },
  ];

  useEffect(() => {
    const sync = () => setCartCount(getCartCount(getCart()));
    sync();
    return subscribeToCartChanges(sync);
  }, []);

  return (
    <div className="relative w-full">
      <ResizableNavbar className="top-0">
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} /> 
          <div className="flex items-center gap-4">
            <NavbarButton
              as={Link}
              href="/cart"
              variant="primary"
              aria-label="Cart"
              className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-black/5 bg-white/95 p-0 text-[#1E3B2A] shadow-[0_12px_30px_rgba(0,0,0,0.12)] transition hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_18px_45px_rgba(0,0,0,0.18)]"
            >
              <span className="relative inline-flex items-center justify-center">
                <IconShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-[#1E3B2A] px-1 text-[0.65rem] leading-none text-white shadow-sm">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </span>
            </NavbarButton>
            {!loading && !user && (
              <NavbarButton as={Link} href="/auth" variant="primary">
                Login
              </NavbarButton>
            )}
            {!loading && user && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  aria-label="Open profile menu"
                >
                  {user.name ? (
                    <span className="text-sm font-semibold">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  ) : (
                    <IconUser className="h-4 w-4" />
                  )}
                </button>
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 rounded-xl border border-neutral-200 bg-white p-3 text-sm shadow-lg">
                    <div className="mb-2 border-b border-neutral-100 pb-2">
                      <p className="font-semibold text-neutral-900">
                        {user.name ?? "Moonzy customer"}
                      </p>
                      <p className="truncate text-xs text-neutral-500">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      href="/profile"
                      className="block rounded-md px-2 py-1.5 text-neutral-700 hover:bg-neutral-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      View profile
                    </Link>
                    <Link
                      href="/orders"
                      className="mt-1 block rounded-md px-2 py-1.5 text-neutral-700 hover:bg-neutral-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      Your orders
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        void logout();
                        setIsProfileMenuOpen(false);
                      }}
                      className="mt-1 flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-neutral-600 hover:bg-neutral-100"
                    >
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                as={Link}
                href="/cart"
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="relative flex w-full items-center justify-center rounded-2xl border border-black/5 bg-white/95 py-2 text-[#1E3B2A] shadow-[0_12px_30px_rgba(0,0,0,0.12)] transition hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_18px_45px_rgba(0,0,0,0.18)]"
                aria-label="Cart"
              >
                <span className="relative mx-auto inline-flex items-center justify-center">
                  <IconShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -right-1.5 -top-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-[#1E3B2A] px-1 text-[0.65rem] font-semibold leading-none text-white shadow-sm">
                      {cartCount > 9 ? "9+" : cartCount}
                    </span>
                  )}
                </span>
              </NavbarButton>
              {!loading && !user && (
                <NavbarButton
                  as={Link}
                  href="/auth"
                  onClick={() => setIsMobileMenuOpen(false)}
                  variant="primary"
                  className="w-full"
                >
                  Login
                </NavbarButton>
              )}
              {!loading && user && (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full rounded-md bg-neutral-100 px-4 py-2 text-center text-sm text-neutral-800"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/orders"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full rounded-md bg-neutral-100 px-4 py-2 text-center text-sm text-neutral-800"
                  >
                    Your orders
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      void logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full rounded-md bg-black px-4 py-2 text-sm text-white"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </ResizableNavbar>
    </div>
  );
}
