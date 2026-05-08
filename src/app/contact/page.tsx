"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapPin, Phone, Mail, MessageCircle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Animation helpers ──────────────────────────────────────────────────── */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const childFade = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/* ─── Types ──────────────────────────────────────────────────────────────── */

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  enquiry: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  enquiry?: string;
  message?: string;
}

const enquiryOptions = [
  "Poultry Supply",
  "Custom Animal Feed",
  "Agricultural Advisory",
  "Internship Programme",
  "Partnership or Collaboration",
  "Other",
];

/* ─── Contact info item ──────────────────────────────────────────────────── */

function ContactItem({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#8B0000]/10">
        <Icon size={18} strokeWidth={1.75} className="text-[#8B0000]" />
      </div>
      <div>
        <p className="mb-0.5 font-[family-name:var(--font-inter)] text-xs font-semibold uppercase tracking-widest text-[#7C7C7C]">
          {label}
        </p>
        <div className="font-[family-name:var(--font-inter)] text-sm leading-relaxed text-[#1a1a1a]">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ─── Field wrapper with error ───────────────────────────────────────────── */

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block font-[family-name:var(--font-inter)] text-sm font-medium text-[#1a1a1a]">
        {label}
        {required && <span className="ml-0.5 text-[#8B0000]">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 font-[family-name:var(--font-inter)] text-xs text-[#8B0000]">
          {error}
        </p>
      )}
    </div>
  );
}

/* ─── Contact Form (client component) ───────────────────────────────────── */

function ContactForm() {
  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    phone: "",
    enquiry: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const inputClass = (hasError?: boolean) =>
    cn(
      "border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] transition text-[#1a1a1a] font-[family-name:var(--font-inter)] text-sm bg-white placeholder-gray-400",
      hasError
        ? "border-[#8B0000] ring-1 ring-[#8B0000]"
        : "border-gray-300"
    );

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!form.fullName.trim()) errs.fullName = "Full name is required.";
    if (!form.email.trim()) {
      errs.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!form.enquiry) errs.enquiry = "Please select an enquiry type.";
    if (!form.message.trim()) errs.message = "Message is required.";
    return errs;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="flex flex-col items-center justify-center rounded-2xl border border-green-100 bg-green-50 px-8 py-16 text-center"
      >
        <CheckCircle size={52} strokeWidth={1.5} className="mb-5 text-green-600" />
        <h3 className="mb-2 font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#1c1c1e]">
          Message Received!
        </h3>
        <p className="max-w-sm font-[family-name:var(--font-inter)] text-sm leading-relaxed text-[#7C7C7C]">
          Thank you — We&apos;ve received your message. Our team will get back to you shortly.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({ fullName: "", email: "", phone: "", enquiry: "", message: "" });
          }}
          className="mt-8 rounded-lg border border-[#8B0000] px-6 py-2.5 font-[family-name:var(--font-inter)] text-sm font-semibold text-[#8B0000] transition hover:bg-[#8B0000] hover:text-white"
        >
          Send Another Message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Full Name */}
      <Field label="Full Name" required error={errors.fullName}>
        <input
          type="text"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="e.g. Amara Nkemdirim"
          className={inputClass(!!errors.fullName)}
          autoComplete="name"
        />
      </Field>

      {/* Email + Phone row */}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Email Address" required error={errors.email}>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={inputClass(!!errors.email)}
            autoComplete="email"
          />
        </Field>
        <Field label="Phone Number">
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+237 XXX XXX XXX"
            className={inputClass(false)}
            autoComplete="tel"
          />
        </Field>
      </div>

      {/* Enquiry type */}
      <Field label="I am enquiring about" required error={errors.enquiry}>
        <select
          name="enquiry"
          value={form.enquiry}
          onChange={handleChange}
          className={cn(inputClass(!!errors.enquiry), "appearance-none cursor-pointer")}
        >
          <option value="" disabled>
            Select an option…
          </option>
          {enquiryOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </Field>

      {/* Message */}
      <Field label="Your Message" required error={errors.message}>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={6}
          placeholder="Tell us what you need, how we can help, or any questions you have…"
          className={cn(inputClass(!!errors.message), "resize-none")}
        />
      </Field>

      <button
        type="submit"
        className="w-full rounded-lg bg-[#8B0000] py-3.5 font-[family-name:var(--font-inter)] text-sm font-semibold text-white shadow-sm transition hover:bg-[#6e0000] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000] focus-visible:ring-offset-2 active:scale-[0.99]"
      >
        Send Message
      </button>

      <p className="text-center font-[family-name:var(--font-inter)] text-xs text-[#7C7C7C]">
        Fields marked <span className="text-[#8B0000]">*</span> are required. We respect your
        privacy and will never share your details.
      </p>
    </form>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function ContactPage() {
  const { ref: contentRef, inView: contentInView } = useInView({
    threshold: 0.08,
    triggerOnce: true,
  });

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#f5f4f2] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-4 font-[family-name:var(--font-inter)] text-xs font-semibold tracking-[0.22em] text-[#7C7C7C] uppercase"
          >
            CONTACT
          </motion.p>
          <motion.h1
            custom={0.12}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-[family-name:var(--font-playfair)] text-5xl font-bold text-[#1c1c1e]"
          >
            Let&apos;s Start a Conversation.
          </motion.h1>
          <motion.p
            custom={0.24}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-4 max-w-xl font-[family-name:var(--font-inter)] text-base leading-relaxed text-[#7C7C7C]"
          >
            Whether you are a retailer seeking a reliable poultry supplier, a farmer who needs
            custom feed, someone ready for advisory support, or a student interested in our
            internship programme, we want to hear from you.
          </motion.p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          TWO-COLUMN LAYOUT
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            ref={contentRef}
            variants={stagger}
            initial="hidden"
            animate={contentInView ? "visible" : "hidden"}
            className="grid gap-14 lg:grid-cols-2 lg:gap-20"
          >
            {/* ── Left column: Contact info + map ── */}
            <motion.div variants={childFade} className="flex flex-col gap-10">
              {/* Contact details */}
              <div className="space-y-6">
                <div>
                  <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#1c1c1e]">
                    Reach Us Directly
                  </h2>
                  <p className="mt-1 font-[family-name:var(--font-inter)] text-sm text-[#7C7C7C]">
                    Bambui, North West Region.
                  </p>
                </div>

                <ContactItem icon={MapPin} label="Address">
                  <p>
                    Bambui, North West Region, Cameroon
                  </p>
                </ContactItem>

                <ContactItem icon={Phone} label="Phone">
                  <a
                    href="tel:+237XXXXXXXXX"
                    className="transition-colors hover:text-[#8B0000]"
                  >
                    +237 XXX XXX XXX
                  </a>
                </ContactItem>

                <ContactItem icon={Mail} label="Email">
                  <a
                    href="mailto:cig.providence@gmail.com"
                    className="transition-colors hover:text-[#8B0000]"
                  >
                    cig.providence@gmail.com
                  </a>
                </ContactItem>

                <ContactItem icon={MessageCircle} label="WhatsApp">
                  <div className="flex items-center gap-3">
                    <a
                      href="https://wa.me/237XXXXXXXXX"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#25D366] px-4 py-1.5 font-[family-name:var(--font-inter)] text-xs font-semibold text-white transition hover:bg-[#1ebe5a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
                    >
                      <MessageCircle size={13} strokeWidth={2} />
                      Chat on WhatsApp
                    </a>
                  </div>
                </ContactItem>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-100" />

              {/* Business hours */}
              <div>
                <h3 className="mb-4 font-[family-name:var(--font-playfair)] text-lg font-bold text-[#1c1c1e]">
                  Business Hours
                </h3>
                <div className="space-y-2 font-[family-name:var(--font-inter)] text-sm">
                  {[
                    { day: "Monday – Friday", hours: "7:00 AM – 5:00 PM" },
                    { day: "Saturday", hours: "8:00 AM – 1:00 PM" },
                    { day: "Sunday", hours: "Closed" },
                  ].map(({ day, hours }) => (
                    <div key={day} className="flex items-center justify-between gap-4 border-b border-gray-50 pb-2">
                      <span className="text-[#7C7C7C]">{day}</span>
                      <span className="font-medium text-[#1a1a1a]">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Google Maps embed */}
              <div>
                <h3 className="mb-4 font-[family-name:var(--font-playfair)] text-lg font-bold text-[#1c1c1e]">
                  Find Us
                </h3>
                <div className="h-64 overflow-hidden rounded-xl border border-[#8C8578/15] shadow-sm">
                  <iframe
                    title="Providence CIG location — Bambui, Cameroon"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15930.4!2d10.16!3d6.02!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBambui%2C%20Cameroon!5e0!3m2!1sen!2scm!4v1"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </motion.div>

            {/* ── Right column: Contact form ── */}
            <motion.div variants={childFade}>
              <div className="rounded-2xl border border-[#8C8578/15] bg-[#f5f4f2] p-8 shadow-sm lg:p-10">
                <h2 className="mb-2 font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#1c1c1e]">
                  Send Us a Message
                </h2>
                <p className="mb-8 font-[family-name:var(--font-inter)] text-sm leading-relaxed text-[#7C7C7C]">
                  Fill out the form below and we will get back to you as soon as
                  possible. Alternatively, reach us directly via phone or WhatsApp.
                </p>
                <ContactForm />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          BOTTOM CTA STRIP
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#8B0000] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 font-[family-name:var(--font-inter)] text-xs font-semibold tracking-[0.22em] text-white/60 uppercase">
            Prefer to talk?
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-white md:text-4xl">
            We&apos;re Just a Call Away.
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-[family-name:var(--font-inter)] text-sm leading-relaxed text-white/80">
            Our team is available during business hours and responsive on
            WhatsApp. Don&apos;t hesitate to reach out — no enquiry is too small.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="tel:+237XXXXXXXXX"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-7 py-3 font-[family-name:var(--font-inter)] text-sm font-semibold text-[#8B0000] shadow-sm transition hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Phone size={15} strokeWidth={2} />
              Call Us Now
            </a>
            <a
              href="https://wa.me/237XXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/60 bg-white/10 px-7 py-3 font-[family-name:var(--font-inter)] text-sm font-semibold text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <MessageCircle size={15} strokeWidth={2} />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
