"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import type { WhyChooseUsData } from "@/lib/types";

function RepeatIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M28 8 A14 14 0 1 1 8 22" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M24 4 L28 8 L24 12" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 32 A14 14 0 1 1 32 18" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 36 L12 32 L16 28" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SlidersIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <line x1="6" y1="12" x2="34" y2="12" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="6" y1="20" x2="34" y2="20" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="6" y1="28" x2="34" y2="28" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="14" cy="12" r="4" stroke="#ffffff" strokeWidth="1.5" fill="#1c1c1e" />
      <circle cx="24" cy="20" r="4" stroke="#ffffff" strokeWidth="1.5" fill="#1c1c1e" />
      <circle cx="18" cy="28" r="4" stroke="#ffffff" strokeWidth="1.5" fill="#1c1c1e" />
    </svg>
  );
}

function BookSproutIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M20 34 Q14 32 8 34 L8 12 Q14 10 20 12 Z" stroke="#ffffff" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M20 34 Q26 32 32 34 L32 12 Q26 10 20 12 Z" stroke="#ffffff" strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="20" y1="12" x2="20" y2="34" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 10 Q20 6 20 4" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 7 Q16 5 14 2 Q17 2 20 5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 6 Q24 4 26 1 Q23 1 20 4" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CommunityIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="20" cy="13" r="5" stroke="#ffffff" strokeWidth="1.5" />
      <path d="M12 30 Q12 22 20 22 Q28 22 28 30" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="9" cy="16" r="4" stroke="#ffffff" strokeWidth="1.5" />
      <path d="M2 32 Q2 25 9 25 Q13 25 15 27" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="31" cy="16" r="4" stroke="#ffffff" strokeWidth="1.5" />
      <path d="M38 32 Q38 25 31 25 Q27 25 25 27" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const ICONS: Record<string, React.ReactNode> = {
  "consistent-supply": <RepeatIcon />,
  "custom-first": <SlidersIcon />,
  "grounded-expertise": <BookSproutIcon />,
  "community-core": <CommunityIcon />,
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

function StatCounter({
  end, suffix, label, duration, trigger,
}: {
  end: number; suffix: string; label: string; duration: number; trigger: boolean;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <p className="font-[family-name:var(--font-playfair)] text-5xl font-black text-white md:text-6xl">
        {trigger ? <CountUp end={end} duration={duration} separator="," /> : "0"}
        <span className="text-[#ffffff]">{suffix}</span>
      </p>
      <p className="mt-2 max-w-[140px] font-[family-name:var(--font-inter)] text-sm leading-snug text-gray-400">
        {label}
      </p>
    </div>
  );
}

export default function WhyChooseUs({ data }: { data: WhyChooseUsData }) {
  const { ref: gridRef, inView: gridInView } = useInView({ threshold: 0.15, triggerOnce: true });
  const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section className="relative overflow-hidden bg-[#1c1c1e] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 30% 40%, rgba(139,0,0,0.18) 0%, transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-14">
          <p className="mb-3 font-[family-name:var(--font-inter)] text-xs font-semibold tracking-[0.22em] text-gray-400 uppercase">
            {data.eyebrow}
          </p>
          <h2 className="max-w-xl font-[family-name:var(--font-playfair)] text-3xl font-bold text-white md:text-5xl">
            {data.headline}
          </h2>
          <p className="mt-5 max-w-2xl font-[family-name:var(--font-inter)] text-base leading-relaxed text-gray-300">
            {data.body}
          </p>
        </div>

        <motion.div
          ref={gridRef}
          variants={containerVariants}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
          className="mb-20 grid gap-8 sm:grid-cols-2"
        >
          {data.differentiators.map((item) => (
            <motion.div key={item.id} variants={itemVariants} className="flex gap-5">
              <div className="mt-1 shrink-0">{ICONS[item.id] ?? <RepeatIcon />}</div>
              <div>
                <h3 className="mb-2 font-[family-name:var(--font-playfair)] text-lg font-bold text-white">
                  {item.title}
                </h3>
                <p className="font-[family-name:var(--font-inter)] text-sm leading-relaxed text-gray-300">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mb-14 h-px bg-gradient-to-r from-transparent via-[#8B0000]/40 to-transparent" />

        <div ref={statsRef} className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {data.stats.map((stat) => (
            <StatCounter key={stat.label} {...stat} trigger={statsInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
