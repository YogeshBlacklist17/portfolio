import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion' // eslint-disable-line no-unused-vars
import { useTranslation } from 'react-i18next'
import './Navbar.css'

const Navbar = () => {
  const { t, i18n } = useTranslation()
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : true
  })
  const [activeSection, setActiveSection] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [currentLang, setCurrentLang] = useState(i18n.language)

  const sections = useMemo(
    () => ['home', 'about', 'stack', 'work', 'faq', 'contact'],
    []
  )

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  // Scroll spy
  useEffect(() => {
    const elements = sections
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id)
        }
      },
      {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: [0.1, 0.3, 0.5],
      }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sections])

  // Track scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'de' : 'en'
    i18n.changeLanguage(newLang)
    setCurrentLang(newLang)
    localStorage.setItem('language', newLang)
  }

  const navVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { type: 'spring', stiffness: 100, damping: 20 }
  }

  const linkVariants = {
    hover: { scale: 1.1, y: -2 },
    tap: { scale: 0.95 }
  }

  const mobileMenuVariants = {
    closed: { opacity: 0, height: 0, y: -20 },
    open: { opacity: 1, height: 'auto', y: 0 }
  }

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.1 } })
  }

  return (
    <motion.nav
      variants={navVariants}
      initial="initial"
      animate="animate"
      className={`navbar-container ${darkMode ? 'dark-mode' : ''} ${scrolled ? 'scrolled' : ''}`}
    >
      <div className="navbar-content">
        <div className="navbar-inner">
          
          {/* Logo */}
          <motion.button
            variants={linkVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => scrollToSection('home')}
            className="logo-button"
            transition={{ duration: 0.5 }}
          >
            YOGESH M
          </motion.button>

          {/* Desktop menu */}
          <div className="desktop-menu">
            {sections.map((section) => {
              const isActive = activeSection === section
              return (
                <motion.button
                  key={section}
                  variants={linkVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => scrollToSection(section)}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSection"
                      className="active-indicator"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span>
                    {t(`nav.${section}`)}
                  </span>
                </motion.button>
              )
            })}
          </div>

          {/* Right controls */}
          <div className="right-controls">
            <motion.a
              variants={linkVariants}
              whileHover="hover"
              whileTap="tap"
              href="https://drive.google.com/file/d/15aT3Yajtb4vrD3I5c55jSJkq4FdrXun2/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="resume-button"
            >
              {t('nav.resume')}
            </motion.a>
            <motion.button
              variants={linkVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={toggleLanguage}
              className="theme-toggle"
              aria-label="Toggle language"
            >
              <AnimatePresence mode="wait">
                <motion.svg
                  key="world"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ color: darkMode ? '#a855f7' : '#3b82f6' }}
                >
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" strokeWidth="2" />
                </motion.svg>
              </AnimatePresence>
            </motion.button>
            <motion.button
              variants={linkVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => setDarkMode((v) => !v)}
              className="theme-toggle"
              aria-label="Toggle dark mode"
            >
              <AnimatePresence mode="wait">
                {darkMode ? (
                  <motion.svg
                    key="moon"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{ color: '#a855f7' }}
                  >
                    <path
                      d="M21 13.2A8.5 8.5 0 1 1 10.8 3a6.5 6.5 0 0 0 10.2 10.2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="sun"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{ color: '#f59e0b' }}
                  >
                    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
                    <path
                      d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </motion.svg>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.button
              variants={linkVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className="hamburger-button"
              aria-label="Open menu"
              aria-expanded={isMobileMenuOpen}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.svg
                    key="close"
                    initial={{ rotate: -90, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    exit={{ rotate: 90, scale: 0 }}
                    transition={{ duration: 0.2 }}
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="menu"
                    initial={{ rotate: 90, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    exit={{ rotate: -90, scale: 0 }}
                    transition={{ duration: 0.2 }}
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`mobile-dropdown ${darkMode ? 'dark' : ''}`}
          >
            <div className="mobile-menu-content">
              {sections.map((section, index) => {
                const isActive = activeSection === section
                return (
                  <motion.button
                    key={section}
                    variants={itemVariants}
                    custom={index}
                    initial="closed"
                    animate="open"
                    onClick={() => scrollToSection(section)}
                    className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                  >
                    {t(`nav.${section}`)}
                  </motion.button>
                )
              })}
              <motion.a
                variants={itemVariants}
                custom={sections.length}
                initial="closed"
                animate="open"
                href="https://drive.google.com/file/d/15aT3Yajtb4vrD3I5c55jSJkq4FdrXun2/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-nav-link resume-link"
              >
                {t('nav.resume')}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
