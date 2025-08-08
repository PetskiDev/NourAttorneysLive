import Link from "next/link";
import styles from "./NavBar.module.css";

export default function NavBar() {
  return (
    <header className={styles.nav}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>Project Unknown</Link>
        <nav className={styles.links}>
          <Link href="/about" className={styles.link}>About</Link>
          <Link href="/contact" className={styles.link}>Contact</Link>
        </nav>
      </div>
    </header>
  );
}
