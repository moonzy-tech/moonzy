"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { IconShoppingCart } from "@tabler/icons-react";
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

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Flavours",
      link: "#products",
    },
    {
      name: "About Moonzy",
      link: "#about",
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
              className="rounded-lg border border-white/30 bg-white px-3 py-2 text-black hover:bg-white/80"
            >
              <span className="relative inline-flex">
                <IconShoppingCart className="h-4 w-4" />
                {cartCount > 0 && (
                  <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#1E3B2A] px-1 text-[0.65rem] font-bold leading-none text-white shadow-sm">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </span>
            </NavbarButton>
            <NavbarButton as={Link} href="/auth" variant="primary">
              Login
            </NavbarButton>
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
                className="w-full"
                aria-label="Cart"
              >
                <span className="relative mx-auto inline-flex">
                  <IconShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#1E3B2A] px-1 text-[0.65rem] font-bold leading-none text-white shadow-sm">
                      {cartCount > 9 ? "9+" : cartCount}
                    </span>
                  )}
                </span>
              </NavbarButton>
              <NavbarButton
                as={Link}
                href="/auth"
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Login
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </ResizableNavbar>
    </div>
  );
}
