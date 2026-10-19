import { AppFrame } from "./components/AppFrame";
import { SceneDriver } from "./components/SceneDriver";
import { SmoothScroll } from "./components/SmoothScroll";
import { SceneCanvas } from "./scene/SceneCanvas";
import { baseUrl } from "./lib/site";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "christian keogh",
    template: "%s",
  },
  description:
    "Personal website of Christian Keogh, a Frontend Developer based in London.",
  openGraph: {
    title: "Christian Keogh",
    description: "Personal website and portfolio of Christian Keogh.",
    url: baseUrl,
    siteName: "Christian Keogh",
    locale: "en_GB",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full bg-black text-neutral-500 antialiased`}
    >
      <body className="min-h-full bg-transparent font-sans">
        <SceneCanvas />
        <SmoothScroll />
        <SceneDriver />
        <AppFrame>{children}</AppFrame>
      </body>
    </html>
  );
}
