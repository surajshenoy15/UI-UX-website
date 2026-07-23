import { useEffect, useState } from 'react'
import {
  AnimatePresence,
  motion,
} from 'framer-motion'
import {
  Accessibility,
  Check,
  Copy,
  Eye,
  Layers3,
  LayoutDashboard,
  MonitorSmartphone,
  MousePointer2,
  Palette as PaletteIcon,
  Pipette,
  RotateCcw,
  Save,
  Smartphone,
  Sparkles,
  Type,
  WandSparkles,
} from 'lucide-react'
import { Reveal, SplitWords, EASE } from './motion'

/* ================================================================
   DESIGN DNA
   A creative, interactive explanation of the decisions behind
   the portfolio, its visual system and its typography.
================================================================ */

/* ----------------------------------------------------------------
   Shared data
---------------------------------------------------------------- */

const TOKENS = [
  {
    name: 'Ink',
    varName: '--ink',
    role: 'Main background',
  },
  {
    name: 'Navy',
    varName: '--navy',
    role: 'Raised sections',
  },
  {
    name: 'Surface',
    varName: '--surface',
    role: 'Cards and panels',
  },
  {
    name: 'Edge',
    varName: '--edge',
    role: 'Borders and dividers',
  },
  {
    name: 'Azure',
    varName: '--azure',
    role: 'Primary actions',
  },
  {
    name: 'Sky',
    varName: '--sky',
    role: 'Secondary highlights',
  },
  {
    name: 'Cyan',
    varName: '--cyan',
    role: 'Visual emphasis',
  },
  {
    name: 'Fore',
    varName: '--fore',
    role: 'Primary text',
  },
  {
    name: 'Mist',
    varName: '--mist',
    role: 'Supporting text',
  },
]

const FACES = [
  {
    name: 'Syne',
    css: 'Syne, sans-serif',
    role: 'Display headings',
    weights: [600, 700, 800],
    sample: 'Designing clear experiences',
  },
  {
    name: 'Space Grotesk',
    css: '"Space Grotesk", sans-serif',
    role: 'Body and UI',
    weights: [300, 400, 500, 700],
    sample: 'Readable content at every screen size',
  },
  {
    name: 'JetBrains Mono',
    css: '"JetBrains Mono", monospace',
    role: 'Labels and data',
    weights: [400, 500],
    sample: 'UI / UX DESIGNER',
  },
]

const TYPE_PRESETS = [
  {
    id: 'hero',
    label: 'Hero',
    text: 'UI/UX that ships.',
    faceIndex: 0,
    weight: 800,
    size: 92,
  },
  {
    id: 'heading',
    label: 'Heading',
    text: 'Interfaces shaped around real work.',
    faceIndex: 0,
    weight: 700,
    size: 58,
  },
  {
    id: 'body',
    label: 'Body',
    text: 'I simplify complex workflows into clear and usable product experiences.',
    faceIndex: 1,
    weight: 400,
    size: 30,
  },
  {
    id: 'label',
    label: 'Label',
    text: 'DESIGN SYSTEM · RESPONSIVE · ACCESSIBLE',
    faceIndex: 2,
    weight: 500,
    size: 24,
  },
]

const DESIGN_DECISIONS = [
  {
    id: 'hierarchy',
    number: '01',
    icon: LayoutDashboard,
    title: 'Recruiter-first hierarchy',
    summary:
      'I structured the portfolio around what a recruiter needs to understand first.',
    whatIDid:
      'I placed my UI/UX role, dedicated design internship and strongest interface projects before secondary technical details.',
    impact:
      'Visitors can quickly understand my design focus, relevant experience and the kind of product work I can contribute to.',
    result: 'Clearer first impression',
  },
  {
    id: 'system',
    number: '02',
    icon: Layers3,
    title: 'Reusable visual language',
    summary:
      'I created shared interface rules instead of styling each section independently.',
    whatIDid:
      'I reused semantic colors, card structures, border treatments, spacing rhythms and typography roles throughout the portfolio.',
    impact:
      'The experience feels connected while new sections can be designed and developed without introducing visual inconsistency.',
    result: 'Consistent experience',
  },
  {
    id: 'responsive',
    number: '03',
    icon: MonitorSmartphone,
    title: 'Responsive information flow',
    summary:
      'I designed the content to preserve its meaning across different screen sizes.',
    whatIDid:
      'I used fluid typography, flexible grids, touch-friendly controls, readable line lengths and layouts that stack naturally.',
    impact:
      'The same portfolio story remains clear on compact phones, tablets, laptops and wide desktop screens.',
    result: 'Cross-device clarity',
  },
  {
    id: 'accessible',
    number: '04',
    icon: Accessibility,
    title: 'Accessible interaction states',
    summary:
      'I treated accessibility as a core part of the visual and interaction system.',
    whatIDid:
      'I added visible focus states, descriptive labels, keyboard interactions, contrast-aware colors and reduced-motion support.',
    impact:
      'The interface is easier to understand and operate with keyboard, pointer, touch and assistive technologies.',
    result: 'Inclusive interactions',
  },
]

