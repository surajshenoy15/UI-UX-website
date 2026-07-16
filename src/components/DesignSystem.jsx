import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, Pipette, Type, CircleDot, RefreshCw } from 'lucide-react'
import { Reveal, Spotlight, SplitWords, EASE } from './motion'

/* =================================================================
   DESIGN DNA — the system behind the site, shown as the work itself.
   A designer's portfolio should expose its own palette, its type
   scale, and its color thinking. Minimal, deliberate, interactive.
================================================================= */

/* ---------- 1. The palette, read live from the theme ---------- */
const TOKENS = [
  { name: 'Ink', varName: '--ink', role: 'Background' },
  { name: 'Navy', varName: '--navy', role: 'Raised' },
  { name: 'Surface', varName: '--surface', role: 'Cards' },
  { name: 'Edge', varName: '--edge', role: 'Borders' },
  { name: 'Azure', varName: '--azure', role: 'Primary' },
  { name: 'Sky', varName: '--sky', role: 'Secondary' },
  { name: 'Cyan', varName: '--cyan', role: 'VFX' },
  { name: 'Fore', varName: '--fore', role: 'Text' },
  { name: 'Mist', varName: '--mist', role: 'Muted' },
]

const rgbToHex = (rgb) => {
  const [r, g, b] = rgb.trim().split(/\s+/).map(Number)
  return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0').toUpperCase()).join('')
}

