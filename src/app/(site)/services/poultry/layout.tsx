import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Poultry Production | Providence CIG",
  description:
    "Fresh eggs and quality broilers, supplied reliably to retailers and wholesalers across Cameroon's North West Region.",
};

export default function PoultryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
