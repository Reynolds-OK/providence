import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Internship Programme | Providence CIG",
  description:
    "Hands-on agricultural internships in Bambui for students and young graduates. Real work, real mentorship, real impact.",
};

export default function InternshipLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
