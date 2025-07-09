import Header from "@/components/header";
import Home from "@/components/home";
import Expertise from "@/components/expertise";
import styles from "./page.module.scss";
import Projects from "@/components/projects";

const Page = () => {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <Home name="Nenad" lastname="Kozoder" />
        <Expertise />
        <Projects />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Page;
