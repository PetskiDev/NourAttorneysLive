"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import s from "./admin.module.css";

export const dynamic = "force-dynamic";

type SessionResp = { loggedIn: boolean; remainingSec?: number };

export default function AdminDashboardPage() {
  const router = useRouter();
  const [remainingSec, setRemainingSec] = useState<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/admin/login", { cache: "no-store" });
        const json = (await res.json()) as SessionResp;
        if (!cancelled) {
          if (json.loggedIn && typeof json.remainingSec === "number") {
            setRemainingSec(json.remainingSec);
          } else {
            setRemainingSec(null);
          }
        }
      } catch {
        if (!cancelled) setRemainingSec(null);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (typeof remainingSec === "number") {
      intervalRef.current = window.setInterval(() => {
        setRemainingSec((prev) => (typeof prev === "number" ? Math.max(0, prev - 1) : prev));
      }, 1000);
    }
    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [remainingSec !== null]);
  const sections: Array<{
    href: string;
    title: string;
    description: string;
    emoji: string;
    accent: string;
  }> = [
    {
      href: "/admin/people",
      title: "People",
      description: "Manage team members shown across the site.",
      emoji: "👥",
      accent: "#2F6BFF",
    },
    {
      href: "/admin/partners",
      title: "Partners",
      description: "Create, edit and reorder partner logos & pages.",
      emoji: "🤝",
      accent: "#7C4DFF",
    },
    {
      href: "/admin/insights",
      title: "Insights",
      description: "Articles, news and publications.",
      emoji: "📰",
      accent: "#00BFA6",
    },
    {
      href: "/admin/expertise",
      title: "Expertise",
      description: "Expertise categories and services.",
      emoji: "🧠",
      accent: "#FF6D00",
    },
    {
      href: "/admin/media",
      title: "Media Library",
      description: "Upload and select images for content.",
      emoji: "🖼️",
      accent: "#0091EA",
    },
    {
      href: "/admin/footer",
      title: "Footer",
      description: "Edit footer links and content.",
      emoji: "🧩",
      accent: "#8E24AA",
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <header style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0 }}>Admin · Dashboard</h1>
          <p style={{ color: "#666", marginTop: 6, marginBottom: 0 }}>Quick links to manage your site content and configuration.</p>
          {typeof remainingSec === "number" ? (
            <p style={{ color: "#444", marginTop: 6, marginBottom: 0 }}>Session remaining (sec): {remainingSec}</p>
          ) : null}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Link href="/">
            <button type="button" className={s.btn}>View site</button>
          </Link>
          <button
            type="button"
            className={`${s.btn} ${s.btnDanger}`}
            onClick={async () => {
              await fetch("/api/admin/logout", { method: "POST" });
              router.replace("/admin/login");
            }}
          >
            Log out
          </button>
        </div>
      </header>

      <section style={{ marginBottom: 28 }}>
        <h2 style={{ margin: 0, fontSize: 16, letterSpacing: 0.3, textTransform: "uppercase", color: "#777", fontWeight: 700, marginBottom: 12 }}>Content</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 16,
            alignItems: "stretch",
          }}
        >
          {sections.slice(0, 5).map((sec) => (
            <Link key={sec.href} href={sec.href} style={{ textDecoration: "none" }}>
              <div className={s.card} style={{ padding: 16, minHeight: 120 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    display: "grid",
                    placeItems: "center",
                    background: `${sec.accent}20`,
                    border: `1px solid ${sec.accent}40`,
                    fontSize: 18,
                  }}>
                    <span>{sec.emoji}</span>
                  </div>
                  <div style={{
                    width: 36,
                    height: 4,
                    borderRadius: 999,
                    background: `linear-gradient(90deg, ${sec.accent}, ${sec.accent}55)`,
                  }} />
                </div>
                <div style={{ marginBottom: 8 }}>
                  <h3 style={{ margin: 0, fontSize: 18, color: "#111" }}>{sec.title}</h3>
                </div>
                <p style={{ margin: 0, color: "#555", lineHeight: 1.5 }}>{sec.description}</p>
                <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 6, color: sec.accent, fontWeight: 600 }}>
                  <span>Open</span>
                  <span aria-hidden>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 style={{ margin: 0, fontSize: 16, letterSpacing: 0.3, textTransform: "uppercase", color: "#777", fontWeight: 700, marginBottom: 12 }}>Configuration</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 16,
            alignItems: "stretch",
          }}
        >
          {sections.slice(5).map((sec) => (
            <Link key={sec.href} href={sec.href} style={{ textDecoration: "none" }}>
              <div className={s.card} style={{ padding: 16, minHeight: 120 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    display: "grid",
                    placeItems: "center",
                    background: `${sec.accent}20`,
                    border: `1px solid ${sec.accent}40`,
                    fontSize: 18,
                  }}>
                    <span>{sec.emoji}</span>
                  </div>
                  <div style={{
                    width: 36,
                    height: 4,
                    borderRadius: 999,
                    background: `linear-gradient(90deg, ${sec.accent}, ${sec.accent}55)`,
                  }} />
                </div>
                <div style={{ marginBottom: 8 }}>
                  <h3 style={{ margin: 0, fontSize: 18, color: "#111" }}>{sec.title}</h3>
                </div>
                <p style={{ margin: 0, color: "#555", lineHeight: 1.5 }}>{sec.description}</p>
                <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 6, color: sec.accent, fontWeight: 600 }}>
                  <span>Open</span>
                  <span aria-hidden>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}


