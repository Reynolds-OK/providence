"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { useState, useRef, ChangeEvent, FormEvent } from "react";
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

/* ─── Experience Icons ───────────────────────────────────────────────────── */

function BarnIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Barn roof */}
      <path d="M4 18 L20 6 L36 18" stroke="#8B0000" strokeWidth="1.75" strokeLinejoin="round" />
      {/* Barn body */}
      <rect x="6" y="18" width="28" height="18" stroke="#8B0000" strokeWidth="1.75" />
      {/* Barn door arch */}
      <path d="M14 36 L14 26 Q14 22 20 22 Q26 22 26 26 L26 36" stroke="#8B0000" strokeWidth="1.5" fill="#8B0000" fillOpacity="0.07" />
      {/* Hayloft window */}
      <rect x="17" y="11" width="6" height="5" rx="0.5" stroke="#8B0000" strokeWidth="1.3" />
      {/* Side windows */}
      <rect x="9" y="22" width="4" height="4" rx="0.5" stroke="#8B0000" strokeWidth="1.2" />
      <rect x="27" y="22" width="4" height="4" rx="0.5" stroke="#8B0000" strokeWidth="1.2" />
    </svg>
  );
}

function FlaskIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Flask neck */}
      <path d="M15 6 L15 16 L7 30 Q5 34 8 36 L32 36 Q35 34 33 30 L25 16 L25 6" stroke="#8B0000" strokeWidth="1.75" strokeLinejoin="round" fill="#8B0000" fillOpacity="0.06" />
      {/* Liquid fill */}
      <path d="M10 30 Q9 34 12 35 L28 35 Q31 34 30 30 L23 18 L17 18 Z" fill="#8B0000" fillOpacity="0.12" />
      {/* Bubbles */}
      <circle cx="17" cy="30" r="1.5" fill="#8B0000" fillOpacity="0.4" />
      <circle cx="23" cy="27" r="1" fill="#8B0000" fillOpacity="0.4" />
      {/* Stopper / rim */}
      <path d="M13 6 L27 6" stroke="#8B0000" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function DocumentGraphIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="6" y="4" width="20" height="26" rx="2" stroke="#8B0000" strokeWidth="1.75" />
      <path d="M10 10 L22 10" stroke="#8B0000" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 14 L22 14" stroke="#8B0000" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 18 L18 18" stroke="#8B0000" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="22" y="24" width="4" height="10" rx="1" fill="#8B0000" fillOpacity="0.2" stroke="#8B0000" strokeWidth="1.4" />
      <rect x="28" y="19" width="4" height="15" rx="1" fill="#8B0000" fillOpacity="0.2" stroke="#8B0000" strokeWidth="1.4" />
      <rect x="34" y="22" width="4" height="12" rx="1" fill="#8B0000" fillOpacity="0.2" stroke="#8B0000" strokeWidth="1.4" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Truck body */}
      <rect x="2" y="14" width="22" height="16" rx="2" stroke="#8B0000" strokeWidth="1.75" fill="#8B0000" fillOpacity="0.06" />
      {/* Cab */}
      <path d="M24 22 L24 14 L34 14 L38 20 L38 30 L24 30" stroke="#8B0000" strokeWidth="1.75" strokeLinejoin="round" fill="#8B0000" fillOpacity="0.06" />
      {/* Windscreen */}
      <path d="M25 15 L25 21 L37 21" stroke="#8B0000" strokeWidth="1.3" strokeLinejoin="round" />
      {/* Wheels */}
      <circle cx="10" cy="30" r="4" stroke="#8B0000" strokeWidth="1.75" />
      <circle cx="10" cy="30" r="1.5" fill="#8B0000" fillOpacity="0.3" />
      <circle cx="30" cy="30" r="4" stroke="#8B0000" strokeWidth="1.75" />
      <circle cx="30" cy="30" r="1.5" fill="#8B0000" fillOpacity="0.3" />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M20 36 L20 18" stroke="#8B0000" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M20 26 Q27 22 32 14 Q24 12 18 16 Q20 21 20 26" stroke="#8B0000" strokeWidth="1.5" strokeLinejoin="round" fill="#8B0000" fillOpacity="0.1" />
      <path d="M20 22 Q13 18 9 10 Q17 8 23 13 Q21 17 20 22" stroke="#8B0000" strokeWidth="1.5" strokeLinejoin="round" fill="#8B0000" fillOpacity="0.07" />
      <path d="M10 34 A12 12 0 0 1 30 34" stroke="#8B0000" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M28 31 L30 34 L27 35.5" stroke="#8B0000" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MentorshipIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Person 1 */}
      <circle cx="13" cy="10" r="5" stroke="#8B0000" strokeWidth="1.75" />
      <path d="M4 28 C4 22 8 18 13 18 C18 18 22 22 22 28" stroke="#8B0000" strokeWidth="1.75" strokeLinecap="round" />
      {/* Person 2 */}
      <circle cx="28" cy="12" r="5" stroke="#8B0000" strokeWidth="1.75" />
      <path d="M19 30 C19 24 23 20 28 20 C33 20 37 24 37 30" stroke="#8B0000" strokeWidth="1.75" strokeLinecap="round" />
      {/* Connection spark */}
      <path d="M18 18 L22 22" stroke="#8B0000" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="2 2" />
    </svg>
  );
}

