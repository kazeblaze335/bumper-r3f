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
// Exactly matches FeaturedWorks for a seamless loop!
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

export default function HeroProjects() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const handleRowClick = (slug: string) => {
    setOpenSlug(openSlug === slug ? null : slug);
  };

  return (
    <div className="relative w-full flex flex-col transition-colors duration-500">
      {/* Table Headers */}
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
      {/* Collased Row State */}
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

      {/* Expanded State (The Visual Update) */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            className="overflow-hidden"
          >
            {/* Swapped layout: Text list on Left, big image on Right */}
            <div className="pb-12 pt-4 flex flex-col md:flex-row gap-12 items-stretch">
              {/* LEFT COLUMN: The Metadata List (Inspired by Screenshot) */}
              <div className="w-full md:w-[35%] flex flex-col justify-between py-6">
                <div className="flex flex-col gap-8">
                  <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 font-medium max-w-sm transition-colors duration-500">
                    {project.details}
                  </p>

                  {/* Detailed metadata list */}
                  <div className="flex flex-col gap-4 text-sm font-medium">
                    <div className="flex justify-between items-center">
                      <span className="text-xs uppercase tracking-[0.2em] text-zinc-400">
                        Role
                      </span>{" "}
                      <span className="text-zinc-900 dark:text-zinc-100 transition-colors duration-500">
                        {project.role}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs uppercase tracking-[0.2em] text-zinc-400">
                        Services
                      </span>{" "}
                      <span className="text-zinc-900 dark:text-zinc-100 transition-colors duration-500">
                        {project.services}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs uppercase tracking-[0.2em] text-zinc-400">
                        Year
                      </span>{" "}
                      <span className="text-zinc-900 dark:text-zinc-100 transition-colors duration-500">
                        {project.year}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Case Study Link (Alternative backup) */}
                <div className="mt-12">
                  <Link
                    href={`/work/${project.slug}`}
                    className="inline-block border-b border-zinc-900 dark:border-zinc-100 pb-1 text-xs font-bold tracking-[0.2em] uppercase text-zinc-900 dark:text-zinc-100 hover:opacity-50 transition-opacity transition-colors duration-500"
                    onClick={handleNavigation(`/work/${project.slug}`)}
                  >
                    View Case Study
                  </Link>
                </div>
              </div>

              {/* RIGHT COLUMN: The Large Portrait Image (Inspired by Screenshot) */}
              <div
                // Removed 16:9 aspect-video. Applied portrait aspect-square or aspect-[2/3].
                className="relative w-full md:w-[65%] aspect-[2/3] md:aspect-[3/4] flex-grow rounded-lg overflow-hidden cursor-pointer group/case bg-zinc-900 shadow-2xl transition-colors duration-500"
                onClick={handleNavigation(`/work/${project.slug}`)}
              >
                {/* Keep Grayscale -> Color hover logic */}
                <Image
                  src={project.src}
                  alt={project.name}
                  fill
                  className="object-cover transition-all duration-700 group-hover/case:scale-105 filter grayscale group-hover/case:grayscale-0"
                  decoding="async"
                />

                {/* OVERLAY ELEMENTS BASED ON SCREENSHOT */}

                {/* 1. Gradient Overlay (for text readability) */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent pointer-events-none z-10" />

                {/* 2. Text Overlay (Bottom Left) */}
                <div className="absolute bottom-8 left-8 flex flex-col gap-1 text-white z-20 pointer-events-none">
                  <span className="text-3xl md:text-4xl font-bold uppercase tracking-tight leading-none mb-1">
                    {project.name}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] opacity-80">
                    {project.location}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
