"use client";

import { useRef, useState, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, MeshDistortMaterial } from "@react-three/drei";
import { webglTunnel } from "@/providers/TunnelProvider";
import * as THREE from "three";

// =======================================================
// 1. THE WEBGL COMPONENT (Runs inside the Canvas)
// =======================================================
function DistortedPlane({
  src,
  isHovered,
}: {
  src: string;
  isHovered: boolean;
}) {
  // Load the image into a WebGL texture
  const texture = useTexture(src);
  const materialRef = useRef<any>(null);

  // useFrame runs at 60fps to handle the physics animations
  useFrame(() => {
    if (materialRef.current) {
      // Smoothly interpolate the distortion value based on hover state
      const targetDistortion = isHovered ? 0.6 : 0.0;
      materialRef.current.distort = THREE.MathUtils.lerp(
        materialRef.current.distort,
        targetDistortion,
        0.08, // Easing speed: lower is smoother/more liquid
      );
    }
  });

  return (
    // Pushed back slightly on the Z-axis, scaled to a 4:3 aspect ratio
    <mesh position={[0, 0, -2]} scale={[6, 4.5, 1]}>
      {/* 64x64 segments gives the material enough vertices to bend smoothly */}
      <planeGeometry args={[1, 1, 64, 64]} />
      <MeshDistortMaterial
        ref={materialRef}
        map={texture}
        speed={2.5} // How fast the liquid boils
        radius={1} // How wide the distortion spreads
        toneMapped={false} // Prevents the image colors from washing out
      />
    </mesh>
  );
}

// =======================================================
// 2. THE DOM WRAPPER (Runs in your standard Next.js pages)
// =======================================================
interface DistortedImageProps {
  src: string;
  active?: boolean; // Allows a parent element (like a custom cursor) to force the distortion
}

export default function DistortedImage({
  src,
  active = false,
}: DistortedImageProps) {
  const [isHovered, setIsHovered] = useState(false);

  // The image should distort if the user is directly hovering over its DOM node,
  // OR if a parent component explicitly tells it to be active.
  const isDistorting = active || isHovered;

  return (
    <>
      {/* This is an invisible DOM layer that catches the mouse. 
        It sits exactly where your image *would* be in the HTML.
      */}
      <div
        className="absolute inset-0 z-20 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />

      {/* The Teleporter: This sends the 3D logic out of this standard page
        and injects it directly into the GlobalCanvas running in layout.tsx!
      */}
      <webglTunnel.In>
        <Suspense fallback={null}>
          {/* We only mount and render the 3D plane if it is actively needed to save GPU memory */}
          {isDistorting && (
            <DistortedPlane src={src} isHovered={isDistorting} />
          )}
        </Suspense>
      </webglTunnel.In>
    </>
  );
}
