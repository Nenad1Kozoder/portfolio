import Header from "@/components/header";
import Home from "@/components/home";
import Expertise from "@/components/expertise";
import styles from "./page.module.scss";
import Projects from "@/components/projects";
import Contact from "@/components/contact";
import Footer from "@/components/FooterSection";

const Page = () => {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <Home name="Nenad" lastname="Kozoder" />
        <Expertise />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Page;
