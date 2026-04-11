import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    filter: 'blur(6px)' 
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { 
      duration: 0.6, 
      ease: [0.25, 0.1, 0.25, 1] 
    }
  },
  exit: {
    opacity: 0,
    y: -30,
    filter: 'blur(6px)',
    transition: { 
      duration: 0.4, 
      ease: [0.25, 0.1, 0.25, 1] 
    }
  }
}

const AboutText = () => {
  const { t } = useTranslation()

  return (
    <motion.div
      className="about-text"
      variants={containerVariants}
    >
      <motion.h2 
        className="about-heading"
        variants={itemVariants}
      >
        {t('about.title')}
      </motion.h2>

      <motion.p 
        className="about-role"
        variants={itemVariants}
      >
        {t('about.role')}
      </motion.p>

      <motion.p 
        className="about-description"
        variants={itemVariants}
      >
        {t('about.description')}
      </motion.p>

      <motion.a
        href="https://www.linkedin.com/in/yogesh-m-314ab8264/"
        target="_blank"
        rel="noopener noreferrer"
        className="about-cta-button"
        variants={itemVariants}
        whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(168, 85, 247, 0.4)' }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="about-cta-icon">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
        {t('about.cta')}
      </motion.a>
    </motion.div>
  )
}

export default AboutText
