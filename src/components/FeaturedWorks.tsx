"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import Link from "next/link";
import { useTransitionRouter } from "next-view-transitions";

const FEATURED = [
  {
    client: "Puma POV",
    name: "Breathing Video",
    tag: "Creative Design",
    src: "/images/project-1.jpg",
    slug: "puma-pov",
  },
  {
    client: "Jaarvis",
    name: "Jaarvis Noir",
    tag: "Event",
    src: "/images/project-2.jpg",
    slug: "jaarvis",
  },
  {
    client: "Puma",
    name: "DPSC x Puma",
    tag: "Creative Concept",
    src: "/images/project-3.jpg",
    slug: "dpsc-puma",
  },
  {
    client: "Grid",
    name: "Grid 7 Years",
    tag: "Art Direction",
    src: "/images/project-4.jpg",
    slug: "grid-7-years",
  },
  {
    client: "Puma",
    name: "Music Battle",
    tag: "Direction",
    src: "/images/project-5.jpg",
    slug: "puma-music",
  },
  {
    client: "Native",
    name: "Digital Flow",
    tag: "Interface",
    src: "/images/project-6.jpg",
    slug: "native-instruments",
  },
];

const pageAnimation = () => {
  document.documentElement.animate(
    [
      { scale: 1, transform: "translateY(0%)", rotate: "0deg", opacity: 1 },
      {
        scale: 1.2,
        transform: "translateY(-10%)",
        rotate: "-5deg",
        opacity: 0,
      },
    ],
    {
      duration: 800,
      easing: "cubic-bezier(0.9, 0, 0.1, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-old(root)",
    },
  );

  document.documentElement.animate(
    [{ transform: "translateY(100%)" }, { transform: "translateY(0%)" }],
    {
      duration: 800,
      easing: "cubic-bezier(0.9, 0, 0.1, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-new(root)",
    },
  );
};

