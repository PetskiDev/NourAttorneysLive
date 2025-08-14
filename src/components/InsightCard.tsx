import Link from "next/link";
import styles from "./InsightCard.module.css";
import Image from "next/image";

export type InsightCardProps = {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string | Date;
};

export default function InsightCard({
  slug,
  title,
  description,
  category,
  publishedAt,
}: InsightCardProps) {
  const href = `/insights/${slug}`;
  return (
    <article className={styles.card}>
      <div>
        <div className={styles.headerRow}>
          <span className={`${styles.categoryPill} descriptor_1`}>{category}</span>
          <span className={`${styles.date} footnote_2`}>
            {new Date(publishedAt).toLocaleDateString()}
          </span>
        </div>
        <h3 className={`${styles.title} title_2`}>{title}</h3>
        <p className={`${styles.description} subtitle_2`}>{description}</p>
      </div>
      <div className={styles.footerRow}>
        <Link href={href} className={styles.readMore}>
          <span>Read more</span><Image width={22} height={22} alt="arrow" src={"/diagonal-black.svg"}/>
        </Link>
        <span />
      </div>
    </article>
  );
}
