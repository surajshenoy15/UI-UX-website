import { useMemo, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from 'framer-motion'
import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  Layers3,
  LayoutDashboard,
  MonitorSmartphone,
  PenTool,
  Sparkles,
  Workflow,
} from 'lucide-react'
import { experience } from '../data'
import { Section } from './Chrome'
import { Spotlight, EASE } from './motion'

const FEATURED_INTERNSHIP_ID = 'savvywise'

const accentColors = {
  azure: 'rgb(var(--azure))',
  sky: 'rgb(var(--sky))',
  white: 'rgb(var(--fore))',
}

/* ================================================================
   FEATURED UI/UX INTERNSHIP
================================================================ */

const DESIGN_AREAS = [
  {
    icon: Workflow,
    label: 'UX process',
    value: 'Flows and wireframes',
  },
  {
    icon: LayoutDashboard,
    label: 'Interface focus',
    value: 'Dashboard experience',
  },
  {
    icon: Layers3,
    label: 'System thinking',
    value: 'Reusable components',
  },
  {
    icon: MonitorSmartphone,
    label: 'Delivery',
    value: 'Responsive prototypes',
  },
]

function FeaturedArtwork() {
  return (
    <div className="relative mx-auto aspect-[1.05/1] w-full max-w-[460px] overflow-hidden rounded-[1.75rem] border border-edge bg-ink/[0.08] p-4 sm:p-5">
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            'linear-gradient(rgb(var(--edge) / 0.35) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--edge) / 0.35) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Decorative glow */}
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-azure/15 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-cyan/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative flex h-full flex-col">
        {/* Mock browser bar */}
        <div className="flex items-center justify-between rounded-xl border border-edge bg-surface/80 px-3 py-2 backdrop-blur-xl">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-fore/15" />
            <span className="h-2 w-2 rounded-full bg-fore/15" />
            <span className="h-2 w-2 rounded-full bg-fore/15" />
          </div>

          <span className="font-mono text-[7px] uppercase tracking-[0.16em] text-mist/60 sm:text-[8px]">
            Tax audit workspace
          </span>
        </div>

        {/* Dashboard */}
        <div className="mt-3 grid min-h-0 flex-1 grid-cols-[0.34fr_1fr] gap-3">
          <div className="rounded-xl border border-edge bg-surface/75 p-2.5 backdrop-blur-xl sm:p-3">
            <div className="h-7 rounded-lg bg-azure/15" />

            <div className="mt-4 space-y-2">
              {[0, 1, 2, 3].map((item) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.25 + item * 0.08,
                    ease: EASE,
                  }}
                  className={`h-7 rounded-lg border ${
                    item === 1
                      ? 'border-azure/25 bg-azure/10'
                      : 'border-transparent bg-fore/[0.04]'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex min-w-0 flex-col rounded-xl border border-edge bg-surface/75 p-3 backdrop-blur-xl sm:p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="h-2.5 w-20 rounded-full bg-fore/20 sm:w-28" />
                <div className="mt-2 h-2 w-14 rounded-full bg-fore/10 sm:w-20" />
              </div>

              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 0 rgb(var(--azure) / 0)',
                    '0 0 24px rgb(var(--azure) / 0.25)',
                    '0 0 0 rgb(var(--azure) / 0)',
                  ],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                }}
                className="h-8 w-16 rounded-lg bg-azure"
              />
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {[0, 1, 2].map((item) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.35 + item * 0.09,
                  }}
                  className="rounded-lg border border-edge bg-ink/[0.05] p-2"
                >
                  <div className="h-2 w-1/2 rounded-full bg-mist/20" />
                  <div
                    className={`mt-3 h-4 rounded-md ${
                      item === 1 ? 'bg-azure/30' : 'bg-fore/10'
                    }`}
                  />
                </motion.div>
              ))}
            </div>

            <div className="mt-3 grid min-h-0 flex-1 grid-cols-[1.2fr_0.8fr] gap-2">
              <div className="flex min-h-0 items-end gap-1.5 rounded-lg border border-edge bg-ink/[0.04] p-2">
                {[48, 72, 40, 86, 62, 76].map((height, index) => (
                  <motion.span
                    key={`${height}-${index}`}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${height}%` }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.45 + index * 0.07,
                      duration: 0.5,
                      ease: EASE,
                    }}
                    className={`min-h-1 flex-1 rounded-t-sm ${
                      index === 3 ? 'bg-azure' : 'bg-azure/20'
                    }`}
                  />
                ))}
              </div>

              <div className="space-y-2 rounded-lg border border-edge bg-ink/[0.04] p-2">
                {[0, 1, 2].map((item) => (
                  <div
                    key={item}
                    className="rounded-md border border-edge bg-surface/60 p-2"
                  >
                    <div className="h-1.5 w-1/2 rounded-full bg-fore/15" />
                    <div className="mt-2 h-2 rounded-full bg-sky/15" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Floating design label */}
        <motion.div
          animate={{
            y: [0, -7, 0],
            rotate: [-1, 1, -1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-7 right-6 rounded-xl border border-azure/30 bg-surface/90 px-3 py-2 shadow-[0_16px_40px_rgb(var(--azure)/0.16)] backdrop-blur-xl sm:bottom-8 sm:right-8"
        >
          <p className="font-mono text-[7px] uppercase tracking-[0.14em] text-mist/60">
            Design decision
          </p>

          <p className="mt-1 text-[10px] font-semibold text-azure sm:text-xs">
            Clarity before complexity
          </p>
        </motion.div>
      </div>
    </div>
  )
}

function FeaturedExperience({ job }) {
  const [showDetails, setShowDetails] = useState(true)

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.7,
        ease: EASE,
      }}
      className="relative overflow-hidden rounded-[2rem] border border-azure/35 bg-gradient-to-br from-azure/[0.12] via-surface to-sky/[0.06] shadow-[0_30px_100px_rgb(var(--azure)/0.13)]"
    >
      <div
        className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-azure via-sky to-cyan"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-azure/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative grid gap-8 p-5 sm:p-7 lg:grid-cols-[1fr_0.82fr] lg:gap-12 lg:p-10">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-azure/30 bg-azure/10 px-3 py-1.5 font-mono text-[8px] font-medium uppercase tracking-[0.16em] text-azure sm:text-[9px]">
              <Sparkles className="h-3.5 w-3.5" />
              Featured UI/UX internship
            </span>

            <span className="rounded-full border border-edge bg-surface/60 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-mist">
              {job.tag}
            </span>
          </div>

          <div className="mt-6">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-azure">
              {job.period}
            </p>

            <h3 className="mt-3 max-w-2xl font-display text-[clamp(2rem,7vw,4.25rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-fore">
              {job.role}
            </h3>

            <div className="mt-5 flex flex-col gap-2 text-sm text-mist sm:flex-row sm:flex-wrap sm:items-center">
              <span className="flex items-center gap-2">
                <Building2 className="h-4 w-4 shrink-0 text-azure" />
                {job.company}
              </span>

              <span className="hidden text-edge sm:inline">/</span>

              <span className="w-fit rounded-full bg-azure/10 px-3 py-1 font-medium text-azure sm:bg-transparent sm:p-0">
                {job.product}
              </span>
            </div>
          </div>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-mist sm:text-[15px]">
            My dedicated UI/UX role focused on converting complex tax-audit
            and compliance requirements into clear dashboards, structured user
            flows, responsive screens and reusable interface components.
          </p>

          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {DESIGN_AREAS.map(({ icon: Icon, label, value }, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.2 + index * 0.08,
                }}
                className="rounded-2xl border border-azure/20 bg-surface/55 p-4 backdrop-blur-md"
              >
                <Icon className="h-4 w-4 text-azure" />

                <p className="mt-4 font-mono text-[7px] uppercase tracking-[0.14em] text-mist/60 sm:text-[8px]">
                  {label}
                </p>

                <p className="mt-1.5 text-xs font-semibold leading-5 text-fore">
                  {value}
                </p>
              </motion.div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setShowDetails((current) => !current)}
            aria-expanded={showDetails}
            aria-controls="featured-uiux-details"
            className="mt-7 inline-flex min-h-11 items-center gap-3 rounded-full border border-azure/30 bg-azure/10 px-5 py-2.5 font-mono text-[9px] uppercase tracking-[0.16em] text-azure outline-none transition-all hover:border-azure hover:bg-azure hover:text-paperInk focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            {showDetails ? 'Hide contribution' : 'Explore contribution'}

            <motion.span
              animate={{ rotate: showDetails ? 180 : 0 }}
              transition={{
                duration: 0.3,
                ease: EASE,
              }}
            >
              <ChevronDown className="h-4 w-4" />
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {showDetails && (
              <motion.div
                id="featured-uiux-details"
                initial={{
                  height: 0,
                  opacity: 0,
                }}
                animate={{
                  height: 'auto',
                  opacity: 1,
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.45,
                  ease: EASE,
                }}
                className="overflow-hidden"
              >
                <div className="mt-7 border-t border-edge pt-6">
                  <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-mist/60">
                    What I contributed
                  </p>

                  <ul className="mt-5 space-y-4">
                    {job.points.map((point, index) => (
                      <motion.li
                        key={point}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.08 + index * 0.07,
                        }}
                        className="flex gap-3 text-sm leading-7 text-fore/80"
                      >
                        <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-azure/30 bg-azure/10 text-azure">
                          <Check className="h-3 w-3" />
                        </span>

                        <span>{point}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {job.stack.map((skill, index) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.3 + index * 0.06,
                        }}
                        whileHover={{ y: -3 }}
                        className="rounded-full border border-azure/25 bg-azure/[0.06] px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-azure sm:text-[9px]"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex min-w-0 items-center">
          <FeaturedArtwork />
        </div>
      </div>
    </motion.article>
  )
}

/* ================================================================
   OTHER EXPERIENCE CARDS
================================================================ */

function ExperienceCard({ job, index, open, onToggle }) {
  const color = accentColors[job.accent] || accentColors.azure

  return (
    <motion.li
      initial={{
        opacity: 0,
        y: 24,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        margin: '-60px',
      }}
      transition={{
        duration: 0.55,
        delay: index * 0.05,
        ease: EASE,
      }}
      className="relative"
    >
      {/* Number marker */}
      <div className="absolute left-0 top-7 z-10 hidden -translate-x-1/2 sm:block">
        <motion.span
          whileHover={{ scale: 1.15 }}
          className="grid h-10 w-10 place-items-center rounded-full border border-edge bg-surface font-mono text-[9px] text-mist shadow-lg"
        >
          {String(index + 1).padStart(2, '0')}
        </motion.span>
      </div>

      <div className="sm:pl-10 lg:pl-14">
        <div className="card relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-azure/25 hover:shadow-[0_20px_55px_rgb(var(--azure)/0.08)]">
          <Spotlight>
            <button
              type="button"
              onClick={onToggle}
              aria-expanded={open}
              aria-controls={`experience-${job.id}`}
              className="group flex w-full min-w-0 items-start justify-between gap-4 p-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-azure sm:p-7 lg:p-8"
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="font-mono text-[8px] uppercase tracking-[0.16em] sm:text-[9px]"
                    style={{ color }}
                  >
                    {job.period}
                  </span>

                  <span className="rounded-full border border-edge px-2.5 py-1 font-mono text-[7px] uppercase tracking-[0.14em] text-mist/70 sm:text-[8px]">
                    {job.tag}
                  </span>
                </div>

                <h3 className="mt-4 break-words font-display text-xl font-bold leading-tight tracking-tight text-fore sm:text-2xl">
                  {job.role}
                </h3>

                <div className="mt-3 flex flex-col gap-2 text-sm text-mist sm:flex-row sm:flex-wrap sm:items-center">
                  <span className="flex items-center gap-2">
                    <Building2 className="h-3.5 w-3.5 shrink-0" />
                    {job.company}
                  </span>

                  <span className="hidden text-edge sm:inline">/</span>

                  <span className="text-fore/85">
                    {job.product}
                  </span>
                </div>
              </div>

              <motion.span
                animate={{ rotate: open ? 180 : 0 }}
                transition={{
                  duration: 0.3,
                  ease: EASE,
                }}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-edge text-mist transition-colors group-hover:border-azure/30 group-hover:text-azure"
              >
                <ChevronDown className="h-4 w-4" />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={`experience-${job.id}`}
                  initial={{
                    height: 0,
                    opacity: 0,
                  }}
                  animate={{
                    height: 'auto',
                    opacity: 1,
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: EASE,
                  }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-6 sm:px-7 sm:pb-8 lg:px-8">
                    <div className="rule mb-6" />

                    <ul className="grid gap-3 lg:grid-cols-2">
                      {job.points.map((point, pointIndex) => (
                        <motion.li
                          key={point}
                          initial={{
                            opacity: 0,
                            y: 8,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            delay: 0.07 + pointIndex * 0.06,
                          }}
                          className="rounded-xl border border-edge bg-ink/[0.04] p-4 text-sm leading-7 text-mist transition-colors hover:border-azure/20 hover:text-fore"
                        >
                          <span
                            className="mb-3 block h-1 w-8 rounded-full"
                            style={{ background: color }}
                          />

                          {point}
                        </motion.li>
                      ))}
                    </ul>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {job.stack.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-edge px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-mist"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Spotlight>
        </div>
      </div>
    </motion.li>
  )
}

/* ================================================================
   TIMELINE SECTION
================================================================ */

export default function Timeline() {
  const [openJob, setOpenJob] = useState(null)
  const timelineRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 78%', 'end 65%'],
  })

  const progressHeight = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', '100%'],
  )

  const { featuredJob, otherJobs } = useMemo(() => {
    return {
      featuredJob:
        experience.find(
          (job) => job.id === FEATURED_INTERNSHIP_ID,
        ) || experience[0],
      otherJobs: experience.filter(
        (job) => job.id !== FEATURED_INTERNSHIP_ID,
      ),
    }
  }, [])

  return (
    <Section
      theme="light"
      id="timeline"
      eyebrow="Experience"
      title="Design experience that goes beyond the screen."
      kicker="My UI/UX internship at SavvyWise established my approach to user flows, responsive dashboards, reusable components and developer-ready design. My other roles strengthened my ability to carry those decisions from concept to production."
    >
      {/* Experience summary */}
      <div className="mb-8 grid gap-3 sm:mb-10 sm:grid-cols-3">
        {[
          {
            icon: PenTool,
            label: 'Dedicated UI/UX role',
            value: 'SavvyWise, Australia',
          },
          {
            icon: BriefcaseBusiness,
            label: 'Total internships',
            value: `${experience.length} professional roles`,
          },
          {
            icon: CalendarDays,
            label: 'Design approach',
            value: 'Research to production',
          },
        ].map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="flex items-center gap-4 rounded-2xl border border-edge bg-surface/60 p-4 backdrop-blur-md sm:p-5"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-azure/25 bg-azure/10 text-azure">
              <Icon className="h-4 w-4" />
            </span>

            <div>
              <p className="font-mono text-[7px] uppercase tracking-[0.14em] text-mist/60 sm:text-[8px]">
                {label}
              </p>

              <p className="mt-1 text-xs font-semibold leading-5 text-fore sm:text-sm">
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Featured UI/UX experience */}
      <FeaturedExperience job={featuredJob} />

      {/* Supporting experience */}
      <div className="mt-14 sm:mt-16 lg:mt-20">
        <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-azure">
              Supporting experience
            </p>

            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-fore sm:text-3xl">
              Design thinking carried into development.
            </h3>
          </div>

          <p className="max-w-md text-sm leading-7 text-mist">
            These roles strengthened my frontend, mobile and product-delivery
            skills while keeping usability and interface quality central.
          </p>
        </div>

        <div
          ref={timelineRef}
          className="relative"
        >
          <div
            className="absolute bottom-0 left-0 top-0 hidden w-px bg-edge sm:block"
            aria-hidden="true"
          />

          <motion.div
            style={{ height: progressHeight }}
            className="absolute left-0 top-0 hidden w-px bg-gradient-to-b from-azure via-sky to-cyan sm:block"
            aria-hidden="true"
          />

          <ul className="space-y-5 sm:space-y-6">
            {otherJobs.map((job, index) => (
              <ExperienceCard
                key={job.id}
                job={job}
                index={index}
                open={openJob === job.id}
                onToggle={() =>
                  setOpenJob((currentJob) =>
                    currentJob === job.id ? null : job.id,
                  )
                }
              />
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}