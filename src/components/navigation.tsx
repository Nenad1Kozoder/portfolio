"use client";

import { useState } from "react";
import stiles from "./navigation.module.scss";

const menuItems = [
  { label: "Home", path: "#home" },
  { label: "Expertise", path: "#expertise" },
  { label: "My Work", path: "#work" },
  { label: "Contact", path: "#contact" },
];

interface NavigationProps {
  isMobile?: boolean;
}

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const Navigation: React.FC<NavigationProps> = ({ isMobile }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuHandler = () => {
    setIsOpen((prev) => !prev);
    console.log(isOpen);
  };

  return (
    <>
      {isMobile && (
        <div
          className={`${stiles.burgerMenu} ${isOpen ? stiles.isActive : ""}`}
          onClick={menuHandler}
        >
          <span></span>
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
            onClick={() => {
              scrollTo(path.slice(1));
              isOpen && menuHandler();
            }}
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
