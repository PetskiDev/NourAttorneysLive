"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./NavBar.module.css";

type Mode = "light" | "dark";

const navbarPages = [
  { title: "About us", link: "/about-us" },
  { title: "Expertise", link: "/expertise" },
  { title: "Our people", link: "/people" },
  { title: "Frameworks", link: "/frameworks" },
  { title: "Insights", link: "/insights" },
  { title: "Contacts", link: "/contact" },
];

const insightPages = [...navbarPages];

/** Helper to join class names without leaving trailing spaces */
const cx = (...cls: Array<string | false | undefined>) =>
  cls.filter(Boolean).join(" ");

export default function NavBar({ mode = "light" }: { mode?: Mode }) {
  const router = useRouter();

  // --- Search state ---
  const [active, setActive] = useState(false);
  const [query, setQuery] = useState("");
  const [highlightIdx, setHighlightIdx] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const [activeCount, setActiveCount] = useState(0);
  const [menuAnimating, setMenuAnimating] = useState(false);
  const timersRef = useRef<number[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  };

  const openMenu = () => {
    if (menuAnimating || menuOpen) return;
    setMenuAnimating(true);
    setMenuOpen(true);
    setActiveCount(0);
    for (let i = 1; i <= navbarPages.length; i++) {
      const t = window.setTimeout(() => setActiveCount(i), i * 100);
      timersRef.current.push(t);
    }
    const done = window.setTimeout(
      () => setMenuAnimating(false),
      navbarPages.length * 100 + 20,
    );
    timersRef.current.push(done);
  };

  const closeMenu = () => {
    if (menuAnimating || !menuOpen) return;
    setMenuAnimating(true);
    const start = activeCount;
    for (let step = 0; step < start; step++) {
      const nextCount = start - 1 - step;
      const t = window.setTimeout(() => setActiveCount(nextCount), step * 100);
      timersRef.current.push(t);
    }
    const done = window.setTimeout(
      () => {
        setMenuOpen(false);
        setMenuAnimating(false);
        clearTimers();
      },
      start * 100 + 20,
    );
    timersRef.current.push(done);
  };

  const toggleMenu = () => (menuOpen ? closeMenu() : openMenu());

  // --- Mobile menu state ---
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock body scroll when the menu is open
  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Esc closes search/menu
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (menuOpen) setMenuOpen(false);
        if (active) {
          setActive(false);
          setQuery("");
          setHighlightIdx(-1);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, active]);

  const openSearch = () => {
    setActive(true);
    // focus after styles toggle so the caret appears right where you expect
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const clearSearch = () => {
    setQuery("");
    setHighlightIdx(-1);
    inputRef.current?.focus();
  };

  const handleChange = (v: string) => setQuery(v);

  const filteredPages = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return insightPages.filter((p) => p.title.toLowerCase().includes(q));
  }, [query]);

  useEffect(() => {
    if (filteredPages.length === 0) setHighlightIdx(-1);
    else setHighlightIdx(0);
  }, [filteredPages.length]);

  const closeIfEmptyAndOutside = (e: React.FocusEvent<HTMLInputElement>) => {
    const root = e.currentTarget.closest(`.${styles.searchBox}`);
    const next = e.relatedTarget as Node | null;
    const clickedInside = next && root ? root.contains(next) : false;
    if (!clickedInside && query.trim() === "") setActive(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setActive(false);
      setQuery("");
      setHighlightIdx(-1);
      return;
    }
    if (filteredPages.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIdx((i) => (i < filteredPages.length - 1 ? i + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIdx((i) => (i > 0 ? i - 1 : filteredPages.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = filteredPages[highlightIdx] ?? filteredPages[0];
      if (target) {
        setActive(false);
        setQuery("");
        setHighlightIdx(-1);
        router.push(target.link);
      }
    }
  };

  return (
    <header className={`${styles.header} ${styles[mode]}`}>
      <div
        className={cx(
          "containerr",
          styles.headerContainer,
          active && styles.searchActive,
        )}
      >
        <Link href={"/"} className={styles.leftHeader}>
          <Image
            src="/logo.svg"
            alt="Company logo"
            width={130}
            height={50}
            priority
          />
        </Link>

        {/* Hidden on mobile via CSS */}
        <nav className={styles.midHeader}>
          {navbarPages.map((page) => (
            <Link key={page.link} className={styles.link} href={page.link}>
              {page.title}
            </Link>
          ))}
        </nav>

        <div className={styles.rightHeader}>
          {/* Search */}
          <div
            className={cx(styles.searchBox, active && styles.active)}
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded={active && filteredPages.length > 0}
            aria-controls="navbar-search-listbox"
            aria-owns="navbar-search-listbox"
          >
            {/* Label that turns into placeholder */}
            <button
              type="button"
              className={styles.searchLabelBtn}
              onClick={openSearch}
              aria-label="Open search"
            >
                <Image
                  src="/search.svg"
                  alt=""
                  aria-hidden="true"
                  style={{ width: 20, height: 20 }}
                  className="mob"
                />
                <div className="mobnot">Search</div>
            </button>

            {/* Input is always in the DOM so we can animate width/placeholder */}
            <div className={styles.searchBoxInner}>
              <input
                ref={inputRef}
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e) => handleChange(e.target.value)}
                onKeyDown={onKeyDown}
                onBlur={closeIfEmptyAndOutside}
                className={styles.searchInput}
                aria-autocomplete="list"
                aria-controls="navbar-search-listbox"
                aria-activedescendant={
                  highlightIdx >= 0 && filteredPages[highlightIdx]
                    ? `navbar-search-option-${highlightIdx}`
                    : undefined
                }
                tabIndex={active ? 0 : -1}
              />

              {/* Clear */}
              {active && (
                <>
                  <button
                    type="button"
                    className={`${styles.iconBtn} ${styles.xIcon}`}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={clearSearch}
                    aria-label="Clear search"
                  >
                    <Image
                      className={styles.iconImg}
                      src="/x.svg"
                      alt=""
                      aria-hidden="true"
                    />
                  </button>

                  {/* (Optional) search icon as submit — navigates to first match */}
                  <button
                    type="button"
                    className={styles.iconBtn}
                    onMouseDown={(e) => e.preventDefault()}
                    aria-label="Search"
                    onClick={() => {
                      const target = filteredPages[0];
                      if (target) {
                        setActive(false);
                        setQuery("");
                        setHighlightIdx(-1);
                        router.push(target.link);
                      }
                    }}
                  >
                    <Image
                      className={styles.iconImg}
                      src="/search.svg"
                      alt=""
                      aria-hidden="true"
                    />
                  </button>
                </>
              )}
            </div>

            {/* Dropdown */}
            {active && query.trim() !== "" && (
              <div
                id="navbar-search-listbox"
                ref={resultsRef}
                role="listbox"
                className={styles.searchResults}
              >
                {filteredPages.length > 0 ? (
                  filteredPages.map((p, i) => (
                    <Link
                      key={p.link}
                      href={p.link}
                      role="option"
                      id={`navbar-search-option-${i}`}
                      aria-selected={i === highlightIdx}
                      className={cx(
                        styles.searchResultItem,
                        i === highlightIdx && styles.activeResult,
                      )}
                      onMouseEnter={() => setHighlightIdx(i)}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        setActive(false);
                        setQuery("");
                        setHighlightIdx(-1);
                      }}
                    >
                      {p.title}
                    </Link>
                  ))
                ) : (
                  <div className={styles.noResults}>No results</div>
                )}
              </div>
            )}
          </div>

          {/* Burger / X trigger (CSS lines -> animated X) */}
          <button
            type="button"
            className={cx(styles.burgerBtn, menuOpen && styles.open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu-panel"
            onClick={toggleMenu}
          >
            <span className={styles.burger} aria-hidden="true">
              <span className={cx(styles.bar, styles.barTop)} />
              <span className={cx(styles.bar, styles.barMid)} />
              <span className={cx(styles.bar, styles.barBot)} />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile overlay + TOP SHEET panel — starts BELOW header, so header stays visible */}
      <div
        className={cx(styles.mobileOverlay, menuOpen && styles.open)}
        onClick={() => setMenuOpen(false)}
        aria-hidden={!menuOpen}
      />
      <aside
        id="mobile-menu-panel"
        className={cx(styles.mobilePanelTop, menuOpen && styles.open)}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Menu"
      >
        <nav className={styles.mobileNav}>
          {navbarPages.map((p, index) => (
            <Link
              key={p.link}
              href={p.link}
              className={cx(
                styles.mobileNavItem,
                index < activeCount && styles.activeItem,
              )}
              onClick={closeMenu}
            >
              <span>{p.title}</span>
              <span>{p.title}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </header>
  );
}
