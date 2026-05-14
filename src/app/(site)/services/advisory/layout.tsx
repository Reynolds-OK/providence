import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agricultural Advisory | Providence CIG",
  description:
    "Business guidance for farmers ready to move from survival to scale. Planning, financing, market access, and growth strategy.",
};

export default function AdvisoryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
