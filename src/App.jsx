import { useState } from 'react'
import Navbar from './components/Navbar'
import AboutSection from './components/about/AboutSection'
import StackSection from './components/about/StackSection'
import WorkSection from './components/WorkSection'
import Education from './components/Education'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import HeroSection from './components/HeroSection'
import ManifestoSection from './components/ManifestoSection'
import Footer from './components/Footer'
import useSmoothScroll from './hooks/useSmoothScroll'
import Preloader from './components/Preloader'

function App() {
  const [ready, setReady] = useState(false)
  useSmoothScroll()

  return (
    <>
      <Preloader onComplete={() => setReady(true)} />

      <main style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.6s ease' }}>
        <section id="home">
          <HeroSection />
        </section>
        <ManifestoSection />

        <Navbar />

        <section id="about">
          <AboutSection />
        </section>

        {/* ── Stack / Culture section ── */}
        <section id="stack">
          <StackSection />
        </section>

        {/* ── Work Experience + Projects + Skills ── */}
        <section id="work">
          <WorkSection />
        </section>

        {/* <section id="education">
          <Education />
        </section> */}

        <section id="faq">
          <FAQ />
        </section>

        <section id="contact">
          <Contact />
        </section>

        <Footer />
      </main>
    </>
  )
}

export default App
