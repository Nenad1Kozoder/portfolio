import TypeText from "@/components/typeText";

import styles from "./home.module.scss";
import ScrollDown from "./scrollDown";

const Home = ({ name, lastname }) => {
  return (
    <section className={styles.home} id="home">
      <h1 className={styles.title}>
        <span className={styles.nameOne}>{`${name} `}</span>
        <span className={styles.nameTwo}>{lastname}</span>
      </h1>
      <TypeText text="Frontend Web Developer || JavaScript Developer" />

      <div className={styles.description}>
        <p>
          I thrive on problem-solving, performance optimization, and developing
          reusable, scalable components that ensure a seamless user experience.
        </p>
        <p>
          My work has directly contributed to faster page loads, improved
          accessibility, and increased user engagement.
        </p>
      </div>
      <ScrollDown />
    </section>
  );
};

export default Home;
