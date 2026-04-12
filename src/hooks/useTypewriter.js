import { useEffect, useState } from "react";

export default function useTypewriter(
  words,
  speed = 90,
  deleteSpeed = 50,
  pause = 1800
) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause);
        }
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length - 1 === 0) {
          setDeleting(false);
          setWordIndex((i) => (i + 1) % words.length);
        }
      }
    }, deleting ? deleteSpeed : speed);

    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, speed, deleteSpeed, pause]);

  return text;
}