/* ─── Data ───────────────────────────────────────────────────────────────── */

const experiences = [
  {
    Icon: BarnIcon,
    title: "Poultry Operations",
    desc: "Hands-on participation in managing laying hen and broiler operations. Learn production scheduling, biosecurity protocols, bird health monitoring, and supply chain logistics from farm to market.",
  },
  {
    Icon: FlaskIcon,
    title: "Feed Formulation Lab",
    desc: "Work directly alongside our nutrition team in developing and testing custom animal feed blends. Understand raw material selection, nutrient balancing, and quality control in a real production setting.",
  },
  {
    Icon: DocumentGraphIcon,
    title: "Business Advisory Support",
    desc: "Shadow our advisors in live client consultations, assist with farm data collection and analysis, and contribute to the development of actual farmer business plans, not simulations.",
  },
  {
    Icon: TruckIcon,
    title: "Supply Chain & Market Operations",
    desc: "Follow how agricultural products move from farm gate to buyer. Learn logistics, pricing strategy, buyer relationship management, and the realities of agricultural market dynamics on the ground.",
  },
  {
    Icon: LeafIcon,
    title: "Sustainability Practices",
    desc: "Understand how Providence CIG integrates environmentally responsible practices into daily operations, from feed sourcing and waste management to long-term land health and water stewardship.",
  },
  {
    Icon: MentorshipIcon,
    title: "Weekly Mentorship Sessions",
    desc: "Every intern is paired with a senior team member for structured, one-on-one weekly mentorship sessions. You leave with a written career development plan, not just a certificate.",
  },
];

const programmeDetails = [
  { label: "Duration", value: "3 to 6 months" },
  {
    label: "Eligibility",
    value:
      "Undergraduate students (Year 2 and above), HND students, recent graduates within 2 years of graduation",
  },
  {
    label: "Fields Welcome",
    value:
      "Animal Science, Agribusiness, Nutrition, Veterinary Science, Food Science, Business Administration, Agricultural Economics, and related disciplines",
  },
  { label: "Location", value: "On-site at our production facility and offices" },
  { label: "Stipend", value: "Available for qualifying interns, details provided upon selection" },
  {
    label: "Certification",
    value: "All interns receive a formal certificate of completion and a signed professional reference letter",
  },
  { label: "Applications", value: "Reviewed on a rolling basis with no fixed deadline" },
];

const testimonials = [
  {
    initials: "EA",
    name: "Esi Awouma",
    institution: "University of Bamenda",
    department: "BSc Animal Science, Poultry Operations",
    quote:
      "Providence CIG gave me my first real exposure to commercial poultry at scale. I came in thinking I understood layers from class. I left understanding what it actually takes to run a profitable production house. That gap is enormous — and this internship closes it.",
  },
  {
    initials: "SN",
    name: "Samuel Nkeng",
    institution: "University of Dschang",
    department: "BSc Nutrition, Feed Lab",
    quote:
      "The advisory rotation was the highlight for me. Sitting across from a real farmer trying to turn a struggling pig operation into a viable business — that taught me more about practical agribusiness than two years of lectures combined.",
  },
  {
    initials: "PT",
    name: "Priscilla Tankwa",
    institution: "Bamenda University of Science and Technology",
    department: "Agribusiness, Advisory",
    quote:
      "What I appreciated most was the mentorship. My mentor never made me feel like I was just here to observe. I was asked for opinions. I was challenged. I made mistakes and learned from them. That is the kind of environment that actually builds competence.",
  },
  {
    initials: "YM",
    name: "Yves Mbunwe",
    institution: "Bamenda Polytechnic",
    department: "HND Agriculture, General Operations",
    quote:
      "I came in wanting to understand feed formulation from a business angle. I left with a clear career direction, a strong reference letter, and a network inside an organisation I genuinely respect. Providence CIG treats interns like future colleagues.",
  },
];

