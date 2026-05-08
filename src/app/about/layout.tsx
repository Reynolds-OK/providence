import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Providence Common Initiative Group",
  description:
    "More than a business, a mission in motion. Learn about Providence CIG's story, mission, values, team, and partners in Bambui, Cameroon.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
