import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import './WorkSection.css'

/* ══════════════════════════════════════════════
   DATA
══════════════════════════════════════════════ */
const EXPERIENCES = [
  {
    id: 'exp-1',
    role: 'Senior Software Developer',
    company: '6D Technologies',
    location: 'Bangalore, India',
    period: 'Jan 2025 – Feb 2026',
    type: 'Full-time',
    accent: '#7c3aed',
    stack: ['Spring Boot', 'React', 'Kubernetes', 'GitLab CI/CD', 'Keycloak', 'Docker', 'JOLT', 'OpenShift'],
    highlights: [
      'Engineered backend API modules for Vodacom Congo VDRC platform — Customer 360 dashboard serving 1M+ telecom subscribers.',
      'Automated CI/CD end-to-end via GitLab: code review, release tagging, Docker builds & OpenShift deployments — reduced release errors by 30%.',
      'Reduced JSON integration effort by 80% using JOLT transformations, decoupling payload mapping from API spec changes.',
      'Integrated backend with ESB, billing platforms & 6 microservices including billing config, customer mgmt, and financial approval workflows.',
      'Built a reusable React component library with i18n config-based labels for multi-language deployments across 5 countries — zero code duplication.',
      'Secured the platform with Keycloak RBAC enforcing role-based & scope-based menu access for hundreds of agents and administrators.',
      'Led cross-continental feature review demos across 4 continents, reducing requirement misunderstandings by 40%.',
    ],
  },
  {
    id: 'exp-2',
    role: 'Application Developer',
    company: 'IBM India Pvt. Ltd.',
    location: 'Bangalore, India',
    period: 'Feb 2022 – Aug 2024',
    type: 'Full-time',
    accent: '#0f62fe',
    stack: ['Spring Boot', 'Angular', 'Jenkins', 'AWS', 'Kubernetes', 'Java', 'Postman', 'HP ALM'],
    highlights: [
      'Architected Jenkins CI/CD pipelines following AWS & Red Hat Kubernetes best practices — cut deployment time by 40%.',
      'Migrated 500,000+ medical records from Lotus Notes to cloud with zero data loss, rebuilding the UI in Angular with reactive forms and RBAC email approval workflows.',
      'Resolved 1,000+ UAT defects across 25 Angular UI screens using structured root-cause analysis, earning client commendations on 3 consecutive project reviews.',
      'Delivered Spring Boot REST APIs with layered service architecture for 200+ internal users, debugging via Postman and server-side log analysis.',
      'Owned HP ALM module end-to-end — restored full CI pipeline stability after Java 8→17 upgrade, resolving all regressions within a single 2-week sprint.',
      'Mentored 4 junior developers, reducing onboarding time by 35% and increasing sprint completion from 60% to 85% within 2 months.',
      'Recognised with IBM Star of the Month for measurable mentoring impact and cross-team knowledge transfer.',
    ],
  },
]

const PROJECTS = [
  {
    id: 'proj-1',
    title: 'Vodacom VDRC Platform',
    tag: 'Telecom · Enterprise',
    description: 'Customer 360 dashboard for Vodacom Congo serving 1M+ telecom subscribers. Full backend-to-frontend system with microservice orchestration, Keycloak security, and multi-country i18n.',
    tech: ['Spring Boot', 'React', 'Kubernetes', 'Keycloak', 'Docker', 'JOLT'],
    accent: '#7c3aed',
    year: '2025',
    impact: '1M+ users · 5 countries · 30% fewer release errors',
    links: { github: null, live: null },
  },
  {
    id: 'proj-2',
    title: 'Medical Records Migration',
    tag: 'Healthcare · Cloud',
    description: 'Migrated 500,000+ medical records from Lotus Notes to cloud with zero data loss. Rebuilt the full UI in Angular with reactive forms, RBAC email approval workflows, and real-time audit trails.',
    tech: ['Angular', 'Spring Boot', 'AWS', 'Jenkins', 'Java 17'],
    accent: '#0f62fe',
    year: '2023',
    impact: '500K+ records · Zero data loss · 40% faster deployments',
    links: { github: null, live: null },
  },
  {
    id: 'proj-3',
    title: 'Portfolio — zarcerog.com style',
    tag: 'Frontend · Creative',
    description: 'This portfolio — a fully animated, dark/light-mode React SPA with GSAP scroll-driven reveals, Framer Motion spring transitions, custom cursor, preloader, and i18n. Every section built from scratch.',
    tech: ['React', 'Framer Motion', 'GSAP', 'Tailwind', 'Vite'],
    accent: '#ec4899',
    year: '2026',
    impact: 'Personal brand · Fully animated',
    links: { github: 'https://github.com/YogeshBlacklist17', live: '#' },
  },
]

