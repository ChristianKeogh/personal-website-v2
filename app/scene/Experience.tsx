"use client";

import { AdaptiveDpr, PerformanceMonitor } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import { useState } from "react";
import { CameraRig } from "./CameraRig";
import { Drift } from "./Drift";
import { HeroBox } from "./HeroBox";
import { setSceneQuality, useSceneState } from "./state";
import { Terrain } from "./Terrain";

function Lights() {
  return (
    <>
      <ambientLight intensity={0.06} color="#7a7a82" />
      <directionalLight
        position={[3.4, 5.2, 2.4]}
        intensity={0.35}
        color="#b4b4bc"
      />
      <directionalLight
        position={[-4.2, 1.8, -3.1]}
        intensity={1.35}
        color="#d0d0d6"
      />
      <pointLight position={[0.4, 0.3, 2.2]} intensity={0.12} color="#8c8c94" />
    </>
  );
}

function Post() {
  const { quality } = useSceneState();
  if (quality < 0.55) return null;
  return (
    <EffectComposer>
      <Vignette eskil={false} offset={0.22} darkness={0.92} />
      <Noise opacity={0.045} />
    </EffectComposer>
  );
}

function World() {
  return (
    <>
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#000000", 2.8, 13]} />
      <Lights />
      <Terrain />
      <HeroBox />
      <Drift />
      <CameraRig />
      <Post />
    </>
  );
}

export default function Experience() {
  const [dpr, setDpr] = useState<[number, number]>([1, 1.5]);

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [1.4, 3.6, 8.8], fov: 42, near: 0.08, far: 48 }}
      gl={{ antialias: true, alpha: false }}
      style={{ width: "100%", height: "100%", background: "#000" }}
    >
      <PerformanceMonitor
        onDecline={() => {
          setDpr([0.7, 1]);
          setSceneQuality(0.4);
        }}
        onIncline={() => {
          setDpr([1, 1.5]);
          setSceneQuality(1);
        }}
      />
      <AdaptiveDpr />
      <World />
    </Canvas>
  );
}
