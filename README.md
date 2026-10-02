# 🎬 Cinematic Portfolio

A **documentary-style, cinematic portfolio website** built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS v4**. The site is designed to feel like watching a film — letterbox bars, film grain, scene cuts on scroll, a soundtrack you can control, and choreographed motion throughout.

> "Founder & Engineer. Building products at the intersection of design, technology, and story."

---

## ✨ Features

### 🎞️ Cinematic presentation layer
- **Letterbox intro** — black bars open on first load, like the start of a film.
- **Film grain overlay** — a subtle animated grain texture across the whole page.
- **Scene cuts** — short transition flashes between sections as you scroll.
- **Scroll-triggered choreography** — every section animates in with staggered, filmic easing (`cubic-bezier(0.16, 1, 0.3, 1)`).
- **`prefers-reduced-motion` support** — all heavy motion (letterbox, grain, cuts) automatically degrades for users who request it.

### 📑 Sections
| Section | Description |
| --- | --- |
| **Hero** | Full-screen animated title with per-letter reveal, subtitle, scroll cue, and a WebGL particle background. |
| **About** | Editorial bio with typographic contrast (display / serif / mono). |
| **Projects** | Film-poster-style project cards opening into a modal **case study** (problem → process → result). |
| **Skills** | Categorized skill set with animated meters. |
| **Timeline** | Career/education journey as a vertical film-strip timeline. |
| **Contact** | Contact form and social links. |

### 🔊 Soundtrack player
A persistent audio player (bottom corner) built on **Howler.js** with:
- Play / pause, next / previous track
- Seek bar and volume slider
- Track list management via a custom `useAudioPlayer` hook

### 🧰 UI primitives
Headless, accessible components built on **Radix UI** (`dialog`, `slider`, `tabs`, `tooltip`) and styled with **cva** + **tailwind-merge** + **clsx**.

---

## 🛠️ Tech Stack

| Layer | Choices |
| --- | --- |
| Framework | **Next.js 16** (App Router) · **React 19** · **TypeScript 5** |
| Styling | **Tailwind CSS v4** (CSS-first config via `@tailwindcss/postcss`) |
| Motion | **Framer Motion** · **GSAP** · **Lenis** (smooth scroll) |
| 3D / Particles | **Three.js** · **React Three Fiber** · **Drei** |
| Audio | **Howler** |
| UI | **Radix UI** · **cva** · **lucide-react** · **phosphor-react** |
| Fonts | Google Fonts via `next/font`: **Bebas Neue** (display), **Fraunces** (serif), **DM Sans** (body), **JetBrains Mono** (mono) |
| Linting | **ESLint 9** with `eslint-config-next` |

---

## 📁 Project Structure

```
cinematic-portfolio/
├── public/                  # Static assets (images, audio, favicon)
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout: fonts, header, cinematic wrapper
│   │   ├── page.tsx         # Home page — composes all sections
│   │   ├── globals.css      # Tailwind v4 theme, grain, letterbox, tokens
│   │   └── music/           # Music route
│   ├── components/
│   │   ├── CinematicWrapper.tsx   # Letterbox, scene cuts, reduced-motion
│   │   ├── GlobalHeader.tsx       # Fixed navigation header
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Timeline.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── AudioPlayer.tsx
│   │   └── ui/
│   │       ├── button.tsx
│   │       ├── dialog.tsx
│   │       ├── slider.tsx
│   │       └── particle-background.tsx
│   └── lib/
│       ├── fonts.ts         # next/font Google font definitions
│       ├── use-audio.ts     # Howler-backed audio player hook
│       └── utils.ts         # cn() class helper
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
└── eslint.config.mjs
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js 20+**
- **npm** (or pnpm / yarn / bun)

### 1. Clone the repository

```bash
git clone https://github.com/girishlade111/cinematic-portfolio.git
cd cinematic-portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production build

```bash
npm run build   # create an optimized production build
npm run start   # serve the production build
```

---

## 📜 Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Create an optimized production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

---

## ⚙️ Configuration Notes

- **Tailwind v4** — configured entirely in `src/app/globals.css` with `@import "tailwindcss"` and `@theme`; `postcss.config.mjs` only loads `@tailwindcss/postcss`. There is no `tailwind.config.ts`.
- **Path aliases** — `@/*` maps to `src/*` (see `tsconfig.json`).
- **Environment variables** — any `.env*` file is git-ignored. Create `.env.local` for local secrets.
- **Dependencies ignored** — `node_modules/`, `.next/`, `out/`, and `build/` are all excluded from version control via `.gitignore`.

---

## 🗺️ Roadmap

- [ ] Individual case-study pages per project
- [ ] MDX-powered writing/blog section
- [ ] Dark/light film-stock color themes
- [ ] CMS integration for projects and timeline entries
- [ ] E2E tests (Playwright) and CI workflow

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m "Add amazing feature"`
4. Push the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is private and unlicensed for redistribution unless otherwise stated.

---

## 👤 Author

**Girish Lade** — Founder & Engineer

- GitHub: [@girishlade111](https://github.com/girishlade111)

Built by Girish Lade — [ladestack.in](https://ladestack.in)
