"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, useTexture } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function FlowArtwork() {
  const group = useRef<THREE.Group>(null);
  const texture = useTexture("/transformation-journey-v2.png");

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, state.pointer.y * 0.025, 0.04);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, state.pointer.x * 0.035, 0.04);
  });

  return (
    <Float speed={0.65} rotationIntensity={0.018} floatIntensity={0.07} floatingRange={[-0.02, 0.02]}>
      <group ref={group}>
        <mesh>
          <planeGeometry args={[9, 3.31]} />
          <meshBasicMaterial map={texture} transparent alphaTest={0.01} toneMapped={false} />
        </mesh>
      </group>
    </Float>
  );
}

export default function TransformationCanvas() {
  return (
    <Canvas
      orthographic
      dpr={[1, 1.35]}
      camera={{ position: [0, 0, 10], zoom: 102 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        <FlowArtwork />
      </Suspense>
    </Canvas>
  );
}
