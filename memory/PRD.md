# CrookSec Website - PRD

## Project Overview
A modern, futuristic, high-end technology company website for CrookSec — a defensive security, AI & technology startup. Built to feel like premium companies (Palantir, OpenAI, Vercel).

## Architecture
- **Frontend**: React SPA, TailwindCSS, Framer Motion, Three.js (vanilla), lucide-react
- **Backend**: FastAPI + MongoDB (contact form storage)
- **Fonts**: Space Grotesk (headings) + Inter (body) + JetBrains Mono (code)
- **Theme**: Dark mode only — #020617 background, electric blue (#00F0FF) + purple (#7000FF) neon accents

## What's Been Implemented (Mar 2026)

### Frontend Components
- `Navbar.jsx` — Floating glassmorphism pill navbar, scroll-aware, mobile responsive
- `Hero.jsx` — Full-screen hero with Three.js particle network, Framer Motion staggered title entrance, parallax scroll effect (`useScroll` + `useTransform`), animated scroll indicator
- `About.jsx` — 2-column layout, `whileInView` slide-in from sides, staggered feature cards with `whileHover` lift effects
- `Services.jsx` — 9 service cards, `whileInView` container + `staggerChildren`, icon spin on hover, `whileHover` glow + lift
- `TechStack.jsx` — Infinite CSS marquee (2 rows, opposite directions), `whileInView` title reveal
- `WhyChoose.jsx` — 6 feature cards, `staggerChildren` grid, `whileHover` + spring icon animations
- `Portfolio.jsx` — 6 project cards, `whileInView` stagger, image scale on hover, tag color animations
- `Contact.jsx` — Terminal-style form, staggered field reveal (`fieldVariants` custom delay), `AnimatePresence` for success/error messages, social icons with `whileHover` lift
- `Footer.jsx` — Brand, link columns, social links
- `FloatingChat.jsx` — Fixed bottom-right chat bubble: gradient Bot button, dual pulse ring animations, "Chat with NOVA" tooltip, red unread badge, spring-animated popup (480×384px glassmorphism) with same NOVA persona, typing dots, quick chips, AnimatePresence open/close, minimize/close buttons

### Backend Endpoints
- `GET /api/` — Health check
- `POST /api/contact` — Store contact submission to MongoDB
- `GET /api/contact` — Retrieve all contact submissions

## Core Framer Motion Effects Applied
- `whileInView` + `viewport={{ once: true, amount: 0.2 }}` — Scroll-triggered reveals on all sections
- `variants` with `staggerChildren` — Cascading grid card animations
- `whileHover` — Lift, glow, scale on cards and buttons
- `whileTap` — Press feedback on CTAs
- `useScroll` + `useTransform` — Hero parallax (content moves slower than scroll)
- `AnimatePresence` — Smooth mount/unmount of success/error states
- `animate` with `repeat: Infinity` — Scroll indicator pulse, arrow bounce, stat hover glow

## User Personas
- CISOs / CTOs evaluating security vendors
- Business founders seeking AI + software development partners
- Enterprise procurement teams

## Backlog / Next Items
- P0: Add real project images / case studies
- P1: Blog / insights section
- P1: Admin panel to manage portfolio projects dynamically
- P2: Email notifications for contact form (SendGrid/Resend)
- P2: Careers page
- P2: Dark/light mode toggle
