import { motion } from 'framer-motion'
import AboutText from './AboutText'
import Stats from './Stats'
import GlassCard from './GlassCard'
import portraitImg from '../../assets/about/img1.jpeg'
import '../../styles/About.css'

const itemVariants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: 'easeOut' }
  }
}

const AboutSection = () => {
  return (
    <section id="about" className="about-section">
      {/* Background Parallax Glow Blobs */}
      <motion.div
        className="about-glow-blob about-glow-blob-1"
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="about-glow-blob about-glow-blob-2"
        animate={{
          x: [0, -25, 0],
          y: [0, 25, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="about-glow-blob about-glow-blob-3"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.06, 0.08, 0.06],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
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
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <img
            src={portraitImg}
            alt="About portrait"
            className="about-portrait-img"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection
