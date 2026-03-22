"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTransitionRouter } from "next-view-transitions";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const PROJECTS = [
  {
    name: "Native Instruments",
    services: "Visual Identity, Digital Flow",
    location: "Berlin / 2023",
    src: "/images/project-1.jpg",
    slug: "native-instruments",
    details:
      "A complete overhaul of the digital ecosystem for the premier music production brand, focusing on immersive spatial audio interfaces and seamless e-commerce integration.",
    role: "Lead Agency",
    year: "2023",
  },
  {
    name: "Oura",
    services: "Creative Direction, Product",
    location: "Oulu / 2023",
    src: "/images/project-2.jpg",
    slug: "oura",
    details:
      "Defining the visual language and interaction model for the next generation of wearable health technology, balancing clinical accuracy with premium lifestyle aesthetics.",
    role: "Digital Partner",
    year: "2023",
  },
  {
    name: "Hender Scheme",
    services: "Branding, Interior Design",
    location: "Tokyo / 2023",
    src: "/images/project-3.jpg",
    slug: "hender-scheme",
    details:
      "Translating the artisanal leather craftsmanship of the iconic Tokyo brand into a digital environment, utilizing tactile micro-interactions and organic motion curves.",
    role: "Creative Direction",
    year: "2023",
  },
  {
    name: "B&O Play",
    services: "Art Direction, Visuals",
    location: "Struer / 2022",
    src: "/images/project-4.jpg",
    slug: "bo-play",
    details:
      "An experimental web experience showcasing the acoustic engineering behind the portable audio line, utilizing real-time WebGL audio visualizers.",
    role: "Interactive Design",
    year: "2022",
  },
  {
    name: "Nothing",
    services: "Spatial Depth, Experience",
    location: "London / 2022",
    src: "/images/project-5.jpg",
    slug: "nothing",
    details:
      "A transparent, brutalist approach to product storytelling. We developed a custom rendering pipeline to showcase the internal components of the Ear (1) in real-time 3D.",
    role: "Technical Partner",
    year: "2022",
  },
  {
    name: "Gentle Monster",
    services: "Creative Concept, Experience",
    location: "Seoul / 2022",
    src: "/images/project-6.jpg",
    slug: "gentle-monster",
    details:
      "An avant-garde digital showroom that mirrors the surreal physical retail spaces of the eyewear brand, bending the rules of standard e-commerce navigation.",
    role: "Lead Agency",
    year: "2022",
  },
];

// =======================================================
// THE WAAPI PAGE ANIMATION
// =======================================================
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

// =======================================================
// LIGHTWEIGHT TV STATIC GLITCH
// Uses a raw SVG noise data URI and pure CSS animation for 60fps performance
// =======================================================
const TVStaticGlitch = () => {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes randomGlitch {
          0%, 95% { opacity: 0; transform: translate(0, 0) scale(1); filter: contrast(1) brightness(1); }
          96% { opacity: 0.6; transform: translate(-2%, 2%) scale(1.05); filter: contrast(1.5) brightness(1.2); }
          97% { opacity: 0.4; transform: translate(2%, -2%) scale(1.02); filter: contrast(1.2) brightness(0.8); }
          98% { opacity: 0.8; transform: translate(-1%, -1%) scale(1.04); filter: contrast(1.8) brightness(1.5); }
          99%, 100% { opacity: 0; transform: translate(0, 0) scale(1); filter: contrast(1) brightness(1); }
        }
        .static-noise-layer {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          animation: randomGlitch 4s infinite linear;
          mix-blend-mode: overlay;
        }
      `,
        }}
      />
      <div className="absolute inset-0 z-20 pointer-events-none static-noise-layer opacity-0" />
      {/* Permanent subtle grain overlay to tie it together */}
      <div
        className="absolute inset-0 z-10 pointer-events-none opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </>
  );
};

export default function HeroProjects() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const handleRowClick = (slug: string) => {
    setOpenSlug(openSlug === slug ? null : slug);
  };

  return (
    <div className="relative w-full flex flex-col transition-colors duration-500">
      <div className="border-b border-zinc-200 dark:border-zinc-800 pb-2 mb-2 flex justify-between items-end uppercase text-xs font-bold tracking-[0.2em] text-zinc-400 dark:text-zinc-500 transition-colors duration-500">
        <div className="w-[45%]">Project Name</div>
        <div className="w-[30%] hidden md:block">Services</div>
        <div className="w-[25%] hidden md:block text-right">Location</div>
      </div>

      <div className="relative z-10 w-full pointer-events-auto">
        {PROJECTS.map((project) => (
          <ProjectRow
            key={project.slug}
            project={project}
            isOpen={openSlug === project.slug}
            onToggle={() => handleRowClick(project.slug)}
          />
        ))}
      </div>
    </div>
  );
}

function ProjectRow({
  project,
  isOpen,
  onToggle,
}: {
  project: (typeof PROJECTS)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const router = useTransitionRouter();
  const pathname = usePathname();

  const handleNavigation =
    (path: string) =>
    (e: React.MouseEvent<HTMLDivElement | HTMLAnchorElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (pathname === path) return;
      router.push(path, { onTransitionReady: pageAnimation });
    };

  return (
    <div
      className="relative w-full cursor-pointer group border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-500"
      onClick={onToggle}
    >
      <div className="relative z-10 flex justify-between items-center py-6">
        <div className="w-full md:w-[45%]">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-500 dark:group-hover:text-zinc-400 transition-colors duration-300">
            {project.name}
          </h1>
        </div>
        <div className="w-[30%] hidden md:block uppercase text-xs font-bold tracking-[0.2em] text-zinc-500 dark:text-zinc-500 group-hover:text-zinc-400 transition-colors duration-300">
          {project.services}
        </div>
        <div className="w-[25%] hidden md:block text-right uppercase text-xs font-bold tracking-[0.2em] text-zinc-500 dark:text-zinc-500 group-hover:text-zinc-400 transition-colors duration-300">
          {project.location}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-12 pt-4 flex flex-col md:flex-row gap-8 items-stretch">
              {/* 16:9 IMAGE CONTAINER WITH TV STATIC */}
              <div
                className="relative w-full md:w-[45%] aspect-video rounded-lg overflow-hidden bg-zinc-900 transition-colors duration-500 cursor-pointer group/glitch"
                onClick={handleNavigation(`/work/${project.slug}`)}
              >
                <Image
                  src={project.src}
                  alt={project.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover/glitch:scale-105 filter grayscale hover:grayscale-0"
                  decoding="async"
                />
                <TVStaticGlitch />
              </div>

              {/* TEXT CONTENT */}
              <div className="w-full md:w-[55%] flex flex-col justify-between md:pl-8 md:border-l border-zinc-200 dark:border-zinc-800 transition-colors duration-500">
                <div className="flex gap-16 mb-8 md:mb-0">
                  <div>
                    <div className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 mb-2">
                      Role
                    </div>
                    <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      {project.role}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 mb-2">
                      Year
                    </div>
                    <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      {project.year}
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-lg md:text-2xl leading-relaxed text-zinc-900 dark:text-zinc-300 font-medium max-w-xl mb-8">
                    {project.details}
                  </p>
                  <Link
                    href={`/work/${project.slug}`}
                    className="inline-block border-b border-zinc-900 dark:border-zinc-100 pb-1 text-xs font-bold tracking-[0.2em] uppercase text-zinc-900 dark:text-zinc-100 hover:opacity-50 transition-opacity"
                    onClick={handleNavigation(`/work/${project.slug}`)}
                  >
                    View Case Study
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
