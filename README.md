# Providence Common Initiative Group — Website

Official website for **Providence Common Initiative Group (Providence CIG)**, an integrated agribusiness headquartered in Bambui, North West Region, Cameroon. The business operates across three verticals: commercial poultry production, customized animal feed manufacturing, and agricultural business advisory services.

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, services overview, why choose us (animated stats), how we work, testimonials, partners, CTA |
| `/about` | Our story, mission & vision, values, team, partners & supporters |
| `/services` | Services index |
| `/services/poultry` | Poultry production — eggs and broilers |
| `/services/feed` | Custom animal feed formulation |
| `/services/advisory` | Agricultural business advisory |
| `/internship` | Programme overview, experience areas, details table, testimonials, application form |
| `/contact` | Enquiry form with Google Maps embed |
| `*` | Custom 404 page |

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Carousel:** Embla Carousel
- **Scroll detection:** react-intersection-observer
- **Counters:** react-countup
- **Forms:** React controlled components with inline validation
- **Fonts:** Playfair Display (headings), Inter (body) via `next/font/google`

---

## Brand

| Role | Color | Hex |
|------|-------|-----|
| Primary / CTAs | Deep Crimson | `#8B0000` |
| Navigation / Body | Slate Gray | `#808080` |
| Subtle backgrounds | Warm Taupe | `#8C8578` |
| Surfaces | Pure White | `#FFFFFF` |
| Dark sections | Charcoal | `#1c1c1e` |

---

## Project Structure

```
src/
├── app/
│   ├── _sections/          # Homepage section components
│   │   ├── HeroSection.tsx
│   │   ├── ServicesStrip.tsx
│   │   ├── WhyChooseUs.tsx
│   │   ├── HowWeWork.tsx
│   │   ├── Testimonials.tsx
│   │   ├── PartnersStrip.tsx
│   │   └── BottomCTA.tsx
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── internship/page.tsx
│   ├── services/
│   │   ├── page.tsx
│   │   ├── poultry/page.tsx
│   │   ├── feed/page.tsx
│   │   └── advisory/page.tsx
│   ├── not-found.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Navbar.tsx          # Sticky navbar, dropdown, mobile overlay
│   ├── Footer.tsx          # 4-column footer, newsletter strip
│   ├── WhatsAppButton.tsx  # Floating WhatsApp CTA (bottom-right)
│   ├── ScrollToTop.tsx     # Scroll-to-top button
│   ├── CookieBanner.tsx    # GDPR cookie consent
│   ├── SectionLabel.tsx    # Eyebrow label component
│   └── ChevronDivider.tsx  # Brand chevron SVG motif
└── lib/
    └── utils.ts            # cn() utility (clsx + tailwind-merge)
```

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run lint    # ESLint
```

---

## Deployment

Deployed on **Vercel**. Every push to `main` triggers an automatic deployment.

To deploy manually:
1. Push to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Framework auto-detects as Next.js — no config needed

---

## Pending (client to supply)

- [ ] Logo PNG with transparent background
- [ ] Real phone numbers (replace `+237679105237`)
- [ ] Hero and section photography
- [ ] Partner logos — MCF FAST and ACE
- [ ] Social media profile URLs
- [ ] Form backend — connect Resend or SendGrid for email delivery
- [ ] Google Analytics 4 measurement ID
- [ ] Team member photos and bios

---

## Contact

**Providence Common Initiative Group**  
Bambui, North West Region, Cameroon  
info@providencecig.com
