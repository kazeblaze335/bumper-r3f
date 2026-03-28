"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { triggerPaperPushTransition } from "@/utils/animations";

// 1. Explicitly type as 'Variants' from framer-motion
const heightAnim: Variants = {
  initial: { height: "0vh" },
  enter: (i: number) => ({
    height: "100vh",
    transition: { duration: 0.5, delay: 0.05 * i, ease: [0.76, 0, 0.24, 1] },
  }),
  exit: (i: number) => ({
    height: "0vh",
    transition: { duration: 0.5, delay: 0.05 * i, ease: [0.76, 0, 0.24, 1] },
  }),
};

// 2. Explicitly type as 'Variants'
// 2. Explicitly type as 'Variants'
const charAnim: Variants = {
  initial: { y: "100%" },
  enter: (i: number) => ({
    y: "0%",
    transition: {
      duration: 0.8,
      delay: 0.4 + i * 0.02,
      ease: [0.76, 0, 0.24, 1],
    },
  }),
  exit: (i: number) => ({
    y: "-100%", // <-- FIX: Changed from 100% to -100% so it shoots UP!
    opacity: 0, // <-- Added a quick fade to make it vanish instantly
    transition: { duration: 0.3, delay: i * 0.01, ease: [0.76, 0, 0.24, 1] },
  }),
};

// 3. Explicitly type as 'Variants'
const opacityAnim: Variants = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.5, delay: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const NAV_LINKS = [
  { title: "Home", href: "/" },
  { title: "Projects", href: "/work" },
  { title: "Agency", href: "/about" },
];

export default function StairsMenu({
  isOpen,
  closeMenu,
}: {
  isOpen: boolean;
  closeMenu: () => void;
}) {
  const router = useTransitionRouter();
  const pathname = usePathname();

  const handleNavigation =
    (path: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      if (pathname === path) {
        closeMenu();
        return;
      }
      closeMenu();
      // Wait for the menu to completely close before firing the cinematic 3D route push
      setTimeout(() => {
        router.push(path, {
          onTransitionReady: () => triggerPaperPushTransition(),
        });
      }, 600);
    };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="fixed inset-0 z-[100] pointer-events-none flex flex-col justify-between">
          {/* THE NEON STAIRS BACKGROUND */}
          <div className="absolute inset-0 flex z-0">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                custom={5 - i}
                variants={heightAnim}
                initial="initial"
                animate="enter"
                exit="exit"
                className="w-1/5 h-full bg-[#E4FF00]"
              />
            ))}
          </div>

          {/* CLOSE BUTTON */}
          <div className="relative z-10 w-full p-8 flex justify-end pointer-events-auto text-zinc-900">
            <motion.button
              variants={opacityAnim}
              initial="initial"
              animate="enter"
              exit="exit"
              onClick={closeMenu}
              className="group flex flex-col items-center justify-center w-20 h-20 md:w-24 md:h-24"
            >
              <span className="mb-2 text-xs font-bold tracking-[0.2em] uppercase leading-none hover:opacity-50 transition-opacity">
                Close
              </span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 68 68"
                fill="none"
                className="transform transition-transform group-hover:rotate-90 duration-500"
              >
                <path
                  d="M1.5 1.5L67 67"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  d="M66.5 1L0.999997 66.5"
                  stroke="currentColor"
                  strokeWidth="4"
                />
              </svg>
            </motion.button>
          </div>

          {/* THE POSH SPLIT TEXT LINKS */}
          <div className="relative z-10 flex flex-col items-center justify-center flex-1 pointer-events-auto text-zinc-900 gap-4">
            {NAV_LINKS.map((link, linkIndex) => {
              const staggerOffset = linkIndex * 5;

              return (
                <a
                  key={link.title}
                  href={link.href}
                  onClick={handleNavigation(link.href)}
                  className="group flex overflow-hidden py-2"
                >
                  {link.title.split("").map((char, charIndex) => (
                    <motion.span
                      key={charIndex}
                      custom={charIndex + staggerOffset}
                      variants={charAnim}
                      initial="initial"
                      animate="enter"
                      exit="exit"
                      className="text-6xl md:text-8xl font-bold tracking-tighter uppercase leading-none inline-block transition-all duration-300 group-hover:italic group-hover:opacity-60"
                      style={{ whiteSpace: char === " " ? "pre" : "normal" }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </a>
              );
            })}
          </div>

          {/* SOCIAL FOOTER */}
          <div className="relative z-10 w-full p-8 flex justify-center gap-8 pointer-events-auto text-zinc-900 font-bold tracking-[0.2em] uppercase text-xs">
            <motion.a
              variants={opacityAnim}
              initial="initial"
              animate="enter"
              exit="exit"
              href="#"
              className="hover:opacity-50 transition-opacity"
            >
              Instagram
            </motion.a>
            <motion.a
              variants={opacityAnim}
              initial="initial"
              animate="enter"
              exit="exit"
              href="#"
              className="hover:opacity-50 transition-opacity"
            >
              Twitter
            </motion.a>
            <motion.a
              variants={opacityAnim}
              initial="initial"
              animate="enter"
              exit="exit"
              href="#"
              className="hover:opacity-50 transition-opacity"
            >
              LinkedIn
            </motion.a>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
