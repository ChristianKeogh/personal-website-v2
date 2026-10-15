import { useSyncExternalStore } from "react";

export type SceneRoute = "home" | "blog" | "art" | "education";

export type SceneState = {
  route: SceneRoute;
  scrollProgress: number;
  quality: number;
};

const listeners = new Set<() => void>();

let state: SceneState = {
  route: "home",
  scrollProgress: 0,
  quality: 1,
};

function emit() {
  listeners.forEach((listener) => listener());
}

export function getSceneState() {
  return state;
}

export function subscribeScene(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function setSceneRoute(route: SceneRoute) {
  if (state.route === route) return;
  state = { ...state, route };
  emit();
}

export function setScrollProgress(scrollProgress: number) {
  if (state.scrollProgress === scrollProgress) return;
  state = { ...state, scrollProgress };
  emit();
}

export function setSceneQuality(quality: number) {
  if (state.quality === quality) return;
  state = { ...state, quality };
  emit();
}

export function useSceneState() {
  return useSyncExternalStore(subscribeScene, getSceneState, getSceneState);
}

export function routeFromPathname(pathname: string): SceneRoute {
  if (pathname.startsWith("/blog")) return "blog";
  if (pathname.startsWith("/art")) return "art";
  if (pathname.startsWith("/education")) return "education";
  return "home";
}
