"use client";

import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import { PerspectiveCamera, Vector3 } from "three";
import { poseFor } from "./poses";
import { useSceneState } from "./state";

export function CameraRig() {
  const { camera } = useThree();
  const { route, homeProgress } = useSceneState();
  const look = useRef(new Vector3(0, 0.85, 0));
  const flying = useRef(false);
  const prevRoute = useRef(route);
  const desiredPos = useRef(new Vector3());
  const desiredLook = useRef(new Vector3());

  useLayoutEffect(() => {
    const pose = poseFor(route, route === "home" ? homeProgress : 0);
    const perspective = camera as PerspectiveCamera;
    const routeChanged = prevRoute.current !== route;
    prevRoute.current = route;

    if (!routeChanged && route === "home") {
      return;
    }

    flying.current = true;
    const tl = gsap.timeline({
      defaults: { duration: 1.8, ease: "power2.inOut" },
      onComplete: () => {
        flying.current = false;
      },
    });
    tl.to(camera.position, { x: pose.position[0], y: pose.position[1], z: pose.position[2] }, 0);
    tl.to(
      look.current,
      {
        x: pose.target[0],
        y: pose.target[1],
        z: pose.target[2],
        onUpdate: () => camera.lookAt(look.current),
      },
      0,
    );
    tl.to(
      perspective,
      {
        fov: pose.fov,
        onUpdate: () => perspective.updateProjectionMatrix(),
      },
      0,
    );

    return () => {
      tl.kill();
      flying.current = false;
    };
  }, [camera, route]);

  useFrame(() => {
    if (flying.current || route !== "home") return;
    const pose = poseFor("home", homeProgress);
    desiredPos.current.set(...pose.position);
    desiredLook.current.set(...pose.target);
    camera.position.lerp(desiredPos.current, 0.045);
    look.current.lerp(desiredLook.current, 0.045);
    camera.lookAt(look.current);
    const perspective = camera as PerspectiveCamera;
    perspective.fov += (pose.fov - perspective.fov) * 0.045;
    perspective.updateProjectionMatrix();
  });

  return null;
}
