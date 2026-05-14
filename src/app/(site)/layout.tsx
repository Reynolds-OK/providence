import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";
import CookieBanner from "@/components/CookieBanner";
import { readJson } from "@/lib/content";
import type { SiteContent } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = await readJson<SiteContent>("content.json");
  const logo = content.logo ?? "/images/logo.png";

  return (
    <>
      <Navbar logo={logo} />
      <main className="flex-1">{children}</main>
      <Footer logo={logo} />
      <WhatsAppButton />
      <ScrollToTop />
      <CookieBanner />
    </>
  );
}
