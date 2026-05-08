import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";
import CookieBanner from "@/components/CookieBanner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Providence Common Initiative Group | Poultry, Animal Feed and Agricultural Advisory — Bambui, Cameroon",
  description:
    "Providence CIG is an agribusiness based in Bambui, Cameroon, specializing in commercial poultry production, custom animal feed formulation, and agricultural business advisory services for farmers and retailers.",
  keywords: [
    "Providence CIG",
    "agribusiness Cameroon",
    "poultry production Bambui",
    "custom animal feed",
    "agricultural advisory",
    "farming Cameroon",
  ],
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Providence Common Initiative Group",
    description: "Cultivating Growth. Nourishing Lives. Uniting Communities.",
    type: "website",
    locale: "en_CM",
  },
  twitter: {
    card: "summary_large_image",
    title: "Providence Common Initiative Group",
    description: "Cultivating Growth. Nourishing Lives. Uniting Communities.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-full flex flex-col bg-white text-[#1a1a1a]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <ScrollToTop />
        <CookieBanner />
      </body>
    </html>
  );
}
