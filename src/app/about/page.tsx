"use client";

import Image from "next/image";
import Link from "next/link";
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

/* ─── Data ───────────────────────────────────────────────────────────────── */

const values = [
  {
    Icon: IntegrityIcon,
    title: "Integrity",
    description:
      "We do what we say. Every product we deliver and every advice we give is backed by honesty and accountability.",
  },
  {
    Icon: CommunityFirstIcon,
    title: "Community First",
    description:
      "Agriculture is not just an industry to us. It is the lifeblood of the communities we serve. Their prosperity is our prosperity, and their growth is our growth.",
  },
  {
    Icon: PrecisionIcon,
    title: "Precision",
    description:
      "We bring careful thinking and informed decision-making to everything we do, whether it's formulating feed or advising on a business plan.",
  },
  {
    Icon: SustainabilityIcon,
    title: "Sustainability",
    description:
      "We farm and operate with the future in mind, for the land, the animals, and the farmers who come after us.",
  },
  {
    Icon: GrowthMindsetIcon,
    title: "Growth Mindset",
    description:
      "We believe every farmer has the potential to scale what they have built. Our role is to provide the tools, the knowledge, and the encouragement to make that a reality.",
  },
];

const team = [
  {
    initials: "FD",
    name: "FD",
    title: "Founder & Director",
    bio: "Leads strategy, partnerships, and the overall vision of Providence CIG.",
  },
  {
    initials: "FB",
    name: "FB",
    title: "Finance & Business Development Lead",
    bio: "Drives financial planning, partnerships, and growth strategy.",
  },
  {
    initials: "OM",
    name: "OM",
    title: "Operations Manager",
    bio: "Coordinates logistics, supplier networks, and on-site execution.",
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
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
        {/* Background image */}
        <Image
          src="/images/about-hero.webp"
          fill
          className="object-cover"
          alt="Providence CIG farm"
        />

        {/* Dark overlay */}
        <div aria-hidden="true" className="absolute inset-0 bg-black/65" />

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
            ABOUT US
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
            But Driven by Something Bigger.
          </motion.h1>

          <motion.p
            custom={0.3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mx-auto mt-6 max-w-3xl font-[family-name:var(--font-inter)] text-lg leading-relaxed text-gray-300 md:text-xl"
          >
            We are an agricultural enterprise driven by purpose, producing food,
            empowering farmers, and building a stronger agri-economy.
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
                  <p className="mb-4 font-[family-name:var(--font-inter)] text-xs font-semibold tracking-[0.22em] text-[#7C7C7C] uppercase">
                    Our Story
                  </p>
                  <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1c1c1e] md:text-4xl lg:text-5xl">
                    Where It All Began
                  </h2>
                  <div className="mt-8 h-px w-16 bg-[#8B0000]" />
                  <p className="mt-6 font-[family-name:var(--font-inter)] text-sm leading-relaxed text-[#7C7C7C]">
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
                Our journey started with a simple but powerful observation: too many farmers
                in Cameroon&apos;s North West Region were working harder than ever, yet still
                struggling to grow. Feed was expensive and generic. Poultry markets were
                unreliable. And the business knowledge that separates a small farm from a
                thriving enterprise was simply out of reach for most people in our communities.
              </p>
              <p>
                We started Providence Common Initiative Group to change that. What began as a
                community-driven initiative in Bambui has grown into an integrated agribusiness
                serving retailers, wholesalers, and farmers across the region. Today, we produce
                eggs and broilers at commercial scale, formulate custom animal feed for all major
                livestock types, and offer business advisory services to farmers who are ready to
                take the next step.
              </p>
              <p>
                Our name says everything about who we are. Providence, because we believe in
                guided purpose. Common Initiative, because we believe no farmer should have to
                figure it out alone. Group, because community is the foundation of everything we
                build.
              </p>
              <p>
                We are not perfect. But we are committed, to quality, to our clients, and to the
                communities that agriculture sustains.
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
              MISSION
            </motion.p>
            <motion.p
              variants={childFade}
              className="font-[family-name:var(--font-playfair)] text-xl font-semibold leading-relaxed text-white md:text-2xl"
            >
              To produce quality poultry products, formulate effective animal feed, and work
              closely with farmers who are ready to grow.
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
              VISION
            </motion.p>
            <motion.p
              variants={childFade}
              className="font-[family-name:var(--font-playfair)] text-xl font-semibold leading-relaxed text-white md:text-2xl"
            >
              A future where farming is a viable and rewarding livelihood for every farmer we
              work with and every community we serve.
            </motion.p>
          </AnimatedSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          OUR VALUES
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#f5f4f2] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-14">
            <p className="mb-3 font-[family-name:var(--font-inter)] text-xs font-semibold tracking-[0.22em] text-[#7C7C7C] uppercase">
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
                className="group rounded-2xl border border-[#8C8578/15] bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                <div className="mb-5">
                  <Icon />
                </div>
                <h3 className="mb-3 font-[family-name:var(--font-playfair)] text-xl font-bold text-[#1c1c1e]">
                  {title}
                </h3>
                <p className="font-[family-name:var(--font-inter)] text-sm leading-relaxed text-[#7C7C7C]">
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
              <p className="mb-3 font-[family-name:var(--font-inter)] text-xs font-semibold tracking-[0.22em] text-[#7C7C7C] uppercase">
                THE PEOPLE BEHIND THE WORK
              </p>
              <h2 className="max-w-2xl font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1c1c1e] md:text-4xl">
                A Team That Knows Agriculture from the Inside Out.
              </h2>
              <p className="mt-5 max-w-2xl font-[family-name:var(--font-inter)] text-base leading-relaxed text-[#7C7C7C]">
                Our team brings together expertise in agronomy, animal nutrition, veterinary
                science, and business management. We are practitioners first. Every
                recommendation we make is grounded in real experience, not just theory.
              </p>
            </motion.div>

            {/* Team cards */}
            <div className="grid gap-8 md:grid-cols-3">
              {team.map(({ initials, name, title, bio }) => (
                <motion.div
                  key={name}
                  variants={childFade}
                  className="flex flex-col items-center rounded-2xl border border-[#8C8578/15] bg-[#f5f4f2] p-8 text-center shadow-sm transition-shadow duration-300 hover:shadow-md"
                >
                  {/* Avatar */}
                  <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#8B0000] text-lg font-bold text-white font-[family-name:var(--font-playfair)] shadow-md">
                    {initials}
                  </div>
                  <p className="mt-1 font-[family-name:var(--font-inter)] text-xs font-semibold tracking-wide text-[#8B0000] uppercase">
                    {title}
                  </p>
                  <p className="mt-4 font-[family-name:var(--font-inter)] text-sm leading-relaxed text-[#7C7C7C]">
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
      <section id="partners" className="bg-[#f5f4f2] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <motion.div
            ref={partnersRef}
            variants={stagger}
            initial="hidden"
            animate={partnersInView ? "visible" : "hidden"}
          >
            {/* Header */}
            <motion.div variants={childFade} className="mb-14">
              <p className="mb-3 font-[family-name:var(--font-inter)] text-xs font-semibold tracking-[0.22em] text-[#7C7C7C] uppercase">
                OUR PARTNERS
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
                  "flex flex-col gap-8 rounded-2xl border border-[#8C8578/15] bg-white p-8 shadow-sm",
                  "sm:flex-row sm:items-start sm:gap-10"
                )}
              >
                {/* Logo placeholder */}
                <div className="flex h-24 w-40 flex-shrink-0 items-center justify-center rounded-xl border-2 border-dashed border-[#8B0000]/30 bg-[#f5f4f2] text-center">
                  <span className="font-[family-name:var(--font-playfair)] text-sm font-bold text-[#8B0000] leading-tight px-2">
                    MCF FAST
                  </span>
                </div>
                <div>
                  <h3 className="mb-3 font-[family-name:var(--font-playfair)] text-xl font-bold text-[#1c1c1e]">
                    MCF FAST (Micro-Credit Foundation — Farmer Agri-Support Training)
                  </h3>
                  <p className="font-[family-name:var(--font-inter)] text-sm leading-relaxed text-[#7C7C7C]">
                    The MCF FAST programme recognized Providence CIG as a high-impact, scalable
                    solution for smallholder farmer empowerment and commercial agri-production.
                    Their backing has accelerated our operational capacity and extended our reach
                    across the region.
                  </p>
                </div>
              </motion.div>

              {/* ACE */}
              <motion.div
                variants={childFade}
                className={cn(
                  "flex flex-col gap-8 rounded-2xl border border-[#8C8578/15] bg-white p-8 shadow-sm",
                  "sm:flex-row sm:items-start sm:gap-10"
                )}
              >
                {/* Logo placeholder */}
                <div className="flex h-24 w-40 flex-shrink-0 items-center justify-center rounded-xl border-2 border-dashed border-[#8B0000]/30 bg-[#f5f4f2] text-center">
                  <span className="font-[family-name:var(--font-playfair)] text-sm font-bold text-[#8B0000] leading-tight px-2">
                    ACE
                  </span>
                </div>
                <div>
                  <h3 className="mb-3 font-[family-name:var(--font-playfair)] text-xl font-bold text-[#1c1c1e]">
                    ACE (Agricultural Capacity and Entrepreneurship Programme)
                  </h3>
                  <p className="font-[family-name:var(--font-inter)] text-sm leading-relaxed text-[#7C7C7C]">
                    Our partnership with ACE has connected us to a broader network of agricultural
                    entrepreneurs, development institutions, investors, and changemakers,
                    strengthening both our operations and the quality of our advisory programmes.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#8B0000] py-20 px-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
          Want to Partner With Us?
        </h2>
        <Link href="/contact" className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-[#8B0000] transition-colors mt-4">
          Get in Touch
        </Link>
      </section>
    </>
  );
}
