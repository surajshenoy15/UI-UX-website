import { useState } from 'react'
import { motion } from 'framer-motion'
import { PenTool, Terminal, ArrowRight } from 'lucide-react'
import { EASE } from './motion'
import { ParticleField } from './Cinema'

/* =================================================================
   The gate — one person, two interfaces. Hover a side and it leans
   toward you in 3D; the other recedes. Click to enter.
================================================================= */

const SIDES = [
  {
    id: 'design',
    label: 'UI / UX Designer',
    tag: '01 — Interface',
    line: 'Flows, screens, systems. Dense data made obvious.',
    Icon: PenTool,
    accent: '77 141 255',
    glyphs: ['◻', '◯', '▭', '⌘'],
    cta: 'Enter the studio',
  },
  {
    id: 'sde',
    label: 'Software Engineer',
    tag: '02 — Terminal',
    line: 'Full-stack builds, mobile apps, shipped to production.',
    Icon: Terminal,
    accent: '74 222 128',
    glyphs: ['{ }', '</>', '$_', '::'],
    cta: 'Open the terminal',
  },
]

function Panel({ side, hovered, anyHover, onHover, onPick, index }) {
  const dim = anyHover && !hovered
  const a = side.accent
  return (
    <motion.button
      onClick={() => onPick(side.id)}
      onPointerEnter={() => onHover(side.id)}
      onPointerLeave={() => onHover(null)}
      initial={{ opacity: 0, y: 40 }}
      animate={{
        opacity: dim ? 0.45 : 1,
        y: 0,
        scale: hovered ? 1.015 : dim ? 0.985 : 1,
        rotateY: hovered ? (index === 0 ? 3 : -3) : 0,
      }}
      transition={{ duration: 0.55, ease: EASE, opacity: { duration: 0.35 } }}
      className="group relative flex-1 overflow-hidden text-left"
      style={{ minHeight: '50vh' }}
      aria-label={`Enter as ${side.label}`}
    >
      {/* wash */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(120% 90% at 50% ${index === 0 ? '110%' : '-10%'}, rgb(${a} / ${hovered ? 0.22 : 0.1}), transparent 65%)`,
        }}
      />
      {/* drifting glyphs */}
      {side.glyphs.map((g, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute select-none font-mono font-bold"
          style={{
            color: `rgb(${a} / 0.14)`,
            fontSize: `${2.6 + i * 1.1}rem`,
            left: `${12 + i * 22}%`,
            top: `${14 + ((i * 31) % 55)}%`,
          }}
          animate={{ y: [0, -14, 0], rotate: [0, i % 2 ? 5 : -5, 0] }}
          transition={{ duration: 7 + i * 1.5, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden
        >
          {g}
        </motion.span>
      ))}

      <div className="relative flex h-full flex-col justify-between p-8 sm:p-12 lg:p-16">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: `rgb(${a})` }}>
            {side.tag}
          </span>
          <motion.span
            animate={{ rotate: hovered ? 0 : -8, scale: hovered ? 1.1 : 1 }}
            className="grid h-12 w-12 place-items-center rounded-2xl border"
            style={{ borderColor: `rgb(${a} / 0.4)`, background: `rgb(${a} / 0.08)`, color: `rgb(${a})` }}
          >
            <side.Icon className="h-5 w-5" />
          </motion.span>
        </div>

        <div>
          <h2 className="font-display text-[clamp(2rem,5.5vw,4.2rem)] font-extrabold leading-[0.95] tracking-tighter text-white">
            {side.label.split(' ').map((w, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.12 + i * 0.07, ease: EASE }}
                  className="block"
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-[1.75] text-white/55">{side.line}</p>
          <span
            className="mt-8 inline-flex items-center gap-3 rounded-full border px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] transition-all duration-300"
            style={{
              borderColor: `rgb(${a} / ${hovered ? 0.9 : 0.35})`,
              color: `rgb(${a})`,
              background: hovered ? `rgb(${a} / 0.1)` : 'transparent',
            }}
          >
            {side.cta}
            <motion.span animate={{ x: hovered ? 4 : 0 }}>
              <ArrowRight className="h-4 w-4" />
            </motion.span>
          </span>
        </div>
      </div>

      {/* sweep line on hover */}
      <motion.span
        className="absolute inset-x-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, rgb(${a}), transparent)`, top: index === 0 ? 'auto' : 0, bottom: index === 0 ? 0 : 'auto' }}
        animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      />
    </motion.button>
  )
}

export default function Gate({ onPick }) {
  const [hover, setHover] = useState(null)

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(6px)' }}
      transition={{ duration: 0.6, ease: EASE }}
      className="perspective fixed inset-0 z-[80] flex flex-col bg-[#02040d] lg:flex-row"
    >
      <ParticleField density={60} className="!fixed opacity-60" />

      {/* center brand */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/40"
        >
          P Suraj Shenoy
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="mt-3 hidden rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 font-display text-sm font-bold uppercase tracking-[0.2em] text-white/80 backdrop-blur sm:block"
        >
          Choose your interface
        </motion.p>
      </div>

      <Panel side={SIDES[0]} index={0} hovered={hover === 'design'} anyHover={!!hover} onHover={setHover} onPick={onPick} />
      <div className="relative z-10 h-px w-full bg-white/10 lg:h-auto lg:w-px" aria-hidden />
      <Panel side={SIDES[1]} index={1} hovered={hover === 'sde'} anyHover={!!hover} onHover={setHover} onPick={onPick} />
    </motion.div>
  )
}
