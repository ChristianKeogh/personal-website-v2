"use client";

import {
  routeFromPathname,
  setSceneRoute,
  setScrollProgress,
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
    setScrollProgress(0);

    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => setScrollProgress(self.progress),
    });

    const id = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(id);
      trigger.kill();
    };
  }, [pathname]);

  return null;
}
