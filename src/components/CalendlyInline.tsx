"use client";

import { useEffect } from "react";
import classes from "./CalendlyInline.module.scss";

type CalendlyInlineProps = {
  url: string; // npr. "https://calendly.com/nenad/15min"
  height?: number;
};

export default function CalendlyInline({
  url,
  height = 650,
}: CalendlyInlineProps) {
  useEffect(() => {
    // Učitaj Calendly widget samo jednom
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // cleanup ako želiš
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className={`calendly-inline-widget ${classes.calendlyWidget}`}
      data-url={url}
      style={{ minHeight: height, width: "100%" }}
    />
  );
}
