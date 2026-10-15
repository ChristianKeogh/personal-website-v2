export default function Footer() {
  return (
    <footer className="pointer-events-auto mt-24 pb-10 text-[12px] tracking-[0.16em] uppercase text-neutral-600">
      <div className="flex gap-6">
        <a
          href="https://github.com/ChristianKeogh"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-neutral-400 transition-colors"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/christian-keogh-94888a28b/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-neutral-400 transition-colors"
        >
          LinkedIn
        </a>
      </div>
      <p className="mt-4 normal-case tracking-normal">
        © {new Date().getFullYear()} Christian Keogh
      </p>
    </footer>
  );
}
