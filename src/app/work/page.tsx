"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTransitionRouter } from "next-view-transitions";
import { triggerPaperPushTransition } from "@/utils/animations";
import DistortedImage from "@/components/webgl/DistortedImage";

import Navbar from "@/components/ui/NavBar";
import Footer from "@/components/ui/Footer";
import FilmGrain from "@/components/ui/FilmGrain";
import StickyHeroReveal from "@/components/sections/StickyHeroReveal";

const PROJECTS = [
  {
    name: "Native Instruments",
    location: "Berlin / 2023",
    src: "/images/project-1.jpg",
    slug: "native-instruments",
    role: "Lead Agency",
    id: "01",
  },
  {
    name: "Oura",
    location: "Oulu / 2023",
    src: "/images/project-2.jpg",
    slug: "oura",
    role: "Digital Partner",
    id: "02",
  },
  {
    name: "Hender Scheme",
    location: "Tokyo / 2023",
    src: "/images/project-3.jpg",
    slug: "hender-scheme",
    role: "Creative Direction",
    id: "03",
  },
  {
    name: "B&O Play",
    location: "Struer / 2022",
    src: "/images/project-4.jpg",
    slug: "bo-play",
    role: "Interactive Design",
    id: "04",
  },
  {
    name: "Nothing",
    location: "London / 2022",
    src: "/images/project-5.jpg",
    slug: "nothing",
    role: "Technical Partner",
    id: "05",
  },
  {
    name: "Gentle Monster",
    location: "Seoul / 2022",
    src: "/images/project-6.jpg",
    slug: "gentle-monster",
    role: "Lead Agency",
    id: "06",
  },
  {
    name: "Puma POV",
    location: "Global / 2021",
    src: "/images/project-7.jpg",
    slug: "puma-pov",
    role: "Creative Design",
    id: "07",
  },
  {
    name: "Jaarvis Noir",
    location: "Paris / 2021",
    src: "/images/project-8.jpg",
    slug: "jaarvis",
    role: "Event",
    id: "08",
  },
];

export default function WorkGallery() {
  const [footerHeight, setFooterHeight] = useState(0);
  const footerRef = useRef<HTMLDivElement>(null);
  const router = useTransitionRouter();

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleProjectClick = (e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    router.push(`/work/${slug}`, {
      onTransitionReady: () => triggerPaperPushTransition(),
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setFooterHeight(entry.contentRect.height);
      }
    });
    if (footerRef.current) resizeObserver.observe(footerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const isCinematicMode = hoveredIndex !== null;
  const activeProjectSrc = isCinematicMode ? PROJECTS[hoveredIndex].src : null;

  return (
    <>
      <FilmGrain />
      <main className="relative min-h-screen text-zinc-900 dark:text-zinc-100 overflow-clip">
        <Navbar />

        {/* THE SINGLETON WEBGL INJECTION */}
        {/* We only render ONE WebGL element for the entire page to save memory. 
            It sits dead-center in the GlobalCanvas. */}
        {activeProjectSrc && (
          <DistortedImage src={activeProjectSrc} active={true} />
        )}

        <div
          className="relative z-10"
          style={{ marginBottom: `${footerHeight}px` }}
        >
          <StickyHeroReveal
            title="ARCHIVE"
            showTrademark={false}
            subtitle="Selected Works"
          />

          <div
            className={`relative z-10 pt-24 pb-32 transition-colors duration-1000 shadow-[0_-20px_50px_rgba(0,0,0,0.3)]
              ${isCinematicMode ? "bg-zinc-100/10 dark:bg-zinc-950/20 backdrop-blur-md" : "bg-zinc-100 dark:bg-zinc-950"}
            `}
          >
            <div className="px-6 md:px-12 max-w-[1800px] mx-auto">
              {/* THE HAUTE PROTOTYPE GRID */}
              {/* Dense 2-col mobile, 3-col tablet, 4-col desktop layout with strict borders */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-16 md:gap-x-8 md:gap-y-24">
                {PROJECTS.map((project, index) => {
                  const isHovered = hoveredIndex === index;
                  const isOtherHovered = isCinematicMode && !isHovered;

                  return (
                    <div
                      key={project.slug}
                      className="flex flex-col group"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <a
                        href={`/work/${project.slug}`}
                        onClick={(e) => handleProjectClick(e, project.slug)}
                        className={`w-full cursor-pointer transition-opacity duration-700 ${isOtherHovered ? "opacity-10" : "opacity-100"}`}
                      >
                        {/* Smaller, stark 3:4 aspect ratio thumbnails */}
                        <div
                          className={`relative w-full aspect-[3/4] overflow-hidden bg-zinc-200 dark:bg-zinc-900 mb-4 transition-transform duration-700 ${isHovered ? "scale-[0.98]" : "scale-100"}`}
                        >
                          <Image
                            src={project.src}
                            alt={project.name}
                            fill
                            className={`object-cover transition-all duration-700 grayscale group-hover:grayscale-0 ${isHovered ? "opacity-0" : "opacity-100"}`}
                          />
                        </div>

                        {/* Minimalist, monospaced metadata */}
                        <div className="flex justify-between items-start border-t border-zinc-200 dark:border-zinc-800 pt-3">
                          <div className="flex flex-col gap-1">
                            <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-zinc-400">
                              Index — {project.id}
                            </span>
                            <h2 className="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                              {project.name}
                            </h2>
                          </div>
                          <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-zinc-400 text-right mt-[18px]">
                            {project.role}
                          </span>
                        </div>
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div
          ref={footerRef}
          className="fixed bottom-0 left-0 w-full z-0 pointer-events-none"
        >
          <div className="pointer-events-auto">
            <Footer />
          </div>
        </div>
      </main>
    </>
  );
}
