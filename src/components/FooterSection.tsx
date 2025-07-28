"use client";
import styles from "./FooterSection.module.scss";

const techStack = [
  "Next.js 15",
  "React 19",
  "TypeScript 5",
  "Sass (SCSS Modules)",
  "Framer-motion 12",
  "Redux Toolkit",
  "Three.js",
  "@react-three/fiber",
  "@react-three/drei",
  "React Icons",
  "Lodash",
];

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.tagline}>
          Portfolio site showcasing modern frontend craftsmanship.
        </p>

        <ul className={styles.techList}>
          {techStack.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>

        <p className={styles.copyright}>
          © {new Date().getFullYear()} Nenad Kozoder. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