/* ─── Form types ─────────────────────────────────────────────────────────── */

interface FormFields {
  fullName: string;
  email: string;
  institution: string;
  graduationYear: string;
  preferredDept: string;
}

interface FormErrors extends Partial<FormFields> {
  cv?: string;
}

/* ─── Star SVG ───────────────────────────────────────────────────────────── */

function StarIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="#8B0000"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M8 1L9.85 5.76L15 6.18L11.25 9.42L12.47 14.5L8 11.77L3.53 14.5L4.75 9.42L1 6.18L6.15 5.76L8 1Z" />
    </svg>
  );
}

/* ─── Quote SVG ──────────────────────────────────────────────────────────── */

function QuoteIcon() {
  return (
    <svg
      width="36"
      height="28"
      viewBox="0 0 36 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0 28 C0 28 4 16 4 8 C4 3 7 0 12 0 C17 0 18 4 18 6 C18 10 15 12 11 12 C9 12 8 11.5 8 11.5 C8 11.5 7 16 7 20 L7 28 Z"
        fill="#8B0000"
        fillOpacity="0.12"
      />
      <path
        d="M18 28 C18 28 22 16 22 8 C22 3 25 0 30 0 C35 0 36 4 36 6 C36 10 33 12 29 12 C27 12 26 11.5 26 11.5 C26 11.5 25 16 25 20 L25 28 Z"
        fill="#8B0000"
        fillOpacity="0.12"
      />
    </svg>
  );
}

/* ─── Input component ────────────────────────────────────────────────────── */

