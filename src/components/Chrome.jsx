import { useEffect, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'framer-motion'
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
} from 'lucide-react'

import { profile } from '../data'
import { Bgm } from './Cinema'
import {
  EASE,
  Magnetic,
  Reveal,
  SplitWords,
} from './motion'

const links = [
  { id: 'about', label: 'About' },
  // { id: 'system', label: 'System' },
  { id: 'work', label: 'Work' },
  { id: 'timeline', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  // { id: 'beyond', label: 'Beyond' },
  { id: 'contact', label: 'Contact' },
]

/* ================================================================
   Scroll progress

   Keep z-index below Gate:
   Gate = z-[80]
   Scroll progress = z-[60]
================================================================ */

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  })

  return (
    <motion.div
      style={{
        scaleX: progress,
      }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-azure via-sky to-fore"
      aria-hidden="true"
    />
  )
}

/* ================================================================
   Scroll-controlled theme
================================================================ */

export function ThemeScroll() {
  useEffect(() => {
    let animationFrame = null

    const applyTheme = () => {
      animationFrame = null

      const sections = Array.from(
        document.querySelectorAll('[data-theme]'),
      )

      if (!sections.length) {
        document.documentElement.classList.remove(
          'theme-light',
        )
        return
      }

      const viewportMiddle =
        window.innerHeight / 2

      let closestSection = sections[0]
      let closestDistance =
        Number.POSITIVE_INFINITY

      sections.forEach((section) => {
        const rect =
          section.getBoundingClientRect()

        const containsViewportMiddle =
          rect.top <= viewportMiddle &&
          rect.bottom >= viewportMiddle

        const sectionMiddle =
          rect.top + rect.height / 2

        const distance =
          containsViewportMiddle
            ? Math.abs(
                sectionMiddle -
                  viewportMiddle,
              ) * 0.1
            : Math.abs(
                sectionMiddle -
                  viewportMiddle,
              )

        if (distance < closestDistance) {
          closestDistance = distance
          closestSection = section
        }
      })

      const useLightTheme =
        closestSection?.dataset.theme ===
        'light'

      document.documentElement.classList.toggle(
        'theme-light',
        useLightTheme,
      )
    }

    const requestThemeUpdate = () => {
      if (animationFrame !== null) return

      animationFrame =
        window.requestAnimationFrame(
          applyTheme,
        )
    }

    applyTheme()

    window.addEventListener(
      'scroll',
      requestThemeUpdate,
      {
        passive: true,
      },
    )

    window.addEventListener(
      'resize',
      requestThemeUpdate,
    )

    return () => {
      window.removeEventListener(
        'scroll',
        requestThemeUpdate,
      )

      window.removeEventListener(
        'resize',
        requestThemeUpdate,
      )

      if (animationFrame !== null) {
        window.cancelAnimationFrame(
          animationFrame,
        )
      }

      /*
        Remove the last UI/UX theme before the
        component unmounts during mode switching.
      */
      document.documentElement.classList.remove(
        'theme-light',
      )
    }
  }, [])

  return null
}

/* ================================================================
   Custom cursor

   Keep z-index below Gate:
   Gate = z-[80]
   Cursor = z-[70]
================================================================ */

