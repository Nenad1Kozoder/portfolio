"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./customCursor.module.scss";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);
  const requestRef = useRef(null);

  // LERP funkcija
  const lerp = (start, end, amount) => start + (end - start) * amount;

  useEffect(() => {
    const updateCursor = () => {
      currentX.current = lerp(currentX.current, mouseX.current, 0.55);
      currentY.current = lerp(currentY.current, mouseY.current, 0.55);

      setPosition({ x: currentX.current, y: currentY.current });

      requestRef.current = requestAnimationFrame(updateCursor);
    };

    const handleMouseMove = (e) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };

    document.addEventListener("mousemove", handleMouseMove);
    requestRef.current = requestAnimationFrame(updateCursor);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  useEffect(() => {
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target || !(target instanceof Element)) return;

      const isInteractive =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor-hover]");

      if (isInteractive) setIsHovering(true);
    };

    const handleMouseOut = (e) => {
      const related = e.relatedTarget;
      if (!related || !(related instanceof Element)) {
        setIsHovering(false);
        return;
      }

      const stillInteractive =
        related.closest("a") ||
        related.closest("button") ||
        related.closest("[data-cursor-hover]");

      if (!stillInteractive) setIsHovering(false);
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <div
      className={`${styles.cursor} ${isHovering ? styles.hover : ""}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
};

export default CustomCursor;
