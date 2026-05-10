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

/* ─── Animal SVG Icons ───────────────────────────────────────────────────── */

function PoultryIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="24" cy="30" rx="13" ry="10" stroke="#8B0000" strokeWidth="1.8" fill="#8B0000" fillOpacity="0.07" />
      <circle cx="34" cy="18" r="7" stroke="#8B0000" strokeWidth="1.8" fill="#8B0000" fillOpacity="0.07" />
      <path d="M41 17.5 L46 19 L41 21.5" stroke="#8B0000" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M30 13 Q32 9 34 12 Q36 8 37.5 11" stroke="#8B0000" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M17 28 Q13 24 15 19 Q19 22 20 28" stroke="#8B0000" strokeWidth="1.6" strokeLinejoin="round" fill="#8B0000" fillOpacity="0.07" />
      <path d="M21 40 L20 44 M20 44 L18 46" stroke="#8B0000" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M27 40 L28 44 M28 44 L30 46" stroke="#8B0000" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function GoatIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Body */}
      <ellipse cx="25" cy="30" rx="14" ry="9" stroke="#8B0000" strokeWidth="1.8" fill="#8B0000" fillOpacity="0.07" />
      {/* Neck */}
      <path d="M36 24 L38 18" stroke="#8B0000" strokeWidth="1.8" strokeLinecap="round" />
      {/* Head */}
      <ellipse cx="39" cy="15" rx="5" ry="4" stroke="#8B0000" strokeWidth="1.8" fill="#8B0000" fillOpacity="0.07" />
      {/* Horns */}
      <path d="M36 12 L33 8 M38 11 L38 7" stroke="#8B0000" strokeWidth="1.6" strokeLinecap="round" />
      {/* Beard */}
      <path d="M39 19 Q40 22 38 23" stroke="#8B0000" strokeWidth="1.4" strokeLinecap="round" />
      {/* Legs */}
      <path d="M16 38 L15 44 M16 38 L18 44" stroke="#8B0000" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M34 38 L33 44 M34 38 L36 44" stroke="#8B0000" strokeWidth="1.6" strokeLinecap="round" />
      {/* Tail */}
      <path d="M11 28 Q8 25 10 22" stroke="#8B0000" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PigIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Body */}
      <ellipse cx="24" cy="30" rx="16" ry="11" stroke="#8B0000" strokeWidth="1.8" fill="#8B0000" fillOpacity="0.07" />
      {/* Head */}
      <circle cx="37" cy="22" r="8" stroke="#8B0000" strokeWidth="1.8" fill="#8B0000" fillOpacity="0.07" />
      {/* Snout */}
      <ellipse cx="43" cy="24" rx="3.5" ry="2.5" stroke="#8B0000" strokeWidth="1.4" />
      <circle cx="42" cy="24" r="0.7" fill="#8B0000" />
      <circle cx="44" cy="24" r="0.7" fill="#8B0000" />
      {/* Ear */}
      <path d="M33 15 L30 10 L35 13" stroke="#8B0000" strokeWidth="1.6" strokeLinejoin="round" />
      {/* Curly tail */}
      <path d="M8 28 Q4 26 5 22 Q6 18 9 20" stroke="#8B0000" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Legs */}
      <path d="M16 40 L15 46" stroke="#8B0000" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M20 41 L20 47" stroke="#8B0000" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M28 41 L28 47" stroke="#8B0000" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M32 40 L33 46" stroke="#8B0000" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function CattleIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Body */}
      <ellipse cx="24" cy="31" rx="16" ry="10" stroke="#8B0000" strokeWidth="1.8" fill="#8B0000" fillOpacity="0.07" />
      {/* Head */}
      <ellipse cx="37" cy="22" rx="7" ry="6" stroke="#8B0000" strokeWidth="1.8" fill="#8B0000" fillOpacity="0.07" />
      {/* Horns */}
      <path d="M33 17 Q30 12 28 14" stroke="#8B0000" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M39 16 Q42 11 44 13" stroke="#8B0000" strokeWidth="1.6" strokeLinecap="round" />
      {/* Snout */}
      <ellipse cx="42" cy="25" rx="3" ry="2" stroke="#8B0000" strokeWidth="1.3" />
      {/* Ear */}
      <ellipse cx="32" cy="18" rx="2.5" ry="3" stroke="#8B0000" strokeWidth="1.3" transform="rotate(-20 32 18)" />
      {/* Udder */}
      <path d="M18 40 Q20 44 24 44 Q28 44 30 40" stroke="#8B0000" strokeWidth="1.4" fill="#8B0000" fillOpacity="0.08" />
      {/* Legs */}
      <path d="M14 40 L13 47" stroke="#8B0000" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M19 41 L19 47" stroke="#8B0000" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M29 41 L29 47" stroke="#8B0000" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M34 40 L35 47" stroke="#8B0000" strokeWidth="1.8" strokeLinecap="round" />
      {/* Tail */}
      <path d="M8 28 Q5 26 6 22 L8 24" stroke="#8B0000" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function RabbitIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Body */}
      <ellipse cx="26" cy="34" rx="12" ry="9" stroke="#8B0000" strokeWidth="1.8" fill="#8B0000" fillOpacity="0.07" />
      {/* Head */}
      <circle cx="32" cy="22" r="7" stroke="#8B0000" strokeWidth="1.8" fill="#8B0000" fillOpacity="0.07" />
      {/* Ears */}
      <ellipse cx="28" cy="12" rx="2.5" ry="6" stroke="#8B0000" strokeWidth="1.6" />
      <ellipse cx="36" cy="11" rx="2.5" ry="6" stroke="#8B0000" strokeWidth="1.6" />
      {/* Nose */}
      <circle cx="37" cy="25" r="1" fill="#8B0000" fillOpacity="0.5" />
      {/* Eye */}
      <circle cx="30" cy="21" r="1.2" fill="#8B0000" />
      {/* Tail */}
      <circle cx="14" cy="33" r="3" stroke="#8B0000" strokeWidth="1.4" fill="#8B0000" fillOpacity="0.08" />
      {/* Legs */}
      <path d="M20 42 L18 47" stroke="#8B0000" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M32 42 Q34 46 36 46" stroke="#8B0000" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function FishIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Body */}
      <ellipse cx="22" cy="26" rx="15" ry="9" stroke="#8B0000" strokeWidth="1.8" fill="#8B0000" fillOpacity="0.07" />
      {/* Tail */}
      <path d="M7 26 L2 18 L2 34 Z" stroke="#8B0000" strokeWidth="1.6" strokeLinejoin="round" fill="#8B0000" fillOpacity="0.1" />
      {/* Eye */}
      <circle cx="33" cy="23" r="2.5" stroke="#8B0000" strokeWidth="1.5" />
      <circle cx="33.5" cy="23" r="1" fill="#8B0000" />
      {/* Mouth */}
      <path d="M37 26 Q39 24 37 22" stroke="#8B0000" strokeWidth="1.5" strokeLinecap="round" />
      {/* Fin top */}
      <path d="M20 18 Q24 12 28 17" stroke="#8B0000" strokeWidth="1.6" strokeLinecap="round" fill="#8B0000" fillOpacity="0.08" />
      {/* Fin bottom */}
      <path d="M20 34 Q22 39 26 34" stroke="#8B0000" strokeWidth="1.4" strokeLinecap="round" />
      {/* Scale lines */}
      <path d="M22 22 Q25 20 26 24" stroke="#8B0000" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <path d="M16 24 Q18 22 20 25" stroke="#8B0000" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

