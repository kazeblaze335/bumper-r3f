"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

interface OptimizedVideoProps {
  src: string;
  className?: string;
  poster?: string;
  delay?: number;
}

export default function OptimizedVideo({
  src,
  className = "",
  poster,
  delay = 0,
}: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Only trigger the video play when 10% of it is actually in the viewport
  const isInView = useInView(containerRef, {
    margin: "0px 0px -10% 0px",
    once: false,
  });

  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        // Play returns a promise that can reject if the browser blocks it (e.g., low power mode)
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isInView]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
      whileInView={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1], delay }}
      className={`relative overflow-hidden bg-zinc-200 dark:bg-zinc-900 ${className}`}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        playsInline
        muted
        loop
        preload="metadata" // Prevents downloading the whole file until intersected
        className="absolute inset-0 w-full h-full object-cover scale-[1.02]" // Slight scale to hide edge artifacts
      />
    </motion.div>
  );
}
