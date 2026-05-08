"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
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

/* ─── Advisory Icons ─────────────────────────────────────────────────────── */

function BusinessPlanningIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Document */}
      <rect x="6" y="4" width="20" height="26" rx="2" stroke="#8B0000" strokeWidth="1.75" />
      <path d="M10 10 L22 10" stroke="#8B0000" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 14 L22 14" stroke="#8B0000" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 18 L18 18" stroke="#8B0000" strokeWidth="1.5" strokeLinecap="round" />
      {/* Bar chart */}
      <rect x="22" y="24" width="4" height="10" rx="1" fill="#8B0000" fillOpacity="0.2" stroke="#8B0000" strokeWidth="1.4" />
      <rect x="28" y="19" width="4" height="15" rx="1" fill="#8B0000" fillOpacity="0.2" stroke="#8B0000" strokeWidth="1.4" />
      <rect x="34" y="22" width="4" height="12" rx="1" fill="#8B0000" fillOpacity="0.2" stroke="#8B0000" strokeWidth="1.4" />
    </svg>
  );
}

function FinancialManagementIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Balance beam */}
      <line x1="20" y1="8" x2="20" y2="32" stroke="#8B0000" strokeWidth="1.75" strokeLinecap="round" />
      <line x1="8" y1="10" x2="32" y2="10" stroke="#8B0000" strokeWidth="1.75" strokeLinecap="round" />
      {/* Left pan */}
      <path d="M8 10 L5 20 Q8 24 11 20 Z" stroke="#8B0000" strokeWidth="1.6" strokeLinejoin="round" fill="#8B0000" fillOpacity="0.08" />
      {/* Right pan (lower = heavier) */}
      <path d="M32 10 L29 22 Q32 26 35 22 Z" stroke="#8B0000" strokeWidth="1.6" strokeLinejoin="round" fill="#8B0000" fillOpacity="0.08" />
      {/* Base */}
      <path d="M14 32 L26 32" stroke="#8B0000" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M17 32 L20 36 L23 32" stroke="#8B0000" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function MarketAccessIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Central node */}
      <circle cx="20" cy="20" r="4" stroke="#8B0000" strokeWidth="1.75" fill="#8B0000" fillOpacity="0.1" />
      {/* Outer nodes */}
      <circle cx="8" cy="10" r="3" stroke="#8B0000" strokeWidth="1.5" />
      <circle cx="32" cy="10" r="3" stroke="#8B0000" strokeWidth="1.5" />
      <circle cx="8" cy="30" r="3" stroke="#8B0000" strokeWidth="1.5" />
      <circle cx="32" cy="30" r="3" stroke="#8B0000" strokeWidth="1.5" />
      <circle cx="20" cy="6" r="3" stroke="#8B0000" strokeWidth="1.5" />
      {/* Connection lines */}
      <line x1="20" y1="16" x2="10" y2="12" stroke="#8B0000" strokeWidth="1.3" />
      <line x1="20" y1="16" x2="30" y2="12" stroke="#8B0000" strokeWidth="1.3" />
      <line x1="20" y1="24" x2="10" y2="28" stroke="#8B0000" strokeWidth="1.3" />
      <line x1="20" y1="24" x2="30" y2="28" stroke="#8B0000" strokeWidth="1.3" />
      <line x1="20" y1="16" x2="20" y2="9" stroke="#8B0000" strokeWidth="1.3" />
    </svg>
  );
}

function OperationalEfficiencyIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Large gear */}
      <circle cx="16" cy="18" r="7" stroke="#8B0000" strokeWidth="1.75" />
      <circle cx="16" cy="18" r="3" fill="#8B0000" fillOpacity="0.12" stroke="#8B0000" strokeWidth="1.3" />
      <path d="M16 8 L16 10 M16 26 L16 28 M6 18 L8 18 M24 18 L26 18 M8.9 10.9 L10.4 12.4 M21.6 23.6 L23.1 25.1 M23.1 10.9 L21.6 12.4 M10.4 23.6 L8.9 25.1"
        stroke="#8B0000" strokeWidth="1.6" strokeLinecap="round" />
      {/* Small gear */}
      <circle cx="28" cy="28" r="5" stroke="#8B0000" strokeWidth="1.6" />
      <circle cx="28" cy="28" r="2" fill="#8B0000" fillOpacity="0.12" stroke="#8B0000" strokeWidth="1.2" />
      <path d="M28 21 L28 22.5 M28 33.5 L28 35 M21 28 L22.5 28 M33.5 28 L35 28 M23.1 23.1 L24.2 24.2 M31.8 31.8 L32.9 32.9 M32.9 23.1 L31.8 24.2 M24.2 31.8 L23.1 32.9"
        stroke="#8B0000" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function GrantReadinessIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Building columns */}
      <rect x="6" y="30" width="28" height="4" rx="1" stroke="#8B0000" strokeWidth="1.75" />
      <rect x="4" y="34" width="32" height="3" rx="1" stroke="#8B0000" strokeWidth="1.75" />
      {/* Roof */}
      <path d="M20 8 L34 18 L6 18 Z" stroke="#8B0000" strokeWidth="1.75" strokeLinejoin="round" fill="#8B0000" fillOpacity="0.07" />
      {/* Columns */}
      <rect x="10" y="18" width="3" height="12" stroke="#8B0000" strokeWidth="1.5" />
      <rect x="18.5" y="18" width="3" height="12" stroke="#8B0000" strokeWidth="1.5" />
      <rect x="27" y="18" width="3" height="12" stroke="#8B0000" strokeWidth="1.5" />
    </svg>
  );
}

function ScalingStrategyIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Rocket body */}
      <path d="M20 6 C20 6 28 12 28 22 L20 30 L12 22 C12 12 20 6 20 6 Z"
        stroke="#8B0000" strokeWidth="1.75" strokeLinejoin="round" fill="#8B0000" fillOpacity="0.07" />
      {/* Window */}
      <circle cx="20" cy="18" r="3.5" stroke="#8B0000" strokeWidth="1.5" />
      {/* Fins */}
      <path d="M12 22 L7 28 L12 26" stroke="#8B0000" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M28 22 L33 28 L28 26" stroke="#8B0000" strokeWidth="1.6" strokeLinejoin="round" />
      {/* Flame */}
      <path d="M17 30 Q20 36 23 30" stroke="#8B0000" strokeWidth="1.5" strokeLinecap="round" fill="#8B0000" fillOpacity="0.08" />
      <path d="M18.5 30 Q20 34 21.5 30" stroke="#8B0000" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/* ─── Data ───────────────────────────────────────────────────────────────── */

const advisoryAreas = [
  {
    Icon: BusinessPlanningIcon,
    title: "Business Planning",
    desc: "We help you build a proper, bankable business plan, realistic, structured, and tailored to your farm's current stage and future ambitions. One that you can take to a bank, an investor, or a grant programme with genuine confidence.",
  },
  {
    Icon: FinancialManagementIcon,
    title: "Financial Management",
    desc: "Understand your true cost of production, your profit margins, your seasonal cash flow cycles, and how to make sound financial decisions across your farming year, not just during harvest.",
  },
  {
    Icon: MarketAccessIcon,
    title: "Market Access",
    desc: "Identify the right buyers for your produce, negotiate better prices, and build supply relationships that give your farm stable, predictable revenue instead of one-off sales with no security.",
  },
  {
    Icon: OperationalEfficiencyIcon,
    title: "Operational Efficiency",
    desc: "Identify where you are losing time, money, or yield in your current operations and implement practical improvements that get more output from the same inputs you are already working with.",
  },
  {
    Icon: GrantReadinessIcon,
    title: "Grant & Loan Readiness",
    desc: "Prepare your business to access agricultural financing, government grants, development fund support, and institutional programmes that you may currently be invisible to, simply because your paperwork is not in order.",
  },
  {
    Icon: ScalingStrategyIcon,
    title: "Scaling Strategy",
    desc: "Ready to expand? We help you plan a growth strategy that does not break what you have already built, covering land, labour, capital, supply chain, and market capacity in a way that is realistic and sequenced properly.",
  },
];

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function AdvisoryPage() {
  const { ref: advisoryRef, inView: advisoryInView } = useInView({ threshold: 0.08, triggerOnce: true });
  const { ref: forRef, inView: forInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: storyRef, inView: storyInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: ctaRef, inView: ctaInView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
        {/* Background image */}
        <Image
          src="/images/advisory-meeting.webp"
          fill
          className="object-cover"
          alt="Advisory consultation"
          priority
        />
        {/* Dark overlay */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black/65" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 65% at 50% 55%, rgba(139,0,0,0.38) 0%, transparent 70%)",
          }}
        />
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
            AGRICULTURAL ADVISORY
          </motion.p>

          <motion.h1
            custom={0.15}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="max-w-4xl font-[family-name:var(--font-playfair)] text-5xl font-bold leading-[1.08] tracking-tight text-white md:text-6xl"
          >
            You Know Farming. We Help You Build a Business Around It.
          </motion.h1>

          <motion.p
            custom={0.3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mx-auto mt-6 max-w-3xl font-[family-name:var(--font-inter)] text-lg leading-relaxed text-gray-300"
          >
            There is a real difference between being a farmer and running a farming business. We work
            with farmers who are ready to cross that line, to move from informal to structured, from
            subsistence to scale, from getting by to genuinely thriving.
          </motion.p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          WHAT WE ADVISE ON
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <motion.div
            ref={advisoryRef}
            variants={stagger}
            initial="hidden"
            animate={advisoryInView ? "visible" : "hidden"}
          >
            <motion.div variants={childFade} className="mb-14">
              <p className="mb-4 font-[family-name:var(--font-inter)] text-xs font-semibold tracking-[0.22em] text-[#808080] uppercase">
                Our Focus Areas
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1c1c1e] md:text-4xl">
                Six Areas of Practical Expertise
              </h2>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {advisoryAreas.map(({ Icon, title, desc }) => (
                <motion.div
                  key={title}
                  variants={childFade}
                  className="rounded-2xl border border-gray-100 bg-white p-8 transition-shadow duration-300 hover:shadow-md"
                >
                  <div className="mb-5">
                    <Icon />
                  </div>
                  <h3 className="mb-3 font-[family-name:var(--font-playfair)] text-xl font-bold text-[#1c1c1e]">
                    {title}
                  </h3>
                  <p className="font-[family-name:var(--font-inter)] text-sm leading-relaxed text-[#808080]">
                    {desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          WHO THIS IS FOR
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#faf9f7] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-4xl">
          <motion.div
            ref={forRef}
            variants={stagger}
            initial="hidden"
            animate={forInView ? "visible" : "hidden"}
          >
            <motion.p
              variants={childFade}
              className="mb-4 font-[family-name:var(--font-inter)] text-xs font-semibold tracking-[0.22em] text-[#808080] uppercase"
            >
              Is This For You?
            </motion.p>
            <motion.h2
              variants={childFade}
              className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1c1c1e] md:text-4xl"
            >
              Is This For You?
            </motion.h2>
            <motion.div
              variants={childFade}
              className="mt-8 space-y-6 font-[family-name:var(--font-inter)] text-base leading-relaxed text-[#808080]"
            >
              <p>
                Our advisory service is designed for smallholder and medium-scale farmers in
                Cameroon who are serious about growth, not just farming. If you are already working
                the land, whether in poultry, livestock, mixed farming, or crop production, and you
                want to build something lasting and profitable, this is for you.
              </p>
              <p>
                You do not need to have everything figured out. You do not need a business
                background or a degree in management. You just need to show up ready to work, ready
                to be honest about where you are, and willing to take your farm somewhere it has
                never been before.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SUCCESS STORY
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-4xl">
          <motion.div
            ref={storyRef}
            variants={stagger}
            initial="hidden"
            animate={storyInView ? "visible" : "hidden"}
          >
            <motion.div
              variants={childFade}
              className="border-l-4 border-[#8B0000] pl-8"
            >
              <p className="mb-4 font-[family-name:var(--font-inter)] text-xs font-semibold tracking-[0.22em] text-[#8B0000] uppercase">
                Case Study
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1c1c1e] md:text-4xl">
                From 200 Birds to a Business
              </h2>
              <div className="mt-8 space-y-6 font-[family-name:var(--font-inter)] text-base leading-relaxed text-[#808080]">
                <p>
                  One of our clients came to us running a small backyard broiler operation with no
                  financial records, no formal market relationships, no business plan, and no clear
                  idea of how to access the funding they knew they needed. Over six months of
                  structured advisory sessions, we helped them formalize their operation, build their
                  first set of financial records, prepare a loan application, and secure a supply
                  contract with a local distributor.
                </p>
                <p>
                  Today, they run a structured broiler enterprise with over 1,200 birds per cycle, a
                  reliable off-take arrangement, and a business they are proud to call their own.
                </p>
                <p className="italic">
                  This is what advisory, done right, looks like.
                </p>
              </div>
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
            Ready to Take Your Farm to the Next Level?
          </motion.h2>
          <motion.p
            variants={childFade}
            className="mx-auto mt-5 max-w-2xl font-[family-name:var(--font-inter)] text-base leading-relaxed text-white/80"
          >
            Book a consultation with our advisory team. The first session is just a conversation,
            no pressure, no commitment. Two people talking honestly about your farm and what it
            could become.
          </motion.p>
          <motion.div variants={childFade} className="mt-10">
            <Link
              href="/contact?type=advisory"
              className={cn(
                "inline-block rounded-full border-2 border-white px-10 py-4",
                "font-[family-name:var(--font-inter)] text-sm font-semibold tracking-wide text-white",
                "transition-all duration-300 hover:bg-white hover:text-[#8B0000]"
              )}
            >
              Book a Consultation
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
