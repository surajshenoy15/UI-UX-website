import { Nav, ScrollProgress, Cursor, ThemeScroll, Marquee, Footer } from './components/Chrome'
import Hero from './components/Hero'
import About from './components/About'
import Work from './components/Work'
import Timeline from './components/Timeline'
import { Skills, Beyond, Contact } from './components/Sections'

export default function App() {
  return (
    <>
      <ThemeScroll />
      <ScrollProgress />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
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
