"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/237679105237?text=Hello%20Providence%20CIG%2C%20I%27d%20like%20to%20enquire%20about...";

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-[4.5rem] right-6 z-50 flex items-center gap-2">
      {/* Tooltip */}
      <motion.span
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 8 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="pointer-events-none select-none whitespace-nowrap rounded-lg bg-[#1c1c1e] px-3 py-1.5 text-xs font-medium text-white shadow-md"
        aria-hidden="true"
      >
        Chat with us on WhatsApp
      </motion.span>

      {/* Pulse ring */}
      <span className="relative">
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping" />
        <motion.a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
        >
          <MessageCircle size={24} strokeWidth={2} />
        </motion.a>
      </span>
    </div>
  );
}
