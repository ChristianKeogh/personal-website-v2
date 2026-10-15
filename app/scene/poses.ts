import type { SceneRoute } from "./state";

export type Pose = {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
};

const homeStart: Pose = {
  position: [2.15, 1.05, 3.55],
  target: [0, 0.85, 0],
  fov: 36,
};

const homeEnd: Pose = {
  position: [2.85, 0.55, 2.15],
  target: [0, 0.95, 0],
  fov: 34,
};

const routes: Record<Exclude<SceneRoute, "home">, Pose> = {
  blog: {
    position: [-2.4, 1.55, 2.9],
    target: [0, 0.9, 0],
    fov: 32,
  },
  art: {
    position: [0.15, 2.55, 4.35],
    target: [0, 0.35, 0],
    fov: 40,
  },
  education: {
    position: [3.35, 0.7, 1.35],
    target: [0, 0.95, 0],
    fov: 30,
  },
};

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function blendPose(a: Pose, b: Pose, t: number): Pose {
  return {
    position: [
      lerp(a.position[0], b.position[0], t),
      lerp(a.position[1], b.position[1], t),
      lerp(a.position[2], b.position[2], t),
    ],
    target: [
      lerp(a.target[0], b.target[0], t),
      lerp(a.target[1], b.target[1], t),
      lerp(a.target[2], b.target[2], t),
    ],
    fov: lerp(a.fov, b.fov, t),
  };
}

export function poseFor(route: SceneRoute, homeProgress: number): Pose {
  if (route === "home") {
    return blendPose(homeStart, homeEnd, homeProgress);
  }
  return routes[route];
}
