import type { SceneRoute } from "./state";

export type Pose = {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
};

type Path = {
  radius: [number, number];
  azimuth: [number, number];
  polar: [number, number];
  lookY: [number, number];
  fov: [number, number];
};

const paths: Record<SceneRoute, Path> = {
  home: {
    radius: [9.4, 1.58],
    azimuth: [0.46 * Math.PI, 0.16 * Math.PI],
    polar: [1.12, 1.4],
    lookY: [0.45, 0.95],
    fov: [42, 26],
  },
  blog: {
    radius: [8.2, 2.15],
    azimuth: [1.08 * Math.PI, 0.92 * Math.PI],
    polar: [1.05, 1.28],
    lookY: [0.7, 0.95],
    fov: [38, 28],
  },
  art: {
    radius: [10.2, 3.1],
    azimuth: [0.08 * Math.PI, -0.12 * Math.PI],
    polar: [0.72, 0.95],
    lookY: [0.2, 0.55],
    fov: [44, 32],
  },
  education: {
    radius: [7.6, 1.85],
    azimuth: [-0.22 * Math.PI, -0.05 * Math.PI],
    polar: [1.22, 1.38],
    lookY: [0.7, 1.0],
    fov: [36, 27],
  },
};

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - (2 - 2 * t) ** 2 / 2;
}

export function poseFor(route: SceneRoute, progress: number): Pose {
  const path = paths[route];
  const t = easeInOut(Math.min(1, Math.max(0, progress)));
  const radius = lerp(path.radius[0], path.radius[1], t);
  const azimuth = lerp(path.azimuth[0], path.azimuth[1], t);
  const polar = lerp(path.polar[0], path.polar[1], t);
  const y = Math.max(0.42, radius * Math.cos(polar));
  return {
    position: [
      radius * Math.sin(polar) * Math.cos(azimuth),
      y,
      radius * Math.sin(polar) * Math.sin(azimuth),
    ],
    target: [0, lerp(path.lookY[0], path.lookY[1], t), 0],
    fov: lerp(path.fov[0], path.fov[1], t),
  };
}
