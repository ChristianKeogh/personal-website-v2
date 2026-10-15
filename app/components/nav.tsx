"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "christian keogh" },
  { href: "/blog", label: "blog" },
  { href: "/art", label: "art" },
  { href: "/education", label: "education" },
] as const;

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="pointer-events-auto sticky top-0 z-20 mix-blend-normal">
      <nav className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-6">
        {items.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[13px] tracking-[0.18em] uppercase transition-colors ${
                active ? "text-neutral-500" : "text-neutral-600 hover:text-neutral-400"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
