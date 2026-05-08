"use client";

import { useState } from "react";
import Link from "next/link";
import { Globe, Share2, Link2, MessageCircle } from "lucide-react";

const services = [
  { label: "Poultry Production", href: "/services/poultry" },
  { label: "Custom Animal Feed", href: "/services/feed" },
  { label: "Agricultural Advisory", href: "/services/advisory" },
];

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Story", href: "/about#story" },
  { label: "Partners", href: "/about#partners" },
  { label: "Internship Programme", href: "/internship" },
  { label: "Contact", href: "/contact" },
];

const socials = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    Icon: Globe,
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    Icon: Share2,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    Icon: Link2,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/237XXXXXXXXX",
    Icon: MessageCircle,
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // In production, wire up to a mailing list provider here
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="bg-[#1c1c1e] text-white">
      {/* Newsletter strip */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-gray-400">
                Newsletter
              </p>
              <p className="mt-1 text-base font-medium text-white">
                Stay updated with our latest news and insights.
              </p>
            </div>
            {subscribed ? (
              <p className="text-sm font-medium text-[#8B0000]">
                Thank you for subscribing!
              </p>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex w-full max-w-md gap-2"
              >
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="min-w-0 flex-1 rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000]"
                />
                <button
                  type="submit"
                  className="flex-shrink-0 rounded-lg bg-[#8B0000] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#6e0000] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1c1c1e]"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 — Brand */}
          <div>
            {/* Logo placeholder */}
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#8B0000] text-sm font-bold text-white transition group-hover:bg-[#6e0000]">
                PCIG
              </div>
              <span
                className="text-base font-bold leading-tight text-white"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Providence CIG
              </span>
            </Link>
            <p
              className="mt-4 text-sm font-semibold italic leading-relaxed text-[#8C8578]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Cultivating Growth. Nourishing Lives. Uniting Communities.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              Providence Common Initiative Group is an agribusiness based in
              Bambui, Cameroon, dedicated to sustainable farming, quality feed
              production, and empowering local agricultural entrepreneurs.
            </p>
          </div>

          {/* Column 2 — Services */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-gray-400">
              Services
            </h3>
            <ul className="space-y-3">
              {services.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group flex items-center gap-2 text-sm text-gray-300 transition hover:text-white"
                  >
                    <span className="h-px w-4 bg-[#8B0000] transition-all group-hover:w-6" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Quick Links */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-gray-400">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group flex items-center gap-2 text-sm text-gray-300 transition hover:text-white"
                  >
                    <span className="h-px w-4 bg-[#8B0000] transition-all group-hover:w-6" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact + Social */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-gray-400">
              Contact Us
            </h3>
            <address className="not-italic space-y-2 text-sm text-gray-400">
              <p>
                <span className="text-gray-300">Phone:</span>{" "}
                <a
                  href="tel:+237XXXXXXXXX"
                  className="hover:text-white transition-colors"
                >
                  +237 XXX XXX XXX
                </a>
              </p>
              <p>
                <span className="text-gray-300">Email:</span>{" "}
                <a
                  href="mailto:info@providencecig.com"
                  className="hover:text-white transition-colors"
                >
                  info@providencecig.com
                </a>
              </p>
              <p>
                <span className="text-gray-300">Location:</span> Bambui,
                North-West Region, Cameroon
              </p>
            </address>

            {/* Social icons */}
            <div className="mt-6 flex items-center gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-gray-400 transition hover:border-[#8B0000] hover:bg-[#8B0000] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000]"
                >
                  <Icon size={16} strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-gray-500 sm:flex-row sm:px-6 lg:px-8">
          <p>
            &copy; {new Date().getFullYear()} Providence Common Initiative
            Group. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy-policy"
              className="hover:text-gray-300 transition-colors"
            >
              Privacy Policy
            </Link>
            <span aria-hidden="true" className="text-gray-700">
              |
            </span>
            <Link
              href="/terms"
              className="hover:text-gray-300 transition-colors"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
