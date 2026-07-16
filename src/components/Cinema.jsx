import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'
import { EASE } from './motion'

/* =================================================================
   Cinematic layer — intro title card, film grain, a cyan particle
   field flying past in 3D, and a generative ambient score built
   with the Web Audio API (original, no copyright strings attached).
================================================================= */

/* ---------- 1. Intro title card ---------- */
export function Intro() {
  const [done, setDone] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => {
      document.body.style.overflow = ''
      setDone(true)
    }, 2400)
    return () => {
      clearTimeout(t)
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[90] grid place-items-center bg-[#02040d]"
          aria-hidden
        >
          {/* letterbox bars */}
          <motion.div
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ delay: 1.7, duration: 0.7, ease: EASE }}
            className="absolute inset-x-0 top-0 h-[14vh] origin-top bg-black"
          />
          <motion.div
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ delay: 1.7, duration: 0.7, ease: EASE }}
            className="absolute inset-x-0 bottom-0 h-[14vh] origin-bottom bg-black"
          />

          <div className="text-center">
            <motion.p
              initial={{ opacity: 0, letterSpacing: '0.6em' }}
              animate={{ opacity: 1, letterSpacing: '0.34em' }}
              transition={{ duration: 1, delay: 0.2, ease: EASE }}
              className="font-mono text-[10px] uppercase text-[#22E0EE]"
            >
              A portfolio by
            </motion.p>
            <div className="mt-4 overflow-hidden">
              <motion.h1
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
                className="font-display text-[clamp(2rem,7vw,4.5rem)] font-extrabold tracking-tighter text-white"
              >
                P Suraj Shenoy
              </motion.h1>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="mt-3 font-mono text-[11px] uppercase tracking-[0.34em] text-white/50"
            >
              UI / UX Designer
            </motion.p>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 1.6, ease: 'linear' }}
              className="mx-auto mt-8 block h-px w-48 origin-left bg-gradient-to-r from-[#22E0EE] to-transparent"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ---------- 2. Film grain + vignette ---------- */
export function Grain() {
  const reduce = useReducedMotion()
  return (
    <>
      <div className="vignette" aria-hidden />
      {!reduce && <div className="grain" aria-hidden />}
    </>
  )
}

/* ---------- 3. Cyan particle field, flying past in 3D ---------- */
export function ParticleField({ density = 90, className = '' }) {
  const reduce = useReducedMotion()
  const canvasRef = useRef(null)

  useEffect(() => {
    if (reduce) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf
    let w, h, cx, cy
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const pointer = { x: 0, y: 0 }
    const FOV = 320

    const resize = () => {
      const r = canvas.parentElement.getBoundingClientRect()
      w = r.width
      h = r.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cx = w / 2
      cy = h / 2
    }
    resize()

    const count = w < 640 ? Math.round(density * 0.55) : density
    const parts = Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * w * 1.6,
      y: (Math.random() - 0.5) * h * 1.6,
      z: Math.random() * FOV,
      s: 0.35 + Math.random() * 0.9,
    }))

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect()
      pointer.x = (e.clientX - r.left) / r.width - 0.5
      pointer.y = (e.clientY - r.top) / r.height - 0.5
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('resize', resize)

    let visible = true
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(canvas)

    const cyan = () =>
      getComputedStyle(document.documentElement).getPropertyValue('--cyan').trim() || '34 224 238'

    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (!visible || document.hidden) return
      ctx.clearRect(0, 0, w, h)
      const c = cyan()
      for (const p of parts) {
        const zPrev = p.z
        p.z -= p.s
        if (p.z <= 1) {
          p.z = FOV
          p.x = (Math.random() - 0.5) * w * 1.6
          p.y = (Math.random() - 0.5) * h * 1.6
        }
        const k = FOV / p.z
        const x1 = cx + (p.x + pointer.x * 120) / p.z * FOV * 0.28
        const y1 = cy + (p.y + pointer.y * 120) / p.z * FOV * 0.28
        const x0 = cx + (p.x + pointer.x * 120) / zPrev * FOV * 0.28
        const y0 = cy + (p.y + pointer.y * 120) / zPrev * FOV * 0.28
        if (x1 < -20 || x1 > w + 20 || y1 < -20 || y1 > h + 20) continue
        const a = Math.min(1, (1 - p.z / FOV) * 1.2)
        ctx.strokeStyle = `rgb(${c} / ${a * 0.55})`
        ctx.lineWidth = Math.max(0.5, k * 0.5)
        ctx.beginPath()
        ctx.moveTo(x0, y0)
        ctx.lineTo(x1, y1)
        ctx.stroke()
        ctx.fillStyle = `rgb(${c} / ${a})`
        ctx.beginPath()
        ctx.arc(x1, y1, Math.max(0.4, k * 0.55), 0, Math.PI * 2)
        ctx.fill()
      }
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', resize)
      io.disconnect()
    }
  }, [reduce, density])

  if (reduce) return null
  return <canvas ref={canvasRef} className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden />
}

