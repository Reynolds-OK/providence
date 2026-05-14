import type { Metadata } from "next";
import { readJson } from "@/lib/content";
import type { TeamMember } from "@/lib/types";
import AboutPageClient from "./AboutPageClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Us | Providence Common Initiative Group",
  description:
    "Learn about Providence CIG — our story, mission, values, and the team driving agribusiness growth in Cameroon's North West Region.",
};

export default async function AboutPage() {
  const team = await readJson<TeamMember[]>("team.json");
  return <AboutPageClient team={team} />;
}
