"use client";

import { motion } from "framer-motion";

export default function SplitText({
  text,
  delay = 0,
  playOnce = true,
}: {
  text: string;
  delay?: number;
  playOnce?: boolean;
}) {
  const words = text.split(" ");

  return (
    <div className="flex flex-wrap gap-x-[0.25em] overflow-hidden">
      {words.map((word, i) => (
        <motion.div
          key={i}
          initial={{ y: "110%", rotate: 8 }}
          whileInView={{ y: "0%", rotate: 0 }}
          viewport={{ once: playOnce }}
          // =======================================================
          // THE "THUNK" SPRING
          // High mass + slight under-damping = heavy, satisfying pop!
          // =======================================================
          transition={{
            type: "spring",
            stiffness: 220,
            damping: 14,
            mass: 1.2,
            delay: delay + i * 0.04,
          }}
          className="origin-bottom-left"
        >
          {word}
        </motion.div>
      ))}
    </div>
  );
}
