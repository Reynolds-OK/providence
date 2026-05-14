import Link from "next/link";
import type { BottomCTAData } from "@/lib/types";

export default function BottomCTA({ data }: { data: BottomCTAData }) {
  return (
    <section className="bg-[#8B0000] px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-white md:text-5xl">
          {data.headline}
        </h2>
        <p className="mx-auto mt-5 max-w-xl font-[family-name:var(--font-inter)] text-base leading-relaxed text-white/80">
          {data.body}
        </p>
        <div className="mt-10">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg border-2 border-white bg-transparent px-10 py-4 font-[family-name:var(--font-inter)] text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-white hover:text-[#8B0000] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#8B0000]"
          >
            {data.buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
