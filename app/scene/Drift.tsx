"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { BufferAttribute, BufferGeometry, Points } from "three";
import { useSceneState } from "./state";

export function Drift() {
  const { quality } = useSceneState();
  const points = useRef<Points>(null);
  const count = Math.max(16, Math.round(90 * quality));

  const geometry = useMemo(() => {
    const geo = new BufferGeometry();
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = Math.random() * 7;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }
    geo.setAttribute("position", new BufferAttribute(positions, 3));
    return geo;
  }, [count]);

  useFrame((_, delta) => {
    if (!points.current) return;
    const attr = points.current.geometry.getAttribute("position");
    for (let i = 0; i < attr.count; i++) {
      const y = attr.getY(i) + delta * 0.06;
      attr.setY(i, y > 7 ? 0.05 : y);
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        color="#6e6e76"
        size={0.015}
        sizeAttenuation
        transparent
        opacity={0.28}
        depthWrite={false}
      />
    </points>
  );
}
