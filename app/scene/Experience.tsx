"use client";

import { AdaptiveDpr, PerformanceMonitor } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import { useState } from "react";
import { CameraRig } from "./CameraRig";
import { Drift } from "./Drift";
import { HeroBox } from "./HeroBox";
import { setSceneQuality, useSceneState } from "./state";

function Lights() {
  return (
    <>
      <ambientLight intensity={0.12} color="#8a8a94" />
      <directionalLight
        position={[2.4, 3.2, 2.1]}
        intensity={0.55}
        color="#b8b8c2"
        castShadow={false}
      />
      <directionalLight
        position={[-3.2, 1.4, -2.6]}
        intensity={1.15}
        color="#cfd0d6"
      />
      <pointLight position={[0.2, 0.2, 1.6]} intensity={0.18} color="#9a9aa3" />
    </>
  );
}

function Post() {
  const { quality } = useSceneState();
  if (quality < 0.55) return null;
  return (
    <EffectComposer>
      <Vignette eskil={false} offset={0.28} darkness={0.85} />
      <Noise opacity={0.035} />
    </EffectComposer>
  );
}

function World() {
  return (
    <>
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#000000", 7, 16]} />
      <Lights />
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
      camera={{ position: [2.15, 1.05, 3.55], fov: 36, near: 0.1, far: 40 }}
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
