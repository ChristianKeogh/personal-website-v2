export default function Footer() {
  return (
    <footer className="hud pointer-events-auto mt-16 pb-10">
      <div className="flex gap-6">
        <a
          href="https://github.com/ChristianKeogh"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-neutral-400"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/christian-keogh-94888a28b/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-neutral-400"
        >
          LinkedIn
        </a>
      </div>
      <p className="mt-4">© {new Date().getFullYear()} Christian Keogh</p>
    </footer>
  );
}
