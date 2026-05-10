"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const hidden = { opacity: 0, y: 32 };
const visible = (delay: number) => ({
  opacity: 1,
  y: 0,
  transition: { duration: 0.75, ease: EASE, delay },
});

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/cocks.png"
        alt=""
        fill
        className="object-cover"
        priority
      />

      {/* Dark overlay */}
      <div aria-hidden="true" className="absolute inset-0 bg-black/60" />

      {/* Radial crimson glow behind content */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(139,0,0,0.35) 0%, transparent 70%)",
        }}
      />

      {/* crosshatch grid overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.025) 39px, rgba(255,255,255,0.025) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.025) 39px, rgba(255,255,255,0.025) 40px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <motion.p
          initial={hidden}
          animate={visible(0)}
          className="mb-6 font-[family-name:var(--font-inter)] text-xs tracking-[0.25em] text-[#ffffff] uppercase"
        >
          Cameroon &nbsp;|&nbsp; Agribusiness
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={hidden}
          animate={visible(0.15)}
          className="font-[family-name:var(--font-playfair)] text-5xl font-black leading-[1.05] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)] md:text-7xl xl:text-8xl"
        >
          From the Farm.
          <br />
          For the Future.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={hidden}
          animate={visible(0.3)}
          className="mx-auto mt-6 max-w-2xl font-[family-name:var(--font-inter)] text-lg leading-relaxed text-gray-300 md:text-xl"
        >
          We produce quality poultry, craft customized animal feed, and advise
          farmers who are ready to grow.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={hidden}
          animate={visible(0.45)}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-5"
        >
          <button
            onClick={() => {
              document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center justify-center rounded-lg bg-[#8B0000] px-8 py-3.5 font-[family-name:var(--font-inter)] text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-[#6e0000] hover:shadow-[0_0_24px_rgba(139,0,0,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Explore What We Do
          </button>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg border border-white/60 bg-white/5 px-8 py-3.5 font-[family-name:var(--font-inter)] text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:border-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Talk to Us
          </Link>
        </motion.div>

        {/* Animated scroll chevron */}
        <motion.button
          initial={hidden}
          animate={visible(0.6)}
          className="mt-16 cursor-pointer"
          aria-label="Scroll to services"
          onClick={() => {
            document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <div className="animate-chevron">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M6 10L14 18L22 10"
                stroke="#8B0000"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </motion.button>
      </div>
    </section>
  );
}
