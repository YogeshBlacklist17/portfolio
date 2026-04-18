import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

// Global lenis instance
let lenisInstance = null;

export function getLenis() {
  return lenisInstance;
}

export default function useSmoothScroll() {
  useEffect(() => {
    lenisInstance = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    let rafId = null;
    function raf(time) {
      lenisInstance.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      lenisInstance.destroy();
      lenisInstance = null;
    };
  }, []);
}
