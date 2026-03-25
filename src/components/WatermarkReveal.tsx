"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function WatermarkReveal({
  onReveal,
  isRevealed,
}: {
  onReveal: () => void;
  isRevealed: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // High stiffness, low damping for a tight, responsive cursor bind
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || isRevealed) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    // Calculate distance from center to create the parallax tilt
    const x = (e.clientX - left - width / 2) * 0.15;
    const y = (e.clientY - top - height / 2) * 0.15;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      // The magic cursor states!
      className={`fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-hidden transition-colors duration-1000 ${
        isRevealed
          ? "pointer-events-none bg-transparent"
          : "cursor-grab active:cursor-grabbing bg-zinc-950"
      }`}
      onPointerDown={() => {
        if (!isRevealed) onReveal();
      }}
    >
      {/* The SVG Grain Filter
        This is a much tighter, higher-frequency noise than the global film grain 
      */}
      <svg className="hidden">
        <filter id="tight-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.1 0"
          />
        </filter>
      </svg>

      <motion.div
        animate={{
          // When grabbed, it scales massively to fill/clear the screen and fades out
          scale: isRevealed ? 80 : 1,
          opacity: isRevealed ? 0 : 1,
        }}
        transition={{
          duration: 1.4,
          ease: [0.85, 0, 0.15, 1], // Cinematic, heavy exponential ease
        }}
        style={{
          x: springX,
          y: springY,
        }}
        className="relative flex items-center justify-center will-change-transform"
      >
        <h1
          className="text-[20vw] font-bold tracking-tighter uppercase leading-none select-none"
          style={{
            fontFamily: "PPNeueMontreal-Bold, sans-serif",
            // The Embossed CSS Magic
            color: "rgba(24, 24, 27, 0.4)", // Base dark zinc color
            textShadow:
              "1px 1px 2px rgba(255, 255, 255, 0.15), -1px -1px 2px rgba(0, 0, 0, 0.8)",
            mixBlendMode: "hard-light",
            filter: "url(#tight-grain)",
          }}
        >
          SOJU
        </h1>
      </motion.div>

      {/* Helper instruction that fades out on click */}
      <motion.div
        animate={{ opacity: isRevealed ? 0 : 0.5 }}
        transition={{ duration: 0.5 }}
        className="absolute bottom-12 text-xs font-bold tracking-[0.4em] uppercase text-zinc-400 select-none"
      >
        Grab to Reveal
      </motion.div>
    </div>
  );
}