function Palette() {
  const [values, setValues] = useState({})
  const [copied, setCopied] = useState(null)

  // re-read on theme flips so the swatches are always honest
  useEffect(() => {
    const read = () => {
      const cs = getComputedStyle(document.documentElement)
      const next = {}
      TOKENS.forEach((t) => { next[t.varName] = cs.getPropertyValue(t.varName).trim() })
      setValues(next)
    }
    read()
    const obs = new MutationObserver(read)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  const copy = async (t) => {
    const hex = rgbToHex(values[t.varName] || '0 0 0')
    await navigator.clipboard.writeText(hex)
    setCopied(t.name)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.26em] text-mist">
          <Pipette className="h-3.5 w-3.5 text-azure" />
          Palette — reads the live theme. Flip a section, watch it change.
        </p>
      </div>
      <div className="flex h-40 w-full overflow-hidden rounded-2xl border border-edge sm:h-48">
        {TOKENS.map((t, i) => {
          const rgb = values[t.varName] || '0 0 0'
          const hex = rgbToHex(rgb)
          const [r, g, b] = rgb.split(/\s+/).map(Number)
          const darkText = r * 0.299 + g * 0.587 + b * 0.114 > 150
          return (
            <motion.button
              key={t.name}
              onClick={() => copy(t)}
              initial={{ flexGrow: 1 }}
              whileHover={{ flexGrow: 2.6 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="group/sw relative flex min-w-0 flex-1 flex-col justify-end overflow-hidden p-3 text-left"
              style={{ background: `rgb(${rgb})` }}
              aria-label={`Copy ${t.name} ${hex}`}
            >
              <span
                className="whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.14em] opacity-0 transition-opacity duration-300 group-hover/sw:opacity-100"
                style={{ color: darkText ? '#04091A' : '#FFFFFF' }}
              >
                {copied === t.name ? (
                  <span className="flex items-center gap-1"><Check className="h-3 w-3" /> Copied</span>
                ) : (
                  <>
                    <span className="block font-semibold">{t.name}</span>
                    <span className="block opacity-70">{hex}</span>
                    <span className="block opacity-50">{t.role}</span>
                  </>
                )}
              </span>
            </motion.button>
          )
        })}
      </div>
      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-mist/50">
        Hover to expand · click to copy hex
      </p>
    </div>
  )
}

/* ---------- 2. Typography specimen ---------- */
const FACES = [
  { name: 'Syne', css: 'Syne, sans-serif', role: 'Display', weights: [600, 700, 800], sample: 'Interfaces' },
  { name: 'Space Grotesk', css: '"Space Grotesk", sans-serif', role: 'Body', weights: [300, 400, 500, 700], sample: 'Readable at every size' },
  { name: 'JetBrains Mono', css: '"JetBrains Mono", monospace', role: 'Labels & data', weights: [400, 500], sample: 'TRACKING 0.2EM' },
]

function Typography() {
  const [face, setFace] = useState(0)
  const [weight, setWeight] = useState(700)
  const [size, setSize] = useState(64)
  const f = FACES[face]

  useEffect(() => {
    if (!f.weights.includes(weight)) setWeight(f.weights[f.weights.length - 1])
  }, [face]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      {/* controls */}
      <div>
        <p className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.26em] text-mist">
          <Type className="h-3.5 w-3.5 text-azure" />
          Type — three voices, one hierarchy
        </p>
        <div className="mt-6 space-y-2">
          {FACES.map((fc, i) => (
            <button
              key={fc.name}
              onClick={() => setFace(i)}
              className={`flex w-full items-baseline justify-between rounded-xl border px-5 py-4 text-left transition-colors duration-300 ${
                i === face ? 'border-azure/60 bg-azure/5' : 'border-edge hover:border-azure/30'
              }`}
            >
              <span className="text-lg font-semibold" style={{ fontFamily: fc.css }}>{fc.name}</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-mist">{fc.role}</span>
            </button>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          {f.weights.map((w) => (
            <button
              key={w}
              onClick={() => setWeight(w)}
              className={`rounded-full border px-4 py-1.5 font-mono text-[10px] transition-colors duration-300 ${
                w === weight ? 'border-azure text-azure' : 'border-edge text-mist hover:text-fore'
              }`}
            >
              {w}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-3">
            <span className="font-mono text-[10px] text-mist">{size}px</span>
            <input
              type="range" min="20" max="110" value={size}
              onChange={(e) => setSize(+e.target.value)}
              aria-label="Preview size"
              className="h-1 w-28 appearance-none rounded-full [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-fore"
              style={{ background: `linear-gradient(90deg, rgb(var(--azure)) ${((size - 20) / 90) * 100}%, rgb(var(--edge)) ${((size - 20) / 90) * 100}%)` }}
            />
          </div>
        </div>
      </div>

      {/* live specimen — editable */}
      <div className="card flex min-h-[260px] flex-col p-8">
        <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-mist/50">
          Specimen — click and type your own words
        </p>
        <div className="grid flex-1 place-items-center py-6">
          <p
            contentEditable
            suppressContentEditableWarning
            spellCheck={false}
            className="max-w-full break-words text-center leading-[1.05] tracking-tight outline-none focus:opacity-90"
            style={{ fontFamily: f.css, fontWeight: weight, fontSize: `clamp(18px, ${size}px, 12vw)` }}
          >
            {f.sample}
          </p>
        </div>
        <div className="flex items-center justify-between border-t border-edge pt-4 font-mono text-[9px] uppercase tracking-[0.18em] text-mist/60">
          <span>{f.name} · {weight}</span>
          <span>0–9 AaBbCc ?!&amp;</span>
        </div>
      </div>
    </div>
  )
}

/* ---------- 3. The design wheel ---------- */
const HARMONIES = [
  { id: 'comp', name: 'Complementary', offsets: [0, 180] },
  { id: 'analog', name: 'Analogous', offsets: [-30, 0, 30] },
  { id: 'triad', name: 'Triadic', offsets: [0, 120, 240] },
  { id: 'split', name: 'Split-comp', offsets: [0, 150, 210] },
]

const hsl = (h, s = 72, l = 56) => `hsl(${((h % 360) + 360) % 360} ${s}% ${l}%)`

function DesignWheel() {
  const [hue, setHue] = useState(215)
  const [scheme, setScheme] = useState(HARMONIES[2])
  const wheelRef = useRef(null)
  const dragging = useRef(false)

  const setFromPointer = (e) => {
    const r = wheelRef.current.getBoundingClientRect()
    const x = e.clientX - (r.left + r.width / 2)
    const y = e.clientY - (r.top + r.height / 2)
    setHue(Math.round((Math.atan2(y, x) * 180) / Math.PI + 90))
  }

  const colors = scheme.offsets.map((o) => hue + o)
  const R = 46 // handle radius in % of wheel

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
      {/* the wheel */}
      <div className="mx-auto w-full max-w-[340px]">
        <p className="mb-6 flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.26em] text-mist">
          <CircleDot className="h-3.5 w-3.5 text-azure" />
          The wheel — drag the handle, pick a harmony
        </p>
        <div
          ref={wheelRef}
          onPointerDown={(e) => { dragging.current = true; wheelRef.current.setPointerCapture(e.pointerId); setFromPointer(e) }}
          onPointerMove={(e) => dragging.current && setFromPointer(e)}
          onPointerUp={() => { dragging.current = false }}
          data-cursor="drag"
          className="relative aspect-square w-full touch-none select-none"
          role="slider"
          aria-label="Hue"
          aria-valuenow={((hue % 360) + 360) % 360}
          aria-valuemin={0}
          aria-valuemax={359}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowUp') setHue((h) => h + 6)
            if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') setHue((h) => h - 6)
          }}
        >
          {/* hue ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'conic-gradient(hsl(0 72% 56%), hsl(60 72% 56%), hsl(120 72% 56%), hsl(180 72% 56%), hsl(240 72% 56%), hsl(300 72% 56%), hsl(360 72% 56%))',
              WebkitMask: 'radial-gradient(circle, transparent 58%, #000 59%)',
              mask: 'radial-gradient(circle, transparent 58%, #000 59%)',
            }}
          />
          {/* harmony spokes */}
          {colors.map((h, i) => {
            const a = ((h - 90) * Math.PI) / 180
            return (
              <span
                key={i}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_2px_12px_rgb(0_0_0/0.4)]"
                style={{
                  width: i === 0 ? 26 : 18,
                  height: i === 0 ? 26 : 18,
                  background: hsl(h),
                  left: `${50 + Math.cos(a) * R}%`,
                  top: `${50 + Math.sin(a) * R}%`,
                }}
              />
            )
          })}
          {/* center readout */}
          <div className="absolute inset-[26%] grid place-items-center rounded-full border border-edge bg-surface text-center">
            <div>
              <div className="mx-auto h-8 w-8 rounded-full border border-edge" style={{ background: hsl(hue) }} />
              <p className="mt-2 font-mono text-[11px] text-fore">{((hue % 360) + 360) % 360}°</p>
              <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-mist">{scheme.name}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {HARMONIES.map((h) => (
            <button
              key={h.id}
              onClick={() => setScheme(h)}
              className={`rounded-full border px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors duration-300 ${
                scheme.id === h.id ? 'border-azure text-azure' : 'border-edge text-mist hover:text-fore'
              }`}
            >
              {h.name}
            </button>
          ))}
          <button
            onClick={() => setHue(Math.round(Math.random() * 360))}
            aria-label="Random hue"
            className="grid h-8 w-8 place-items-center rounded-full border border-edge text-mist transition-colors hover:border-azure hover:text-azure"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* live preview recolored by the wheel */}
      <div>
        <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.26em] text-mist">
          Applied — the same card, recolored live
        </p>
        <motion.div
          key={scheme.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="card overflow-hidden"
        >
          <div className="h-2 w-full" style={{ background: `linear-gradient(90deg, ${colors.map((c) => hsl(c)).join(',')})` }} />
          <div className="p-7">
            <div className="flex items-center justify-between">
              <span className="rounded-full px-3 py-1 font-mono text-[9px] uppercase tracking-[0.16em]" style={{ background: hsl(hue, 72, 56) + '22', color: hsl(hue, 80, 62) }}>
                Featured
              </span>
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: hsl(colors[1] ?? hue + 180) }} />
            </div>
            <h4 className="mt-5 font-display text-2xl font-bold tracking-tight">Palette in practice</h4>
            <p className="mt-2 text-sm leading-relaxed text-mist">
              Accent, support, and highlight pulled straight from the wheel — hierarchy stays legible in any hue.
            </p>
            <div className="mt-6 flex items-end justify-between gap-1.5">
              {[52, 78, 40, 92, 64, 70].map((h, i) => (
                <motion.span
                  key={i}
                  animate={{ height: `${h * 0.6}px`, background: hsl(colors[i % colors.length], 70, 58) }}
                  transition={{ duration: 0.4 }}
                  className="w-full rounded-t-md"
                />
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <span className="shine flex-1 rounded-lg py-2.5 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-white" style={{ background: hsl(hue, 72, 50) }}>
                Primary
              </span>
              <span className="flex-1 rounded-lg border py-2.5 text-center font-mono text-[10px] uppercase tracking-[0.16em]" style={{ borderColor: hsl(hue, 60, 50), color: hsl(hue, 75, 60) }}>
                Ghost
              </span>
            </div>
            <div className="mt-5 flex gap-2">
              {colors.map((c, i) => (
                <span key={i} className="flex-1 rounded-md py-1.5 text-center font-mono text-[8.5px] text-white/90" style={{ background: hsl(c) }}>
                  {Math.round(((c % 360) + 360) % 360)}°
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

/* ---------- section shell ---------- */
export default function DesignSystem() {
  return (
    <section id="system" data-theme="light" className="band group/sec relative scroll-mt-24">
      <div className="shell">
        <header className="mb-16 max-w-3xl">
          <Reveal><p className="eyebrow">Design DNA</p></Reveal>
          <h2 className="mt-6 font-display text-[clamp(2rem,5vw,3.6rem)] font-extrabold leading-[1] tracking-tight">
            <SplitWords text="The system behind this site." />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-2xl text-[15px] leading-[1.75] text-mist">
              A portfolio should show its working. This is the palette you&apos;re looking at, the
              type carrying every word, and the wheel I reach for before any of it exists.
            </p>
          </Reveal>
        </header>

        <div className="space-y-20 sm:space-y-24">
          <Reveal><Palette /></Reveal>
          <div className="rule" />
          <Reveal><Typography /></Reveal>
          <div className="rule" />
          <Reveal><DesignWheel /></Reveal>
        </div>
      </div>
    </section>
  )
}
