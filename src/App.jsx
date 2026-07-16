import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Nav, ScrollProgress, Cursor, ThemeScroll, Marquee, Footer } from './components/Chrome'
import { Intro, Grain, startBgm } from './components/Cinema'
import Gate from './components/Gate'
import Hero from './components/Hero'
import About from './components/About'
import DesignSystem from './components/DesignSystem'
import Work from './components/Work'
import Timeline from './components/Timeline'
import { Skills, Beyond, Contact } from './components/Sections'
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

export default function App() {
  const [mode, setMode] = useState(() => sessionStorage.getItem('mode'))

  const pick = (m) => {
    sessionStorage.setItem('mode', m)
    window.scrollTo(0, 0)
    setMode(m)
    startBgm(m) // the click is a user gesture — music starts here by default
  }
  const backToGate = () => {
    sessionStorage.removeItem('mode')
    document.documentElement.classList.remove('theme-light')
    window.scrollTo(0, 0)
    setMode(null)
  }

  useEffect(() => {
    if (!mode) document.documentElement.classList.remove('theme-light')
  }, [mode])

  // reload mid-session: try to resume (browsers may block until a click)
  useEffect(() => {
    if (mode) startBgm(mode)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Intro />
      <Grain />
      <ScrollProgress />
      <Cursor />
      <AnimatePresence mode="wait">
        {!mode && <Gate key="gate" onPick={pick} />}
        {mode === 'design' && (
          <motion.div key="design" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <DesignSite onSwitch={backToGate} />
          </motion.div>
        )}
        {mode === 'sde' && (
          <motion.div key="sde" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <Sde onSwitch={backToGate} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
