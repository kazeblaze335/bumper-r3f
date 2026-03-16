"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import WebGLOverlay from "@/components/WebGLOverlay";

interface ParallaxProps {
  src: string;
  alt: string;
  className?: string;
  showWebGL?: boolean; // Optional prop to toggle the 3D effect
}

export default function ParallaxImage({
  src,
  alt,
  className = "h-screen w-full",
  showWebGL = false,
}: ParallaxProps) {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"]);

  return (
    <div
      ref={container}
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-[150%] -top-[25%]"
      >
        <Image src={src} fill alt={alt} className="object-cover" priority />
      </motion.div>

      {/* Conditionally render the WebGL layer on top of the image */}
      {showWebGL && <WebGLOverlay />}
    </div>
  );
}