/* ---------- 4. Two generative scores ---------- */
/* Both are composed live with the Web Audio API — original audio,
   no files, no licensing.
   design: corporate-cinematic. Warm maj7 pads, a soft piano-like
           pluck arpeggio, gentle swells. Trailer-for-a-keynote energy.
   sde:    tech-cinematic. Minor arpeggio sequencer, deep sub pulse,
           hat ticks. Server-room-at-night energy.                    */

const PROG = {
  design: [
    [130.81, 196.0, 246.94, 329.63], // Cmaj7
    [110.0, 164.81, 220.0, 261.63],  // Am7
    [87.31, 174.61, 220.0, 261.63],  // Fmaj7
    [98.0, 146.83, 196.0, 293.66],   // G
  ],
  sde: [
    [55.0, 110.0, 164.81, 220.0],    // A low stack
    [43.65, 87.31, 130.81, 174.61],  // F
    [49.0, 98.0, 146.83, 196.0],     // G
    [41.2, 82.41, 123.47, 164.81],   // E
  ],
}
const ARP = {
  design: [523.25, 659.25, 783.99, 987.77, 783.99, 659.25], // C5 E5 G5 B5 …
  sde: [220.0, 261.63, 329.63, 440.0, 329.63, 523.25, 440.0, 261.63], // Am pent climb
}

