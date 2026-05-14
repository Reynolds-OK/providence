import type { Metadata } from "next";
import HeroSection from "@/app/_sections/HeroSection";
import ServicesStrip from "@/app/_sections/ServicesStrip";
import WhyChooseUs from "@/app/_sections/WhyChooseUs";
import HowWeWork from "@/app/_sections/HowWeWork";
import Testimonials from "@/app/_sections/Testimonials";
import PartnersStrip from "@/app/_sections/PartnersStrip";
import BottomCTA from "@/app/_sections/BottomCTA";
import { readJson } from "@/lib/content";
import type { SiteContent, Testimonial } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Providence CIG | Poultry, Animal Feed & Agribusiness Advisory in Bambui, Cameroon",
  description:
    "Providence CIG is an agribusiness in Bambui, Cameroon, specializing in commercial poultry, custom animal feed, and advisory services for farmers and retailers.",
};

export default async function HomePage() {
  const content = await readJson<SiteContent>("content.json");
  const testimonials = await readJson<Testimonial[]>("testimonials.json");

  return (
    <>
      <HeroSection data={content.hero} />
      <ServicesStrip data={content.services} />
      <WhyChooseUs data={content.whyChooseUs} />
      <HowWeWork data={content.howWeWork} />
      <Testimonials data={testimonials} />
      <PartnersStrip />
      <BottomCTA data={content.bottomCTA} />
    </>
  );
}
