import { baseUrl } from "@/app/lib/site";
import Link from "next/link";

const title = "Education";
const description = "Forget these lessons at your own peril";

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: `${baseUrl}/education`,
  },
};

export default function EducationPage() {
  return (
    <section>
      <h1 className="text-sm tracking-[0.22em] uppercase text-neutral-600">
        Education
      </h1>
      <p className="mt-2 mb-8 text-neutral-600">
        Lessons I think are important or just fun
      </p>
      <Link
        href="/education/economics"
        className="group flex flex-col border border-neutral-900 p-4 hover:border-neutral-700 transition-colors"
      >
        <span className="text-neutral-400 tracking-tight group-hover:text-neutral-300">
          Basic economics
        </span>
        <span className="text-neutral-600 text-sm mt-1">
          Learn these truths to understand why society can&apos;t be controlled,
          only influenced
        </span>
      </Link>
    </section>
  );
}
