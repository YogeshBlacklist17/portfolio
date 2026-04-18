import { useRef, useEffect, useState } from "react";

const LINES = [
  {
    words: ["THINK", "BUILD", "SHIP."],
    fontSize: "clamp(8vw, 11vw, 13vw)",
    paddingLeft: 0,
  },
  {
    words: ["NO", "EXCUSES", "JUST", "CLEAN", "EXECUTION."],
    fontSize: "clamp(5vw, 7.5vw, 9vw)",
    paddingLeft: "clamp(1.5rem, 6vw, 8rem)",
  },
  {
    words: ["DELIVER", "REAL", "IMPACT."],
    fontSize: "clamp(6.5vw, 9vw, 11vw)",
    paddingLeft: "clamp(3rem, 12vw, 16rem)",
  },
];

// Exit order: highest number exits FIRST (stats), 0 exits LAST (badge)
export default function ManifestoSection() {
  const sectionRef   = useRef(null);
  const manifestoRef = useRef(null);
  const wordsRef     = useRef([]);
  const [isDark, setIsDark] = useState(() => {
    if (typeof document === 'undefined') return false;
    const isDarkClass = document.documentElement.classList.contains('dark');
    const isDarkStorage = localStorage.getItem('darkMode') === 'true';
    return isDarkClass || isDarkStorage;
  });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleThemeChange = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setVisible(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    const lerp = (a, b, n) => a + (b - a) * n;

    let current = 0;
    let target = 0;

    const SCROLL_MULTIPLIER = 3;

    function updateTarget() {
      const rect = section.getBoundingClientRect();
      const scrolled = -rect.top;
      const maxScroll = window.innerHeight * SCROLL_MULTIPLIER;
      target = clamp(scrolled / maxScroll, 0, 1);
    }

    function applyTimeline(p) {
      const manifesto = manifestoRef.current;
      const words = wordsRef.current.filter(Boolean);
      const totalWords = words.length;

      // ───── PHASES ─────
      const entry = Math.min(1, p / 0.15);
      const core = Math.min(1, Math.max(0, (p - 0.15) / 0.3));
      const exit = Math.min(1, Math.max(0, (p - 0.8) / 0.2));

      // ───── ENTRY (blur → clear) ─────
      const blurIn = (1 - entry) * 10;

      // ───── EXIT (zoom in + fade to 25%) ─────
      const scale = 1 + exit * 1.0;
      const y = -exit * 300;
      const opacity = exit > 0
        ? 0.25 + (1 - exit) * 0.75
        : entry;

      manifesto.style.opacity = opacity;
      manifesto.style.transform = `translateY(${y}px) scale(${scale})`;
      manifesto.style.filter = `blur(${blurIn}px)`;

      // ───── WORD REVEAL ─────
      const litCount = Math.floor(core * totalWords);

      const litColor = isDark ? "#F0EBE0" : "#000";
      const dimColor = isDark ? "#1A1A1A" : "#E5E5E5";

      words.forEach((w, i) => {
        w.style.color = i < litCount ? litColor : dimColor;
      });

      // ───── FINAL EMPHASIS ─────
      if (p > 0.75) {
        const accent = isDark ? "#FF2D00" : "#DC2626";
        words.slice(8).forEach(w => (w.style.color = accent));
      }
    }

    let rafId = null;
    function animate() {
      updateTarget();

      // smooth interpolation (KEY to Apple feel)
      current = lerp(current, target, 0.25);

      applyTimeline(current);

      rafId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [isDark, visible]);

  let wordIdx = 0;

  const S = { // shared inline style shortcuts
    mono: { fontFamily: "'Courier New', monospace" },
    impact: { fontFamily: "Impact, 'Arial Narrow', sans-serif" },
  };

  return (
    <section
      ref={sectionRef}
      style={{ height: "400vh", position: "relative", background: isDark ? "#050508" : "#FFFFFF" }}
    >
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>

        {/* ─── MANIFESTO BLOCK ─── */}
        <div
          ref={manifestoRef}
          style={{
            position: "absolute", inset: 0,
            display: "flex", flexDirection: "column",
            justifyContent: "center",
            padding: "0 clamp(2rem,6vw,8rem)",
            willChange: "opacity, transform",
            transformOrigin: "center center"
          }}
        >
          <span style={{ ...S.mono, fontSize:"0.6rem", letterSpacing:"0.22em", color: isDark ? "#14d2a0" : "#000000", textTransform:"uppercase", marginBottom:"2rem" }}>
            / MANIFESTO / 
          </span>

          {LINES.map((line, li) => (
            <span key={li} style={{
              display: "block",
              fontFamily: "Impact, 'Arial Narrow', sans-serif",
              fontSize: line.fontSize,
              lineHeight: 0.87,
              paddingLeft: line.paddingLeft,
              marginBottom: "0.06em",
            }}>
              {line.words.map((word) => {
                const idx = wordIdx++;
                return (
                  <span
                    key={word + idx}
                    ref={el => { wordsRef.current[idx] = el; }}
                    style={{ display:"inline-block", color: isDark ? "#1A1A1A" : "#E5E5E5", marginRight:"0.12em", transition:"color 0.1s ease-out" }}
                  >
                    {word}
                  </span>
                );
              })}
            </span>
          ))}
        </div>

        {/* Corner label */}
        <span style={{ position:"absolute", top:"2rem", left:"clamp(2rem,6vw,8rem)", ...S.mono, fontSize:"0.6rem", letterSpacing:"0.2em", color: isDark ? "#14d2a0" : "#000000", textTransform:"uppercase" }}>
          / MANIFESTO / 
        </span>
      </div>
    </section>
  );
}
