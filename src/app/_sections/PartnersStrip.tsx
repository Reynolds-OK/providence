"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

export default function PartnersStrip() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section className="border-t border-b border-[#8C8578/15] bg-white px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="mx-auto max-w-5xl text-center"
      >
        {/* Label */}
        <motion.p
          variants={itemVariants}
          className="mb-3 font-[family-name:var(--font-inter)] text-xs font-semibold tracking-[0.22em] text-[#8B0000] uppercase"
        >
          Supported By
        </motion.p>

        {/* Headline */}
        <motion.h2
          variants={itemVariants}
          className="mb-10 font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#1c1c1e] md:text-4xl"
        >
          Backed by Institutions That Believe in African Agriculture.
        </motion.h2>

        {/* Partner logos (styled text boxes) */}
        <motion.div
          variants={itemVariants}
          className="mb-10 flex flex-wrap items-center justify-center gap-6"
        >
          {/* MCF FAST */}
          <div className="flex h-20 min-w-[160px] items-center justify-center rounded-xl border-2 border-[#1c1c1e]/10 bg-[#f5f4f2] px-8 py-4 transition-all duration-200 hover:border-[#8B0000]/30 hover:shadow-md">
            <span className="font-[family-name:var(--font-playfair)] text-xl font-bold tracking-tight text-[#1c1c1e]">
              MCF FAST
            </span>
          </div>

          {/* Dot separator (desktop) */}
          <div
            aria-hidden="true"
            className="hidden h-2 w-2 rounded-full bg-[#8B0000]/20 sm:block"
          />

          {/* ACE */}
          <div className="flex h-20 min-w-[160px] items-center justify-center rounded-xl border-2 border-[#1c1c1e]/10 bg-[#f5f4f2] px-8 py-4 transition-all duration-200 hover:border-[#8B0000]/30 hover:shadow-md">
            <span className="font-[family-name:var(--font-playfair)] text-xl font-bold tracking-tight text-[#1c1c1e]">
              ACE
            </span>
          </div>
        </motion.div>

        {/* Body copy */}
        <motion.p
          variants={itemVariants}
          className="mx-auto max-w-xl font-[family-name:var(--font-inter)] text-sm leading-relaxed text-[#7C7C7C]"
        >
          We are proud to have earned the confidence of leading agricultural development institutions. Their support validates our model, accelerates our capacity, and fuels our shared mission of transforming agriculture in Cameroon and across the continent.
        </motion.p>
      </motion.div>
    </section>
  );
}
