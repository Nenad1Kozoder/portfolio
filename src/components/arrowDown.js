"use client";

import { FaAnglesDown } from "react-icons/fa6";
import { useSelector } from "react-redux";
import Link from "next/link";
import styles from "./arrowDown.module.scss";
import { useEffect, useRef, useState } from "react";

const ArrowDown = () => {
  const [isBouncing, setIsBouncing] = useState(true);
  const elementRef = useRef(null);

  const handleMouseEnter = () => {
    setIsBouncing(false);
  };

  const animationDone = useSelector(
    (state) => state.homeAnimationDone.homeAnimationDone
  );

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
      <Link
        href="#expertise"
        className={isBouncing ? styles.active : ""}
        onMouseEnter={handleMouseEnter}
      >
        {animationDone && (
          <span>
            <FaAnglesDown />
          </span>
        )}
      </Link>
    </div>
  );
};

export default ArrowDown;
