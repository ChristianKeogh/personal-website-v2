"use client";

import Footer from "./footer";
import { Navbar } from "./nav";
import { usePathname } from "next/navigation";

export function AppFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const home = pathname === "/";

  return (
    <div className="relative z-10 min-h-screen">
      <Navbar />
      {home ? (
        children
      ) : (
        <div className="px-6 pb-16 pt-24 md:px-10">
          <div className="min-h-[170vh] max-w-xl border-l border-neutral-900 bg-black/75 px-6 py-8 md:px-8">
            {children}
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}
