import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";
import { ViewTransitions } from "next-view-transitions";
import localFont from "next/font/local";

// THE FIX: Restored the Preloader import!
import Preloader from "@/components/ui/Preloader";

const neueMontreal = localFont({
  src: "../../public/fonts/PPNeueMontreal-Bold.otf",
  variable: "--font-neue",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SOJU Studio",
  description:
    "Digital creative studio blurring the line between technology and art.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <html lang="en" className="dark">
        <body
          className={`bg-zinc-950 text-zinc-100 antialiased selection:bg-[#CCFF00] selection:text-zinc-950 ${neueMontreal.variable}`}
        >
          {/* THE FIX: Re-injected the Preloader into the very top of the DOM */}
          <Preloader />

          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