export function Cursor() {
  const reduceMotion = useReducedMotion()

  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)

  const ringX = useSpring(dotX, {
    stiffness: 190,
    damping: 22,
    mass: 0.55,
  })

  const ringY = useSpring(dotY, {
    stiffness: 190,
    damping: 22,
    mass: 0.55,
  })

  const [cursorMode, setCursorMode] =
    useState('idle')

  const [pointerDown, setPointerDown] =
    useState(false)

  useEffect(() => {
    if (reduceMotion) {
      return undefined
    }

    const handlePointerMove = (event) => {
      dotX.set(event.clientX)
      dotY.set(event.clientY)

      const target = event.target

      if (!(target instanceof Element)) {
        setCursorMode('idle')
        return
      }

      if (
        target.closest(
          '[data-cursor="drag"]',
        )
      ) {
        setCursorMode('drag')
      } else if (
        target.closest(
          'input[type="range"]',
        )
      ) {
        setCursorMode('slide')
      } else if (
        target.closest(
          'a, button, [role="button"]',
        )
      ) {
        setCursorMode('link')
      } else if (
        target.closest(
          'h1, h2, h3, p',
        )
      ) {
        setCursorMode('text')
      } else {
        setCursorMode('idle')
      }
    }

    const handlePointerDown = () => {
      setPointerDown(true)
    }

    const handlePointerUp = () => {
      setPointerDown(false)
    }

    window.addEventListener(
      'pointermove',
      handlePointerMove,
    )

    window.addEventListener(
      'pointerdown',
      handlePointerDown,
    )

    window.addEventListener(
      'pointerup',
      handlePointerUp,
    )

    return () => {
      window.removeEventListener(
        'pointermove',
        handlePointerMove,
      )

      window.removeEventListener(
        'pointerdown',
        handlePointerDown,
      )

      window.removeEventListener(
        'pointerup',
        handlePointerUp,
      )
    }
  }, [
    reduceMotion,
    dotX,
    dotY,
  ])

  if (reduceMotion) {
    return null
  }

  const cursorLabels = {
    drag: 'Drag',
    slide: 'Slide',
    link: '',
    text: '',
    idle: '',
  }

  const cursorStyles = {
    idle: {
      scale: 1,
      opacity: 0.4,
      borderWidth: 1,
    },
    text: {
      scale: 0.55,
      opacity: 0.7,
      borderWidth: 1,
    },
    link: {
      scale: 1.9,
      opacity: 1,
      borderWidth: 1,
    },
    slide: {
      scale: 2.4,
      opacity: 1,
      borderWidth: 1,
    },
    drag: {
      scale: 2.9,
      opacity: 1,
      borderWidth: 1,
    },
  }

  const label =
    cursorLabels[cursorMode]

  const ring =
    cursorStyles[cursorMode]

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[70] hidden lg:block"
      aria-hidden="true"
    >
      <motion.div
        style={{
          x: dotX,
          y: dotY,
        }}
        animate={{
          scale:
            pointerDown
              ? 0.5
              : cursorMode === 'link'
                ? 0
                : 1,
        }}
        transition={{
          duration: 0.18,
        }}
        className="absolute -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-azure"
      />

      <motion.div
        style={{
          x: ringX,
          y: ringY,
        }}
        animate={{
          ...ring,
          scale:
            ring.scale *
            (pointerDown ? 0.86 : 1),
        }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 22,
        }}
        className="absolute -ml-4 -mt-4 grid h-8 w-8 place-items-center rounded-full border border-azure bg-azure/5 backdrop-blur-[1px]"
      >
        {label && (
          <span className="font-mono text-[3.4px] uppercase tracking-[0.18em] text-azure">
            {label}
          </span>
        )}
      </motion.div>
    </div>
  )
}

/* ================================================================
   Navigation
================================================================ */

