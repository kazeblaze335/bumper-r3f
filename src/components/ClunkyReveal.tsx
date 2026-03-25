"use client";

import { motion } from "framer-motion";

export default function ClunkyReveal({
  text,
  delay = 0,
  className = "",
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const chars = text.split("");
  const totalChars = chars.length;

  return (
    <div
      style={{ perspective: "1200px" }}
      className={`flex overflow-visible ${className}`}
    >
      {chars.map((char, index) => {
        const reverseIndex = totalChars - 1 - index;
        return (
          <motion.span
            key={index}
            // Simple initial/animate states. No complex scroll hijacking.
            initial={{ y: "100%", rotateX: 130, opacity: 0 }}
            animate={{ y: "0%", rotateX: 0, opacity: 1 }}
            transition={{
              duration: 1.2,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + reverseIndex * 0.08,
            }}
            style={{
              display: "inline-block",
              transformOrigin: "50% 100%",
              willChange: "transform, opacity, rotateX",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        );
      })}
    </div>
  );
}
