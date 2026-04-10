import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion' // eslint-disable-line no-unused-vars
import emailjs from '@emailjs/browser'
import '../styles/Contact.css'

// Receiving email address (configure in EmailJS template)
const RECEIVING_EMAIL = 'yogesh.mayocipom2001@gmail.com'

const Contact = () => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [showPhone, setShowPhone] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('idle') // idle, success, error
  const [errors, setErrors] = useState({})

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/yogesh-m-314ab8264/',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      name: 'GitHub',
      url: 'https://github.com/YogeshBlacklist17',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/yogeshmhttps://www.instagram.com/defnot.ace17?igsh=b2p2eTNvZGw3bDBx',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    }
  ]

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = t('contact.nameRequired')
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t('contact.emailRequired')
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('contact.invalidEmail')
    }
    
    if (!formData.message.trim()) {
      newErrors.message = t('contact.messageRequired')
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject || t('contact.noSubject'),
        message: formData.message,
        to_email: RECEIVING_EMAIL,
        to_name: t('contact.recipientName'),
        timestamp: new Date().toLocaleString(),
        source: t('contact.emailSource')
      }
      
      await emailjs.send(
        'service_55sabvs',
        'template_ug73fga',
        templateParams,
        '1jFoQV6I1dKLaDFyy'
      )
      
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 2000)
    } catch (error) {
      console.error('Email send error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const generateProfessionalMessage = () => {
    setFormData(prev => ({
      ...prev,
      message: t('contact.professionalMessageTemplate')
    }))
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const leftPanelVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20
      }
    }
  }

  const rightPanelVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20
      }
    }
  }

  const cardVariants = {
    hover: {
      scale: 1.05,
      rotate: 2,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10
      }
    }
  }

  return (
    <div className="contact-container">
      <motion.div
        className="contact-wrapper"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Left Panel - Connect Hub */}
        <motion.div
          className="contact-left-panel"
          variants={leftPanelVariants}
        >
          <h2 className="panel-title">{t('contact.connectHub')}</h2>
          
          {/* Status Badge */}
          <div className="status-badge">
            <span className="status-dot"></span>
            <span className="status-text">{t('contact.availableForOpportunities')}</span>
          </div>

          {/* Social Links */}
          <div className="social-links">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-card"
                variants={cardVariants}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                <div className="social-icon">
                  {social.icon}
                </div>
                <span className="social-name">{social.name}</span>
              </motion.a>
            ))}
          </div>

          {/* Phone Reveal Section */}
          <div className="phone-section">
            {!showPhone ? (
              <motion.button
                className="reveal-phone-btn"
                onClick={() => setShowPhone(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('contact.revealPhone')}
              </motion.button>
            ) : (
              <motion.div
                className="phone-revealed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="phone-number">+91 98765 43210</span>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Right Panel - Contact Form */}
        <motion.div
          className="contact-right-panel"
          variants={rightPanelVariants}
        >
          <h2 className="panel-title">{t('contact.contactForm')}</h2>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">{t('contact.name')}</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`form-input ${errors.name ? 'error' : ''}`}
                placeholder={t('contact.namePlaceholder')}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">{t('contact.email')}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder={t('contact.emailPlaceholder')}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="subject">{t('contact.subject')}</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="form-input"
                placeholder={t('contact.subjectPlaceholder')}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">{t('contact.message')}</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={`form-textarea ${errors.message ? 'error' : ''}`}
                placeholder={t('contact.messagePlaceholder')}
                rows="5"
              />
              {errors.message && <span className="error-message">{errors.message}</span>}
            </div>

            {/* Auto-fill Button */}
            <motion.button
              type="button"
              className="auto-fill-btn"
              onClick={generateProfessionalMessage}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t('contact.generateProfessionalMessage')}
            </motion.button>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <span className="btn-content">
                  <span className="spinner"></span>
                  {t('contact.sending')}
                </span>
              ) : (
                t('contact.sendMessage')
              )}
            </motion.button>

            {/* Success/Error Messages */}
            {submitStatus === 'success' && (
              <motion.div
                className="success-message"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {t('contact.messageSent')} 
              </motion.div>
            )}
            {submitStatus === 'error' && (
              <motion.div
                className="error-message-box"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {t('contact.sendError')}
              </motion.div>
            )}
          </form>
        </motion.div>
      </motion.div>

      {/* Background Particles */}
      <div className="background-particles">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
      </div>
    </div>
  )
}

export default Contact
