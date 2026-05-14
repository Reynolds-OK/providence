import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Providence CIG",
  description:
    "Get in touch with Providence Common Initiative Group in Bambui, Cameroon. Poultry, feed, advisory, internship, we're ready to talk.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
