# Agent Rules

This project uses **Next.js 16 App Router** with TypeScript and Tailwind CSS.

## Key facts for agents
- All pages use the App Router (`src/app/`) — no Pages Router
- `"use client"` is required on any component using hooks or browser APIs
- Font CSS variables: `--font-playfair` (headings), `--font-inter` (body)
- Brand primary color: `#8B0000` (Deep Crimson)
- Import alias `@/` → `src/`

## Before writing any code
Read the relevant files in context. Do not assume API shapes, component interfaces, or file locations — verify by reading first.

## Do not
- Add comments explaining what the code does
- Introduce new dependencies without checking if an existing one covers the use case
- Use emoji anywhere (use SVG icons or lucide-react instead)
- Add colors outside the brand palette
