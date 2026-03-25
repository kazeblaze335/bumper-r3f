"use client";

import { useRef, useEffect } from "react";

export default function HardwareParallax({
  children,
  speed = 0.15,
  className = "",
  isPaused = false, // Receives global culling state!
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  isPaused?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const boundsRef = useRef({ top: 0, height: 0 });

  useEffect(() => {
    // 1. MOBILE CULLING
    if (window.innerWidth < 768) {
      if (innerRef.current) innerRef.current.style.transform = "none";
      return;
    }

    const updateBounds = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      boundsRef.current = { top: rect.top + scrollTop, height: rect.height };
    };

    updateBounds();
    window.addEventListener("resize", updateBounds);
    const timeoutId = setTimeout(updateBounds, 500);

    let rafId: number;

    const onScroll = () => {
      // 2. ANIMATION STATE CULLING: Loop is mathematically frozen if page is navigating!
      if (!containerRef.current || !innerRef.current || isPaused) {
        rafId = requestAnimationFrame(onScroll);
        return;
      }

      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const { top, height } = boundsRef.current;

      // 3. VISIBILITY CULLING: Drop from GPU if off-screen
      const isVisible =
        top - scrollY <= windowHeight && top + height - scrollY >= 0;

      if (isVisible) {
        if (containerRef.current.style.visibility === "hidden") {
          containerRef.current.style.visibility = "visible";
        }
        const distanceToCenter = top - scrollY - windowHeight / 2 + height / 2;
        const yTransform = distanceToCenter * speed;
        innerRef.current.style.transform = `translate3d(0, ${yTransform}px, 0)`;
      } else {
        if (containerRef.current.style.visibility !== "hidden") {
          containerRef.current.style.visibility = "hidden";
        }
      }

      rafId = requestAnimationFrame(onScroll);
    };

    rafId = requestAnimationFrame(onScroll);

    return () => {
      window.removeEventListener("resize", updateBounds);
      clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
    };
  }, [speed, isPaused]); // Listen to isPaused!

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden md:will-change-transform ${className}`}
    >
      <div
        ref={innerRef}
        className="w-full h-full md:scale-[1.3] md:will-change-transform origin-center"
      >
        {children}
      </div>
    </div>
  );
}
