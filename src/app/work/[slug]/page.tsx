"use client";

import { useEffect, use } from "react";
import Image from "next/image";
import { create } from "zustand";
import { useTransitionRouter } from "next-view-transitions";
import { triggerPaperPushTransition } from "@/utils/animations"; // <-- Import utility

import ClunkyReveal from "@/components/motion/ClunkyReveal";
import FilmGrain from "@/components/ui/FilmGrain";
import HardwareParallax from "@/components/motion/HardwareParallax";

// Global Animation Culling State (Pauses Parallax during transition)
const useAnimationStore = create((set) => ({
  isPageAnimating: false,
  setAnimating: (value: boolean) => set({ isPageAnimating: value }),
}));

export default function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useTransitionRouter();
  const setAnimating = useAnimationStore((state: any) => state.setAnimating);
  const isPageAnimating = useAnimationStore(
    (state: any) => state.isPageAnimating,
  );

  const handleBackNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setAnimating(true); // Pause parallax

    // Trigger our custom transition helper!
    router.push("/work", {
      onTransitionReady: () =>
        triggerPaperPushTransition(() => setAnimating(false)),
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formattedTitle = slug.replace(/-/g, " ");

  return (
    <>
      <FilmGrain />
      <main className="relative bg-zinc-100 dark:bg-zinc-950 min-h-screen text-zinc-900 dark:text-zinc-100 pb-32 transition-colors duration-500 overflow-clip">
        <div
          className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-30 mix-blend-overlay geo-layer"
          style={{
            backgroundImage: `repeating-linear-gradient(35deg, rgba(161,161,170,0.1), rgba(161,161,170,0.1) 1px, transparent 1px, transparent 150px)`,
          }}
        />

        <div className="fixed top-0 left-0 w-full p-8 z-50 flex justify-between items-center mix-blend-difference text-zinc-100">
          <a
            href="/work"
            onClick={handleBackNavigation}
            className="text-sm font-bold tracking-[0.2em] uppercase hover:opacity-50 transition-opacity cursor-pointer"
          >
            Back to Work
          </a>
          <div className="text-sm font-bold tracking-[0.2em] uppercase">
            2023
          </div>
        </div>

        <div className="pt-40 px-8 md:px-16 mb-24 relative z-10">
          <h1 className="text-xs md:text-sm font-bold tracking-[0.4em] uppercase text-zinc-500 mb-8">
            Case Study
          </h1>
          <div className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter uppercase leading-[0.85] mb-12 max-w-5xl">
            <ClunkyReveal text={formattedTitle} delay={0.2} />
          </div>
        </div>

        <div className="flex flex-col gap-8 md:gap-32 px-4 md:px-16 relative z-10">
          <HardwareParallax
            speed={0.15}
            isPaused={isPageAnimating}
            className="w-full aspect-[4/3] md:aspect-video rounded-lg"
          >
            <Image
              src="/images/project-1.jpg"
              alt="Gallery 1"
              fill
              className="object-cover"
              decoding="async"
              priority
            />
          </HardwareParallax>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <HardwareParallax
              speed={0.25}
              isPaused={isPageAnimating}
              className="w-full aspect-square rounded-lg"
            >
              <Image
                src="/images/project-2.jpg"
                alt="Gallery 2"
                fill
                className="object-cover"
                decoding="async"
              />
            </HardwareParallax>

            <HardwareParallax
              speed={0.1}
              isPaused={isPageAnimating}
              className="w-full aspect-square rounded-lg md:mt-32"
            >
              <Image
                src="/images/project-3.jpg"
                alt="Gallery 3"
                fill
                className="object-cover"
                decoding="async"
              />
            </HardwareParallax>
          </div>

          <HardwareParallax
            speed={0.2}
            isPaused={isPageAnimating}
            className="w-full aspect-[4/3] md:aspect-video rounded-lg"
          >
            <Image
              src="/images/project-4.jpg"
              alt="Gallery 4"
              fill
              className="object-cover"
              decoding="async"
            />
          </HardwareParallax>
        </div>
      </main>
    </>
  );
}
