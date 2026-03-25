"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import localFont from "next/font/local";
import { usePathname } from "next/navigation";
import ClunkyReveal from "./ClunkyReveal";

const neueMontreal = localFont({
  src: "../../public/fonts/PPNeueMontreal-Bold.otf",
  variable: "--font-neue",
});

interface StickyHeroRevealProps {
  scrollYProgress: MotionValue<number>;
  title?: string; // NEW: Allow dynamic titles
  showTrademark?: boolean; // NEW: Toggle the icon
}

export default function StickyHeroReveal({
  scrollYProgress,
  title = "SOJU",
  showTrademark = true,
}: StickyHeroRevealProps) {
  const pathname = usePathname();

  const sojuScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const sojuOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const sojuY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div className="h-screen w-full sticky top-0 flex flex-col items-center justify-center overflow-hidden bg-zinc-200 dark:bg-zinc-900 transition-colors duration-500 z-0">
      <motion.div
        style={{ scale: sojuScale, opacity: sojuOpacity, y: sojuY }}
        className={`flex items-start text-[22vw] leading-[0.75] tracking-tighter uppercase text-zinc-900 dark:text-zinc-100 ${neueMontreal.className}`}
      >
        {/* Dynamic Title Injection */}
        <ClunkyReveal key={`text-${pathname}`} text={title} delay={0.2} />

        {/* The Flourish Flip for the Trademark */}
        {showTrademark && (
          <motion.span
            key={`tm-${pathname}`}
            // Added rotateY: -180 to create a 3D coin flip effect
            initial={{ opacity: 0, scale: 0, rotateY: -180, rotateZ: -45 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0, rotateZ: 0 }}
            transition={{
              delay: 1.0,
              type: "spring",
              stiffness: 150,
              damping: 12,
            }}
            className="text-[8vw] align-top relative top-4 ml-2 inline-block transform-style-3d"
          >
            ®
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}
