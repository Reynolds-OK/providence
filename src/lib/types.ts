export interface HeroData {
  eyebrow: string;
  headline: string;
  subheadline: string;
  primaryCTA: string;
  secondaryCTA: string;
  backgroundImage: string;
}

export interface ServiceCard {
  image: string;
  title: string;
  description: string;
  href: string;
  type: string;
}

export interface ServicesData {
  eyebrow: string;
  headline: string;
  subheadline: string;
  cards: ServiceCard[];
}

export interface DifferentiatorData {
  id: string;
  title: string;
  description: string;
}

export interface StatData {
  end: number;
  suffix: string;
  label: string;
  duration: number;
}

export interface WhyChooseUsData {
  eyebrow: string;
  headline: string;
  body: string;
  differentiators: DifferentiatorData[];
  stats: StatData[];
}

export interface StepData {
  number: string;
  title: string;
  description: string;
}

export interface HowWeWorkData {
  eyebrow: string;
  headline: string;
  steps: StepData[];
}

export interface BottomCTAData {
  headline: string;
  body: string;
  buttonText: string;
}

export interface SiteContent {
  hero: HeroData;
  services: ServicesData;
  whyChooseUs: WhyChooseUsData;
  howWeWork: HowWeWorkData;
  bottomCTA: BottomCTAData;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  location: string;
  initials: string;
}

export interface TeamMember {
  id: string;
  initials: string;
  name: string;
  title: string;
  bio: string;
  photo?: string | null;
}

export interface InternTestimonial {
  id: string;
  initials: string;
  name: string;
  institution: string;
  department: string;
  quote: string;
}
