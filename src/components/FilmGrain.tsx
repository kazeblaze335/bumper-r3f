"use client";

export default function FilmGrain() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        /* 1. Animation for the base sizzle layer (Fast and random) */
        @keyframes static-sizzle {
          0%, 100% { transform: translate(0, 0); }
          20% { transform: translate(-1%, -1.5%); }
          40% { transform: translate(1%, -2.5%); }
          60% { transform: translate(-1%, 2.5%); }
          80% { transform: translate(1.5%, 1%); }
        }
        .animate-sizzle {
          animation: static-sizzle 0.2s infinite steps(5);
        }

        /* 2. THE INTENSE STATIC BURST ANIMATION */
        /* Intermittently pulses the heavy static layer from hidden (0 opacity) 
           to intense visibility (0.58 opacity) to match the visual direction. */
        @keyframes static-burst {
          0%, 19%, 21%, 39%, 41%, 59%, 61%, 79%, 81%, 99% { 
            opacity: 0; 
            transform: scale(1) translate(0,0);
          }
          /* Rapid, intense bursts */
          20% { 
            opacity: 0.58; 
            transform: scale(1.1) translate(-2%, -3%);
          } 
          40% { 
            opacity: 0.45; 
            transform: scale(1.2) translate(1%, -6%);
          } 
          80% { 
            opacity: 0.5; 
            transform: scale(1.15) translate(-3%, 4%);
          } 
        }
        .animate-burst {
          /* Using 'step-end' ensures the noise materializes instantly and brutally */
          animation: static-burst 1.5s infinite step-end;
        }
      `,
        }}
      />

      {/* Global Wrapper (Pointer Events Disabled) */}
      <div className="pointer-events-none fixed inset-0 z-50 h-screen w-screen overflow-hidden">
        {/* =======================================================
            LAYER 1: The Base Sizzle (Tighter, Medium Frequency)
            Provides consistent visual texture over the design.
            ======================================================= */}
        <div
          className="absolute -inset-[50%] h-[200%] w-[200%] opacity-[0.11] mix-blend-difference animate-sizzle"
          style={{
            // baseFrequency='0.9' and type='fractalNoise' gives a classic tight sizzle.
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter1'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter1)'/%3E%3C/svg%3E")`,
            backgroundSize: "150px 150px",
          }}
        />

        {/* =======================================================
            LAYER 2: The Coarse static (THE INTENSE BLACK STATIC)
            This is the low-frequency, high-contrast texture.
            Matches the raw static visualization.
            ======================================================= */}
        <div
          className="absolute -inset-[100%] h-[300%] w-[300%] mix-blend-difference animate-burst"
          style={{
            // baseFrequency='0.22' makes the particles much larger, coaser, and visually intense.
            // type='turbulence' and numOctaves='1' makes it raw and brutalist.
            // Increased viewBox to 600 allows for more complex, larger noise clusters.
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 600 600' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter2'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.22' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter2)'/%3E%3C/svg%3E")`,
            backgroundSize: "400px 400px", // Large tile size for those wide interference blocks
          }}
        />
      </div>
    </>
  );
}
