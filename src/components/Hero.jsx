import { useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowDown, Circle, MousePointer2, Search, Bell, TrendingUp, Users } from 'lucide-react'
import { profile } from '../data'
import { Magnetic, CountUp, ScatterText, useTilt, EASE } from './motion'
import { ParticleField } from './Cinema'

/* =============================================================
   Signature — three planes suspended in real 3D space, wired
   together by threads. Drag the slider and the work travels
   forward through them: boxes become a flow graph, the flow
   becomes a working interface. The threads carry the eye.
============================================================== */

const W = 268
const H = 178

/* ---------- Plane 1: wireframe ---------- */
function Wireframe({ t }) {
  const stroke = 'rgb(var(--edge))'
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full">
      <defs>
        <pattern id="hatch" width="6" height="6" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="6" stroke={stroke} strokeWidth="1.6" />
        </pattern>
      </defs>
      {[
        [16, 14, 96, 12], [16, 32, 158, 7],
        [16, 52, 72, 44], [98, 52, 72, 44], [180, 52, 72, 44],
        [16, 106, 154, 54], [180, 106, 72, 54],
      ].map(([x, y, w, h], i) => (
        <motion.rect
          key={i}
          x={x} y={y} width={w} height={h} rx="4"
          fill={i > 1 ? 'url(#hatch)' : stroke}
          fillOpacity={i > 1 ? 0.35 : 0.55}
          stroke={stroke}
          strokeWidth="1"
          strokeDasharray="4 3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ opacity: t }}
          transition={{ delay: i * 0.04, duration: 0.4 }}
        />
      ))}
      <text x="16" y="172" fill="rgb(var(--mist))" fontSize="7" letterSpacing="2" fontFamily="monospace">
        BOXES ONLY
      </text>
    </svg>
  )
}

/* ---------- Plane 2: the thread graph ---------- */
const NODES = [
  { id: 'entry', x: 34, y: 30, r: 7, label: 'Entry' },
  { id: 'auth', x: 100, y: 20, r: 6 },
  { id: 'home', x: 134, y: 62, r: 10, label: 'Home' },
  { id: 'a', x: 62, y: 88, r: 5 },
  { id: 'b', x: 196, y: 40, r: 5 },
  { id: 'detail', x: 214, y: 96, r: 8, label: 'Detail' },
  { id: 'c', x: 96, y: 132, r: 5 },
  { id: 'done', x: 172, y: 148, r: 7, label: 'Done' },
]
const THREADS = [
  ['entry', 'auth'], ['auth', 'home'], ['entry', 'a'], ['a', 'home'],
  ['home', 'b'], ['b', 'detail'], ['home', 'detail'], ['a', 'c'],
  ['c', 'done'], ['detail', 'done'],
]
const nodeOf = (id) => NODES.find((n) => n.id === id)

function ThreadGraph({ t }) {
  const reduce = useReducedMotion()
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full overflow-visible">
      {THREADS.map(([a, b], i) => {
        const A = nodeOf(a)
        const B = nodeOf(b)
        const mx = (A.x + B.x) / 2
        const my = (A.y + B.y) / 2 - 18
        const d = `M${A.x} ${A.y} Q${mx} ${my} ${B.x} ${B.y}`
        return (
          <g key={i}>
            <motion.path
              d={d}
              fill="none"
              stroke="rgb(var(--azure))"
              strokeOpacity={0.28}
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: t }}
              transition={{ duration: 0.8, delay: i * 0.04, ease: EASE }}
            />
            {!reduce && t > 0.5 && (
              <motion.circle
                r="1.7"
                fill="rgb(var(--cyan))"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <animateMotion dur={`${2.4 + i * 0.3}s`} repeatCount="indefinite" path={d} />
              </motion.circle>
            )}
          </g>
        )
      })}

      {NODES.map((n, i) => (
        <motion.g
          key={n.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: t > 0.1 ? 1 : 0, opacity: t }}
          transition={{ delay: 0.1 + i * 0.05, type: 'spring', stiffness: 260, damping: 18 }}
          style={{ transformOrigin: `${n.x}px ${n.y}px` }}
        >
          <circle cx={n.x} cy={n.y} r={n.r + 4} fill="rgb(var(--azure))" opacity="0.1" />
          <circle
            cx={n.x} cy={n.y} r={n.r}
            fill="rgb(var(--navy))"
            stroke="rgb(var(--azure))"
            strokeWidth="1.4"
          />
          <circle cx={n.x} cy={n.y} r={n.r / 2.6} fill="rgb(var(--azure))" />
          {n.label && (
            <text
              x={n.x} y={n.y + n.r + 11}
              textAnchor="middle"
              fill="rgb(var(--mist))"
              fontSize="6.5"
              letterSpacing="1.4"
              fontFamily="monospace"
            >
              {n.label.toUpperCase()}
            </text>
          )}
        </motion.g>
      ))}
    </svg>
  )
}