const SKILLS = [
  'TypeScript', 'JavaScript', 'Java', 'Swift', 'Kotlin', 'Python',
  'React', 'Next.js', 'Angular', 'React Native',
  'Spring Boot', 'Node.js', 'Express', 'tRPC',
  'MongoDB', 'PostgreSQL', 'Redis', 'MySQL',
  'Docker', 'Kubernetes', 'OpenShift', 'AWS', 'Vercel',
  'Jenkins', 'GitLab CI/CD', 'GitHub Actions',
  'Keycloak', 'Figma', 'GSAP', 'Three.js', 'Framer Motion',
  'REST API', 'GraphQL', 'Microservices', 'JOLT',
  'HP ALM', 'Postman', 'Kafka',
]

/* double for seamless marquee */
const SKILLS_DOUBLED = [...SKILLS, ...SKILLS]

/* ══════════════════════════════════════════════
   HOOKS
══════════════════════════════════════════════ */
function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof document === 'undefined') return false
    return document.documentElement.classList.contains('dark') || localStorage.getItem('darkMode') === 'true'
  })
  useEffect(() => {
    const sync = () => setIsDark(document.documentElement.classList.contains('dark'))
    window.addEventListener('theme-change', sync)
    const obs = new MutationObserver(sync)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => { window.removeEventListener('theme-change', sync); obs.disconnect() }
  }, [])
  return isDark
}

