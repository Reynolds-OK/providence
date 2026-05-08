import Link from "next/link";
import { ArrowRight } from "lucide-react";

const services = [
  {
    href: "/services/poultry",
    number: "01",
    title: "Poultry Production",
    description:
      "Fresh eggs and quality broilers, supplied reliably to retailers and wholesalers across the region. Consistent weekly production you can build your business around.",
    cta: "Explore Poultry Supply",
  },
  {
    href: "/services/feed",
    number: "02",
    title: "Custom Animal Feed",
    description:
      "Scientifically formulated feed blends, engineered around your specific livestock and production goals. Not generic — yours.",
    cta: "Explore Custom Feed",
  },
  {
    href: "/services/advisory",
    number: "03",
    title: "Agricultural Advisory",
    description:
      "Business guidance for farmers who are ready to move from survival to scale. Planning, finance, markets, and growth — done properly.",
    cta: "Explore Advisory",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1c1c1e] to-[#2d1a1a] py-28 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: "repeating-linear-gradient(45deg, #8B0000 0, #8B0000 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }}
        />
        <p className="text-xs tracking-widest text-[#8B0000] uppercase mb-4 font-medium">
          WHAT WE DO
        </p>
        <h1
          className="text-5xl md:text-6xl font-bold text-white mb-6"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Three Pillars.
          <br />
          One Purpose.
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
          Every service we offer is built around the same belief: African agriculture deserves better — better inputs, better business tools, and better support.
        </p>
      </section>

      {/* Services */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto space-y-8">
          {services.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="group block border border-[#8C8578/15] rounded-2xl p-10 md:p-14 hover:border-[#8B0000]/30 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <span
                  className="text-8xl font-black text-[#8B0000] opacity-10 leading-none select-none shrink-0"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {service.number}
                </span>
                <div className="flex-1">
                  <h2
                    className="text-3xl font-bold text-[#1c1c1e] mb-3 group-hover:text-[#8B0000] transition-colors"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {service.title}
                  </h2>
                  <p className="text-[#7C7C7C] text-lg leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div className="shrink-0">
                  <span className="inline-flex items-center gap-2 text-[#8B0000] font-semibold group-hover:gap-4 transition-all">
                    {service.cta}
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#8B0000] py-20 px-6 text-center">
        <h2
          className="text-4xl font-bold text-white mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Not Sure Where to Start?
        </h2>
        <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
          Talk to us. We will help you figure out what your operation needs — with no pressure and no obligation.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-[#8B0000] transition-colors"
        >
          Get in Touch
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </div>
  );
}
