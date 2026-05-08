import type { Metadata } from "next";
import HeroSection from "@/app/_sections/HeroSection";
import ServicesStrip from "@/app/_sections/ServicesStrip";
import WhyChooseUs from "@/app/_sections/WhyChooseUs";
import HowWeWork from "@/app/_sections/HowWeWork";
import Testimonials from "@/app/_sections/Testimonials";
import PartnersStrip from "@/app/_sections/PartnersStrip";
import BottomCTA from "@/app/_sections/BottomCTA";

export const metadata: Metadata = {
  title: "Providence CIG | Poultry, Animal Feed & Agribusiness Advisory in Bambui, Cameroon",
  description:
    "Providence CIG is an agribusiness in Bambui, Cameroon, specializing in commercial poultry, custom animal feed, and advisory services for farmers and retailers.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesStrip />
      <WhyChooseUs />
      <HowWeWork />
      <Testimonials />
      <PartnersStrip />
      <BottomCTA />
    </>
  );
}
