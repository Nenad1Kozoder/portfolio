"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation"; // 👈 dodaj useRouter
import stiles from "./navigation.module.scss";

const menuItems = [
  { label: "Home", path: "#home" },
  { label: "Expertise", path: "#expertise" },
  { label: "My Work", path: "#work" },
  { label: "Contact", path: "#contact" },
  { label: "Services", path: "/services" },
];

interface NavigationProps {
  isMobile?: boolean;
}

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const Navigation: React.FC<NavigationProps> = ({ isMobile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter(); // 👈 koristi useRouter

  const menuHandler = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClick = (path: string) => {
    if (path.startsWith("#")) {
      const id = path.slice(1);
      if (pathname === "/") {
        scrollTo(id);
      } else {
        window.location.href = `/#${id}`; // 👈 ovde je promena
      }
    } else {
      router.push(path);
    }

    if (isOpen) setIsOpen(false);
  };

  return (
    <>
      {isMobile && (
        <div
          className={`${stiles.burgerMenu} ${isOpen ? stiles.isActive : ""}`}
          onClick={menuHandler}
        >
          <span />
        </div>
      )}
      <nav
        className={`${stiles.menu} ${isMobile ? stiles.mobileMenu : ""} ${
          isOpen ? stiles.isActive : ""
        }`}
      >
        {menuItems.map(({ label, path }) => (
          <button
            key={path}
            onClick={() => handleClick(path)}
            className={stiles.link}
          >
            {label}
          </button>
        ))}
      </nav>
    </>
  );
};

export default Navigation;
