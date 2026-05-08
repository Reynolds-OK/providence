"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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
    label: "Services",
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
      className="absolute left-1/2 top-full z-50 mt-3 w-56 -translate-x-1/2 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl ring-1 ring-black/5"
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
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState<string | null>(null);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Track scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
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

  /* Desktop dropdown handlers with delay for smooth UX */
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
      {/* ── Utility bar (desktop only) ── */}
      <AnimatePresence>
        {!scrolled && (
          <motion.div
            key="utility-bar"
            initial={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="hidden overflow-hidden bg-[#8B0000] lg:block"
          >
            <div className="mx-auto flex max-w-7xl items-center justify-center gap-6 px-4 py-1.5 text-xs text-white/90 sm:px-6 lg:px-8">
              <span>+237 XXX XXX XXX</span>
              <span aria-hidden="true" className="opacity-40">
                |
              </span>
              <a
                href="mailto:info@providencecig.com"
                className="hover:text-white transition-colors"
              >
                info@providencecig.com
              </a>
              <span aria-hidden="true" className="opacity-40">
                |
              </span>
              <span>Bambui, Cameroon</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main nav ── */}
      <header
        className={cn(
          "sticky top-0 z-40 w-full bg-white transition-shadow duration-300",
          scrolled ? "shadow-md" : "shadow-sm"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3 flex-shrink-0">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#8B0000] text-xs font-bold text-white transition group-hover:bg-[#6e0000]">
              PCIG
            </div>
            <span
              className="text-base font-bold leading-tight text-[#1a1a1a] transition-colors"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Providence CIG
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
            {navLinks.map((link) =>
              link.children ? (
                /* Dropdown trigger */
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
                    className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-[#1a1a1a] transition-colors hover:text-[#8B0000] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000]"
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
                  className="rounded-lg px-4 py-2 text-sm font-medium text-[#1a1a1a] transition-colors hover:text-[#8B0000] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000]"
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

          {/* Mobile: CTA + hamburger */}
          <div className="flex items-center gap-3 lg:hidden">
            <Link
              href="/contact"
              className="rounded-lg bg-[#8B0000] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#6e0000] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000]"
            >
              Get in Touch
            </Link>
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="rounded-lg p-2 text-[#1a1a1a] transition-colors hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000]"
            >
              <Menu size={22} strokeWidth={2} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile full-screen overlay menu ── */}
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
              aria-hidden="true"
            />

            {/* Slide-in panel */}
            <motion.div
              key="mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xs flex-col bg-white shadow-2xl lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              {/* Panel header */}
              <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8B0000] text-xs font-bold text-white">
                    PCIG
                  </div>
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
                  className="rounded-lg p-2 text-[#808080] transition hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000]"
                >
                  <X size={22} strokeWidth={2} />
                </button>
              </div>

              {/* Panel links */}
              <nav className="flex-1 overflow-y-auto px-4 py-6" aria-label="Mobile navigation">
                <ul className="space-y-1">
                  {navLinks.map((link) =>
                    link.children ? (
                      <li key={link.label}>
                        <button
                          onClick={() =>
                            setMobileServicesOpen((prev) => !prev)
                          }
                          aria-expanded={mobileServicesOpen}
                          className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-[#1a1a1a] transition hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000]"
                        >
                          {link.label}
                          <ChevronDown
                            size={16}
                            strokeWidth={2}
                            className={cn(
                              "text-[#808080] transition-transform duration-200",
                              mobileServicesOpen && "rotate-180"
                            )}
                          />
                        </button>
                        <AnimatePresence>
                          {mobileServicesOpen && (
                            <motion.ul
                              key="mobile-services"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.22, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              {link.children.map(({ label, href }) => (
                                <li key={href}>
                                  <Link
                                    href={href}
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center gap-3 rounded-xl py-2.5 pl-10 pr-4 text-sm text-[#808080] transition hover:bg-gray-50 hover:text-[#8B0000] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000]"
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
                          className="block rounded-xl px-4 py-3 text-sm font-medium text-[#1a1a1a] transition hover:bg-gray-50 hover:text-[#8B0000] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000]"
                        >
                          {link.label}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </nav>

              {/* Panel footer */}
              <div className="border-t border-gray-100 px-5 py-5">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full rounded-xl bg-[#8B0000] py-3 text-center text-sm font-semibold text-white transition hover:bg-[#6e0000] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000]"
                >
                  Get in Touch
                </Link>
                <address className="mt-4 space-y-1 not-italic text-xs text-[#808080]">
                  <p>+237 XXX XXX XXX</p>
                  <p>info@providencecig.com</p>
                  <p>Bambui, Cameroon</p>
                </address>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
