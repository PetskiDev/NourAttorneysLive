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

export default function ExpertiseClient({
  expertise,
}: {
  expertise: Expertise[];
}) {
  const allServices = expertise.flatMap((e) => e.services);
  const [activeId, setActiveId] = useState<number | "all">("all");
  const [query, setQuery] = useState("");
  const listboxId = useId();

  const activeServices =
    activeId === "all"
      ? allServices
      : (expertise.find((e) => e.id === activeId)?.services ?? []);

  const filteredServices = query.trim()
    ? activeServices.filter((s) =>
        s.title.toLowerCase().includes(query.trim().toLowerCase()),
      )
    : activeServices;

  return (
    <div className={styles.wrap}>
      <div className={styles.topRow}>
        <div className={styles.title}>
          EXPERTISE
          <sup className={styles.counts}>{allServices.length}</sup>
        </div>
      </div>

      <div className="line"></div>

      <div className={styles.bottomRow}>
        <div className={styles.bottomLeft}>
          <div
            className={styles.searchBox}
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded={query.trim() !== ""}
            aria-controls={query.trim() !== "" ? listboxId : undefined}
          >
            <div className={styles.searchBoxInner}>
              <input
                type="text"
                placeholder="Service name"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={styles.searchInput}
                aria-autocomplete="list"
              />
            </div>

            {query.trim() !== "" && (
              <div
                className={styles.searchResults}
                role="listbox"
                id={listboxId}
              >
                {activeServices
                  .filter((s) =>
                    s.title.toLowerCase().includes(query.trim().toLowerCase()),
                  )
                  .slice(0, 10)
                  .map((s) => (
                    <Link
                      key={s.id}
                      href={`/services/${s.slug}`}
                      className={styles.searchResultItem}
                    >
                      {s.title}
                    </Link>
                  ))}
              </div>
            )}
          </div>
        </div>

        <div className={styles.bottomRight}>
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
                {e.title}{" "}
                <sup className={styles.counts}>{e.services.length}</sup>
              </button>
            ))}
          </div>

          <div className={styles.grid}>
            {filteredServices.map((s) => (
              <Link
                key={s.id}
                href={`/services/${s.slug}`}
                className={styles.serviceItem}
              >
                {s.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useId, useState } from "react";
