"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

/* ─── Step data ──────────────────────────────────────────────────────────── */

const steps = [
  {
    number: "01",
    title: "Reach Out",
    description:
      "Contact us by phone, WhatsApp, or through our website. Tell us about your farm, your animals, or what you need — there is no complicated process to get started.",
  },
  {
    number: "02",
    title: "Consult",
    description:
      "We sit down with you — in person or remotely — to understand your situation: your flock size, feed challenges, budget, and goals. This is how we build the right plan.",
  },
  {
    number: "03",
    title: "Deliver",
    description:
      "Whether it is poultry birds, a batch of custom feed, or a field advisory visit, we execute with care and follow through. Quality and reliability are non-negotiable.",
  },
  {
    number: "04",
    title: "Grow Together",
    description:
      "We stay in your corner. Through check-ins, new formulations, and ongoing support, we grow alongside you — because your success is the foundation of everything we do.",
  },
];

/* ─── Animation variants ─────────────────────────────────────────────────── */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.16 } },
};

const stepVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

/* ─── Component ──────────────────────────────────────────────────────────── */

export default function HowWeWork() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section className="bg-[#faf9f7] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="mb-3 font-[family-name:var(--font-inter)] text-xs font-semibold tracking-[0.22em] text-[#8B0000] uppercase">
            How It Works
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1c1c1e] md:text-5xl">
            Simple Steps. Serious Results.
          </h2>
        </div>

        {/* Steps */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Desktop connector line */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-[2.75rem] hidden border-t-2 border-dashed border-[#8B0000]/30 md:block"
          />

          <div className="grid gap-8 md:grid-cols-4 md:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                variants={stepVariants}
                className="relative flex flex-col"
              >
                {/* Connector chevron for desktop (between cards, not after last) */}
                {index < steps.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="absolute -right-4 top-[2.1rem] z-10 hidden text-[#8B0000]/50 md:block"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 2 L12 8 L4 14"
                        stroke="#8B0000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.5"
                      />
                    </svg>
                  </div>
                )}

                {/* Step number bubble */}
                <div className="relative mb-5 flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center rounded-full border-2 border-[#8B0000]/20 bg-white shadow-sm">
                  {/* Large ghost number behind */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute font-[family-name:var(--font-playfair)] text-7xl font-black leading-none text-[#8B0000] opacity-[0.07] select-none"
                    style={{ top: "-0.6rem", left: "-0.3rem" }}
                  >
                    {step.number}
                  </span>
                  <span className="font-[family-name:var(--font-playfair)] text-lg font-black text-[#8B0000]">
                    {step.number}
                  </span>
                </div>

                {/* Text content */}
                <h3 className="mb-2 font-[family-name:var(--font-playfair)] text-xl font-bold text-[#1c1c1e]">
                  {step.title}
                </h3>
                <p className="font-[family-name:var(--font-inter)] text-sm leading-relaxed text-[#808080]">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
