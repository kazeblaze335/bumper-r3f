"use client";

import { motion, Variants } from "framer-motion";
import localFont from "next/font/local";

const nbInternational = localFont({
  src: "../../public/fonts/NBInternational-Regular.woff2",
  variable: "--font-nb",
});

interface SplitTextProps {
  text: string;
  delay?: number;
  className?: string;
}

export default function SplitText({
  text,
  delay = 0,
  className = "",
}: SplitTextProps) {
  const words = text.split(" ");

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {
      y: "130%", // Pushed from 100% to 130% to completely hide the massive text!
    },
    visible: {
      y: 0,
      transition: {
        duration: 1.0,
        ease: [0.83, 0, 0.17, 1],
      },
    },
  };

  return (
    <motion.div
      className={`flex flex-wrap justify-center gap-[0.25em] text-[10vw] md:text-[8vw] leading-[0.85] tracking-tight uppercase ${nbInternational.className} ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {words.map((word, index) => (
        <span key={index} className="inline-flex overflow-hidden pb-2 md:pb-4">
          <motion.span variants={wordVariants}>{word}</motion.span>
        </span>
      ))}
    </motion.div>
  );
}
