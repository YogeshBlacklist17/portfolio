import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const TECH_STACK = [
  { label: 'React 18', color: '#61dafb' },
  { label: 'Framer Motion', color: '#a855f7' },
  { label: 'GSAP', color: '#88ce02' },
  { label: 'Tailwind CSS', color: '#38bdf8' },
  { label: 'Vite', color: '#646cff' },
]

export default function Footer() {
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

  return (
    <footer
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        borderTop: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)',
        background: isDark ? 'rgba(10,10,10,0.95)' : 'rgba(250,250,250,0.95)',
        backdropFilter: 'blur(10px)',
        padding: '0.75rem 1rem',
        boxSizing: 'border-box',
        zIndex: 1000,
      }}
    >
      <div style={{
        maxWidth: '1050px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.4rem',
        flexWrap: 'wrap',
      }}>

        <span style={{
          fontSize: '0.58rem',
          fontWeight: 600,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: isDark ? '#4b5563' : '#9ca3af',
          marginRight: '0.2rem',
        }}>
          Built with
        </span>

        {TECH_STACK.map((tech) => (
          <motion.span
            key={tech.label}
            whileHover={{ y: -2, transition: { duration: 0.15 } }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              fontSize: '0.58rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              padding: '0.18rem 0.5rem',
              borderRadius: '999px',
              border: `1px solid ${tech.color}22`,
              background: `${tech.color}0f`,
              color: isDark ? tech.color : tech.color,
              cursor: 'default',
            }}
          >
            <span style={{
              width: 4, height: 4,
              borderRadius: '50%',
              background: tech.color,
              flexShrink: 0,
              opacity: 0.85,
            }} />
            {tech.label}
          </motion.span>
        ))}

        <span style={{ fontSize: '0.58rem', color: isDark ? '#4b5563' : '#9ca3af', margin: '0 0.1rem' }}>·</span>

        {/* Vercel badge */}
        <motion.span
          whileHover={{ y: -2, transition: { duration: 0.15 } }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem',
            fontSize: '0.58rem',
            fontWeight: 600,
            letterSpacing: '0.05em',
            padding: '0.18rem 0.5rem',
            borderRadius: '999px',
            border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)',
            background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
            color: isDark ? '#e5e7eb' : '#374151',
            cursor: 'default',
          }}
        >
          <svg width="9" height="9" viewBox="0 0 116 100" fill="currentColor">
            <path d="M57.5 0L115 100H0L57.5 0z" />
          </svg>
          Deployed on Vercel
        </motion.span>

      </div>
    </footer>
  )
}
