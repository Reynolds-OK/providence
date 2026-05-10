"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Types ─────────────────────────────────────────────────────────────── */

interface NavLink {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
}

/* ─── Data ───────────────────────────────────────────────────────────────── */

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Products & Services",
    children: [
      { label: "Poultry Production", href: "/services/poultry" },
      { label: "Custom Animal Feed", href: "/services/feed" },
      { label: "Agricultural Advisory", href: "/services/advisory" },
    ],
  },
  { label: "Internship", href: "/internship" },
  { label: "Contact", href: "/contact" },
];

/* ─── Desktop dropdown ───────────────────────────────────────────────────── */

function DesktopDropdown({
  items,
}: {
  items: { label: string; href: string }[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="absolute left-1/2 top-full z-50 mt-3 w-56 -translate-x-1/2 overflow-hidden rounded-xl border border-[#8C8578/15] bg-white shadow-xl ring-1 ring-black/5"
    >
      {items.map(({ label, href }) => (
        <Link
          key={href}
          href={href}
          className="block px-5 py-3 text-sm font-medium text-[#1a1a1a] transition-colors hover:bg-[#8B0000]/5 hover:text-[#8B0000] focus:outline-none focus-visible:bg-[#8B0000]/5 focus-visible:text-[#8B0000]"
        >
          {label}
        </Link>
      ))}
    </motion.div>
  );
}

/* ─── Main Navbar ────────────────────────────────────────────────────────── */

export default function Navbar() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState<string | null>(null);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Track scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* Desktop dropdown handlers */
  const openDropdown = useCallback((label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setDesktopDropdownOpen(label);
  }, []);

  const closeDropdown = useCallback(() => {
    dropdownTimeout.current = setTimeout(() => {
      setDesktopDropdownOpen(null);
    }, 120);
  }, []);

  const keepDropdown = useCallback(() => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
  }, []);

  return (
    <>
      {/* ── Main nav ── */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3 flex-shrink-0"
          >
            <Image
              src="/images/logo.png"
              alt="Providence CIG Logo"
              width={56}
              height={56}
            />

            <span
              className={cn(
                "text-base font-bold leading-tight transition-colors duration-300",
                scrolled ? "text-[#1a1a1a]" : "text-white"
              )}
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Providence CIG
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Main navigation"
          >
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => openDropdown(link.label)}
                  onMouseLeave={closeDropdown}
                >
                  <button
                    onFocus={() => openDropdown(link.label)}
                    onBlur={closeDropdown}
                    aria-haspopup="true"
                    aria-expanded={desktopDropdownOpen === link.label}
                    className={cn(
                      "flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000]",
                      scrolled
                        ? "text-[#1a1a1a] hover:text-[#8B0000]"
                        : "text-white hover:text-[#f5d0d0]"
                    )}
                  >
                    {link.label}

                    <ChevronDown
                      size={14}
                      strokeWidth={2}
                      className={cn(
                        "transition-transform duration-200",
                        desktopDropdownOpen === link.label && "rotate-180"
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {desktopDropdownOpen === link.label && (
                      <div
                        onMouseEnter={keepDropdown}
                        onMouseLeave={closeDropdown}
                      >
                        <DesktopDropdown items={link.children} />
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href!}
                  className={cn(
                    "rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000]",
                    pathname === link.href
                      ? "text-[#8B0000]"
                      : scrolled
                      ? "text-[#1a1a1a] hover:text-[#8B0000]"
                      : "text-white hover:text-[#f5d0d0]"
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Link
              href="/contact"
              className="rounded-lg bg-[#8B0000] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6e0000] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000] focus-visible:ring-offset-2"
            >
              Get in Touch
            </Link>
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-3 lg:hidden">
            <Link
              href="/contact"
              className="rounded-lg bg-[#8B0000] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#6e0000]"
            >
              Get in Touch
            </Link>

            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className={cn(
                "rounded-lg p-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000]",
                scrolled
                  ? "text-[#1a1a1a] hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              )}
            >
              <Menu size={22} strokeWidth={2} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-50 bg-black/50 lg:hidden"
            />

            {/* Slide Panel */}
            <motion.div
              key="mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xs flex-col bg-white shadow-2xl lg:hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#8C8578/15] px-5 py-4">
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3"
                >
                  <Image
                    src="/images/logo.png"
                    alt="Providence CIG Logo"
                    width={56}
                    height={56}
                  />

                  <span
                    className="text-sm font-bold text-[#1a1a1a]"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    Providence CIG
                  </span>
                </Link>

                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="rounded-lg p-2 text-[#7C7C7C] transition hover:bg-gray-100"
                >
                  <X size={22} strokeWidth={2} />
                </button>
              </div>

              {/* Nav */}
              <nav className="flex-1 overflow-y-auto px-4 py-6">
                <ul className="space-y-1">
                  {navLinks.map((link) =>
                    link.children ? (
                      <li key={link.label}>
                        <button
                          onClick={() =>
                            setMobileServicesOpen((prev) => !prev)
                          }
                          className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-[#1a1a1a] transition hover:bg-[#f5f4f2]"
                        >
                          {link.label}

                          <ChevronDown
                            size={16}
                            strokeWidth={2}
                            className={cn(
                              "transition-transform duration-200",
                              mobileServicesOpen && "rotate-180"
                            )}
                          />
                        </button>

                        <AnimatePresence>
                          {mobileServicesOpen && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{
                                duration: 0.22,
                                ease: "easeInOut",
                              }}
                              className="overflow-hidden"
                            >
                              {link.children.map(({ label, href }) => (
                                <li key={href}>
                                  <Link
                                    href={href}
                                    onClick={() => setMobileOpen(false)}
                                    className={cn(
                                      "flex items-center gap-3 rounded-xl py-2.5 pl-10 pr-4 text-sm transition",
                                      pathname === href
                                        ? "text-[#8B0000]"
                                        : "text-[#7C7C7C] hover:text-[#8B0000]"
                                    )}
                                  >
                                    <span className="h-px w-3 bg-[#8B0000]" />
                                    {label}
                                  </Link>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </li>
                    ) : (
                      <li key={link.label}>
                        <Link
                          href={link.href!}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "block rounded-xl px-4 py-3 text-sm font-medium transition",
                            pathname === link.href
                              ? "text-[#8B0000]"
                              : "text-[#1a1a1a] hover:text-[#8B0000]"
                          )}
                        >
                          {link.label}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
