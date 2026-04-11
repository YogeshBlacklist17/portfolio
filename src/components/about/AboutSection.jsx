import { motion, useAnimation, useInView } from 'framer-motion'
import { useRef, useEffect } from 'react'
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
      className="about-section"
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
    </motion.section>
  )
}

export default AboutSection
