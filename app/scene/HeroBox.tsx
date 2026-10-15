"use client";

/** Temporary stand-in for a knight GLB. Keep this mesh simple to swap later. */
export function HeroBox() {
  return (
    <group position={[0, 0.925, 0]}>
      <mesh>
        <boxGeometry args={[0.72, 1.85, 0.46]} />
        <meshStandardMaterial
          color="#2a2a30"
          metalness={0.28}
          roughness={0.7}
        />
      </mesh>
      <mesh scale={1.02}>
        <boxGeometry args={[0.72, 1.85, 0.46]} />
        <meshBasicMaterial
          color="#6a6a72"
          wireframe
          transparent
          opacity={0.22}
        />
      </mesh>
    </group>
  );
}
