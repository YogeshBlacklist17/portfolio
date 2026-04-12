import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '../styles/FAQ.css';

const GlowCard = ({ children, className, glowColor = '34, 197, 94', activeGlowColor }) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const rafRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect || !glowRef.current) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glowRef.current.style.background =
        `radial-gradient(500px circle at ${x}px ${y}px, rgba(${glowColor}, 0.13), rgba(${glowColor}, 0.08) 40%, rgba(${glowColor}, 0.04) 55%, rgba(${glowColor}, 0.02) 70%, transparent 85%)`;
    });
  }, [glowColor]);

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (glowRef.current) glowRef.current.style.background = 'none';
  }, []);

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  return (
    <div
      ref={cardRef}
      className={`glow-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={glowRef} className="glow-overlay" />
      <div className="glow-content">{children}</div>
    </div>
  );
};

const FAQ = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const [isDark, setIsDark] = useState(
    typeof document !== 'undefined' &&
    (document.documentElement.classList.contains('dark') ||
     window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.3 }
    );

    const section = document.querySelector('.faq-section');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  useEffect(() => {
    const handleThemeChange = () => {
      setIsDark(
        document.documentElement.classList.contains('dark') ||
        window.matchMedia('(prefers-color-scheme: dark)').matches
      );
    };

    window.addEventListener('theme-change', handleThemeChange);
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleThemeChange);

    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      window.removeEventListener('theme-change', handleThemeChange);
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handleThemeChange);
      observer.disconnect();
    };
  }, []);

  const glowColor = isDark ? '168, 85, 247' : '34, 197, 94';

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    { key: 'q1' },
    { key: 'q2' },
    { key: 'q3' },
    { key: 'q4' },
    { key: 'q5' },
  ];

  return (
    <section className={`faq-section ${isVisible ? 'faq-visible' : 'faq-hidden'}`}>
      <div className="faq-container">
        <div className="faq-grid">

          {/* Left column */}
          <div className={`faq-left-wrapper ${isVisible ? 'fade-in-left' : 'fade-out-left'}`}>
            <div className="faq-left">
              <h2 className="faq-title">{t('faq.title')}</h2>
              <p className="faq-desc">{t('faq.description')}</p>

              <div className="faq-glass-card">
                <div className="faq-glass-title">Why this FAQ?</div>

                <div className="faq-glass-features">
                  <div>  -Instant clarity on common questions</div>
                  <div>  -Secure & professional communication</div>
                  <div>  -Built for fast decision making</div>
                </div>
              </div>

              <div className="faq-blob-bg" />
            </div>
          </div>

          {/* Right column */}
          <div className="faq-list">
            {faqItems.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <GlowCard
                  key={index}
                  glowColor={glowColor}
                  className={`faq-item-card ${isActive ? 'faq-item-active' : ''} ${isVisible ? 'fade-in-up' : 'fade-out-down'}`}
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <div
                    className="faq-item-inner"
                    onClick={() => toggleFAQ(index)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleFAQ(index);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isActive}
                  >
                    {/* Question row */}
                    <div className={`faq-question-row ${isActive ? 'faq-question-active' : ''}`}>
                      <h3 className={`faq-question-text ${isActive ? 'faq-question-text-active' : ''}`}>
                        {t(`faq.items.${item.key}.question`)}
                      </h3>
                      <span className={`faq-chevron ${isActive ? 'faq-chevron-active' : ''}`}>
                        <ChevronDown size={18} />
                      </span>
                    </div>

                    {/* Answer — CSS grid trick for smooth height */}
                    <div className={`faq-answer-wrap ${isActive ? 'faq-answer-open' : ''}`}>
                      <div className="faq-answer-inner">
                        <p className="faq-answer-text">
                          {t(`faq.items.${item.key}.answer`)}
                        </p>
                      </div>
                    </div>
                  </div>
                </GlowCard>
              );
            })}
          </div>

        </div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1.8, duration: 0.8, y: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
        onClick={() => {
          const contactSection = document.getElementById('contact');
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[9px] tracking-widest cursor-pointer ${isDark ? 'text-white/20 hover:text-white/40' : 'text-black/60 hover:text-black/80'} transition-colors`}
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-lg"
        >
          ↓
        </motion.div>
        <div
          className="w-8 h-px"
          style={{
            background: isDark ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)" : "linear-gradient(90deg, transparent, rgba(0,0,0,0.4), transparent)",
          }}
        />
        SCROLL
      </motion.button>
    </section>
  );
};

export default FAQ;