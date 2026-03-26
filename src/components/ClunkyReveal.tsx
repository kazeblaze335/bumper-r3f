"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

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

  const pathname = usePathname();
  const controls = useAnimation();

  useEffect(() => {
    // 1. Instantly force the text into the floor on mount
    controls.set("hidden");

    // 2. We convert your delay prop into a hard JavaScript timeout.
    // This explicitly prevents Framer Motion from running the animation in the background
    // during Next.js View Transitions.
    const timer = setTimeout(
      () => {
        controls.start("visible");
      },
      delay * 1000 + 100,
    ); // Added a tiny 100ms buffer for the page transition

    return () => clearTimeout(timer);
  }, [pathname, controls, delay]);

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
            // Let the useAnimation controls dictate the state
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { y: "100%", rotateX: 130, opacity: 0 },
              visible: {
                y: "0%",
                rotateX: 0,
                opacity: 1,
                transition: {
                  duration: 1.2,
                  ease: [0.16, 1, 0.3, 1],
                  // Stagger is calculated here, but the main delay is handled by the timeout!
                  delay: reverseIndex * 0.08,
                },
              },
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
