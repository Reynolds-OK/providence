import { readJson } from "@/lib/content";
import type { InternTestimonial } from "@/lib/types";
import InternshipPageClient from "./InternshipPageClient";

export const dynamic = "force-dynamic";

export default function InternshipPage() {
  const internTestimonials = readJson<InternTestimonial[]>("intern-testimonials.json");
  return <InternshipPageClient internTestimonials={internTestimonials} />;
}
