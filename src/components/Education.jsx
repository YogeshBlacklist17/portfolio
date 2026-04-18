import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { getLenis } from '../hooks/useSmoothScroll'

// Generate particle positions once at module level
const particlePositions = [...Array(8)].map(() => ({
  left: Math.random() * 100,
  top: Math.random() * 100,
  duration: 8 + Math.random() * 4,
  delay: Math.random() * 2,
}))

const getEducationData = (t) => [
  {
    id: 'school',
    title: t('education.school.title'),
    name: t('education.school.name'),
    duration: t('education.school.duration'),
    description: t('education.school.description'),
    skills: ['Mathematics', 'Science', 'Physics', 'Chemistry'],
  },
  {
    id: 'bachelor',
    title: t('education.bachelor.title'),
    name: t('education.bachelor.name'),
    duration: t('education.bachelor.duration'),
    description: t('education.bachelor.description'),
    skills: ['Electrical Engineering', 'Electronics', 'Programming', 'Power Systems'],
  },
  {
    id: 'master',
    title: t('education.master.title'),
    name: t('education.master.name'),
    duration: t('education.master.duration'),
    description: t('education.master.description'),
    skills: ['Applied Computer Science', 'Software Engineering', 'Distributed Systems'],
  },
]

const Education = () => {
  const { t } = useTranslation()
  const [hoveredNode, setHoveredNode] = useState(null)
  const [isDark, setIsDark] = useState(() => {
    if (typeof document === 'undefined') return false;
    const isDarkClass = document.documentElement.classList.contains('dark');
    const isDarkStorage = localStorage.getItem('darkMode') === 'true';
    return isDarkClass || isDarkStorage;
  });

  useEffect(() => {
    const handleThemeChange = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    window.addEventListener('theme-change', handleThemeChange);
    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => {
      window.removeEventListener('theme-change', handleThemeChange);
      observer.disconnect();
    };
  }, []);

  const educationData = getEducationData(t)

  return (
    <section
      id="education"
      className="h-screen snap-start relative overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20 transition-colors duration-300 pt-20"
    >
      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particlePositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400/20 dark:bg-purple-500/20 rounded-full"
            animate={{
              y: [0, -50, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: pos.duration,
              repeat: Infinity,
              delay: pos.delay,
              ease: "easeInOut"
            }}
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
            }}
          />
        ))}
      </div>


      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-center text-gray-900 dark:text-white mb-20"
        >
          {t('education.title')}
        </motion.h2>

        {/* Cartoon Character */}
        <motion.div
          className="absolute left-4 md:left-20 bottom-20 md:bottom-32 z-20 hidden lg:block"
          animate={{
            x: hoveredNode ? (hoveredNode === 'school' ? 100 : hoveredNode === 'bachelor' ? 200 : 300) : 0,
            rotate: hoveredNode ? [-5, 5, -5] : [0, 2, 0],
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
          }}
        >
          <svg
            width="150"
            height="200"
            viewBox="0 0 150 200"
            className="drop-shadow-2xl"
          >
            {/* Character Body */}
            <motion.circle
              cx="75"
              cy="60"
              r="35"
              fill="#fbbf24"
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            {/* Eyes */}
            <circle cx="60" cy="55" r="5" fill="#1f2937" />
            <circle cx="90" cy="55" r="5" fill="#1f2937" />
            {/* Smile */}
            <path
              d="M 60 75 Q 75 85 90 75"
              stroke="#1f2937"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            {/* Body */}
            <rect x="55" y="95" width="40" height="60" rx="10" fill="#8b5cf6" />
            {/* Legs */}
            <rect x="55" y="155" width="15" height="35" rx="5" fill="#6366f1" />
            <rect x="80" y="155" width="15" height="35" rx="5" fill="#6366f1" />
            {/* Magnifying Glass */}
            <motion.g
              animate={{
                rotate: hoveredNode ? [-20, 20, -20] : [0, 10, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            >
              <circle cx="120" cy="70" r="25" fill="none" stroke="#9333ea" strokeWidth="4" />
              <circle cx="120" cy="70" r="20" fill="rgba(147, 51, 234, 0.2)" />
              <rect x="135" y="85" width="8" height="35" rx="4" fill="#9333ea" transform="rotate(45 135 85)" />
            </motion.g>
          </svg>
        </motion.div>

        {/* Timeline Nodes */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-20 right-20 h-1 bg-gradient-to-r from-purple-300 via-purple-500 to-purple-300 dark:from-purple-700 dark:via-purple-500 dark:to-purple-700 rounded-full transform -translate-y-1/2 opacity-50" />

          {educationData.map((item, index) => (
            <motion.div
              key={item.id}
              className="relative z-30"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              onHoverStart={() => setHoveredNode(item.id)}
              onHoverEnd={() => setHoveredNode(null)}
            >
              {/* Node Circle */}
              <motion.div
                className="relative"
                animate={{
                  scale: hoveredNode === item.id ? 1.2 : 1,
                  y: hoveredNode === item.id ? -10 : 0,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 20,
                }}
              >
                {/* Glow Effect */}
                {hoveredNode === item.id && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-purple-500/30 blur-xl"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  />
                )}

                {/* Circle */}
                <motion.div
                  className={`relative w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
                    hoveredNode === item.id
                      ? 'bg-gradient-to-br from-purple-500 to-indigo-600 shadow-2xl shadow-purple-500/50'
                      : 'bg-white dark:bg-gray-800 shadow-lg'
                  }`}
                  animate={{
                    boxShadow: hoveredNode === item.id
                      ? '0 0 40px rgba(147, 51, 234, 0.6)'
                      : '0 10px 30px rgba(0, 0, 0, 0.1)',
                  }}
                  whileHover={{
                    rotate: [0, -5, 5, -5, 0],
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Icon */}
                  <motion.div
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="text-4xl md:text-5xl"
                  >
                    {item.id === 'school' ? '🎒' : item.id === 'bachelor' ? '🎓' : '🎓'}
                  </motion.div>
                </motion.div>

                {/* Label */}
                <motion.p
                  className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-sm md:text-base font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap"
                  animate={{
                    opacity: hoveredNode === item.id ? 1 : 0.7,
                    scale: hoveredNode === item.id ? 1.1 : 1,
                  }}
                >
                  {item.title}
                </motion.p>
              </motion.div>

              {/* Detail Card */}
              {hoveredNode === item.id && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-72 md:w-80 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-purple-200 dark:border-purple-700 z-40"
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {item.name}
                  </h3>
                  <p className="text-purple-600 dark:text-purple-400 font-semibold mb-3">
                    {item.duration}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Other circles fade effect */}
        {hoveredNode && (
          <motion.div
            className="absolute inset-0 bg-gray-900/10 dark:bg-black/30 pointer-events-none z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1.8, duration: 0.8, y: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
        onClick={() => {
          const faqSection = document.getElementById('faq');
          const lenis = getLenis();
          if (lenis && faqSection) {
            lenis.scrollTo(faqSection);
          } else if (faqSection) {
            faqSection.scrollIntoView({ behavior: 'smooth' });
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
  )
}

export default Education
