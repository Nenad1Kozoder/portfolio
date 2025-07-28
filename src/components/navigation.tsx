import Link from "next/link";
import stiles from "./navigation.module.scss";

const menuItems = [
  { label: "Home", path: "#home" },
  { label: "Expertise", path: "#expertise" },
  { label: "My Work", path: "#work" },
  { label: "Contact", path: "#contact" },
];

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const Navigation = () => (
  <nav className={stiles.menu}>
    {menuItems.map(({ label, path }) => (
      <button
        key={path}
        onClick={() => scrollTo(path.slice(1))}
        className={stiles.link}
      >
        {label}
      </button>
    ))}
  </nav>
);

export default Navigation;