function buildAudio(mode = 'design') {
  const ctx = new (window.AudioContext || window.webkitAudioContext)()
  const master = ctx.createGain()
  master.gain.value = 0
  const comp = ctx.createDynamicsCompressor()
  master.connect(comp).connect(ctx.destination)
  const timers = []

  /* --- shared pad --- */
  const padFilter = ctx.createBiquadFilter()
  padFilter.type = 'lowpass'
  padFilter.frequency.value = mode === 'design' ? 900 : 520
  padFilter.Q.value = 0.5
  const padGain = ctx.createGain()
  padGain.gain.value = mode === 'design' ? 0.14 : 0.12
  padFilter.connect(padGain).connect(master)

  const prog = PROG[mode]
  const oscs = prog[0].map((f, i) => {
    const o = ctx.createOscillator()
    o.type = mode === 'design' ? (i % 2 ? 'triangle' : 'sine') : 'sawtooth'
    o.frequency.value = f
    o.detune.value = (i - 1.5) * (mode === 'design' ? 4 : 7)
    const g = ctx.createGain()
    g.gain.value = mode === 'design' ? 0.2 : 0.12
    o.connect(g).connect(padFilter)
    o.start()
    return o
  })

  const lfo = ctx.createOscillator()
  lfo.frequency.value = 0.07
  const lfoGain = ctx.createGain()
  lfoGain.gain.value = mode === 'design' ? 260 : 160
  lfo.connect(lfoGain).connect(padFilter.frequency)
  lfo.start()

  /* --- note voices --- */
  const pluck = (freq, when, vol = 0.06, dur = 1.6) => {
    // soft felt-piano pluck for design mode
    const o = ctx.createOscillator()
    o.type = 'sine'
    o.frequency.value = freq
    const o2 = ctx.createOscillator()
    o2.type = 'triangle'
    o2.frequency.value = freq * 2
    const g = ctx.createGain()
    const g2 = ctx.createGain()
    g2.gain.value = 0.25
    g.gain.setValueAtTime(0.0001, when)
    g.gain.exponentialRampToValueAtTime(vol, when + 0.02)
    g.gain.exponentialRampToValueAtTime(0.0001, when + dur)
    o.connect(g)
    o2.connect(g2).connect(g)
    g.connect(master)
    o.start(when); o2.start(when)
    o.stop(when + dur + 0.1); o2.stop(when + dur + 0.1)
  }

  const blip = (freq, when, vol = 0.045) => {
    // filtered square blip for sde mode
    const o = ctx.createOscillator()
    o.type = 'square'
    o.frequency.value = freq
    const f = ctx.createBiquadFilter()
    f.type = 'lowpass'
    f.frequency.value = 1400
    const g = ctx.createGain()
    g.gain.setValueAtTime(0.0001, when)
    g.gain.exponentialRampToValueAtTime(vol, when + 0.008)
    g.gain.exponentialRampToValueAtTime(0.0001, when + 0.22)
    o.connect(f).connect(g).connect(master)
    o.start(when)
    o.stop(when + 0.3)
  }

  const sub = (freq, when) => {
    const o = ctx.createOscillator()
    o.type = 'sine'
    o.frequency.value = freq
    const g = ctx.createGain()
    g.gain.setValueAtTime(0.0001, when)
    g.gain.exponentialRampToValueAtTime(0.11, when + 0.03)
    g.gain.exponentialRampToValueAtTime(0.0001, when + 0.9)
    o.connect(g).connect(master)
    o.start(when)
    o.stop(when + 1)
  }

  const hat = (when) => {
    const src = ctx.createBufferSource()
    const buf = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate)
    const d = buf.getChannelData(0)
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length)
    src.buffer = buf
    const f = ctx.createBiquadFilter()
    f.type = 'highpass'
    f.frequency.value = 7000
    const g = ctx.createGain()
    g.gain.value = 0.035
    src.connect(f).connect(g).connect(master)
    src.start(when)
  }

  /* --- sequencing --- */
  let chord = 0
  const arp = ARP[mode]

  if (mode === 'design') {
    // slow arpeggio, one pluck per ~600ms, chord walk every 8s
    let step = 0
    timers.push(setInterval(() => {
      const t = ctx.currentTime + 0.05
      pluck(arp[step % arp.length] * (chord % 2 === 0 ? 1 : 0.8409), t, 0.05 + Math.random() * 0.02)
      if (step % 6 === 0) pluck(arp[0] / 2, t, 0.035, 2.4)
      step++
    }, 620))
    timers.push(setInterval(() => {
      chord = (chord + 1) % prog.length
      prog[chord].forEach((f, i) => oscs[i].frequency.linearRampToValueAtTime(f, ctx.currentTime + 3))
    }, 8000))
  } else {
    // 140ms sequencer: 16th blips, sub on the 1, hats on offbeats
    let step = 0
    timers.push(setInterval(() => {
      const t = ctx.currentTime + 0.05
      if (step % 2 === 0) blip(arp[(step / 2) % arp.length], t)
      if (step % 16 === 0) sub(prog[chord][0], t)
      if (step % 4 === 2) hat(t)
      step++
    }, 140))
    timers.push(setInterval(() => {
      chord = (chord + 1) % prog.length
      prog[chord].forEach((f, i) => oscs[i].frequency.linearRampToValueAtTime(f, ctx.currentTime + 2))
    }, 8960))
  }

  return {
    ctx,
    master,
    stop: () => {
      timers.forEach(clearInterval)
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8)
      setTimeout(() => ctx.close(), 1000)
    },
  }
}

/* ---------- global audio manager ----------
   File-first: plays /bgm-design.mp3 or /bgm-sde.mp3 from public/.
   If the file is missing or unsupported, falls back to the
   generative score above, so the site never goes silent by accident.
   Music is ON by default — it starts on the gate click (a user
   gesture, so browsers allow it). The nav toggle mutes, and the
   preference is remembered for the session.                       */

