import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  Terminal, GitBranch, GitCommitHorizontal, ExternalLink, ArrowUpRight, Play,
  Cpu, Server, Smartphone, Braces, PenTool, Mail, Phone, Github, Linkedin,
  ChevronRight, Folder, FileCode2, Globe, Boxes,
} from 'lucide-react'
import { profile, sde, education } from '../data'
import { Magnetic, Reveal, Spotlight, CountUp, useTilt, EASE } from './motion'
import { ParticleField, Bgm } from './Cinema'

/* =================================================================
   SDE MODE — a terminal, not a brochure. Everything reads like the
   tools: a shell that types itself, projects as repos with RUN
   buttons, experience as a git log, skills as a package manifest.
================================================================= */

/* ---------- typing hook ---------- */
function useTypewriter(lines, speed = 26) {
  const reduce = useReducedMotion()
  const [out, setOut] = useState(reduce ? lines : [])
  const [cursorLine, setCursorLine] = useState(0)

  useEffect(() => {
    if (reduce) return
    let li = 0
    let ci = 0
    let acc = []
    let t
    const step = () => {
      if (li >= lines.length) return
      const line = lines[li]
      ci++
      acc = [...acc.slice(0, li), line.slice(0, ci)]
      setOut([...acc])
      setCursorLine(li)
      if (ci >= line.length) {
        li++
        ci = 0
        t = setTimeout(step, 340)
      } else {
        t = setTimeout(step, line.startsWith('$') ? speed : speed * 0.4)
      }
    }
    t = setTimeout(step, 500)
    return () => clearTimeout(t)
  }, [lines, speed, reduce])

  return { out, cursorLine }
}

/* ---------- hero terminal ---------- */
const BOOT = [
  '$ whoami',
  'p-suraj-shenoy — SDE · App Developer · UI/UX',
  '$ cat stack.txt',
  'MERN · React Native · FastAPI · Spring Boot · AWS',
  '$ ls deployments/',
  'play-store/  app-store/  vercel/  render/',
  '$ ./run portfolio --mode=engineer',
  '> ready. scroll to continue _',
]

