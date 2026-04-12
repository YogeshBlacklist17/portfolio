import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroPhoto from "../assets/hero-photo.jpg";
import resumePdf from "../assets/resume.pdf";
import useTypewriter from "../hooks/useTypewriter";
import MagneticButton from "./MagneticButton";
import FloatingCard from "./FloatingCard";

const roles = ["Developer.", "Designer.", "Builder.", "Creator."];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const nameLetterVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.04,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export default function HeroSection() {
  void motion;
  const ref = useRef(null);
  const role = useTypewriter(roles);
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

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const photoScale = useTransform(scrollYProgress, [0, 1], [0.98, 1.0]);
  const photoOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.3]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const yourName = "Yogesh";

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = resumePdf;
    link.download = 'Yogesh_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen flex items-end overflow-hidden"
    >
      <motion.div
        className="absolute inset-0"
        style={{ scale: photoScale, opacity: photoOpacity }}
      >
        <img
          src={heroPhoto}
          alt="hero background"
          className="w-full h-full object-cover object-top"
          style={{ filter: isDark ? "brightness(1) saturate(0.65)" : "grayscale(80%) brightness(1) contrast(1.1)" }}
        />
      </motion.div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? `radial-gradient(ellipse at 65% 35%, rgba(20,210,160,0.15) 0%, transparent 55%),
               radial-gradient(ellipse at 20% 70%, rgba(91,143,255,0.10) 0%, transparent 50%)`
            : `radial-gradient(ellipse at 65% 35%, rgba(20,210,160,0.08) 0%, transparent 55%),
               radial-gradient(ellipse at 20% 70%, rgba(91,143,255,0.05) 0%, transparent 50%)`,
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? `linear-gradient(to top, rgba(5,5,8,0.97) 0%, rgba(5,5,8,0.65) 38%, rgba(5,5,8,0.15) 65%, rgba(5,5,8,0.0) 100%)`
            : `linear-gradient(to top, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.85) 38%, rgba(255,255,255,0.4) 65%, rgba(255,255,255,0.0) 100%)`,
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: isDark ? 0.3 : 0.15,
          backgroundImage: isDark
            ? `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
               linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`
            : `linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
               linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      <FloatingCard
        label="Experience"
        value="3+ Years"
        sub="Full-Stack Dev"
        position="top-[22%] right-[8%]"
        delay={0}
      />
      <FloatingCard
        label="Location"
        value="Munich, DE"
        sub="Open to remote"
        position="top-[42%] right-[5%]"
        delay={0.8}
      />

      <motion.div
        style={{ y: contentY }}
        className="relative z-10 w-full px-10 md:px-16 pb-14 md:pb-20"
      >
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={itemVariants} className="mb-6">
            <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-medium tracking-widest ${isDark ? 'text-brand-teal border-brand-teal/25 bg-brand-teal/8' : 'text-black border-black/25 bg-black/8'}`}>
              <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isDark ? 'bg-brand-teal' : 'bg-black'}`} />
              AVAILABLE FOR WORK
            </span>
          </motion.div>

          <h1 className={`text-[clamp(3rem,8vw,7rem)] font-black leading-[0.95] tracking-[-0.04em] mb-3 ${isDark ? 'text-white' : 'text-black'}`}>
            {yourName.split("").map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={nameLetterVariants}
                initial="hidden"
                animate="visible"
                className="inline-block"
                style={{ whiteSpace: char === " " ? "pre" : "normal" }}
              >
                {char}
              </motion.span>
            ))}
          </h1>

          <motion.div variants={itemVariants} className="mb-3" key={isDark ? 'dark' : 'light'}>
            <h2
              className="text-[clamp(1.8rem,4vw,3.5rem)] font-black tracking-[-0.03em]"
              style={{
                background: isDark ? "linear-gradient(120deg, #14d2a0, #5b8fff)" : "linear-gradient(120deg, #000000, #333333)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                minHeight: "1.2em",
              }}
            >
              {role}
              <span className={`animate-pulse ${isDark ? 'text-brand-teal' : 'text-black'}`}>|</span>
            </h2>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className={`text-sm font-medium tracking-[0.06em] mb-6 uppercase ${isDark ? 'text-white/40' : 'text-black/50'}`}
          >
            Full-Stack Engineer &nbsp;·&nbsp; DevOps &nbsp;·&nbsp; Open to
            Opportunities
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="w-10 h-0.5 mb-7 rounded-full"
            style={{ background: isDark ? "linear-gradient(90deg, #14d2a0, transparent)" : "linear-gradient(90deg, #000000, transparent)" }}
          />

          <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-8">
            <MagneticButton variant="primary" isDark={isDark}>View my work →</MagneticButton>
            <MagneticButton variant="outline" isDark={isDark} onClick={handleDownloadCV}>Download CV</MagneticButton>
            <MagneticButton variant="outline" isDark={isDark} onClick={scrollToContact}>Let's talk</MagneticButton>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-between gap-6"
          >
            <div className="flex flex-wrap gap-2">
              {["REACT", "TYPESCRIPT", "SPRING BOOT", "JAVA", "DEVOPS", "SQL", "CI/CD"].map(
                (tag) => (
                  <span
                    key={tag}
                    className={`text-[9.5px] font-medium tracking-[0.08em] px-2.5 py-1 rounded ${isDark ? 'text-white/30 border-white/7 bg-white/3' : 'text-black/40 border-black/7 bg-black/3'}`}
                  >
                    {tag}
                  </span>
                )
              )}
            </div>

            <div className="flex gap-6">
              {[
                ["3+", "YEARS EXP"],
                ["20+", "PROJECTS"],
                ["12+", "CLIENTS"],
              ].map(([num, label]) => (
                <div key={label} className="text-right">
                  <p className={`text-xl font-black leading-none ${isDark ? 'text-white' : 'text-black'}`}>{num}</p>
                  <p className={`text-[9px] tracking-widest mt-1 ${isDark ? 'text-white/30' : 'text-black/40'}`}>{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1.8, duration: 0.8, y: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
        onClick={() => {
          const aboutSection = document.getElementById('about');
          if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
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
}
