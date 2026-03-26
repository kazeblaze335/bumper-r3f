"use client";

import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import WebGLScene from "./WebGLScene";

export default function GlobalCanvas() {
  return (
    // FIX 2: Added bg-zinc-950 to the canvas container
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-zinc-950 isolate transform-gpu">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
      >
        <WebGLScene />
        <Preload all />
      </Canvas>
    </div>
  );
}
