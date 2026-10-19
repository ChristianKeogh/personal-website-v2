import Link from "next/link";

export default function NotFound() {
  return (
    <section>
      <h1 className="mb-6 text-sm tracking-[0.22em] uppercase text-neutral-500">
        404
      </h1>
      <p className="mb-6 text-neutral-600">That page does not exist.</p>
      <Link
        href="/"
        className="text-neutral-500 underline underline-offset-4 decoration-neutral-800 hover:text-neutral-400"
      >
        Home
      </Link>
    </section>
  );
}
