"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, useTexture } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function EcosystemArtwork() {
  const group = useRef<THREE.Group>(null);
  const texture = useTexture("/ecosystem-fallback.png");

  useFrame((state) => {
    if (!group.current) return;
    const targetX = state.pointer.y * 0.055;
    const targetY = state.pointer.x * 0.075;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.045);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetY, 0.045);
  });

  return (
    <Float speed={0.8} rotationIntensity={0.035} floatIntensity={0.12} floatingRange={[-0.045, 0.045]}>
      <group ref={group}>
        <mesh>
          <planeGeometry args={[5.55, 6.94]} />
          <meshBasicMaterial map={texture} transparent alphaTest={0.015} toneMapped={false} />
        </mesh>
        <mesh position={[-1.62, 0.28, 0.08]}>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshBasicMaterial color="#75baff" transparent opacity={0.72} toneMapped={false} />
        </mesh>
        <mesh position={[1.9, -0.55, 0.08]}>
          <sphereGeometry args={[0.028, 16, 16]} />
          <meshBasicMaterial color="#ff8a61" transparent opacity={0.78} toneMapped={false} />
        </mesh>
      </group>
    </Float>
  );
}

export default function DigitalEcosystem3D() {
  return (
    <Canvas
      className="ecosystem-canvas"
      orthographic
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 10], zoom: 73 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        <EcosystemArtwork />
      </Suspense>
    </Canvas>
  );
}
