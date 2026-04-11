import { useRef, useCallback, useEffect } from 'react'
import clsx from 'clsx'

const GlassCard = ({ children, className, glowColor = '168, 85, 247' }) => {
  const cardRef = useRef(null)
  const glowRef = useRef(null)
  const edgeRef = useRef(null)
  const rafRef = useRef(null)

  const handleMouseMove = useCallback((e) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const rect = cardRef.current?.getBoundingClientRect()
      if (!rect || !glowRef.current) return
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      glowRef.current.style.background =
        `radial-gradient(500px circle at ${x}px ${y}px, rgba(${glowColor}, 0.15), transparent 65%)`
    })
  }, [glowColor])

  const handleMouseEnter = useCallback(() => {
    if (edgeRef.current) {
      edgeRef.current.style.boxShadow =
        `0 0 20px rgba(${glowColor}, 0.3), inset 0 0 20px rgba(${glowColor}, 0.05)`
    }
  }, [glowColor])

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    if (glowRef.current) glowRef.current.style.background = 'none'
    if (edgeRef.current) {
      edgeRef.current.style.boxShadow = 'none'
    }
  }, [])

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }, [])

  return (
    <div
      ref={cardRef}
      className={clsx('about-glass-card', className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={glowRef} className="about-glass-card-overlay" />
      <div ref={edgeRef} className="about-glass-card-edge" />
      <div className="about-glass-card-content">
        {children}
      </div>
    </div>
  )
}

export default GlassCard
