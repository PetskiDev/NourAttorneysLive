"use client";

import Link from "next/link";
import styles from "./InsightCard.module.css";
import Image from "next/image";
import { useInView } from "~/components/useInView"; // keep this path if that's where you put the hook

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
  const dateObj = new Date(publishedAt);
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    timeZone: "UTC",
  }).format(dateObj);

  // Intersection Observer
  const { ref, isVisible } = useInView<HTMLElement>({
    threshold: 0.15,
    rootMargin: "0px 0px -10% 0px",
  });

  return (
    <article
      ref={ref}
      className={`${styles.card} ${styles.visible}`}
    >
      <div>
        <div className={styles.headerRow}>
          <span className={`${styles.categoryPill} descriptor_1 antiselector`}>
            {category}
          </span>
          <span className={`${styles.date} footnote_2`}>{formattedDate}</span>
        </div>
        <p className={`${styles.title} title_2 antiselector`}>{title}</p>
        <p className={`${styles.description} subtitle_2 antiselector`}>{description}</p>
      </div>
      <div className={styles.footerRow}>
        <Link href={href} className={styles.readMore}>
          <span>Read more</span>
          <Image width={22} height={22} alt="arrow" src={"/diagonal-black.svg"} />
        </Link>
        <span />
      </div>
    </article>
  );
}
