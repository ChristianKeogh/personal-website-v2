"use client";

import { Grid, Line, Text } from "@react-three/drei";
import { useSceneState } from "./state";

function Callout({
  from,
  to,
  title,
  value,
}: {
  from: [number, number, number];
  to: [number, number, number];
  title: string;
  value: string;
}) {
  return (
    <group>
      <Line
        points={[from, to]}
        color="#5c5c64"
        lineWidth={1}
        transparent
        opacity={0.55}
      />
      <Text
        position={to}
        fontSize={0.09}
        color="#7a7a82"
        anchorX="left"
        anchorY="bottom"
        letterSpacing={0.12}
      >
        {title}
      </Text>
      <Text
        position={[to[0], to[1] - 0.12, to[2]]}
        fontSize={0.07}
        color="#55555c"
        anchorX="left"
        anchorY="top"
        letterSpacing={0.08}
      >
        {value}
      </Text>
    </group>
  );
}

export function Terrain() {
  const { quality } = useSceneState();
  const dense = quality >= 0.55;

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color="#050506" roughness={1} metalness={0} />
      </mesh>
      {dense ? (
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.01, 0]}
        >
          <planeGeometry args={[28, 28, 18, 18]} />
          <meshBasicMaterial
            color="#2e2e34"
            wireframe
            transparent
            opacity={0.22}
          />
        </mesh>
      ) : null}
      <Grid
        args={[24, 24]}
        cellSize={0.6}
        cellThickness={0.4}
        cellColor="#1c1c20"
        sectionSize={3}
        sectionThickness={0.8}
        sectionColor="#2a2a30"
        fadeDistance={16}
        fadeStrength={1.4}
        infiniteGrid={dense}
        position={[0, 0.015, 0]}
      />
      {dense ? (
        <>
          <Callout
            from={[0.36, 1.85, 0.23]}
            to={[1.55, 2.35, 0.9]}
            title="OBJ.BOX"
            value="STAND-IN / KNIGHT"
          />
          <Callout
            from={[0, 0.02, 0.23]}
            to={[1.7, 0.35, 1.4]}
            title="ORIGIN"
            value="0.00  0.00  0.00"
          />
          <Callout
            from={[-0.36, 1.4, -0.1]}
            to={[-1.7, 1.9, -0.8]}
            title="DIM"
            value="0.72 × 1.85 × 0.46"
          />
        </>
      ) : null}
    </group>
  );
}
