import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  PenTool, Code2, Database, Clapperboard, Sparkles,
  GraduationCap, Trophy, Languages as LangIcon,
  Activity, Layers, Film, Cpu, Mail, Phone, Github, Linkedin, ArrowUpRight, Copy, Check,
} from 'lucide-react'
import { skills, education, leadership, languages, interests, profile } from '../data'
import { Section } from './Chrome'
import { Magnetic, Reveal, Spotlight, SplitWords, useTilt, EASE } from './motion'
import { ParticleField } from './Cinema'

const iconMap = { PenTool, Code2, Database, Clapperboard, Sparkles, Activity, Layers, Film, Cpu }

/* ---------------- Skills ---------------- */
function SkillCard({ group, idx }) {
  const Icon = iconMap[group.icon]
  const tilt = useTilt(7)

  return (
    <motion.div
      ref={tilt.ref}
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={tilt.onPointerLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.6, delay: idx * 0.07, ease: EASE }}
      style={tilt.style}
      className="card preserve-3d"
    >
      <Spotlight className="p-8">
        <motion.div
          whileHover={{ rotate: -8, scale: 1.08 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          className="grid h-12 w-12 place-items-center rounded-xl border border-azure/40 bg-azure/10 text-azure"
          style={{ transform: 'translateZ(40px)' }}
        >
          <Icon className="h-5 w-5" />
        </motion.div>
        <h3 className="mt-6 font-display text-xl font-bold tracking-tight" style={{ transform: 'translateZ(26px)' }}>
          {group.group}
        </h3>
        <div className="mt-6 flex flex-wrap gap-2" style={{ transform: 'translateZ(18px)' }}>
          {group.items.map((s) => (
            <motion.span
              key={s}
              whileHover={{ y: -3 }}
              className="cursor-default rounded-full border border-edge bg-ink px-3.5 py-1.5 text-xs text-mist transition-colors hover:border-azure hover:text-fore"
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            >
              {s}
            </motion.span>
          ))}
        </div>
      </Spotlight>
    </motion.div>
  )
}

export function Skills() {
  return (
    <Section
      theme="dark"
      id="skills"
      eyebrow="Toolkit"
      title="Design tools on one hand, a build environment on the other."
      kicker="I hand off files I could implement myself — which is usually why the handoff goes well."
    >
      <div className="perspective grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((g, i) => (
          <SkillCard key={g.group} group={g} idx={i} />
        ))}
      </div>
    </Section>
  )
}

/* ---------------- Beyond ---------------- */
export function Beyond() {
  return (
    <Section
      theme="dark"
      id="beyond"
      eyebrow="Beyond the screen"
      title="Where the eye was trained."
      kicker="Branding for a 250-member graphics community, a color-grading habit, and a badminton court. All of it feeds the work."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <Reveal className="card lg:col-span-2">
          <Spotlight className="h-full p-8 sm:p-10">
            <div className="flex items-center gap-3">
              <Trophy className="h-4 w-4 text-azure" />
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-azure">Leadership</p>
            </div>
            <div className="mt-9 space-y-10">
              {leadership.map((l) => (
                <div key={l.org}>
                  <h3 className="font-display text-2xl font-bold tracking-tight">{l.role}</h3>
                  <p className="mt-2 text-sm text-sky">{l.org}</p>
                  <ul className="mt-5 space-y-3.5">
                    {l.points.map((p) => (
                      <li key={p} className="group/li flex gap-4 text-sm leading-[1.75] text-mist transition-colors hover:text-fore">
                        <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-azure transition-transform duration-300 group-hover/li:scale-[2]" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Spotlight>
        </Reveal>

        <div className="grid gap-6">
          <Reveal delay={0.08} className="card">
            <Spotlight className="p-8">
              <div className="flex items-center gap-3">
                <LangIcon className="h-4 w-4 text-azure" />
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-azure">Languages</p>
              </div>
              <ul className="mt-7 space-y-5">
                {languages.map((l, i) => (
                  <li key={l.name} className="group/lang">
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm text-fore">{l.name}</span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-mist/70">{l.level}</span>
                    </div>
                    <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-edge">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${l.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.1 + i * 0.09, ease: EASE }}
                        className="h-full rounded-full bg-gradient-to-r from-azure to-cyan"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </Spotlight>
          </Reveal>

          <Reveal delay={0.14} className="card">
            <Spotlight className="p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-azure">Off the clock</p>
              <ul className="mt-7 space-y-5">
                {interests.map((it) => {
                  const Icon = iconMap[it.icon]
                  return (
                    <motion.li
                      key={it.label}
                      whileHover={{ x: 5 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      className="flex items-center gap-4 text-sm text-mist transition-colors hover:text-fore"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-sky" />
                      {it.label}
                    </motion.li>
                  )
                })}
              </ul>
            </Spotlight>
          </Reveal>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {education.map((e, i) => (
          <Reveal key={e.school} delay={i * 0.08} className="card">
            <Spotlight className="p-8">
              <GraduationCap className="h-4 w-4 text-mist" />
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-mist/70">{e.period}</p>
              <h3 className="mt-3.5 font-display text-lg font-bold leading-snug tracking-tight">{e.school}</h3>
              <p className="mt-2.5 text-sm text-azure">{e.detail}</p>
              <p className="mt-1.5 text-xs text-mist/70">{e.place}</p>
            </Spotlight>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

/* ---------------- Contact ---------------- */
export function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    await navigator.clipboard.writeText(profile.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <section id="contact" data-theme="dark" className="band relative scroll-mt-24 overflow-hidden">
      <ParticleField density={80} />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[540px] w-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/10 blur-[150px]" aria-hidden />
      <div className="shell relative text-center">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-azure">Contact</p>
        </Reveal>
        <h2 className="mx-auto mt-7 max-w-3xl font-display text-[clamp(2.2rem,6vw,4.4rem)] font-extrabold leading-[1] tracking-tighter">
          <SplitWords text="Got a screen that isn't working yet?" />
        </h2>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-xl text-[15px] leading-[1.75] text-mist sm:text-base">
            Send the problem, not the spec. I'll come back with flows, screens, and an honest read on what to cut.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <a href={`mailto:${profile.email}`} className="shine group inline-flex items-center gap-3 rounded-full bg-paper px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-paperInk">
                <Mail className="h-4 w-4" />
                {profile.email}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
            <Magnetic strength={0.22}>
              <button onClick={copy} className="inline-flex items-center gap-2.5 rounded-full border border-edge px-6 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-mist transition-colors duration-300 hover:border-azure hover:text-fore">
                {copied ? <Check className="h-4 w-4 text-azure" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Copied' : 'Copy address'}
              </button>
            </Magnetic>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-5 font-mono text-[11px] uppercase tracking-[0.18em] text-mist/80">
            <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="link-sweep inline-flex items-center gap-2.5 hover:text-fore">
              <Phone className="h-3.5 w-3.5" />
              {profile.phone}
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="link-sweep inline-flex items-center gap-2.5 hover:text-fore">
              <Linkedin className="h-3.5 w-3.5" />
              LinkedIn
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="link-sweep inline-flex items-center gap-2.5 hover:text-fore">
              <Github className="h-3.5 w-3.5" />
              GitHub
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
