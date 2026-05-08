"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

/* ─── SVG Icons ──────────────────────────────────────────────────────────── */

function PoultryIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Egg */}
      <ellipse
        cx="24"
        cy="22"
        rx="9"
        ry="11"
        stroke="#8B0000"
        strokeWidth="1.5"
      />
      {/* Hen body */}
      <path
        d="M14 34 Q10 30 12 26 Q14 22 18 24"
        stroke="#8B0000"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Hen tail */}
      <path
        d="M34 34 Q38 28 36 24 Q34 22 30 24"
        stroke="#8B0000"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Hen head */}
      <circle cx="24" cy="11" r="4" stroke="#8B0000" strokeWidth="1.5" />
      {/* Comb */}
      <path
        d="M22 7 L21 4 M24 7 L24 3 M26 7 L27 4"
        stroke="#8B0000"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Beak */}
      <path
        d="M24 13 L27 14"
        stroke="#8B0000"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Base ground line */}
      <path
        d="M10 40 L38 40"
        stroke="#8B0000"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.3"
      />
      {/* Legs */}
      <path
        d="M20 33 L18 38 M20 33 L22 38 M28 33 L26 38 M28 33 L30 38"
        stroke="#8B0000"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FeedIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Bag outline */}
      <path
        d="M14 16 L14 38 Q14 40 16 40 L32 40 Q34 40 34 38 L34 16 Z"
        stroke="#8B0000"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Bag top fold */}
      <path
        d="M12 16 Q12 12 16 12 L32 12 Q36 12 36 16 L36 18 L12 18 Z"
        stroke="#8B0000"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Tie string */}
      <path
        d="M20 12 Q24 8 28 12"
        stroke="#8B0000"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Measurement marks */}
      <path
        d="M17 22 L31 22"
        stroke="#8B0000"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M17 27 L28 27"
        stroke="#8B0000"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M17 32 L31 32"
        stroke="#8B0000"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Small tick marks */}
      <path
        d="M22 22 L22 24 M27 22 L27 24"
        stroke="#8B0000"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M22 30 L22 32 M27 30 L27 32"
        stroke="#8B0000"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AdvisoryIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Chart line upward */}
      <polyline
        points="8,36 18,24 26,28 38,12"
        stroke="#8B0000"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Chart arrow tip */}
      <path
        d="M34 10 L38 12 L36 16"
        stroke="#8B0000"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Axis lines */}
      <path
        d="M8 12 L8 38 L40 38"
        stroke="#8B0000"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.4"
      />
      {/* Handshake */}
      <path
        d="M14 44 Q17 40 20 40 L24 40 Q27 40 28 42"
        stroke="#8B0000"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M34 44 Q31 40 28 40 L24 40"
        stroke="#8B0000"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Clasped hands center */}
      <circle cx="24" cy="41" r="2" stroke="#8B0000" strokeWidth="1.5" />
    </svg>
  );
}

/* ─── Card data ──────────────────────────────────────────────────────────── */

interface ServiceCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

const cards: ServiceCard[] = [
  {
    icon: <PoultryIcon />,
    title: "Poultry Production",
    description:
      "Fresh eggs and quality broilers, supplied reliably to retailers and wholesalers across the region.",
    href: "/services/poultry",
  },
  {
    icon: <FeedIcon />,
    title: "Custom Animal Feed",
    description:
      "Specifically formulated feed blends, engineered around your specific livestock and production goals.",
    href: "/services/feed",
  },
  {
    icon: <AdvisoryIcon />,
    title: "Agricultural Advisory",
    description:
      "Business guidance for farmers who are ready to move from survival to scale.",
    href: "/services/advisory",
  },
];

/* ─── Component ──────────────────────────────────────────────────────────── */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE },
  },
};

export default function ServicesStrip() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section
      id="services"
      className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-14 text-center">
          <p className="mb-3 font-[family-name:var(--font-inter)] text-xs font-semibold tracking-[0.22em] text-[#8B0000] uppercase">
            What We Do
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1c1c1e] md:text-5xl">
            Three Pillars. One Purpose.
          </h2>
        </div>

        {/* Cards */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid gap-6 md:grid-cols-3"
        >
          {cards.map((card) => (
            <motion.div
              key={card.title}
              variants={cardVariants}
              className="group flex flex-col rounded-2xl border border-gray-100 border-l-4 border-l-[#8B0000] bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-5">{card.icon}</div>
              <h3 className="mb-3 font-[family-name:var(--font-playfair)] text-xl font-bold text-[#1c1c1e]">
                {card.title}
              </h3>
              <p className="flex-1 font-[family-name:var(--font-inter)] text-sm leading-relaxed text-[#808080]">
                {card.description}
              </p>
              <Link
                href={card.href}
                className="mt-6 inline-flex items-center font-[family-name:var(--font-inter)] text-sm font-semibold text-[#8B0000] transition-all duration-200 hover:gap-2 focus:outline-none focus-visible:underline"
              >
                Learn More{" "}
                <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
