import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring, useMotionValue, useReducedMotion } from 'framer-motion'
import { Mail, Github, Linkedin, ArrowUpRight, Menu, X } from 'lucide-react'
import { profile } from '../data'
import { Magnetic, SplitWords, Reveal, EASE } from './motion'

const links = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'timeline', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'beyond', label: 'Beyond' },
  { id: 'contact', label: 'Contact' },
]

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const x = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })
  return (
    <motion.div
      style={{ scaleX: x }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-azure via-sky to-fore"
      aria-hidden
    />
  )
}

/* Sections declare their own theme; the html class follows the one
   nearest the middle of the viewport. Dark, then light, then dark. */
export function ThemeScroll() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('[data-theme]'))
    if (!sections.length) return

    const apply = () => {
      const mid = window.innerHeight / 2
      let best = sections[0]
      let bestDist = Infinity
      for (const s of sections) {
        const r = s.getBoundingClientRect()
        if (r.top > mid || r.bottom < mid) continue
        const d = Math.abs(r.top + r.height / 2 - mid)
        if (d < bestDist) { bestDist = d; best = s }
      }
      document.documentElement.classList.toggle('theme-light', best.dataset.theme === 'light')
    }

    apply()
    window.addEventListener('scroll', apply, { passive: true })
    window.addEventListener('resize', apply)
    return () => {
      window.removeEventListener('scroll', apply)
      window.removeEventListener('resize', apply)
    }
  }, [])
  return null
}

/* Cursor: a dot that tracks exactly, a ring that lags on a spring,
   and a word that tells you what the thing under it will do. */
export function Cursor() {
  const reduce = useReducedMotion()
  const dx = useMotionValue(-100)
  const dy = useMotionValue(-100)
  const rx = useSpring(dx, { stiffness: 190, damping: 22, mass: 0.55 })
  const ry = useSpring(dy, { stiffness: 190, damping: 22, mass: 0.55 })
  const [mode, setMode] = useState('idle')
  const [down, setDown] = useState(false)

  useEffect(() => {
    if (reduce) return
    const move = (e) => {
      dx.set(e.clientX)
      dy.set(e.clientY)
      const t = e.target
      if (t.closest('[data-cursor="drag"]')) setMode('drag')
      else if (t.closest('input[type="range"]')) setMode('slide')
      else if (t.closest('a, button, [role="button"]')) setMode('link')
      else if (t.closest('h1, h2, p')) setMode('text')
      else setMode('idle')
    }
    const dn = () => setDown(true)
    const up = () => setDown(false)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerdown', dn)
    window.addEventListener('pointerup', up)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerdown', dn)
      window.removeEventListener('pointerup', up)
    }
  }, [reduce, dx, dy])

  if (reduce) return null

  const label = { drag: 'Drag', slide: 'Slide', link: '', text: '', idle: '' }[mode]
  const ring = {
    idle:  { scale: 1,    opacity: 0.4, borderWidth: 1 },
    text:  { scale: 0.55, opacity: 0.7, borderWidth: 1 },
    link:  { scale: 1.9,  opacity: 1,   borderWidth: 1 },
    slide: { scale: 2.4,  opacity: 1,   borderWidth: 1 },
    drag:  { scale: 2.9,  opacity: 1,   borderWidth: 1 },
  }[mode]

  return (
    <div className="pointer-events-none fixed inset-0 z-[70] hidden lg:block" aria-hidden>
      <motion.div
        style={{ x: dx, y: dy }}
        animate={{ scale: down ? 0.5 : mode === 'link' ? 0 : 1 }}
        transition={{ duration: 0.18 }}
        className="absolute -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-azure"
      />
      <motion.div
        style={{ x: rx, y: ry }}
        animate={{ ...ring, scale: ring.scale * (down ? 0.86 : 1) }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className="absolute -ml-4 -mt-4 grid h-8 w-8 place-items-center rounded-full border border-azure bg-azure/5 backdrop-blur-[1px]"
      >
        {label && (
          <span className="font-mono text-[3.4px] uppercase tracking-[0.18em] text-azure">{label}</span>
        )}
      </motion.div>
    </div>
  )
}