/* ----------------------------------------------------------------
   Helpers
---------------------------------------------------------------- */

const TYPOGRAPHY_STORAGE_KEY = 'portfolio-typography-preview'

const DEFAULT_TYPOGRAPHY_SETTINGS = {
  text: FACES[0].sample,
  faceIndex: 0,
  weight: 700,
  size: 64,
}

const clampNumber = (value, minimum, maximum) => {
  return Math.min(maximum, Math.max(minimum, value))
}

const rgbToHex = (rgb = '0 0 0') => {
  const [r = 0, g = 0, b = 0] = rgb
    .trim()
    .split(/\s+/)
    .map(Number)

  return `#${[r, g, b]
    .map((value) =>
      clampNumber(value, 0, 255)
        .toString(16)
        .padStart(2, '0')
        .toUpperCase(),
    )
    .join('')}`
}

const getContrastColor = (rgb = '0 0 0') => {
  const [r = 0, g = 0, b = 0] = rgb
    .split(/\s+/)
    .map(Number)

  const brightness =
    r * 0.299 +
    g * 0.587 +
    b * 0.114

  return brightness > 150 ? '#04091A' : '#FFFFFF'
}

const loadTypographySettings = () => {
  if (typeof window === 'undefined') {
    return DEFAULT_TYPOGRAPHY_SETTINGS
  }

  try {
    const storedValue = localStorage.getItem(
      TYPOGRAPHY_STORAGE_KEY,
    )

    if (!storedValue) {
      return DEFAULT_TYPOGRAPHY_SETTINGS
    }

    const parsedValue = JSON.parse(storedValue)

    const faceIndex = clampNumber(
      Number(parsedValue.faceIndex) ||
        DEFAULT_TYPOGRAPHY_SETTINGS.faceIndex,
      0,
      FACES.length - 1,
    )

    const selectedFace = FACES[faceIndex]

    const parsedWeight = Number(parsedValue.weight)

    const weight = selectedFace.weights.includes(
      parsedWeight,
    )
      ? parsedWeight
      : selectedFace.weights[
          selectedFace.weights.length - 1
        ]

    const parsedSize = Number(parsedValue.size)

    return {
      text:
        typeof parsedValue.text === 'string'
          ? parsedValue.text.slice(0, 180)
          : selectedFace.sample,
      faceIndex,
      weight,
      size: Number.isFinite(parsedSize)
        ? clampNumber(parsedSize, 20, 110)
        : DEFAULT_TYPOGRAPHY_SETTINGS.size,
    }
  } catch {
    return DEFAULT_TYPOGRAPHY_SETTINGS
  }
}

/* ----------------------------------------------------------------
   Animated Design DNA intro
---------------------------------------------------------------- */

function DnaArtwork() {
  const nodes = [
    {
      top: '7%',
      left: '22%',
      label: 'Hierarchy',
    },
    {
      top: '26%',
      left: '72%',
      label: 'System',
    },
    {
      top: '48%',
      left: '18%',
      label: 'Responsive',
    },
    {
      top: '70%',
      left: '74%',
      label: 'Accessible',
    },
  ]

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[430px]">
      <div className="absolute inset-[8%] rounded-full border border-edge/70" />

      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute inset-[17%] rounded-full border border-dashed border-azure/30"
      />

      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute inset-[29%] rounded-full border border-dashed border-sky/30"
      />

      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="dna-line"
            x1="0"
            x2="1"
          >
            <stop
              offset="0%"
              stopColor="rgb(var(--azure))"
            />
            <stop
              offset="50%"
              stopColor="rgb(var(--sky))"
            />
            <stop
              offset="100%"
              stopColor="rgb(var(--cyan))"
            />
          </linearGradient>
        </defs>

        <motion.path
          d="M115 40 C305 100 90 180 285 240 C355 265 300 330 200 365"
          fill="none"
          stroke="url(#dna-line)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.8,
            ease: EASE,
          }}
        />

        <motion.path
          d="M285 40 C95 100 310 180 115 240 C45 265 100 330 200 365"
          fill="none"
          stroke="rgb(var(--edge))"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.8,
            delay: 0.15,
            ease: EASE,
          }}
        />

        {[75, 120, 170, 220, 275, 325].map(
          (y, index) => (
            <motion.line
              key={y}
              x1={
                index % 2 === 0
                  ? 135
                  : 165
              }
              x2={
                index % 2 === 0
                  ? 265
                  : 235
              }
              y1={y}
              y2={y}
              stroke="rgb(var(--edge))"
              strokeWidth="1"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.45 + index * 0.08,
              }}
            />
          ),
        )}
      </svg>

      <div className="absolute inset-[34%] grid place-items-center rounded-full border border-azure/30 bg-surface/90 text-center shadow-[0_20px_80px_rgb(var(--azure)/0.16)] backdrop-blur-xl">
        <div>
          <Sparkles className="mx-auto h-5 w-5 text-azure" />

          <p className="mt-2 font-display text-lg font-bold text-fore sm:text-xl">
            Design
          </p>

          <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-mist">
            to code
          </p>
        </div>
      </div>

      {nodes.map((node, index) => (
        <motion.div
          key={node.label}
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{ once: true }}
          transition={{
            delay: 0.4 + index * 0.12,
          }}
          animate={{
            y: [0, -6, 0],
          }}
          style={{
            top: node.top,
            left: node.left,
          }}
          className="absolute -translate-x-1/2 rounded-full border border-edge bg-surface/90 px-3 py-2 font-mono text-[8px] uppercase tracking-[0.14em] text-mist shadow-lg backdrop-blur-md sm:text-[9px]"
        >
          {node.label}
        </motion.div>
      ))}
    </div>
  )
}

