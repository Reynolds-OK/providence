@AGENTS.md

# Providence CIG — Claude Code Context

## Project
Next.js 16 website for Providence Common Initiative Group, an agribusiness in Bambui, Cameroon. See README.md for full project details.

## Brand rules
- Colors: Crimson `#8B0000` (CTAs), Slate `#808080` (nav/body), Taupe `#8C8578` (subtle bg), White `#FFFFFF`, Charcoal `#1c1c1e` (dark sections)
- Never introduce colors outside this palette (except WhatsApp green `#25D366` on the floating button)
- No emoji anywhere on the site — use inline SVG icons or lucide-react only
- Headings: `font-[family-name:var(--font-playfair)]`
- Body: `font-[family-name:var(--font-inter)]`

## Conventions
- All client components start with `"use client"`
- Import alias `@/` maps to `src/`
- Utility: `import { cn } from "@/lib/utils"` (clsx + tailwind-merge)
- Inline SVG icons are preferred for brand-specific iconography; lucide-react for utility icons
- Framer Motion for animations; react-intersection-observer for scroll triggers
- No comments explaining what code does — only add a comment when the WHY is non-obvious
