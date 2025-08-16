"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { Insight } from "@prisma/client";
import styles from "./LatestInsightsClient.module.css";

function formatDate(value: string | Date): string {
  const d = new Date(value);
  return new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    timeZone: "UTC",
  }).format(d);
}

export default function LatestInsightsClient({
  insights,
}: {
  insights: Insight[];
}) {
  const ordered: Insight[] = useMemo(() => insights.slice(0, 4), [insights]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  if (ordered.length === 0) return null;

  return (
    <div className={styles.wrap}>
      {ordered.map((i: Insight, idx: number) => {
        const expanded = idx === activeIndex;
        return (
          <article
            key={i.id}
            className={`${styles.card} ${expanded ? styles.expanded : styles.compact}`}
            onClick={() => setActiveIndex(idx)}
          >
            {expanded ? (
              <>
                <div className={styles.left}>
                  <div className={styles.categoryOutlineBlue}>{i.category}</div>
                  <p className={`${styles.title}`}>{i.title}</p>
                  <p className={`${styles.description}`}>{i.description}</p>
                  <div className={styles.metaRow}>
                    <span className={`${styles.authorBlack}`}>
                      By {i.publisher}
                    </span>
                    <span className={`${styles.dateGray}`}>
                      {" "}
                      / {formatDate(i.publishedAt)}
                    </span>
                  </div>
                </div>
                {i.imageUrl ? (
                  <div className={styles.media}>
                    <Image
                      src={i.imageUrl}
                      alt={i.title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                ) : null}
              </>
            ) : (
              <>
                <div className={styles.categoryOutline}>{i.category}</div>
                <p className={`${styles.title}`}>{i.title}</p>
                <div className={styles.metaRow}>
                  <span className={`${styles.authorWhite}`}>
                    By {i.publisher}
                  </span>
                  <span className={`${styles.dateGray}`}>
                    {" "}
                    / {formatDate(i.publishedAt)}
                  </span>
                </div>
              </>
            )}
          </article>
        );
      })}
    </div>
  );
}