/* ══════════════════════════════════════════════
   EXPERIENCE CARD
══════════════════════════════════════════════ */
function ExpCard({ exp, isActive, isCollapsed, onClick, index }) {
  const isDark = useDarkMode()

  return (
    <motion.div
      className={`exp-card ${isActive ? 'exp-card--active' : ''} ${isCollapsed ? 'exp-card--collapsed' : ''}`}
      style={{ '--accent': exp.accent }}
      layout
      onClick={onClick}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: isCollapsed ? 0.35 : 1, y: 0, scale: isCollapsed ? 0.97 : 1 }}
      transition={{ type: 'spring', stiffness: 80, damping: 18, delay: index * 0.1 }}
      whileHover={!isActive ? { scale: isCollapsed ? 0.98 : 1.015, transition: { duration: 0.2 } } : {}}
    >
      {/* Active accent line */}
      <motion.div
        className="exp-card__accent-line"
        animate={{ scaleY: isActive ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      />

      {/* Card header — always visible */}
      <div className="exp-card__header">
        <div className="exp-card__meta">
          <span className="exp-card__period">{exp.period}</span>
          <span className="exp-card__type">{exp.type}</span>
        </div>
        <h3 className="exp-card__role">{exp.role}</h3>
        <p className="exp-card__company">
          <span className="exp-card__company-dot" style={{ background: exp.accent }} />
          {exp.company} · {exp.location}
        </p>

        {/* Tech badges — always shown */}
        <div className="exp-card__stack">
          {exp.stack.slice(0, isActive ? exp.stack.length : 4).map(t => (
            <span key={t} className="exp-card__badge" style={{ '--accent': exp.accent }}>{t}</span>
          ))}
          {!isActive && exp.stack.length > 4 && (
            <span className="exp-card__badge exp-card__badge--more">+{exp.stack.length - 4}</span>
          )}
        </div>

        {/* Expand indicator */}
        <motion.div
          className="exp-card__chevron"
          animate={{ rotate: isActive ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          ↓
        </motion.div>
      </div>

      {/* Expanded detail */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="exp-card__detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 80, damping: 20 }}
          >
            <div className="exp-card__highlights">
              {exp.highlights.map((h, i) => (
                <motion.div
                  key={i}
                  className="exp-card__highlight"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <span className="exp-card__highlight-arrow" style={{ color: exp.accent }}>→</span>
                  <span>{h}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════
   PROJECT CARD
══════════════════════════════════════════════ */
function ProjCard({ proj, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className="proj-card"
      style={{ '--accent': proj.accent }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ type: 'spring', stiffness: 70, damping: 18, delay: index * 0.12 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Glow */}
      <motion.div
        className="proj-card__glow"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className="proj-card__inner">
        <div className="proj-card__top">
          <div className="proj-card__tags">
            <span className="proj-card__year">{proj.year}</span>
            <span className="proj-card__tag">{proj.tag}</span>
          </div>
          <div className="proj-card__links">
            {proj.links.github && (
              <a href={proj.links.github} target="_blank" rel="noreferrer" className="proj-card__link" onClick={e => e.stopPropagation()}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c.996.005 2.004.138 2.942.403 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              </a>
            )}
            {proj.links.live && (
              <a href={proj.links.live} target="_blank" rel="noreferrer" className="proj-card__link" onClick={e => e.stopPropagation()}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            )}
          </div>
        </div>

        <h3 className="proj-card__title">{proj.title}</h3>
        <p className="proj-card__desc">{proj.description}</p>

        <div className="proj-card__impact">
          <span className="proj-card__impact-label">Impact</span>
          <span className="proj-card__impact-value">{proj.impact}</span>
        </div>

        <div className="proj-card__stack">
          {proj.tech.map(t => (
            <span key={t} className="proj-card__badge">{t}</span>
          ))}
        </div>
      </div>

      {/* Bottom accent bar */}
      <motion.div
        className="proj-card__bar"
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
    </motion.div>
  )
}

/* ══════════════════════════════════════════════
   SKILLS MARQUEE
══════════════════════════════════════════════ */
function SkillsMarquee() {
  return (
    <div className="skills-marquee">
      <div className="skills-marquee__fade skills-marquee__fade--left" />
      <div className="skills-marquee__fade skills-marquee__fade--right" />
      <div className="skills-marquee__track">
        {SKILLS_DOUBLED.map((skill, i) => (
          <span key={i} className="skills-marquee__pill">
            <span className="skills-marquee__dot" />
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════
   TIMELINE SPINE (left decoration)
══════════════════════════════════════════════ */
function TimelineSpine({ activeId, isDark }) {
  return (
    <div className="timeline-spine">
      <div className="timeline-spine__line" />
      {EXPERIENCES.map((exp, i) => (
        <motion.div
          key={exp.id}
          className="timeline-spine__node"
          style={{ top: `${(i / (EXPERIENCES.length - 1)) * 72 + 14}%` }}
          animate={{
            scale: activeId === exp.id ? 1.4 : 1,
            backgroundColor: activeId === exp.id ? exp.accent : isDark ? '#333' : '#ddd',
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          <motion.div
            className="timeline-spine__ring"
            style={{ borderColor: exp.accent }}
            animate={{ opacity: activeId === exp.id ? 1 : 0, scale: activeId === exp.id ? 1 : 0.5 }}
          />
        </motion.div>
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════════
   MAIN SECTION
══════════════════════════════════════════════ */
export default function WorkSection() {
  const isDark = useDarkMode()
  const sectionRef = useRef(null)
  const [activeExp, setActiveExp] = useState(null)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const headingY = useTransform(scrollYProgress, [0.0, 0.18], [60, 0])
  const headingOpacity = useTransform(scrollYProgress, [0.0, 0.16, 0.88, 0.98], [0, 1, 1, 0])
  const smoothY = useSpring(headingY, { stiffness: 70, damping: 18 })

  const handleExpClick = useCallback((id) => {
    setActiveExp(prev => (prev === id ? null : id))
  }, [])

  return (
    <section
      ref={sectionRef}
      id="work"
      className={`work-section ${isDark ? 'dark' : ''}`}
    >
      {/* ── Ambient blobs ── */}
      <div className="work-blob work-blob--1" />
      <div className="work-blob work-blob--2" />
      <div className="work-blob work-blob--3" />

      {/* ══════════════ SECTION HEADER ══════════════ */}
      <motion.div className="work-header" style={{ y: smoothY, opacity: headingOpacity }}>
        <span className="work-eyebrow">/ PORTFOLIO</span>
        <h2 className="work-heading">
          Work &amp; <span className="work-heading-accent">Projects</span>
        </h2>
        <p className="work-subheading">
          3+ years building production systems across telecom, healthcare &amp; open source.
        </p>
      </motion.div>

      {/* ══════════════ EXPERIENCE ══════════════ */}
      <div className="work-block">
        <div className="work-block__label">
          <span className="work-block__label-text">EXPERIENCE</span>
          <div className="work-block__label-line" />
        </div>

        <div className="work-exp-layout">
          {/* Left — decorative timeline */}
          <TimelineSpine activeId={activeExp} isDark={isDark} />

          {/* Right — cards */}
          <div className="work-exp-cards">
            {EXPERIENCES.map((exp, i) => (
              <ExpCard
                key={exp.id}
                exp={exp}
                index={i}
                isActive={activeExp === exp.id}
                isCollapsed={activeExp !== null && activeExp !== exp.id}
                onClick={() => handleExpClick(exp.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════ PROJECTS ══════════════ */}
      <div className="work-block">
        <div className="work-block__label">
          <span className="work-block__label-text">PROJECTS</span>
          <div className="work-block__label-line" />
        </div>

        <div className="work-proj-grid">
          {PROJECTS.map((proj, i) => (
            <ProjCard key={proj.id} proj={proj} index={i} />
          ))}
        </div>
      </div>

      {/* ══════════════ SKILLS MARQUEE ══════════════ */}
      <div className="work-block">
        <div className="work-block__label">
          <span className="work-block__label-text">SKILLS</span>
          <div className="work-block__label-line" />
        </div>
        <SkillsMarquee />
      </div>

      {/* Scroll hint */}
      <motion.button
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        onClick={() => document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' })}
        className={`work-scroll-hint ${isDark ? 'work-scroll-hint--dark' : ''}`}
      >
        <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>↓</motion.span>
        <div className="work-scroll-line" style={{
          background: isDark
            ? 'linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)'
            : 'linear-gradient(90deg,transparent,rgba(0,0,0,0.35),transparent)'
        }} />
        SCROLL
      </motion.button>
    </section>
  )
}
