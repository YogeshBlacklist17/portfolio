import { motion } from "framer-motion";
import { useState } from "react";

export default function FloatingCard({
  label,
  value,
  sub,
  position,
  delay = 0,
  scrollStyle,
}) {
  const [isDark] = useState(() => {
    if (typeof document === 'undefined') return false;
    return document.documentElement.classList.contains('dark') || localStorage.getItem('darkMode') === 'true';
  });

  const floatAnim = {
    animate: { y: [0, -8, 0] },
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut", delay },
  };

  const cardClasses = `absolute ${position} backdrop-blur-xl rounded-xl px-4 py-3 z-10 ${
    isDark 
      ? 'bg-[rgba(10,10,15,0.85)] border border-white/8' 
      : 'bg-[rgba(255,255,255,0.9)] border border-black/10'
  }`;

  const labelClasses = `text-[9px] tracking-widest uppercase mb-1 ${
    isDark ? 'text-white/30' : 'text-black/50'
  }`;

  const valueClasses = `text-sm font-bold ${
    isDark ? 'text-white/90' : 'text-black/90'
  }`;

  const subClasses = `text-[9px] mt-0.5 flex items-center gap-1.5 ${
    isDark ? 'text-white/30' : 'text-black/50'
  }`;

  return (
    <motion.div
      {...floatAnim}
      style={scrollStyle}
      className={cardClasses}
    >
      <p className={labelClasses}>
        {label}
      </p>
      <p className={valueClasses}>{value}</p>
      {sub && (
        <p className={subClasses}>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-teal inline-block" />
          {sub}
        </p>
      )}
    </motion.div>
  );
}
