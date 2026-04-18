import { useState, useEffect, useRef } from "react";

const WORDS = [
  "Designing.",
  "Creating.",
  "Building.",
];

function AnimatedWord({ word, onDone }) {
  const chars = word.split("");

  useEffect(() => {
    const charDuration = 150;
    const stayDuration = 300;
    const totalDuration = chars.length * charDuration + stayDuration;
    const timer = setTimeout(onDone, totalDuration);
    return () => clearTimeout(timer);
  }, [word, chars]);

  return (
    <span style={{ display: "inline-flex", gap: "0.04em" }}>
      {chars.map((char, i) => (
        <span
          key={i}
          className="preloader-char"
          style={{
            display: "inline-block",
            opacity: 0,
            transform: "translateY(20px)",
            animation: `riseUpFade 0.15s cubic-bezier(0.4,0,0.2,1) forwards`,
            animationDelay: `${i * 0.04}s`,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export default function Preloader({ onComplete }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [hidden, setHidden] = useState(false);
  const doneRef = useRef(false);

  const handleWordDone = () => {
    if (doneRef.current) return;
    if (wordIndex < WORDS.length - 1) {
      setWordIndex((i) => i + 1);
    } else {
      doneRef.current = true;
      setVisible(false);
      setTimeout(() => {
        setHidden(true);
        if (onComplete) onComplete();
      }, 300);
    }
  };

  if (hidden) return null;

  return (
    <>
      <style>{`
        @keyframes riseUpFade {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .preloader-char {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      <div
        id="custom-preloader"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "#000",
          color: "#fff",
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 999999,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s ease",
          pointerEvents: visible ? "all" : "none",
          fontFamily: "'General Sans', 'Clash Display', sans-serif",
          letterSpacing: "-0.03em",
        }}
      >
        <span id="custom-preloader-text">
          <AnimatedWord
            key={wordIndex}
            word={WORDS[wordIndex]}
            onDone={handleWordDone}
          />
        </span>
      </div>
    </>
  );
}