/* ─── Data ───────────────────────────────────────────────────────────────── */

const howItWorksSteps = [
  {
    num: "1",
    title: "Consultation",
    desc: "You tell us about your animals: species, breed, age range, current weight, target weight or production metrics, any known health conditions, and your budget. The more detail you share, the better the formulation.",
  },
  {
    num: "2",
    title: "Formulation",
    desc: "Our nutrition team develops a precise feed formula tailored to your specifications, using quality raw materials and established nutritional science. You review and approve it before we produce anything.",
  },
  {
    num: "3",
    title: "Production",
    desc: "We mix and prepare your batch to the exact formulation, with quality checks at each stage of production.",
  },
  {
    num: "4",
    title: "Delivery & Follow-up",
    desc: "We deliver to your farm and follow up to monitor results. If adjustments are needed, we refine the formulation at no additional charge.",
  },
];

const livestock = [
  {
    Icon: PoultryIcon,
    name: "Poultry",
    desc: "Layers, broilers, indigenous and free-range breeds",
  },
  {
    Icon: GoatIcon,
    name: "Goats & Sheep",
    desc: "Tailored nutrition for healthy growth and milk yield",
  },
  {
    Icon: PigIcon,
    name: "Pigs",
    desc: "Stage-specific formulations from piglet to finisher",
  },
  {
    Icon: CattleIcon,
    name: "Cattle & Dairy Cows",
    desc: "Optimized for weight gain or milk production",
  },
  {
    Icon: RabbitIcon,
    name: "Rabbits & Small Livestock",
    desc: "Specialty blends for small-scale operations",
  },
  {
    Icon: FishIcon,
    name: "Aquaculture",
    desc: "Custom formulations available upon request",
  },
];

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function FeedPage() {
  const { ref: problemRef, inView: problemInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: howRef, inView: howInView } = useInView({ threshold: 0.08, triggerOnce: true });
  const { ref: livestockRef, inView: livestockInView } = useInView({ threshold: 0.08, triggerOnce: true });
  const { ref: ctaRef, inView: ctaInView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
        {/* Background image */}
        <Image
          src="/images/animal-feed.jpg"
          fill
          className="object-cover"
          alt="Animal feed grains"
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
            className="mb-5 font-[family-name:var(--font-inter)] text-xs font-semibold tracking-[0.25em] text-[#ffffff] uppercase"
          >
            CUSTOM ANIMAL FEED
          </motion.p>

          <motion.h1
            custom={0.15}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="max-w-4xl font-[family-name:var(--font-playfair)] text-5xl font-bold leading-[1.08] tracking-tight text-white md:text-6xl"
          >
            Feed That Fits Your Flock
          </motion.h1>

          <motion.p
            custom={0.3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mx-auto mt-6 max-w-3xl font-[family-name:var(--font-inter)] text-lg leading-relaxed text-gray-300"
          >
            Generic animal feed was designed for an average animal. We formulate feed blends
            specifically for your livestock, your production goals, and your budget.
          </motion.p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          PROBLEM WITH GENERIC FEED
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-4xl">
          <motion.div
            ref={problemRef}
            variants={stagger}
            initial="hidden"
            animate={problemInView ? "visible" : "hidden"}
          >
            <motion.p
              variants={childFade}
              className="mb-4 font-[family-name:var(--font-inter)] text-xs font-semibold tracking-[0.22em] text-[#7C7C7C] uppercase"
            >
              The Problem
            </motion.p>
            <motion.h2
              variants={childFade}
              className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1c1c1e] md:text-4xl"
            >
              Why Generic Feed Falls Short
            </motion.h2>
            <motion.div
              variants={childFade}
              className="mt-8 space-y-6 font-[family-name:var(--font-inter)] text-base leading-relaxed text-[#7C7C7C]"
            >
              <p>
                Most commercial animal feed is formulated to serve the broadest possible market,
                which means it rarely serves any single farmer particularly well. When your feed is
                not calibrated to your specific animals, their stage of life, and your production
                targets, you end up paying for nutrients your livestock do not need and missing the
                ones they do. The result is slower growth, lower yields, and higher long-term costs
                than you should be carrying.
              </p>
              <p>
                Custom feed changes that. A formulation designed precisely for your herd or flock
                can dramatically improve feed conversion ratios, weight gain rates, egg production
                volumes, and overall livestock health, often at a comparable or lower total cost than
                the generic alternatives you are currently buying.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#f5f4f2] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <motion.div
            ref={howRef}
            variants={stagger}
            initial="hidden"
            animate={howInView ? "visible" : "hidden"}
          >
            <motion.div variants={childFade} className="mb-14 text-center">
              <p className="mb-4 font-[family-name:var(--font-inter)] text-xs font-semibold tracking-[0.25em] text-[#8B0000] uppercase">
                How It Works
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1c1c1e] md:text-4xl">
                From Consultation to Delivery
              </h2>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2">
              {howItWorksSteps.map((step) => (
                <motion.div
                  key={step.num}
                  variants={childFade}
                  className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm"
                >
                  {/* Large ghost number */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-2 -top-4 font-[family-name:var(--font-playfair)] text-[7rem] font-black leading-none text-[#8B0000] opacity-[0.07] select-none"
                  >
                    {step.num}
                  </span>

                  <div className="relative z-10">
                    <span className="mb-3 inline-block font-[family-name:var(--font-inter)] text-xs font-semibold tracking-[0.2em] text-[#8B0000] uppercase">
                      Step {step.num}
                    </span>
                    <h3 className="mb-3 font-[family-name:var(--font-playfair)] text-xl font-bold text-[#1c1c1e]">
                      {step.title}
                    </h3>
                    <p className="font-[family-name:var(--font-inter)] text-sm leading-relaxed text-[#7C7C7C]">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          LIVESTOCK GRID
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <motion.div
            ref={livestockRef}
            variants={stagger}
            initial="hidden"
            animate={livestockInView ? "visible" : "hidden"}
          >
            <motion.div variants={childFade} className="mb-14">
              <p className="mb-4 font-[family-name:var(--font-inter)] text-xs font-semibold tracking-[0.22em] text-[#7C7C7C] uppercase">
                Our Expertise
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1c1c1e] md:text-4xl">
                Built for Every Animal on Your Farm
              </h2>
            </motion.div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {livestock.map(({ Icon, name, desc }) => (
                <motion.div
                  key={name}
                  variants={childFade}
                  className="flex flex-col gap-4 rounded-2xl border border-[#8C8578/15] bg-[#f5f4f2] p-8 transition-shadow duration-300 hover:shadow-md"
                >
                  <Icon />
                  <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-[#1c1c1e]">
                    {name}
                  </h3>
                  <p className="font-[family-name:var(--font-inter)] text-sm leading-relaxed text-[#7C7C7C]">
                    {desc}
                  </p>
                </motion.div>
              ))}
            </div>
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
            Let&apos;s Formulate Something That Actually Works for Your Farm.
          </motion.h2>
          <motion.p
            variants={childFade}
            className="mx-auto mt-5 max-w-2xl font-[family-name:var(--font-inter)] text-base leading-relaxed text-white/80"
          >
            Reach out with details about your livestock and your production goals and we will take it
            from there. No obligation, just a conversation.
          </motion.p>
          <motion.div variants={childFade} className="mt-10">
            <Link
              href="/contact?type=feed"
              className={cn(
                "inline-block rounded-full border-2 border-white px-10 py-4",
                "font-[family-name:var(--font-inter)] text-sm font-semibold tracking-wide text-white",
                "transition-all duration-300 hover:bg-white hover:text-[#8B0000]"
              )}
            >
              Request a Custom Feed Formulation
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
