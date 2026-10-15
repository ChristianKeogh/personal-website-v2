"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

/** Temporary stand-in for a knight GLB. Keep this mesh simple to swap later. */
export function HeroBox() {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.08;
  });

  return (
    <group ref={group} position={[0, 0.92, 0]}>
      <mesh castShadow>
        <boxGeometry args={[0.72, 1.85, 0.46]} />
        <meshStandardMaterial
          color="#161618"
          metalness={0.42}
          roughness={0.58}
        />
      </mesh>
    </group>
  );
}
