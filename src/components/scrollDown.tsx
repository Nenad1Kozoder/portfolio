"use client";

import { FaAnglesDown } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "store/store"; // prilagodi ako ti je drugačiji path
import styles from "./scrollDown.module.scss";

const ScrollDown = () => {
  const [isBouncing, setIsBouncing] = useState(true);
  const elementRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = () => {
    setIsBouncing(false);
  };

  const animationDone = useSelector(
    (state: RootState) => state.home.homeAnimationDone
  );

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const section = document.getElementById("expertise");
    if (section) {
      const yOffset = -100;
      const y =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setIsBouncing(false);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.arowDown} ref={elementRef}>
      <a
        href="#expertise"
        className={animationDone && isBouncing ? styles.active : ""}
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
      >
        <span>
          <FaAnglesDown />
        </span>
      </a>
    </div>
  );
};

export default ScrollDown;
