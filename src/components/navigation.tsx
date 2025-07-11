import Link from "next/link";
import stiles from "./navigation.module.scss";

const menuItems = [
  { label: "Home", path: "#home" },
  { label: "Expertise", path: "#expertise" },
  { label: "Work", path: "#work" },
  { label: "Experience", path: "#experience" },
  { label: "Contact", path: "#contact" },
];

const Navigation = () => {
  return (
    <nav className={stiles.menu}>
      {menuItems.map((item, index) => (
        <Link key={index} href={item.path}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
