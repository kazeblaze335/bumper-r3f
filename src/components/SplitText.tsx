"use client";

import { motion } from "framer-motion";

export default function SplitText({
  text,
  delay = 0,
  playOnce = true,
  className = "",
}: {
  text: string;
  delay?: number;
  playOnce?: boolean;
  className?: string;
}) {
  const words = text.split(" ");

  return (
    <motion.div
      // THE FIX: Trigger the view state on the un-rotated parent!
      initial="hidden"
      whileInView="visible"
      viewport={{ once: playOnce, margin: "-10%" }}
      variants={{
        visible: {
          transition: { staggerChildren: 0.04, delayChildren: delay },
        },
        hidden: {},
      }}
      className={`flex flex-wrap gap-x-[0.25em] gap-y-[0.1em] overflow-visible ${className}`}
      style={{ perspective: "1200px" }}
    >
      {words.map((word, wordIndex) => (
        <div key={wordIndex} className="flex overflow-visible">
          {word.split("").map((char, charIndex) => (
            <motion.div
              key={charIndex}
              // The children listen to the parent's "visible" and "hidden" commands
              variants={{
                hidden: { y: "100%", rotateX: 130, opacity: 0 },
                visible: {
                  y: "0%",
                  rotateX: 0,
                  opacity: 1,
                  transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              style={{
                display: "inline-block",
                transformOrigin: "50% 100%",
                willChange: "transform, opacity, rotateX",
              }}
            >
              {char}
            </motion.div>
          ))}
        </div>
      ))}
    </motion.div>
  );
}
