"use client";

import { FaAnglesDown } from "react-icons/fa6";
import { useSelector } from "react-redux";
import styles from "./scrollDown.module.scss";
import { useEffect, useRef, useState } from "react";

const ScrollDown = () => {
  const [isBouncing, setIsBouncing] = useState(true);
  const elementRef = useRef(null);

  const handleMouseEnter = () => {
    setIsBouncing(false);
  };

  const animationDone = useSelector(
    (state) => state.homeAnimationDone.homeAnimationDone
  );

  const handleClick = (e) => {
    e.preventDefault();
    const section = document.getElementById("expertise");
    if (section) {
      const yOffset = -100; // negativno jer želimo da pomerimo nagore
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
        className={isBouncing ? styles.active : ""}
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
      >
        {animationDone && (
          <span>
            <FaAnglesDown />
          </span>
        )}
      </a>
    </div>
  );
};

export default ScrollDown;
