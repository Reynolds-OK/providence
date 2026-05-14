"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

const NAV = [
  {
    group: "Home Page",
    items: [
      { label: "Hero", href: "/admin/hero" },
      { label: "Services", href: "/admin/services" },
      { label: "Why Choose Us", href: "/admin/why-choose-us" },
      { label: "How We Work", href: "/admin/how-we-work" },
      { label: "Bottom CTA", href: "/admin/bottom-cta" },
    ],
  },
  {
    group: "Content",
    items: [
      { label: "Testimonials", href: "/admin/testimonials" },
      { label: "Intern Testimonials", href: "/admin/intern-testimonials" },
      { label: "Team Members", href: "/admin/team" },
    ],
  },
  {
    group: "Settings",
    items: [
      { label: "Users", href: "/admin/users" },
    ],
  },
];

export default function AdminSidebar({ email }: { email?: string | null }) {
  const pathname = usePathname();

  return (
    <aside className="flex w-60 flex-col border-r border-gray-100 bg-white">
      <div className="border-b border-gray-100 px-5 py-5">
        <p className="font-[family-name:var(--font-inter)] text-[10px] font-semibold tracking-[0.2em] text-[#8B0000] uppercase">
          Admin Panel
        </p>
        <p className="mt-0.5 font-[family-name:var(--font-playfair)] text-base font-bold text-[#1c1c1e]">
          Providence CIG
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {NAV.map((group) => (
          <div key={group.group} className="mb-6">
            <p className="mb-1.5 px-2 font-[family-name:var(--font-inter)] text-[10px] font-semibold tracking-[0.18em] text-gray-400 uppercase">
              {group.group}
            </p>
            {group.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center rounded-lg px-3 py-2 font-[family-name:var(--font-inter)] text-sm transition-colors",
                  pathname === item.href
                    ? "bg-[#8B0000]/8 font-semibold text-[#8B0000]"
                    : "text-[#4a4a4a] hover:bg-gray-50 hover:text-[#1c1c1e]"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      <div className="border-t border-gray-100 px-4 py-4">
        {email && (
          <p className="mb-3 truncate font-[family-name:var(--font-inter)] text-xs text-gray-400">
            {email}
          </p>
        )}
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 font-[family-name:var(--font-inter)] text-sm text-[#4a4a4a] transition-colors hover:border-[#8B0000]/30 hover:text-[#8B0000] focus:outline-none"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
