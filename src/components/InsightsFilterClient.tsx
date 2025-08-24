"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./InsightsFilterClient.module.css";

type InsightCategory = "ARTICLES" | "NEWS" | "UPDATES" | "PUBLICATIONS";

const CATEGORY_LABELS: Record<InsightCategory, string> = {
  ARTICLES: "Articles",
  NEWS: "News",
  UPDATES: "Updates",
  PUBLICATIONS: "Publications",
};

export default function InsightsFilterClient({
  categories,
  totalCount,
}: {
  categories: Array<{ key: InsightCategory; count: number }>;
  totalCount: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const ALL_CATEGORIES = useMemo(
    () => categories.map((c) => c.key),
    [categories],
  );

  // Initialize selection from the URL (cat=NEWS,UPDATES)
  const initialSelected = useMemo(() => {
    const raw = searchParams.get("cat");
    if (!raw) return new Set<InsightCategory>(ALL_CATEGORIES);
    const parts = raw.split(",").map((p) => p.trim().toUpperCase()) as InsightCategory[];
    const valid = parts.filter((p) => (ALL_CATEGORIES as string[]).includes(p));
    return valid.length > 0
      ? new Set<InsightCategory>(valid)
      : new Set<InsightCategory>(ALL_CATEGORIES);
  }, [searchParams, ALL_CATEGORIES]);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Set<InsightCategory>>(initialSelected);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const isAllSelected = selected.size === ALL_CATEGORIES.length;

  const getOnlySelected = (s: Set<InsightCategory>): InsightCategory | null => {
    if (s.size !== 1) return null;
    return s.values().next().value!;
  };

  const only = getOnlySelected(selected);
  const currentLabel = isAllSelected ? "ALL" : only ? CATEGORY_LABELS[only] : "MULTIPLE";
  const filtersCount = isAllSelected ? 1 : selected.size;

  const clear = () => setSelected(new Set(ALL_CATEGORIES));

  const toggleCategory = (cat: InsightCategory) => {
    setSelected((prev) => {
      const wasAll = prev.size === ALL_CATEGORIES.length;
      const next = wasAll ? new Set<InsightCategory>() : new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const apply = () => {
    // Build query string from selection
    const cats = isAllSelected ? undefined : Array.from(selected).sort().join(",");
    const params = new URLSearchParams(searchParams.toString());
    if (cats) params.set("cat", cats);
    else params.delete("cat");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    setOpen(false);
  };

  // Close dropdown on outside click / Esc
  useEffect(() => {
    if (!open) return;
    const onDocMouseDown = (e: MouseEvent) => {
      const node = e.target as Node | null;
      const root = panelRef.current;
      if (root && node && !root.contains(node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocMouseDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocMouseDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className={styles.topBar}>
      <span className={`headline_3 ${styles.categoryLabel}`}>CATEGORY:</span>
      <div className={styles.panelWrap} ref={panelRef}>
        <button
          type="button"
          className={`headline_3 ${styles.categoryCurrentBtn}`}
          onClick={() => setOpen((v) => !v)}
        >
          {currentLabel} <span className={styles.chevron} />
        </button>
        {open && (
          <div className={styles.panel} role="dialog" aria-modal="true">
            <div className={styles.panelHeader}>
              <span>FILTERS: ({filtersCount})</span>
              <button className={styles.clearBtn} onClick={clear}>Clear all</button>
            </div>
            <div className={styles.checkList}>
              <label className={styles.checkItem}>
                <input
                  className={styles.checkInput}
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={() => setSelected(new Set(ALL_CATEGORIES))}
                />
                <span>All ({totalCount})</span>
              </label>
              {categories.map((c) => (
                <label key={c.key} className={styles.checkItem}>
                  <input
                    className={styles.checkInput}
                    type="checkbox"
                    checked={!isAllSelected && selected.has(c.key)}
                    onChange={() => toggleCategory(c.key)}
                  />
                  <span>
                    {CATEGORY_LABELS[c.key]} ({c.count})
                  </span>
                </label>
              ))}
            </div>
            <button className={styles.applyBtn} onClick={apply}>apply filters</button>
          </div>
        )}
      </div>
    </div>
  );
}


