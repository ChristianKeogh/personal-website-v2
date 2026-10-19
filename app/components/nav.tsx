"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "index" },
  { href: "/blog", label: "blog" },
  { href: "/art", label: "art" },
  { href: "/education", label: "education" },
] as const;

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-20">
      <nav className="pointer-events-auto flex items-center justify-between px-6 py-5 md:px-10">
        <Link
          href="/"
          className="hud text-neutral-500 hover:text-neutral-400"
        >
          CK
        </Link>
        <div className="flex items-center gap-5">
          {items.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`hud ${
                  active
                    ? "text-neutral-400"
                    : "text-neutral-700 hover:text-neutral-500"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
