"use client";

export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <section>
      <h1 className="mb-4 text-sm tracking-[0.22em] uppercase text-neutral-500">
        Error
      </h1>
      <p className="text-neutral-400 break-words">{error.message}</p>
    </section>
  );
}
