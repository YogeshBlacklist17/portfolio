import { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function MagneticButton({
  children,
  className,
  onClick,
  variant = "primary",
  isDark = true,
}) {
  void motion;
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, {
      x: x * 0.25,
      y: y * 0.25,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.4)",
    });
  };

  const base =
    "relative px-6 py-3 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200 overflow-hidden";
  const styles = {
    primary: isDark
      ? "bg-white text-black hover:bg-gray-100 hover:shadow-[0_8px_30px_rgba(255,255,255,0.3)] border border-white/20"
      : "bg-black text-white hover:bg-gray-900 hover:shadow-[0_8px_30px_rgba(0,0,0,0.35)]",
    outline: isDark
      ? "bg-white/5 text-white/70 border border-white/10 backdrop-blur-md hover:border-white/30 hover:text-white hover:bg-white/10"
      : "bg-black/5 text-black/70 border border-black/10 backdrop-blur-md hover:border-black/30 hover:text-black hover:bg-black/10",
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`${base} ${styles[variant]} ${className || ""}`}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.button>
  );
}
