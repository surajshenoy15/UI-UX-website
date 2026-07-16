import { motion } from 'framer-motion'
import {
  Figma, Layers, Smartphone, LayoutDashboard, Accessibility,
  Code2, MapPin, Sparkles, ArrowUpRight,
} from 'lucide-react'
import { profile } from '../data'
import { Reveal, Spotlight, SplitWords, useTilt, CountUp, EASE } from './motion'

/* A ring of tools rotating in 3D — the things that are always open. */
const RING = [
  { Icon: Figma, label: 'Figma' },
  { Icon: Layers, label: 'Design systems' },
  { Icon: LayoutDashboard, label: 'Dashboards' },
  { Icon: Smartphone, label: 'Mobile' },
  { Icon: Accessibility, label: 'Accessibility' },
  { Icon: Code2, label: 'React' },
]

function ToolRing() {
  const R = 118
  return (
    <div className="perspective relative grid h-[260px] place-items-center">
      <div
        className="preserve-3d relative h-[236px] w-[236px] animate-spin-ring"
        style={{ transform: 'rotateX(-14deg)' }}
      >
        {RING.map(({ Icon, label }, i) => {
          const angle = (i / RING.length) * 360
          return (
            <div
              key={label}
              className="absolute left-1/2 top-1/2 -ml-9 -mt-9 grid h-[72px] w-[72px] place-items-center rounded-2xl border border-edge bg-navy"
              style={{ transform: `rotateY(${angle}deg) translateZ(${R}px)` }}
            >
              <Icon className="h-5 w-5 text-azure" />
              <span className="mt-1.5 max-w-[62px] text-center font-mono text-[6.5px] uppercase leading-tight tracking-wider text-mist">
                {label}
              </span>
            </div>
          )
        })}
      </div>
      <div className="pointer-events-none absolute h-40 w-40 rounded-full bg-cyan/15 blur-[70px]" aria-hidden />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-ink to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-ink to-transparent" aria-hidden />
    </div>
  )
}

function TiltCard({ children, className = '', max = 6 }) {
  const t = useTilt(max)
  return (
    <motion.div
      ref={t.ref}
      onPointerMove={t.onPointerMove}
      onPointerLeave={t.onPointerLeave}
      style={t.style}
      className={`card preserve-3d ${className}`}
    >
      <Spotlight className="h-full">{children}</Spotlight>
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="about" data-theme="light" className="band group/sec relative scroll-mt-24">
      <div className="shell">
        <header className="mb-14 max-w-3xl">
          <Reveal>
            <p className="eyebrow">About</p>
          </Reveal>
          <h2 className="mt-6 font-display text-[clamp(2rem,5vw,3.6rem)] font-extrabold leading-[1] tracking-tight">
            <SplitWords text="I make dense screens feel obvious." />
          </h2>
        </header>

        {/* --- bento --- */}
        <div className="perspective grid auto-rows-[minmax(0,auto)] gap-5 md:grid-cols-6">
          {/* the statement — wide */}
          <Reveal className="md:col-span-4">
            <TiltCard className="h-full" max={4}>
              <div className="flex h-full flex-col justify-between gap-8 p-8 sm:p-10">
                <Sparkles className="h-5 w-5 shrink-0 text-azure" />
                <p className="font-display text-[clamp(1.15rem,2.1vw,1.7rem)] font-semibold leading-[1.45] tracking-tight">
                  {profile.summary}
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Figma', 'React', 'React Native', 'Tailwind', 'Material UI'].map((t) => (
                    <motion.span
                      key={t}
                      whileHover={{ y: -3 }}
                      className="rounded-full border border-edge px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-mist"
                      style={{ transform: 'translateZ(20px)' }}
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </div>
            </TiltCard>
          </Reveal>

          {/* the ring */}
          <Reveal delay={0.08} className="md:col-span-2">
            <TiltCard className="h-full" max={8}>
              <div className="flex h-full flex-col p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-azure">Always open</p>
                <ToolRing />
              </div>
            </TiltCard>
          </Reveal>

          {/* location */}
          <Reveal delay={0.12} className="md:col-span-2">
            <TiltCard className="h-full">
              <div className="flex h-full flex-col justify-between gap-6 p-8">
                <MapPin className="h-5 w-5 text-azure" />
                <div>
                  <p className="font-display text-2xl font-bold leading-tight tracking-tight">Bangalore, India</p>
                  <p className="mt-2 text-sm leading-relaxed text-mist">
                    Working across IST, with teams in Australia and the US.
                  </p>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          {/* how I work — numbered because it genuinely is a sequence */}
          <Reveal delay={0.16} className="md:col-span-4">
            <TiltCard className="h-full" max={4}>
              <div className="p-8 sm:p-10">
                <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-azure">How the work moves</p>
                <ol className="mt-8 grid gap-6 sm:grid-cols-3">
                  {[
                    { n: '01', t: 'Understand', d: 'Read the problem, map the flow, find where people get stuck.' },
                    { n: '02', t: 'Draw', d: 'Wireframes, then screens. Hierarchy before decoration, always.' },
                    { n: '03', t: 'Build', d: 'Ship it in React. Design that survives contact with real data.' },
                  ].map((s, i) => (
                    <motion.li
                      key={s.n}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.1, ease: EASE }}
                      className="group/step border-t border-edge pt-5"
                      style={{ transform: 'translateZ(18px)' }}
                    >
                      <span className="font-mono text-[11px] tracking-widest text-azure">{s.n}</span>
                      <h3 className="mt-3 font-display text-lg font-bold tracking-tight">{s.t}</h3>
                      <p className="mt-2 text-sm leading-[1.7] text-mist">{s.d}</p>
                      <span className="mt-4 block h-px w-0 bg-azure transition-all duration-500 group-hover/step:w-full" />
                    </motion.li>
                  ))}
                </ol>
              </div>
            </TiltCard>
          </Reveal>

          {/* CGPA / availability strip */}
          <Reveal delay={0.2} className="md:col-span-2">
            <TiltCard className="h-full" max={8}>
              <div className="flex h-full flex-col justify-between gap-6 p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-azure">Currently</p>
                <div>
                  <p className="font-display text-5xl font-extrabold leading-none tracking-tighter">
                    <CountUp value="9.22" />
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-mist">
                    CGPA, AI &amp; ML at BNM Institute of Technology.
                  </p>
                </div>
                <a href="#contact" className="link-sweep inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-azure">
                  Available for work
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </TiltCard>
          </Reveal>

          {/* wide quote */}
          <Reveal delay={0.24} className="md:col-span-4">
            <TiltCard className="h-full" max={3}>
              <div className="flex h-full items-center p-8 sm:p-10">
                <p className="font-display text-[clamp(1.05rem,1.8vw,1.4rem)] font-medium leading-[1.6] tracking-tight text-mist">
                  Across every role I&apos;ve worked on more than the code —{' '}
                  <span className="text-fore">usability, layout structure, accessibility, visual consistency,</span>{' '}
                  and the experience people actually have on the screen.
                </p>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
