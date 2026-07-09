import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowUpRight, ExternalLink } from 'lucide-react'
import { projects } from '../data'
import { Section } from './Chrome'
import { Magnetic, Spotlight, EASE } from './motion'

function Card({ p, offset, onSelect }) {
  const abs = Math.abs(offset)
  const hidden = abs > 2
  return (
    <motion.button
      onClick={() => onSelect(offset)}
      aria-label={`${p.name} — ${p.kind}`}
      tabIndex={offset === 0 ? 0 : -1}
      animate={{
        x: offset * 186,
        rotateY: offset * -24,
        scale: 1 - abs * 0.09,
        opacity: hidden ? 0 : 1 - abs * 0.3,
        filter: `blur(${abs * 1.5}px)`,
      }}
      whileHover={offset === 0 ? { scale: 1.03, y: -6 } : {}}
      transition={{ type: 'spring', stiffness: 190, damping: 26 }}
      style={{ zIndex: 10 - abs, pointerEvents: hidden ? 'none' : 'auto', translateZ: -abs * 240 }}
      className="preserve-3d backface-hidden absolute h-[440px] w-[280px] overflow-hidden rounded-3xl border border-edge bg-surface text-left sm:h-[470px] sm:w-[330px]"
    >
      <Spotlight className="h-full">
        <div className="absolute inset-x-0 top-0 h-40 opacity-60" style={{ background: `radial-gradient(120% 100% at 50% 0%, ${p.accent}30, transparent 70%)` }} />
        <motion.div
          className="absolute right-6 top-6 h-2.5 w-2.5 rounded-full"
          style={{ background: p.accent }}
          animate={{ boxShadow: [`0 0 0px ${p.accent}`, `0 0 18px ${p.accent}`, `0 0 0px ${p.accent}`] }}
          transition={{ duration: 2.4, repeat: Infinity }}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 p-7 sm:p-8">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-mist/70">{p.period}</p>
            <h3 className="mt-7 break-words font-display text-[clamp(1.5rem,2.2vw,1.95rem)] font-extrabold leading-[1.02] tracking-tight">
              {p.name}
            </h3>
            <p className="mt-2.5 text-[13px] leading-snug text-azure">{p.kind}</p>
            <p className="mt-5 text-[13.5px] leading-[1.65] text-mist">{p.blurb}</p>
          </div>
          <div>
            <div className="flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="rounded-full border border-edge px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-mist">
                  {t}
                </span>
              ))}
            </div>
            {offset === 0 && p.figma && (
              <span className="mt-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-azure">
                <ExternalLink className="h-3 w-3" />
                Prototype available
              </span>
            )}
          </div>
        </div>
      </Spotlight>
    </motion.button>
  )
}

export default function Work() {
  const [i, setI] = useState(0)
  const n = projects.length
  const go = useCallback((d) => setI((v) => (v + d + n) % n), [n])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])

  const active = projects[i]

  return (
    <Section
      theme="dark"
      id="work"
      eyebrow="Selected work"
      title="Prototypes that hold up under real data."
      kicker="Four products: dense investigative graphs, a conversation, a hackathon brief under deadline, and a business that needed to be found. Drag the deck or use the arrow keys — then open the Figma prototype to walk through the screens yourself."
    >
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        onDragEnd={(_, info) => {
          if (info.offset.x < -60) go(1)
          if (info.offset.x > 60) go(-1)
        }}
        data-cursor="drag"
        className="perspective relative flex h-[520px] items-center justify-center sm:h-[560px]"
      >
        {projects.map((p, idx) => {
          let offset = idx - i
          if (offset > n / 2) offset -= n
          if (offset < -n / 2) offset += n
          return <Card key={p.id} p={p} offset={offset} onSelect={(o) => o !== 0 && go(o)} />
        })}
      </motion.div>

      <div className="mt-6 flex items-center justify-center gap-6">
        <Magnetic strength={0.4}>
          <button onClick={() => go(-1)} aria-label="Previous project" className="grid h-12 w-12 place-items-center rounded-full border border-edge text-mist transition-colors duration-300 hover:border-azure hover:bg-azure/10 hover:text-fore">
            <ChevronLeft className="h-4 w-4" />
          </button>
        </Magnetic>
        <div className="flex items-center gap-2">
          {projects.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setI(idx)}
              aria-label={`Go to ${p.name}`}
              className="h-1.5 rounded-full transition-all duration-500"
              style={{ width: idx === i ? 36 : 10, background: idx === i ? p.accent : '#1C3564' }}
            />
          ))}
        </div>
        <Magnetic strength={0.4}>
          <button onClick={() => go(1)} aria-label="Next project" className="grid h-12 w-12 place-items-center rounded-full border border-edge text-mist transition-colors duration-300 hover:border-azure hover:bg-azure/10 hover:text-fore">
            <ChevronRight className="h-4 w-4" />
          </button>
        </Magnetic>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="card mx-auto mt-16 max-w-3xl"
        >
          <Spotlight className="p-8 sm:p-10">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="font-display text-2xl font-bold tracking-tight">{active.name}</h3>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist/60">What I did</span>
            </div>
            <div className="my-7 rule" />
            <ul className="space-y-5">
              {active.points.map((pt, idx) => (
                <motion.li
                  key={pt}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.08 }}
                  className="group/li flex gap-4 text-sm leading-[1.75] text-mist transition-colors hover:text-fore"
                >
                  <span
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full transition-transform duration-300 group-hover/li:scale-150"
                    style={{ background: active.accent }}
                  />
                  <span>{pt}</span>
                </motion.li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              {active.figma ? (
                <Magnetic>
                  <a
                    href={active.figma}
                    target="_blank"
                    rel="noreferrer"
                    className="shine group inline-flex items-center gap-3 rounded-full bg-paper px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-paperInk"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View the prototype
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </Magnetic>
              ) : (
                <span className="inline-flex items-center gap-2.5 rounded-full border border-edge px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-mist/60">
                  Prototype coming soon
                </span>
              )}
              <a
                href="#contact"
                className="link-sweep inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-azure"
              >
                Ask me about this project
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </Spotlight>
        </motion.div>
      </AnimatePresence>
    </Section>
  )
}