export function Nav({ onSwitch }) {
  const [solid, setSolid] =
    useState(false)

  const [active, setActive] =
    useState('')

  const [open, setOpen] =
    useState(false)

  const handleModeSwitch = (event) => {
    event.preventDefault()
    event.stopPropagation()

    setOpen(false)

    document.documentElement.classList.remove(
      'theme-light',
    )

    if (typeof onSwitch === 'function') {
      onSwitch()
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setSolid(window.scrollY > 40)
    }

    handleScroll()

    window.addEventListener(
      'scroll',
      handleScroll,
      {
        passive: true,
      },
    )

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll,
      )
    }
  }, [])

  useEffect(() => {
    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActive(
                entry.target.id,
              )
            }
          })
        },
        {
          rootMargin:
            '-45% 0px -50% 0px',
        },
      )

    links.forEach((link) => {
      const section =
        document.getElementById(
          link.id,
        )

      if (section) {
        observer.observe(section)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  /*
    Mobile menu keyboard and scroll handling.
  */
  useEffect(() => {
    if (!open) {
      return undefined
    }

    const previousOverflow =
      document.body.style.overflow

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.body.style.overflow =
      'hidden'

    window.addEventListener(
      'keydown',
      handleKeyDown,
    )

    return () => {
      document.body.style.overflow =
        previousOverflow

      window.removeEventListener(
        'keydown',
        handleKeyDown,
      )
    }
  }, [open])

  /*
    Close the mobile menu when entering desktop mode.
  */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setOpen(false)
      }
    }

    window.addEventListener(
      'resize',
      handleResize,
    )

    return () => {
      window.removeEventListener(
        'resize',
        handleResize,
      )
    }
  }, [])

  return (
    <header
      className={`pointer-events-auto fixed inset-x-0 top-0 z-[9999] isolate transition-all duration-500 ${
        solid
          ? 'border-b border-edge/70 bg-ink/90 shadow-[0_12px_40px_rgb(0_0_0/0.18)] backdrop-blur-xl'
          : 'border-b border-transparent bg-ink/10 backdrop-blur-[2px]'
      }`}
    >
      <nav className="shell relative z-[10000] grid min-h-[72px] grid-cols-[auto_1fr_auto] items-center gap-3 py-3 sm:gap-5">
        {/* Brand */}
        <a
          href="#top"
          aria-label="P Suraj Shenoy — Back to top"
          className="group flex min-w-max shrink-0 items-center gap-2.5 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        >
          <span className="relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-xl border border-edge bg-navy shadow-[0_8px_30px_rgb(var(--azure)/0.08)]">
            <motion.span
              whileHover={{
                y: -25,
              }}
              transition={{
                duration: 0.35,
                ease: EASE,
              }}
              className="font-display text-[12px] font-extrabold leading-none tracking-[-0.04em] text-fore"
            >
              PS
            </motion.span>

            <span className="absolute inset-0 grid place-items-center font-display text-[12px] font-extrabold leading-none tracking-[-0.04em] text-azure opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              PS
            </span>
          </span>

          <span className="hidden whitespace-nowrap font-display text-[10px] font-bold uppercase leading-none tracking-[0.14em] text-fore sm:block lg:text-[11px] lg:tracking-[0.16em]">
            P Suraj Shenoy
          </span>
        </a>

        {/* Desktop navigation */}
        <div className="hidden min-w-0 justify-center lg:flex">
          <ul className="flex items-center justify-center gap-0.5">
            {links.map((link) => {
              const isActive =
                active === link.id

              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className={`relative block whitespace-nowrap rounded-full px-3 py-2 font-mono text-[9px] uppercase tracking-[0.15em] outline-none transition-colors duration-300 xl:px-4 xl:text-[10px] ${
                      isActive
                        ? 'text-fore'
                        : 'text-mist hover:text-fore'
                    } focus-visible:ring-2 focus-visible:ring-azure`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full border border-edge bg-navy"
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )}

                    <span className="relative">
                      {link.label}
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Right controls */}
        <div className="flex shrink-0 items-center justify-end gap-2">
          <Bgm mode="design" />

          {onSwitch && (
            <button
              type="button"
              onClick={
                handleModeSwitch
              }
              aria-label="Switch portfolio mode"
              className="pointer-events-auto relative z-[10001] hidden min-h-10 touch-manipulation select-none items-center justify-center whitespace-nowrap rounded-full border border-edge bg-ink/70 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-mist outline-none transition-all duration-300 hover:border-cyan hover:bg-cyan/10 hover:text-fore active:scale-95 focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 focus-visible:ring-offset-ink lg:inline-flex xl:px-4 xl:text-[10px] xl:tracking-[0.16em]"
            >
              Switch mode
            </button>
          )}

          <Magnetic
            strength={0.25}
            className="hidden xl:inline-block"
          >
            <a
              href={`mailto:${profile.email}`}
              className="shine group inline-flex min-h-10 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-azure/40 bg-azure/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-fore outline-none transition-colors duration-300 hover:bg-azure hover:text-paperInk focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              Hire me

              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Magnetic>

          <button
            type="button"
            onClick={() => {
              setOpen(
                (current) => !current,
              )
            }}
            aria-label={
              open
                ? 'Close navigation menu'
                : 'Open navigation menu'
            }
            aria-expanded={open}
            aria-controls="mobile-navigation"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-edge text-mist outline-none transition-colors hover:border-azure hover:text-fore focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 focus-visible:ring-offset-ink lg:hidden"
          >
            {open ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile navigation */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="mobile-navigation"
            key="mobile-navigation"
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
              duration: 0.35,
              ease: EASE,
            }}
            className="relative z-[10000] overflow-hidden border-t border-edge/60 bg-ink/95 shadow-[0_24px_60px_rgb(0_0_0/0.25)] backdrop-blur-xl lg:hidden"
          >
            <div className="shell max-h-[calc(100dvh-72px)] overflow-y-auto py-4">
              <ul className="flex flex-col">
                {links.map(
                  (link, index) => {
                    const isActive =
                      active === link.id

                    return (
                      <li key={link.id}>
                        <a
                          href={`#${link.id}`}
                          onClick={() => {
                            setOpen(false)
                          }}
                          className={`flex min-h-16 items-center border-b border-edge/40 py-4 font-display text-xl font-bold tracking-tight outline-none transition-colors focus-visible:text-azure sm:text-2xl ${
                            isActive
                              ? 'text-azure'
                              : 'text-fore'
                          }`}
                        >
                          <span className="mr-3 font-mono text-[9px] text-azure">
                            {String(
                              index + 1,
                            ).padStart(
                              2,
                              '0',
                            )}
                          </span>

                          {link.label}
                        </a>
                      </li>
                    )
                  },
                )}
              </ul>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {onSwitch && (
                  <button
                    type="button"
                    onClick={
                      handleModeSwitch
                    }
                    className="inline-flex min-h-12 items-center justify-center rounded-full border border-cyan/40 bg-cyan/10 px-5 font-mono text-[10px] uppercase tracking-[0.16em] text-fore outline-none transition-colors hover:bg-cyan/20 focus-visible:ring-2 focus-visible:ring-cyan"
                  >
                    Switch mode
                  </button>
                )}

                <a
                  href={`mailto:${profile.email}`}
                  onClick={() => {
                    setOpen(false)
                  }}
                  className="shine inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-azure/40 bg-azure/10 px-5 font-mono text-[10px] uppercase tracking-[0.16em] text-fore outline-none transition-colors hover:bg-azure hover:text-paperInk focus-visible:ring-2 focus-visible:ring-azure"
                >
                  Hire me

                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

/* ================================================================
   Marquee
================================================================ */

export function Marquee() {
  const words = [
    'Wireframes',
    'User Flows',
    'Design Systems',
    'Dashboard UX',
    'Prototypes',
    'Accessibility',
    'Motion',
    'Design to Code',
  ]

  return (
    <div
      data-theme="dark"
      className="group relative overflow-hidden border-y border-edge bg-navy/50 py-5"
    >
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap group-hover:[animation-play-state:paused]">
        {[...words, ...words].map(
          (word, index) => (
            <span
              key={`${word}-${index}`}
              className="flex cursor-default items-center gap-12 font-display text-2xl font-bold uppercase tracking-tight text-mist/35 transition-colors duration-300 hover:text-fore sm:text-3xl"
            >
              {word}

              <span className="h-1.5 w-1.5 rounded-full bg-azure" />
            </span>
          ),
        )}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" />

      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent" />
    </div>
  )
}

/* ================================================================
   Shared section
================================================================ */

export function Section({
  id,
  eyebrow,
  title,
  kicker,
  children,
  theme = 'dark',
}) {
  return (
    <section
      id={id}
      data-theme={theme}
      className="group/sec band relative scroll-mt-24"
    >
      <div className="shell">
        <header className="mb-12 max-w-3xl sm:mb-16">
          <Reveal>
            <p className="eyebrow">
              {eyebrow}
            </p>
          </Reveal>

          <h2 className="mt-6 font-display text-[clamp(2rem,5vw,3.6rem)] font-extrabold leading-[1] tracking-tight">
            <SplitWords text={title} />
          </h2>

          {kicker && (
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-2xl text-[15px] leading-[1.75] text-mist sm:text-base">
                {kicker}
              </p>
            </Reveal>
          )}
        </header>

        {children}
      </div>
    </section>
  )
}

/* ================================================================
   Footer
================================================================ */

export function Footer() {
  const socialLinks = [
    {
      href: profile.linkedin,
      Icon: Linkedin,
      label: 'LinkedIn',
      external: true,
    },
    {
      href: profile.github,
      Icon: Github,
      label: 'GitHub',
      external: true,
    },
    {
      href: `mailto:${profile.email}`,
      Icon: Mail,
      label: 'Email',
      external: false,
    },
  ]

  return (
    <footer
      data-theme="dark"
      className="border-t border-edge py-10"
    >
      <div className="shell flex flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="text-center font-mono text-[10px] uppercase tracking-[0.18em] text-mist/70 sm:text-left sm:text-[11px] sm:tracking-[0.2em]">
          P Suraj Shenoy — UI/UX Designer
        </p>

        <div className="flex items-center gap-3">
          {socialLinks.map(
            ({
              href,
              Icon,
              label,
              external,
            }) => (
              <Magnetic
                key={label}
                strength={0.4}
              >
                <a
                  href={href}
                  aria-label={label}
                  target={
                    external
                      ? '_blank'
                      : undefined
                  }
                  rel={
                    external
                      ? 'noreferrer'
                      : undefined
                  }
                  className="grid h-11 w-11 place-items-center rounded-full border border-edge text-mist outline-none transition-colors duration-300 hover:border-azure hover:bg-azure/10 hover:text-fore focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                >
                  <Icon className="h-4 w-4" />
                </a>
              </Magnetic>
            ),
          )}
        </div>
      </div>
    </footer>
  )
}