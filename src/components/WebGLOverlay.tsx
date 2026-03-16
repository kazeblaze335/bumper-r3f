"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";

// The actual 3D object
function FloatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Slowly rotate the geometry on every frame
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.5, 0.4, 128, 16]} />
        <meshStandardMaterial
          color="#ffffff"
          wireframe={true}
          transparent
          opacity={0.3}
        />
      </mesh>
    </Float>
  );
}

// The Canvas container
export default function WebGLOverlay() {
  return (
    // pointer-events-none ensures the 3D canvas doesn't block scroll or clicks
    <div className="absolute inset-0 z-20 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <FloatingGeometry />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
