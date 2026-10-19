"use client";

import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import { PerspectiveCamera, Vector3 } from "three";
import { poseFor } from "./poses";
import { useSceneState } from "./state";

export function CameraRig() {
  const { camera } = useThree();
  const { route, scrollProgress } = useSceneState();
  const look = useRef(new Vector3(0, 0.45, 0));
  const prevRoute = useRef(route);

  useLayoutEffect(() => {
    const pose = poseFor(route, scrollProgress);
    const perspective = camera as PerspectiveCamera;
    const routeChanged = prevRoute.current !== route;
    prevRoute.current = route;
    const duration = routeChanged ? 2.15 : 1.2;
    const ease = routeChanged ? "power2.inOut" : "power3.out";

    gsap.to(camera.position, {
      x: pose.position[0],
      y: pose.position[1],
      z: pose.position[2],
      duration,
      ease,
      overwrite: "auto",
    });
    gsap.to(look.current, {
      x: pose.target[0],
      y: pose.target[1],
      z: pose.target[2],
      duration,
      ease,
      overwrite: "auto",
      onUpdate: () => camera.lookAt(look.current),
    });
    gsap.to(perspective, {
      fov: pose.fov,
      duration,
      ease,
      overwrite: "auto",
      onUpdate: () => perspective.updateProjectionMatrix(),
    });
  }, [camera, route, scrollProgress]);

  return null;
}
