import { motion, useAnimation, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import AboutText from './AboutText'
import Stats from './Stats'
import GlassCard from './GlassCard'
import portraitImg from '../../assets/about/img1.jpeg'
import '../../styles/About.css'

const smoothVariants = {
  hidden: {
    opacity: 0,
    y: 80,
    scale: 0.98
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 18,
      staggerChildren: 0.15
    }
  },
  exit: {
    opacity: 0,
    y: -60,
    scale: 0.98,
    transition: {
      duration: 0.4,
      ease: "easeInOut"
    }
  }
};

const portraitVariants = {
  hidden: {
    opacity: 0,
    y: 100,
    scale: 0.92,
    rotate: -3
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 20,
      mass: 0.8,
      duration: 0.8
    }
  },
  exit: {
    opacity: 0,
    y: -80,
    scale: 0.92,
    rotate: 3,
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  }
};

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "-20%",
    amount: 0.3
  });

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

  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("exit");
    }
  }, [isInView, controls]);

  return (
    <motion.section
      ref={ref}
      id="about"
      className={`about-section ${isDark ? 'dark' : ''}`}
      variants={smoothVariants}
      initial="hidden"
      animate={controls}
    >
      {/* Background Parallax Glow Blobs */}
      <motion.div
        className="about-glow-blob about-glow-blob-1"
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <motion.div
        className="about-glow-blob about-glow-blob-2"
        animate={{
          x: [0, -25, 0],
          y: [0, 25, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <div className="about-grid-layout">
        {/* Left Content */}
        <GlassCard className="about-content-card">
          <AboutText />
          <Stats />
        </GlassCard>

        {/* Right Portrait Image */}
        <motion.div
          className="about-portrait-wrapper"
          variants={portraitVariants}
        >
          <img
            src={portraitImg}
            alt="About portrait"
            className="about-portrait-img"
            loading="lazy"
          />
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1.8, duration: 0.8, y: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
        onClick={() => {
          const educationSection = document.getElementById('education');
          if (educationSection) {
            educationSection.scrollIntoView({ behavior: 'smooth' });
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
    </motion.section>
  )
}

export default AboutSection
