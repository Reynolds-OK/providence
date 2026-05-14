import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f5f4f2] flex items-center justify-center px-6">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8">
          <span
            className="text-[10rem] font-black leading-none select-none"
            style={{
              fontFamily: "var(--font-playfair)",
              color: "#8B0000",
              opacity: 0.15,
            }}
          >
            404
          </span>
        </div>
        <div className="-mt-16 relative z-10">
          {/* Chevron motif */}
          <svg
            className="mx-auto mb-6"
            width="48"
            height="28"
            viewBox="0 0 48 28"
            fill="none"
          >
            <path
              d="M2 2L24 26L46 2"
              stroke="#8B0000"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h1
            className="text-4xl md:text-5xl font-bold text-[#1c1c1e] mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Page Not Found
          </h1>
          <p className="text-[#7C7C7C] text-lg mb-10 leading-relaxed">
            The page you are looking for doesn&apos;t exist or may have been
            moved. Let&apos;s get you back to familiar ground.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#8B0000] text-white font-semibold rounded-lg hover:bg-[#7a0000] transition-colors"
            >
              Back to Homepage
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#8B0000] text-[#8B0000] font-semibold rounded-lg hover:bg-[#8B0000] hover:text-white transition-colors"
            >
              Contact Us
            </Link>
          </div>
          <div className="mt-12 pt-8 border-t border-[#8C8578/25]">
            <p className="text-sm text-[#7C7C7C] mb-4">Or jump to a section:</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {[
                { label: "Services", href: "/services/poultry" },
                { label: "About Us", href: "/about" },
                { label: "Internship", href: "/internship" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[#8B0000] underline underline-offset-2 hover:opacity-70 transition-opacity"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
