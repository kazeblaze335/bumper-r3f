"use client";

import { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function InteractiveVideoBlock({
  src,
  poster,
}: {
  src: string;
  poster: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [playing, setPlaying] = useState(false);

  // NEW: Track if the user has touched the video block yet
  const [hasInteracted, setHasInteracted] = useState(false);

  const cursorX = useSpring(0, { stiffness: 300, damping: 20 });
  const cursorY = useSpring(0, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    // As soon as the mouse moves, we break the CSS centering and let the Spring take over
    setHasInteracted(true);

    const rect = containerRef.current.getBoundingClientRect();
    cursorX.set(e.clientX - rect.left);
    cursorY.set(e.clientY - rect.top);
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setPlaying(!playing);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    togglePlayPause();
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      className="relative w-full aspect-video rounded-sm overflow-hidden bg-zinc-900 shadow-2xl cursor-none group"
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        playsInline
        muted
        loop
        className={`absolute inset-0 w-full h-full object-cover scale-[1.02] opacity-80 ${playing ? "grayscale-0" : "grayscale"}`}
      />

      <motion.div
        style={{
          // If they haven't moved the mouse, ignore the spring X/Y and center it
          x: hasInteracted ? cursorX : "-50%",
          y: hasInteracted ? cursorY : "-50%",
          left: hasInteracted ? 0 : "50%",
          top: hasInteracted ? 0 : "50%",
        }}
        animate={{
          // We show the cursor immediately if it hasn't been interacted with,
          // OR if they are actively hovering.
          scale: !hasInteracted || isHovered ? 1 : 0,
          opacity: !hasInteracted || isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none absolute flex items-center justify-center w-24 h-24 -ml-12 -mt-12 bg-zinc-100 text-zinc-900 rounded-full z-50 mix-blend-difference"
      >
        <span className="text-[10px] font-bold tracking-widest uppercase text-center leading-tight">
          {playing ? "Pause\nVideo" : "Play\nVideo"}
        </span>
      </motion.div>
    </div>
  );
}
