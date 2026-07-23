import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react'
import { motion } from 'framer-motion'

import {
  Nav,
  ScrollProgress,
  Cursor,
  ThemeScroll,
  Marquee,
  Footer,
} from './components/Chrome'

import {
  Intro,
  Grain,
  startBgm,
} from './components/Cinema'

import Gate from './components/Gate'
import Hero from './components/Hero'
import About from './components/About'
import DesignSystem from './components/DesignSystem'
import Work from './components/Work'
import Timeline from './components/Timeline'
import {
  Skills,
  Beyond,
  Contact,
} from './components/Sections'
import Sde from './components/Sde'

function DesignSite({ onSwitch }) {
  return (
    <>
      <ThemeScroll />

      <Nav onSwitch={onSwitch} />

      <main>
        <Hero />
        <Marquee />
        <About />
        <DesignSystem />
        <Work />
        <Timeline />
        <Skills />
        <Beyond />
        <Contact />
      </main>

      <Footer />
    </>
  )
}

/* ---------------------------------------------------------------
   Page reset helpers
---------------------------------------------------------------- */

const removeCurrentHash = () => {
  if (!window.location.hash) return

  const cleanUrl =
    window.location.pathname +
    window.location.search

  window.history.replaceState(
    window.history.state,
    document.title,
    cleanUrl,
  )
}

const resetTheme = () => {
  document.documentElement.classList.remove(
    'theme-light',
  )
}

const scrollToTopImmediately = () => {
  const html = document.documentElement
  const body = document.body

  const previousHtmlBehavior =
    html.style.scrollBehavior

  const previousBodyBehavior =
    body.style.scrollBehavior

  html.style.scrollBehavior = 'auto'
  body.style.scrollBehavior = 'auto'

  window.scrollTo(0, 0)

  html.scrollTop = 0
  body.scrollTop = 0

  html.style.scrollBehavior =
    previousHtmlBehavior

  body.style.scrollBehavior =
    previousBodyBehavior
}

const safelyStartBgm = (selectedMode) => {
  try {
    const result = startBgm(selectedMode)

    if (result instanceof Promise) {
      result.catch(() => {
        // Browser may block autoplay.
      })
    }
  } catch {
    // Audio must never block mode switching.
  }
}

/* ---------------------------------------------------------------
   App
---------------------------------------------------------------- */

export default function App() {
  const [mode, setMode] = useState(() => {
    const storedMode =
      sessionStorage.getItem('mode')

    if (
      storedMode === 'design' ||
      storedMode === 'sde'
    ) {
      return storedMode
    }

    return null
  })

  /*
    Runs immediately after the new mode enters the DOM,
    but before the browser paints it.
  */
  useLayoutEffect(() => {
    resetTheme()
    scrollToTopImmediately()

    const frame = requestAnimationFrame(() => {
      scrollToTopImmediately()
    })

    return () => cancelAnimationFrame(frame)
  }, [mode])

  /*
    Disable the browser's automatic restoration of the
    previous lower-page scroll position.
  */
  useEffect(() => {
    if (
      !('scrollRestoration' in window.history)
    ) {
      return undefined
    }

    const previousValue =
      window.history.scrollRestoration

    window.history.scrollRestoration = 'manual'

    return () => {
      window.history.scrollRestoration =
        previousValue
    }
  }, [])

  const pickMode = useCallback(
    (selectedMode) => {
      if (
        selectedMode !== 'design' &&
        selectedMode !== 'sde'
      ) {
        return
      }

      removeCurrentHash()
      resetTheme()
      scrollToTopImmediately()

      sessionStorage.setItem(
        'mode',
        selectedMode,
      )

      setMode(selectedMode)
      safelyStartBgm(selectedMode)
    },
    [],
  )

  const switchMode = useCallback(() => {
    setMode((currentMode) => {
      const nextMode =
        currentMode === 'design'
          ? 'sde'
          : 'design'

      removeCurrentHash()
      resetTheme()
      scrollToTopImmediately()

      sessionStorage.setItem(
        'mode',
        nextMode,
      )

      safelyStartBgm(nextMode)

      return nextMode
    })
  }, [])

  useEffect(() => {
    if (mode) {
      safelyStartBgm(mode)
    }

    // Run only once after loading.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Intro />
      <Grain />
      <ScrollProgress />
      <Cursor />

      {!mode && (
        <Gate onPick={pickMode} />
      )}

      {mode === 'design' && (
        <motion.div
          key="design"
          className="relative min-h-screen"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <DesignSite
            onSwitch={switchMode}
          />
        </motion.div>
      )}

      {mode === 'sde' && (
        <motion.div
          key="sde"
          className="relative min-h-screen"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Sde onSwitch={switchMode} />
        </motion.div>
      )}
    </>
  )
}