"use client";
import { useEffect } from "react";

export default function SWProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js");
    }
  }, []);
  return <>{children}</>;
}
