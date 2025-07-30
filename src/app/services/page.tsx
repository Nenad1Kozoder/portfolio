import TypeText from "../../components/typeText";
import styles from "./page.module.scss";
import Iframe from "../../components/iframe";
import Image from "next/image";
import CalendlyInline from "../../components/CalendlyInline";

const sites = [
  {
    id: "dr-sonja",
    name: "Dr. Sonja Cerovac",
    url: "https://sonjacerovac.com",
    cms: "WordPress",
    stack: "Next.js 14 (App Router, ISR)",
    styling: "SCSS",
    image: "/lighthouse-sonjacerovac.webp",
  },
  {
    id: "musmula",
    name: "Studio Mušmula",
    url: "https://studiomusmula.rs/en",
    cms: "WordPress",
    stack: "Next.js 13 (Pages Router, ISR)",
    styling: "SCSS",
    image: "/lighthouse-studiomusmula.webp",
  },
];

const Page = () => {
  return (
    <main className={styles.main}>
      <section className={styles.topSection}>
        <h1 className={styles.title}>My Services</h1>
        <TypeText text="Speed up WordPress || migrate WordPress to Next.js" />
      </section>
      <section className={styles.offerSection}>
        <ul>
          <li>Headless WordPress</li>
          <li>meets Next.js</li>
          <li>Faster. Future-proof. Fully editable.</li>
          <li>Two live sites, same stack—see the speed yourself.</li>
        </ul>
        <div className={styles.siteGrid}>
          {sites.map((site) => (
            <div key={site.id} className={styles.gridItem}>
              <h3 className={styles.siteTitle}>{site.name}</h3>
              <Iframe src={site.url} title={site.name} />
              <h4>Lighthouse report</h4>
              <Image
                src={site.image}
                alt={site.name}
                width={600}
                height={225}
                priority={false} // sprečava Lighthouse “preload” warning
              />
            </div>
          ))}
        </div>
      </section>
      <section className={styles.offerSection}>
        <h3>Ready to move your site to Next.js?</h3>
        <p>Pick a slot below for a free 15-minute audit—no strings attached.</p>
        <CalendlyInline url="https://calendly.com/kozodern/15-minute-discovery-call" />
      </section>
    </main>
  );
};

export default Page;