function HeroTerminal() {
  const { out, cursorLine } = useTypewriter(BOOT)
  const tilt = useTilt(7)
  return (
    <motion.div
      ref={tilt.ref}
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={tilt.onPointerLeave}
      style={tilt.style}
      initial={{ opacity: 0, y: 30, rotateX: -8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
      className="preserve-3d relative w-full overflow-hidden rounded-2xl border border-edge bg-navy shadow-[0_50px_120px_-50px_rgb(var(--azure)/0.5)]"
    >
      <div className="flex items-center gap-2 border-b border-edge bg-surface px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-mist">
          <Terminal className="h-3 w-3" />
          suraj@portfolio — zsh
        </span>
      </div>
      <div className="min-h-[280px] p-5 font-mono text-[12.5px] leading-[1.9] sm:min-h-[300px] sm:p-6 sm:text-[13.5px]">
        {out.map((line, i) => (
          <p key={i} className={line.startsWith('$') ? 'text-fore' : line.startsWith('>') ? 'text-cyan' : 'text-azure'}>
            {line.startsWith('$') && <span className="mr-2 text-cyan">➜</span>}
            {line}
            {i === cursorLine && <span className="ml-0.5 inline-block h-[1.1em] w-[7px] translate-y-[3px] animate-pulse bg-cyan" />}
          </p>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent_0_2px,rgb(0_0_0/0.08)_2px_4px)]" aria-hidden />
    </motion.div>
  )
}

function SdeHero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, 100])
  const fade = useTransform(scrollY, [0, 440], [1, 0])

  return (
    <section id="sde-top" data-theme="dark" className="relative overflow-hidden pb-20 pt-32 sm:pt-40">
      <div className="pointer-events-none absolute inset-0 grid-lines" aria-hidden />
      <ParticleField density={70} className="!fixed opacity-50" />
      <div className="pointer-events-none absolute -left-40 top-24 h-[420px] w-[420px] rounded-full bg-azure/10 blur-[140px]" aria-hidden />

      <div className="shell relative">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
          <motion.div style={{ y, opacity: fade }}>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-edge bg-navy/70 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-mist backdrop-blur"
            >
              <GitBranch className="h-3 w-3 text-cyan" />
              main — all checks passing
            </motion.div>

            <h1 className="mt-8 font-display font-extrabold tracking-tighter">
              <span className="block text-[clamp(2.4rem,6.2vw,4.2rem)] leading-[0.94] text-fore">P Suraj Shenoy</span>
              <span className="mt-4 flex flex-wrap items-center gap-3 text-[clamp(1.1rem,2.6vw,1.7rem)] font-bold text-azure">
                <span className="font-mono text-cyan">&lt;</span>
                Software Engineer
                <span className="font-mono text-cyan">/&gt;</span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-7 max-w-xl text-[15px] leading-[1.75] text-mist"
            >
              {sde.summary}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="mt-9 flex flex-wrap gap-4"
            >
              <Magnetic>
                <a href="#repos" className="shine group inline-flex items-center gap-3 rounded-full bg-paper px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-paperInk">
                  <Play className="h-4 w-4" />
                  Run the projects
                </a>
              </Magnetic>
              <Magnetic strength={0.22}>
                <a href="#sde-contact" className="inline-flex items-center rounded-full border border-edge px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-mist transition-colors duration-300 hover:border-cyan hover:text-fore">
                  ./contact.sh
                </a>
              </Magnetic>
            </motion.div>

            <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-edge bg-edge sm:grid-cols-4">
              {sde.stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.08 }}
                  className="bg-ink px-4 py-5 transition-colors duration-300 hover:bg-navy"
                >
                  <p className="font-display text-2xl font-bold leading-none text-fore"><CountUp value={s.value} /></p>
                  <p className="mt-2 font-mono text-[9px] uppercase leading-relaxed tracking-[0.16em] text-mist/70">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="perspective">
            <HeroTerminal />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- projects as repos ---------- */
const LANG_DOT = { Python: '#3572A5', Java: '#B07219', TypeScript: '#3178C6', JavaScript: '#F1E05A' }

function Repo({ p, i }) {
  const tilt = useTilt(6)
  const hasLive = p.live && !p.live.startsWith('REPLACE_ME')
  return (
    <motion.div
      ref={tilt.ref}
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={tilt.onPointerLeave}
      style={tilt.style}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (i % 2) * 0.08, ease: EASE }}
      className="card preserve-3d"
    >
      <Spotlight className="flex h-full flex-col p-7 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <Folder className="h-4 w-4 text-cyan" />
            <h3 className="font-mono text-base font-semibold text-azure sm:text-lg">
              suraj / <span className="text-fore">{p.name.toLowerCase().replace(/\s+/g, '-')}</span>
            </h3>
          </div>
          <span className="shrink-0 rounded-full border border-edge px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-mist">
            public
          </span>
        </div>

        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-mist/60">{p.kind} · {p.period}</p>

        <ul className="mt-6 flex-1 space-y-3">
          {p.points.map((pt) => (
            <li key={pt} className="group/li flex gap-3 text-[13.5px] leading-[1.7] text-mist transition-colors hover:text-fore">
              <ChevronRight className="mt-1 h-3.5 w-3.5 shrink-0 text-cyan transition-transform duration-300 group-hover/li:translate-x-1" />
              {pt}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap items-center gap-2">
          <span className="mr-1 flex items-center gap-1.5 font-mono text-[11px] text-mist">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: LANG_DOT[p.lang] || '#4D8DFF' }} />
            {p.lang}
          </span>
          {p.stack.map((s) => (
            <span key={s} className="rounded-md border border-edge px-2.5 py-1 font-mono text-[10px] text-mist">{s}</span>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-edge pt-6">
          {hasLive ? (
            <Magnetic strength={0.25}>
              <a
                href={p.live}
                target="_blank"
                rel="noreferrer"
                className="shine group inline-flex items-center gap-2.5 rounded-lg bg-cyan px-5 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink transition-transform"
              >
                <Globe className="h-4 w-4" />
                Open live project
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
          ) : (
            <span className="inline-flex items-center gap-2.5 rounded-lg border border-edge px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-mist/50">
              <Server className="h-4 w-4" />
              Deploy link pending
            </span>
          )}
          <a href="#sde-contact" className="link-sweep inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-azure">
            Ask about the build
          </a>
        </div>
      </Spotlight>
    </motion.div>
  )
}

function Repos() {
  return (
    <section id="repos" data-theme="dark" className="band group/sec relative scroll-mt-24">
      <div className="shell">
        <header className="mb-14 max-w-3xl">
          <Reveal>
            <p className="eyebrow">~/projects</p>
          </Reveal>
          <h2 className="mt-6 font-display text-[clamp(2rem,5vw,3.4rem)] font-extrabold leading-[1] tracking-tight text-fore">
            Shipped, deployed, indexed.
          </h2>
          <Reveal delay={0.12}>
            <p className="mt-6 text-[15px] leading-[1.75] text-mist">
              Every project below runs somewhere real — app stores, Vercel, Render. Hit{' '}
              <span className="font-mono text-cyan">Open live project</span> to use them yourself.
            </p>
          </Reveal>
        </header>
        <div className="perspective grid gap-6 lg:grid-cols-2">
          {sde.projects.map((p, i) => <Repo key={p.id} p={p} i={i} />)}
        </div>
      </div>
    </section>
  )
}

/* ---------- experience as git log ---------- */
function GitLog() {
  const [open, setOpen] = useState(sde.experience[0].id)
  return (
    <section id="sde-exp" data-theme="dark" className="band group/sec relative scroll-mt-24">
      <div className="shell">
        <header className="mb-14 max-w-3xl">
          <Reveal><p className="eyebrow">git log --experience</p></Reveal>
          <h2 className="mt-6 font-display text-[clamp(2rem,5vw,3.4rem)] font-extrabold leading-[1] tracking-tight text-fore">
            Commit history.
          </h2>
        </header>

        <div className="relative">
          <div className="absolute left-[11px] top-2 h-[calc(100%-16px)] w-px bg-edge sm:left-[13px]" aria-hidden />
          <ul className="space-y-4">
            {sde.experience.map((job) => {
              const isOpen = open === job.id
              return (
                <motion.li
                  key={job.id}
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="relative pl-10 sm:pl-12"
                >
                  <GitCommitHorizontal className={`absolute left-0 top-6 h-6 w-6 transition-colors ${isOpen ? 'text-cyan' : 'text-mist/50'}`} />
                  <div className="card">
                    <button
                      onClick={() => setOpen(isOpen ? null : job.id)}
                      aria-expanded={isOpen}
                      className="flex w-full flex-wrap items-baseline gap-x-4 gap-y-1 p-5 text-left font-mono sm:p-6"
                    >
                      <span className="text-[12px] text-cyan">{job.hash}</span>
                      <span className="text-[14px] font-semibold text-fore sm:text-[15px]">{job.role}</span>
                      <span className="text-[12px] text-azure">@ {job.company}</span>
                      <span className="ml-auto text-[10px] uppercase tracking-[0.16em] text-mist/60">{job.period}</span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-6 sm:px-6">
                            <div className="mb-5 rule" />
                            <ul className="space-y-3">
                              {job.points.map((p) => (
                                <li key={p} className="flex gap-3 text-[13.5px] leading-[1.7] text-mist">
                                  <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-cyan" />
                                  {p}
                                </li>
                              ))}
                            </ul>
                            <div className="mt-5 flex flex-wrap gap-2">
                              {job.stack.map((s) => (
                                <span key={s} className="rounded-md border border-edge px-2.5 py-1 font-mono text-[10px] text-azure">{s}</span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ---------- skills as a manifest ---------- */
const GROUP_ICON = { Programming: Braces, 'Web & App': Smartphone, 'Data & Infra': Server, 'AI & ML': Cpu, 'UI/UX & Frontend': PenTool }

function Manifest() {
  return (
    <section id="sde-skills" data-theme="dark" className="band group/sec relative scroll-mt-24">
      <div className="shell">
        <header className="mb-14 max-w-3xl">
          <Reveal><p className="eyebrow">package.json</p></Reveal>
          <h2 className="mt-6 font-display text-[clamp(2rem,5vw,3.4rem)] font-extrabold leading-[1] tracking-tight text-fore">
            Dependencies.
          </h2>
        </header>

        <div className="card overflow-hidden">
          <div className="flex items-center gap-2 border-b border-edge bg-surface px-5 py-3">
            <FileCode2 className="h-3.5 w-3.5 text-cyan" />
            <span className="font-mono text-[11px] text-mist">suraj-shenoy / package.json</span>
          </div>
          <div className="grid gap-0 p-6 font-mono text-[13px] leading-[2] sm:p-8 md:grid-cols-2 md:gap-x-12">
            {sde.skills.map((g, gi) => {
              const Icon = GROUP_ICON[g.group] || Boxes
              return (
                <Reveal key={g.group} delay={gi * 0.06}>
                  <div className="py-3">
                    <p className="flex items-center gap-2.5 text-azure">
                      <Icon className="h-3.5 w-3.5 text-cyan" />
                      &quot;{g.group}&quot;: {'{'}
                    </p>
                    <div className="mt-1 flex flex-wrap gap-2 pl-6">
                      {g.items.map((s) => (
                        <motion.span
                          key={s}
                          whileHover={{ y: -3, color: 'rgb(var(--cyan))' }}
                          className="cursor-default rounded-md border border-edge bg-ink px-2.5 py-1 text-[11.5px] text-mist"
                        >
                          {s}
                        </motion.span>
                      ))}
                    </div>
                    <p className="text-azure">{'}'}{gi < sde.skills.length - 1 ? ',' : ''}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>

        {/* education inline */}
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {education.map((e, i) => (
            <Reveal key={e.school} delay={i * 0.07} className="card">
              <Spotlight className="p-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist/60">{e.period}</p>
                <h3 className="mt-3 font-display text-lg font-bold leading-snug tracking-tight text-fore">{e.school}</h3>
                <p className="mt-2 font-mono text-[12px] text-cyan">{e.detail}</p>
                <p className="mt-1 text-xs text-mist/70">{e.place}</p>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- contact ---------- */
function SdeContact() {
  return (
    <section id="sde-contact" data-theme="dark" className="band relative scroll-mt-24 overflow-hidden">
      <ParticleField density={70} />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/10 blur-[150px]" aria-hidden />
      <div className="shell relative text-center">
        <Reveal><p className="font-mono text-[11px] uppercase tracking-[0.3em] text-cyan">./contact.sh</p></Reveal>
        <h2 className="mx-auto mt-7 max-w-3xl font-display text-[clamp(2.2rem,6vw,4.2rem)] font-extrabold leading-[1] tracking-tighter text-fore">
          Got something to build?
        </h2>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-7 max-w-xl font-mono text-[13px] leading-[1.9] text-mist">
            <span className="text-cyan">$</span> git clone your-problem && cd solutions
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <div className="mt-11 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <a href={`mailto:${profile.email}`} className="shine group inline-flex items-center gap-3 rounded-full bg-paper px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-paperInk">
                <Mail className="h-4 w-4" />
                {profile.email}
              </a>
            </Magnetic>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 font-mono text-[11px] uppercase tracking-[0.18em] text-mist/80">
            <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="link-sweep inline-flex items-center gap-2.5 hover:text-fore"><Phone className="h-3.5 w-3.5" />{profile.phone}</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="link-sweep inline-flex items-center gap-2.5 hover:text-fore"><Linkedin className="h-3.5 w-3.5" />LinkedIn</a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="link-sweep inline-flex items-center gap-2.5 hover:text-fore"><Github className="h-3.5 w-3.5" />GitHub</a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- SDE nav ---------- */
function SdeNav({ onSwitch }) {
  const [solid, setSolid] = useState(false)
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${solid ? 'border-b border-edge/70 bg-ink/85 backdrop-blur-xl' : 'border-b border-transparent'}`}>
      <nav className="shell flex items-center justify-between py-4">
        <a href="#sde-top" className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-edge bg-navy font-mono text-[13px] font-bold text-cyan">$_</span>
          <span className="hidden font-mono text-xs uppercase tracking-[0.18em] text-fore sm:block">suraj@sde:~</span>
        </a>
        <ul className="hidden items-center gap-1 font-mono text-[11px] uppercase tracking-[0.16em] md:flex">
          {[['repos', 'projects'], ['sde-exp', 'git log'], ['sde-skills', 'stack'], ['sde-contact', 'contact']].map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} className="rounded-full px-4 py-2 text-mist transition-colors hover:text-cyan">./{label}</a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Bgm mode="sde" />
          <button
            onClick={onSwitch}
            className="inline-flex items-center gap-2 rounded-full border border-edge px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-mist transition-colors duration-300 hover:border-azure hover:text-fore"
          >
            <PenTool className="h-3 w-3" />
            <span className="hidden sm:inline">Designer mode</span>
            <span className="sm:hidden">UI/UX</span>
          </button>
        </div>
      </nav>
    </header>
  )
}

/* ---------- the SDE app ---------- */
export default function Sde({ onSwitch }) {
  useEffect(() => {
    document.documentElement.classList.remove('theme-light')
  }, [])

  return (
    <div
      style={{
        '--azure': '96 165 250',
        '--sky': '134 239 172',
        '--cyan': '74 222 128',
        '--surface': '10 22 16',
        '--navy': '7 16 12',
        '--ink': '3 8 6',
        '--edge': '26 48 38',
        '--mist': '148 180 160',
      }}
      className="bg-ink text-fore"
    >
      <SdeNav onSwitch={onSwitch} />
      <main>
        <SdeHero />
        <Repos />
        <GitLog />
        <Manifest />
        <SdeContact />
      </main>
      <footer className="border-t border-edge py-8">
        <div className="shell flex flex-col items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-mist/60 sm:flex-row">
          <span>© P Suraj Shenoy — exit code 0</span>
          <button onClick={onSwitch} className="link-sweep text-cyan">Switch to designer mode</button>
        </div>
      </footer>
    </div>
  )
}