/* ---------- Plane 3: the working interface ---------- */
function LiveInterface({ t }) {
  const on = t > 0.05
  const bars = [42, 68, 34, 80, 56, 92, 74]
  return (
    <motion.div
      animate={{ opacity: t }}
      className="flex h-full w-full flex-col gap-2.5 p-3.5"
      style={{ fontSize: 8 }}
    >
      {/* top bar */}
      <div className="flex items-center justify-between">
        <div>
          <p className="font-display text-[11px] font-bold leading-none text-fore">Overview</p>
          <p className="mt-1 font-mono text-[6px] uppercase tracking-[0.2em] text-mist">Live metrics</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="grid h-5 w-5 place-items-center rounded-md border border-edge text-mist">
            <Search className="h-2.5 w-2.5" />
          </span>
          <span className="relative grid h-5 w-5 place-items-center rounded-md border border-edge text-mist">
            <Bell className="h-2.5 w-2.5" />
            <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-azure" />
          </span>
        </div>
      </div>

      {/* metric tiles */}
      <div className="grid grid-cols-3 gap-1.5">
        {[
          { Icon: TrendingUp, v: '24.8k', l: 'Sessions' },
          { Icon: Users, v: '1,204', l: 'Users' },
          { Icon: Circle, v: '98%', l: 'Uptime' },
        ].map(({ Icon, v, l }, i) => (
          <motion.div
            key={l}
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: on ? 0 : 8, opacity: on ? 1 : 0 }}
            transition={{ delay: 0.1 + i * 0.07 }}
            className="rounded-md border border-edge bg-surface px-1.5 py-1.5"
          >
            <Icon className="h-2 w-2 text-azure" />
            <p className="mt-1 font-display text-[10px] font-bold leading-none text-fore">{v}</p>
            <p className="mt-0.5 font-mono text-[5.5px] uppercase tracking-wider text-mist">{l}</p>
          </motion.div>
        ))}
      </div>

      {/* chart + cta */}
      <div className="grid flex-1 grid-cols-[1.9fr_1fr] gap-1.5">
        <div className="flex flex-col justify-end gap-1 rounded-md border border-edge bg-surface p-2">
          <div className="flex flex-1 items-end justify-between gap-1">
            {bars.map((b, i) => (
              <motion.span
                key={i}
                initial={{ height: 0 }}
                animate={{ height: on ? `${b}%` : 0 }}
                transition={{ delay: 0.2 + i * 0.05, duration: 0.5, ease: EASE }}
                className="w-full rounded-sm bg-gradient-to-t from-azure/40 to-azure"
              />
            ))}
          </div>
          <p className="font-mono text-[5.5px] uppercase tracking-wider text-mist">Weekly</p>
        </div>
        <div className="flex flex-col justify-between rounded-md border border-azure/40 bg-azure/10 p-2">
          <p className="text-[7px] leading-tight text-fore">Ready to publish</p>
          <motion.span
            animate={on ? { boxShadow: ['0 0 0 0 rgb(var(--azure)/0.5)', '0 0 0 6px rgb(var(--azure)/0)'] } : {}}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="rounded bg-azure py-1 text-center font-mono text-[6px] uppercase tracking-[0.14em] text-paperInk"
          >
            Publish
          </motion.span>
        </div>
      </div>
    </motion.div>
  )
}

