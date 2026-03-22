"use client";

import { useEffect, use } from "react";
import Link from "next/link";
import Image from "next/image";
import Lenis from "@studio-freight/lenis";
import { useTransitionRouter } from "next-view-transitions";
import HardwareParallax from "@/components/HardwareParallax";
import SplitText from "@/components/SplitText";
import FilmGrain from "@/components/FilmGrain";

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

export default function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useTransitionRouter();

  const handleBackNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push("/", {
      onTransitionReady: pageAnimation,
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <FilmGrain />
      <main className="relative bg-zinc-100 dark:bg-zinc-950 min-h-screen text-zinc-900 dark:text-zinc-100 pb-32 transition-colors duration-500">
        <div className="fixed top-0 left-0 w-full p-8 z-50 flex justify-between items-center mix-blend-difference text-zinc-100">
          <Link
            href="/"
            onClick={handleBackNavigation}
            className="text-sm font-bold tracking-[0.2em] uppercase hover:opacity-50 transition-opacity"
          >
            Back to Archive
          </Link>
          <div className="text-sm font-bold tracking-[0.2em] uppercase">
            2023
          </div>
        </div>

        <div className="pt-40 px-8 md:px-16 mb-24">
          <h1 className="text-xs md:text-sm font-bold tracking-[0.4em] uppercase text-zinc-500 mb-8">
            Case Study
          </h1>
          <div className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter uppercase leading-[0.85] mb-12 max-w-5xl">
            <SplitText text={slug.replace("-", " ")} delay={0.2} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <div className="col-span-1 md:col-span-2">
              <p className="text-xl md:text-2xl leading-relaxed font-medium text-zinc-700 dark:text-zinc-300 max-w-3xl">
                This is a placeholder for the lush, editorial description of the
                project. We developed a comprehensive design system and spatial
                interface that pushed the boundaries of modern web standards.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-500 mb-2">
                  Role
                </p>
                <p className="font-medium">Creative Direction</p>
              </div>
              <div>
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-500 mb-2">
                  Client
                </p>
                <p className="font-medium capitalize">
                  {slug.replace("-", " ")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 md:gap-32 px-4 md:px-16">
          <HardwareParallax
            speed={0.15}
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
