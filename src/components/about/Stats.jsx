import { motion, useInView } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import GlassCard from './GlassCard'

const CountUp = ({ end, duration = 2, suffix = '' }) => {
  const [count, setCount] = useState(0)
  const animationRef = useRef(null)
  const isAnimatingRef = useRef(false)

  useEffect(() => {
    isAnimatingRef.current = true
    let startTime
    const startValue = 0
    const endValue = end

    const animate = (currentTime) => {
      if (!isAnimatingRef.current) return
      
      if (!startTime) startTime = currentTime
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)

      // Smooth cubic bezier easing for no initial pause
      const t = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2
      const easedProgress = progress === 1 ? 1 : t
      setCount(Math.floor(startValue + (endValue - startValue) * easedProgress))

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        isAnimatingRef.current = false
      }
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      isAnimatingRef.current = false
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [end, duration])

  return <span>{count}{suffix}</span>
}

const statsData = [
  { key: 'experience', suffix: '+', end: 3 },
  { key: 'projects', suffix: '+', end: 15 },
  { key: 'clients', suffix: '+', end: 3 },
  { key: 'collaborations', suffix: '+', end: 3 },
]

const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 40, 
    scale: 0.85,
    filter: 'blur(8px)' 
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { 
      duration: 0.5, 
      ease: [0.25, 0.1, 0.25, 1],
      type: 'spring',
      stiffness: 300,
      damping: 25
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.9,
    filter: 'blur(8px)',
    transition: { 
      duration: 0.3, 
      ease: [0.25, 0.1, 0.25, 1] 
    }
  }
}

const Stats = () => {
  const { t } = useTranslation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.5, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      className="about-stats-row"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3, margin: '-50px' }}
    >
      {statsData.map((stat) => (
        <motion.div key={stat.key} variants={itemVariants}>
          <GlassCard className="about-stat-card pulse-glow">
            <span className="about-stat-number">
              <CountUp
                key={isInView ? 'visible' : 'hidden'}
                end={stat.end}
                duration={1.5}
                suffix={stat.suffix}
              />
            </span>
            <span className="about-stat-label">
              {t(`about.stats.${stat.key}`)}
            </span>
          </GlassCard>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default Stats
