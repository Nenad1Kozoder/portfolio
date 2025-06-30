import Image from "next/image";
import styles from "./page.module.scss";
import TypeText from "@/components/typeText";
import Header from "@/components/header";
import Home from "@/components/home";
import Expertise from "@/components/expertise";

const Page = () => {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <Home name="Nenad" lastname="Kozoder" />
        <Expertise />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Page;
