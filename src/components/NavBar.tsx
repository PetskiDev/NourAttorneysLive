import Link from "next/link";
import styles from "./NavBar.module.css";

export default function NavBar() {
  return (
    <header className={styles.nav}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          Project Unknown
        </Link>
        <nav className={styles.links}>
          <Link className={styles.link} href="/about-us">About us (static)</Link>
          {/* <Link className={styles.link} href="/pages/example">Dynamic page example</Link>
          <Link className={styles.link} href="/admin/pages">Admin: Pages</Link> */}
        </nav>
      </div>
    </header>
  );
}
