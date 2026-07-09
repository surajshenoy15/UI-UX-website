import { useRef, useState, useEffect } from 'react'
import {
  motion, useMotionValue, useSpring, useTransform,
  useInView, useMotionTemplate, animate, useReducedMotion,
} from 'framer-motion'

export const EASE = [0.22, 1, 0.36, 1]

/* Buttons and icons that lean toward the pointer. */
export function Magnetic({ children, strength = 0.32, className = '' }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 20, mass: 0.4 })
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 20, mass: 0.4 })

  const onMove = (e) => {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => { x.set(0); y.set(0) }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x, y }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  )
}

/* A card that lights up where the pointer touches it. */
export function Spotlight({ children, className = '', radius = 340 }) {
  const ref = useRef(null)
  const mx = useMotionValue(-999)
  const my = useMotionValue(-999)
  const bg = useMotionTemplate`radial-gradient(${radius}px circle at ${mx}px ${my}px, rgba(77,141,255,0.14), transparent 70%)`

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    mx.set(e.clientX - r.left)
    my.set(e.clientY - r.top)
  }

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={() => { mx.set(-999); my.set(-999) }} className={`group/spot ${className}`}>
      <motion.div style={{ background: bg }} className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100" aria-hidden />
      {children}
    </div>
  )
}

/* Numbers that count up the first time they scroll into view. */
export function CountUp({ value, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [text, setText] = useState('0')
  const numeric = parseFloat(String(value).replace(/[^0-9.]/g, ''))
  const suffix = String(value).replace(/[0-9.]/g, '')
  const decimals = String(value).includes('.') ? 2 : 0

  useEffect(() => {
    if (!inView || Number.isNaN(numeric)) return
    const controls = animate(0, numeric, {
      duration: 1.4,
      ease: EASE,
      onUpdate: (v) => setText(v.toFixed(decimals)),
    })
    return controls.stop
  }, [inView, numeric, decimals])

  return (
    <span ref={ref} className={className}>
      {Number.isNaN(numeric) ? value : `${text}${suffix}`}
    </span>
  )
}

/* Fade + rise on scroll. The default entrance for everything. */
export function Reveal({ children, delay = 0, y = 26, className = '', as = 'div' }) {
  const M = motion[as] || motion.div
  return (
    <M
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.65, delay, ease: EASE }}
      className={className}
    >
      {children}
    </M>
  )
}

/* Headline that assembles word by word. */
export function SplitWords({ text, className = '', delay = 0, stagger = 0.055 }) {
  return (
    <span className={className}>
      {text.split(' ').map((w, i) => (
        <span key={`${w}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            initial={{ y: '105%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, delay: delay + i * stagger, ease: EASE }}
            className="inline-block"
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  )
}

/* Each character nudges away from the pointer, then settles back. */
export function ScatterText({ text, className = '' }) {
  const reduce = useReducedMotion()
  return (
    <span className={className}>
      {text.split('').map((c, i) => (
        <motion.span
          key={i}
          whileHover={reduce ? {} : { y: -10, color: '#4D8DFF', transition: { type: 'spring', stiffness: 500, damping: 14 } }}
          className="inline-block cursor-default"
        >
          {c === ' ' ? '\u00A0' : c}
        </motion.span>
      ))}
    </span>
  )
}

/* A three-dimensional tilt that follows the pointer across a surface. */
export function useTilt(max = 8) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [max, -max]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-max, max]), { stiffness: 200, damping: 20 })

  const onPointerMove = (e) => {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onPointerLeave = () => { mx.set(0); my.set(0) }

  return { ref, style: { rotateX, rotateY }, onPointerMove, onPointerLeave }
}
