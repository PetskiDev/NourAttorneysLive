"use client";

import styles from "./ExpertiseClient.module.css";
import Link from "next/link";

type Service = {
  id: number;
  expertiseId: number;
  title: string;
  slug: string;
  createdAt: string | Date;
  updatedAt: string | Date;
};

type Expertise = {
  id: number;
  title: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  services: Service[];
};

export default function ExpertiseClient({ expertise }: { expertise: Expertise[] }) {
  const allServices = expertise.flatMap((e) => e.services);
  const [activeId, setActiveId] = useState<number | "all">("all");

  const activeServices =
    activeId === "all"
      ? allServices
      : expertise.find((e) => e.id === activeId)?.services ?? [];

  return (
    <div className={styles.wrap}>
      <div className={styles.title}>
        EXPERTISE
        <sup className={styles.counts}>{allServices.length}</sup>
      </div>

      <div className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${activeId === "all" ? styles.tabButtonActive : ""}`}
          onClick={() => setActiveId("all")}
        >
          ALL <sup className={styles.counts}>{allServices.length}</sup>
        </button>
        {expertise.map((e) => (
          <button
            key={e.id}
            className={`${styles.tabButton} ${activeId === e.id ? styles.tabButtonActive : ""}`}
            onClick={() => setActiveId(e.id)}
          >
            {e.title} <sup className={styles.counts}>{e.services.length}</sup>
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {activeServices.map((s) => (
          <Link key={s.id} href={`/services/${s.slug}`} className={styles.serviceItem}>
            {s.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

import { useState } from "react";


