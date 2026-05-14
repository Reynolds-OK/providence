import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Animal Feed | Providence CIG",
  description:
    "Scientifically formulated animal feed blends, engineered around your specific livestock, production goals, and budget.",
};

export default function FeedLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
