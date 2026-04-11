import { useState, useEffect, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import '../styles/Contact.css'

const RECEIVING_EMAIL = 'yogesh.mayocipom2001@gmail.com'

// Mouse-tracking glow — uses useCallback + requestAnimationFrame to
// avoid triggering React re-renders on every mousemove
const GlowCard = ({ children, className, glowColor = '168, 85, 247' }) => {
  const cardRef = useRef(null)
  const glowRef = useRef(null)
  const rafRef = useRef(null)

  const handleMouseMove = useCallback((e) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const rect = cardRef.current?.getBoundingClientRect()
      if (!rect || !glowRef.current) return
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      glowRef.current.style.background =
        `radial-gradient(500px circle at ${x}px ${y}px, rgba(${glowColor}, 0.13), transparent 65%)`
    })
  }, [glowColor])

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    if (glowRef.current) glowRef.current.style.background = 'none'
  }, [])

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }, [])

  return (
    <div
      ref={cardRef}
      className={`glow-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow overlay — manipulated via ref, zero React re-renders */}
      <div
        ref={glowRef}
        className="glow-card-overlay"
      />
      <div className="glow-card-content">
        {children}
      </div>
    </div>
  )
}

const Contact = () => {
  const { t } = useTranslation()
  const shouldReduceMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [showPhone, setShowPhone] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('idle')
  const [errors, setErrors] = useState({})
  const sectionRef = useRef(null)

  useEffect(() => {
    // Small delay so the snap animation fully settles before we run entrance
    const t = setTimeout(() => setMounted(true), 80)
    return () => clearTimeout(t)
  }, [])

  // Intersection Observer for fade-in/fade-out on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold: 0.1,
        rootMargin: '-50px'
      }
    )

    const currentRef = sectionRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  // Detect dark mode and react to theme changes
  const [isDark, setIsDark] = useState(
    typeof document !== 'undefined' &&
    document.documentElement.classList.contains('dark')
  )

  useEffect(() => {
    const handleThemeChange = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    
    // Listen for theme changes
    window.addEventListener('theme-change', handleThemeChange)
    
    // Also check for class changes on html element
    const observer = new MutationObserver(() => {
      handleThemeChange()
    })
    
    if (document.documentElement) {
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
      })
    }
    
    return () => {
      window.removeEventListener('theme-change', handleThemeChange)
      observer.disconnect()
    }
  }, [])

  const glowColor = isDark ? '168, 85, 247' : '34, 197, 94'

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/yogesh-m-314ab8264/',
      icon: <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    },
    {
      name: 'GitHub',
      url: 'https://github.com/YogeshBlacklist17',
      icon: <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/defnot.ace17',
      icon: <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
    }
  ]

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = t('contact.nameRequired')
    if (!formData.email.trim()) newErrors.email = t('contact.emailRequired')
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = t('contact.invalidEmail')
    if (!formData.message.trim()) newErrors.message = t('contact.messageRequired')
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsSubmitting(true)
    setSubmitStatus('idle')
    try {
      await emailjs.send('service_55sabvs', 'template_ug73fga', {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject || t('contact.noSubject'),
        message: formData.message,
        to_email: RECEIVING_EMAIL,
        to_name: t('contact.recipientName'),
        timestamp: new Date().toLocaleString(),
        source: t('contact.emailSource')
      }, '1jFoQV6I1dKLaDFyy')
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setSubmitStatus('idle'), 2000)
    } catch (err) {
      console.error(err)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  // Entrance animation config — only opacity + Y (no X slide = less reflow)
  // No animation at all if user prefers reduced motion
  const entrance = (delay = 0) => ({
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    animate: { opacity: mounted && isVisible ? 1 : 0, y: mounted && isVisible ? 0 : 24 },
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay }
  })

  const inputClass = (field) =>
    `form-input ${errors[field] ? 'error' : ''}`

  return (
    <section ref={sectionRef} className="w-full min-h-screen py-20 px-4 md:px-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#0a0a0a] dark:to-[#111111] transition-colors duration-300 relative overflow-hidden">

      {/* Static ambient glow — no animation, just a colour tint */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/8 dark:bg-purple-500/8 rounded-full blur-3xl" />
      </div>

      <motion.div className="contact-wrapper" {...entrance(0)}>

        {/* ── LEFT PANEL ── */}
        <motion.div {...entrance(0.08)}>
          <GlowCard
            glowColor={glowColor}
            className="contact-left-panel h-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-md"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              {t('contact.connectHub')}
            </h2>

            <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-purple-100 border border-green-300 dark:border-purple-300 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-green-500 dark:bg-purple-500 rounded-full animate-pulse" />
              <span className="text-green-700 dark:text-purple-700 text-sm font-medium">
                {t('contact.availableForOpportunities')}
              </span>
            </div>

            <div className="flex flex-col gap-3 mb-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-4 transition-colors duration-200 hover:bg-green-50 dark:hover:bg-purple-900/20 hover:border-green-300 dark:hover:border-purple-700"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-green-100 dark:bg-purple-900/30 rounded-xl text-green-600 dark:text-purple-400 shrink-0">
                    {social.icon}
                  </div>
                  <span className="text-gray-900 dark:text-white font-medium">{social.name}</span>
                </motion.a>
              ))}
            </div>

            {!showPhone ? (
              <motion.button
                className="w-full py-3 px-4 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white font-medium transition-colors duration-200 hover:bg-green-50 dark:hover:bg-purple-900/20 hover:border-green-300 dark:hover:border-purple-700 hover:text-green-700 dark:hover:text-purple-400"
                onClick={() => setShowPhone(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
              >
                {t('contact.revealPhone')}
              </motion.button>
            ) : (
              <motion.div
                className="text-center py-3 px-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-xl"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22 }}
              >
                <span className="text-green-700 dark:text-green-400 text-xl font-semibold tracking-wide">
                  +91 98765 43210
                </span>
              </motion.div>
            )}
          </GlowCard>
        </motion.div>

        {/* ── RIGHT PANEL ── */}
        <motion.div {...entrance(0.16)}>
          <GlowCard
            glowColor={glowColor}
            className="contact-right-panel h-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-md"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              {t('contact.contactForm')}
            </h2>

            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>

              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                  {t('contact.name')}
                </label>
                <input
                  type="text" id="name" name="name"
                  value={formData.name} onChange={handleChange}
                  className={inputClass('name')}
                  placeholder={t('contact.namePlaceholder')}
                />
                {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                  {t('contact.email')}
                </label>
                <input
                  type="email" id="email" name="email"
                  value={formData.email} onChange={handleChange}
                  className={inputClass('email')}
                  placeholder={t('contact.emailPlaceholder')}
                />
                {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="subject" className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                  {t('contact.subject')}
                </label>
                <input
                  type="text" id="subject" name="subject"
                  value={formData.subject} onChange={handleChange}
                  className="form-input"
                  placeholder={t('contact.subjectPlaceholder')}
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                  {t('contact.message')}
                </label>
                <textarea
                  id="message" name="message"
                  value={formData.message} onChange={handleChange}
                  className={`${inputClass('message')} resize-y min-h-[120px]`}
                  placeholder={t('contact.messagePlaceholder')}
                  rows="5"
                />
                {errors.message && <span className="text-red-500 text-xs">{errors.message}</span>}
              </div>

              {/* Auto-fill */}
              <motion.button
                type="button"
                className="py-3 px-4 bg-gray-50 dark:bg-white/5 border border-dashed border-gray-300 dark:border-white/20 rounded-xl text-gray-700 dark:text-gray-300 text-sm font-medium transition-colors duration-200 hover:bg-green-50 dark:hover:bg-purple-900/20 hover:border-green-400 dark:hover:border-purple-600 hover:text-green-700 dark:hover:text-purple-400"
                onClick={() => setFormData(p => ({ ...p, message: t('contact.professionalMessageTemplate') }))}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
              >
                {t('contact.generateProfessionalMessage')}
              </motion.button>

              {/* Submit */}
              <motion.button
                type="submit"
                className="py-3 px-6 bg-gradient-to-r from-green-500 to-green-600 dark:from-purple-500 dark:to-purple-600 rounded-xl text-white font-semibold shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98, y: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
              >
                {isSubmitting
                  ? <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t('contact.sending')}
                    </span>
                  : t('contact.sendMessage')
                }
              </motion.button>

              {submitStatus === 'success' && (
                <motion.div
                  className="py-3 px-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-xl text-green-700 dark:text-green-400 text-center font-medium"
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22 }}
                >
                  {t('contact.messageSent')} ✓
                </motion.div>
              )}
              {submitStatus === 'error' && (
                <motion.div
                  className="py-3 px-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-xl text-red-700 dark:text-red-400 text-center font-medium"
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22 }}
                >
                  {t('contact.sendError')}
                </motion.div>
              )}
            </form>
          </GlowCard>
        </motion.div>

      </motion.div>

      {/* Particles — CSS-only, zero JS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        {[
          { top: '20%', left: '10%',  animationDelay: '0s'   },
          { top: '60%', left: '20%',  animationDelay: '-5s'  },
          { top: '40%', right: '15%', animationDelay: '-10s' },
          { bottom: '30%', right: '25%', animationDelay: '-15s' },
          { top: '80%', left: '50%',  animationDelay: '-8s'  },
        ].map((style, i) => (
          <div
            key={i}
            className="particle bg-green-500/30 dark:bg-purple-500/30"
            style={{ ...style, animationDelay: style.animationDelay }}
          />
        ))}
      </div>

    </section>
  )
}

export default Contact