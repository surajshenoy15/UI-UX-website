import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Building2, ChevronDown } from 'lucide-react'
import { experience } from '../data'
import { Section } from './Chrome'
import { Spotlight, EASE } from './motion'

const hex = { azure: 'rgb(var(--azure))', sky: 'rgb(var(--sky))', white: 'rgb(var(--fore))' }

function Track({ job, open, onToggle }) {
  const color = hex[job.accent]
  return (
    <motion.li
      initial={{ opacity: 0, x: -22 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.6, ease: EASE }}
      className="relative pl-12 sm:pl-20"
    >
      <motion.span
        whileHover={{ scale: 1.5 }}
        className="absolute left-[14px] top-[30px] h-3 w-3 -translate-x-1/2 rounded-full ring-[5px] ring-ink transition-transform sm:left-[30px]"
        style={{ background: color, boxShadow: `0 0 18px ${color}` }}
      />

      <div className="card">
        <Spotlight>
          <button onClick={onToggle} aria-expanded={open} className="flex w-full items-start justify-between gap-6 p-7 text-left sm:p-8">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color }}>{job.period}</span>
                <span className="rounded-full border border-edge px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-mist/70">{job.tag}</span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold leading-[1.1] tracking-tight sm:text-3xl">{job.role}</h3>
              <p className="mt-3 flex flex-wrap items-center gap-2 text-sm text-mist">
                <Building2 className="h-3.5 w-3.5 shrink-0" />
                {job.company}
                <span className="text-edge">/</span>
                <span className="text-fore/90">{job.product}</span>
              </p>
            </div>
            <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.35, ease: EASE }} className="mt-2 shrink-0">
              <ChevronDown className="h-5 w-5 text-mist" />
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="overflow-hidden"
              >
                <div className="px-7 pb-8 sm:px-8">
                  <div className="mb-7 rule" />
                  <ul className="space-y-4">
                    {job.points.map((p, i) => (
                      <motion.li
                        key={p}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.08 + i * 0.07 }}
                        className="group/li flex gap-4 text-sm leading-[1.75] text-mist transition-colors hover:text-fore"
                      >
                        <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full transition-transform duration-300 group-hover/li:scale-[2]" style={{ background: color }} />
                        {p}
                      </motion.li>
                    ))}
                  </ul>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {job.stack.map((s, i) => (
                      <motion.span
                        key={s}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.05 }}
                        whileHover={{ y: -3 }}
                        className="rounded-md border px-3 py-1.5 font-mono text-[10px] tracking-wide"
                        style={{ borderColor: 'rgb(var(--edge))', color }}
                      >
                        {s}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Spotlight>
      </div>
    </motion.li>
  )
}

export default function Timeline() {
  const [open, setOpen] = useState(experience[0].id)
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <Section
      theme="light"
      id="timeline"
      eyebrow="Experience"
      title="Five internships, one throughline."
      kicker="Design the flow, then build it. Every role below involved shipping an interface someone had to use on Monday morning."
    >
      <div ref={ref} className="relative">
        <div className="absolute left-[14px] top-0 h-full w-px bg-edge sm:left-[30px]" aria-hidden />
        <motion.div style={{ height }} className="absolute left-[14px] top-0 w-px bg-gradient-to-b from-azure via-sky to-fore sm:left-[30px]" aria-hidden />
        <ul className="space-y-7">
          {experience.map((job) => (
            <Track key={job.id} job={job} open={open === job.id} onToggle={() => setOpen(open === job.id ? null : job.id)} />
          ))}
        </ul>
      </div>
    </Section>
  )
}
