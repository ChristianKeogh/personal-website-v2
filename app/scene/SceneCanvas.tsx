"use client";

import dynamic from "next/dynamic";

const Experience = dynamic(() => import("./Experience"), { ssr: false });

export function SceneCanvas() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <Experience />
    </div>
  );
}
