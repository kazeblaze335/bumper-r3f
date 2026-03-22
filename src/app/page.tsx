"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "@studio-freight/lenis";
import Navbar from "@/components/NavBar";
import FeaturedWorks from "@/components/FeaturedWorks";
import HeroProjects from "@/components/HeroProjects";
import Footer from "@/components/Footer";
import FilmGrain from "@/components/FilmGrain";
import SplitText from "@/components/SplitText";

export default function Home() {
  const lenisRef = useRef<Lenis | null>(null);
  const [footerHeight, setFooterHeight] = useState(0);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const lenis = new Lenis();
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
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

  return (
    <>
      <FilmGrain />
      <main className="relative bg-zinc-100 dark:bg-zinc-950 min-h-screen text-zinc-900 dark:text-zinc-100 overflow-clip transition-colors duration-500">
        <Navbar />

        <div
          className="relative z-10 bg-zinc-100 dark:bg-zinc-950 transition-colors duration-500"
          style={{ marginBottom: `${footerHeight}px` }}
        >
          <div className="min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-16">
            <SplitText text="Seamless Spatial" delay={0.25} />
            <SplitText text="Depth." delay={0.4} />
          </div>

          {/* REDUCED PADDING: Changed pb-32 to pb-16 */}
          <div className="w-full px-8 md:px-16 pb-16">
            <p className="mb-4 text-sm font-bold tracking-[0.2em] uppercase text-zinc-500 dark:text-zinc-400 transition-colors duration-500">
              Featured Works
            </p>
            <FeaturedWorks />
          </div>

          {/* REMOVED TOP MARGIN & REDUCED HEADER BOTTOM MARGIN */}
          <div className="w-full px-8 md:px-16 pb-32">
            <div className="w-full flex justify-center mb-8">
              <p className="text-xs font-bold tracking-[0.4em] uppercase text-zinc-400 dark:text-zinc-500 transition-colors duration-500">
                The Archive
              </p>
            </div>
            <HeroProjects />
          </div>

          <div className="h-screen flex flex-col items-center justify-center px-8 text-center bg-zinc-100 dark:bg-zinc-950 transition-colors duration-500 border-t border-zinc-200 dark:border-zinc-800">
            <SplitText text="Keep Scrolling" playOnce={true} />
            <p className="mt-8 text-xl font-medium tracking-widest uppercase text-zinc-500 dark:text-zinc-400 transition-colors duration-500">
              The sticky footer awaits.
            </p>
          </div>
        </div>

        <div ref={footerRef} className="fixed bottom-0 left-0 w-full z-0">
          <Footer />
        </div>
      </main>
    </>
  );
}
