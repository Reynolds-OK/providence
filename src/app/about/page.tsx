"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
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

/* ─── Value card icons ───────────────────────────────────────────────────── */

function IntegrityIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M20 4 L34 9 L34 21 C34 28.5 27.5 34.5 20 37 C12.5 34.5 6 28.5 6 21 L6 9 Z" stroke="#8B0000" strokeWidth="1.75" strokeLinejoin="round" />
      <path d="M14 20 L18 24 L26 16" stroke="#8B0000" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CommunityFirstIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M20 30 C20 30 8 23 8 15 C8 11 11 8 14.5 8 C16.5 8 18.5 9 20 11 C21.5 9 23.5 8 25.5 8 C29 8 32 11 32 15 C32 23 20 30 20 30 Z" stroke="#8B0000" strokeWidth="1.75" strokeLinejoin="round" />
      <path d="M13 28 C13 28 5 22 5 16 C5 13.5 6.8 11 9 11" stroke="#8B0000" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M27 28 C27 28 35 22 35 16 C35 13.5 33.2 11 31 11" stroke="#8B0000" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

function PrecisionIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="20" cy="20" r="14" stroke="#8B0000" strokeWidth="1.75" />
      <circle cx="20" cy="20" r="9" stroke="#8B0000" strokeWidth="1.5" strokeDasharray="2 2" />
      <circle cx="20" cy="20" r="3.5" fill="#8B0000" />
      <line x1="20" y1="4" x2="20" y2="8" stroke="#8B0000" strokeWidth="1.75" strokeLinecap="round" />
      <line x1="20" y1="32" x2="20" y2="36" stroke="#8B0000" strokeWidth="1.75" strokeLinecap="round" />
      <line x1="4" y1="20" x2="8" y2="20" stroke="#8B0000" strokeWidth="1.75" strokeLinecap="round" />
      <line x1="32" y1="20" x2="36" y2="20" stroke="#8B0000" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function SustainabilityIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M20 36 L20 18" stroke="#8B0000" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M20 24 Q26 20 30 14 Q24 12 18 16 Q20 20 20 24" stroke="#8B0000" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M20 20 Q14 16 10 10 Q16 8 22 12 Q20 16 20 20" stroke="#8B0000" strokeWidth="1.5" strokeLinejoin="round" opacity="0.65" />
      <path d="M10 34 A12 12 0 0 1 30 34" stroke="#8B0000" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M28 31 L30 34 L27 35.5" stroke="#8B0000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GrowthMindsetIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <polyline points="6,30 14,20 20,25 30,12" stroke="#8B0000" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30 12 L34 12 L34 16" stroke="#8B0000" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 34 Q14 31 16 30 Q18 29 20 30" stroke="#8B0000" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="20" cy="32" r="1.5" fill="#8B0000" />
      <circle cx="24" cy="35" r="1" fill="#8B0000" opacity="0.6" />
      <circle cx="17" cy="35.5" r="1" fill="#8B0000" opacity="0.6" />
    </svg>
  );
}

function AfricanPrideIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Stylised Africa outline */}
      <path d="M18 5 L22 5 L24 8 L26 8 L28 11 L27 15 L29 18 L28 22 L26 26 L24 30 L21 34 L19 34 L17 31 L15 28 L13 24 L12 20 L13 16 L12 13 L14 10 L16 8 Z" stroke="#8B0000" strokeWidth="1.75" strokeLinejoin="round" />
      {/* Star */}
      <path d="M20 16 L21 19 L24 19 L21.5 21 L22.5 24 L20 22 L17.5 24 L18.5 21 L16 19 L19 19 Z" fill="#8B0000" />
    </svg>
  );
}

/* ─── Data ───────────────────────────────────────────────────────────────── */

const values = [
  {
    Icon: IntegrityIcon,
    title: "Integrity",
    description:
      "We operate transparently and honestly in every transaction, partnership, and conversation. Our word is our bond, and our work reflects it.",
  },
  {
    Icon: CommunityFirstIcon,
    title: "Community First",
    description:
      "As a Common Initiative Group, our identity is rooted in service. We exist to lift the communities around us — through employment, knowledge, and fair commerce.",
  },
  {
    Icon: PrecisionIcon,
    title: "Precision",
    description:
      "From feed nutrient ratios to poultry management schedules, we approach every task with data-informed care. Good farming is both art and science.",
  },
  {
    Icon: SustainabilityIcon,
    title: "Sustainability",
    description:
      "We farm in ways that protect the land for future generations — responsible input use, waste reduction, and practices that keep ecosystems intact.",
  },
  {
    Icon: GrowthMindsetIcon,
    title: "Growth Mindset",
    description:
      "We are perpetual learners. We invest in training, welcome new research, and constantly refine our methods to stay ahead in a changing agricultural landscape.",
  },
  {
    Icon: AfricanPrideIcon,
    title: "African Pride",
    description:
      "We celebrate our roots. Our solutions are designed for African realities — culturally aware, locally grounded, and proud of what the continent's agriculture can achieve.",
  },
];

