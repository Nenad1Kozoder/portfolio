"use client";
import { useEffect } from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Home from "@/components/home";
import Expertise from "@/components/expertise";
import styles from "./page.module.scss";
import Projects from "@/components/projects";
import Contact from "@/components/contact";

function PageContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined") return; // server-guard
    const hash = window.location.hash;
    if (hash) {
      const id = hash.slice(1);
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  }, [searchParams]);

  return (
    <main className={styles.main}>
      <Home name="Nenad" lastname="Kozoder" />
      <Expertise />
      <Projects />
      <Contact />
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<p>Loading…</p>}>
      <PageContent />
    </Suspense>
  );
}
