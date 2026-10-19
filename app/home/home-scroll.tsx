"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

type Section = {
  key: string;
  children: ReactNode;
};

export default function HomeScroll({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState(sections[0]?.key ?? "About");
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
            break;
          }
        }
      },
      { threshold: 0.45 },
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative">
      <div className="pointer-events-auto fixed top-1/2 left-4 z-10 hidden -translate-y-1/2 space-y-4 md:left-8 lg:block">
        {sections.map((section) => (
          <a
            key={section.key}
            href={`#${section.key}`}
            className="group flex items-center gap-3"
          >
            <span
              className={`h-px w-3 transition-colors ${
                active === section.key ? "bg-neutral-500" : "bg-neutral-800"
              }`}
            />
            <span
              className={`text-[10px] tracking-[0.22em] uppercase ${
                active === section.key ? "text-neutral-500" : "text-neutral-700"
              }`}
            >
              {section.key}
            </span>
          </a>
        ))}
      </div>

      {sections.map((section, index) => (
        <section
          key={section.key}
          id={section.key}
          ref={(el) => {
            sectionRefs.current[index] = el;
          }}
          className="flex min-h-[88vh] items-center"
        >
          {section.children}
        </section>
      ))}
    </div>
  );
}
