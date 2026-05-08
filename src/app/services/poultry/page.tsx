"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/* ─── Animation helpers ──────────────────────────────────────────────────── */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const childFade = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

/* ─── Section wrapper ────────────────────────────────────────────────────── */

function AnimatedSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Data ───────────────────────────────────────────────────────────────── */

const eggPoints = [
  "Available in standard and large tray quantities",
  "Suitable for retail market stalls, supermarkets, restaurants, and wholesale distributors",
  "Consistent weekly production schedule for reliable restocking",
  "Fresh at every point, from production to delivery.",
  "Bulk order pricing available for high-volume buyers",
];

const broilerPoints = [
  "Market-weight birds available on a weekly cycle",
  "Live bird or dressed supply options available",
  "Bulk orders accommodated for wholesalers and large-volume retail buyers",
  "Consistent breed standard and quality",
  "Flexible supply agreements for repeat buyers",
];

const processSteps = [
  { num: "01", label: "Order", desc: "Place your order and confirm quantities" },
  { num: "02", label: "Produce", desc: "We fulfil from active production stock" },
  { num: "03", label: "Deliver", desc: "Scheduled delivery to your location" },
];

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function PoultryPage() {
  const { ref: eggsRef, inView: eggsInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: broilersRef, inView: broilersInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: ctaRef, inView: ctaInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: processRef, inView: processInView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
        {/* Background image */}
        <Image
          src="/images/eggs-tray.png"
          fill
          className="object-cover"
          alt="Eggs tray"
          priority
        />
        {/* Dark overlay */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black/60" />
        {/* Radial glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 65% at 50% 55%, rgba(139,0,0,0.38) 0%, transparent 70%)",
          }}
        />
        {/* Grid texture */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.02) 39px, rgba(255,255,255,0.02) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.02) 39px, rgba(255,255,255,0.02) 40px)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center px-4 py-28 text-center sm:px-6 lg:px-8">
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-5 font-[family-name:var(--font-inter)] text-xs font-semibold tracking-[0.25em] text-[#8B0000] uppercase"
          >
            POULTRY PRODUCTION
          </motion.p>

          <motion.h1
            custom={0.15}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="max-w-4xl font-[family-name:var(--font-playfair)] text-5xl font-bold leading-[1.08] tracking-tight text-white md:text-6xl"
          >
            Quality and Reliable Poultry Supply
          </motion.h1>

          <motion.p
            custom={0.3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mx-auto mt-6 max-w-3xl font-[family-name:var(--font-inter)] text-lg leading-relaxed text-gray-300"
          >
            We run a commercial poultry facility supplying fresh eggs and broilers to retailers,
            market traders, and wholesalers. Our standards are strict, and our supply is reliable.
          </motion.p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          EGGS SECTION
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <motion.div
            ref={eggsRef}
            variants={stagger}
            initial="hidden"
            animate={eggsInView ? "visible" : "hidden"}
            className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20"
          >
            {/* Text */}
            <motion.div variants={childFade}>
              <p className="mb-4 font-[family-name:var(--font-inter)] text-xs font-semibold tracking-[0.22em] text-[#7C7C7C] uppercase">
                Layer Production
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1c1c1e] md:text-4xl">
                Fresh Eggs at Commercial Scale
              </h2>
              <p className="mt-5 font-[family-name:var(--font-inter)] text-base leading-relaxed text-[#7C7C7C]">
                Our laying hens are raised in clean, well-managed environments and fed nutritionally
                balanced feed, which means the eggs we produce are consistently fresh, nutrient-rich,
                and market-ready. We supply in bulk to wholesalers and in flexible quantities to retail
                outlets, with delivery arrangements that keep your shelves stocked.
              </p>

              <ul className="mt-8 space-y-4">
                {eggPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle
                      size={20}
                      className="mt-0.5 flex-shrink-0 text-[#8B0000]"
                      aria-hidden="true"
                    />
                    <span className="font-[family-name:var(--font-inter)] text-sm leading-relaxed text-[#1a1a1a]">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Visual */}
            <motion.div variants={childFade}>
              <div className="relative rounded-2xl overflow-hidden h-80">
                <Image src="/images/eggs-tray.png" fill className="object-cover" alt="Fresh egg trays" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          BROILERS SECTION
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#f5f4f2] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <motion.div
            ref={broilersRef}
            variants={stagger}
            initial="hidden"
            animate={broilersInView ? "visible" : "hidden"}
            className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20"
          >
            {/* Visual — left on desktop */}
            <motion.div variants={childFade} className="order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden h-80">
                <Image src="/images/broilers-house.png" fill className="object-cover" alt="Broiler chicken house" />
              </div>
            </motion.div>

            {/* Text — right on desktop */}
            <motion.div variants={childFade} className="order-1 lg:order-2">
              <p className="mb-4 font-[family-name:var(--font-inter)] text-xs font-semibold tracking-[0.22em] text-[#7C7C7C] uppercase">
                Broiler Production
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1c1c1e] md:text-4xl">
                Broilers Ready for the Market
              </h2>
              <p className="mt-5 font-[family-name:var(--font-inter)] text-base leading-relaxed text-[#7C7C7C]">
                Our broilers are raised to optimal market weight under controlled, hygienic conditions.
                We supply live birds or can arrange dressing on request, depending on your market
                requirements. Whether you are a market trader, butcher, hotel supplier, or wholesale
                distributor, we can match your volume requirements and agree on a delivery schedule
                that works for your business.
              </p>

              <ul className="mt-8 space-y-4">
                {broilerPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle
                      size={20}
                      className="mt-0.5 flex-shrink-0 text-[#8B0000]"
                      aria-hidden="true"
                    />
                    <span className="font-[family-name:var(--font-inter)] text-sm leading-relaxed text-[#1a1a1a]">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CTA BLOCK
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#8B0000] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <motion.div
          ref={ctaRef}
          variants={stagger}
          initial="hidden"
          animate={ctaInView ? "visible" : "hidden"}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.h2
            variants={childFade}
            className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-white md:text-4xl"
          >
            Ready to Establish a Supply Relationship?
          </motion.h2>
          <motion.p
            variants={childFade}
            className="mx-auto mt-5 max-w-2xl font-[family-name:var(--font-inter)] text-base leading-relaxed text-white/80"
          >
            Whether you need a one-time order or a long-term supply arrangement, we are ready to
            talk. Fill in the form below or reach us directly on WhatsApp.
          </motion.p>
          <motion.div variants={childFade} className="mt-10">
            <Link
              href="/contact?type=poultry"
              className={cn(
                "inline-block rounded-full border-2 border-white px-10 py-4",
                "font-[family-name:var(--font-inter)] text-sm font-semibold tracking-wide text-white",
                "transition-all duration-300 hover:bg-white hover:text-[#8B0000]"
              )}
            >
              Enquire About Poultry Supply
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          PROCESS STRIP
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <motion.div
            ref={processRef}
            variants={stagger}
            initial="hidden"
            animate={processInView ? "visible" : "hidden"}
          >
            <motion.p
              variants={childFade}
              className="mb-10 text-center font-[family-name:var(--font-inter)] text-xs font-semibold tracking-[0.22em] text-[#7C7C7C] uppercase"
            >
              How It Works
            </motion.p>

            <div className="relative flex flex-col items-stretch gap-8 md:flex-row md:items-start md:gap-0">
              {processSteps.map((step, idx) => (
                <motion.div
                  key={step.num}
                  variants={childFade}
                  className="relative flex flex-1 flex-col items-center text-center"
                >
                  {/* Connecting line — shown between items on desktop */}
                  {idx < processSteps.length - 1 && (
                    <div
                      aria-hidden="true"
                      className="absolute left-1/2 top-7 hidden h-px w-full bg-gradient-to-r from-[#8B0000]/40 to-[#8B0000]/10 md:block"
                      style={{ transform: "translateX(0)" }}
                    />
                  )}

                  {/* Number bubble */}
                  <div className="relative z-10 mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#8B0000] bg-white">
                    <span className="font-[family-name:var(--font-playfair)] text-lg font-bold text-[#8B0000]">
                      {step.num}
                    </span>
                  </div>

                  <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-[#1c1c1e]">
                    {step.label}
                  </h3>
                  <p className="mt-2 max-w-[180px] font-[family-name:var(--font-inter)] text-sm leading-relaxed text-[#7C7C7C]">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
