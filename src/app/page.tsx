import styles from "./index.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Project <span className={styles.pinkSpan}>Unknown</span>
        </h1>
      </div>
    </main>
  );
}
