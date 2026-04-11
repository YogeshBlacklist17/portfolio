import { motion, useInView } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import GlassCard from './GlassCard'

const CountUp = ({ end, duration = 2, suffix = '', trigger = false }) => {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!trigger || hasAnimated) return

    let startTime
    const startValue = 0
    const endValue = end

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)

      setCount(Math.floor(startValue + (endValue - startValue) * progress))

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setHasAnimated(true)
      }
    }

    requestAnimationFrame(animate)
  }, [trigger, hasAnimated, end, duration])

  return <span>{count}{suffix}</span>
}

const statsData = [
  { key: 'experience', suffix: '+', end: 4 },
  { key: 'projects', suffix: '+', end: 15 },
  { key: 'clients', suffix: '+', end: 10 },
  { key: 'collaborations', suffix: '+', end: 3 },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}

const Stats = () => {
  const { t } = useTranslation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className="about-stats-row"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      {statsData.map((stat) => (
        <motion.div key={stat.key} variants={itemVariants}>
          <GlassCard className="about-stat-card pulse-glow">
            <span className="about-stat-number">
              <CountUp
                end={stat.end}
                duration={2}
                suffix={stat.suffix}
                trigger={isInView}
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