const team = [
  {
    initials: "AN",
    name: "Dr. A. Nkemdirim",
    title: "Director & Agronomist",
    bio: "Over 15 years leading commercial agribusiness operations across West Africa.",
  },
  {
    initials: "PF",
    name: "Ms. P. Fontem",
    title: "Head of Nutrition",
    bio: "Animal nutritionist specializing in custom feed formulation for smallholder and commercial farms.",
  },
  {
    initials: "EC",
    name: "Mr. E. Chiabi",
    title: "Advisory Lead",
    bio: "Agribusiness consultant, certified trainer, and farmer advocate with a decade of field experience.",
  },
];

/* ─── Section wrapper that triggers animation on scroll ─────────────────── */

function AnimatedSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, inView } = useInView({ threshold: 0.12, triggerOnce: true });
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

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function AboutPage() {
  /* story section in-view */
  const { ref: storyRef, inView: storyInView } = useInView({ threshold: 0.12, triggerOnce: true });
  /* values section */
  const { ref: valuesRef, inView: valuesInView } = useInView({ threshold: 0.08, triggerOnce: true });
  /* team section */
  const { ref: teamRef, inView: teamInView } = useInView({ threshold: 0.1, triggerOnce: true });
  /* partners section */
  const { ref: partnersRef, inView: partnersInView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-gradient-to-r from-[#1c1c1e] to-[#2d1a1a]">
        {/* subtle texture overlay */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[#8B0000] opacity-5" />

        {/* crosshatch grid overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.025) 39px, rgba(255,255,255,0.025) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.025) 39px, rgba(255,255,255,0.025) 40px)",
          }}
        />

        {/* radial glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 55% 60% at 50% 55%, rgba(139,0,0,0.28) 0%, transparent 70%)",
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
            Providence Common Initiative Group &nbsp;|&nbsp; Bambui, Cameroon
          </motion.p>

          <motion.h1
            custom={0.15}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="max-w-4xl font-[family-name:var(--font-playfair)] text-5xl font-bold leading-[1.08] tracking-tight text-white md:text-6xl"
          >
            More Than a Business.
            <br />
            A Mission in Motion.
          </motion.h1>

          <motion.p
            custom={0.3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mx-auto mt-6 max-w-3xl font-[family-name:var(--font-inter)] text-lg leading-relaxed text-gray-300 md:text-xl"
          >
            We did not start Providence CIG to simply run a farm. We started it
            to prove that African agriculture — grounded in science, integrity,
            and community — can feed, employ, and uplift an entire region.
          </motion.p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          OUR STORY
      ══════════════════════════════════════════════════════════════════ */}
      <section id="story" className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <motion.div
            ref={storyRef}
            variants={stagger}
            initial="hidden"
            animate={storyInView ? "visible" : "hidden"}
            className="grid gap-12 lg:grid-cols-2 lg:gap-20"
          >
            {/* Left col — label + decorative line */}
            <motion.div variants={childFade} className="flex flex-col">
              <div className="flex items-start gap-5">
                <div className="mt-1 w-[3px] flex-shrink-0 self-stretch bg-[#8B0000] rounded-full" style={{ minHeight: "100%" }} />
                <div>
                  <p className="mb-4 font-[family-name:var(--font-inter)] text-xs font-semibold tracking-[0.22em] text-[#808080] uppercase">
                    Our Story
                  </p>
                  <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1c1c1e] md:text-4xl lg:text-5xl">
                    Where It All Began
                  </h2>
                  <div className="mt-8 h-px w-16 bg-[#8B0000]" />
                  <p className="mt-6 font-[family-name:var(--font-inter)] text-sm leading-relaxed text-[#808080]">
                    Founded in the highlands of Bambui, Providence CIG emerged
                    from a shared vision — that agriculture could be both a
                    livelihood and a legacy.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right col — body copy */}
            <motion.div variants={childFade} className="space-y-6 font-[family-name:var(--font-inter)] text-base leading-relaxed text-[#1a1a1a]">
              <p>
                Providence Common Initiative Group began as a conversation among
                farmers, advisors, and community leaders in the North-West
                Region of Cameroon. We saw a recurring pattern: smallholder
                farmers with the will to grow, but without access to quality
                inputs, reliable markets, or practical guidance they could trust.
                We decided to be the answer to that gap.
              </p>
              <p>
                Registered as a Common Initiative Group, our structure is
                intentional — we are not a distant corporation but a collective
                rooted in the communities we serve. From day one, our operations
                in commercial poultry production, custom animal feed formulation,
                and agricultural business advisory have been guided by one
                principle: that every farmer who works with us should leave
                better equipped than when they arrived.
              </p>
              <p>
                Today, backed by international development partners including
                MCF FAST and the ACE programme, Providence CIG is growing — in
                scale, in reach, and in impact. But we have never lost sight of
                where we started: a commitment to farming done with purpose, for
                the long-term benefit of Cameroon&apos;s agricultural future.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          MISSION & VISION
      ══════════════════════════════════════════════════════════════════ */}
      <section className="grid md:grid-cols-2">
        {/* Mission */}
        <div className="flex flex-col justify-center bg-[#8B0000] p-12 md:p-16">
          <AnimatedSection>
            <motion.p
              variants={childFade}
              className="mb-4 font-[family-name:var(--font-inter)] text-xs font-semibold tracking-[0.22em] text-white/60 uppercase"
            >
              Our Mission
            </motion.p>
            <motion.p
              variants={childFade}
              className="font-[family-name:var(--font-playfair)] text-xl font-semibold leading-relaxed text-white md:text-2xl"
            >
              To produce and supply quality poultry products and customized
              animal feed while providing practical agricultural advisory that
              empowers farmers, strengthens local food systems, and drives
              sustainable economic growth across our communities.
            </motion.p>
          </AnimatedSection>
        </div>

        {/* Vision */}
        <div className="flex flex-col justify-center bg-[#1c1c1e] p-12 md:p-16">
          <AnimatedSection>
            <motion.p
              variants={childFade}
              className="mb-4 font-[family-name:var(--font-inter)] text-xs font-semibold tracking-[0.22em] text-white/60 uppercase"
            >
              Our Vision
            </motion.p>
            <motion.p
              variants={childFade}
              className="font-[family-name:var(--font-playfair)] text-xl font-semibold leading-relaxed text-white md:text-2xl"
            >
              To become a leading agribusiness collective in Central and West
              Africa — recognized for agricultural excellence, trusted as a
              knowledge hub for farmers, and celebrated as a model of
              community-driven enterprise that proves African agriculture can
              feed itself and the world.
            </motion.p>
          </AnimatedSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          OUR VALUES
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#faf9f7] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-14">
            <p className="mb-3 font-[family-name:var(--font-inter)] text-xs font-semibold tracking-[0.22em] text-[#808080] uppercase">
              What We Stand For
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1c1c1e] md:text-4xl">
              Our Values
            </h2>
          </div>

          {/* Values grid */}
          <motion.div
            ref={valuesRef}
            variants={stagger}
            initial="hidden"
            animate={valuesInView ? "visible" : "hidden"}
            className="grid gap-6 md:grid-cols-3"
          >
            {values.map(({ Icon, title, description }) => (
              <motion.div
                key={title}
                variants={childFade}
                className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                <div className="mb-5">
                  <Icon />
                </div>
                <h3 className="mb-3 font-[family-name:var(--font-playfair)] text-xl font-bold text-[#1c1c1e]">
                  {title}
                </h3>
                <p className="font-[family-name:var(--font-inter)] text-sm leading-relaxed text-[#808080]">
                  {description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          OUR TEAM
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <motion.div
            ref={teamRef}
            variants={stagger}
            initial="hidden"
            animate={teamInView ? "visible" : "hidden"}
          >
            {/* Header */}
            <motion.div variants={childFade} className="mb-14">
              <p className="mb-3 font-[family-name:var(--font-inter)] text-xs font-semibold tracking-[0.22em] text-[#808080] uppercase">
                The People Behind the Work
              </p>
              <h2 className="max-w-2xl font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1c1c1e] md:text-4xl">
                A Team That Knows Agriculture from the Inside Out.
              </h2>
              <p className="mt-5 max-w-2xl font-[family-name:var(--font-inter)] text-base leading-relaxed text-[#808080]">
                Every member of our team brings direct field experience. We do
                not advise from an office — we work alongside farmers, study the
                land, and earn our knowledge the hard way.
              </p>
            </motion.div>

            {/* Team cards */}
            <div className="grid gap-8 md:grid-cols-3">
              {team.map(({ initials, name, title, bio }) => (
                <motion.div
                  key={name}
                  variants={childFade}
                  className="flex flex-col items-center rounded-2xl border border-gray-100 bg-[#faf9f7] p-8 text-center shadow-sm transition-shadow duration-300 hover:shadow-md"
                >
                  {/* Avatar */}
                  <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#8B0000] text-lg font-bold text-white font-[family-name:var(--font-playfair)] shadow-md">
                    {initials}
                  </div>
                  <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-[#1c1c1e]">
                    {name}
                  </h3>
                  <p className="mt-1 font-[family-name:var(--font-inter)] text-xs font-semibold tracking-wide text-[#8B0000] uppercase">
                    {title}
                  </p>
                  <p className="mt-4 font-[family-name:var(--font-inter)] text-sm leading-relaxed text-[#808080]">
                    {bio}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          PARTNERS
      ══════════════════════════════════════════════════════════════════ */}
      <section id="partners" className="bg-[#faf9f7] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <motion.div
            ref={partnersRef}
            variants={stagger}
            initial="hidden"
            animate={partnersInView ? "visible" : "hidden"}
          >
            {/* Header */}
            <motion.div variants={childFade} className="mb-14">
              <p className="mb-3 font-[family-name:var(--font-inter)] text-xs font-semibold tracking-[0.22em] text-[#808080] uppercase">
                Our Partners
              </p>
              <h2 className="max-w-2xl font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1c1c1e] md:text-4xl">
                Backed by Leaders in Agricultural Development.
              </h2>
            </motion.div>

            {/* Partner entries */}
            <div className="space-y-10">
              {/* MCF FAST */}
              <motion.div
                variants={childFade}
                className={cn(
                  "flex flex-col gap-8 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm",
                  "sm:flex-row sm:items-start sm:gap-10"
                )}
              >
                {/* Logo placeholder */}
                <div className="flex h-24 w-40 flex-shrink-0 items-center justify-center rounded-xl border-2 border-dashed border-[#8B0000]/30 bg-[#faf9f7] text-center">
                  <span className="font-[family-name:var(--font-playfair)] text-sm font-bold text-[#8B0000] leading-tight px-2">
                    MCF FAST
                  </span>
                </div>
                <div>
                  <h3 className="mb-3 font-[family-name:var(--font-playfair)] text-xl font-bold text-[#1c1c1e]">
                    MCF FAST (Micro-Credit Foundation — Farmer Agri-Support Training)
                  </h3>
                  <p className="font-[family-name:var(--font-inter)] text-sm leading-relaxed text-[#808080]">
                    MCF FAST is a microfinance and capacity-building programme
                    that supports emerging agricultural enterprises in sub-Saharan
                    Africa. Through their partnership with Providence CIG, they
                    have provided access to working capital, financial literacy
                    training, and structured mentorship that has helped us scale
                    our operations sustainably. Their investment in our team has
                    directly translated into improved farm productivity, stronger
                    record-keeping practices, and a more resilient supply chain.
                  </p>
                </div>
              </motion.div>

              {/* ACE */}
              <motion.div
                variants={childFade}
                className={cn(
                  "flex flex-col gap-8 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm",
                  "sm:flex-row sm:items-start sm:gap-10"
                )}
              >
                {/* Logo placeholder */}
                <div className="flex h-24 w-40 flex-shrink-0 items-center justify-center rounded-xl border-2 border-dashed border-[#8B0000]/30 bg-[#faf9f7] text-center">
                  <span className="font-[family-name:var(--font-playfair)] text-sm font-bold text-[#8B0000] leading-tight px-2">
                    ACE
                  </span>
                </div>
                <div>
                  <h3 className="mb-3 font-[family-name:var(--font-playfair)] text-xl font-bold text-[#1c1c1e]">
                    ACE (Agricultural Capacity and Entrepreneurship Programme)
                  </h3>
                  <p className="font-[family-name:var(--font-inter)] text-sm leading-relaxed text-[#808080]">
                    The ACE programme connects agricultural businesses with
                    international expertise, certification pathways, and regional
                    market linkages. As an ACE-affiliated enterprise, Providence
                    CIG has benefited from technical training in modern agronomy,
                    access to certified seed and feed ingredient suppliers, and
                    exposure to broader export-readiness standards. This
                    partnership reinforces our commitment to excellence and
                    positions us as a benchmark agribusiness in the North-West
                    Region of Cameroon.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
