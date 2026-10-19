"use client";

import { useSceneState } from "@/app/scene/state";
import Image from "next/image";

function band(progress: number, start: number, end: number) {
  if (progress <= start || progress >= end) return 0;
  const mid = (start + end) / 2;
  const half = (end - start) / 2;
  return 1 - Math.min(1, Math.abs(progress - mid) / half);
}

export default function HomeJourney() {
  const { scrollProgress } = useSceneState();
  const intro = Math.max(band(scrollProgress, 0, 0.28), scrollProgress < 0.08 ? 1 : 0);
  const about = band(scrollProgress, 0.16, 0.48);
  const skills = band(scrollProgress, 0.38, 0.68);
  const credentials = band(scrollProgress, 0.58, 0.86);
  const contact = Math.max(band(scrollProgress, 0.78, 1), scrollProgress > 0.92 ? 1 : 0);

  return (
    <div className="relative h-[420vh]">
      <div className="pointer-events-none sticky top-0 flex h-screen flex-col justify-between px-6 py-24 md:px-10">
        <div className="flex items-start justify-between gap-8">
          <div
            className="hud max-w-sm transition-opacity duration-500"
            style={{ opacity: intro }}
          >
            <p>51.5072° N  0.1276° W</p>
            <p className="mt-2 text-[11px] tracking-[0.28em] text-neutral-500">
              Christian Keogh
            </p>
            <p className="mt-1">UI developer · London</p>
          </div>
          <div className="hud text-right">
            <p>CAM {scrollProgress.toFixed(3)}</p>
            <p>OBJ.BOX / STANDBY</p>
          </div>
        </div>

        <div className="flex flex-1 items-center">
          <div
            className="pointer-events-auto flex max-w-md items-start gap-6 transition-opacity duration-500"
            style={{ opacity: about }}
          >
            <Image
              src="/images/home/self.jpeg"
              alt="Christian Keogh"
              width={96}
              height={96}
              className="grayscale"
              priority
            />
            <div>
              <p className="hud mb-3">01  /  about</p>
              <p className="text-sm leading-relaxed text-neutral-500">
                Hi, I’m Christian, a UI Developer and former Animation Designer.
                Outside of work, my interests include history, politics, and a
                little finance.
              </p>
            </div>
          </div>
        </div>

        <div className="relative min-h-36">
          <div
            className="pointer-events-none absolute bottom-20 hud transition-opacity duration-500"
            style={{ opacity: skills }}
          >
            <p className="mb-3">02  /  skills</p>
            <p>TypeScript · Angular · React</p>
            <p>Figma · Photoshop · Python</p>
          </div>

          <div
            className="pointer-events-auto absolute bottom-20 hud transition-opacity duration-500"
            style={{ opacity: credentials }}
          >
            <p className="mb-3">03  /  credentials</p>
            <div className="flex flex-col gap-2">
              <a
                href="/pdfs/Christian-Keogh-CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-neutral-400"
              >
                CV
              </a>
              <a
                href="https://www.linkedin.com/in/christian-keogh-94888a28b/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-neutral-400"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/ChristianKeogh"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-neutral-400"
              >
                GitHub
              </a>
            </div>
          </div>

          <div
            className="pointer-events-auto absolute bottom-20 hud transition-opacity duration-500"
            style={{ opacity: contact }}
          >
            <p className="mb-3">04  /  contact</p>
            <a
              href="mailto:christianfkeogh@gmail.com"
              className="hover:text-neutral-400"
            >
              christianfkeogh@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
