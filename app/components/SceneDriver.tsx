"use client";

import {
  routeFromPathname,
  setHomeProgress,
  setSceneRoute,
} from "@/app/scene/state";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export function SceneDriver() {
  const pathname = usePathname();

  useEffect(() => {
    const route = routeFromPathname(pathname);
    setSceneRoute(route);

    if (route !== "home") {
      setHomeProgress(0);
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => setHomeProgress(self.progress),
    });

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      trigger.kill();
    };
  }, [pathname]);

  return null;
}