export function Nav() {
  const [solid, setSolid] = useState(false)
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    links.forEach((l) => {
      const el = document.getElementById(l.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? 'border-b border-edge/70 bg-ink/85 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <nav className="shell flex items-center justify-between py-4">
        <a href="#top" className="group flex items-center gap-3">
          <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-lg border border-edge bg-navy">
            <motion.span
              className="font-display text-[13px] font-extrabold text-fore"
              whileHover={{ y: -22 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              PS
            </motion.span>
            <span className="absolute inset-0 grid place-items-center font-display text-[13px] font-extrabold text-azure opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              PS
            </span>
          </span>
          <span className="hidden font-display text-sm font-bold uppercase tracking-[0.18em] sm:block">
            P Suraj Shenoy
          </span>
        </a>

        <ul className="hidden items-center gap-0.5 md:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={`relative block rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-300 ${
                  active === l.id ? 'text-fore' : 'text-mist hover:text-fore'
                }`}
              >
                {active === l.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full border border-edge bg-navy"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{l.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Magnetic strength={0.25} className="hidden sm:inline-block">
            <a
              href={`mailto:${profile.email}`}
              className="shine group inline-flex items-center gap-2 rounded-full border border-azure/40 bg-azure/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-fore transition-colors duration-300 hover:bg-azure hover:text-paperInk"
            >
              Hire me
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Magnetic>
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-full border border-edge text-mist md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="overflow-hidden border-t border-edge/60 bg-ink/95 backdrop-blur-xl md:hidden"
      >
        <ul className="shell flex flex-col py-4">
          {links.map((l, i) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className="block border-b border-edge/40 py-4 font-display text-2xl font-bold tracking-tight text-fore"
              >
                <span className="mr-3 font-mono text-[10px] text-azure">0{i + 1}</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    </header>
  )
}

export function Marquee() {
  const words = ['Wireframes', 'User Flows', 'Design Systems', 'Dashboard UX', 'Prototypes', 'Accessibility', 'Motion', 'Design to Code']
  return (
    <div data-theme="dark" className="group relative overflow-hidden border-y border-edge bg-navy/50 py-5">
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap group-hover:[animation-play-state:paused]">
        {[...words, ...words].map((w, i) => (
          <span
            key={i}
            className="flex cursor-default items-center gap-12 font-display text-2xl font-bold uppercase tracking-tight text-mist/35 transition-colors duration-300 hover:text-fore sm:text-3xl"
          >
            {w}
            <span className="h-1.5 w-1.5 rounded-full bg-azure" />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent" />
    </div>
  )
}

export function Section({ id, eyebrow, title, kicker, children, theme = 'dark' }) {
  return (
    <section id={id} data-theme={theme} className="group/sec band relative scroll-mt-24">
      <div className="shell">
        <header className="mb-16 max-w-3xl">
          <Reveal>
            <p className="eyebrow">{eyebrow}</p>
          </Reveal>
          <h2 className="mt-6 font-display text-[clamp(2rem,5vw,3.6rem)] font-extrabold leading-[1] tracking-tight">
            <SplitWords text={title} />
          </h2>
          {kicker && (
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-2xl text-[15px] leading-[1.75] text-mist sm:text-base">{kicker}</p>
            </Reveal>
          )}
        </header>
        {children}
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-edge py-10">
      <div className="shell flex flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist/70">
          P Suraj Shenoy — UI/UX Designer
        </p>
        <div className="flex items-center gap-3">
          {[
            { href: profile.linkedin, Icon: Linkedin, label: 'LinkedIn' },
            { href: profile.github, Icon: Github, label: 'GitHub' },
            { href: `mailto:${profile.email}`, Icon: Mail, label: 'Email' },
          ].map(({ href, Icon, label }) => (
            <Magnetic key={label} strength={0.4}>
              <a
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="grid h-11 w-11 place-items-center rounded-full border border-edge text-mist transition-colors duration-300 hover:border-azure hover:bg-azure/10 hover:text-fore"
              >
                <Icon className="h-4 w-4" />
              </a>
            </Magnetic>
          ))}
        </div>
      </div>
    </footer>
  )
}