const FILES = { design: '/bgm-design.mp3', sde: '/bgm-sde.mp3' }
const TARGET_VOL = 0.35

const bgmState = { el: null, gen: null, mode: null, playing: false, subs: new Set() }
const notify = () => bgmState.subs.forEach((f) => f(bgmState.playing))

function haltPlayback() {
  if (bgmState.el) {
    const el = bgmState.el
    bgmState.el = null
    const fade = setInterval(() => {
      el.volume = Math.max(0, el.volume - 0.05)
      if (el.volume <= 0) { clearInterval(fade); el.pause(); el.src = '' }
    }, 60)
  }
  if (bgmState.gen) { bgmState.gen.stop(); bgmState.gen = null }
  bgmState.playing = false
}

function playFor(mode) {
  haltPlayback()
  bgmState.mode = mode

  const startGenerative = () => {
    const g = buildAudio(mode)
    g.master.gain.linearRampToValueAtTime(0.5, g.ctx.currentTime + 2)
    bgmState.gen = g
    bgmState.playing = true
    notify()
  }

  const el = new Audio(FILES[mode] || FILES.design)
  el.loop = true
  el.volume = 0
  el.play().then(() => {
    bgmState.el = el
    bgmState.playing = true
    notify()
    const fade = setInterval(() => {
      if (bgmState.el !== el) { clearInterval(fade); return }
      el.volume = Math.min(TARGET_VOL, el.volume + 0.02)
      if (el.volume >= TARGET_VOL) clearInterval(fade)
    }, 90)
  }).catch((err) => {
    if (err && err.name === 'NotAllowedError') {
      // autoplay blocked (page reload, no gesture yet) — stay quiet,
      // the toggle or the next gate click will start it
      bgmState.playing = false
      notify()
      return
    }
    // file missing / unsupported — generative fallback
    startGenerative()
  })
}

export function startBgm(mode) {
  if (sessionStorage.getItem('bgmMuted') === '1') return
  playFor(mode)
}

export function stopBgm() {
  haltPlayback()
  notify()
}

export function Bgm({ mode = 'design' }) {
  const [on, setOn] = useState(bgmState.playing)

  useEffect(() => {
    const sub = (v) => setOn(v)
    bgmState.subs.add(sub)
    setOn(bgmState.playing)
    return () => bgmState.subs.delete(sub)
  }, [])

  // entering a mode while music plays swaps the track
  useEffect(() => {
    if (bgmState.playing && bgmState.mode !== mode) playFor(mode)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode])

  const toggle = () => {
    if (bgmState.playing) {
      sessionStorage.setItem('bgmMuted', '1')
      stopBgm()
    } else {
      sessionStorage.removeItem('bgmMuted')
      playFor(mode)
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label={on ? 'Mute ambient score' : 'Play ambient score'}
      aria-pressed={on}
      className={`group inline-flex h-10 items-center gap-2.5 rounded-full border px-3.5 transition-colors duration-300 ${
        on ? 'border-cyan/60 bg-cyan/10 text-cyan' : 'border-edge text-mist hover:border-cyan/50 hover:text-fore'
      }`}
    >
      {on ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
      <span className="flex h-3.5 items-end gap-[2px]" aria-hidden>
        {[0.5, 0.9, 0.65, 1, 0.45].map((peak, i) => (
          <motion.span
            key={i}
            className={`w-[2px] rounded-full ${on ? 'bg-cyan' : 'bg-mist/50'}`}
            animate={on ? { height: [3, 14 * peak, 5, 12 * peak, 3] } : { height: 3 }}
            transition={on ? { duration: 1.1 + i * 0.13, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.3 }}
          />
        ))}
      </span>
      <span className="hidden font-mono text-[9px] uppercase tracking-[0.2em] sm:block">
        {on ? 'Score' : 'Muted'}
      </span>
    </button>
  )
}
