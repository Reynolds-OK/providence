"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import Image from "next/image";

/* ─── Card data ──────────────────────────────────────────────────────────── */

interface ServiceCard {
  image: string;
  title: string;
  description: string;
  href: string;
  accent: string;
}

const cards: ServiceCard[] = [
  {
    image: "/images/poultry.jpg",
    title: "Poultry Production",
    description:
      "Fresh eggs and quality broilers, supplied reliably to retailers and wholesalers across the region.",
    href: "/services/poultry",
    accent: "#8B0000",
  },
  {
    image: "/images/feed.jpg",
    title: "Custom Animal Feed",
    description:
      "Specifically formulated feed blends, engineered around your specific livestock and production goals.",
    href: "/services/feed",
    accent: "#A16207",
  },
  {
    image: "/images/advisory.png",
    title: "Agricultural Advisory",
    description:
      "Business guidance for farmers who are ready to move from survival to scale.",
    href: "/services/advisory",
    accent: "#166534",
  },
];

/* ─── Motion ─────────────────────────────────────────────────────────────── */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: EASE,
    },
  },
};

/* ─── Component ──────────────────────────────────────────────────────────── */

export default function ServicesStrip() {
  const { ref, inView } = useInView({
    threshold: 0.15,
    triggerOnce: true,
  });

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#faf8f5] px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
    >
      {/* Background blur accents */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-[#8B0000]/5 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#166534]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-4 font-[family-name:var(--font-inter)] text-xs font-semibold uppercase tracking-[0.24em] text-[#8B0000]">
            What We Do
          </p>

          <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold leading-tight text-[#1c1c1e] md:text-5xl">
            Agriculture Built On <br />
            <span className="text-[#8B0000]">
              Trust, Quality & Innovation
            </span>
          </h2>

          <p className="mt-6 font-[family-name:var(--font-inter)] text-base leading-relaxed text-[#6b7280] md:text-lg">
            From poultry production to livestock nutrition and agricultural
            consulting, Providence CIG delivers reliable solutions designed for
            growth and sustainability.
          </p>
        </div>

        {/* Cards */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid gap-8 lg:grid-cols-3"
        >
          {cards.map((card) => (
            <motion.div
              key={card.title}
              variants={cardVariants}
              className="group relative overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* Floating badge */}
                <div
                  className="absolute left-5 top-5 rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md"
                  style={{
                    backgroundColor: `${card.accent}CC`,
                  }}
                >
                  Service
                </div>

                {/* Title over image */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-white">
                    {card.title}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="relative p-8">
                {/* Accent line */}
                <div
                  className="mb-6 h-1 w-16 rounded-full"
                  style={{
                    backgroundColor: card.accent,
                  }}
                />

                <p className="font-[family-name:var(--font-inter)] text-sm leading-relaxed text-[#6b7280] md:text-[15px]">
                  {card.description}
                </p>

                {/* CTA */}
                <Link
                  href={card.href}
                  className="mt-8 inline-flex items-center gap-2 font-[family-name:var(--font-inter)] text-sm font-semibold transition-all duration-300"
                  style={{
                    color: card.accent,
                  }}
                >
                  Learn More
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>

                {/* Decorative corner */}
                <div
                  className="absolute bottom-0 right-0 h-24 w-24 translate-x-8 translate-y-8 rounded-full opacity-10 blur-2xl"
                  style={{
                    backgroundColor: card.accent,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}