function DesignIntro() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-edge bg-surface">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(circle at 10% 20%, rgb(var(--azure) / 0.14), transparent 34%), radial-gradient(circle at 90% 80%, rgb(var(--cyan) / 0.10), transparent 36%)',
        }}
      />

      <div className="relative grid items-center gap-8 p-5 sm:p-8 lg:grid-cols-[1fr_0.85fr] lg:p-10">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-azure/30 bg-azure/10 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-azure">
            <WandSparkles className="h-3.5 w-3.5" />
            Portfolio as a product
          </span>

          <h3 className="mt-6 max-w-xl font-display text-[clamp(1.8rem,5vw,3.2rem)] font-extrabold leading-[1.02] tracking-tight text-fore">
            Every interface decision has a purpose.
          </h3>

          <p className="mt-5 max-w-xl text-sm leading-7 text-mist sm:text-[15px]">
            I designed this portfolio to demonstrate how I think:
            identify the user, organize the information, establish
            reusable rules and validate the experience across devices.
          </p>

          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ['01', 'Role clarity'],
              ['02', 'Shared system'],
              ['03', 'Responsive flow'],
              ['04', 'Accessible states'],
            ].map(([number, label]) => (
              <div
                key={number}
                className="rounded-2xl border border-edge bg-ink/[0.06] p-4"
              >
                <span className="font-mono text-[9px] text-azure">
                  {number}
                </span>

                <p className="mt-2 text-xs font-medium leading-5 text-fore">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <DnaArtwork />
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------
   Creative design decision explorer
---------------------------------------------------------------- */

function DecisionVisual({ id }) {
  if (id === 'responsive') {
    return (
      <div className="flex h-full items-end justify-center gap-3 py-4 sm:gap-5">
        {[
          {
            width: 'w-16 sm:w-20',
            height: 'h-32 sm:h-40',
            label: 'Mobile',
          },
          {
            width: 'w-28 sm:w-36',
            height: 'h-40 sm:h-48',
            label: 'Tablet',
          },
          {
            width: 'w-44 sm:w-56',
            height: 'h-36 sm:h-44',
            label: 'Desktop',
          },
        ].map((device, index) => (
          <motion.div
            key={device.label}
            initial={{
              opacity: 0,
              y: 24,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.1,
            }}
            className={`${device.width} ${device.height} rounded-xl border border-edge bg-ink/10 p-2`}
          >
            <div className="h-2 w-1/2 rounded-full bg-azure/50" />

            <div className="mt-3 space-y-2">
              <div className="h-2 rounded-full bg-fore/15" />
              <div className="h-2 w-3/4 rounded-full bg-fore/10" />
              <div className="grid grid-cols-2 gap-1 pt-2">
                <div className="h-10 rounded-md bg-azure/15" />
                <div className="h-10 rounded-md bg-sky/15" />
              </div>
            </div>

            <p className="mt-3 text-center font-mono text-[7px] uppercase tracking-[0.12em] text-mist">
              {device.label}
            </p>
          </motion.div>
        ))}
      </div>
    )
  }

  if (id === 'accessible') {
    return (
      <div className="grid h-full place-items-center py-5">
        <div className="w-full max-w-sm space-y-4">
          <div className="rounded-2xl border-2 border-azure bg-azure/10 p-4 ring-4 ring-azure/10">
            <div className="flex items-center gap-3">
              <MousePointer2 className="h-5 w-5 text-azure" />

              <div>
                <p className="text-sm font-semibold text-fore">
                  Visible focus state
                </p>

                <p className="mt-1 text-xs text-mist">
                  Keyboard users always know where they are.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-edge bg-ink/10 p-4">
              <Eye className="h-4 w-4 text-sky" />
              <p className="mt-3 text-xs font-medium text-fore">
                Contrast
              </p>
            </div>

            <div className="rounded-xl border border-edge bg-ink/10 p-4">
              <Accessibility className="h-4 w-4 text-cyan" />
              <p className="mt-3 text-xs font-medium text-fore">
                Semantics
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (id === 'system') {
    return (
      <div className="grid h-full grid-cols-2 gap-3 py-4">
        {[0, 1, 2, 3].map((item) => (
          <motion.div
            key={item}
            initial={{
              opacity: 0,
              scale: 0.92,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              delay: item * 0.08,
            }}
            className="rounded-2xl border border-edge bg-ink/[0.07] p-4"
          >
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-azure/15" />
              <div className="h-2 w-16 rounded-full bg-fore/15" />
            </div>

            <div className="mt-5 space-y-2">
              <div className="h-2 rounded-full bg-fore/10" />
              <div className="h-2 w-4/5 rounded-full bg-fore/10" />
            </div>

            <div className="mt-5 h-8 rounded-lg border border-azure/25 bg-azure/10" />
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid h-full place-items-center py-5">
      <div className="w-full max-w-md rounded-2xl border border-edge bg-ink/[0.07] p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <div className="h-2 w-20 rounded-full bg-azure" />
          <div className="h-7 w-7 rounded-full border border-edge" />
        </div>

        <div className="mt-7">
          <div className="h-4 w-3/4 rounded-full bg-fore/25" />
          <div className="mt-3 h-3 w-full rounded-full bg-fore/10" />
          <div className="mt-2 h-3 w-4/5 rounded-full bg-fore/10" />
        </div>

        <div className="mt-7 grid grid-cols-3 gap-3">
          <div className="col-span-2 h-24 rounded-xl bg-azure/15" />
          <div className="h-24 rounded-xl bg-sky/15" />
        </div>

        <div className="mt-4 flex gap-3">
          <div className="h-9 flex-1 rounded-lg bg-azure" />
          <div className="h-9 flex-1 rounded-lg border border-edge" />
        </div>
      </div>
    </div>
  )
}

function DesignDecisions() {
  const [selectedId, setSelectedId] = useState(
    DESIGN_DECISIONS[0].id,
  )

  const selectedDecision =
    DESIGN_DECISIONS.find(
      (decision) => decision.id === selectedId,
    ) || DESIGN_DECISIONS[0]

  const SelectedIcon = selectedDecision.icon

  return (
    <div>
      <div className="max-w-3xl">
        <p className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-mist sm:tracking-[0.26em]">
          <Layers3 className="h-3.5 w-3.5 text-azure" />
          Decision explorer
        </p>

        <p className="mt-3 text-sm leading-7 text-mist">
          Select a decision to see what I changed, why I made
          the choice and how it improved the portfolio experience.
        </p>
      </div>

      <div className="mt-8 grid gap-5 xl:grid-cols-[0.78fr_1.22fr]">
        <div
          role="tablist"
          aria-label="Portfolio design decisions"
          className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1"
        >
          {DESIGN_DECISIONS.map((decision) => {
            const Icon = decision.icon
            const isSelected =
              decision.id === selectedId

            return (
              <motion.button
                key={decision.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() =>
                  setSelectedId(decision.id)
                }
                whileHover={{ x: 4 }}
                className={`group relative min-w-0 overflow-hidden rounded-2xl border p-4 text-left outline-none transition-colors sm:p-5 ${
                  isSelected
                    ? 'border-azure/50 bg-azure/[0.08]'
                    : 'border-edge bg-surface hover:border-azure/25'
                } focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 focus-visible:ring-offset-ink`}
              >
                {isSelected && (
                  <motion.span
                    layoutId="decision-active"
                    className="absolute inset-y-3 left-0 w-1 rounded-r-full bg-gradient-to-b from-azure via-sky to-cyan"
                  />
                )}

                <div className="flex items-start gap-4">
                  <span
                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl border ${
                      isSelected
                        ? 'border-azure/30 bg-azure/10 text-azure'
                        : 'border-edge text-mist'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>

                  <span className="min-w-0">
                    <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-mist/60">
                      Decision {decision.number}
                    </span>

                    <span className="mt-1 block text-sm font-semibold text-fore sm:text-[15px]">
                      {decision.title}
                    </span>

                    <span className="mt-2 block text-xs leading-5 text-mist">
                      {decision.summary}
                    </span>
                  </span>
                </div>
              </motion.button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.article
            key={selectedDecision.id}
            role="tabpanel"
            initial={{
              opacity: 0,
              y: 15,
              scale: 0.985,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -10,
            }}
            transition={{
              duration: 0.35,
              ease: EASE,
            }}
            className="card relative min-w-0 overflow-hidden"
          >
            <div className="h-1.5 bg-gradient-to-r from-azure via-sky to-cyan" />

            <div className="grid min-h-[500px] lg:grid-cols-[1fr_0.9fr]">
              <div className="p-5 sm:p-7 lg:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-azure/30 bg-azure/10 text-azure">
                      <SelectedIcon className="h-5 w-5" />
                    </span>

                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-azure">
                        Decision {selectedDecision.number}
                      </p>

                      <h3 className="mt-2 font-display text-xl font-bold leading-tight text-fore sm:text-2xl">
                        {selectedDecision.title}
                      </h3>
                    </div>
                  </div>

                  <span className="w-fit rounded-full border border-azure/25 bg-azure/[0.06] px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-azure">
                    {selectedDecision.result}
                  </span>
                </div>

                <p className="mt-6 text-sm leading-7 text-mist">
                  {selectedDecision.summary}
                </p>

                <div className="mt-7 space-y-4">
                  <div className="rounded-2xl border border-edge bg-ink/[0.06] p-5">
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-azure">
                      What I did
                    </p>

                    <p className="mt-3 text-sm leading-7 text-fore/85">
                      {selectedDecision.whatIDid}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-edge bg-ink/[0.06] p-5">
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-sky">
                      How it helped
                    </p>

                    <p className="mt-3 text-sm leading-7 text-fore/85">
                      {selectedDecision.impact}
                    </p>
                  </div>
                </div>
              </div>

              <div className="min-h-[300px] border-t border-edge bg-ink/[0.04] p-5 lg:border-l lg:border-t-0">
                <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-mist/60">
                  Visual application
                </p>

                <DecisionVisual
                  id={selectedDecision.id}
                />
              </div>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------
   Creative portfolio palette
---------------------------------------------------------------- */

function Palette() {
  const [values, setValues] = useState({})
  const [copied, setCopied] = useState(null)
  const [selectedToken, setSelectedToken] = useState(
    TOKENS[4],
  )

  useEffect(() => {
    const readThemeValues = () => {
      const styles = getComputedStyle(
        document.documentElement,
      )

      const nextValues = {}

      TOKENS.forEach((token) => {
        nextValues[token.varName] = styles
          .getPropertyValue(token.varName)
          .trim()
      })

      setValues(nextValues)
    }

    readThemeValues()

    const observer = new MutationObserver(
      readThemeValues,
    )

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  const copyColor = async (token) => {
    const hex = rgbToHex(values[token.varName])

    setSelectedToken(token)

    try {
      await navigator.clipboard.writeText(hex)
      setCopied(token.name)

      window.setTimeout(() => {
        setCopied(null)
      }, 1500)
    } catch {
      setCopied(null)
    }
  }

  const selectedRgb =
    values[selectedToken.varName] || '77 141 255'

  const selectedHex = rgbToHex(selectedRgb)

  return (
    <div>
      <div className="max-w-3xl">
        <p className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-mist sm:tracking-[0.26em]">
          <Pipette className="h-3.5 w-3.5 text-azure" />
          Palette in practice
        </p>

        <p className="mt-3 text-sm leading-7 text-mist">
          Select a token to copy its value and see how it behaves
          inside a real interface rather than as an isolated swatch.
        </p>
      </div>

      <div className="mt-8 grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {TOKENS.map((token, index) => {
            const rgb =
              values[token.varName] || '0 0 0'

            const hex = rgbToHex(rgb)
            const textColor =
              getContrastColor(rgb)

            const isSelected =
              selectedToken.varName ===
              token.varName

            return (
              <motion.button
                key={token.name}
                type="button"
                onClick={() => copyColor(token)}
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.04,
                  ease: EASE,
                }}
                whileHover={{
                  y: -6,
                  rotate: index % 2 === 0 ? -1 : 1,
                }}
                aria-pressed={isSelected}
                aria-label={`Copy ${token.name} color ${hex}`}
                className={`group relative min-h-40 overflow-hidden rounded-2xl border p-4 text-left outline-none transition-shadow ${
                  isSelected
                    ? 'border-azure shadow-[0_18px_45px_rgb(var(--azure)/0.18)]'
                    : 'border-edge'
                } focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 focus-visible:ring-offset-ink`}
                style={{
                  background: `rgb(${rgb})`,
                  color: textColor,
                }}
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[8px] uppercase tracking-[0.16em] opacity-65">
                    {String(index + 1).padStart(
                      2,
                      '0',
                    )}
                  </span>

                  {copied === token.name ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-70 group-focus-visible:opacity-70" />
                  )}
                </div>

                <div className="absolute inset-x-4 bottom-4">
                  <p className="text-sm font-semibold">
                    {copied === token.name
                      ? 'Copied'
                      : token.name}
                  </p>

                  <p className="mt-1 font-mono text-[9px] opacity-75">
                    {hex}
                  </p>

                  <p className="mt-2 text-[10px] leading-4 opacity-60">
                    {token.role}
                  </p>
                </div>
              </motion.button>
            )
          })}
        </div>

        <div className="card relative min-w-0 overflow-hidden p-5 sm:p-7">
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full blur-3xl"
            style={{
              background: `rgb(${selectedRgb} / 0.18)`,
            }}
          />

          <div className="relative">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-mist/60">
                  Applied token
                </p>

                <h3 className="mt-2 font-display text-xl font-bold text-fore">
                  {selectedToken.name}
                </h3>
              </div>

              <span className="rounded-full border border-edge px-3 py-1.5 font-mono text-[9px] text-mist">
                {selectedHex}
              </span>
            </div>

            <div className="mt-7 overflow-hidden rounded-2xl border border-edge bg-ink/[0.08]">
              <div className="flex items-center gap-2 border-b border-edge p-3">
                <span className="h-2.5 w-2.5 rounded-full bg-fore/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-fore/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-fore/15" />
              </div>

              <div className="grid gap-4 p-4 sm:grid-cols-[0.65fr_1.35fr]">
                <div className="rounded-xl border border-edge bg-surface p-3">
                  <div className="h-7 rounded-lg bg-fore/10" />

                  <div className="mt-4 space-y-2">
                    {[0, 1, 2, 3].map((item) => (
                      <div
                        key={item}
                        className="h-8 rounded-lg"
                        style={{
                          background:
                            item === 1
                              ? `rgb(${selectedRgb} / 0.16)`
                              : 'rgb(var(--fore) / 0.05)',
                          border:
                            item === 1
                              ? `1px solid rgb(${selectedRgb} / 0.32)`
                              : '1px solid transparent',
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-edge bg-surface p-4">
                  <div className="flex items-center justify-between">
                    <div className="h-3 w-24 rounded-full bg-fore/15" />

                    <div
                      className="h-8 w-20 rounded-lg"
                      style={{
                        background: `rgb(${selectedRgb})`,
                      }}
                    />
                  </div>

                  <div className="mt-6 flex h-28 items-end gap-2">
                    {[42, 72, 52, 92, 68, 82].map(
                      (bar, index) => (
                        <motion.span
                          key={bar}
                          initial={{ height: 0 }}
                          whileInView={{
                            height: `${bar}%`,
                          }}
                          viewport={{ once: true }}
                          transition={{
                            delay: index * 0.07,
                          }}
                          className="flex-1 rounded-t-md"
                          style={{
                            background:
                              index === 3
                                ? `rgb(${selectedRgb})`
                                : `rgb(${selectedRgb} / 0.24)`,
                          }}
                        />
                      ),
                    )}
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="h-14 rounded-xl bg-fore/[0.05]" />
                    <div
                      className="h-14 rounded-xl"
                      style={{
                        background: `rgb(${selectedRgb} / 0.12)`,
                        border: `1px solid rgb(${selectedRgb} / 0.24)`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-5 text-xs leading-6 text-mist">
              The preview demonstrates how the token behaves as
              navigation emphasis, a primary action, chart data and
              contextual highlighting.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------
   Creative typography playground
---------------------------------------------------------------- */

function Typography() {
  const [settings, setSettings] = useState(
    loadTypographySettings,
  )

  const {
    text,
    faceIndex,
    weight,
    size,
  } = settings

  const selectedFace = FACES[faceIndex]

  useEffect(() => {
    try {
      localStorage.setItem(
        TYPOGRAPHY_STORAGE_KEY,
        JSON.stringify(settings),
      )
    } catch {
      // Typography still works without localStorage.
    }
  }, [settings])

  const updateSetting = (name, value) => {
    setSettings((currentSettings) => ({
      ...currentSettings,
      [name]: value,
    }))
  }

  const selectFace = (nextFaceIndex) => {
    const nextFace = FACES[nextFaceIndex]

    setSettings((currentSettings) => ({
      ...currentSettings,
      faceIndex: nextFaceIndex,
      weight: nextFace.weights.includes(
        currentSettings.weight,
      )
        ? currentSettings.weight
        : nextFace.weights[
            nextFace.weights.length - 1
          ],
    }))
  }

  const applyPreset = (preset) => {
    setSettings({
      text: preset.text,
      faceIndex: preset.faceIndex,
      weight: preset.weight,
      size: preset.size,
    })
  }

  const resetTypography = () => {
    setSettings(DEFAULT_TYPOGRAPHY_SETTINGS)
  }

  const responsivePreviewSize = Math.max(
    5,
    size / 9,
  )

  return (
    <div>
      <div className="max-w-3xl">
        <p className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-mist sm:tracking-[0.26em]">
          <Type className="h-3.5 w-3.5 text-azure" />
          Interactive type laboratory
        </p>

        <p className="mt-3 text-sm leading-7 text-mist">
          Test the three typography roles used across the portfolio.
          Your text, font, weight and size are saved automatically.
        </p>
      </div>

      <div className="mt-8 overflow-hidden rounded-[2rem] border border-edge bg-surface">
        <div className="grid xl:grid-cols-[0.72fr_1.28fr]">
          <div className="border-b border-edge p-5 sm:p-7 xl:border-b-0 xl:border-r">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-mist/60">
                Type controls
              </p>

              <button
                type="button"
                onClick={resetTypography}
                className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-edge px-3 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-mist outline-none transition-colors hover:border-azure/40 hover:text-azure focus-visible:ring-2 focus-visible:ring-azure"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset
              </button>
            </div>

            <div className="mt-6">
              <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-mist/50">
                Quick presets
              </p>

              <div className="mt-3 grid grid-cols-2 gap-2">
                {TYPE_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() =>
                      applyPreset(preset)
                    }
                    className="min-h-11 rounded-xl border border-edge px-3 py-2 text-left font-mono text-[9px] uppercase tracking-[0.12em] text-mist outline-none transition-colors hover:border-azure/40 hover:bg-azure/[0.05] hover:text-fore focus-visible:ring-2 focus-visible:ring-azure"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <fieldset className="mt-7">
              <legend className="font-mono text-[8px] uppercase tracking-[0.18em] text-mist/50">
                Font family
              </legend>

              <div className="mt-3 space-y-2">
                {FACES.map((face, index) => {
                  const isSelected =
                    index === faceIndex

                  return (
                    <button
                      key={face.name}
                      type="button"
                      onClick={() =>
                        selectFace(index)
                      }
                      aria-pressed={isSelected}
                      className={`flex min-h-16 w-full items-center justify-between gap-3 rounded-xl border px-4 text-left outline-none transition-colors ${
                        isSelected
                          ? 'border-azure/50 bg-azure/[0.07]'
                          : 'border-edge hover:border-azure/25'
                      } focus-visible:ring-2 focus-visible:ring-azure`}
                    >
                      <span>
                        <span
                          className="block text-base font-semibold text-fore"
                          style={{
                            fontFamily: face.css,
                          }}
                        >
                          {face.name}
                        </span>

                        <span className="mt-1 block font-mono text-[8px] uppercase tracking-[0.12em] text-mist">
                          {face.role}
                        </span>
                      </span>

                      {isSelected && (
                        <Check className="h-4 w-4 shrink-0 text-azure" />
                      )}
                    </button>
                  )
                })}
              </div>
            </fieldset>

            <fieldset className="mt-6">
              <legend className="font-mono text-[8px] uppercase tracking-[0.18em] text-mist/50">
                Weight
              </legend>

              <div className="mt-3 flex flex-wrap gap-2">
                {selectedFace.weights.map(
                  (fontWeight) => (
                    <button
                      key={fontWeight}
                      type="button"
                      onClick={() =>
                        updateSetting(
                          'weight',
                          fontWeight,
                        )
                      }
                      aria-pressed={
                        weight === fontWeight
                      }
                      className={`min-h-11 min-w-14 rounded-full border px-4 py-2 font-mono text-[10px] outline-none transition-colors ${
                        weight === fontWeight
                          ? 'border-azure bg-azure/10 text-azure'
                          : 'border-edge text-mist hover:border-azure/30 hover:text-fore'
                      } focus-visible:ring-2 focus-visible:ring-azure`}
                    >
                      {fontWeight}
                    </button>
                  ),
                )}
              </div>
            </fieldset>

            <fieldset className="mt-6">
              <legend className="font-mono text-[8px] uppercase tracking-[0.18em] text-mist/50">
                Size
              </legend>

              <div className="mt-3 rounded-2xl border border-edge p-4">
                <div className="flex items-center justify-between gap-4">
                  <label
                    htmlFor="type-size"
                    className="text-sm text-fore"
                  >
                    Preview size
                  </label>

                  <div className="flex overflow-hidden rounded-lg border border-edge">
                    <input
                      id="type-size"
                      type="number"
                      min="20"
                      max="110"
                      value={size}
                      onChange={(event) =>
                        updateSetting(
                          'size',
                          clampNumber(
                            Number(
                              event.target.value,
                            ) || 20,
                            20,
                            110,
                          ),
                        )
                      }
                      className="h-10 w-16 bg-transparent px-2 text-right font-mono text-xs text-fore outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-azure"
                    />

                    <span className="grid place-items-center border-l border-edge px-3 font-mono text-[9px] text-mist">
                      px
                    </span>
                  </div>
                </div>

                <input
                  type="range"
                  min="20"
                  max="110"
                  value={size}
                  onChange={(event) =>
                    updateSetting(
                      'size',
                      Number(event.target.value),
                    )
                  }
                  aria-label="Typography preview size"
                  className="mt-5 h-2 w-full cursor-pointer appearance-none rounded-full outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-4 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-fore [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-fore"
                  style={{
                    background: `linear-gradient(
                      90deg,
                      rgb(var(--azure)) ${((size - 20) / 90) * 100}%,
                      rgb(var(--edge)) ${((size - 20) / 90) * 100}%
                    )`,
                  }}
                />
              </div>
            </fieldset>
          </div>

          <div className="relative flex min-h-[520px] min-w-0 flex-col overflow-hidden p-4 sm:p-7 lg:p-9">
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  'linear-gradient(rgb(var(--edge) / 0.35) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--edge) / 0.35) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />

            <div className="relative flex flex-col gap-4 border-b border-edge pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-mist/60">
                  Live composition
                </p>

                <p className="mt-2 text-xs leading-5 text-mist">
                  Click inside the stage and type
                  your own message.
                </p>
              </div>

              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-azure/25 bg-azure/[0.07] px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-azure">
                <Save className="h-3.5 w-3.5" />
                Saved locally
              </span>
            </div>

            <div className="relative grid min-h-0 flex-1 place-items-center py-8">
              <textarea
                value={text}
                onChange={(event) =>
                  updateSetting(
                    'text',
                    event.target.value.slice(
                      0,
                      180,
                    ),
                  )
                }
                maxLength={180}
                spellCheck={false}
                aria-label="Editable typography preview"
                placeholder="Type something..."
                className="max-h-[330px] min-h-52 w-full resize-none overflow-y-auto whitespace-pre-wrap break-words rounded-2xl border border-transparent bg-surface/40 px-4 py-8 text-center text-fore outline-none backdrop-blur-sm transition-colors placeholder:text-mist/40 focus-visible:border-azure/30 focus-visible:bg-azure/[0.03] focus-visible:ring-2 focus-visible:ring-azure sm:px-8"
                style={{
                  fontFamily: selectedFace.css,
                  fontWeight: weight,
                  fontSize: `clamp(20px, ${responsivePreviewSize}vw, ${size}px)`,
                  lineHeight: 1.08,
                }}
              />
            </div>

            <div className="relative border-t border-edge pt-4">
              <div className="flex flex-wrap gap-2">
                {[
                  selectedFace.name,
                  `Weight ${weight}`,
                  `${size}px`,
                  `${text.length}/180`,
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-edge bg-surface/60 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-mist backdrop-blur-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                {['Aa', '09', '?!'].map(
                  (sample) => (
                    <div
                      key={sample}
                      className="grid min-h-20 place-items-center rounded-xl border border-edge bg-surface/50 text-fore backdrop-blur-sm"
                      style={{
                        fontFamily:
                          selectedFace.css,
                        fontWeight: weight,
                      }}
                    >
                      {sample}
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------
   Section
---------------------------------------------------------------- */

export default function DesignSystem() {
  return (
    <section
      id="system"
      data-theme="light"
      className="band group/sec relative scroll-mt-24 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
        style={{
          background:
            'radial-gradient(circle at 50% 0%, rgb(var(--azure) / 0.10), transparent 56%)',
        }}
      />

      <div className="shell relative">
        <header className="mb-10 grid items-end gap-8 lg:grid-cols-[1fr_auto] sm:mb-14">
          <div className="max-w-3xl">
            <Reveal>
              <p className="eyebrow">
                Design DNA
              </p>
            </Reveal>

            <h2 className="mt-6 font-display text-[clamp(2rem,5vw,3.8rem)] font-extrabold leading-[0.98] tracking-tight">
              <SplitWords text="The thinking behind the interface." />
            </h2>

            <Reveal delay={0.15}>
              <p className="mt-6 max-w-2xl text-[15px] leading-[1.75] text-mist">
                This section shows how I transformed
                my portfolio into a structured product
                experience through hierarchy, reusable
                systems, responsive behavior and
                accessible interaction design.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="hidden items-center gap-3 rounded-full border border-edge bg-surface/70 px-4 py-3 backdrop-blur-xl lg:flex">
              <PaletteIcon className="h-4 w-4 text-azure" />

              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-mist">
                System · Type · Interaction
              </span>
            </div>
          </Reveal>
        </header>

        <div className="space-y-16 sm:space-y-20 lg:space-y-24">
          <Reveal>
            <DesignIntro />
          </Reveal>

          <div className="rule" />

          <Reveal>
            <DesignDecisions />
          </Reveal>

          <div className="rule" />

          <Reveal>
            <Palette />
          </Reveal>

          <div className="rule" />

          <Reveal>
            <Typography />
          </Reveal>
        </div>
      </div>
    </section>
  )
}