const maskVariants = {
  hiddenBottom: { clipPath: "polygon(50% 100%, 50% 100%, 50% 100%, 50% 100%)" },
  visible: { clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" },
  hiddenTop: { clipPath: "polygon(50% 0%, 50% 0%, 50% 0%, 50% 0%)" },
};

// =======================================================
// ARTIFACT FIX
// Switched from 'top' to 'y' translation for perfect sub-pixel rendering.
// Added a wrapping span to ensure line-heights calculate flawlessly.
// =======================================================
const MaskText = ({
  children,
  align = "left",
  className = "",
}: {
  children: React.ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
}) => {
  const alignClass =
    align === "center"
      ? "justify-center text-center"
      : align === "right"
        ? "justify-end text-right"
        : "justify-start text-left";
  return (
    <div
      className={`relative w-full h-full overflow-hidden flex flex-col ${alignClass} ${className}`}
    >
      <motion.div
        variants={{ initial: { y: "0%" }, hover: { y: "-100%" } }}
        transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
        className="absolute inset-0 flex items-center w-full text-zinc-400 dark:text-zinc-600 transition-colors duration-500"
      >
        <span className={`w-full ${alignClass}`}>{children}</span>
      </motion.div>
      <motion.div
        variants={{ initial: { y: "100%" }, hover: { y: "0%" } }}
        transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
        className="absolute inset-0 flex items-center w-full text-zinc-900 dark:text-zinc-100 transition-colors duration-500"
      >
        <span className={`w-full ${alignClass}`}>{children}</span>
      </motion.div>
    </div>
  );
};

export default function FeaturedWorks() {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const floatingImageRef = useRef<HTMLDivElement>(null);
  const trailingImageRef = useRef<HTMLDivElement>(null);
  const diagonalRulesRef = useRef<(HTMLDivElement | null)[]>([]);
  const router = useTransitionRouter();

  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);

  const cursorX = useSpring(targetX, { damping: 25, stiffness: 80, mass: 1 });
  const cursorY = useSpring(targetY, { damping: 25, stiffness: 80, mass: 1 });

  useEffect(() => {
    const unsubX = cursorX.on("change", (latestX) => {
      if (floatingImageRef.current) {
        floatingImageRef.current.style.transform = `translate3d(${latestX}px, ${cursorY.get()}px, 0)`;
      }
      if (trailingImageRef.current) {
        trailingImageRef.current.style.transform = `translate3d(${latestX + 15}px, ${cursorY.get() + 15}px, 0)`;
      }
      diagonalRulesRef.current.forEach((rule) => {
        if (rule) {
          rule.style.transform = `translate3d(${latestX * 0.15}px, -50%, 0) rotate(35deg)`;
        }
      });
    });

    const unsubY = cursorY.on("change", (latestY) => {
      if (floatingImageRef.current) {
        floatingImageRef.current.style.transform = `translate3d(${cursorX.get()}px, ${latestY}px, 0)`;
      }
    });

    return () => {
      unsubX();
      unsubY();
    };
  }, [cursorX, cursorY]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || window.innerWidth < 768) return;
    const rect = containerRef.current.getBoundingClientRect();
    targetX.set(e.clientX - rect.left - 137);
    targetY.set(e.clientY - rect.top - 187);
  };

  const handleMouseEnterRow = (index: number) => {
    if (activeProject !== index && window.innerWidth >= 768) {
      setActiveProject(index);
    }
  };

  const handleNavigation =
    (path: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      router.push(path, { onTransitionReady: pageAnimation });
    };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => targetY.set(targetY.get())}
      onMouseLeave={() => setActiveProject(null)}
      className="relative w-full py-0 md:py-12 group/menu"
    >
      {/* =======================================================
          THE SVG LIQUID DISPLACEMENT ENGINE
          ======================================================= */}
      <svg className="hidden">
        <filter id="squishy-water">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.015"
            numOctaves="3"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="15"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <div className="flex flex-col w-full relative z-10 max-w-7xl mx-auto">
        {FEATURED.map((project, index) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            onClick={handleNavigation(`/work/${project.slug}`)}
            // =======================================================
            // CROPPING FIX
            // Height expanded to h-[120px] to give the text room.
            // =======================================================
            className="w-full h-[80px] md:h-[120px] block cursor-pointer group/item border-b md:border-b-0 border-zinc-200 dark:border-zinc-800 relative z-10"
          >
            <motion.div
              initial="initial"
              whileHover="hover"
              onMouseEnter={() => handleMouseEnterRow(index)}
              className="hidden md:flex w-full h-full justify-between items-center relative px-12"
            >
              {/* THE TURQUOISE BRAND ACCENT */}
              <div
                ref={(el) => {
                  if (el) diagonalRulesRef.current[index] = el;
                }}
                className="absolute top-1/2 left-0 h-[1px] w-[50%] bg-[#00E5FF] opacity-0 group-hover/menu:opacity-100 will-change-transform z-20"
              />

              <MaskText
                align="left"
                className="flex-[0.5] text-[12px] font-bold tracking-[0.2em] uppercase"
              >
                {project.client}
              </MaskText>

              {/* Reset leading to 'none' to stop the clipping box */}
              <MaskText
                align="center"
                className="flex-[4] text-[60px] md:text-[80px] font-bold tracking-tighter uppercase leading-none pb-2"
              >
                {project.name}
              </MaskText>

              <MaskText
                align="right"
                className="flex-[0.5] text-[12px] font-bold tracking-[0.2em] uppercase"
              >
                {project.tag}
              </MaskText>
            </motion.div>
          </Link>
        ))}
      </div>

      <div
        ref={floatingImageRef}
        className="hidden md:block pointer-events-none absolute top-0 left-0 z-0 will-change-transform"
      >
        <div className="relative w-[275px] h-[375px]">
          <div className="absolute inset-0">
            {FEATURED.map((proj, i) => {
              const isActive = activeProject === i;

              return (
                <motion.div
                  key={`img1-${i}`}
                  className="absolute inset-0 bg-zinc-900 overflow-hidden"
                  variants={maskVariants}
                  initial="hiddenBottom"
                  animate={isActive ? "visible" : "hiddenBottom"}
                  transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                  style={{ zIndex: isActive ? 20 : 1, willChange: "clip-path" }}
                >
                  <img
                    src={proj.src}
                    alt={proj.name}
                    className="w-full h-full object-cover scale-[1.3] filter grayscale"
                    decoding="async"
                  />
                  <div className="absolute -inset-x-20 top-0 h-full w-[40%] bg-white/40 blur-xl opacity-0 group-hover/item:animate-[diagonalShine_0.6s_ease-out_forwards] -skew-x-35 pointer-events-none z-10" />
                </motion.div>
              );
            })}
          </div>

          {/* =======================================================
              THE SQUISHY WATER SHADOW
              Applied the SVG filter directly to the trailing shadow!
              ======================================================= */}
          <div
            ref={trailingImageRef}
            className="absolute inset-0 bg-[#00E5FF] geo-layer opacity-40 will-change-transform z-10"
            style={{
              clipPath: maskVariants.visible.clipPath,
              transform: "scale(1.1)",
              filter: "url(#squishy-water) blur(4px)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
