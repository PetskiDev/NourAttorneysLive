"use client";

import styles from "./ExpertiseClient.module.css";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

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

  // ---- Mobile dropdown state/behavior (<1024px)
  const categories = [
    { id: "all" as const, title: "ALL", count: allServices.length },
    ...expertise.map((e) => ({
      id: e.id as number | "all",
      title: e.title,
      count: e.services.length,
    })),
  ];

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close when clicking outside
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target as Node))
        setIsMobileOpen(false);
    }
    if (isMobileOpen) document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [isMobileOpen]);

  // Helpers
  const activeCategory =
    categories.find((c) => c.id === activeId) ?? categories[0];

  return (
    <div className={styles.wrap}>
      <div className={styles.topRow}>
        <h6 className="headline_6">
          EXPERTISE
          <sup className={styles.counts}>{allServices.length}</sup>
        </h6>
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
    className={`${styles.searchInput} body_text`}
    aria-autocomplete="list"
  />

  {query && (
    <button
      type="button"
      onClick={() => setQuery("")}
      className={styles.clearButton}
      aria-label="Clear search"
    >
      <img src="/x.svg" alt="" />
    </button>
  )}
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

          {/* ---- MOBILE CATEGORY DROPDOWN (<1024px) ---- */}
          <div className={styles.mobileCategoryWrap}>
            <div className={styles.mobileCategoryHeader}>
              <button
                type="button"
                className={styles.mobileCategoryButton}
                aria-haspopup="listbox"
                aria-expanded={isMobileOpen}
                onClick={() => setIsMobileOpen((v) => !v)}
              >
                <span style={{color:"#545454"}} className={styles.mobileCategoryCurrent}>
                  {`CATEGORY:`}
                  <span style={{color:"#101010", marginLeft: 4}}>{activeCategory?.title}</span>
                  <sup className={styles.counts}>{activeCategory?.count}</sup>
                </span>

                <span className={styles.chevron} aria-hidden="true" />
              </button>
            </div>

            {isMobileOpen && (
              <div
                ref={dropdownRef}
                className={styles.mobileDropdown}
                role="listbox"
                aria-label="Select category"
              >
                {categories.map((c) => (
                  <button
                    key={`${c.id}`}
                    role="option"
                    aria-selected={c.id === activeId}
                    className={`${styles.mobileDropdownItem} ${c.id === activeId ? styles.mobileDropdownItemActive : ""}`}
                    onClick={() => {
                      setActiveId(c.id);
                      setIsMobileOpen(false);
                      setQuery(""); // optional: clear search when switching category
                    }}
                  >
                    <span>{c.title}</span>
                    <sup className={styles.counts}>{c.count}</sup>
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* ---- END MOBILE CATEGORY DROPDOWN ---- */}
        </div>

        <div className={styles.bottomRight}>
          {/* ---- DESKTOP TABS (hidden <1024px) ---- */}
          <div className={styles.tabs}>
            <button
              className={`${styles.tabButton} headline_3_1 ${activeId === "all" ? styles.tabButtonActive : ""}`}
              onClick={() => setActiveId("all")}
            >
              ALL <sup className={styles.counts}>{allServices.length}</sup>
            </button>
            {expertise.map((e) => (
              <button
                key={e.id}
                className={`${styles.tabButton} headline_3_1 ${activeId === e.id ? styles.tabButtonActive : ""}`}
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
                className={`${styles.serviceItem} title_5`}
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
