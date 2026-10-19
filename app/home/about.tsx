import Image from "next/image";

export default function About() {
  return (
    <section className="flex flex-col gap-8 sm:flex-row sm:items-center">
      <Image
        src="/images/home/self.jpeg"
        alt="Christian Keogh"
        width={220}
        height={220}
        className="rounded-sm grayscale"
        priority
      />
      <p className="max-w-sm text-neutral-500 leading-relaxed">
        Hi, I’m Christian, a UI Developer and former Animation Designer. Outside
        of work, my interests include history, politics, and a little finance.
      </p>
    </section>
  );
}
