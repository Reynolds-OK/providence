"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import type { Testimonial } from "@/lib/types";

function QuoteMark() {
  return (
    <svg width="36" height="28" viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M0 28 L0 16 C0 7.163 5.373 1.92 16.12 0 L17.88 3.36 C12.787 4.587 10.24 7.147 10.24 11.04 L10.24 12 L16 12 L16 28 L0 28Z" fill="#8B0000" opacity="0.18" />
      <path d="M20 28 L20 16 C20 7.163 25.373 1.92 36.12 0 L37.88 3.36 C32.787 4.587 30.24 7.147 30.24 11.04 L30.24 12 L36 12 L36 28 L20 28Z" fill="#8B0000" opacity="0.18" />
    </svg>
  );
}

function TestimonialCard({ quote, name, role, location, initials }: Testimonial) {
  return (
    <div className="flex h-full flex-col rounded-2xl bg-white p-8 shadow-md">
      <div className="mb-5">
        <QuoteMark />
      </div>
      <blockquote className="flex-1 font-[family-name:var(--font-inter)] text-sm leading-relaxed text-[#1c1c1e]">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div className="mt-6 flex items-center gap-4">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#8B0000] font-[family-name:var(--font-inter)] text-sm font-bold text-white"
          aria-hidden="true"
        >
          {initials}
        </div>
        <div>
          <p className="font-[family-name:var(--font-inter)] text-sm font-semibold text-[#1c1c1e]">{name}</p>
          <p className="font-[family-name:var(--font-inter)] text-xs text-[#7C7C7C]">
            {role} &mdash; {location}
          </p>
        </div>
      </div>
    </div>
  );
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

export default function Testimonials({ data }: { data: Testimonial[] }) {
  const autoplayPlugin = useRef(Autoplay({ delay: 4500, stopOnInteraction: true }));
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [autoplayPlugin.current]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const { ref: sectionRef, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section className="bg-[#f5f4f2] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="mb-3 font-[family-name:var(--font-inter)] text-xs font-semibold tracking-[0.22em] text-[#8B0000] uppercase">
            What Our Clients Say
          </p>
          <h2 className="mx-auto max-w-2xl font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1c1c1e] md:text-5xl">
            Trusted by Retailers and Farmers Across.
          </h2>
        </div>

        <motion.div
          ref={sectionRef}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="hidden gap-6 md:grid md:grid-cols-3"
        >
          {data.map((t) => (
            <motion.div key={t.id} variants={cardVariants}>
              <TestimonialCard {...t} />
            </motion.div>
          ))}
        </motion.div>

        <div className="md:hidden">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {data.map((t) => (
                <div key={t.id} className="min-w-0 flex-[0_0_90%] pl-1" style={{ paddingRight: "1rem" }}>
                  <TestimonialCard {...t} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {data.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000] ${
                  selectedIndex === index ? "w-6 bg-[#8B0000]" : "w-2 bg-[#8B0000]/25"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
