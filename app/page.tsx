import Contact from "./home/contact";
import Credentials from "./home/credentials";
import About from "./home/about";
import HomeScroll from "./home/home-scroll";
import Skills from "./home/skills";

export default function Page() {
  return (
    <HomeScroll
      sections={[
        { key: "About", children: <About /> },
        { key: "Skills", children: <Skills /> },
        { key: "Credentials", children: <Credentials /> },
        { key: "Contact", children: <Contact /> },
      ]}
    />
  );
}
