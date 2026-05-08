"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "cookie-consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        setVisible(true);
      }
    } catch {
      // localStorage unavailable (e.g. private browsing with strict settings)
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      // ignore
    }
    setVisible(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "declined");
    } catch {
      // ignore
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cookie-banner"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent"
          className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 rounded-2xl border border-white/10 bg-[#1c1c1e] px-5 py-4 shadow-2xl sm:px-6 sm:py-5"
        >
          <p className="mb-4 text-sm leading-relaxed text-gray-300">
            We use cookies to improve your experience on our site. By
            continuing, you agree to our use of cookies.{" "}
            <a
              href="/privacy-policy"
              className="font-medium text-[#8B0000] underline underline-offset-2 hover:text-[#b00000] transition-colors"
            >
              Learn more
            </a>
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleAccept}
              className="rounded-lg bg-[#8B0000] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#6e0000] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1c1c1e]"
            >
              Accept All
            </button>
            <button
              onClick={handleDecline}
              className="rounded-lg border border-gray-600 px-5 py-2 text-sm font-semibold text-gray-300 transition-colors hover:border-gray-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1c1c1e]"
            >
              Decline
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
