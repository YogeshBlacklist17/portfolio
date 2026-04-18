import { useRef, useEffect, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useAnimation,
} from 'framer-motion'
import GlassCard from './GlassCard'
import './StackSection.css'

/* ─── Data ──────────────────────────────────────────── */
const WHAT_I_BUILD = [
  { label: 'LANGS',  items: 'TypeScript · Swift · Kotlin' },
  { label: 'FRONT',  items: 'React · Next.js · React Native' },
  { label: 'BACK',   items: 'Node.js · Express · tRPC' },
  { label: 'DATA',   items: 'MongoDB · PostgreSQL · Redis' },
  { label: 'TOOLS',  items: 'Figma · GSAP · Three.js' },
  { label: 'DEPLOY', items: 'Vercel · AWS · Docker' },
]

const THE_CULTURE = [
  { label: 'SOUND',      items: 'Miles Davis · Coltrane · Sade' },
  { label: 'INSTRUMENT', items: 'Guitar, Drums' },
  { label: 'READ',       items: 'Baldwin · Murakami · Camus' },
  { label: 'WEAR',       items: 'Vintage' },
  { label: 'CITY',       items: 'Barcelona → ??' },
  { label: 'NOW',        items: 'Building in public. Slowly.' },
]

/* ─── Individual Row — clip-reveals upward on scroll in ─ */
function StackRow({ label, items, index, sectionInView }) {
  const controls = useAnimation()

  useEffect(() => {
    if (sectionInView) {
      controls.start({
        opacity: 1,
        y: 0,
        clipPath: 'inset(0% 0% 0% 0%)',
        transition: {
          duration: 0.55,
          delay: index * 0.07,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      })
    } else {
      controls.start({
        opacity: 0,
        y: 22,
        clipPath: 'inset(100% 0% 0% 0%)',
        transition: { duration: 0.3, ease: 'easeIn' },
      })
    }
  }, [sectionInView, index]) // eslint-disable-line

  return (
    <motion.div
      className="stack-row"
      initial={{ opacity: 0, y: 22, clipPath: 'inset(100% 0% 0% 0%)' }}
      animate={controls}
    >
      <span className="stack-row-label">{label}</span>
      <span className="stack-row-items">{items}</span>
    </motion.div>
  )
}

/* ─── Divider line that draws on scroll ─────────────── */
function ScrollDivider({ scrollYProgress, isDark }) {
  const scaleX = useTransform(scrollYProgress, [0.05, 0.4], [0, 1])
  const opacity = useTransform(scrollYProgress, [0.05, 0.2, 0.8, 0.95], [0, 1, 1, 0])
  const smooth = useSpring(scaleX, { stiffness: 80, damping: 20 })

  return (
    <motion.div
      className="stack-divider"
      style={{
        scaleX: smooth,
        opacity,
        transformOrigin: 'left center',
        background: isDark
          ? 'linear-gradient(90deg, rgba(124,58,237,0.9), rgba(59,130,246,0.5), transparent)'
          : 'linear-gradient(90deg, rgba(124,58,237,0.7), rgba(59,130,246,0.35), transparent)',
      }}
    />
  )
}

/* ─── Block card: slides in from left or right on scroll ─ */
function StackBlock({ title, rows, scrollYProgress, direction, sectionInView }) {
  const xRange = direction === 'left' ? [-70, 0] : [70, 0]
  const x = useTransform(scrollYProgress, [0.08, 0.42], xRange)
  const opacity = useTransform(scrollYProgress, [0.08, 0.38], [0, 1])
  const smoothX = useSpring(x, { stiffness: 70, damping: 18 })

  return (
    <motion.div style={{ x: smoothX, opacity }}>
      <GlassCard className="stack-block-card">
        <p className="stack-block-title">{title}</p>
        <div className="stack-rows">
          {rows.map((row, i) => (
            <StackRow
              key={row.label}
              label={row.label}
              items={row.items}
              index={i}
              sectionInView={sectionInView}
            />
          ))}
        </div>
      </GlassCard>
    </motion.div>
  )
}

/* ─── Main component ─────────────────────────────────── */
const StackSection = () => {
  const sectionRef = useRef(null)

  // Track the full scroll range of this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Heading enters from below, exits upward — same as HeroSection name
  const headingY      = useTransform(scrollYProgress, [0.02, 0.28], [70, 0])
  const headingExitY  = useTransform(scrollYProgress, [0.72, 0.98], [0, -90])
  const headingOpacity = useTransform(scrollYProgress, [0.02, 0.25, 0.78, 0.96], [0, 1, 1, 0])
  const smoothHeadingY = useSpring(
    useTransform([headingY, headingExitY], ([a, b]) => a + b),
    { stiffness: 70, damping: 18 }
  )

  // Eyebrow enters a beat later
  const eyebrowY       = useTransform(scrollYProgress, [0.04, 0.30], [30, 0])
  const eyebrowOpacity = useTransform(scrollYProgress, [0.04, 0.28], [0, 1])

  // Cards exit together upward as section leaves
  const cardsExitY       = useTransform(scrollYProgress, [0.72, 0.98], [0, -110])
  const cardsExitOpacity = useTransform(scrollYProgress, [0.78, 0.98], [1, 0])
  const smoothCardsExitY = useSpring(cardsExitY, { stiffness: 70, damping: 18 })

  // Scroll hint fades in then out
  const hintOpacity = useTransform(scrollYProgress, [0.05, 0.25, 0.7, 0.9], [0, 1, 1, 0])

  // Row stagger reveal — trigger when section is 20% in view
  const isInView = useInView(sectionRef, { margin: '-10% 0px -10% 0px', amount: 0.2 })

  // Dark mode
  const [isDark, setIsDark] = useState(() => {
    if (typeof document === 'undefined') return false
    return (
      document.documentElement.classList.contains('dark') ||
      localStorage.getItem('darkMode') === 'true'
    )
  })

  useEffect(() => {
    const sync = () => setIsDark(document.documentElement.classList.contains('dark'))
    window.addEventListener('theme-change', sync)
    const obs = new MutationObserver(sync)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => {
      window.removeEventListener('theme-change', sync)
      obs.disconnect()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="stack"
      className={`stack-section ${isDark ? 'dark' : ''}`}
    >
      {/* Glow blobs */}
      <motion.div className="stack-glow-blob stack-glow-blob-1"
        animate={{ x: [0, 28, 0], y: [0, -28, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div className="stack-glow-blob stack-glow-blob-2"
        animate={{ x: [0, -22, 0], y: [0, 22, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div className="stack-glow-blob stack-glow-blob-3"
        animate={{ x: [0, 18, 0], y: [0, -18, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
      />

      {/* ── Section header ── */}
      <motion.div
        className="stack-header"
        style={{ y: smoothHeadingY, opacity: headingOpacity }}
      >
        <motion.span
          className="stack-eyebrow"
          style={{ y: eyebrowY, opacity: eyebrowOpacity }}
        >
          / INDEX
        </motion.span>
        <h2 className="stack-heading">
          WHAT I <span className="stack-heading-accent">BUILD</span>
          <br />
          &amp; THE <span className="stack-heading-accent">CULTURE</span>
        </h2>
      </motion.div>

      {/* ── Divider line — draws itself as you scroll in ── */}
      <ScrollDivider scrollYProgress={scrollYProgress} isDark={isDark} />

      {/* ── Two-col grid — exits upward on scroll out ── */}
      <motion.div
        className="stack-grid"
        style={{ y: smoothCardsExitY, opacity: cardsExitOpacity }}
      >
        <StackBlock
          title="WHAT I BUILD"
          rows={WHAT_I_BUILD}
          scrollYProgress={scrollYProgress}
          direction="left"
          sectionInView={isInView}
        />
        <StackBlock
          title="THE CULTURE / WHAT MOVES ME"
          rows={THE_CULTURE}
          scrollYProgress={scrollYProgress}
          direction="right"
          sectionInView={isInView}
        />
      </motion.div>

      {/* ── Scroll hint ── */}
      <motion.button
        style={{ opacity: hintOpacity }}
        onClick={() =>
          document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })
        }
        className={`stack-scroll-hint ${isDark ? 'stack-scroll-hint--dark' : ''}`}
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="stack-scroll-arrow"
        >
          ↓
        </motion.div>
        <div
          className="stack-scroll-line"
          style={{
            background: isDark
              ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(0,0,0,0.4), transparent)',
          }}
        />
        SCROLL
      </motion.button>
    </section>
  )
}

export default StackSection
