"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import HeroProjects from "@/components/HeroProjects"; // <-- New Interactive Header
import ParallaxImage from "@/components/ParallaxImage";
import DistortedImage from "@/components/DistortedImage";
import Navbar from "@/components/NavBar"; // <-- Capital B!
import Footer from "@/components/Footer";
import SplitText from "@/components/SplitText";
import VimeoSection from "@/components/VimeoSection";
import Preloader from "@/components/Preloader";
import FilmGrain from "@/components/FilmGrain";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [footerHeight, setFooterHeight] = useState(0);
  const footerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // 1. Initialize Lenis Smooth Scroll (Default Settings for Max Performance)
  useEffect(() => {
    const lenis = new Lenis();
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // 2. Lock Scroll During Preloader
  useEffect(() => {
    if (isLoading) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, [isLoading]);

  // 3. Dynamically Measure Footer for Sticky Reveal
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setFooterHeight(entry.contentRect.height);
      }
    });

    if (footerRef.current) {
      resizeObserver.observe(footerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <>
      <FilmGrain /> {/* The global TV static layer */}
      {/* The frosted glass preloader */}
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" setLoading={setIsLoading} />}
      </AnimatePresence>
      <main className="relative">
        {/* Note: HeroProjects has its own inline nav in the design, 
            so you might want to hide this global NavBar on the home page later! */}
        <Navbar />

        {/* MAIN CONTENT WRAPPER */}
        <div
          className="relative z-10 bg-zinc-100 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          style={{ marginBottom: `${footerHeight}px` }}
        >
          {/* New Interactive WebGL Header Section */}
          <HeroProjects />

          {/* First Parallax: Full Screen background with WebGL Overlay */}
          <ParallaxImage
            src="/test-image-1.jpg"
            alt="Full screen background"
            className="h-screen w-full"
            showWebGL={true}
          />

          {/* Spacing Section */}
          <div className="h-[60vh] flex items-center justify-center text-zinc-900 px-8 text-center">
            <SplitText text="Seamless spatial depth." delay={0.1} />
          </div>

          {/* Second Section: WebGL Liquid Distortion */}
          <div className="py-20 flex justify-center bg-zinc-200">
            <DistortedImage
              src="/test-image-2.jpg"
              className="h-[60vh] w-[90%] md:w-[70%] rounded-2xl shadow-2xl"
            />
          </div>

          {/* Full Screen Auto-Paused Vimeo Section */}
          <VimeoSection videoId="76979871" />

          {/* Final Section before Footer */}
          <div className="h-[60vh] flex flex-col items-center justify-center text-zinc-900 px-8 text-center">
            <SplitText text="Keep Scrolling" />
            <p className="mt-8 text-xl font-medium tracking-widest uppercase text-zinc-500">
              The sticky footer awaits.
            </p>
          </div>
        </div>

        {/* STICKY FOOTER WRAPPER */}
        <div ref={footerRef} className="fixed bottom-0 left-0 w-full z-0">
          <Footer />
        </div>
      </main>
    </>
  );
}
