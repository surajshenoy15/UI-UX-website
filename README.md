# P Suraj Shenoy — Dual-Mode Portfolio

One site, two interfaces. A cinematic gate asks the visitor to choose:
- **UI/UX Designer** — the studio. Azure/navy, 3D fidelity stack, bento about, Figma prototype buttons, scroll-driven light/dark theme.
- **Software Engineer** — the terminal. Green-on-black, a shell that types itself, projects as repos with **Open live project** buttons, experience as a `git log`, skills as a `package.json`.

The choice persists per session (`sessionStorage.mode`); both navs carry a switch back to the gate.

React + Vite + Tailwind CSS. Framer Motion for animation, lucide-react for icons. No emoji.

## Run
```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Design system
Every color is a CSS variable, so the whole page can flip themes at runtime.

| Token   | Dark      | Light     | Use |
|---------|-----------|-----------|-----|
| ink     | `#04091A` | `#F1F5FB` | page background |
| navy    | `#0A1733` | `#FFFFFF` | raised surfaces |
| surface | `#0E2049` | `#FFFFFF` | cards |
| edge    | `#1C3564` | `#D1DBEC` | borders, rules |
| azure   | `#4D8DFF` | `#1D4ED8` | primary accent |
| sky     | `#8FB8FF` | `#3B82F6` | secondary accent |
| fore    | `#FFFFFF` | `#061028` | text |
| mist    | `#A3B6D6` | `#4F5F80` | secondary text |
| paper   | `#FFFFFF` | `#061028` | inverted button fill |

## Scroll-driven theme
Each section carries `data-theme="dark"` or `"light"`. `ThemeScroll` watches which section owns the middle of the viewport and toggles `.theme-light` on `<html>`. Body transitions over 0.9s. The order is dark (hero) → light (about) → **dark (work)** → light (experience) → dark (skills, beyond, contact).

Type: **Syne** (display) · **Space Grotesk** (body) · **JetBrains Mono** (labels, data).

## Cinematic layer
- **Intro title card** — letterbox bars, name types on, cyan rule draws; plays once per session (`sessionStorage`).
- **Film grain + vignette** — fixed SVG-noise overlay stepping at 0.8s, radial vignette; both soften in light mode, grain disabled under reduced motion.
- **Cyan particle field** — a canvas starfield flying past in 3D with pointer parallax and depth streaks; runs behind the hero stack and the contact section, pauses off-screen and in hidden tabs, halves density on mobile.
- **Music is ON by default** and file-first. Drop `bgm-design.mp3` and `bgm-sde.mp3` into `public/` (see `public/BGM_README.txt`); the score starts on the gate click (a user gesture, so browsers allow it), fades in to 0.35, and swaps tracks when you switch modes. The nav toggle mutes, remembered for the session. If a file is missing, a built-in generative score (Web Audio API) plays instead — the site never goes silent by accident. On a mid-session reload, browsers may block autoplay until the first click; the manager handles that quietly.
- **Loader plays on every visit** — letterbox intro card, then the gate.

## Signature element
Three planes suspended in real 3D space (`perspective: 1800px`), wired together by threads that run between them along the Z axis. Drag the slider and the work travels forward: **01 Wireframe** (hatched boxes) → **02 Flow** (a node graph with particles traveling the threads via `animateMotion`) → **03 Interface** (a working dashboard — bars grow, the Publish button pulses, a cursor lands on it). Planes crossfade on overlapping ramps and the whole deck pushes toward you as fidelity rises. Tilt follows the pointer.

## Design DNA section (designer mode)
`src/components/DesignSystem.jsx`, between About and Work:
- **Palette** — swatches read the live CSS variables, so they change when the scroll theme flips. Hover expands a swatch, click copies its hex.
- **Typography** — Syne / Space Grotesk / JetBrains Mono specimen with weight buttons, a size slider, and an editable preview line (click and type).
- **Design wheel** — a draggable hue ring (keyboard-accessible: arrow keys) with Complementary / Analogous / Triadic / Split-comp harmonies, applied live to a preview card that recolors as you drag.

## Spacing system
Two utilities carry the whole rhythm: `.shell` (max-w-6xl, px-6/sm:px-10) and `.band` (py-24/sm:py-32). Every section uses both, so nothing drifts. Gaps are 6/px-based, card padding is a flat `p-8`, list line-height is `1.75`.

## Structure
- `src/data.js` — all resume content, single source of truth. Edit here.
- `src/components/motion.jsx` — Magnetic, Spotlight, CountUp, Reveal, SplitWords, ScatterText, useTilt
- `src/components/Hero.jsx` — three 3D planes, threads, fidelity slider
- `src/components/About.jsx` — bento grid, rotating 3D tool ring
- `src/components/Work.jsx` — 3D coverflow carousel (keyboard: ← →)
- `src/components/Timeline.jsx` — scroll-driven playhead, accordion tracks
- `src/components/Sections.jsx` — skills (tilt cards), beyond, contact
- `src/components/Chrome.jsx` — nav, scroll progress, ThemeScroll, contextual cursor, marquee, footer

## Accessibility
Visible keyboard focus rings, `aria-expanded` on accordions, arrow-key carousel, `prefers-reduced-motion` fully respected (channel split and all transforms disable).

## Figma prototypes
Each project in `src/data.js` has a `figma` field. The detail panel renders a **View the prototype** button that opens it in a new tab. Drop the field (or set it to an empty string) and the button falls back to a disabled "Prototype coming soon" pill.

## Before deploying
In `src/data.js` → `sde.projects`, replace the five `live:` fields (currently `REPLACE_ME_...`) with your hosted URLs — Play Store, Vercel, Render, etc. Until then those cards show a graceful "Deploy link pending" pill instead of the button. Figma links and socials are already real.