/* ---------- The plane frame ---------- */
function Plane({ z, opacity, label, active, children }) {
  return (
    <div
      className="preserve-3d backface-hidden absolute left-1/2 top-1/2"
      style={{ transform: `translate(-50%,-50%) translateZ(${z}px)`, opacity, width: W, height: H + 34 }}
    >
      <div
        className={`h-full overflow-hidden rounded-xl border bg-navy transition-colors duration-500 ${
          active ? 'border-azure/50' : 'border-edge'
        }`}
        style={{ boxShadow: active ? '0 40px 90px -45px rgb(var(--azure)/0.7)' : '0 30px 70px -45px rgb(0 0 0 / 0.9)' }}
      >
        <div className="flex items-center gap-1.5 border-b border-edge/70 bg-surface px-3 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-edge" />
          <span className="h-1.5 w-1.5 rounded-full bg-edge" />
          <span className="h-1.5 w-1.5 rounded-full bg-edge" />
          <span className={`ml-2 font-mono text-[7.5px] uppercase tracking-[0.22em] transition-colors ${active ? 'text-azure' : 'text-mist/60'}`}>
            {label}
          </span>
        </div>
        <div style={{ height: H }}>{children}</div>
      </div>
    </div>
  )
}

/* ---------- Threads that run between the planes in 3D ---------- */
function InterPlaneThreads({ f }) {
  const pts = [
    [-108, -84], [108, -84], [-108, 84], [108, 84],
  ]
  return (
    <div className="preserve-3d pointer-events-none absolute left-1/2 top-1/2" aria-hidden>
      {pts.map(([x, y], i) => (
        <div key={i} className="preserve-3d absolute" style={{ transform: `translate3d(${x}px, ${y}px, 0)` }}>
          {/* one thread per gap, drawn as a rotated line living in the Z plane */}
          {[0, 1].map((seg) => (
            <motion.span
              key={seg}
              className="absolute block origin-left"
              style={{
                height: 1,
                transform: `rotateY(90deg) translateZ(${seg === 0 ? 0 : -145}px)`,
                background: 'linear-gradient(90deg, rgb(var(--cyan)/0.7), rgb(var(--cyan)/0))',
              }}
              animate={{ width: 145 * (0.4 + f * 0.6), opacity: 0.25 + f * 0.55 }}
              transition={{ duration: 0.5 }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

function FidelityStack() {
  const reduce = useReducedMotion()
  const [f, setF] = useState(0.12)
  const tilt = useTilt(12)

  // three overlapping ramps: wireframe fades out, graph peaks mid, interface takes over
  const wire = Math.max(0, 1 - f * 2.4)
  const graph = Math.max(0, 1 - Math.abs(f - 0.5) * 3.1)
  const live = Math.max(0, (f - 0.62) / 0.38)
  const stage = f < 0.35 ? 'Wireframe' : f < 0.72 ? 'Flow threads' : 'Interface'

  // the deck slides forward so the active plane comes to meet you
  const push = f * 150

  return (
    <div className="relative w-full">
      <div
        ref={tilt.ref}
        onPointerMove={tilt.onPointerMove}
        onPointerLeave={tilt.onPointerLeave}
        className="perspective-far relative h-[300px] w-full sm:h-[400px]"
      >
        <ParticleField density={70} />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/10 blur-[100px]" aria-hidden />

        <motion.div
          style={{ ...tilt.style, translateZ: push }}
          className="preserve-3d h-full w-full scale-[0.78] sm:scale-100"
        >
          <InterPlaneThreads f={f} />

          <Plane z={-290} opacity={0.15 + wire * 0.85} label="01 — Wireframe" active={f < 0.35}>
            <Wireframe t={0.3 + wire * 0.7} />
          </Plane>

          <Plane z={-145} opacity={0.2 + graph * 0.8} label="02 — Flow" active={f >= 0.35 && f < 0.72}>
            <ThreadGraph t={0.15 + graph * 0.85} />
          </Plane>

          <Plane z={0} opacity={0.16 + live * 0.84} label="03 — Interface" active={f >= 0.72}>
            <LiveInterface t={live} />
          </Plane>

          {/* the cursor lands on Publish once the interface resolves */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2"
            style={{ transform: 'translateZ(48px)' }}
            animate={reduce ? {} : { x: live > 0.6 ? 96 : 30, y: live > 0.6 ? 62 : 108, opacity: live > 0.25 ? 1 : 0 }}
            transition={{ type: 'spring', stiffness: 130, damping: 16 }}
          >
            <span className="relative block">
              <MousePointer2 className="h-5 w-5 fill-fore text-fore drop-shadow-[0_2px_10px_rgb(0_0_0_/_0.7)]" />
              {live > 0.6 && <span className="absolute -left-1.5 -top-1.5 h-8 w-8 rounded-full border border-cyan animate-pulse-ring" />}
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* ---- the control ---- */}
      <div className="mx-auto mt-6 w-full max-w-[320px]">
        <div className="mb-3 grid grid-cols-3 font-mono text-[9px] uppercase tracking-[0.2em]">
          {['Wireframe', 'Flow', 'Interface'].map((s, i) => {
            const activeIdx = f < 0.35 ? 0 : f < 0.72 ? 1 : 2
            return (
              <span key={s} className={`${i === 1 ? 'text-center' : i === 2 ? 'text-right' : ''} transition-colors duration-300 ${activeIdx === i ? 'text-azure' : 'text-mist/40'}`}>
                {s}
              </span>
            )
          })}
        </div>
        <input
          type="range" min="0" max="1" step="0.005" value={f}
          onChange={(e) => setF(parseFloat(e.target.value))}
          aria-label="Fidelity — drag from wireframe through the flow to the finished interface"
          className="h-1 w-full appearance-none rounded-full
                     [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none
                     [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-fore
                     [&::-webkit-slider-thumb]:shadow-[0_0_0_5px_rgb(var(--azure)/0.22)]
                     [&::-webkit-slider-thumb]:transition-transform hover:[&::-webkit-slider-thumb]:scale-125
                     [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full
                     [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white"
          style={{ background: `linear-gradient(90deg, rgb(var(--azure)) ${f * 100}%, rgb(var(--edge)) ${f * 100}%)` }}
        />
        <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-mist/60">
          Drag — and tilt the deck
        </p>
      </div>
    </div>
  )
}

export default function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 620], [0, 110])
  const fade = useTransform(scrollY, [0, 460], [1, 0])

  return (
    <section id="top" data-theme="dark" className="relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40">
      <div className="pointer-events-none absolute inset-0 grid-lines" aria-hidden />
      <div className="pointer-events-none absolute -left-48 top-24 h-[460px] w-[460px] rounded-full bg-azure/10 blur-[150px]" aria-hidden />
      <div className="pointer-events-none absolute -right-40 top-72 h-[380px] w-[380px] rounded-full bg-cyan/[0.08] blur-[140px]" aria-hidden />

      <div className="shell relative">
        <div className="grid items-center gap-20 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12">
          <motion.div style={{ y, opacity: fade }} className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-edge bg-navy/70 px-3.5 py-1.5 backdrop-blur"
            >
              <span className="relative flex h-2 w-2 items-center justify-center">
                <span className="absolute h-2 w-2 rounded-full bg-azure animate-pulse-ring" />
                <Circle className="h-2 w-2 fill-azure text-azure" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-mist">
                Open to design roles — Bangalore
              </span>
            </motion.div>

            <h1 className="mt-8 font-display font-extrabold tracking-tighter">
              <motion.span
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                className="block text-[clamp(2.5rem,6.4vw,4.4rem)] leading-[0.94]"
              >
                <ScatterText text="P Suraj     Shenoy" />
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.22, ease: EASE }}
                className="mt-4 block text-[clamp(1.35rem,3.2vw,2.2rem)] font-bold leading-tight text-azure"
              >
                UI/UX Designer
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.7 }}
              className="mt-8 text-[15px] leading-[1.75] text-mist sm:text-base"
            >
              I design interfaces for dashboards, mobile apps, and complex data — then build them. {profile.statement}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Magnetic>
                <a href="#work" className="shine group inline-flex items-center gap-3 rounded-full bg-paper px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-paperInk">
                  See the work
                  <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                </a>
              </Magnetic>
              <Magnetic strength={0.22}>
                <a href="#contact" className="inline-flex items-center rounded-full border border-edge px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-mist transition-colors duration-300 hover:border-azure hover:text-fore">
                  Start a conversation
                </a>
              </Magnetic>
            </motion.div>

            <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-edge bg-edge sm:grid-cols-4">
              {profile.stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.08 }}
                  className="group bg-ink px-5 py-6 transition-colors duration-300 hover:bg-navy"
                >
                  <p className="font-display text-2xl font-bold leading-none">
                    <CountUp value={s.value} />
                  </p>
                  <p className="mt-2.5 font-mono text-[9px] uppercase leading-relaxed tracking-[0.16em] text-mist/70">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
          >
            <FidelityStack />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
