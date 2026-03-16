"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import ParallaxImage from "@/components/ParallaxImage";
import Navbar from "@/components/NavBar";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <main className="relative bg-zinc-950">
      <Navbar />

      {/* MAIN CONTENT WRAPPER 
        The Fix: mb-[500px] ensures the page scrolls exactly enough to reveal the footer.
        We also added a drop shadow so it visually lifts off the footer when sliding up.
      */}
      <div className="relative z-10 bg-zinc-100 mb-[500px] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {/* Intro Section */}
        <div className="h-screen flex items-center justify-center text-zinc-900">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter">
            Scroll Down
          </h1>
        </div>

        {/* First Parallax: Full Screen */}
        <ParallaxImage
          src="/test-image-1.jpg"
          alt="Full screen background"
          className="h-screen w-full"
          showWebGL={true}
        />

        {/* Spacing Section */}
        <div className="h-[40vh] flex items-center justify-center text-zinc-900">
          <p className="text-2xl font-light">Seamless spatial depth.</p>
        </div>

        {/* Second Parallax: Middle Rectangular Section */}
        <div className="py-20 flex justify-center bg-zinc-200">
          {/* We restrict the width and height, and add rounded corners for the "window" effect */}
          <ParallaxImage
            src="/test-image-2.jpg"
            alt="Rectangular window parallax"
            className="h-[60vh] w-[85%] md:w-[60%] rounded-2xl"
          />
        </div>

        {/* Final Section before Footer */}
        <div className="h-[50vh] flex flex-col items-center justify-center text-zinc-900">
          <h2 className="text-4xl md:text-5xl font-semibold mb-4">
            Keep Scrolling
          </h2>
          <p className="text-xl">The sticky footer is right below.</p>
        </div>
      </div>

      {/* STICKY FOOTER */}
      <footer className="fixed bottom-0 left-0 w-full h-[500px] bg-zinc-950 text-white z-0 flex flex-col items-center justify-center">
        <h3 className="text-7xl md:text-9xl font-bold tracking-tighter mb-6">
          FOOTER
        </h3>
        <p className="text-zinc-400">Revealed perfectly from the background.</p>
      </footer>
    </main>
  );
}
