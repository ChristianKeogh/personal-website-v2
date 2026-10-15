import Image from "next/image";

const iconPaths = [
  { src: "/images/icons/typescript.png", alt: "TypeScript" },
  { src: "/images/icons/angular_gradient.png", alt: "Angular" },
  { src: "/images/icons/React-icon.png", alt: "React" },
  { src: "/images/icons/Figma-logo.svg", alt: "Figma" },
  {
    src: "/images/icons/Adobe_Photoshop_CC_icon.svg.png",
    alt: "Photoshop",
  },
  { src: "/images/icons/Python.png", alt: "Python" },
];

export default function Skills() {
  return (
    <div className="grid grid-cols-3 gap-8 max-w-xs">
      {iconPaths.map((icon) => (
        <div key={icon.src} className="relative h-16 w-16">
          <Image
            src={icon.src}
            alt={icon.alt}
            fill
            sizes="64px"
            className="object-contain grayscale opacity-70"
          />
        </div>
      ))}
    </div>
  );
}
