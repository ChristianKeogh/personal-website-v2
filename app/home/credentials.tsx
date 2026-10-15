const links = [
  {
    label: "CV",
    href: "/pdfs/Christian-Keogh-CV.pdf",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/christian-keogh-94888a28b/",
  },
  {
    label: "GitHub",
    href: "https://github.com/ChristianKeogh",
  },
];

export default function Credentials() {
  return (
    <ul className="flex flex-col gap-4 text-[13px] tracking-[0.2em] uppercase">
      {links.map((item) => (
        <li key={item.href}>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-600 hover:text-neutral-400 transition-colors"
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
