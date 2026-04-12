import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  void motion;
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const trailX = useSpring(cursorX, { stiffness: 80, damping: 18 });
  const trailY = useSpring(cursorY, { stiffness: 80, damping: 18 });
  const dotRef = useRef(null);

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        ref={dotRef}
        style={{ left: cursorX, top: cursorY }}
        className="fixed z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-teal"
      />
      <motion.div
        style={{ left: trailX, top: trailY }}
        className="fixed z-[9998] pointer-events-none -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-brand-teal/40"
      />
    </>
  );
}
