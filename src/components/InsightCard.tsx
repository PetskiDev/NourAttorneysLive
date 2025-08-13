import Link from "next/link";
import styles from "./InsightCard.module.css";

export type InsightCardProps = {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string | Date;
};

export default function InsightCard({ slug, title, description, category, publishedAt }: InsightCardProps) {
  const href = `/insights/${slug}`;
  return (
    <article className={styles.card}>
      <div className={styles.headerRow}>
        <span className={styles.categoryPill}>{category}</span>
        <span className={styles.date}>{new Date(publishedAt).toLocaleDateString()}</span>
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <div className={styles.footerRow}>
        <Link href={href} className={styles.readMore}>
          Read more <span className={styles.arrow} aria-hidden="true" />
        </Link>
        <span />
      </div>
    </article>
  );
}


