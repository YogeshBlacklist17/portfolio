import { motion } from "framer-motion";

export default function FloatingCard({
  label,
  value,
  sub,
  position,
  delay = 0,
  scrollStyle,
}) {
  void motion;
  const floatAnim = {
    animate: { y: [0, -8, 0] },
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut", delay },
  };

  return (
    <motion.div
      {...floatAnim}
      style={scrollStyle}
      className={`absolute ${position} bg-[rgba(10,10,15,0.85)] border border-white/8 backdrop-blur-xl rounded-xl px-4 py-3 z-10`}
    >
      <p className="text-[9px] tracking-widest text-white/30 uppercase mb-1">
        {label}
      </p>
      <p className="text-sm font-bold text-white/90">{value}</p>
      {sub && (
        <p className="text-[9px] text-white/30 mt-0.5 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-teal inline-block" />
          {sub}
        </p>
      )}
    </motion.div>
  );
}
