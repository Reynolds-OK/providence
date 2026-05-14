"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import Image from "next/image";
import type { ServicesData } from "@/lib/types";

const CARD_ACCENTS: Record<string, string> = {
  "/services/poultry": "#8B0000",
  "/services/feed": "#A16207",
  "/services/advisory": "#166534",
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function ServicesStrip({ data }: { data: ServicesData }) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#faf8f5] px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
    >
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-[#8B0000]/5 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#166534]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-4 font-[family-name:var(--font-inter)] text-xs font-semibold uppercase tracking-[0.24em] text-[#8B0000]">
            {data.eyebrow}
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold leading-tight text-[#1c1c1e] md:text-5xl">
            {data.headline}
          </h2>
          <p className="mt-6 font-[family-name:var(--font-inter)] text-base leading-relaxed text-[#6b7280] md:text-lg">
            {data.subheadline}
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid gap-8 lg:grid-cols-3"
        >
          {data.cards.map((card) => {
            const accent = CARD_ACCENTS[card.href] ?? "#8B0000";
            return (
              <motion.div
                key={card.href}
                variants={cardVariants}
                className="group relative overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
              >
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div
                    className="absolute left-5 top-5 rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md"
                    style={{ backgroundColor: `${accent}CC` }}
                  >
                    {card.type}
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-white">
                      {card.title}
                    </h3>
                  </div>
                </div>

                <div className="relative p-8">
                  <div
                    className="mb-6 h-1 w-16 rounded-full"
                    style={{ backgroundColor: accent }}
                  />
                  <p className="font-[family-name:var(--font-inter)] text-sm leading-relaxed text-[#6b7280] md:text-[15px]">
                    {card.description}
                  </p>
                  <Link
                    href={card.href}
                    className="mt-8 inline-flex items-center gap-2 font-[family-name:var(--font-inter)] text-sm font-semibold transition-all duration-300"
                    style={{ color: accent }}
                  >
                    Learn More
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                  <div
                    className="absolute bottom-0 right-0 h-24 w-24 translate-x-8 translate-y-8 rounded-full opacity-10 blur-2xl"
                    style={{ backgroundColor: accent }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
