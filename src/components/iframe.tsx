"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import styles from "./iframe.module.scss";
import { MdFullscreen, MdClose } from "react-icons/md";

type IframeProps = {
  src: string;
  title?: string;
  width?: number; // desktop širina (1280)
  height?: number; // desktop visina (720)
  className?: string;
};

export default function Iframe({
  src,
  title = "Preview",
  width = 1280,
  height = 720,
  className = "",
}: IframeProps) {
  const [fullscreen, setFullscreen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const updateScale = useCallback(() => {
    if (!wrapperRef.current) return;
    setScale(wrapperRef.current.offsetWidth / width);
  }, [width]);

  useEffect(() => {
    const update = () => {
      const w = wrapperRef.current?.offsetWidth || window.innerWidth;
      setScale(Math.min(w, 588) / width); // clamp na max 588
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [width]);

  return (
    <>
      {/* skalirani prikaz */}
      <div
        ref={wrapperRef}
        className={`${styles.wrapper} ${className}`}
        style={{ "--scale": scale } as React.CSSProperties}
      >
        <iframe
          src={src}
          title={title}
          loading="lazy"
          className={styles.frame}
        />
        <button
          onClick={() => setFullscreen(true)}
          className={styles.btn}
          aria-label="Fullscreen"
        >
          <MdFullscreen size={16} />
        </button>
      </div>

      {/* fullscreen overlay */}
      {fullscreen && (
        <div className={styles.overlay}>
          <button
            onClick={() => setFullscreen(false)}
            className={styles.closeBtn}
            aria-label="Close fullscreen"
          >
            <MdClose size={20} />
          </button>
          <iframe
            src={src}
            title={title}
            className={styles.fullFrame}
            allowFullScreen
          />
        </div>
      )}
    </>
  );
}