function FormInput({
  label,
  id,
  error,
  children,
  required,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="font-[family-name:var(--font-inter)] text-sm font-semibold text-[#1a1a1a]"
      >
        {label}
        {required && (
          <span className="ml-1 text-[#8B0000]" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p className="font-[family-name:var(--font-inter)] text-xs text-[#8B0000]">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass =
  "border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] text-[#1a1a1a] font-[family-name:var(--font-inter)] text-sm transition bg-white";

const inputErrorClass =
  "border-[#8B0000] border-2 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] text-[#1a1a1a] font-[family-name:var(--font-inter)] text-sm transition bg-white";

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function InternshipPage() {
  /* Section in-view refs */
  const { ref: philosophyRef, inView: philosophyInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: expRef, inView: expInView } = useInView({ threshold: 0.08, triggerOnce: true });
  const { ref: detailsRef, inView: detailsInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: testimonialsRef, inView: testimonialsInView } = useInView({ threshold: 0.08, triggerOnce: true });
  const { ref: formRef, inView: formInView } = useInView({ threshold: 0.05, triggerOnce: true });

  /* Form state */
  const [fields, setFields] = useState<FormFields>({
    fullName: "",
    email: "",
    institution: "",
    graduationYear: "",
    preferredDept: "",
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvError, setCvError] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setCvError("");

    if (!file) {
      setCvFile(null);
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      setCvError("Please upload a PDF, DOC, or DOCX file.");
      setCvFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setCvError("File must be 5 MB or smaller.");
      setCvFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setCvFile(file);
  }

  function validate(): boolean {
    const newErrors: FormErrors = {};

    const requiredText: (keyof FormFields)[] = [
      "fullName",
      "email",
      "institution",
      "graduationYear",
      "preferredDept",
    ];

    requiredText.forEach((key) => {
      if (!fields[key].trim()) {
        newErrors[key] = "This field is required.";
      }
    });

    if (fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!cvFile) {
      newErrors.cv = "Please upload your CV or resume.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    // Simulate async submission
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setSubmitting(false);
    setSubmitted(true);
  }

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
        {/* Background image */}
        <Image
          src="/images/internship-hero.webp"
          fill
          className="object-cover"
          alt="Internship at Providence CIG"
          priority
        />
        {/* Dark overlay */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black/60" />
        {/* Grid texture */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.025) 39px, rgba(255,255,255,0.025) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.025) 39px, rgba(255,255,255,0.025) 40px)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center px-4 py-28 text-center sm:px-6 lg:px-8">
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-5 font-[family-name:var(--font-inter)] text-xs font-semibold tracking-[0.25em] text-white/70 uppercase"
          >
            INTERNSHIP PROGRAMME
          </motion.p>

          <motion.h1
            custom={0.15}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="max-w-4xl font-[family-name:var(--font-playfair)] text-5xl font-bold leading-[1.08] tracking-tight text-white md:text-6xl"
          >
            Grow Your Career From the Ground Up.
          </motion.h1>

          <motion.p
            custom={0.3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mx-auto mt-6 max-w-3xl font-[family-name:var(--font-inter)] text-lg leading-relaxed text-gray-200"
          >
            Our internship programme gives students and young graduates real, hands-on exposure to
            commercial agriculture.
          </motion.p>

          <motion.div custom={0.45} variants={fadeUp} initial="hidden" animate="visible" className="mt-10">
            <Link
              href="#application-form"
              className="inline-block rounded-full bg-[#8B0000] px-10 py-4 font-[family-name:var(--font-inter)] text-sm font-semibold tracking-wide text-white shadow-lg transition-all duration-300 hover:bg-[#6e0000]"
            >
              Apply Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          PROGRAMME PHILOSOPHY
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-4xl">
          <motion.div
            ref={philosophyRef}
            variants={stagger}
            initial="hidden"
            animate={philosophyInView ? "visible" : "hidden"}
          >
            <motion.p
              variants={childFade}
              className="mb-4 font-[family-name:var(--font-inter)] text-xs font-semibold tracking-[0.25em] text-[#8B0000] uppercase"
            >
              WHY WE INVEST IN YOUNG PEOPLE
            </motion.p>
            <motion.h2
              variants={childFade}
              className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1c1c1e] md:text-5xl"
            >
              The Future of African Agriculture Is Being Built Right Now.
            </motion.h2>
            <motion.div
              variants={childFade}
              className="mt-8 space-y-6 font-[family-name:var(--font-inter)] text-base leading-relaxed text-[#7C7C7C]"
            >
              <p>
                Agriculture is one of Africa&apos;s most powerful economic engines and it desperately
                needs a new generation of skilled, entrepreneurially minded practitioners. Not people
                who only know farming from textbooks, but young professionals who can combine field
                knowledge with business thinking, nutritional science with market understanding, and
                ambition with work ethic.
              </p>
              <p>
                Our internship programme was designed to produce exactly that. At Providence CIG,
                interns are not errand runners or observers. They are junior team members, given real
                responsibilities, real mentorship, and real exposure to how a modern agribusiness
                operates from the inside.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          WHAT INTERNS EXPERIENCE
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#f5f4f2] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <motion.div
            ref={expRef}
            variants={stagger}
            initial="hidden"
            animate={expInView ? "visible" : "hidden"}
          >
            <motion.div variants={childFade} className="mb-14">
              <p className="mb-4 font-[family-name:var(--font-inter)] text-xs font-semibold tracking-[0.22em] text-[#7C7C7C] uppercase">
                Inside the Programme
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1c1c1e] md:text-4xl">
                What Interns Experience
              </h2>
            </motion.div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {experiences.map(({ Icon, title, desc }) => (
                <motion.div
                  key={title}
                  variants={childFade}
                  className="flex flex-col gap-5 rounded-2xl bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-md"
                >
                  <Icon />
                  <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-[#1c1c1e]">
                    {title}
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
          PROGRAMME DETAILS TABLE
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-4xl">
          <motion.div
            ref={detailsRef}
            variants={stagger}
            initial="hidden"
            animate={detailsInView ? "visible" : "hidden"}
          >
            <motion.div variants={childFade} className="mb-12">
              <p className="mb-4 font-[family-name:var(--font-inter)] text-xs font-semibold tracking-[0.22em] text-[#7C7C7C] uppercase">
                Programme Information
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1c1c1e] md:text-4xl">
                Everything You Need to Know
              </h2>
            </motion.div>

            <motion.div
              variants={childFade}
              className="overflow-hidden rounded-2xl border border-[#8C8578/25]"
            >
              {programmeDetails.map(({ label, value }, idx) => (
                <div
                  key={label}
                  className={cn(
                    "flex flex-col gap-2 px-8 py-5 sm:flex-row sm:gap-8",
                    idx % 2 === 0 ? "bg-white" : "bg-[#f5f4f2]"
                  )}
                >
                  <dt className="w-full font-[family-name:var(--font-inter)] text-sm font-bold text-[#8B0000] sm:w-48 sm:flex-shrink-0">
                    {label}
                  </dt>
                  <dd className="font-[family-name:var(--font-inter)] text-sm leading-relaxed text-[#1a1a1a]">
                    {value}
                  </dd>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#f5f4f2] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <motion.div
            ref={testimonialsRef}
            variants={stagger}
            initial="hidden"
            animate={testimonialsInView ? "visible" : "hidden"}
          >
            <motion.div variants={childFade} className="mb-14 text-center">
              <p className="mb-4 font-[family-name:var(--font-inter)] text-xs font-semibold tracking-[0.25em] text-[#8B0000] uppercase">
                Hear From Our Interns
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1c1c1e] md:text-4xl">
                Real Experiences. Real Growth.
              </h2>
            </motion.div>

            <div className="grid gap-6 lg:grid-cols-2">
              {testimonials.map(({ initials, name, institution, department, quote }) => (
                <motion.div
                  key={name}
                  variants={childFade}
                  className="flex flex-col gap-6 rounded-2xl bg-white p-8 shadow-sm"
                >
                  {/* Quote mark */}
                  <QuoteIcon />

                  {/* Quote text */}
                  <p className="font-[family-name:var(--font-inter)] text-base leading-relaxed text-[#1a1a1a]">
                    &ldquo;{quote}&rdquo;
                  </p>

                  {/* Stars */}
                  <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} />
                    ))}
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#8B0000] font-[family-name:var(--font-playfair)] text-sm font-bold text-white">
                      {initials}
                    </div>
                    <div>
                      <p className="font-[family-name:var(--font-inter)] text-sm font-bold text-[#1c1c1e]">
                        {name}
                      </p>
                      <p className="font-[family-name:var(--font-inter)] text-xs text-[#7C7C7C]">
                        {institution} &middot; {department}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          APPLICATION FORM
      ══════════════════════════════════════════════════════════════════ */}
      <section id="application-form" className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-3xl">
          <motion.div
            ref={formRef}
            variants={stagger}
            initial="hidden"
            animate={formInView ? "visible" : "hidden"}
          >
            <motion.div variants={childFade} className="mb-12 text-center">
              <p className="mb-4 font-[family-name:var(--font-inter)] text-xs font-semibold tracking-[0.25em] text-[#8B0000] uppercase">
                JOIN US
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1c1c1e] md:text-4xl">
                Ready to Apply? Let&apos;s Talk.
              </h2>
              <p className="mx-auto mt-4 max-w-xl font-[family-name:var(--font-inter)] text-base leading-relaxed text-[#7C7C7C]">
                Applications are reviewed on a rolling basis. Fill in the form below and our team
                will be in touch within five business days.
              </p>
            </motion.div>

            {submitted ? (
              <motion.div
                variants={childFade}
                className="rounded-2xl border border-green-200 bg-green-50 px-8 py-12 text-center"
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <circle cx="16" cy="16" r="14" stroke="#16a34a" strokeWidth="2" />
                    <path d="M10 16 L14 20 L22 12" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="mb-3 font-[family-name:var(--font-inter)] text-xs font-semibold tracking-[0.25em] text-[#8B0000] uppercase">
                  APPLICATION RECEIVED
                </p>
                <h3 className="mb-3 font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#1c1c1e]">
                  Thank you for applying to Providence CIG.
                </h3>
                <p className="font-[family-name:var(--font-inter)] text-base leading-relaxed text-[#7C7C7C]">
                  We have received your application and will be in touch within five business days.
                  In the meantime, feel free to explore our services and learn more about what we do.
                </p>
              </motion.div>
            ) : (
              <motion.form
                variants={childFade}
                onSubmit={handleSubmit}
                noValidate
                className="space-y-7"
              >
                {/* Full Name */}
                <FormInput label="Full Name" id="fullName" error={errors.fullName} required>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    value={fields.fullName}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className={errors.fullName ? inputErrorClass : inputClass}
                  />
                </FormInput>

                {/* Email */}
                <FormInput label="Email Address" id="email" error={errors.email} required>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={fields.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={errors.email ? inputErrorClass : inputClass}
                  />
                </FormInput>

                {/* Institution */}
                <FormInput label="School / University" id="institution" error={errors.institution} required>
                  <input
                    id="institution"
                    name="institution"
                    type="text"
                    autoComplete="organization"
                    value={fields.institution}
                    onChange={handleChange}
                    placeholder="e.g. University of Bamenda"
                    className={errors.institution ? inputErrorClass : inputClass}
                  />
                </FormInput>

                {/* Graduation Year */}
                <FormInput label="Graduation Year" id="graduationYear" error={errors.graduationYear} required>
                  <input
                    id="graduationYear"
                    name="graduationYear"
                    type="number"
                    min="2020"
                    max="2035"
                    value={fields.graduationYear}
                    onChange={handleChange}
                    placeholder="e.g. 2026"
                    className={errors.graduationYear ? inputErrorClass : inputClass}
                  />
                </FormInput>

                {/* Preferred Department */}
                <FormInput label="Preferred Department" id="preferredDept" error={errors.preferredDept} required>
                  <select
                    id="preferredDept"
                    name="preferredDept"
                    value={fields.preferredDept}
                    onChange={handleChange}
                    className={cn(
                      errors.preferredDept ? inputErrorClass : inputClass,
                      "appearance-none cursor-pointer"
                    )}
                  >
                    <option value="" disabled>
                      Select your preferred department
                    </option>
                    <option value="poultry-operations">Poultry Operations</option>
                    <option value="feed-formulation">Feed Formulation Lab</option>
                    <option value="advisory">Agricultural Advisory</option>
                    <option value="supply-chain">
                      Supply Chain &amp; Market Operations
                    </option>
                    <option value="open">Open to Placement</option>
                  </select>
                </FormInput>

                {/* CV Upload */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="cvUpload"
                    className="font-[family-name:var(--font-inter)] text-sm font-semibold text-[#1a1a1a]"
                  >
                    Upload CV or Resume
                    <span className="ml-1 text-[#8B0000]" aria-hidden="true">
                      *
                    </span>
                    <span className="ml-2 font-normal text-[#7C7C7C]">
                      (.pdf, .doc, .docx — max 5 MB)
                    </span>
                  </label>

                  <div
                    className={cn(
                      "flex cursor-pointer flex-col items-center gap-3 rounded-lg border-2 border-dashed px-6 py-8 text-center transition",
                      cvError
                        ? "border-[#8B0000] bg-red-50"
                        : cvFile
                        ? "border-[#8B0000]/50 bg-[#f5f4f2]"
                        : "border-gray-300 bg-white hover:border-[#8B0000]/50"
                    )}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      id="cvUpload"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="sr-only"
                    />

                    {/* Upload icon */}
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M16 20 L16 8"
                        stroke={cvFile ? "#8B0000" : "#9ca3af"}
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M11 13 L16 8 L21 13"
                        stroke={cvFile ? "#8B0000" : "#9ca3af"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6 22 L6 24 Q6 26 8 26 L24 26 Q26 26 26 24 L26 22"
                        stroke={cvFile ? "#8B0000" : "#9ca3af"}
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>

                    {cvFile ? (
                      <div>
                        <p className="font-[family-name:var(--font-inter)] text-sm font-semibold text-[#8B0000]">
                          {cvFile.name}
                        </p>
                        <p className="font-[family-name:var(--font-inter)] text-xs text-[#7C7C7C]">
                          {(cvFile.size / 1024).toFixed(0)} KB &middot; Click to change
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="font-[family-name:var(--font-inter)] text-sm text-[#7C7C7C]">
                          Click to upload your CV or resume
                        </p>
                        <p className="font-[family-name:var(--font-inter)] text-xs text-gray-400">
                          PDF, DOC, or DOCX up to 5 MB
                        </p>
                      </div>
                    )}
                  </div>

                  {(cvError || errors.cv) && (
                    <p className="font-[family-name:var(--font-inter)] text-xs text-[#8B0000]">
                      {cvError || errors.cv}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className={cn(
                    "w-full rounded-lg bg-[#8B0000] px-8 py-4",
                    "font-[family-name:var(--font-inter)] text-sm font-semibold tracking-wide text-white",
                    "transition-all duration-300",
                    submitting
                      ? "cursor-not-allowed opacity-70"
                      : "hover:bg-[#6e0000] active:scale-[0.99]"
                  )}
                >
                  {submitting ? "Submitting…" : "Submit My Application"}
                </button>

                <p className="text-center font-[family-name:var(--font-inter)] text-xs text-[#7C7C7C]">
                  By submitting this form you agree for Providence CIG to retain your information
                  for the purposes of this application.
                </p>
              </motion.form>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}
